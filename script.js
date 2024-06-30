const adminUsername = 'admin';
let username = localStorage.getItem('username') || 'huhn-planner_user';
let bannedUsers = JSON.parse(localStorage.getItem('bannedUsers')) || [];

document.getElementById('username').textContent = username;

document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const host = document.getElementById('host').value;
    const location = document.getElementById('location').value;
    const isPublic = document.getElementById('isPublic').checked;
    const allowedUsers = document.getElementById('allowedUsers').value.split(',').map(user => user.trim());

    const eventItem = {
        id: Date.now(),
        title,
        description,
        host,
        location,
        isPublic,
        allowedUsers,
        creator: username
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
    if (newUsername && !bannedUsers.includes(newUsername)) {
        username = newUsername;
        localStorage.setItem('username', username);
        document.getElementById('username').textContent = username;
    } else {
        alert('This username is banned or invalid.');
    }
});

function displayEvents(tab = 'all') {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    const events = JSON.parse(localStorage.getItem('events')) || [];

    let filteredEvents = events;

    if (tab === 'fyp') {
        filteredEvents = events.sort(() => 0.5 - Math.random()).slice(0, 5);
    } else if (tab === 'search') {
        const searchQuery = prompt("Enter search term:");
        filteredEvents = events.filter(event => 
            event.title.includes(searchQuery) || 
            event.host.includes(searchQuery) || 
            event.location.includes(searchQuery)
        );
    } else if (tab === 'favorites') {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        filteredEvents = events.filter(event => favorites.includes(event.host));
    }

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
            ${(event.creator === username || username === adminUsername) ? `<button onclick="deleteEvent(${event.id})">Delete</button>` : ''}
            ${username === adminUsername ? `<button onclick="banUser('${event.creator}')">Ban User</button>` : ''}
            <button onclick="addFavorite('${event.host}')">Add to Favorites</button>
        `;
        eventsList.appendChild(eventDiv);
    });
}

function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events.find(event => event.id === id);
    
    if (event.creator === username || username === adminUsername) {
        events = events.filter(event => event.id !== id);
        localStorage.setItem('events', JSON.stringify(events));
        displayEvents();
    } else {
        alert("You do not have permission to delete this event.");
    }
}

function banUser(user) {
    if (!bannedUsers.includes(user)) {
        bannedUsers.push(user);
        localStorage.setItem('bannedUsers', JSON.stringify(bannedUsers));
        alert(`${user} has been banned.`);
        displayEvents();
    }
}

function addFavorite(host) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(host)) {
        favorites.push(host);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${host} added to favorites.`);
    }
}

document.getElementById('nearby-tab').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showNearbyEvents);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showNearbyEvents(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const nearbyEvents = events.filter(event => {
        // Füge hier die Logik hinzu, um nahegelegene Events zu finden, z.B. basierend auf Entfernungsberechnungen
        return true; // Placeholder
    });

    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    nearbyEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerHTML = `
            <h2>${event.title}</h2>
            <p>${event.description}</p>
            <p>Host: ${event.host}</p>
            <p>Location: ${event.location}</p>
            <p>Public: ${event.isPublic ? 'Yes' : 'No'}</p>
            ${event.isPublic ? '' : `<p>Allowed Users: ${event.allowedUsers.join(', ')}</p>`}
            ${(event.creator === username || username === adminUsername) ? `<button onclick="deleteEvent(${event.id})">Delete</button>` : ''}
            ${username === adminUsername ? `<button onclick="banUser('${event.creator}')">Ban User</button>` : ''}
        `;
        eventsList.appendChild(eventDiv);
    });
}

displayEvents();
