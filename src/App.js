import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Football from './pages/Football';
import Baseball from './pages/Baseball';
import Soccer from './pages/Soccer';
// Import the dashboard component for men's basketball
import MensBasketballDashboard from './components/MensBasketballDashboard';

// Rohit edit: Import the dashboard component for men's football
import MensFootballDashboard from './components/MensFootballDashboard';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar (Sports List) */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-md transition-all duration-300 flex flex-col`}>
          <button
            onClick={toggleSidebar}
            className="p-4 text-gray-800 text-xl focus:outline-none"
          >
            ☰
          </button>
          <nav className={`p-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Men's Sports</h3>
              <ul className="mb-4">
                <li className="mb-2">
                  <Link to="/mens-football" className="text-gray-800 hover:underline">Football</Link>
                </li>
                <li className="mb-2">
                  {/* Update this link to point to the dedicated mens basketball route */}
                  <Link to="/mens-basketball" className="text-gray-800 hover:underline">Basketball</Link>
                </li>
                <li className="mb-2">
                  <Link to="/baseball" className="text-gray-800 hover:underline">Baseball</Link>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">Women's Sports</h3>
              <ul>
                <li className="mb-2">
                  <Link to="/soccer" className="text-gray-800 hover:underline">Soccer</Link>
                </li>
                <li className="mb-2">
                  {/* You can later add a separate route for women's basketball */}
                  <Link to="/womens-basketball" className="text-gray-800 hover:underline">Basketball</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">Vanderbilt Sports Analytics</div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-800 hover:underline">Home</Link>
              <Link to="/about" className="text-gray-800 hover:underline">About</Link>
              <Link to="/contact" className="text-gray-800 hover:underline">Contact</Link>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="flex-1 p-4 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mens-football" element={<MensFootballDashboard />} />
              {/* New route for men's basketball */}
              <Route path="/mens-basketball" element={<MensBasketballDashboard />} />
              <Route path="/baseball" element={<Baseball />} />
              <Route path="/soccer" element={<Soccer />} />
              {/* You can add a women's basketball route later */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
