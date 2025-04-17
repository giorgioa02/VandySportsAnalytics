# AUTHOR: Giorgio Antonacci

from kafka import KafkaConsumer
import couchdb
import json
from datetime import datetime
import time

# ---------------- Configuration ----------------
KAFKA_BROKER = 'kafka-service:9092'
COUCHDB_SERVER = 'http://admin:group1pass@10.56.1.163:5984/'
TOPICS = ["mbball", "wbball", "mfootball"]
DB_NAME_PREFIX = "vandy_"  # e.g., vandy_mbball

# ---------------- Connect to CouchDB ----------------
try:
    couch = couchdb.Server(COUCHDB_SERVER)
    print("[✓] Connected to CouchDB")
except Exception as e:
    print("[!] Failed to connect to CouchDB:", e)
    exit(1)

def ensure_db(name):
    if name in couch:
        return couch[name]
    else:
        return couch.create(name)

# ---------------- Kafka Consumer ----------------
try:
    consumer = KafkaConsumer(
        *TOPICS,
        bootstrap_servers=KAFKA_BROKER,
        value_deserializer=lambda v: v.decode('utf-8'),
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='sports-consumer-group'
    )
    print(f"[✓] Listening to Kafka topics: {TOPICS}")
except Exception as e:
    print("[!] Failed to connect to Kafka:", e)
    exit(1)

# ---------------- Message Processing ----------------
print("[→] Consumer started. Waiting for Kafka messages...")

while True:
    try:
        records = consumer.poll(timeout_ms=1000)

        for topic_partition, messages in records.items():
            for message in messages:
                topic = message.topic
                raw_data = message.value

                try:
                    data = json.loads(raw_data)
                except Exception as e:
                    print(f"[!] Failed to parse JSON from topic '{topic}': {e}")
                    print(f"    Raw message: {raw_data}")
                    continue  # Skip bad message

                db_name = DB_NAME_PREFIX + topic
                db = ensure_db(db_name)

                try:
                    data_type = data.get("type", "unknown")
                    timestamp = data.get("timestamp", datetime.utcnow().isoformat())

                    # ---------------- Build doc_id ----------------
                    if data_type == "schedule":
                        year = data["data"].get("year", "unknown")
                        season_type = data["data"].get("season_type", "").upper()
                        doc_id = f"schedule_{year}_{season_type}"

                    elif data_type == "stats":
                        season_context = data.get("season_context", {})
                        year = season_context.get("year", "unknown")
                        season_type = season_context.get("type", "").upper()
                        doc_id = f"seasonal_stats_{year}_{season_type}"
                        data["type"] = doc_id

                    elif data_type.startswith("seasonal_stats_"):
                        doc_id = data_type

                    elif data_type == "team_profile":
                        doc_id = "team_profile"

                    else:
                        doc_id = data.get("id") or data.get("game_id") or f"{data_type}_{timestamp}"

                    # ---------------- Always replace the document ----------------
                    if doc_id in db:
                        del db[doc_id]  # remove old version

                    db[doc_id] = data
                    print(f"[+] Saved document '{doc_id}' to {db_name} from topic '{topic}'")

                    # ---------------- Update last_updated ----------------
                    update_doc_id = "last_updated"
                    update_doc = db.get(update_doc_id, {})
                    update_doc["_id"] = update_doc_id
                    update_doc[topic] = timestamp
                    db[update_doc_id] = update_doc
                    print(f"[⏱] Updated last_updated.{topic} = {timestamp}")

                except Exception as e:
                    print(f"[!] Error saving to CouchDB ({db_name}):", e)

    except Exception as loop_err:
        print(f"[!] Error in polling loop: {loop_err}")
        time.sleep(2)
