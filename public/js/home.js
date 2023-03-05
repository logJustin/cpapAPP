
// make a variable for today's date minus 30
const minus30Date = new Date();
minus30Date.setDate(minus30Date.getDate() - 30);

// make array of objects within the last 30 days
let [treatmentDates30, treatmentTimes30] = [[], []]
// loop through all the data
for (const event of data) {
    // convert the treatmentDate to a Date format from a string
    let eventDate = new Date(event.treatDate)
    // if it is within 30, push the object to the array
    if (eventDate > minus30Date) {
        treatmentDates30.push(event.treatDate)
        // convert seconds into hours, and round it to nearest tenth
        treatmentTimes30.push(Math.round(event.secUsed / 60 / 60 * 10) / 10)
    }
}

// build out the charts
let myChart = document.querySelector("#myChart").getContext('2d');
let hoursUsed30 = new Chart(myChart, {
    type: 'bar',
    data: {
        labels: treatmentDates30,
        datasets: [{
            label: 'Treatment Hours',
            data: treatmentTimes30,
            backgroundColor: '#d65a31',
            borderColor: '#777',
            borderWidth: 1,
            hoverBorderColor: '#000',
            // hoverBorderWidth: 3,
        }],
    },
    options: {}
});


let daysUsed30 = 0;
for (const event of data) {
    // convert the treatmentDate to a Date format from a string
    let eventDate = new Date(event.treatDate)
    // if it is within 30, push the object to the array
    if (eventDate > minus30Date) {
        daysUsed30++
    }
}
let daysUsedData30 = [daysUsed30, 30 - daysUsed30]

let myChartThree = document.querySelector("#myChartThree").getContext('2d');
let daysUsed30Chart = new Chart(myChartThree, {
    type: 'doughnut',
    data: {
        labels: ['Used', 'Unused'],
        datasets: [{
            label: 'Days',
            data: daysUsedData30,
            backgroundColor: ['#d65a31', '#d65a3180'],
            hoverOffset: 4,
            borderColor: '#777'
        }]
    },
    options: {}
});



// make a variable for today's date minus 14
const minus14Date = new Date();
minus14Date.setDate(minus14Date.getDate() - 14);

// make array of objects within the last 30 days
let [treatmentDates14, treatmentTimes14] = [[], []]


for (const event of data) {
    // convert the treatmentDate to a Date format from a string
    let eventDate = new Date(event.treatDate)
    // if it is within 30, push the object to the array
    if (eventDate > minus14Date) {
        treatmentDates14.push(event.treatDate)
        // convert seconds into hours, and round it to nearest tenth
        treatmentTimes14.push(Math.round(event.secUsed / 60 / 60 * 10) / 10)
    }
}



// build out the charts
let fourteenDuration = document.querySelector("#fourteenDuration").getContext('2d');
let hoursUsed14 = new Chart(fourteenDuration, {
    type: 'line',
    data: {
        labels: treatmentDates14,
        datasets: [{
            label: 'Treatment Hours',
            data: treatmentTimes14,
            backgroundColor: '#d65a31',
            hoverOffset: 4,
            borderColor: '#777',
        }]
    },
    options: {}
});


let daysUsed14 = 0;
for (const event of data) {
    // convert the treatmentDate to a Date format from a string
    let eventDate = new Date(event.treatDate)
    // if it is within 14, push the object to the array
    if (eventDate > minus14Date) {
        daysUsed14++
    }
}
let daysUsedData14 = [daysUsed14, 14 - daysUsed14]

let fourteenUsed = document.querySelector("#fourteenUsed").getContext('2d');
let daysUsed14Chart = new Chart(fourteenUsed, {
    type: 'pie',
    data: {
        labels: ['Used', 'Missed'],
        datasets: [{
            label: 'Days',
            data: daysUsedData14,
            backgroundColor: ['#d65a31', '#d65a3180'],
            hoverOffset: 4,
            borderColor: '#777'
        }]
    },
    options: {}
});