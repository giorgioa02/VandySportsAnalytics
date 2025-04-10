// src/layout/TopNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <nav className="bg-white border-b border-[#E0E7FF] p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-[#1D1F6A]">Vanderbilt Sports Analytics</div>
      <div className="flex space-x-6 text-sm text-[#1D1F6A] font-medium">
        <Link to="/" className="hover:text-[#7C3AED]">Home</Link>
        <Link to="/about" className="hover:text-[#7C3AED]">About</Link>
        <Link to="/contact" className="hover:text-[#7C3AED]">Contact Us</Link>
      </div>
    </nav>
  );
};

export default TopNav;
