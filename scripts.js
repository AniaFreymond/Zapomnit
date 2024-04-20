function updateCardList() {
    const list = document.getElementById('cardList');
    list.innerHTML = '';
    flashcards.forEach((card, index) => {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-item';

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        cardContent.textContent = card.term; // Display term or truncate if too long

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit edit-icon';
        editIcon.addEventListener('click', function() {
            editCard(index); // Function to load card into input fields for editing
        });

        cardItem.appendChild(cardContent);
        cardItem.appendChild(editIcon);
        list.appendChild(cardItem);
    });
}

function editCard(index) {
    const card = flashcards[index];
    document.getElementById('term').value = card.term;
    document.getElementById('definition').value = card.definition;
    MathJax.typesetPromise(); // Update MathJax rendering after loading content
}
