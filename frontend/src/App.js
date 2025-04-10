import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import MensBasketball from './pages/Mbasketball';
import WomensBasketball from './pages/Wbasketball';
import MensFootball from './pages/Mfootball';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen bg-[#F8F9FC] text-[#1D1F6A] font-mono">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-[#E0E7FF] transition-all duration-300 flex flex-col`}>
          <button
            onClick={toggleSidebar}
            className="p-4 text-xl text-[#1D1F6A] focus:outline-none"
          >
            ☰
          </button>
          <nav className={`p-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <div>
              <h3 className="text-md font-semibold mb-2">Men's Sports</h3>
              <ul className="mb-4 space-y-2 text-sm">
                <li>
                  <Link to="/mens-football" className="hover:text-[#7C3AED]">Football</Link>
                </li>
                <li>
                  <Link to="/mens-basketball" className="hover:text-[#7C3AED]">Basketball</Link>
                </li>
              </ul>
              <h3 className="text-md font-semibold mb-2">Women's Sports</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/womens-basketball" className="hover:text-[#7C3AED]">Basketball</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <nav className="bg-white border-b border-[#E0E7FF] p-4 flex justify-between items-center">
            <div className="text-xl font-bold text-[#1D1F6A]">Vanderbilt Sports Analytics</div>
            <div className="flex space-x-6 text-sm text-[#1D1F6A] font-medium">
              <Link to="/" className="hover:text-[#7C3AED]">Home</Link>
              <Link to="/about" className="hover:text-[#7C3AED]">About</Link>
              <Link to="/contact" className="hover:text-[#7C3AED]">Contact Us</Link>
            </div>
          </nav>

          {/* Routed Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mens-football" element={<MensFootball />} />
              <Route path="/mens-basketball" element={<MensBasketball />} />
              <Route path="/womens-basketball" element={<WomensBasketball />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
