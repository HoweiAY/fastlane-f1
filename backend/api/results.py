from datetime import datetime, timezone
from flask import Blueprint, jsonify
from fastf1.ergast import Ergast

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

@results_bp.route("/get_race_result", methods=["GET"])
@results_bp.route("/get_race_result/<year>", methods=["GET"])
@results_bp.route("/get_race_result/<year>/<round>", methods=["GET"])
def getRaceResult(year=None, round=None):
    if not year:
        year = datetime.now(timezone.utc).year
    year = int(year)

    round = int(round) if round != None else None

    result = { "raceResult": [], "error": False }
    status = 200

    try:
        ergast = Ergast()
        raceResult = ergast.get_race_results(season=year, round=round, result_type="raw")
        result["raceResult"] = raceResult[0]["Results"]
    except:
        result["error"] = True
        status = 400
    finally:
        return jsonify(result), status