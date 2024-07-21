import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MissingData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://miet-results.devxoshakya.xyz/missing-rollNo.json')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-40 md:px-4">
      <h1 className="text-2xl font-bold my-4 text-center">Missing Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400 mx-auto bg-opacity-50 bg-transparent">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-2 px-4 border border-gray-400 text-white">Name</th>
              <th className="py-2 px-4 border border-gray-400 text-white">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border border-gray-400">{item.name}</td>
                <td className="py-2 px-4 border border-gray-400">{item.rollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MissingData;
