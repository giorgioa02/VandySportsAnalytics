import React, { useState, useEffect } from 'react';
import logo from '../assets/FB.jpg';

const VANDY_TEAM_ID = "8177772e-e8b5-44c6-8dc2-a745b863ec3b";

const statsMapping = {
  touchdowns_total: "Total Touchdowns",
  rushing_yards: "Total Rushing Yards",
  rushing_avg: "Average Rushing Yards",
  passing_yards: "Total Passing Yards",
  passing_avg: "Average Passing Yards",
  punts: "Total Punts",
  punt_avg_yards: "Average Punt Yards",
  punt_returns: "Total Punt Returns",
  punt_return_avg_yards: "Average Punt Return Yards",
  kickoffs: "Total Kickoffs",
  kick_return_avg_yards: "Average Kick Return Yards",
  interceptions: "Total Interceptions",
  fumbles: "Total Fumbles",
  field_goals_made: "Field Goals Made",
  field_goals_attempted: "Field Goals Attempted",
  field_goals_pct: "Field Goal Percentage",
};

function getVandyResult(game) {
  if (!game.home_team.points || !game.away_team.points) return '-';
  return game.home_team.id === VANDY_TEAM_ID
    ? (game.home_team.points > game.away_team.points ? 'W' : 'L')
    : (game.away_team.points > game.home_team.points ? 'W' : 'L');
}

const MensFootballDashboard = () => {
  const [teamProfile, setTeamProfile] = useState(null);
  const [seasonalStats, setSeasonalStats] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [year, setYear] = useState('2024');
  const [seasonType, setSeasonType] = useState('REG');

  useEffect(() => {
    fetch('http://localhost:3001/api/mens-football/team-profile')
      .then(res => res.json())
      .then(setTeamProfile)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/mens-football/${year}/seasonal-stats/${seasonType.toLowerCase()}`)
      .then(res => res.json())
      .then(setSeasonalStats)
      .catch(console.error);
  }, [year, seasonType]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/mens-football/${year}/schedule/${seasonType.toLowerCase()}`)
      .then(res => res.json())
      .then(setSchedule)
      .catch(console.error);
  }, [year, seasonType]);

  if (!teamProfile || !seasonalStats || !schedule) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <h1 className="text-4xl font-bold mr-4">Vanderbilt Commodores Men's Football</h1>
        <img src={logo} alt="Vanderbilt Commodores Logo" className="w-20 h-20 object-contain" />
      </div>
      <div className="mb-8 flex items-center">
        <label className="mr-4 font-bold">Year:</label>
        <select value={year} onChange={e => setYear(e.target.value)} className="p-2 border rounded">
          <option value="2023">2023-2024</option>
          <option value="2024">2024-2025</option>
        </select>
        <label className="ml-8 mr-4 font-bold">Season Type:</label>
        <select value={seasonType} onChange={e => setSeasonType(e.target.value)} className="p-2 border rounded">
          <option value="REG">Regular Season</option>
        </select>
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Team Profile</h2>
        <p><strong>Alias:</strong> {teamProfile.alias}</p>
        <p><strong>Venue:</strong> {teamProfile.venue.name}, {teamProfile.venue.city}, {teamProfile.venue.state}</p>

        <p><strong>Conference:</strong> {teamProfile.conference}</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Seasonal Team Stats ({seasonType}, {year})</h2>
        <table className="min-w-full border" cellPadding="8">
          <thead><tr className="bg-[#dac283]"><th>Statistic</th><th>Value</th></tr></thead>
          <tbody>
            {Object.entries(seasonalStats.team_stats).map(([key, value]) => (
              <tr key={key}><td>{statsMapping[key] || key}</td><td>{value}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Player Stats ({seasonType}, {year})</h2>
        {seasonalStats.player_stats.length ? (
          <table className="min-w-full border" cellPadding="8">
            <thead>
              <tr className="bg-[#dac283]"><th>Player</th><th>Position</th><th>Touchdowns</th><th>Passing Yds</th><th>Rushing Yds</th></tr>
            </thead>
            <tbody>
              {seasonalStats.player_stats.map(player => (
                <tr key={player.player_id}>
                  <td>{player.full_name}</td><td>{player.position}</td><td>{player.touchdowns_total}</td>
                  <td>{player.passing_yards}</td><td>{player.rushing_yards}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No player stats available</p>}
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Schedule ({seasonType}, {year})</h2>
        {schedule.games.length ? (
          <table className="min-w-full border" cellPadding="8">
            <thead>
              <tr className="bg-[#dac283]"><th>Date</th><th>Home</th><th>Away</th><th>H Points</th><th>A Points</th><th>Result</th></tr>
            </thead>
            <tbody>
              {schedule.games.map(game => (
                <tr key={game.id}>
                  <td>{new Date(game.scheduled).toLocaleDateString()}</td>
                  <td>{game.home_team.name}</td>
                  <td>{game.away_team.name}</td>
                  <td>{game.home_team.points || 'N/A'}</td>
                  <td>{game.away_team.points || 'N/A'}</td>
                  <td>{getVandyResult(game)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No schedule available</p>}
      </section>
    </div>
  );
};

export default MensFootballDashboard;

