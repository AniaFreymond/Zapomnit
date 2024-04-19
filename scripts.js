let flashcards = [];

function addCard() {
    const term = document.getElementById('term').value;
    const definition = document.getElementById('definition').value;
    if (term && definition) {
        flashcards.push({ term, definition });
        document.getElementById('term').value = '';
        document.getElementById('definition').value = '';
        alert('Flashcard added!');
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
        MathJax.typesetPromise();  // This tells MathJax to process the math in the newly updated content
    } else {
        alert('No flashcards available. Add some and try again.');
    }
}
