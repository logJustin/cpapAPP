const tableBody = document.querySelector('tbody');

// Sort the data array by the 'nextDue' property
const sortedData = (data) => {
    // convert each nextDue to a date in a new variable
    data.forEach((item, index) => {
        item.formattedDate = new Date(item.nextDue)
    })
    // compare & sort
    data.sort((a, b) => a.formattedDate - b.formattedDate);
}
sortedData(data)

const createTable = (data) => {
    // Using Array.prototype.forEach instead of a for...in loop
    data.forEach((item) => {
        // Using template literals to render table row HTML
        const html = `
            <tr>
                <td>${item.component}</td>
                <td>${item.lastChanged}</td>
                <td>${item.frequency} days</td>
                <td>${item.nextDue}</td>
                <td>
                    <a href="/parts/${item._id}/edit" class="table-link">
                        <i class="bi-pencil-square"></i>
                    </a>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', html);
    });
};

// Call createTable after sorting
createTable(data);

const cells = document.querySelectorAll('td');

// Adding CSS classes
cells.forEach((cell) => {
    cell.classList.add('text-light', 'text-center');
});
