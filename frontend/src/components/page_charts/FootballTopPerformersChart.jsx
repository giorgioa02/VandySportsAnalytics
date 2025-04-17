import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const FootballTopPerformersChart = ({ players }) => {
  if (!players) return null;

  // Sum all TD sources per player, then pick top 5
  const data = players
    .map(p => {
      const tds =
        (p.passing?.touchdowns || 0) +
        (p.rushing?.touchdowns || 0) +
        (p.receiving?.touchdowns || 0) +
        (p.int_returns?.touchdowns || 0) +
        (p.fumbles?.opp_rec_tds || 0) +
        (p.fumbles?.own_rec_tds || 0) +
        (p.fumbles?.ez_rec_tds || 0);
      return { name: p.name, tds };
    })
    .filter(d => d.tds > 0)
    .sort((a, b) => b.tds - a.tds)
    .slice(0, 5);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Top 5 Scorers (Touchdowns)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={160} />
          <Tooltip />
          <Bar dataKey="tds" fill="#82ca9d" name="Touchdowns" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FootballTopPerformersChart;
