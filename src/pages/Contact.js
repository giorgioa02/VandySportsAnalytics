import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }

    setIsSubmitting(false);
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
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 ${
              isSuccess ? 'bg-green-500' : 'bg-[#FBBF24]'
            } hover:brightness-110 text-white font-bold py-3 rounded transition duration-200`}
          >
            {isSubmitting ? 'Sending...' : isSuccess ? '✓ Message Sent' : 'Send a Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
