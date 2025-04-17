import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const TopScorersChart = ({ players }) => {
  // take top 5 by average points
  const data = players
    .map(p => ({ name: p.full_name, points: p.average?.points }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Top 5 Scorers (Average)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={185} />
          <Tooltip />
          <Legend />
          <Bar dataKey="points" fill="#82ca9d" name="Points Average" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopScorersChart;
