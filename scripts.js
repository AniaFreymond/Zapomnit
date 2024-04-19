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
        document.getElementById('term').value = '';
        document.getElementById('definition').value = '';
        updateCardList();
        MathJax.typesetPromise();  // Ensure MathJax re-typesets after updating DOM
    } else {
        alert('Please enter both term and definition.');
    }
}

function showCard() {
    if (flashcards.length > 0) {
        const card = flashcards[Math.floor(Math.random() * flashcards.length)];
        const flashcardDiv = document.getElementById('flashcard');
        flashcardDiv.innerHTML = `<strong>${card.term}</strong><p>${card.definition}</p>`;
        flashcardDiv.style.display = 'block';
        MathJax.typesetPromise();  // Ensure MathJax re-typesets after updating DOM
    } else {
        alert('No flashcards available. Add some and try again.');
    }
}

function updateCardList() {
    const list = document.getElementById('cardList');
    list.innerHTML = '';
    flashcards.forEach(card => {
        const listItem = document.createElement('li');
        listItem.textContent = card.term;
        listItem.onclick = function() {
            document.getElementById('term').value = card.term;
            document.getElementById('definition').value = card.definition;
            MathJax.typesetPromise();  // Ensure MathJax re-typesets after loading existing content into fields
        };
        list.appendChild(listItem);
    });
}
