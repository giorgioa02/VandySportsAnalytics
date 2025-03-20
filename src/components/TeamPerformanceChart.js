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

const TeamPerformanceChart = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-white text-lg mb-2">Team Performance Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Line type="monotone" dataKey="performance" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamPerformanceChart;
