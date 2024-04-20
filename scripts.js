window.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const cardForm = document.getElementById('cardForm');
    let cards = JSON.parse(localStorage.getItem('cards') || '[]');

    function renderCards() {
        cardContainer.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.style.width = 'auto'; // Adjust based on content
            const cardInner = document.createElement('div');
            cardInner.className = 'cardInner';

            const cardFront = document.createElement('div');
            cardFront.className = 'cardFront';
            cardFront.textContent = card.title;

            const cardBack = document.createElement('div');
            cardBack.className = 'cardBack';
            cardBack.innerHTML = `<div>${card.definition}</div><button onclick="editCard(${index})">Edit</button><button onclick="deleteCard(${index})">Delete</button>`;

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardElement.appendChild(cardInner);
            cardContainer.appendChild(cardElement);

            cardElement.addEventListener('click', function() {
                this.classList.toggle('is-flipped');
            });
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
        if (title) cards[index].title = title;
        if (definition) cards[index].definition = definition;
        localStorage.setItem('cards', JSON.stringify(cards));
        renderCards();
    };

    cardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    });
    
    window.deleteCard = (index) => {
        if (confirm('Are you sure you want to delete this card?')) {
            cards.splice(index, 1);
            localStorage.setItem('cards', JSON.stringify(cards));
            renderCards();
        }
    };

    renderCards();
});
