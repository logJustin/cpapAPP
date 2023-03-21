// make blank arrays to be used later 
let [dateRange, objectifiedDateRange] = [[], []]


// make a variable for the endDate (yesterday)
// it's yesterday since you can't log data for tonight
// tonight hasn't happened yet
let endDate = new Date(); // today
endDate.setDate(endDate.getDate() - 1);
endDate = endDate.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "2-digit"
});

// render range endDate on webpage
document.querySelector('#endDate').innerHTML = endDate

//make a variable for the startDate (today minus duration)
let startDate = new Date(data[0].treatDate).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "2-digit"
});

// render range startDate on webpage
document.querySelector('#startDate').innerHTML = startDate


// reset endDate after restructing it to LocaleString
endDate = new Date(); // today
endDate.setDate(endDate.getDate() - 1);
startDate = new Date(data[0].treatDate)




// push all days between endDate & startDate into a range
for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
    dateRange.push(day.toISOString().split('T')[0]);
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
            object.yearMonth = (object.treatDate).substring(0, 7);
            objectifiedDateRange.push(object)
            break;
        // if it doesn't exist, create a new object, push it to the objectifiedDateRange
        case (object == undefined):
            const emptyDataObject = {
                treatDate: eventDate, secUsed: null, secHumid: null, timePB: null, cntAHI: 0, cntOAI: null, cntCAI: null, cntAI: null, cntHI: null, cntRERA: null, cntSNI: null, cntBreath: null, cntSelfBreath: null, medPress: null, medIPAP: null, medEPAP: null, medLEAK: null, medVt: null, medMV: null, medRR: null, medTi: null, medIE: null, p95Press: null, p95IPAP: null, p95EPAP: null, p95LEAK: null, p95Vt: null, p95MV: null, p95RR: null, p95Ti: null, p95IE: null, maxPress: 0, maxIPAP: null, maxEPAP: null, maxLEAK: null, maxVt: null, maxMV: null, maxRR: null, maxTi: null, maxIE: null, maxSPO2: null, minSPO2: null, avgSPO2: null, oxygenIndex: null, actualTimeSPO2: null, maxPR: null, minPR: null, avgPR: null, aveDBP: null, aveSBP: null, hbpCounts: null,
            };
            emptyDataObject.yearMonth = (emptyDataObject.treatDate).substring(0, 7);
            objectifiedDateRange.push(emptyDataObject)
            break;
    }
}



// map unique years and months into a new array
// const uniqueYearsMonths = [...new Set(objectifiedDateRange.map(element => `${element.year}-${element.month}`))]
const uniqueYearsMonths = [...new Set(objectifiedDateRange.map(element => `${element.yearMonth}`))]

// map objectifiedDateRange against the UniqueYearsMonths to make an object that has 
// all objects contained within each month of recorded data
const result = uniqueYearsMonths
    .map((x) => objectifiedDateRange.filter((y) => y.yearMonth == x)) // filter by yearMonth
    .map((x, i) => ({ name: uniqueYearsMonths[i], yearMonth: x.map((y) => y) })); // make new objects 

// add data points of seconds used, how many logged events, and averageHours
for (yearMonth in result) {
    let month = result[yearMonth]
    // create object for total sceonds used in month
    month.totalSeconds = (month.yearMonth).reduce((total, next) => total + next.secUsed, 0)

    const overFourNights = (month.yearMonth).filter(obj => Number(obj.secUsed) > 14400);
    month.overFour = overFourNights.length

    // create object key for amount of nights null
    const nullNights = (month.yearMonth).filter(obj => obj.secUsed == null)
    // console.log(month.name, nullNights)
    month.missedNights = nullNights.length

    // create object key for amount of nights used 
    const loggedNights = (month.yearMonth).filter(obj => obj.secUsed != null);
    month.events = loggedNights.length

    // create object key for amount of breats
    month.breathCount = (month.yearMonth).reduce((total, next) => total + next.cntBreath, 0)

    // create object key for average hours
    month.averageHours = (month.totalSeconds / 60 / 60) / month.events
    month.averageHours = Math.round(month.averageHours * 10) / 10
    if (isNaN(month.averageHours)) { month.averageHours = 0 }

    // creat object key for AHI per hour
    month.AHIcount = (month.yearMonth).reduce((total, next) => total + next.cntAHI, 0)
    month.AHIcount = Math.round((month.AHIcount / month.events / month.averageHours) * 10) / 10
    if (isNaN(month.AHIcount)) { month.AHIcount = 0 }

    // create object for average of max pressure
    month.maxPressure = (month.yearMonth).reduce((total, next) => total + next.maxPress, 0)
    month.maxPressure = Math.round((month.maxPressure / month.events) * 10) / 10
    if (isNaN(month.maxPressure)) { month.maxPressure = 0 }
    // create object for average of max pressure

    month.medPressure = (month.yearMonth).reduce((total, next) => total + next.medPress, 0)
    month.medPressure = Math.round((month.medPressure / month.events) * 10) / 10
    if (isNaN(month.medPressure)) { month.medPressure = 0 }

    // create object for average of max pressure
    month.p95Pressure = (month.yearMonth).reduce((total, next) => total + next.p95Press, 0)
    month.p95Pressure = Math.round((month.p95Pressure / month.events) * 10) / 10
    if (isNaN(month.p95Pressure)) { month.p95Pressure = 0 }

}




// generate an object for the total duration, breaths, and days missed
let annualData = {}
annualData.hours = result.reduce((accumulator, currentValue) => accumulator + currentValue.totalSeconds, 0);
annualData.hours = Math.round(annualData.hours / 60 / 60 * 10) / 10
annualData.hours = Number(annualData.hours).toLocaleString()

annualData.breaths = result.reduce((accumulator, currentValue) => accumulator + currentValue.breathCount, 0);
annualData.breaths = Number(annualData.breaths).toLocaleString()

annualData.loggedDays = result.reduce((accumulator, currentValue) => accumulator + currentValue.events, 0);
annualData.missedDays = result.reduce((accumulator, currentValue) => accumulator + currentValue.missedNights, 0);
annualData.totalDays = (annualData.loggedDays + annualData.missedDays)

annualData.overFourDays = result.reduce((accumulator, currentValue) => accumulator + currentValue.overFour, 0);
annualData.underFourDays = (annualData.totalDays - annualData.overFourDays)



// build out the charts
let durationChart = document.querySelector("#myChartInitial").getContext('2d');
let hoursUsed = new Chart(durationChart, {
    type: 'bar',
    data: {
        labels: result.map(e => e.name),
        datasets: [{
            label: 'Average Hours',
            data: result.map(e => e.averageHours),
            fill: true,
            borderWidth: 1,
            backgroundColor: '#d65a3180',
            borderColor: '#d65a31',
            order: 3
        },
        {
            label: 'Nights Used',
            data: result.map(e => e.events),
            fill: false,
            borderWidth: 1,
            type: 'line',
            backgroundColor: '#ff638480',
            borderColor: '#ff6384',
            order: 2
        }, {
            label: 'Nights Missed',
            data: result.map(e => e.missedNights),
            fill: false,
            borderWidth: 1,
            type: 'line',
            backgroundColor: '#36A2EB80',
            borderColor: '#36A2EB',
            order: 1
        }
        ]
    },
    options: { pointStyle: true, responsive: true }
});

let polarChart = document.querySelector("#polarchart").getContext('2d');
let polar = new Chart(polarChart, {
    type: 'radar',
    data: {
        labels: result.map(e => e.name),
        datasets: [
            {

                label: 'Average Hours',
                data: result.map(e => e.averageHours),
                fill: true,
                borderWidth: 1,
                backgroundColor: '#d65a3180',
                borderColor: '#d65a31',
                // order: 1
            },
            {
                label: 'Nights Used',
                data: result.map(e => e.events),
                borderWidth: 1,
                backgroundColor: '#36A2EB80',
                borderColor: '#36A2EB',
                // order: 2
            }
        ]
    },
    options: { responsive: true }
});

let overFour = document.querySelector("#overFour").getContext('2d');
let fourDoughnut = new Chart(overFour, {
    type: 'doughnut',
    data: {
        labels: ['Over Four Hours', 'Under Four Hours', 'Nights Missed'],
        datasets: [{
            data: [annualData.overFourDays, annualData.underFourDays, annualData.missedDays],
            borderWidth: 1,
            label: 'Nights',
            backgroundColor: ['#d65a3180', '#36A2EB80', '#ff638480'],
            borderColor: ['#d65a31', '#36A2EB', '#ff6384'],
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { reverse: true } }
    }
});

let pressureChart = document.querySelector("#pressureChart").getContext('2d');
let pressureCracks = new Chart(pressureChart, {
    type: 'bar',
    data: {
        labels: result.map(e => e.name),
        datasets: [{
            label: 'Median',
            data: result.map(e => e.medPressure),
            backgroundColor: '#d65a3180',
            borderColor: '#d65a31',
            hoverOffset: 4,
            borderWidth: 1,
            fill: true
        }, {
            label: '95th Percentile',
            data: result.map(e => e.p95Pressure),
            backgroundColor: '#ff638480',
            borderColor: '#ff6384',
            hoverOffset: 4,
            borderWidth: 1,
            fill: true
        }, {
            label: 'Maximum',
            data: result.map(e => e.maxPressure),
            backgroundColor: '#36A2EB80',
            borderColor: '#36A2EB',
            hoverOffset: 4,
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        scales:
        {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    }
});

let AHIchart = document.querySelector("#AHIchart").getContext('2d');
let AHI = new Chart(AHIchart, {
    type: 'line',
    data: {
        labels: result.map(e => e.name),
        datasets: [{
            label: 'Events an Hour',
            data: result.map(e => e.AHIcount),
            backgroundColor: '#d65a3180',
            hoverOffset: 4,
            borderColor: '#d65a31',
            borderWidth: 1,
            fill: true
        }]
    },
    options: { responsive: true }
});




document.querySelector("#hoursUsedIcon").innerHTML = `${annualData.hours} Hours`
// udpate daysUsedIcon
document.querySelector("#daysUsedIcon").innerHTML = `${annualData.loggedDays} / ${annualData.totalDays}`
// update totalBreaths
document.querySelector("#totalBreathsIcon").innerHTML = annualData.breaths
