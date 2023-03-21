let [dateRange, objectifiedDateRange] = [[], []]

// set endDate
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
        if (c2.innerHTML == '0.0') { c2.innerHTML = '~' }

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
        if (c5.innerHTML == '') { c5.innerHTML = '~' }

    }
}

createTable(objectifiedDateRange);
// look through all cells, then all bootstrap classes for light + center
const cells = document.querySelectorAll('td')
const correctTableValues = (e) => {
    e.forEach(element => {
        element.classList.add('text-light', 'text-center')
    })
}
correctTableValues(cells);