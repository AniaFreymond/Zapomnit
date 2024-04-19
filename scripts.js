let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
updateCardList();

function addOrUpdateCard() {
    const term = document.getElementById('term').value.trim();
    const definition = document.getElementById('definition').value.trim();
    const existingIndex = flashcards.findIndex(card => card.term === term);

    const newCard = { term, definition };
    if (term && definition) {
        if (existingIndex !== -1) {
            flashcards[existingIndex] = newCard;
            alert('Flashcard updated!');
        } else {
            flashcards.push(newCard);
            alert('Flashcard added!');
        }
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        updateCardList();
        MathJax.typesetPromise();
    } else {
        alert('Please enter both term and definition.');
    }
}

function updateCardList() {
    const list = document.getElementById('cardList');
    list.innerHTML = ''; // Clear existing entries
    flashcards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'flashcard';
        cardElement.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">${card.term}</div>
                <div class="flashcard-back">${card.definition}</div>
            </div>
            <span class="edit-button" onclick="editCard('${card.term}')"></span>
        `;
        list.appendChild(cardElement);
    });
}

function editCard(term) {
    const cardToEdit = flashcards.find(card => card.term === term);
    if (cardToEdit) {
        document.getElementById('term').value = cardToEdit.term;
        document.getElementById('definition').value = cardToEdit.definition;
        MathJax.typesetPromise(); // Re-typeset to render LaTeX in the input fields
    }
}
