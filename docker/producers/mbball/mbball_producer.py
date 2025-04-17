# AUTHOR: Giorgio Antonacci

import requests
import json
from kafka import KafkaProducer
from datetime import datetime

# ---------------- Configuration ----------------
KAFKA_BROKER = '129.114.25.0:30092'
TOPIC_NAME = 'mbball'
API_KEY = 'Hd1zXvGZxyXcZMXMquPAmTPQTTdtYu7ONu9Ml6uQ'
VANDY_TEAM_ID = '72971b77-1d35-40b3-bb63-4c5b29f3d22b'
SEASON_YEARS = ['2023', '2024']
SEASON_TYPES = ['REG', 'CT', 'PST']

producer = KafkaProducer(
    bootstrap_servers=KAFKA_BROKER,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# ---------------- Helpers ----------------

def send_to_kafka(label, payload, season_context=None):
    message = {
        "type": label,
        "timestamp": datetime.utcnow().isoformat(),
        "data": payload
    }

    if season_context:
        message["season_context"] = season_context

    producer.send(TOPIC_NAME, message)
    print(f"[✓] Sent {label} to Kafka")

# ---------------- 1. Pull Schedule ----------------

def fetch_schedule():
    for year in SEASON_YEARS:
        for season_type in SEASON_TYPES:
            url = f"https://api.sportradar.us/ncaamb/trial/v8/en/games/{year}/{season_type}/schedule.json"
            try:
                res = requests.get(url, params={"api_key": API_KEY})
                res.raise_for_status()
                data = res.json()
                games = [
                    game for game in data.get("games", [])
                    if game.get("home", {}).get("id") == VANDY_TEAM_ID or game.get("away", {}).get("id") == VANDY_TEAM_ID
                ]
                send_to_kafka("schedule", {
                    "year": year,
                    "season_type": season_type,
                    "games": games
                })
            except Exception as e:
                print(f"[!] Failed to fetch schedule for {year}-{season_type}: {e}")

# ---------------- 2. Pull Seasonal Stats ----------------

def fetch_seasonal_stats():
    for year in SEASON_YEARS:
        for season_type in SEASON_TYPES:
            url = f"https://api.sportradar.us/ncaamb/trial/v8/en/seasons/{year}/{season_type}/teams/{VANDY_TEAM_ID}/statistics.json"
            try:
                res = requests.get(url, params={"api_key": API_KEY})
                res.raise_for_status()
                data = res.json()
                send_to_kafka("stats", data, season_context={"year": year, "type": season_type})
            except Exception as e:
                print(f"[!] Failed to fetch stats for {year}-{season_type}: {e}")

# ---------------- 3. Pull Team Profile ----------------

def fetch_team_profile():
    url = f"https://api.sportradar.us/ncaamb/trial/v8/en/teams/{VANDY_TEAM_ID}/profile.json"
    try:
        res = requests.get(url, params={"api_key": API_KEY})
        res.raise_for_status()
        data = res.json()
        send_to_kafka("team_profile", data)
    except Exception as e:
        print(f"[!] Failed to fetch team profile: {e}")

# ---------------- Run Once ----------------

if __name__ == "__main__":
    print("[→] Starting mbball producer (one-time run)...")
    fetch_schedule()
    fetch_seasonal_stats()
    fetch_team_profile()
    producer.flush()
    print("[✓] Done producing mbball data. Exiting.")
