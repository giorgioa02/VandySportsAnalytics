# Vanderbilt Sports Analytics (VSA)

**Vanderbilt Sports Analytics (VSA)** is a student-driven initiative launched as part of **CS x287: Principles of Cloud Computing**.

Our mission is to apply cloud deployment technologies, data science, and statistical methods to Vanderbilt Athletics.

We aim to provide actionable insights, visualizations, and tools that empower fans, coaches, and players to better understand the game.

---

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
