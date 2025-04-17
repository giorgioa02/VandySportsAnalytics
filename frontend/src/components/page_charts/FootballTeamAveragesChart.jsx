import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const FootballTeamAveragesChart = ({ record }) => {
  if (!record) return null;

  const { games_played, passing = {}, rushing = {}} = record;

  // Build per‐game averages
  const data = [
    {
      name: 'Passing Yds/Game',
      value: games_played ? passing.yards / games_played : 0
    },
    {
      name: 'Rushing Yds/Game',
      value: games_played ? rushing.yards / games_played : 0
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Team Averages</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={160} />
          <Tooltip formatter={(val) => val.toFixed(1)} />
          <Bar dataKey="value" fill="#8884d8" name="Yards/Game" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FootballTeamAveragesChart;
