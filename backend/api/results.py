from datetime import datetime, timezone
from flask import Blueprint, jsonify
from fastf1.ergast import Ergast
import math
import fastf1

results_bp = Blueprint("results", __name__)


@results_bp.route("/get_driver_standings", methods=["GET"])
@results_bp.route("/get_driver_standings/<year>", methods=["GET"])
def getDriverStandings(year=None):
    if not year:
        year = datetime.now(timezone.utc).year
    year = int(year)

    standings = { "driverStandings": [], "error": False }
    status = 200

    try:
        ergast = Ergast()
        driverStandings = ergast.get_driver_standings(season=year, round="last", result_type="raw")
        standings["driverStandings"] = driverStandings[0]["DriverStandings"]
    except:
        standings["error"] = True
        status = 400
    finally:
        return jsonify(standings), status


@results_bp.route("/get_constructor_standings", methods=["GET"])
@results_bp.route("/get_constructor_standings/<year>", methods=["GET"])
def getConstructorStandings(year=None):
    if not year:
        year = datetime.now(timezone.utc).year
    year = int(year)

    standings = { "constructorStandings": [], "error": False }
    status = 200

    try:
        ergast = Ergast()
        constructorStandings = ergast.get_constructor_standings(season=year, round="last", result_type="raw")
        standings["constructorStandings"] = constructorStandings[0]["ConstructorStandings"]
    except:
        standings["error"] = True
        status = 400
    finally:
        return jsonify(standings), status


@results_bp.route("/get_qualifying_result", methods=["GET"])
@results_bp.route("/get_qualifying_result/<year>", methods=["GET"])
@results_bp.route("/get_qualifying_result/<year>/<round>", methods=["GET"])
def getQualifyingResult(year=None, round=1):
    if not year:
        year = datetime.now(timezone.utc).year
    year = int(year)

    round = int(round)

    result = { "qualifyingResult": [], "error": False }
    status = 200

    try:
        event = fastf1.get_event(year, round)
        qualiSession = event.get_qualifying()
        qualiSession.load(telemetry=False, weather=False, messages=False)
        qualiResults = qualiSession.results

        finishingPos = qualiResults.Position.tolist()
        drivers, driverNums = qualiResults.FullName.tolist(), qualiResults.DriverNumber.tolist()
        teams, teamColors = qualiResults.TeamName.tolist(), qualiResults.TeamColor.tolist()
        q1Times, q2Times, q3Times = qualiResults.Q1.tolist(), qualiResults.Q2.tolist(), qualiResults.Q3.tolist()

        for pos, driver, driverNum, team, teamColor, q1Time, q2Time, q3Time in zip(finishingPos, drivers, driverNums, teams, teamColors, q1Times, q2Times, q3Times):
            driverResult ={
                "position": int(pos),
                "driverName": driver,
                "driverNum": int(driverNum),
                "teamName": team,
                "teamColor": teamColor,
                "q1": int(q1Time.total_seconds() * 1000) if not math.isnan(q1Time.total_seconds()) else -1,
                "q2": int(q2Time.total_seconds() * 1000) if not math.isnan(q2Time.total_seconds()) else -1,
                "q3": int(q3Time.total_seconds() * 1000) if not math.isnan(q3Time.total_seconds()) else -1,
            }
            result["qualifyingResult"].append(driverResult)
        
        result["qualifyingResult"].sort(key=lambda driverResult: driverResult["position"])

    except:
        result["error"] = True
        status = 400
    
    finally:
        return jsonify(result), status


@results_bp.route("/get_race_result", methods=["GET"])
@results_bp.route("/get_race_result/<year>", methods=["GET"])
@results_bp.route("/get_race_result/<year>/<round>", methods=["GET"])
def getRaceResult(year=None, round=1):
    if not year:
        year = datetime.now(timezone.utc).year
    year = int(year)

    round = int(round)

    result = { "raceResult": [], "error": False }
    status = 200

    try:
        event = fastf1.get_event(year, round)
        raceSession = event.get_race()
        raceSession.load(telemetry=False, weather=False, messages=False)
        raceResults = raceSession.results

        finishingPos, finishingPoints = raceResults.Position.tolist(), raceResults.Points.tolist()
        drivers, driverNums = raceResults.FullName.tolist(), raceResults.DriverNumber.toList()
        teams, teamColors = raceResults.TeamName.tolist(), raceResults.TeamColor.tolist()
        raceTimes = raceResults.Time.tolist()
        finishingStatus = raceResults.Status.tolist()

        for pos, driver, driverNum, team, teamColor, time, driverStatus, points in zip(finishingPos, drivers, driverNums, teams, teamColors, raceTimes, finishingStatus, finishingPoints):
            driverResult = {
                "position": int(pos),
                "driverName": driver,
                "driverNum": int(driverNum),
                "teamName": team,
                "teamColor": teamColor,
                "time": int(time.total_seconds() * 1000) if not math.isnan(time.total_seconds()) else -1,
                "status": driverStatus,
                "points": int(points),
            }
            result["raceResult"].append(driverResult)
        
        result["raceResult"].sort(key=lambda driverResult: driverResult["position"])

    except:
        result["error"] = True
        status = 400
    
    finally:
        return jsonify(result), status