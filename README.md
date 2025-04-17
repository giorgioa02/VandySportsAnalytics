# Vanderbilt Sports Analytics (VSA)

**Vanderbilt Sports Analytics (VSA)** is a student-driven initiative launched as part of **CS x287: Principles of Cloud Computing**.

Our mission is to apply cloud deployment technologies, data science, and statistical methods to Vanderbilt Athletics.

We aim to provide actionable insights, visualizations, and tools that empower fans, coaches, and players to better understand the game.

---
---

### 🐳 Docker & Kubernetes Configuration

This project includes a `docker/` directory containing **Dockerfiles and Python scripts** for all sports data producers (`mbball`, `wbball`, `mfootball`) as well as a unified **Kafka consumer**.

We also include a `k8s/` directory with example **Kubernetes deployment YAMLs** used in our cloud deployment setup.

#### 🔧 To Replicate This Project:

---

### ⚙️ Kubernetes (K8s)

Set up a Kubernetes cluster with:

- A **Control Plane**
- One or more **Worker Nodes**

In our setup, we used 3 main deployments:
- `zookeeper` (with corresponding `zookeeper-service`)
- `kafka` (with `kafka-service` using `NodePort`)
- `sports-consumer` (handles database persistence)

> 🗂️ The YAML files for these deployments can be found in the [`k8s/`](./k8s) directory.

---

### 🐋 Docker

Ensure **Docker is installed and running**.

Inside the `docker/` folder:
- `producers/` — folders for each sport, each with:
  - `Dockerfile`
  - `*_producer.py`
- `consumers/` — shared `Dockerfile` and `sports_consumer.py` for CouchDB persistence

> 🔁 The producer and consumer scripts are **modular** and can be configured for your own Kafka + API setup.

---

### 🔑 Configuration Variables

#### Producer Config (one per sport):

```python
KAFKA_BROKER = '<EXTERNAL_IP>:<NODE_PORT>'
TOPIC_NAME = '<KAFKA_TOPIC>'  # e.g., 'mbball', 'wbball', 'mfootball'
API_KEY = '<SPORTSRADAR_API_KEY>'
VANDY_TEAM_ID = '<TEAM_ID>'
SEASON_YEARS = ['2023', '2024']
SEASON_TYPES = ['REG', 'CT', 'PST']
```

#### Consumer Config (shared)

```python
KAFKA_BROKER = 'kafka-service:9092'
COUCHDB_SERVER = '<COUCHDB_URL>'
TOPICS = ['mbball', 'wbball', 'mfootball']
DB_NAME_PREFIX = 'vandy_'  # e.g., vandy_mbball
```

> 💡 The COUCHDB_SERVER URL must be accessible from inside the K8s cluster (or exposed if running externally).


### ⚙️ Ansible Automation for Producer Deployment

This project includes an **Ansible playbook** that automates the deployment pipeline for our sports data producers (`mbball`, `wbball`, and `mfootball`). These producers fetch live data from the **SportsRadar API**, serialize it into JSON, and push it to **Kafka** topics. Each producer is **Dockerized** and stored in a **private Docker registry**, from which Ansible pulls and runs them.

#### Key Concepts
- **Ansible** is used for remote orchestration and deployment.
  - Producers currently run manually due to API rate limits and off-season availability.
  - In future work, these can be run as **Kubernetes CronJobs** for daily or periodic updates.
- **Docker Registry** (optional): Used to store and distribute prebuilt producer images.
- **Kafka** enables real-time data streaming.
- **Producers** collect and stream sports data to Kafka topics.
- **Playbook** (`run_producer_master.yml`) handles the build, tag, push, cleanup, and run steps.

---

### To Replicate

1. **(Optional)** Set up a Docker private registry  
   Store producer container images in a local or hosted Docker registry.

2. **Install Ansible**  

3. **Configure your Ansible inventory**  
   A sample inventory file (`MyInventory`) is provided

4. **Run the playbook**  
    ansible-playbook -i MyInventory run_producer_master.yml
