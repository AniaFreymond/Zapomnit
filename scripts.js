document.getElementById('new-card-btn').addEventListener('click', function() {
    const frontText = prompt("Enter the title for the new card:");
    const backText = prompt("Enter the LaTeX content for the back of the card:");

    if (frontText && backText) {
        createCard(frontText, backText);
    }
});

function createCard(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'flashcard';

    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.textContent = frontText;

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.innerHTML = `$$${backText}$$`;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardContainer.appendChild(cardInner);

    document.getElementById('flashcard-container').appendChild(cardContainer);

    cardInner.addEventListener('click', function() {
        cardInner.classList.toggle('is-flipped');
    });

    MathJax.typesetPromise();
}

