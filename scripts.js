document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cardForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('titleInput').value.trim();
        const definition = document.getElementById('definitionInput').value.trim();
        if (title && definition) {
            addCard(title, definition);
            document.getElementById('titleInput').value = '';
            document.getElementById('definitionInput').value = '';
        }
    });

    loadCards();
});

function addCard(title, definition) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front">${title}</div>
        <div class="back" style="display:none;">${definition}</div>
        <button class="edit-btn">Edit</button>
    `;
    document.getElementById('cardsContainer').appendChild(card);

    card.addEventListener('click', function() {
        const back = card.querySelector('.back');
        const front = card.querySelector('.front');
        if (back.style.display === 'none') {
            back.style.display = 'block';
            front.style.display = 'none';
        } else {
            back.style.display = 'none';
            front.style.display = 'block';
        }
        MathJax.typesetPromise([card]);
    });

    card.querySelector('.edit-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        editCard(card, title, definition);
    });

    saveCards();
}

function editCard(card, title, definition) {
    const newTitle = prompt("Edit the title", title);
    const newDefinition = prompt("Edit the definition", definition);
    if (newTitle !== null && newDefinition !== null) {
        card.querySelector('.front').textContent = newTitle;
        card.querySelector('.back').textContent = newDefinition;
        saveCards();
    }
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
