document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('card-form');
    const flashcardContainer = document.getElementById('flashcard-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const term = document.getElementById('term').value;
        const definition = document.getElementById('definition').value;

        const card = { term, definition };
        addCardToDOM(card);
        saveCardToLocalStorage(card);

        form.reset();
        MathJax.typeset();
    });

    loadCardsFromLocalStorage();

    function addCardToDOM(card) {
        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = card.term;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = `
            <div>$$${card.definition}$$</div>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        flashcard.appendChild(cardInner);
        flashcardContainer.appendChild(flashcard);

        cardInner.addEventListener('click', () => {
            cardInner.classList.toggle('is-flipped');
        });

        const deleteButton = cardBack.querySelector('.delete-button');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteCard(card, flashcard);
        });

        const editButton = cardBack.querySelector('.edit-button');
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            editCard(card, cardInner);
        });

        MathJax.typeset();
    }

    function saveCardToLocalStorage(card) {
        let cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.push(card);
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    function loadCardsFromLocalStorage() {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.forEach(card => addCardToDOM(card));
        MathJax.typeset(); 
    }

    function deleteCard(card, cardElement) {
        let cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards = cards.filter(c => c.term !== card.term || c.definition !== card.definition);
        localStorage.setItem('cards', JSON.stringify(cards));
        cardElement.remove();
    }

    function editCard(card, cardInner) {
        const term = prompt("Edit term:", card.term);
        const definition = prompt("Edit definition:", card.definition);

        if (term && definition) {
            const updatedCard = { term, definition };
            deleteCard(card, cardInner.parentElement);
            addCardToDOM(updatedCard);
            saveCardToLocalStorage(updatedCard);
            MathJax.typeset();
        }
    }
});
