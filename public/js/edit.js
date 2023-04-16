function calculateDueDate() {
    const frequency = parseInt($('#frequency').val());
    const lastChanged = new Date($('#lastChanged').val());
    const newDueDate = new Date(lastChanged.getTime() + frequency * 24 * 60 * 60 * 1000);
    const newDueDateString = newDueDate.toISOString().substring(0, 10);
    $('#nextDue').val(newDueDateString);
}

$('#lastChanged').on('change', calculateDueDate);
$('#frequency').on('change', calculateDueDate);
