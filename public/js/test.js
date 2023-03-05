// define the duration of this page's caluclations
let duration = 14
// set daysUsed to zero, so we can add to it later
let daysUsed = 0;
// make array of objects within the last 30 days
let [treatmentDates, treatmentTimes, dateRange] = [[], [], []]

// make a variable for the endDate (yesterday)
// it's yesterday since you can't log data for tonight
// tonight hasn't happened yet
let endDate = new Date(); // today
endDate.setDate(endDate.getDate() - 1);

// render range endDate on webpage
document.querySelector('#endDate').innerHTML = endDate.toLocaleString("en-GB", {
    day: "numeric",
    month: "long"
});

//make a variable for the startDate (today minus duration)
let startDate = new Date();
startDate.setDate(startDate.getDate() - duration);

// render range startDate on webpage
document.querySelector('#startDate').innerHTML = startDate.toLocaleString("en-GB", {
    day: "numeric",
    month: "long"
});



// push all days between endDate & startDate into a range
for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
    let formattedDay = day.toISOString().split('T')[0]
    dateRange.push(formattedDay);
}



// loop through the data to push dates and durations to arrays, then determine days missed
for (const event of data) {
    // convert the treatmentDate to a Date format from a string
    let eventDate = new Date(event.treatDate)
    eventDate = eventDate.toISOString().split('T')[0]


    // if eventDate is within dateRange array
    if (dateRange.indexOf(eventDate) > -1) {

        // insert the treatment date into the array
        treatmentDates.push(event.treatDate)
        // convert seconds into hours, and round it to nearest tenth
        treatmentTimes.push(Math.round(event.secUsed / 60 / 60 * 10) / 10)
        // add a value to daysUsed
        daysUsed++
    }
}
let daysUsedData = [daysUsed, duration - daysUsed]



// build out the charts
let durationChart = document.querySelector("#fourteenDuration").getContext('2d');
let hoursUsed = new Chart(durationChart, {
    type: 'line',
    data: {
        labels: treatmentDates,
        datasets: [{
            label: 'Treatment Hours',
            data: treatmentTimes,
            backgroundColor: '#d65a31',
            hoverOffset: 4,
            borderColor: '#777',
        }]
    },
    options: {}
});

let daysUsedPieChart = document.querySelector("#fourteenUsed").getContext('2d');
let daysUsedPie = new Chart(daysUsedPieChart, {
    type: 'pie',
    data: {
        labels: ['Used', 'Missed'],
        datasets: [{
            label: 'Days',
            data: daysUsedData,
            backgroundColor: ['#d65a31', '#d65a3180'],
            hoverOffset: 4,
            borderColor: '#777'
        }]
    },
    options: {}
});



// generating the table
const tableBody = document.querySelector('tbody')
const createTable = (data, valueDays) => {

    // loop through the data
    for (let day in data) {
        // set eventDate to a date value of the eventDate
        let eventDate = new Date(data[day].treatDate)

        // set startDate, which is today minus valueDays being measured
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - valueDays);

        // if the date being looped through is within valueDays
        if (eventDate > startDate) {

            // insert a row
            let row = tableBody.insertRow(-1);

            // create cells, then add data to innerHTML
            let c1 = row.insertCell(0)
            c1.innerHTML = data[day].treatDate
            let c2 = row.insertCell(1)
            let hoursUsed = Math.round(data[day].secUsed / 60 / 60 * 10) / 10
            c2.innerHTML = hoursUsed
            let c3 = row.insertCell(2)
            c3.innerHTML = Math.round(hoursUsed / (data[day].cntAHI)) / 10
            let c4 = row.insertCell(3)
            c4.innerHTML = Number(data[day].cntBreath).toLocaleString()
            let c5 = row.insertCell(4)
            c5.innerHTML = data[day].medPress

        }
        // look through all cells, then all bootstrap classes for light + center
        const cells = document.querySelectorAll('td')
        cells.forEach(element => {
            element.classList.add('text-light', 'text-center')
        });
    }
}

createTable(data, duration);

const objectifiedDateRange = []





console.log(dateRange)

// loop through days in date range
for (days in dateRange) {
    let eventDate = dateRange[days]
    // find the object in the database that corresponds with the eventDate
    const object = data.find(element => element.treatDate == eventDate);

    switch (true) {
        // if it exists, push it to the objectifiedDateRange
        case (object != undefined):
            objectifiedDateRange.push(object)
            break;
        // if it doesn't exist, create a new object, push it to the objectifiedDateRange
        case (object == undefined):
            const emptyDataObject = {
                treatDate: eventDate, secUsed: null, secHumid: null, timePB: null, cntAHI: null, cntOAI: null, cntCAI: null, cntAI: null, cntHI: null, cntRERA: null, cntSNI: null, cntBreath: null, cntSelfBreath: null, medPress: null, medIPAP: null, medEPAP: null, medLEAK: null, medVt: null, medMV: null, medRR: null, medTi: null, medIE: null, p95Press: null, p95IPAP: null, p95EPAP: null, p95LEAK: null, p95Vt: null, p95MV: null, p95RR: null, p95Ti: null, p95IE: null, maxPress: null, maxIPAP: null, maxEPAP: null, maxLEAK: null, maxVt: null, maxMV: null, maxRR: null, maxTi: null, maxIE: null, maxSPO2: null, minSPO2: null, avgSPO2: null, oxygenIndex: null, actualTimeSPO2: null, maxPR: null, minPR: null, avgPR: null, aveDBP: null, aveSBP: null, hbpCounts: null,
            };
            objectifiedDateRange.push(emptyDataObject)
            break;
    }
}

console.log(objectifiedDateRange)