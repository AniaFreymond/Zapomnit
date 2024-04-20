document.getElementById('cardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('titleInput').value;
    const definition = document.getElementById('definitionInput').value;
    addCard(title, definition);
    document.getElementById('titleInput').value = '';
    document.getElementById('definitionInput').value = '';
});

function addCard(title, definition) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front">${title}</div>
        <div class="back">${definition}</div>
        <button class="edit-btn">Edit</button>
    `;
    document.getElementById('cardsContainer').appendChild(card);
    card.querySelector('.edit-btn').addEventListener('click', function() {
        editCard(card, title, definition);
    });
    saveCards();
}

function editCard(card, title, definition) {
    const newTitle = prompt("Edit the title", title);
    const newDefinition = prompt("Edit the definition", definition);
    card.querySelector('.front').textContent = newTitle;
    card.querySelector('.back').textContent = newDefinition;
    saveCards();
}

function saveCards() {
    const cards = [];
    document.querySelectorAll('.card').forEach(card => {
        cards.push({
            title: card.querySelector('.front').textContent,
            definition: card.querySelector('.back').textContent
        });
    });
    localStorage.setItem('cards', JSON.stringify(cards));
}

function loadCards() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    if (cards) {
        cards.forEach(card => addCard(card.title, card.definition));
    }
}

window.onload = loadCards;
