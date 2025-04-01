const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.SPORTRADAR_API_KEY || 'Hd1zXvGZxyXcZMXMquPAmTPQTTdtYu7ONu9Ml6uQ';
const VANDERBILT_TEAM_ID = '8177772e-e8b5-44c6-8dc2-a745b863ec3b';

function buildScheduleEndpoint(seasonType, year) {
  return `https://api.sportradar.us/ncaafb/trial/v7/en/games/${year}/${seasonType}/schedule.json`;
}

async function fetchSchedule(seasonType, year) {
  const endpoint = buildScheduleEndpoint(seasonType, year);
  try {
    const response = await axios.get(endpoint, { params: { api_key: API_KEY } });
    console.log(`Raw ${seasonType} Schedule Data for ${year}:`, response.data);

    const transformedData = transformSchedule(response.data);
    console.log(`Transformed Schedule (${seasonType}, ${year}) for Vanderbilt:`, transformedData);

    fs.writeFileSync(
      `vanderbilt_mens_football_schedule_${year}_${seasonType}.json`,
      JSON.stringify(transformedData, null, 2)
    );
    console.log(`Saved to vanderbilt_mens_football_schedule_${year}_${seasonType}.json`);
  } catch (error) {
    console.error(`Error fetching schedule for ${seasonType} ${year}:`, error.message);
  }
}

function transformSchedule(rawData) {
  const { id, year, type, weeks } = rawData;
  if (!Array.isArray(weeks)) {
    return { id, year, type, games: [] };
  }

  const vandyGames = weeks.flatMap(week => 
    week.games.filter(game => 
      game.home?.id === VANDERBILT_TEAM_ID || game.away?.id === VANDERBILT_TEAM_ID
    )
  );

  const transformedGames = vandyGames.map(game => ({
    id: game.id,
    status: game.status,
    scheduled: game.scheduled,
    attendance: game.attendance || null,
    duration: game.duration || null,
    conference_game: game.conference_game || false,
    neutral_site: game.neutral_site || false,
    home_team: {
      id: game.home?.id,
      name: game.home?.name,
      alias: game.home?.alias,
      points: game.scoring?.home_points || null,
    },
    away_team: {
      id: game.away?.id,
      name: game.away?.name,
      alias: game.away?.alias,
      points: game.scoring?.away_points || null,
    },
    venue: {
      id: game.venue?.id,
      name: game.venue?.name,
      city: game.venue?.city,
      state: game.venue?.state,
      country: game.venue?.country,
      capacity: game.venue?.capacity || null,
      surface: game.venue?.surface || null,
      roof_type: game.venue?.roof_type || null,
    },
    broadcasts: game.broadcast ? [{
      network: game.broadcast.network,
      satellite: game.broadcast.satellite,
    }] : [],
    weather: game.weather ? {
      condition: game.weather.condition,
      temperature: game.weather.temp,
      humidity: game.weather.humidity,
      wind: game.weather.wind,
    } : null,
  }));

  return { id, year, type, games: transformedGames };
}

async function main() {
  const years = ['2023', '2024'];
  const seasonTypes = ['REG'];
  
  for (let year of years) {
    for (let seasonType of seasonTypes) {
      await fetchSchedule(seasonType, year);
    }
  }
}

main();