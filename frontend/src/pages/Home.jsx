import React, { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import TeamPerformanceChart from '../components/TeamPerformanceChart';
import PlayerStatsChart from '../components/PlayerStatsChart';

const Home = () => {
  const [teamCount, setTeamCount] = useState("—");
  const [gamesCount, setGamesCount] = useState("—");
  const [playersCount, setPlayersCount] = useState("—");
  const [seasonsCount, setSeasonsCount] = useState("—");

  useEffect(() => {
    // Fetch team count
    fetch("http://192.168.64.6:3001/api/sports/stats/teams-count")
      .then(res => res.json())
      .then(data => setTeamCount(data.count))
      .catch(err => {
        console.error("Failed to fetch team count:", err);
        setTeamCount("—");
      });

    // Fetch games analyzed count
    fetch("http://192.168.64.6:3001/api/sports/stats/games-count")
      .then(res => res.json())
      .then(data => setGamesCount(data.count))
      .catch(err => {
        console.error("Failed to fetch games count:", err);
        setGamesCount("—");
      });

    // Fetch players tracked count
    fetch("http://192.168.64.6:3001/api/sports/stats/players-count")
      .then(res => res.json())
      .then(data => setPlayersCount(data.count))
      .catch(err => {
        console.error("Failed to fetch players count:", err);
        setPlayersCount("—");
      });

    // Fetch seasons tracked
    fetch("http://192.168.64.6:3001/api/sports/stats/seasons-count")
      .then(res => res.json())
      .then(data => setSeasonsCount(data.count))
      .catch(err => {
        console.error("Failed to fetch seasons count:", err);
        setSeasonsCount("—");
      });
  }, []);

  return (
    <div className="p-6 bg-[#F8F9FC] min-h-screen text-[#1D1F6A] font-mono">
      <h1 className="text-2xl font-bold mb-6">Sports Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard icon="🏆" title="Teams Tracked" value={teamCount} />
        <StatsCard icon="📊" title="Games Analyzed" value={gamesCount} />
        <StatsCard icon="🏃" title="Players Logged" value={playersCount} />
        <StatsCard icon="🗓️" title="Seasons Recorded" value={seasonsCount} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TeamPerformanceChart />
        <PlayerStatsChart />
      </div>
    </div>
  );
};

export default Home;
