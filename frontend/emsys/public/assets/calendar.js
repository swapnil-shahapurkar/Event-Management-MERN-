document.addEventListener('DOMContentLoaded', () => {
    const calendarButton = document.querySelector('.calendar-button');
    const calendarPopup = document.getElementById('calendar-popup');
    const closeBtn = document.querySelector('.close-btn');
    const calendarSlots = document.getElementById('calendar-slots');
    const monthSelect = document.getElementById('month-select');

    // Available dates by month
    const calendarHash = {
        'August': ['2024-08-30', '2024-08-31'],
        'September': ['2024-09-01', '2024-09-05', '2024-09-10'],
        'October': ['2024-10-04', '2024-10-11', '2024-10-20']
    };

    // Function to handle month selection
    calendarButton.addEventListener('click', () => {
        const selectedMonth = monthSelect.value;
        calendarSlots.innerHTML = ''; // Clear previous slots

        const availableDates = calendarHash[selectedMonth] || [];

        if (availableDates.length > 0) {
            availableDates.forEach(date => {
                const slotItem = document.createElement('li');
                slotItem.textContent = date;
                calendarSlots.appendChild(slotItem);
            });
        } else {
            const noSlot = document.createElement('li');
            noSlot.textContent = 'No dates available';
            calendarSlots.appendChild(noSlot);
        }

        calendarPopup.style.display = 'flex';
    });

    // Close the popup
    closeBtn.addEventListener('click', () => {
        calendarPopup.style.display = 'none';
    });
});
