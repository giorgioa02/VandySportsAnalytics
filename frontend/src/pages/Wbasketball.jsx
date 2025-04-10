import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import {
  fetchWomensBasketballProfile,
  fetchWomensBasketballStats,
  fetchWomensBasketballSchedule,
  fetchWomensBasketballLastUpdated
} from '../utils/api';
import WomensBasketballDashboard from '../components/WomensBasketballDashboard';

export default function WbballPage() {
  const [year, setYear] = useState('2024');
  const [seasonType, setSeasonType] = useState('REG');
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchWomensBasketballProfile().then(setProfile);
  }, []);

  useEffect(() => {
    fetchWomensBasketballStats(year, seasonType.toLowerCase()).then(setStats);
    fetchWomensBasketballSchedule(year, seasonType.toLowerCase()).then(setSchedule);
  }, [year, seasonType]);

  useEffect(() => {
    fetchWomensBasketballLastUpdated()
      .then(setLastUpdated)
      .catch(err => console.error('Failed to fetch last updated time', err));
  }, []);

  const isLoading = !profile?.data || !stats?.data || !schedule?.data;

  return (
    <div className="p-6 bg-[#F8F9FC] min-h-screen text-[#1D1F6A] font-mono">

      {/* Page Title */}
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        🏀 Vanderbilt Women&apos;s Basketball
      </h1>

      {/* Header Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6 flex justify-between items-start flex-wrap">
        <div className="flex gap-4">
          <div>
            <label className="block font-bold mb-1">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-1">Season</label>
            <select
              value={seasonType}
              onChange={(e) => setSeasonType(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="REG">Regular</option>
              <option value="CT">Conference</option>
              <option value="PST">Postseason</option>
            </select>
          </div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="text-sm text-gray-500 text-right whitespace-nowrap mt-4 sm:mt-0">
            <span className="block font-bold">Last Updated:</span>
            {DateTime.fromISO(lastUpdated, { zone: 'utc' })
              .setZone('America/Chicago')
              .toFormat('MMM dd, yyyy • h:mm a ZZZZ')}
          </div>
        )}
      </div>

      {/* Team Info */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Team Profile</h2>
        <ul className="space-y-1">
          <li><strong>Alias:</strong> {profile?.data.alias}</li>
          <li><strong>Conference:</strong> {profile?.data.conference?.name}</li>
          <li>
            <strong>Venue:</strong> {profile?.data.venue?.name} (
            {profile?.data.venue?.city}, {profile?.data.venue?.state})
          </li>
        </ul>
      </div>

      {/* Dashboard */}
      {isLoading ? (
        <div className="text-gray-500">Loading stats...</div>
      ) : (
        <WomensBasketballDashboard stats={stats.data} schedule={schedule.data} />
      )}
    </div>
  );
}
