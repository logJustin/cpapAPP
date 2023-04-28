const tableBody = document.querySelector('tbody');

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

createTable(data);

const cells = document.querySelectorAll('td');

// Adding CSS classes
cells.forEach((cell) => {
    cell.classList.add('text-light', 'text-center');
});
