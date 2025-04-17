import React from 'react'
import TeamStatsChart from './page_charts/TeamStatsChart'
import TopScorersChart from './page_charts/TopScorersChart'

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
}

const VANDY_ID = "1d9515d0-910a-44d1-b2bb-661390767673"

const WomensBasketballDashboard = ({ stats, schedule }) => {
  const teamAvg = {
    points: stats.own_record.average.points,
    rebounds: stats.own_record.average.rebounds,
    assists: stats.own_record.average.assists,
  }
  const players = stats.players

  const renderTeamStats = () => {
    const teamStats = stats?.own_record?.average
    if (!teamStats || Object.keys(teamStats).length === 0) {
      return <p className="text-gray-500">No team stats available.</p>
    }
    return (
      <table className="min-w-full border border-gray-300 mb-8" cellPadding="8">
        <thead>
          <tr className="bg-[#d2d6dc] text-left">
            <th className="border border-gray-300">Statistic</th>
            <th className="border border-gray-300">Avg/Game</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(teamStats).map(([key, value], idx) => (
            <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f0f4ff]'}>
              <td className="border border-gray-300 capitalize">
                {statsMapping[key] || key.replace(/_/g, ' ')}
              </td>
              <td className="border border-gray-300">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const renderPlayerStats = () => {
    const playerStats = stats?.players
    if (!playerStats || playerStats.length === 0) {
      return <p className="text-gray-500">No player stats available.</p>
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
          {playerStats.map((p, idx) => (
            <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f0f4ff]'}>
              <td className="border border-gray-300">{p.full_name}</td>
              <td className="border border-gray-300">{p.position}</td>
              <td className="border border-gray-300">{p.total?.points ?? '—'}</td>
              <td className="border border-gray-300">{p.total?.rebounds ?? '—'}</td>
              <td className="border border-gray-300">{p.total?.assists ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const getResult = (game) => {
    const home = game.home?.id, away = game.away?.id
    const hPts = game.home_points ?? 0, aPts = game.away_points ?? 0
    if (!home || !away) return '-'
    if (home === VANDY_ID) return hPts > aPts ? 'W' : 'L'
    if (away === VANDY_ID) return aPts > hPts ? 'W' : 'L'
    return '-'
  }

  const renderSchedule = () => (
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
        {schedule.games.map((game, idx) => (
          <tr key={game.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f0f4ff]'}>
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
  )

  return (
    <div>
      {/* 1) Team Averages chart */}
      <section className="mb-8">
        <TeamStatsChart averages={teamAvg} />
      </section>

      {/* 2) Team Stats table */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Team Stats</h2>
        {renderTeamStats()}
      </section>

      {/* 3) Top Scorers chart */}
      <section className="mb-8">
        <TopScorersChart players={players} />
      </section>

      {/* 4) Player Stats table */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Player Stats</h2>
        {renderPlayerStats()}
      </section>

      {/* 5) Schedule table */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Schedule</h2>
        {renderSchedule()}
      </section>
    </div>
  )
}

export default WomensBasketballDashboard
