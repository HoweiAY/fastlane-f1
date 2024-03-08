from flask import Flask
from flask_cors import CORS

from api.season_schedule import schedule_bp
from api.gp_event import event_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(schedule_bp, url_prefix="/schedule")
app.register_blueprint(event_bp, url_prefix="/event")

@app.route("/")
def home():
    return "FastLane"

if __name__ == "__main__":
    app.run(debug=True)