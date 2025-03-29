const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.SPORTRADAR_API_KEY || 'Hd1zXvGZxyXcZMXMquPAmTPQTTdtYu7ONu9Ml6uQ';

// Vanderbilt Men's Basketball Team ID
const VANDERBILT_TEAM_ID = '72971b77-1d35-40b3-bb63-4c5b29f3d22b';

/**
 * Build the endpoint URL for seasonal stats based on season type and year.
 * For example:
 * https://api.sportradar.us/ncaamb/trial/v8/en/seasons/{year}/{seasonType}/teams/{team_id}/statistics.json
 */
function buildSeasonalStatsEndpoint(seasonType, year) {
  return `https://api.sportradar.us/ncaamb/trial/v8/en/seasons/${year}/${seasonType}/teams/${VANDERBILT_TEAM_ID}/statistics.json`;
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

    // Save to a JSON file (naming: vanderbilt_mens_seasonal_stats_{year}_{seasonType}.json)
    const fileName = `vanderbilt_mens_seasonal_stats_${year}_${seasonType}.json`;
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

  // Use own_record for team statistics
  const overall = rawData.own_record?.total || {};
  const overallAvg = rawData.own_record?.average || {};
  result.team_stats = {
    points_total: overall.points || 0,
    points_avg: overallAvg.points || 0,
    rebounds_total: overall.rebounds || 0,
    rebounds_avg: overallAvg.rebounds || 0,
    assists_total: overall.assists || 0,
    assists_avg: overallAvg.assists || 0,
    steals_total: overall.steals || 0,
    steals_avg: overallAvg.steals || 0,
    blocks_total: overall.blocks || 0,
    blocks_avg: overallAvg.blocks || 0,
    turnovers_total: overall.turnovers || 0,
    turnovers_avg: overallAvg.turnovers || 0,
    field_goals_att: overall.field_goals_att || 0,
    field_goals_made: overall.field_goals_made || 0,
    field_goals_pct: overall.field_goals_pct || 0,
    three_points_att: overall.three_points_att || 0,
    three_points_made: overall.three_points_made || 0,
    three_points_pct: overall.three_points_pct || 0,
    free_throws_att: overall.free_throws_att || 0,
    free_throws_made: overall.free_throws_made || 0,
    free_throws_pct: overall.free_throws_pct || 0,
  };

  // Transform player stats if available
  if (Array.isArray(rawData.players)) {
    result.player_stats = rawData.players.map(player => ({
      player_id: player.id,
      full_name: player.full_name,
      position: player.position,
      points_total: player.total?.points || 0,
      points_avg: player.average?.points || 0,
      rebounds_total: player.total?.rebounds || 0,
      rebounds_avg: player.average?.rebounds || 0,
      assists_total: player.total?.assists || 0,
      assists_avg: player.average?.assists || 0,
      steals_total: player.total?.steals || 0,
      steals_avg: player.average?.steals || 0,
      blocks_total: player.total?.blocks || 0,
      blocks_avg: player.average?.blocks || 0,
      turnovers_total: player.total?.turnovers || 0,
      turnovers_avg: player.average?.turnovers || 0,
      field_goals_att: player.total?.field_goals_att || 0,
      field_goals_made: player.total?.field_goals_made || 0,
      field_goals_pct: player.total?.field_goals_pct || 0,
      three_points_att: player.total?.three_points_att || 0,
      three_points_made: player.total?.three_points_made || 0,
      three_points_pct: player.total?.three_points_pct || 0,
      free_throws_att: player.total?.free_throws_att || 0,
      free_throws_made: player.total?.free_throws_made || 0,
      free_throws_pct: player.total?.free_throws_pct || 0,
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
  const seasonTypes = ['REG', 'CT', 'PST']; // Season types

  for (let year of years) {
    for (let seasonType of seasonTypes) {
      await fetchSeasonalStats(seasonType, year);
      // Delay between requests to avoid rate limiting (adjust ms as needed)
      await sleep(3000);
    }
  }
}

main();
