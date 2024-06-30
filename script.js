document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const host = document.getElementById('host').value;
    const isPublic = document.getElementById('isPublic').checked;
    const allowedUsers = document.getElementById('allowedUsers').value.split(',');

    const eventItem = {
        title,
        description,
        host,
        isPublic,
        allowedUsers
    };

    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(eventItem);
    localStorage.setItem('events', JSON.stringify(events));

    displayEvents();
});

function displayEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    const events = JSON.parse(localStorage.getItem('events')) || [];

    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerHTML = `
            <h2>${event.title}</h2>
            <p>${event.description}</p>
            <p>Gastgeber: ${event.host}</p>
            <p>Öffentlich: ${event.isPublic ? 'Ja' : 'Nein'}</p>
            ${event.isPublic ? '' : `<p>Erlaubte Benutzer: ${event.allowedUsers.join(', ')}</p>`}
        `;
        eventsList.appendChild(eventDiv);
    });
}

displayEvents();
