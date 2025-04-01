const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Endpoint to serve the Vanderbilt Men's Basketball Team Profile (static)
app.get('/api/mens-basketball/team-profile', (req, res) => {
  const teamProfile = require('./mens_basketball/team_profile/vanderbilt_mens_team_profile.json');
  res.json(teamProfile);
});

// Endpoint to serve Vanderbilt Men's Basketball Seasonal Stats for a given year and season type
app.get('/api/mens-basketball/:year/seasonal-stats/:seasonType', (req, res) => {
  const { year, seasonType } = req.params;
  const upperSeason = seasonType.toUpperCase(); // Expecting REG, CT, or PST
  
  // Validate season type and year format if needed
  if (!['REG', 'CT', 'PST'].includes(upperSeason)) {
    return res.status(400).json({ error: 'Invalid season type. Use REG, CT, or PST.' });
  }
  
  try {
    // Build file path based on year and season type
    const filePath = `./mens_basketball/seasonal_stats/vanderbilt_mens_seasonal_stats_${year}_${upperSeason}.json`;
    const seasonalStats = require(filePath);
    res.json(seasonalStats);
  } catch (err) {
    res.status(404).json({ error: `Seasonal stats not found for year ${year} and season type ${upperSeason}` });
  }
});

// Endpoint to serve Vanderbilt Men's Basketball Schedule for a given year and season type
app.get('/api/mens-basketball/:year/schedule/:seasonType', (req, res) => {
  const { year, seasonType } = req.params;
  const upperSeason = seasonType.toUpperCase();
  
  if (!['REG', 'CT', 'PST'].includes(upperSeason)) {
    return res.status(400).json({ error: 'Invalid season type. Use REG, CT, or PST.' });
  }
  
  try {
    const filePath = `./mens_basketball/schedule/vanderbilt_mens_schedule_${year}_${upperSeason}.json`;
    const schedule = require(filePath);
    res.json(schedule);
  } catch (err) {
    res.status(404).json({ error: `Schedule not found for year ${year} and season type ${upperSeason}` });
  }
});

// Optional default endpoints (if desired)
app.get('/api/mens-basketball/seasonal-stats', (req, res) => {
  // Defaults to current year (e.g., 2024) and REG
  const seasonalStats = require('./mens_basketball/seasonal_stats/vanderbilt_mens_seasonal_stats_2024_REG.json');
  res.json(seasonalStats);
});

app.get('/api/mens-basketball/schedule', (req, res) => {
  const schedule = require('./mens_basketball/schedule/vanderbilt_mens_schedule_2024_REG.json');
  res.json(schedule);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
