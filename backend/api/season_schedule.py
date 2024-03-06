from datetime import datetime, timezone
from flask import Blueprint, jsonify
import pandas as pd
import fastf1

schedule_bp = Blueprint("schedule", __name__)

@schedule_bp.route("/get_schedule", methods=["GET"])
def getSeasonSchedule(year = 0):
    if not year: 
        year = datetime.now(timezone.utc).year
    
    schedule = { "events": [] }

    try:
        events = fastf1.get_event_schedule(year)
        roundNumber = events.RoundNumber.tolist()  # No. of rounds in the season
        countries = events.Country.tolist()  # names of the countries in which the event is held
        officialEventNames = events.OfficialEventName.tolist()  # official name of the Grand Prix

        eventStartUTC = [[startDate.strftime("%B"), startDate.day] if not pd.isna(startDate) else [] for startDate in events.Session1DateUtc.tolist()]  # starting date of the test / race weekend
        eventEndUTC = [[endDate.strftime("%B"), endDate.day] if not pd.isna(endDate) else [] for endDate in events.Session5DateUtc.tolist()]  # ending date of the test / race weekend

        for round, country, eventName, startDate, endDate in zip(roundNumber, countries, officialEventNames, eventStartUTC, eventEndUTC):
            event = {
                "round": round,
                "country": country,
                "eventName": eventName,
                "startDate": startDate,
                "endDate": endDate,
                "error": False,
            }
            schedule["events"].append(event)

    except:
        schedule.clear()

        schedule["events"] = [{ "error": True }]

    finally:
        return jsonify(schedule)