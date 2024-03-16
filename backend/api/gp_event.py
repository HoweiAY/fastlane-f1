from datetime import datetime, timezone
from flask import Blueprint, jsonify
from fastf1.ergast import Ergast
import pandas as pd
import fastf1

event_bp = Blueprint("event", __name__)


@event_bp.route("/get_event_info", methods=["GET"])
@event_bp.route("/get_event_info/<year>", methods=["GET"])
@event_bp.route("/get_event_info/<year>/<round>", methods=["GET"])
def getEventInfo(year=None, round=0):

    def sessionInfo(session):
        sessionDate = session.date
        sessionInfo = {}
        if not pd.isna(sessionDate):
            sessionInfo = {
                "month": sessionDate.strftime("%B"),
                "day": sessionDate.day,
                "hour": sessionDate.hour,
                "minute": sessionDate.minute,
                "timeFormatted": sessionDate.to_pydatetime().isoformat(),
            }
        return sessionInfo

    if not year:
        year = datetime.now(timezone.utc).year
    year = int(year)

    round = int(round)

    gpEvent = {
        "eventName": "",
        "country": "",
        "location": "",
        "circuitInfo": {},
        "sessions": {},
        "format": "",
        "error": False,
        }
    
    sessions = {
            "practice1": None,
            "practice2": None,
            "practice3": None,
            "sprint": None,
            "sprintShootout": None,
            "qualifying": None,
            "race": None,
            "testing": None,
        }
    
    status = 200
    
    try:
        event = fastf1.get_event(year, round) if round != 0 else fastf1.get_testing_event(year, 1)

        gpEvent["eventName"] = event.OfficialEventName
        gpEvent["country"] = event.Country
        gpEvent["location"] = event.Location
        gpEvent["format"] = event.EventFormat

        if not event.is_testing():
            practiceCount = 3
            if event.EventFormat == "sprint_shootout":
                practiceCount = 1
            elif event.EventFormat == "sprint":
                practiceCount = 2
            
            for practice in range(practiceCount):
                practiceSession = event.get_practice(practice + 1)
                sessions[f"practice{practice + 1}"] = sessionInfo(practiceSession)
            
            qualifyingSession = event.get_qualifying()
            sessions["qualifying"] = sessionInfo(qualifyingSession)

            if event.EventFormat == "sprint_shootout":
                shootoutSession = event.get_sprint_shootout()
                sessions["sprintShootout"] = sessionInfo(shootoutSession)
            elif event.EventFormat == "sprint":
                sprintSession = event.get_sprint()
                sessions["sprint"] = sessionInfo(sprintSession)
            
            raceSession = event.get_race()
            sessions["race"] = sessionInfo(raceSession)    
        else:
            sessions["testing"] = sessionInfo(event.get_practice(1))

        gpEvent["sessions"] = sessions

        try:
            ergast = Ergast()
            circuit = ergast.get_circuits(season=year, round=round, result_type='raw')
            gpEvent["circuitInfo"] = circuit[0]
        except:
            gpEvent["circuitInfo"] = {}
    
    except:
        gpEvent["error"] = True
        status = 400

    return jsonify(gpEvent), status