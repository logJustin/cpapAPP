const tableBody = document.querySelector('tbody')
const createTable = (data) => {

    for (let day in data) {
        // insert a row
        let row = tableBody.insertRow(-1);

        // create cells, then add data to innerhtml
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

    }
    const cells = document.querySelectorAll('td')
    cells.forEach(element => {
        element.classList.add('text-light', 'text-center')
    });
}

createTable(data);