from datetime import datetime, timezone
from flask import Blueprint, jsonify
import pandas as pd
import fastf1

schedule_bp = Blueprint("schedule", __name__)

@schedule_bp.route("/get_schedule", methods=["GET"])
@schedule_bp.route("/get_schedule/<year>", methods=["GET"])
def getSeasonSchedule(year=None):
    if not year:
        year = datetime.now(timezone.utc).year
    year = int(year)

    schedule = { "events": [], "error": False }
    status = 200

    try:
        events = fastf1.get_event_schedule(year)
        roundNumber = events.RoundNumber.tolist()  # No. of rounds in the season
        countries = events.Country.tolist()  # names of the countries in which the event is held
        officialEventNames = events.OfficialEventName.tolist()  # official name of the Grand Prix
        formats = events.EventFormat.tolist()  # format of the race weekends
        
        eventStartUTC, eventEndUTC = [], []
        for startDate, endDate in zip(events.Session1DateUtc.tolist(), events.Session5DateUtc.tolist()):
            # starting date of the test / race weekend
            if pd.isna(startDate): eventStartUTC.append({})
            else:
                eventStartUTC.append({
                    "month": startDate.strftime("%B"),
                    "day": startDate.day,
                    "hour": startDate.hour,
                    "minute": startDate.minute,
                    "timeFormatted": startDate.to_pydatetime().isoformat(),
                })
            # ending date of the test / race weekend
            if pd.isna(endDate): eventEndUTC.append({})
            else:
                eventEndUTC.append({
                    "month": endDate.strftime("%B"),
                    "day": endDate.day,
                    "hour": endDate.hour,
                    "minute": endDate.minute,
                    "timeFormatted": endDate.to_pydatetime().isoformat(),
                })

        for round, country, eventName, format, startDate, endDate in zip(roundNumber, countries, officialEventNames, formats, eventStartUTC, eventEndUTC):
            event = {
                "round": round,
                "country": country,
                "eventName": eventName,
                "format": format,
                "startDate": startDate,
                "endDate": endDate,
            }
            schedule["events"].append(event)

    except:
        schedule["error"] = True
        status = 400

    finally:
        return jsonify(schedule), status