import React, { useState, useEffect } from 'react';
import logo from '../assets/MB.jpg';

// Vanderbilt's Team ID constant
const VANDY_TEAM_ID = "72971b77-1d35-40b3-bb63-4c5b29f3d22b";

// Mapping for friendly names for team stats
const statsMapping = {
  points_total: "Total Points",
  points_avg: "Average Points",
  rebounds_total: "Total Rebounds",
  rebounds_avg: "Average Rebounds",
  assists_total: "Total Assists",
  assists_avg: "Average Assists",
  steals_total: "Total Steals",
  steals_avg: "Average Steals",
  blocks_total: "Total Blocks",
  blocks_avg: "Average Blocks",
  turnovers_total: "Total Turnovers",
  turnovers_avg: "Average Turnovers",
  field_goals_att: "Field Goal Attempts",
  field_goals_made: "Field Goals Made",
  field_goals_pct: "Field Goal Percentage",
  three_points_att: "3-Point Attempts",
  three_points_made: "3-Points Made",
  three_points_pct: "3-Point Percentage",
  free_throws_att: "Free Throw Attempts",
  free_throws_made: "Free Throws Made",
  free_throws_pct: "Free Throw Percentage",
};

// Helper function to determine Vanderbilt's win/loss result for a game
function getVandyResult(game) {
  if (game.home_team.points == null || game.away_team.points == null) {
    return '-';
  }
  if (game.home_team.id === VANDY_TEAM_ID) {
    return game.home_team.points > game.away_team.points ? 'W' : 'L';
  }
  if (game.away_team.id === VANDY_TEAM_ID) {
    return game.away_team.points > game.home_team.points ? 'W' : 'L';
  }
  return '-';
}

const MensBasketballDashboard = () => {
  const [teamProfile, setTeamProfile] = useState(null);
  const [seasonalStats, setSeasonalStats] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [year, setYear] = useState('2024'); // Default year (2024-2025 season)
  const [seasonType, setSeasonType] = useState('REG'); // Default to Regular Season

  // Fetch team profile data (static)
  useEffect(() => {
    fetch('http://localhost:3001/api/mens-basketball/team-profile')
      .then((response) => response.json())
      .then((data) => setTeamProfile(data))
      .catch((err) => console.error('Error fetching team profile:', err));
  }, []);

  // Fetch seasonal stats data whenever year or seasonType changes
  useEffect(() => {
    fetch(`http://localhost:3001/api/mens-basketball/${year}/seasonal-stats/${seasonType.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => setSeasonalStats(data))
      .catch((err) => console.error('Error fetching seasonal stats:', err));
  }, [year, seasonType]);

  // Fetch schedule data whenever year or seasonType changes
  useEffect(() => {
    fetch(`http://localhost:3001/api/mens-basketball/${year}/schedule/${seasonType.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => setSchedule(data))
      .catch((err) => console.error('Error fetching schedule:', err));
  }, [year, seasonType]);

  if (!teamProfile || !seasonalStats || !schedule) {
    return <div>Loading...</div>;
  }

  // Render team-level stats as a table with friendly names
  const renderTeamStatsTable = () => {
    const stats = seasonalStats.team_stats;
    return (
      <table className="min-w-full border border-gray-300" cellPadding="8">
        <thead>
          <tr className="bg-[#dac283]">
            <th className="border border-gray-300">Statistic</th>
            <th className="border border-gray-300">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([key, value]) => (
            <tr key={key}>
              <td className="border border-gray-300">{statsMapping[key] || key}</td>
              <td className="border border-gray-300">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Render player stats as a table
  const renderPlayerStatsTable = () => {
    return (
      <table className="min-w-full border border-gray-300" cellPadding="8">
        <thead>
          <tr className="bg-[#dac283]">
            <th className="border border-gray-300">Player Name</th>
            <th className="border border-gray-300">Position</th>
            <th className="border border-gray-300">Points Total</th>
            <th className="border border-gray-300">Points Avg</th>
            <th className="border border-gray-300">Rebounds Total</th>
            <th className="border border-gray-300">Rebounds Avg</th>
            <th className="border border-gray-300">Assists Total</th>
            <th className="border border-gray-300">Assists Avg</th>
          </tr>
        </thead>
        <tbody>
          {seasonalStats.player_stats.map((player) => (
            <tr key={player.player_id}>
              <td className="border border-gray-300">{player.full_name}</td>
              <td className="border border-gray-300">{player.position}</td>
              <td className="border border-gray-300">{player.points_total}</td>
              <td className="border border-gray-300">{player.points_avg}</td>
              <td className="border border-gray-300">{player.rebounds_total}</td>
              <td className="border border-gray-300">{player.rebounds_avg}</td>
              <td className="border border-gray-300">{player.assists_total}</td>
              <td className="border border-gray-300">{player.assists_avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Render schedule as a table, with an extra "Result" column
  const renderScheduleTable = () => {
    return (
      <table className="min-w-full border border-gray-300" cellPadding="8">
        <thead>
          <tr className="bg-[#dac283]">
            <th className="border border-gray-300">Date</th>
            <th className="border border-gray-300">Home Team</th>
            <th className="border border-gray-300">Away Team</th>
            <th className="border border-gray-300">Home Points</th>
            <th className="border border-gray-300">Away Points</th>
            <th className="border border-gray-300">Result</th>
          </tr>
        </thead>
        <tbody>
          {schedule.games.map((game) => (
            <tr key={game.id}>
              <td className="border border-gray-300">
                {new Date(game.scheduled).toLocaleDateString()}
              </td>
              <td className="border border-gray-300">{game.home_team.name}</td>
              <td className="border border-gray-300">{game.away_team.name}</td>
              <td className="border border-gray-300">{game.home_team.points || 'N/A'}</td>
              <td className="border border-gray-300">{game.away_team.points || 'N/A'}</td>
              <td className="border border-gray-300">{getVandyResult(game)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-8">
      {/* Header with Title and Logo */}
      <div className="flex items-center mb-8">
        <h1 className="text-4xl font-bold mr-4">
          Vanderbilt Commodores Men's Basketball
        </h1>
        <img src={logo} alt="Vanderbilt Commodores Logo" className="w-20 h-20 object-contain" />
      </div>

      {/* Year and Season Type Selector */}
      <div className="mb-8 flex items-center">
        <label className="mr-4 font-bold">Year:</label>
        <select 
          value={year} 
          onChange={(e) => setYear(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="2023">2023-2024</option>
          <option value="2024">2024-2025</option>
        </select>
        <label className="ml-8 mr-4 font-bold">Season Type:</label>
        <select 
          value={seasonType} 
          onChange={(e) => setSeasonType(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="REG">Regular Season</option>
          <option value="CT">Conference Tournament</option>
          <option value="PST">Postseason</option>
        </select>
      </div>

      {/* Team Profile Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Team Profile</h2>
        <p><strong>Alias:</strong> {teamProfile.alias}</p>
        <p><strong>Venue:</strong> {teamProfile.venue}</p>
        <p><strong>Conference:</strong> {teamProfile.conference}</p>
      </section>

      {/* Seasonal Team Stats Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Seasonal Team Stats ({seasonType}, {year})</h2>
        {renderTeamStatsTable()}
      </section>

      {/* Player Stats Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Player Stats ({seasonType}, {year})</h2>
        {seasonalStats.player_stats.length > 0 ? renderPlayerStatsTable() : <p>No player stats available</p>}
      </section>

      {/* Schedule Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Schedule ({seasonType}, {year})</h2>
        {schedule.games.length > 0 ? renderScheduleTable() : <p>No schedule available</p>}
      </section>
    </div>
  );
};


export default MensBasketballDashboard;
