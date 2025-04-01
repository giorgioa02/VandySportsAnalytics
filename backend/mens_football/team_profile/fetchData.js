const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.SPORTRADAR_API_KEY || 'Hd1zXvGZxyXcZMXMquPAmTPQTTdtYu7ONu9Ml6uQ';
const VANDERBILT_TEAM_ID = '8177772e-e8b5-44c6-8dc2-a745b863ec3b';
const endpoint = `https://api.sportradar.us/ncaafb/trial/v7/en/teams/${VANDERBILT_TEAM_ID}/profile.json`;

async function fetchVanderbiltTeamProfile() {
  try {
    const response = await axios.get(endpoint, { params: { api_key: API_KEY } });
    console.log('Raw Team Profile Data:', response.data);

    const transformedData = transformTeamProfile(response.data);
    console.log('Transformed Team Profile:', transformedData);

    saveDataToFile(transformedData, 'vanderbilt_mens_football_team_profile.json');
  } catch (error) {
    console.error('Error fetching Vanderbilt team profile:', error.message);
  }
}

function transformTeamProfile(rawData) {
  return {
    team_id: rawData.id || null,
    name: rawData.name || null,
    market: rawData.market || null,
    alias: rawData.alias || null,
    founded: rawData.founded || null,
    mascot: rawData.mascot || null,
    fight_song: rawData.fight_song || null,
    championships_won: rawData.championships_won || 0,
    conference_titles: rawData.conference_titles || 0,
    playoff_appearances: rawData.playoff_appearances || 0,
    conference: rawData.conference?.name || null,
    division: rawData.division?.name || null,
    venue: {
      name: rawData.venue?.name || null,
      city: rawData.venue?.city || null,
      state: rawData.venue?.state || null,
      capacity: rawData.venue?.capacity || null,
      surface: rawData.venue?.surface || null,
      roof_type: rawData.venue?.roof_type || null,
    },
    coaches: rawData.coaches?.map(coach => ({
      id: coach.id,
      full_name: coach.full_name,
      position: coach.position,
    })) || [],
    players: rawData.players?.map(player => ({
      player_id: player.id,
      full_name: player.name,
      position: player.position,
      height: player.height,
      weight: player.weight,
      jersey: player.jersey,
      birth_place: player.birth_place,
      status: player.status,
      eligibility: player.eligibility,
    })) || [],
  };
}

function saveDataToFile(data, fileName) {
  fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error('Error saving data:', err);
    } else {
      console.log(`Data saved to ${fileName}`);
    }
  });
}

fetchVanderbiltTeamProfile();
