window.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const cardForm = document.getElementById('cardForm');
    let cards = JSON.parse(localStorage.getItem('cards') || '[]');

    function renderCards() {
        cardContainer.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                <div class="cardInner">
                    <div class="cardFront">${card.title}</div>
                    <div class="cardBack"><div>${card.definition}</div><button onclick="editCard(${index})">Edit</button></div>
                </div>
            `;
            cardContainer.appendChild(cardElement);
        });
    }

    cardForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('titleInput').value;
        const definition = document.getElementById('definitionInput').value;
        cards.push({ title, definition });
        localStorage.setItem('cards', JSON.stringify(cards));
        renderCards();
        cardForm.reset();
        MathJax.typeset(); // Update MathJax rendering
    });

    window.editCard = (index) => {
        const title = prompt('Edit the title:', cards[index].title);
        const definition = prompt('Edit the definition:', cards[index].definition);
        cards[index] = { title, definition };
        localStorage.setItem('cards', JSON.stringify(cards));
        renderCards();
    };

    renderCards();
});
