import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1D1F6A] flex flex-col items-center px-6 py-12 font-mono">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">About Vanderbilt Sports Analytics</h1>
        <p className="text-lg mb-6 text-[#4B5563]">
          Vanderbilt Sports Analytics (VSA) is a student-driven initiative dedicated to applying
          data science and statistical methods to Vanderbilt Athletics. We aim to provide insights,
          visualizations, and tools that empower fans, coaches, and players to better understand
          the game.
        </p>

        <div className="bg-white shadow-md rounded-lg p-6 border border-[#E0E7FF]">
          <h2 className="text-xl font-semibold mb-2">Our Team</h2>
          <ul className="space-y-2 text-left text-[#1D1F6A]">
            <li>🎓 <strong>Buket Alkan</strong> – Technical Lead & Data Architect</li>
            <li>🎓 <strong>Giorgio Antonacci</strong> – Full-Stack Developer & UX Designer</li>
            <li>🎓 <strong>Rohit Sharma</strong> – Backend Integration & Analytics Developer</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
