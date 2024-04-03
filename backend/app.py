from flask import Flask
from flask_cors import CORS

from api.season_schedule import schedule_bp
from api.gp_event import event_bp
from api.results import results_bp

from live_api.live_timing import live_timing_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(schedule_bp, url_prefix="/schedule")
app.register_blueprint(event_bp, url_prefix="/event")
app.register_blueprint(results_bp, url_prefix="/results")

app.register_blueprint(live_timing_bp, url_prefix="/live_timing")

@app.route("/")
def home():
    return "FastLane"

if __name__ == "__main__":
    app.run(debug=True)