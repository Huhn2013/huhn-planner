document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const host = document.getElementById('host').value;
    const location = document.getElementById('location').value;
    const isPublic = document.getElementById('isPublic').checked;
    const allowedUsers = document.getElementById('allowedUsers').value.split(',');

    const eventItem = {
        id: Date.now(),
        title,
        description,
        host,
        location,
        isPublic,
        allowedUsers
    };

    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(eventItem);
    localStorage.setItem('events', JSON.stringify(events));

    displayEvents();
    document.getElementById('eventForm').reset();
});

document.getElementById('fyp-tab').addEventListener('click', function() {
    displayEvents('fyp');
});

document.getElementById('search-tab').addEventListener('click', function() {
    displayEvents('search');
});

document.getElementById('favorites-tab').addEventListener('click', function() {
    displayEvents('favorites');
});

document.getElementById('change-username').addEventListener('click', function() {
    const newUsername = prompt('Enter new username:');
    if (newUsername) {
        document.getElementById('username').textContent = newUsername;
    }
});

function displayEvents(tab = 'all') {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    const events = JSON.parse(localStorage.getItem('events')) || [];
    const username = document.getElementById('username').textContent;

    const filteredEvents = events.filter(event => {
        if (tab === 'fyp') {
            // Add your "For You Page" filtering logic here
            return true;
        } else if (tab === 'search') {
            // Add your "Search" filtering logic here
            return true;
        } else if (tab === 'favorites') {
            // Add your "Favorites" filtering logic here
            return true;
        } else {
            return true;
        }
    });

    filteredEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerHTML = `
            <h2>${event.title}</h2>
            <p>${event.description}</p>
            <p>Host: ${event.host}</p>
            <p>Location: ${event.location}</p>
            <p>Public: ${event.isPublic ? 'Yes' : 'No'}</p>
            ${event.isPublic ? '' : `<p>Allowed Users: ${event.allowedUsers.join(', ')}</p>`}
            <button onclick="deleteEvent(${event.id})">Delete</button>
        `;
        eventsList.appendChild(eventDiv);
    });
}

function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(event => event.id !== id);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents();
}

displayEvents();
