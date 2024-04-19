from datetime import datetime, timezone
from flask import Blueprint, jsonify
from fastf1.ergast import Ergast
import pandas as pd
import fastf1

event_bp = Blueprint("event", __name__)


@event_bp.route("/get_event_info", methods=["GET"])
@event_bp.route("/get_event_info/<year>", methods=["GET"])
@event_bp.route("/get_event_info/<year>/<round>", methods=["GET"])
@event_bp.route("/get_event_info/<year>/<round>/<includeCircuitInfo>", methods=["GET"])
def getEventInfo(year=None, round=1, includeCircuitInfo=True):

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
    
    def getCircuitInfo(season, round):
        ergast = Ergast()
        circuit = ergast.get_circuits(season=season, round=round, result_type='raw')
        return circuit[0]

    if not year:
        year = datetime.now(timezone.utc).year
    year = int(year)

    round = int(round)

    if includeCircuitInfo == "false": includeCircuitInfo = False

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
            "sprintQualifying": None,
            "sprintShootout": None,
            "qualifying": None,
            "race": None,
            "testing": None,
        }
    
    status = 200
    
    try:
        event = fastf1.get_event(year, round) if round != 0 else fastf1.get_testing_event(year, 1)

        gpEvent["eventName"] = event.OfficialEventName  # official name of the Grand Prix
        gpEvent["country"] = event.Country  # name of the country in which the event is held
        gpEvent["location"] = event.Location  # location of the event
        gpEvent["format"] = event.EventFormat  # format of the race weekend

        if not event.is_testing():
            # number of practice sessions based on weekend format
            practiceCount = 3
            if event.EventFormat == "sprint_shootout" or event.EventFormat == "sprint_qualifying":
                practiceCount = 1
            elif event.EventFormat == "sprint":
                practiceCount = 2
            
            for practice in range(practiceCount):
                practiceSession = event.get_practice(practice + 1)
                sessions[f"practice{practice + 1}"] = sessionInfo(practiceSession)
            
            qualifyingSession = event.get_qualifying()
            sessions["qualifying"] = sessionInfo(qualifyingSession)  # information about qualifying

            # information about sprint weekend
            if event.EventFormat == "sprint_shootout":
                shootoutSession = event.get_sprint_shootout()
                sessions["sprintShootout"] = sessionInfo(shootoutSession)
            elif event.EventFormat == "sprint_qualifying":
                sprintQualifyingSession = event.get_sprint_qualifying()
                sessions["sprintQualifying"] = sessionInfo(sprintQualifyingSession)
            elif event.EventFormat == "sprint":
                sprintSession = event.get_sprint()
                sessions["sprint"] = sessionInfo(sprintSession)
            
            raceSession = event.get_race()
            sessions["race"] = sessionInfo(raceSession)  # information about the race
        else:
            sessions["testing"] = sessionInfo(event.get_practice(1))  # information about testing

        gpEvent["sessions"] = sessions

        # uses the Ergast API to get cicuit-related information, may be replaced after deprecation
        try:
            if includeCircuitInfo: 
                gpEvent["circuitInfo"] = getCircuitInfo(year, round)
        except:
            circuitName = event.Location
            Location = {"locality": event.Country}
            gpEvent["circuitInfo"] = {
                "circuitName": circuitName,
                "Location": Location,
            }
    
    except:
        gpEvent["error"] = True
        status = 400

    finally:
        return jsonify(gpEvent), status