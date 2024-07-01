import React, { useState } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // Import the sorting icons

const students = [
  { name: 'PALLERLA SAI SANDEEP REDDY', rollNo: 'CSE-(IOT)', sem1SGPA: 8.5, sem2SGPA: 8.8 },
  { name: 'A RAVI CHANDRA', rollNo: 'CS (IOT)', sem1SGPA: 8.4, sem2SGPA: 8.7 },
  { name: 'ANAND BHORASKAR', rollNo: 'CS (AIML)', sem1SGPA: 8.3, sem2SGPA: 8.6 },
  { name: 'KARTIKEYA GUPTA', rollNo: '2032149', sem1SGPA: 8.2, sem2SGPA: 8.5 },
  { name: 'UTKARSH KUMAR', rollNo: '1083251', sem1SGPA: 8.1, sem2SGPA: 8.4 },
  // Add more student data as needed
];

const getHighestSGPA = (student) => {
  const semesters = [8, 7, 6, 5, 4, 3, 2, 1];
  for (const sem of semesters) {
    if (student[`sem${sem}SGPA`]) {
      return student[`sem${sem}SGPA`];
    }
  }
  return 0;
};

const StudentRow = ({ student, rank }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <tr className="cursor-pointer hover:bg-gray-100" onClick={toggleOpen}>
        <td className="border border-gray-300 px-0 py-0 text-center">{rank}</td>
        <td className="border border-gray-300 px-4 py-2 text-center">{student.name}</td>
        <td className="border border-gray-300 px-4 py-0 text-center">{student.rollNo}</td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan="3" className="border border-gray-300 px-4 py-2">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Semester</th>
                  <th className="border border-gray-300 px-4 py-2">SGPA</th>
                </tr>
              </thead>
              <tbody>
                {semesters.map((sem) => {
                  const sgpa = student[`sem${sem}SGPA`];
                  if (sgpa) {
                    return (
                      <tr key={sem}>
                        <td className="border border-gray-300 px-4 py-2 text-center">{sem}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{sgpa}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

const RankList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  if(toggleSortOrder){
    console.log('sort order toggled')
  }

  const sortedStudents = [...students].sort((a, b) => {
    const highestSGPAA = getHighestSGPA(a);
    const highestSGPAB = getHighestSGPA(b);

    if (sortOrder === 'asc') {
      return highestSGPAA - highestSGPAB;
    } else {
      return highestSGPAB - highestSGPAA;
    }
  });

  const filteredStudents = sortedStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm)
  );

  return (
  
    <div className="container mx-auto p-4">
      <div className='flex items-center justify-center'>
      <div className='font-mono text-sm my-10 mx-auto'>
      We take no guarantee of the information displayed below. <br>
      </br>  
      Please check the official <a href='https://oneview.aktu.ac.in/WebPages/aktu/OneView.aspx' className='text-blue-500' > AKTU Website </a> for your result. <br></br>
      <br></br>
      <a href='/disclaimer' className='text-blue-500 mx-auto'>full disclaimer</a>
      </div>
      </div>
        

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Enter Name / Roll No."
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-md p-2 w-full max-w-md"
        />
      </div>
      <div className="overflow-x-auto w-[80%] mx-auto md:w-full items-center">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th
                className="border border-gray font-semibold font-sans px-0 py-0 flex items-center justify-center cursor-pointer"
              >
                Institute Rank
                {sortOrder === 'asc' ? (
                  <FaSortUp className="ml-2 md:mr-1 mt-2" />
                ) : (
                  <FaSortDown className="ml-2 md:mr-1 mb-2" />
                )}
              </th>
              <th className="border border-gray-300 px-16 py-0 font-sans">Name</th>
              <th className="border border-gray-300 px-0 py-0 font-sans">Branch</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <StudentRow key={index} student={student} rank={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankList;
