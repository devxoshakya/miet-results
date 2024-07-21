import './App.css';
import Header from './components/header.jsx';
import React from 'react';
import RankList from './pages/home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Disclaimer from './pages/disclaimer.jsx';
import Footer from './components/footer.jsx';
import MissingData from './pages/missingData.jsx';
import SubmitDOB from './pages/submitDOB.jsx';


const students = [
  {
    name: "John Doe",
    branch: "Computer Science",
    rank: 1,
    rollNo: "CS001",
    year: 3,
    sem1SGPA: 9.2,
    sem2SGPA: 9.4,
    sem3SGPA: 9.1,
    sem4SGPA: 9.3,
    // ... other semesters if available
  },
  {
    name: "Jane Doe",
    branch: "Computer Science",
    rank: 2,
    rollNo: "CS002",
    year: 3,
    sem1SGPA: 9.1,
    sem2SGPA: 9.3,
    sem3SGPA: 9.2,
    sem4SGPA: 9.4,
    // ... other semesters if available
  }];

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<RankList students={students} />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/missing-rollNo" element={<MissingData />} />
        <Route path="/submit" element={<SubmitDOB />} />
      </Routes>
    <div className="App">
    </div>
    <Footer />
    </Router>
  );
}

export default App;
