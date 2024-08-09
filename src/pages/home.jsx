import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const getHighestSGPA = (student) => {
  const semesters = Object.keys(student.SGPA).map(sem => parseInt(sem.replace('sem', ''), 10));
  semesters.sort((a, b) => b - a);
  for (const sem of semesters) {
    if (student.SGPA[`sem${sem}`]) {
      return student.SGPA[`sem${sem}`];
    }
  }
  return 0;
};

const StudentRow = ({ student, rank, onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    onOpenModal(student);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <tr className="cursor-pointer hover:bg-gray-100" onClick={toggleOpen}>
        <td className="border border-gray-300 px-0 py-0 text-center">{rank}</td>
        <td className="border border-gray-300 px-4 py-2 text-center">{student.name}</td>
        <td className="border border-gray-300 px-4 py-0 text-center">{student.branch}</td>
      </tr>
    </>
  );
};

const RankList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedYear, setSelectedYear] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/devxoshakya/portfolio/main/public/combined_student_data.json")
      .then(response => response.json())
      .then(data => {
        const rankedStudents = data.map((student, index) => ({
          ...student,
          rank: index + 1,
        }));
        setStudents(rankedStudents);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStudent(null);
  };

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
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toString().includes(searchTerm)) &&
      (selectedYear === '' || student.year.toString() === selectedYear)
  );

  const displayedStudents = filteredStudents.map((student, index) => ({
    ...student,
    displayedRank: sortOrder === 'asc' ? filteredStudents.length - index : index + 1,
  }));

  return (
    <div className="container mx-auto p-4">
      <div className='flex items-center justify-center'>
        <div className='font-mono text-sm my-10 mx-auto'>
          We take no guarantee of the information displayed below. <br />
          Please check the official <a href='https://oneview.aktu.ac.in/WebPages/aktu/OneView.aspx' className='text-blue-500'>AKTU Website</a> for your result. <br /><br />
          <a href='/disclaimer' className='text-blue-500 mx-auto'>full disclaimer</a>
          <a href='/missing-rollNo' className='text-blue-500 mx-auto p-4'>missing data</a>
        </div>
      </div>

      <div className='flex justify-center items-center gap-3'>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Enter Name / Roll No."
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded-md p-2 w-full max-w-md"
          />
        </div>
        <div className="flex justify-center mb-4">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border rounded-md p-2 w-full max-w-md"
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto w-[80%] mx-auto md:w-full items-center">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th
                className="border border-gray font-semibold font-sans px-0 py-0 flex items-center justify-center cursor-pointer"
                onClick={toggleSortOrder}
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
            {displayedStudents.map((student, index) => (
              <StudentRow key={index} student={student} rank={student.displayedRank} onOpenModal={openModal} />
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="SGPA Details"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-8 rounded-lg max-w-md mx-4 w-full font-mono">
            <h2 className="text-xl font-semibold mb-4">SGPAs</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Semester</th>
                  <th className="border border-gray-300 px-4 py-2">SGPA</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedStudent.SGPA).map((sem) => (
                  <tr key={sem}>
                    <td className="border border-gray-300 px-4 py-2 text-center">{sem.replace('sem', '')}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{selectedStudent.SGPA[sem]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RankList;
