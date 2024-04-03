from urllib.request import urlopen
from flask import Blueprint, jsonify
import asyncio
import aiohttp
import json
import math

live_timing_bp = Blueprint("live_timing", __name__)

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.json()

def getDrivers():
    driverResponse = urlopen("https://api.openf1.org/v1/drivers?session_key=latest")
    driverData = json.loads(driverResponse.read().decode("utf-8"))
    if len(driverData) > 0:
        driverData.sort(key=lambda driver: driver["driver_number"])
    return driverData

def getFlag():
    chequeredResponse = urlopen("https://api.openf1.org/v1/race_control?session_key=latest&flag=CHEQUERED")
    chequeredData = json.loads(chequeredResponse.read().decode("utf-8"))

    endTime = ""
    if len(chequeredData) > 0:
        endTime = f"&date<={chequeredData[-1]['date']}"

    flagResponse = urlopen(f"https://api.openf1.org/v1/race_control?session_key=latest&category=Flag{endTime}")
    flagData = json.loads(flagResponse.read().decode("utf-8"))
    return flagData

def getSafetyCar():
    safetyCarResponse = urlopen("https://api.openf1.org/v1/race_control?session_key=latest&category=SafetyCar")
    safetyCarData = json.loads(safetyCarResponse.read().decode("utf-8"))
    return safetyCarData

def getLapNum():
    leadDriverResponse = urlopen(f"https://api.openf1.org/v1/position?session_key=latest&position=1")
    leaderData = json.loads(leadDriverResponse.read().decode("utf-8"))
    leaderNum = leaderData[-1]["driver_number"]

    lapResponse = urlopen(f"https://api.openf1.org/v1/laps?session_key=latest&driver_number={leaderNum}")
    lapNumData = json.loads(lapResponse.read().decode("utf-8"))
    return lapNumData

async def getDriverPositions(driverNums):
    urls = []

    for driverNum in driverNums:
        urls.append(f"https://api.openf1.org/v1/position?session_key=latest&driver_number={driverNum}")

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
        urls.append(f"https://api.openf1.org/v1/intervals?session_key=latest&driver_number={driverNum}")
    
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
        urls.append(f"https://api.openf1.org/v1/laps?session_key=latest&driver_number={driverNum}")
    
    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.ensure_future(fetch(session, url))
            tasks.append(task)
        
        lapResponses = await asyncio.gather(*tasks)
        
        if sortByFastest:
            for driverData in lapResponses:
                if len(driverData) > 0:
                    driverData.sort(key=lambda lapData: lapData["lap_duration"] if lapData["lap_duration"] else math.inf, reverse=True)

        return lapResponses

async def getDriverStints(driverNums):
    urls = []

    for driverNum in driverNums:
        urls.append(f"https://api.openf1.org/v1/stints?session_key=latest&driver_number={driverNum}")
    
    async with aiohttp.ClientSession() as session:
        tasks = []
        for url in urls:
            task = asyncio.ensure_future(fetch(session, url))
            tasks.append(task)
        
        stintResponses = await asyncio.gather(*tasks)
        return stintResponses


@live_timing_bp.route("/get_live_driver_data", methods=["GET"])
@live_timing_bp.route("/get_live_driver_data/<sessionType>", methods=["GET"])
def getLiveDriverData(sessionType=""):
    liveData = {
        "standings": [],
        "error": False,
    }
    status = 200

    try:
        drivers = getDrivers()
        driverNums = [driver["driver_number"] for driver in drivers]

        loop = asyncio.get_event_loop()
        posResponses = loop.run_until_complete(getDriverPositions(driverNums))
        lapResponses = loop.run_until_complete(getDriverLaptimes(driverNums))
        fastestLapResponses = loop.run_until_complete(getDriverLaptimes(driverNums, sortByFastest=True))
        stintResponses = loop.run_until_complete(getDriverStints(driverNums))

        intervalResponses = None
        if sessionType == "sprint" or sessionType == "race":
            intervalResponses = loop.run_until_complete(getDriverIntervals(driverNums))
        
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
                data["s1Time"] = int(lapData[-1]["duration_sector_1"] * 1000) if lapData[-1]["duration_sector_1"] else -1
                data["s2Time"] = int(lapData[-1]["duration_sector_2"] * 1000) if lapData[-1]["duration_sector_2"] else -1
                data["s3Time"] = int(lapData[-1]["duration_sector_3"] * 1000) if lapData[-1]["duration_sector_3"] else -1
                data["outLap"] = lapData[-1]["is_pit_out_lap"]
            
            if len(fastestLapData) > 0:
                data["fastestLap"] = int(fastestLapData[-1]["lap_duration"] * 1000) if fastestLapData[-1]["lap_duration"] else -1
            
            data["tyre"] = stintData[-1]["compound"]
            data["stint"] = stintData[-1]["stint_number"]

            liveData["standings"].append(data)

        
        if intervalResponses is not None:
            for data, intervalData in zip(liveData["standings"], intervalResponses):
                if len(intervalData) > 0:
                    data["gap"] = intervalData[-1]["gap_to_leader"]
                    data["interval"] = intervalData[-1]["interval"]
        
        liveData["standings"].sort(key=lambda driverData: driverData["position"])

    except:
        liveData["error"] = True
        status = 400

    finally:
        return jsonify(liveData), status


@live_timing_bp.route("/get_live_flag", methods=["GET"])
def getLiveFlag():
    targetFlags = ["GREEN", "CLEAR", "YELLOW", "DOUBLE YELLOW", "RED", "CHEQUERED"]

    liveData = {
        "flag": "",
        "error": False,
    }
    status = 200

    try:
        flagResponses = getFlag()
        
        flagCount = len(flagResponses) - 1
        while flagCount >= 0 and flagResponses[flagCount]["flag"] not in targetFlags:
            flagCount -= 1
        
        if flagCount >= 0:
            liveData["flag"] = flagResponses[flagCount]["flag"]
            
    except:
        liveData["error"] = True
        status = 400
    
    finally:
        return jsonify(liveData), status