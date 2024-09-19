document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: '/api/menu',  // Fetch menu data from backend
        dateClick: function(info) {
            fetch('/api/menu/${info.dateStr}')
            .then(response => response.json())
            .then(data => {
                let menuDetails = document.getElementById('menu-details');
                menuDetails.innerHTML = `
                    <h2>Menu for ${info.dateStr}</h2>
                    <p>Breakfast: ${data.breakfast}</p>
                    <p>Lunch: ${data.lunch}</p>
                    <p>Snacks: ${data.snacks}</p>
                    <p>Dinner: ${data.dinner}</p>
                `;
            });
        }
    });
    
    calendar.render();

    // Fetch and display waste statistics
    fetch('/api/waste/stats')
    .then(response => response.json())
    .then(data => {
        let ctx = document.getElementById('stats-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Breakfast', 'Lunch', 'Snacks', 'Dinner'],
                datasets: [{
                    label: 'Food Waste (kg)',
                    data: [data.breakfast, data.lunch, data.snacks, data.dinner],
                    backgroundColor: ['#f39c12', '#e74c3c', '#8e44ad', '#3498db']
                }]
            }
        });
    });
});