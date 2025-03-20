import React from 'react';

const StatsCard = ({ icon, title, value }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex items-center space-x-4 w-full sm:w-1/4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-lg">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;

