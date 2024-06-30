let events = [];
let nextEventId = 1;

document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addEvent();
});

document.getElementById('change-username-button').addEventListener('click', changeUsername);

function addEvent() {
    const eventName = document.getElementById('event-name').value;
    const eventHost = document.getElementById('event-host').value;
    const eventLocation = document.getElementById('event-location').value;
    const eventDescription = document.getElementById('event-description').value;
    const eventPublic = document.getElementById('event-public').checked;
    
    const eventId = nextEventId++;
    const newEvent = { id: eventId, name: eventName, host: eventHost, location: eventLocation, description: eventDescription, public: eventPublic };
    events.push(newEvent);

    document.getElementById('event-form').reset();
    displayEvents();
}

function displayEvents() {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.innerHTML = `
            <h3>${event.name}</h3>
            <p>Host: ${event.host}</p>
            <p>Location: ${event.location}</p>
            <p>${event.description}</p>
            <p>ID: ${event.id}</p>
        `;
        eventsList.appendChild(eventElement);
    });
}

function deleteEventById() {
    const eventId = parseInt(document.getElementById('delete-event-id').value);
    events = events.filter(event => event.id !== eventId);
    displayEvents();
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

function changeUsername() {
    const newUsername = prompt("Enter your new username:");
    if (newUsername) {
        // Update username logic here
        alert("Username changed to " + newUsername);
    }
}
