import React, { useState } from 'react';
import { FaUser, FaIdBadge, FaCalendarAlt, FaUpload, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const SubmitDOB = () => {

      const [formData, setFormData] = useState({
        name: '',
        rollno: '',
        dob: '',
        file: null,
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: files ? files[0] : value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('rollno', formData.rollno);
        form.append('dob', formData.dob);
        form.append('file', formData.file);
    
        try {
          const response = await axios.post('https://script.google.com/macros/s/AKfycbzUABSOZ7ox-a8McrtoZEXC-3MOQQ7UGK4XY5Zzc6ZZjcJPnOr11bB51DNm-kN6pdHC/exec', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('Form submitted successfully: ' + response.data);
        } catch (error) {
          alert('Error submitting form: ' + error.message);
        }
      };

      
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Submit Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaUser className="text-gray-400 mr-3" />
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Name"
              className="w-full px-4 py-2 border-none focus:outline-none"
              required 
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaIdBadge className="text-gray-400 mr-3" />
            <input 
              type="text" 
              name="rollNo" 
              value={formData.rollNo} 
              onChange={handleChange} 
              placeholder="Roll No"
              className="w-full px-4 py-2 border-none focus:outline-none"
              required 
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaCalendarAlt className="text-gray-400 mr-3" />
            <input 
              type="date" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border-none focus:outline-none"
              required 
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaUpload className="text-gray-400 mr-3" />
            <input 
              type="file" 
              name="image" 
              accept="image/*"
              onChange={handleChange} 
              className="w-full px-4 py-2 border-none focus:outline-none"
              required
            />
          </div>
          <div>
            <button 
              type="submit" 
              className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FaPaperPlane className="mr-2" />
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitDOB;
