# Vanderbilt Sports Analytics Dashboard – Backend Setup
This project fetches, transforms, and stores data for Vanderbilt Men's Basketball using the SportRadar API. It supports multiple seasons (years) and season types (REG, CT, PST).

## What's Done
- Team Profile:
    - Static data from Vanderbilt’s team profile is stored in backend/mens_basketball/team_profile/vanderbilt_mens_team_profile.json.

- Seasonal Stats:
    - Seasonal statistics are fetched for specified years (2023 and 2024) and season types (Regular, Conference Tournament, Postseason).
- Data is transformed and saved as:
    vanderbilt_mens_seasonal_stats_<year>_<seasonType>.json
    (e.g., vanderbilt_mens_seasonal_stats_2023_REG.json).

- Schedule:
    - The schedule is fetched, filtered for Vanderbilt games, and saved similarly in JSON files.

- Rate Limiting:
    - A delay is added between API requests to avoid HTTP 429 errors.

- Backend API:
    - An Express server (backend/server.js) serves endpoints for team profile, seasonal stats, and schedule data.


## How to Run
**1. Backend Setup:**
- Navigate to the backend/ directory.
- Install dependencies: `npm install express cors axios`
- Start the backend server: `node server.js` The server runs on port 3001 by default.

**2. Data Fetching** (Seasonal Stats & Schedule):
**NOTE: Do NOT fetch if you don't need to change stats. Our API has a limited quota.**
- Navigate to backend/mens_basketball/seasonal_stats/ or backend/mens_basketball/schedule/.
- Run the fetch script to populate JSON files: `node fetchData.js` The script fetches data for each combination of year (2023, 2024) and season type (REG, CT, PST), saving files like vanderbilt_mens_seasonal_stats_2023_REG.json.

**3. Frontend Setup:**
- In the frontend project directory, install dependencies (if not done already) and start the React app:
`npm install`
`npm start`
- Navigate to http://localhost:3000/mens-basketball to view the dashboard.
- Use the provided dropdowns to switch between different years and season types.

## Additional Notes
- Rate Limits: If you receive a 429 error, try increasing the delay in fetchData.js.