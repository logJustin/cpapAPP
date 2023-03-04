// declare variables
const toggle = document.querySelector('#flexSwitchCheckDefault')
const mainSection = document.querySelector('.mainSection')
// toggler logic to switch between light and dark mode
toggle.addEventListener('change', function () {
    if (toggle.checked) {
        let lightText = document.querySelectorAll('.text-light')
        mainSection.classList.toggle('mainSectionDark');

        [...lightText].forEach(x => {
            x.classList.add('text-dark');
            x.classList.remove('text-light');
        });

    } else {
        let darkText = document.querySelectorAll('.text-dark')
        mainSection.classList.toggle('mainSectionDark');

        [...darkText].forEach(x => {
            x.classList.add('text-light');
            x.classList.remove('text-dark');
        });

    }
})


// make a variable for today's date minus 30
const minus30Date = new Date();
minus30Date.setDate(minus30Date.getDate() - 30);
const minus14Date = new Date();
minus14Date.setDate(minus14Date.getDate() - 14);

// make array of objects within the last 30 days
let [treatmentDates30, treatmentTimes30, treatmentDates14, treatmentTimes14] = [[], [], [], []]
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
let myChart = document.querySelector("#myChart").getContext('2d');
let hoursUsed = new Chart(myChart, {
    type: 'bar',
    data: {
        labels: treatmentDates30,
        datasets: [{
            label: 'Treatment Hours',
            data: treatmentTimes30,
            backgroundColor: '#d65a31',
        }],
    },
    options: {}
});

let myChartTwo = document.querySelector("#myChartTwo").getContext('2d');
let cityPop = new Chart(myChartTwo, {
    type: 'line',
    data: {
        labels: treatmentDates14,
        datasets: [{
            label: 'Treatment Hours',
            data: treatmentTimes14,
            backgroundColor: '#d65a31',
            // borderWidth: 1,
            borderColor: '#777',
            // hoverBorderWidth: 3,
            // hoverBorderColor: '#000'
        }]
    },
    options: {}
});
