const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.SPORTRADAR_API_KEY || 'Hd1zXvGZxyXcZMXMquPAmTPQTTdtYu7ONu9Ml6uQ';

// Vanderbilt Men's Basketball Team ID
const VANDERBILT_TEAM_ID = '72971b77-1d35-40b3-bb63-4c5b29f3d22b';

// The SportRadar endpoint for the Team Profile
// For NCAAMB (Men's College Basketball), the pattern is:
//   https://api.sportradar.us/ncaamb/trial/v8/en/teams/<team_id>/profile.json
const endpoint = `https://api.sportradar.us/ncaamb/trial/v8/en/teams/${VANDERBILT_TEAM_ID}/profile.json`;

async function fetchVanderbiltTeamProfile() {
  try {
    // Make the API request
    const response = await axios.get(endpoint, {
      params: {
        api_key: API_KEY,
      },
    });

    // Log the raw data so you can see the structure
    console.log('Raw Team Profile Data:', response.data);

    // Optionally transform the data
    const transformedData = transformTeamProfile(response.data);
    console.log('Transformed Team Profile:', transformedData);

    // Save to a JSON file for now
    saveDataToFile(transformedData, 'vanderbilt_mens_team_profile.json');
  } catch (error) {
    console.error('Error fetching Vanderbilt team profile:', error.message);
  }
}

// Example transform function
function transformTeamProfile(rawData) {
  // Check the structure of rawData in your console logs.
  // Adjust the fields below to match what SportRadar returns.
  return {
    team_id: rawData.id || null,
    name: rawData.name || null,
    market: rawData.market || null,
    alias: rawData.alias || null,
    venue: rawData.venue?.name || null,
    conference: rawData.conference?.name || null,
    players: rawData.players?.map(player => ({
      player_id: player.id,
      full_name: player.full_name,
      position: player.position,
      // height in inches
      height: player.height,
      weight: player.weight,
    })) || [],
  };
}

// Utility to save data to a JSON file
function saveDataToFile(data, fileName) {
  fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error('Error saving data:', err);
    } else {
      console.log(`Data saved to ${fileName}`);
    }
  });
}

// Run the script
fetchVanderbiltTeamProfile();
