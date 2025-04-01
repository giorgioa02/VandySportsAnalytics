const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.SPORTRADAR_API_KEY || 'Hd1zXvGZxyXcZMXMquPAmTPQTTdtYu7ONu9Ml6uQ';

// Vanderbilt Men's Football Team ID (Replace this with the correct ID from SportRadar)
const VANDERBILT_TEAM_ID = '8177772e-e8b5-44c6-8dc2-a745b863ec3b'; // Replace with actual team ID

/**
 * Build the endpoint URL for seasonal stats based on season type and year.
 * For example:
 * https://api.sportradar.us/ncaafb/trial/v7/en/seasons/{year}/{seasonType}/teams/{team_id}/statistics.json
 */
function buildSeasonalStatsEndpoint(seasonType, year) {
  return `https://api.sportradar.us/ncaafb/trial/v7/en/seasons/${year}/${seasonType}/teams/${VANDERBILT_TEAM_ID}/statistics.json`;
}

async function fetchSeasonalStats(seasonType, year) {
  const endpoint = buildSeasonalStatsEndpoint(seasonType, year);
  try {
    const response = await axios.get(endpoint, {
      params: { api_key: API_KEY },
    });
    console.log(`Raw ${seasonType} Seasonal Stats for ${year}:`, response.data);

    // Transform the data to pick out the fields you need
    const transformedData = transformSeasonalStats(response.data);
    console.log(`Transformed ${seasonType} Seasonal Stats for ${year}:`, transformedData);

    // Save to a JSON file (naming: vanderbilt_mens_football_seasonal_stats_{year}_{seasonType}.json)
    const fileName = `vanderbilt_mens_football_seasonal_stats_${year}_${seasonType}.json`;
    fs.writeFileSync(fileName, JSON.stringify(transformedData, null, 2));
    console.log(`Saved to ${fileName}`);
  } catch (error) {
    console.error(`Error fetching ${seasonType} seasonal stats for ${year}:`, error.message);
  }
}

/**
 * Transform function to extract key stats from the raw SportRadar data.
 * Assumes the raw data structure is:
 * {
 *   id, name, market, season, own_record: { total, average }, players: [ ... ]
 * }
 */
function transformSeasonalStats(rawData) {
  const result = {
    team: {
      id: rawData.id,
      market: rawData.market,
      name: rawData.name,
    },
    season: {
      id: rawData.season?.id,
      year: rawData.season?.year,
      type: rawData.season?.type,
    },
    team_stats: {},
    player_stats: [],
  };

  // Use own_record for team statistics (football specific fields)
  const overall = rawData.record || {};
  const overallAvg = {}; // Since you don't have averages directly, leave it empty or adjust if needed

  result.team_stats = {
    touchdowns_total: overall.touchdowns?.total || 0,
    rushing_yards: overall.rushing?.yards || 0,
    rushing_avg: overall.rushing?.avg_yards || 0,
    passing_yards: overall.passing?.yards || 0,
    passing_avg: overall.passing?.avg_yards || 0,
    punts: overall.punts?.attempts || 0,
    punt_avg_yards: overall.punts?.avg_yards || 0,
    punt_returns: overall.punt_returns?.returns || 0,
    punt_return_avg_yards: overall.punt_returns?.avg_yards || 0,
    kickoffs: overall.kickoffs?.kickoffs || 0,
    kick_return_avg_yards: overall.kick_returns?.avg_yards || 0,
    interceptions: overall.interceptions?.interceptions || 0,
    fumbles: overall.fumbles?.fumbles || 0,
    field_goals_made: overall.field_goals?.made || 0,
    field_goals_attempted: overall.field_goals?.attempts || 0,
    field_goals_pct: overall.field_goals?.pct || 0,
  };

  // If player stats are available, extract them
  if (Array.isArray(rawData.players)) {
    result.player_stats = rawData.players.map(player => ({
      player_id: player.id,
      full_name: player.name,
      position: player.position,
      total_tackles: player.defense?.combined || 0,
      sacks: player.defense?.sacks || 0,
      interceptions: player.defense?.interceptions || 0,
      rushing_yards: player.rushing?.yards || 0,
      rushing_avg: player.rushing?.avg_yards || 0,
      passing_yards: player.passing?.yards || 0,
      passing_avg: player.passing?.avg_yards || 0,
      touchdowns_total: player.touchdowns?.total || 0,
    }));
  }

  return result;
}

// Sleep helper function to delay execution (in ms)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function to fetch stats for multiple season types and years
async function main() {
  const years = ['2023', '2024']; // Define the years you want to support
  const seasonTypes = ['REG']; // Season types

  for (let year of years) {
    for (let seasonType of seasonTypes) {
      await fetchSeasonalStats(seasonType, year);
      // Delay between requests to avoid rate limiting (adjust ms as needed)
      await sleep(3000);
    }
  }
}

main();
