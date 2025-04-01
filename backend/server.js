const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// --- Men's Basketball Endpoints ---
app.get('/api/mens-basketball/team-profile', (req, res) => {
  const teamProfile = require('./mens_basketball/team_profile/vanderbilt_mens_team_profile.json');
  res.json(teamProfile);
});

app.get('/api/mens-basketball/:year/seasonal-stats/:seasonType', (req, res) => {
  const { year, seasonType } = req.params;
  const upperSeason = seasonType.toUpperCase(); // Expecting REG, CT, or PST
  
  if (!['REG', 'CT', 'PST'].includes(upperSeason)) {
    return res.status(400).json({ error: 'Invalid season type. Use REG, CT, or PST.' });
  }
  
  try {
    const filePath = `./mens_basketball/seasonal_stats/vanderbilt_mens_seasonal_stats_${year}_${upperSeason}.json`;
    const seasonalStats = require(filePath);
    res.json(seasonalStats);
  } catch (err) {
    res.status(404).json({ error: `Seasonal stats not found for year ${year} and season type ${upperSeason}` });
  }
});

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

// Optional default endpoints for Men's Basketball
app.get('/api/mens-basketball/seasonal-stats', (req, res) => {
  const seasonalStats = require('./mens_basketball/seasonal_stats/vanderbilt_mens_seasonal_stats_2024_REG.json');
  res.json(seasonalStats);
});

app.get('/api/mens-basketball/schedule', (req, res) => {
  const schedule = require('./mens_basketball/schedule/vanderbilt_mens_schedule_2024_REG.json');
  res.json(schedule);
});

// --- Men's Football Endpoints ---
app.get('/api/mens-football/team-profile', (req, res) => {
  const teamProfile = require('./mens_football/team_profile/vanderbilt_mens_football_team_profile.json');
  res.json(teamProfile);
});

app.get('/api/mens-football/:year/seasonal-stats/:seasonType', (req, res) => {
  const { year, seasonType } = req.params;
  const upperSeason = seasonType.toUpperCase(); // Expecting REG, CT, or PST
  
  if (!['REG', 'CT', 'PST'].includes(upperSeason)) {
    return res.status(400).json({ error: 'Invalid season type. Use REG, CT, or PST.' });
  }
  
  try {
    const filePath = `./mens_football/seasonal_stats/vanderbilt_mens_football_seasonal_stats_${year}_${upperSeason}.json`;
    const seasonalStats = require(filePath);
    res.json(seasonalStats);
  } catch (err) {
    res.status(404).json({ error: `Seasonal stats not found for year ${year} and season type ${upperSeason}` });
  }
});

app.get('/api/mens-football/:year/schedule/:seasonType', (req, res) => {
  const { year, seasonType } = req.params;
  const upperSeason = seasonType.toUpperCase();
  
  if (!['REG', 'CT', 'PST'].includes(upperSeason)) {
    return res.status(400).json({ error: 'Invalid season type. Use REG, CT, or PST.' });
  }
  
  try {
    const filePath = `./mens_football/schedule/vanderbilt_mens_football_schedule_${year}_${upperSeason}.json`;
    const schedule = require(filePath);
    res.json(schedule);
  } catch (err) {
    res.status(404).json({ error: `Schedule not found for year ${year} and season type ${upperSeason}` });
  }
});

// Optional default endpoints for Men's Football
app.get('/api/mens-football/seasonal-stats', (req, res) => {
  const seasonalStats = require('./mens_football/seasonal_stats/vanderbilt_mens_football_seasonal_stats_2024_REG.json');
  res.json(seasonalStats);
});

app.get('/api/mens-football/schedule', (req, res) => {
  const schedule = require('./mens_football/schedule/vanderbilt_mens_football_schedule_2024_REG.json');
  res.json(schedule);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

