const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.SPORTRADAR_API_KEY || 'Hd1zXvGZxyXcZMXMquPAmTPQTTdtYu7ONu9Ml6uQ';

// Vanderbilt Men's Basketball Team ID
const VANDERBILT_TEAM_ID = '72971b77-1d35-40b3-bb63-4c5b29f3d22b';

/**
 * Build the endpoint URL for the schedule based on the season type and year.
 * For example, the endpoint pattern is:
 * https://api.sportradar.us/ncaamb/trial/v8/en/games/{year}/{seasonType}/schedule.json
 */
function buildScheduleEndpoint(seasonType, year) {
  return `https://api.sportradar.us/ncaamb/trial/v8/en/games/${year}/${seasonType}/schedule.json`;
}

async function fetchSchedule(seasonType, year) {
  const endpoint = buildScheduleEndpoint(seasonType, year);
  try {
    const response = await axios.get(endpoint, {
      params: { api_key: API_KEY },
    });
    console.log(`Raw ${seasonType} Schedule Data for ${year}:`, response.data);

    // Transform & filter for Vanderbilt games only
    const transformedData = transformSchedule(response.data);
    console.log(`Transformed Schedule (${seasonType}, ${year}) for Vanderbilt:`, transformedData);

    // Save the transformed data to a JSON file
    fs.writeFileSync(
      `vanderbilt_mens_schedule_${year}_${seasonType}.json`,
      JSON.stringify(transformedData, null, 2)
    );
    console.log(`Saved to vanderbilt_mens_schedule_${year}_${seasonType}.json`);
  } catch (error) {
    console.error(`Error fetching schedule for ${seasonType} ${year}:`, error.message);
  }
}

/**
 * Transform function to filter and reformat games for Vanderbilt.
 * It takes the raw schedule response, filters games where Vanderbilt is either
 * the home or away team, and returns a simplified structure.
 */
function transformSchedule(rawData) {
  const { league, season, games } = rawData;
  
  if (!Array.isArray(games)) {
    return { league, season, games: [] };
  }
  
  // Filter games where Vanderbilt is either the home or away team
  const vandyGames = games.filter(game => {
    return (
      game.home?.id === VANDERBILT_TEAM_ID ||
      game.away?.id === VANDERBILT_TEAM_ID
    );
  });
  
  // Transform each game to a simpler structure (without status field)
  const transformedGames = vandyGames.map(game => ({
    id: game.id,
    coverage: game.coverage,
    scheduled: game.scheduled,
    conference_game: game.conference_game || false,
    home_team: {
      id: game.home?.id,
      name: game.home?.name,
      alias: game.home?.alias,
      points: game.home_points || null,
    },
    away_team: {
      id: game.away?.id,
      name: game.away?.name,
      alias: game.away?.alias,
      points: game.away_points || null,
    },
    venue: {
      id: game.venue?.id,
      name: game.venue?.name,
      city: game.venue?.city,
      state: game.venue?.state,
      country: game.venue?.country,
    },
    broadcasts: game.broadcasts?.map(b => ({
      network: b.network,
      type: b.type,
    })) || [],
  }));
  
  return {
    league: {
      id: league?.id,
      name: league?.name,
      alias: league?.alias,
    },
    season: {
      id: season?.id,
      year: season?.year,
      type: season?.type,
    },
    games: transformedGames,
  };
}

// Main function to fetch schedule for multiple season types and years
async function main() {
  // Define the years you want to support
  const years = ['2023', '2024'];
  const seasonTypes = ['REG', 'CT', 'PST'];
  
  for (let year of years) {
    for (let seasonType of seasonTypes) {
      await fetchSchedule(seasonType, year);
    }
  }
}

main();
