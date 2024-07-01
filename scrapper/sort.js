const fs = require('fs');

// Read data from students.json
const data = fs.readFileSync('btech_db.json');
const students = JSON.parse(data);

const year1 = [];
const year2 = [];
const year3 = [];
const year4 = [];

// Categorize roll numbers by year
students.forEach(student => {
  switch(student.year) {
    case 1:
      year1.push(student.rollNo);
      break;
    case 2:
      year2.push(student.rollNo);
      break;
    case 3:
      year3.push(student.rollNo);
      break;
    case 4:
      year4.push(student.rollNo);
      break;
    default:
      console.log(`Unknown year: ${student.year}`);
  }
});

// Create the content for the text file
const content = {
  year1: year1,
  year2: year2,
  year3: year3,
  year4: year4
};

// Write the roll number arrays to a text file
fs.writeFileSync('rollNO.txt', JSON.stringify(content, null, 2));
console.log('Roll numbers by year written to roll_numbers_by_year.txt');
