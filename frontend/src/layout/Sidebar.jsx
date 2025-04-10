// src/layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-16'} bg-white border-r border-[#E0E7FF] transition-all duration-300 flex flex-col`}>
      <button
        onClick={toggleSidebar}
        className="p-4 text-xl text-[#1D1F6A] focus:outline-none"
      >
        ☰
      </button>
      <nav className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>
        <div>
          <h3 className="text-md font-semibold text-[#1D1F6A] mb-2">Men's Sports</h3>
          <ul className="mb-4 space-y-2 text-sm">
            <li><Link to="/mens-football" className="hover:text-[#7C3AED]">Football</Link></li>
            <li><Link to="/mens-basketball" className="hover:text-[#7C3AED]">Basketball</Link></li>
          </ul>
          <h3 className="text-md font-semibold text-[#1D1F6A] mb-2">Women's Sports</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/womens-basketball" className="hover:text-[#7C3AED]">Basketball</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
