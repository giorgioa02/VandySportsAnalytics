import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1D1F6A] flex flex-col items-center justify-center px-6 py-12 font-mono">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-base text-[#7C3AED]">
          Built by Buket Alkan · Giorgio Antonacci · Rohit Sharma
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-[#E0E7FF] p-8 rounded-xl shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded border border-[#E0E7FF] bg-[#F9FAFB] text-[#1D1F6A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 rounded border border-[#E0E7FF] bg-[#F9FAFB] text-[#1D1F6A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full p-3 rounded border border-[#E0E7FF] bg-[#F9FAFB] text-[#1D1F6A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            name="message"
            placeholder="Your message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#FBBF24] hover:bg-[#f59e0b] text-white font-bold py-3 rounded transition duration-200"
          >
            SEND A MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
