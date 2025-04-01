import React from 'react';

const StatsCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white text-[#1D1F6A] p-4 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/4 font-mono">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm opacity-70">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
