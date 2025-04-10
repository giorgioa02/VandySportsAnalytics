import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'January', performance: 75 },
  { name: 'February', performance: 68 },
  { name: 'March', performance: 82 },
  { name: 'April', performance: 90 },
  { name: 'May', performance: 70 },
  { name: 'June', performance: 85 },
  { name: 'July', performance: 78 },
];

const TeamPerformanceChart = () => (
  <div className="bg-white text-[#1D1F6A] p-6 rounded-xl shadow-md w-full font-mono">
    <h2 className="text-lg font-semibold mb-4">Team Performance Over Time</h2>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
        <XAxis dataKey="name" stroke="#7C3AED" />
        <YAxis stroke="#7C3AED" />
        <Tooltip />
        <Line type="monotone" dataKey="performance" stroke="#7C3AED" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default TeamPerformanceChart;
