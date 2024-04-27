document.addEventListener('DOMContentLoaded', function() {
    loadCards();
    document.getElementById('new-card-btn').addEventListener('click', function() {
        const frontText = prompt("Enter the title for the new card:");
        const backText = prompt("Enter the LaTeX content for the back of the card:");
        if (frontText && backText) {
            createCard(frontText, backText);
            saveCards();
        }
    });
});

function createCard(frontText, backText, id = null) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'flashcard';
    cardContainer.dataset.id = id || Date.now(); // Use current timestamp as unique identifier

    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.textContent = frontText;

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.innerHTML = `$$${backText}$$`;

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        if (confirm("Are you sure you want to delete this card?")) {
            cardContainer.remove();
            saveCards();
        }
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = function() {
        const newFrontText = prompt("Edit the title of the card:", frontText);
        const newBackText = prompt("Edit the LaTeX content of the card:", backText);
        if (newFrontText && newBackText) {
            cardFront.textContent = newFrontText;
            cardBack.innerHTML = `$$${newBackText}$$`;
            MathJax.typesetPromise(); // Re-render all MathJax elements
            saveCards();
        }
    };

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardInner.appendChild(buttonContainer);
    cardContainer.appendChild(cardInner);

    document.getElementById('flashcard-container').appendChild(cardContainer);

    cardInner.addEventListener('click', function(e) {
        if (!e.target.matches('button')) {
            cardInner.classList.toggle('is-flipped');
        }
    });

    MathJax.typesetPromise(); // Re-render all MathJax elements
}

function saveCards() {
    const cards = [];
    document.querySelectorAll('.flashcard').forEach(card => {
        const frontText = card.querySelector('.card-front').textContent;
        const backText = card.querySelector('.card-back').textContent;
        const id = card.dataset.id;
        cards.push({ frontText, backText, id });
    });
    localStorage.setItem('cards', JSON.stringify(cards));
}

function loadCards() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    if (cards) {
        cards.forEach(card => {
            createCard(card.frontText, card.backText, card.id);
        });
    }
}
