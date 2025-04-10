import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-[#F8F9FC] text-[#1D1F6A] flex flex-col items-center px-6 py-12 font-mono">
            <div className="max-w-3xl w-full text-center">
                <h1 className="text-4xl font-bold mb-6">About VSA</h1>

                <div className="text-lg text-[#4B5563] text-left space-y-4 mb-8">
                    <p>
                        Vanderbilt Sports Analytics (VSA) is a student-driven initiative launched as part of <strong>CS x287: Principles of Cloud Computing</strong>.
                    </p>
                    <p>
                        Our mission is to apply <strong>cloud deployment technologies</strong>, data science, and statistical methods to Vanderbilt Athletics.
                    </p>
                    <p>
                        We aim to provide actionable insights, visualizations, and tools that empower fans, coaches, and players to better understand the game.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 border border-[#E0E7FF] w-full">
                    <h2 className="text-2xl font-semibold mb-4 text-center">🏅 Meet the Team 🏅</h2>
                    <ul className="space-y-3 text-[#1D1F6A] text-left">
                        <li>
                            🎓 <strong>Buket Alkan</strong><br />
                            <span className="text-sm text-gray-500">Computer Science, Undergraduate '25</span>
                        </li>
                        <li>
                            🎓 <strong>Giorgio Antonacci</strong><br />
                            <span className="text-sm text-gray-500">Computer Science, Master's Student '25</span>
                        </li>
                        <li>
                            🎓 <strong>Rohit Sharma</strong><br />
                            <span className="text-sm text-gray-500">Computer Science, Undergraduate '25</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
