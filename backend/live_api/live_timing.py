from urllib.request import urlopen
from flask import Blueprint, jsonify
import asyncio
import aiohttp

live_timing_bp = Blueprint("live_timing", __name__)

baseUrl = "https://api.openf1.org/v1"

async def fetch(session, url):
    try:
        async with session.get(url) as response:
            return await response.json()
    except:
        return []

async def getDrivers():
    async with aiohttp.ClientSession() as session:
        driverurl = f"{baseUrl}/drivers?session_key=latest"
        driverData = await fetch(session, driverurl)
        return driverData

async def getDriverPositions(driverCount):
    urls = []

    for position in range(1, driverCount + 1):
        urls.append(f"{baseUrl}/position?session_key=latest&position={position}")

    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.ensure_future(fetch(session, url))
            tasks.append(task)
        
        posResponses = await asyncio.gather(*tasks)
        return posResponses

async def getDriverIntervals(driverNums):
    urls = []

    for driverNum in driverNums:
        urls.append(f"{baseUrl}/intervals?session_key=latest&driver_number={driverNum}")
    
    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.ensure_future(fetch(session, url))
            tasks.append(task)
        
        intervalResponses = await asyncio.gather(*tasks)
        return intervalResponses

async def getDriverLaptimes(driverNums, sortByFastest=False):
    urls = []

    for driverNum in driverNums:
        urls.append(f"{baseUrl}/laps?session_key=latest&driver_number={driverNum}")
    
    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.ensure_future(fetch(session, url))
            tasks.append(task)
        
        lapResponses = await asyncio.gather(*tasks)
        
        if sortByFastest:
            for driverLapData in lapResponses:
                if len(driverLapData) > 0:
                    driverLapData.sort(key=lambda lapData: lapData["lap_duration"] if lapData["lap_duration"] else float("inf"), reverse=True)

        return lapResponses

async def getDriverStints(driverNums):
    urls = []

    for driverNum in driverNums:
        urls.append(f"{baseUrl}/stints?session_key=latest&driver_number={driverNum}")
    
    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.ensure_future(fetch(session, url))
            tasks.append(task)
        
        stintResponses = await asyncio.gather(*tasks)
        return stintResponses

async def getFlag(isQualifying=False):
    async with aiohttp.ClientSession() as session:
        chequeredUrl = f"{baseUrl}/race_control?session_key=latest&flag=CHEQUERED"
        chequeredData = await fetch(session, chequeredUrl)

        endTime = ""
        if len(chequeredData) > 0:
            if not isQualifying or (isQualifying and len(chequeredData) >= 3):
                endTime = f"&date<={chequeredData[-1]['date']}"
        
        flagUrl = f"{baseUrl}/race_control?session_key=latest&category=Flag{endTime}"
        flagData = await fetch(session, flagUrl)
        return flagData

async def getSafetyCar():
    async with aiohttp.ClientSession() as session:
        safetyCarUrl = f"{baseUrl}/race_control?session_key=latest&category=SafetyCar"
        safetyCarData = await fetch(session, safetyCarUrl)
        return safetyCarData

async def getLapNum():
    async with aiohttp.ClientSession() as session:
        leaderUrl = f"{baseUrl}/position?session_key=latest&position=1"
        leaderData = await fetch(session, leaderUrl)
        leaderNum = leaderData[-1]["driver_number"]

        async with aiohttp.ClientSession() as session:
            lapNumUrl = f"{baseUrl}/laps?session_key=latest&driver_number={leaderNum}"
            lapNumData = await fetch(session, lapNumUrl)
            return lapNumData


@live_timing_bp.route("/get_live_driver_data", methods=["GET"])
@live_timing_bp.route("/get_live_driver_data/<sessionType>", methods=["GET"])
def getLiveDriverData(sessionType=""):
    liveData = {
        "standings": [],
        "error": False,
    }
    status = 200

    async def getDriverDataAsync(sessionType="--"):
        try:
            drivers = await getDrivers()
            driverNums = [driver["driver_number"] for driver in drivers]
            driverCount = len(driverNums)

            posResponses = await getDriverPositions(driverCount)
            if len(posResponses) > 0:
                posResponses.sort(key=lambda driverPosData: driverPosData[-1]["driver_number"])

            lapResponses = await getDriverLaptimes(driverNums)
            fastestLapResponses = await getDriverLaptimes(driverNums, sortByFastest=True)
            stintResponses = await getDriverStints(driverNums)

            intervalResponses = None
            if sessionType == "sprint" or sessionType == "race":
                intervalResponses = await getDriverIntervals(driverNums)
            
            for driverData, posData, lapData, fastestLapData, stintData in zip(drivers, posResponses, lapResponses, fastestLapResponses, stintResponses):
                data = {
                    "name": "--",
                    "position": 0,
                    "gap": "--",
                    "interval": "--",
                    "laptime": 0,
                    "s1Time": 0,
                    "s2Time": 0,
                    "s3Time": 0,
                    "fastestLap": 0,
                    "outLap": False,
                    "tyre": "--",
                    "stint": 0,
                }

                data["name"] = f"{driverData['broadcast_name']}"
                data["position"] = posData[-1]["position"]

                if len(lapData) > 0:
                    data["laptime"] = int(lapData[-1]["lap_duration"] * 1000) if lapData[-1]["lap_duration"] else -1
                    data["s1Time"] = lapData[-1]["duration_sector_1"] if lapData[-1]["duration_sector_1"] else -1
                    data["s2Time"] = lapData[-1]["duration_sector_2"] if lapData[-1]["duration_sector_2"] else -1
                    data["s3Time"] = lapData[-1]["duration_sector_3"] if lapData[-1]["duration_sector_3"] else -1
                    data["outLap"] = lapData[-1]["is_pit_out_lap"]
                
                if len(fastestLapData) > 0:
                    data["fastestLap"] = int(fastestLapData[-1]["lap_duration"] * 1000) if fastestLapData[-1]["lap_duration"] else -1
                
                if len(stintData) > 0:
                    data["tyre"] = stintData[-1]["compound"]
                    data["stint"] = stintData[-1]["stint_number"]

                liveData["standings"].append(data)

            
            if intervalResponses is not None:
                for data, intervalData in zip(liveData["standings"], intervalResponses):
                    if len(intervalData) > 0:
                        data["gap"] = intervalData[-1]["gap_to_leader"]
                        data["interval"] = intervalData[-1]["interval"]
            
            liveData["standings"].sort(key=lambda driverData: driverData["position"])
            await asyncio.sleep(1)

        except:
            await asyncio.sleep(1)
    
    def getLiveData(sessionType=""):
        asyncio.run(getDriverDataAsync(sessionType))

    try:
        getLiveData(sessionType)
    except:
        liveData["error"] = True
        status = 400
    
    return jsonify(liveData), status

@live_timing_bp.route("/get_live_flag/<session>", methods=["GET"])
def getLiveFlag(session="race"):
    targetFlags = ["GREEN", "CLEAR", "YELLOW", "DOUBLE YELLOW", "RED", "CHEQUERED"]

    liveData = {
        "flag": "",
        "error": False,
    }
    status = 200

    async def getLiveFlagAsync(isQualifying):
        try:
            flagResponses = await getFlag(isQualifying)
            
            flagCount = len(flagResponses) - 1
            while flagCount >= 0 and flagResponses[flagCount]["flag"] not in targetFlags:
                flagCount -= 1
            
            if flagCount >= 0:
                liveData["flag"] = flagResponses[flagCount]["flag"]
            
            await asyncio.sleep(1)
                
        except:
            await asyncio.sleep(1)
    
    def getLiveData(session= "race"):
        isQualifying = (session == "qualifying" or session == "sprintShootout")
        asyncio.run(getLiveFlagAsync(isQualifying))

    try:
        getLiveData(session)
    except:
        liveData["error"] = True
        status = 400

    return jsonify(liveData), status

@live_timing_bp.route("/get_live_safety_car", methods=["GET"])
def getLiveSafetyCar():
    targetFlags = ["YELLOW", "DOUBLE YELLOW", "RED"]

    liveData = {
        "deployed": False,
        "message": "",
        "error": False
    }
    status = 200

    async def getLiveSafetyCarAsync():
        try:
            flagResponses = await getFlag()
            
            incidentTimeUTC = None
            flagCount = len(flagResponses) - 1
            while flagCount >= 0 and flagResponses[flagCount]["flag"] not in targetFlags:
                flagCount -= 1
            if flagCount >= 0:
                incidentTimeUTC = flagResponses[flagCount]["date"]

            safetyCarResponses = await getSafetyCar()
            if len(safetyCarResponses) > 0:
                safetyCarDeployTimeUTC = safetyCarResponses[-1]["date"]
                if incidentTimeUTC and safetyCarDeployTimeUTC > incidentTimeUTC:
                    liveData["deployed"] = True
                    liveData["message"] = safetyCarResponses[-1]["message"]
            
            await asyncio.sleep(1)

        except:
            await asyncio.sleep(1)
    
    def getLiveData():
        asyncio.run(getLiveSafetyCarAsync())

    try:
        getLiveData()
    except:
        liveData["error"] = True
        status = 400

    return jsonify(liveData), status