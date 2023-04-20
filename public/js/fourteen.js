// define the duration of this page's caluclations
let duration = 14;
// set daysUsed,totalHoursUsed, totalBreaths to zero, so we can add to it later
let [daysMissed, totalHoursUsed, totalBreaths] = [0, 0, 0];
// make blank arrays to be used later 
let [treatmentDates, treatmentTimes, dateRange, objectifiedDateRange, ahiArray, pressureArray] = [[], [], [], [], [], []]


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
// for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
for (let day = startDate; dateRange.length <= (duration - 1); day.setDate(day.getDate() + 1)) {

    let formattedDay = day.toISOString().split('T')[0]
    dateRange.push(formattedDay);

}




// takes array of dates and pushes objects to array if their data already exists, creates blank data if it doesnt
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
                treatDate: eventDate, secUsed: null, secHumid: null, timePB: null, cntAHI: 0, cntOAI: null, cntCAI: null, cntAI: null, cntHI: null, cntRERA: null, cntSNI: null, cntBreath: null, cntSelfBreath: null, medPress: '~', medIPAP: null, medEPAP: null, medLEAK: null, medVt: null, medMV: null, medRR: null, medTi: null, medIE: null, p95Press: null, p95IPAP: null, p95EPAP: null, p95LEAK: null, p95Vt: null, p95MV: null, p95RR: null, p95Ti: null, p95IE: null, maxPress: 0, maxIPAP: null, maxEPAP: null, maxLEAK: null, maxVt: null, maxMV: null, maxRR: null, maxTi: null, maxIE: null, maxSPO2: null, minSPO2: null, avgSPO2: null, oxygenIndex: null, actualTimeSPO2: null, maxPR: null, minPR: null, avgPR: null, aveDBP: null, aveSBP: null, hbpCounts: null,
            };
            objectifiedDateRange.push(emptyDataObject)
            break;
    }
}

// loop through objectifiedDateRange and update the arrays for the charts + data for Icons
for (days in objectifiedDateRange) {
    let day = objectifiedDateRange[days]

    // insert the treatment dates into the array
    treatmentDates.push(day.treatDate)

    // insert the treatments hours into the array
    // convert seconds into hours, and round it to nearest tenth
    let eventHours = ((Math.round(day.secUsed / 60 / 60 * 10) / 10))
    // let eventHours = ((Math.round(day.secUsed / 60 / 60 * 10) / 10).toFixed(1))
    treatmentTimes.push(eventHours)

    // determine days with 0
    if (day.secUsed == null || day.secUsed == 0) { daysMissed++ }
    // add secondsUsed to totalHoursUsed
    if (day.secUsed != null && day.secUsed != 0) { totalHoursUsed += day.secUsed }

    totalBreaths += day.cntBreath

    // create object to use in the AHI chart
    // set key:value pairs to use for a data chart lart
    let [ahiObject, pressureObject] = [{}, {}]
    ahiObject.treatementDate = day.treatDate
    pressureObject.treatementDate = day.treatDate

    // if AHI is equal to 0, then it was a day of no recorded data
    if (day.cntAHI === 0) { ahiObject.AHI = '0.0'; pressureObject.pressure = '0.0' }
    if (day.cntAHI > 0) { ahiObject.AHI = (day.cntAHI / eventHours).toFixed(1); pressureObject.pressure = (day.maxPress).toFixed(1) }
    ahiArray.push(ahiObject)
    pressureArray.push(pressureObject)

}
// define daysUsedData to be used in the charts
let daysUsedData = [duration - daysMissed, daysMissed]




// update totalHoursUsed
// increase readability for what totalHoursUsed equals, then formatting 
totalHoursUsed = (Math.round(totalHoursUsed / 60 / 60 * 10) / 10).toFixed(1)
document.querySelector("#hoursUsedIcon").innerHTML = `${totalHoursUsed} Hours`
// udpate daysUsedIcon
document.querySelector("#daysUsedIcon").innerHTML = `${duration - daysMissed} / ${duration}`
// update totalBreaths
document.querySelector("#totalBreathsIcon").innerHTML = Number(totalBreaths).toLocaleString();



// build out the charts
let durationChart = document.querySelector("#durationChart").getContext('2d');
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
            fill: true,
            tension: 0
        }]
    },
    options: {}
});

let daysUsedPieChart = document.querySelector("#usedChart").getContext('2d');
let daysUsedPie = new Chart(daysUsedPieChart, {
    type: 'bar',
    data: {
        labels: ['Used', 'Missed'],
        datasets: [{
            label: 'Days',
            data: daysUsedData,
            backgroundColor: ['#d65a31', '#d65a3180'],
            hoverOffset: 4,
            borderColor: '#777',
            borderWidth: 1,
        }]
    },
    options: { indexAxis: 'y', }
});

let pressureChart = document.querySelector("#pressureChart").getContext('2d');
let pressurebar = new Chart(pressureChart, {
    type: 'bar',
    data: {
        // labels: 'Maximum Pressure',
        datasets: [{
            label: 'PSI',
            data: pressureArray,
            backgroundColor: '#d65a31',
            hoverOffset: 4,
            borderColor: '#777',
            borderWidth: 1,
        }]
    },
    options: {
        parsing: {
            xAxisKey: 'treatementDate',
            yAxisKey: 'pressure',
        }
    }
});

let ahiIndex = document.querySelector("#ahiIndex").getContext('2d');
let ahiLine = new Chart(ahiIndex, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Events Per Hour',
            data: ahiArray,
            backgroundColor: '#d65a31',
            hoverOffset: 4,
            borderColor: '#777',
            fill: true
        }]

    },
    options: {
        // indexAxis: 'y',
        parsing: {
            xAxisKey: 'treatementDate',
            yAxisKey: 'AHI',
        }
    }
});




// generating the table
const tableBody = document.querySelector('tbody')
const createTable = (data) => {

    // loop through the data
    for (let day in data) {
        // insert a row
        let row = tableBody.insertRow(-1);

        // create cells, then add data to innerHTML
        let c1 = row.insertCell(0)
        c1.innerHTML = data[day].treatDate
        let c2 = row.insertCell(1)
        let hoursUsed = (Math.round(data[day].secUsed / 60 / 60 * 10) / 10).toFixed(1)
        c2.innerHTML = hoursUsed
        let c3 = row.insertCell(2)
        switch (data[day].cntAHI) {
            case 0:
                c3.innerHTML = '~';
                break;
            default:
                c3.innerHTML = Math.round(hoursUsed / (data[day].cntAHI)) / 10
        }
        let c4 = row.insertCell(3)
        switch (data[day].cntBreath) {
            case null:
                c4.innerHTML = '~';
                break;
            default:
                c4.innerHTML = Number(data[day].cntBreath).toLocaleString()
        }
        let c5 = row.insertCell(4)
        c5.innerHTML = data[day].medPress

    }

}
createTable(objectifiedDateRange);




// look through all cells, then all bootstrap classes for light + center
const cells = document.querySelectorAll('td')
cells.forEach((cell) => {
    cell.classList.add('text-light', 'text-center')
})