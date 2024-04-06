# FastLane

A React web application for Formula 1 live timings, event schedules and race results.

![Screenshot of the home page of FastLane](https://github.com/HoweiAY/fastlane_f1/blob/main/docs/static/screenshots/home_1.png)

## Features

The following features have been introduced so far:

- Live timing of Formula 1 race sessions (practice, qualifying, sprint and race)
- Full event schedule for F1 seasons from 2018 to the current year
- Results for drivers and constructor championships of current and previous seasons
- Race results of past F1 race weekends

## Tech Stack

FastLane is developed with the following tools and technologies:

### Frontend

- HTML, CSS
- JavaScript
- Vite
- React
- Tailwind CSS

```
cd frontend
npm install
npm run dev
```

### Backend

- Python 3.9
- Flask

```
conda create -n fastlane-f1 python=3.9
conda activate fastlane-f1

cd backend
pip install -r requirements.txt
export FLASK_APP=app.py
flask run
```

This project uses theOehrly's [FastF1 Python package](https://github.com/theOehrly/Fast-F1) as well as the [Open F1 API](https://openf1.org/) by Bruno Godefroy for Formula 1-related data. The [Ergast API](https://ergast.com/mrd/) is also utilized but it may be replaced with other alternatives after its deprecation at the end of 2024.

## Screenshots

Here are some screenshots of the developed parts of the application:

### Live Timing

![Screenshot of the live timing page for qualifying of the 2024 Japanese Grand Prix](https://github.com/HoweiAY/fastlane_f1/blob/main/docs/static/screenshots/live_timing_1.png)

### Schedule

![Screenshot of the full schedule page](https://github.com/HoweiAY/fastlane_f1/blob/main/docs/static/screenshots/schedule_1.png)

![Screenshot of the event schedule page for the Abu Dhabi Grand Prix 2021](https://github.com/HoweiAY/fastlane_f1/blob/main/docs/static/screenshots/schedule_2.png)

### Results

![Screenshot of the results page showing the drivers championship of the 2023 season](https://github.com/HoweiAY/fastlane_f1/blob/main/docs/static/screenshots/results_1.png)

![Screenshot of the results page with the list of races in the 2019 season](https://github.com/HoweiAY/fastlane_f1/blob/main/docs/static/screenshots/results_2.png)

![Screenshot of the event result page of the 2023 Miami Grand Prix](https://github.com/HoweiAY/fastlane_f1/blob/main/docs/static/screenshots/event_results_1.png)

## Future Plans

The plan for this project in the future is as follows:

1. Set up a database for storing drivers' and teams' data
2. Implement the Drivers and Teams pages
3. Deploy the application with Docker and Kubernetes
4. Migrate event data to a database to reduce reliance on third-party libraries and APIs for data retrieval
