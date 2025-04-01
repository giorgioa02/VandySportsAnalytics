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
    <div className="bg-white text-[#1D1F6A] p-6 rounded-xl shadow-md w-full font-mono">
      <h2 className="text-lg font-semibold mb-4">Player Statistics Comparison</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
          <XAxis dataKey="name" stroke="#7C3AED" />
          <YAxis stroke="#7C3AED" />
          <Tooltip />
          <Bar dataKey="points" fill="#7C3AED" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlayerStatsChart;
