import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Player A', points: 24 },
  { name: 'Player B', points: 18 },
  { name: 'Player C', points: 15 },
  { name: 'Player D', points: 20 },
];

const PlayerStatsChart = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-white text-lg mb-2">Player Statistics Comparison</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="points" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlayerStatsChart;
