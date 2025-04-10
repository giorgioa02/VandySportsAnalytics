import React from 'react';

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
  field_goals_pct: "Field Goal %",
  three_points_att: "3-Point Attempts",
  three_points_made: "3-Point Made",
  three_points_pct: "3-Point %",
  free_throws_att: "Free Throw Attempts",
  free_throws_made: "Free Throws Made",
  free_throws_pct: "Free Throw %"
};

const VANDY_ID = "72971b77-1d35-40b3-bb63-4c5b29f3d22b";

const MensBasketballDashboard = ({ stats, schedule }) => {
  const renderTeamStats = () => {
    const teamStats = stats?.own_record?.average;

    if (!teamStats || Object.keys(teamStats).length === 0) {
      return <p className="text-gray-500">No team stats available.</p>;
    }

    return (
      <table className="min-w-full border border-gray-300 mb-8" cellPadding="8">
        <thead>
          <tr className="bg-[#d2d6dc] text-left">
            <th className="border border-gray-300">Statistic</th>
            <th className="border border-gray-300">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(teamStats).map(([key, value], index) => (
            <tr
              key={key}
              className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f4ff]'}
            >
              <td className="border border-gray-300 capitalize">
                {statsMapping[key] || key.replace(/_/g, ' ')}
              </td>
              <td className="border border-gray-300">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderPlayerStats = () => {
    const playerStats = stats?.players;

    if (!playerStats || playerStats.length === 0) {
      return <p className="text-gray-500">No player stats available.</p>;
    }

    return (
      <table className="min-w-full border border-gray-300 mb-8" cellPadding="8">
        <thead>
          <tr className="bg-[#d2d6dc] text-left">
            <th className="border border-gray-300">Player</th>
            <th className="border border-gray-300">Pos</th>
            <th className="border border-gray-300">Points</th>
            <th className="border border-gray-300">Rebounds</th>
            <th className="border border-gray-300">Assists</th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map((p, index) => (
            <tr
              key={p.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f4ff]'}
            >
              <td className="border border-gray-300">{p.full_name}</td>
              <td className="border border-gray-300">{p.position}</td>
              <td className="border border-gray-300">{p.total?.points ?? '—'}</td>
              <td className="border border-gray-300">{p.total?.rebounds ?? '—'}</td>
              <td className="border border-gray-300">{p.total?.assists ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const getResult = (game) => {
    const homeId = game.home?.id;
    const awayId = game.away?.id;
    const homePts = game.home_points ?? 0;
    const awayPts = game.away_points ?? 0;
    if (!homeId || !awayId) return '-';

    if (homeId === VANDY_ID) return homePts > awayPts ? 'W' : 'L';
    if (awayId === VANDY_ID) return awayPts > homePts ? 'W' : 'L';
    return '-';
  };

  const renderSchedule = () => {
    return (
      <table className="w-full border text-sm font-mono border-[#E0E7FF]">
        <thead className="bg-[#d2d6dc] text-left">
          <tr>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Home</th>
            <th className="p-2 border">Away</th>
            <th className="p-2 border">H. Pts</th>
            <th className="p-2 border">A. Pts</th>
            <th className="p-2 border">Result</th>
          </tr>
        </thead>
        <tbody>
          {schedule.games.map((game, index) => (
            <tr
              key={game.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f4ff]'}
            >
              <td className="p-2 border">{new Date(game.scheduled).toLocaleDateString()}</td>
              <td className="p-2 border">{game.home?.name}</td>
              <td className="p-2 border">{game.away?.name}</td>
              <td className="p-2 border">{game.home_points ?? '—'}</td>
              <td className="p-2 border">{game.away_points ?? '—'}</td>
              <td className="p-2 border">{getResult(game)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Team Stats</h2>
        {renderTeamStats()}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Player Stats</h2>
        {renderPlayerStats()}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Schedule</h2>
        {renderSchedule()}
      </section>
    </div>
  );
};

export default MensBasketballDashboard;
