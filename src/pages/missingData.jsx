import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MissingData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('../assests/missing-rollNo.json')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Missing Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.rollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MissingData;
