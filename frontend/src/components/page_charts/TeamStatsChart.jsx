import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const TeamStatsChart = ({ averages }) => {
  const data = [
    { stat: 'Points', value: averages.points },
    { stat: 'Rebounds', value: averages.rebounds },
    { stat: 'Assists', value: averages.assists },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Team Averages</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="stat" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamStatsChart;