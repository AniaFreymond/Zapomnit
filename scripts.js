let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
updateCardList();

function addOrUpdateCard() {
    const term = document.getElementById('term').value;
    const definition = document.getElementById('definition').value;
    const index = flashcards.findIndex(card => card.term === term);

    if (term && definition) {
        const newCard = { term, definition };
        if (index !== -1) {
            flashcards[index] = newCard;
            alert('Flashcard updated!');
        } else {
            flashcards.push(newCard);
            alert('Flashcard added!');
        }
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        updateCardList();
        document.getElementById('term').value = '';
        document.getElementById('definition').value = '';
        MathJax.typesetPromise();
    } else {
        alert('Please enter both title and definition.');
    }
}

function updateCardList() {
    const list = document.getElementById('cardList');
    list.innerHTML = '';
    flashcards.forEach((card, index) => {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-item';

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        cardContent.innerHTML = `<strong>${card.term}</strong><p>${card.definition}</p>`;

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit edit-icon';
        editIcon.onclick = function() {
            document.getElementById('term').value = card.term;
            document.getElementById('definition').value = card.definition;
            MathJax.typesetPromise();
        };

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash delete-icon';
        deleteIcon.onclick = function() {
            flashcards.splice(index, 1);
            localStorage.setItem('flashcards', JSON.stringify(flashcards));
            updateCardList();
        };

        cardItem.appendChild(cardContent);
        cardItem.appendChild(editIcon);
        cardItem.appendChild(deleteIcon);
        list.appendChild(cardItem);
    });
}

window.onload = updateCardList;
