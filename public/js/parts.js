const tableBody = document.querySelector('tbody')
const createTable = (data) => {
    // sort the data by the nextDue date
    data.sort((a, b) => new Date(a.nextDue) - new Date(b.nextDue));

    // loop through the data
    for (let part in data) {
        // insert a row
        let row = tableBody.insertRow(-1);

        // create cells, then add data to innerHTML
        let c1 = row.insertCell(0)
        c1.innerHTML = data[part].component

        let c2 = row.insertCell(1)
        c2.innerHTML = data[part].lastChanged

        let c3 = row.insertCell(2);
        c3.innerHTML = data[part].frequency + " days";

        let c4 = row.insertCell(3)
        c4.innerHTML = data[part].nextDue

        let c5 = row.insertCell(4)
        let anchor = document.createElement('a')
        anchor.setAttribute('href', `http://localhost:3000/parts/${data[part]._id}/edit`)
        let icon = document.createElement('i')
        icon.classList.add("bi-pencil-square")
        icon.classList.add("icon-white")
        anchor.append(icon)
        c5.appendChild(anchor)

    }
}

createTable(data);
// look through all cells, then all bootstrap classes for light + center
const cells = document.querySelectorAll('td')
const correctTableValues = (e) => {
    e.forEach(element => {
        element.classList.add('text-light', 'text-center')
    })
}
correctTableValues(cells);