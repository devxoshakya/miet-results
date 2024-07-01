import './App.css';
import Header from './components/header.jsx';
import React from 'react';
import RankList from './pages/home.jsx';


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
    <div className="App">
      <Header />
      <RankList students={students}/>
    </div>
  );
}

export default App;
