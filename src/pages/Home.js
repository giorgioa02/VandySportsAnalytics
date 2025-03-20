import React from 'react';
import StatsCard from '../components/StatsCard';
import TeamPerformanceChart from '../components/TeamPerformanceChart';
import PlayerStatsChart from '../components/PlayerStatsChart';

const Home = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Sports Analytics Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard icon="📊" title="Games Analyzed" value="120" />
        <StatsCard icon="🏃" title="Players Tracked" value="450" />
        <StatsCard icon="🏆" title="Teams Covered" value="30" />
        <StatsCard icon="📑" title="Reports Generated" value="85" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TeamPerformanceChart />
        <PlayerStatsChart />
      </div>
    </div>
  );
};

export default Home;