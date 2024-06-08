document.addEventListener('DOMContentLoaded', function () {
    const cardForm = document.getElementById('card-form');
    const flashcardContainer = document.getElementById('flashcard-container');
    const definitionTextarea = document.getElementById('definition');
    let cardIndex = 0;
    loadFlashcards();

    cardForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const term = document.getElementById('term').value;
        const definition = document.getElementById('definition').value;
        addFlashcard(term, definition, cardIndex);
        cardForm.reset();
        cardIndex++;
        definitionTextarea.style.height = 'auto';
    });

    definitionTextarea.addEventListener('input', function () {
        this.style.height = 'auto'; // Reset height
        this.style.height = (this.scrollHeight) + 'px'; 
    });

    function addFlashcard(term, definition, index) {
        setTimeout(function () {
            const flashcard = document.createElement('div');
            flashcard.classList.add('flashcard');

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.innerText = term;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            const content = document.createElement('div');
            content.classList.add('content');
            content.innerText = definition;

            const buttons = document.createElement('div');
            buttons.classList.add('buttons');

            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';

            flashcard.addEventListener('click', function () {
                cardInner.classList.toggle('is-flipped');
            });

            editButton.addEventListener('click', function (event) {
                console.log('Edit button clicked');
                event.stopPropagation(); 
                const newTerm = prompt("Enter new term:", cardFront.innerText);
                const newDefinition = prompt("Enter new definition:", content.innerText);
                if (newTerm !== null && newTerm.trim() !== '') {
                    cardFront.innerText = newTerm;
                    console.log('Updated term:', newTerm);
                }
                if (newDefinition !== null && newDefinition.trim() !== '') {
                    content.innerText = newDefinition;
                    console.log('Updated definition:', newDefinition);
                }
                updateLocalStorage();
            });

            // Delete button functionality
            deleteButton.addEventListener('click', function (event) {
                console.log('Delete button clicked');
                event.stopPropagation();
                const confirmation = confirm("Are you sure you want to delete this card?");
                if (confirmation) {
                    flashcard.remove();
                    console.log('Card deleted');
                    updateLocalStorage();
                }
            });

            buttons.appendChild(editButton);
            buttons.appendChild(deleteButton);
            cardBack.appendChild(content);
            cardBack.appendChild(buttons);
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            flashcard.appendChild(cardInner);
            flashcardContainer.appendChild(flashcard);

            // Save flashcard to localStorage
            saveFlashcard(term, definition);
        }, index * 300); // 300ms delay per card index
    }

    function saveFlashcard(term, definition) {
        let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.push({ term: term, definition: definition });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

    function loadFlashcards() {
        let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.forEach((card, index) => {
            addFlashcard(card.term, card.definition, index);
        });
    }

    function updateLocalStorage() {
        let flashcards = [];
        const flashcardElements = document.querySelectorAll('.flashcard');
        flashcardElements.forEach(flashcard => {
            const term = flashcard.querySelector('.card-front').innerText;
            const definition = flashcard.querySelector('.content').innerText;
            flashcards.push({ term: term, definition: definition });
        });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
});
