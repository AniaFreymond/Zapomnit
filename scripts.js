document.addEventListener('DOMContentLoaded', function () {
    const cardForm = document.getElementById('card-form');
    const flashcardContainer = document.getElementById('flashcard-container');
    const definitionTextarea = document.getElementById('definition');
    const deleteAllButton = document.getElementById('delete-all');
    const searchBar = document.getElementById('search-bar');

    deleteAllButton.addEventListener('click', () => {
        const confirmDelete = confirm("Are you sure you want to delete all cards?");
        if (confirmDelete) {
            const confirmDeleteAgain = confirm("This action cannot be undone. Are you absolutely sure?");
            if (confirmDeleteAgain) {
                flashcardContainer.innerHTML = '';
                localStorage.removeItem('flashcards');
            }
        }
    });

    searchBar.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const flashcards = flashcardContainer.getElementsByClassName('flashcard');
        
        Array.from(flashcards).forEach(card => {
            const term = card.querySelector('.card-front').textContent.toLowerCase();
            const definition = card.querySelector('.card-back .content').textContent.toLowerCase();
            
            if (term.includes(searchTerm) || definition.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('glow');
            } else {
                card.style.display = 'none';
                card.classList.remove('glow');
            }
        });

        if (searchTerm === '') {
            Array.from(flashcards).forEach(card => {
                card.classList.remove('glow');
            });
        }
    });

    flashcardContainer.innerHTML = '';

    loadFlashcards();

    cardForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const term = document.getElementById('term').value;
        const definition = document.getElementById('definition').value;
        createFlashcard(term, definition);
        cardForm.reset();
        definitionTextarea.style.height = 'auto';
    });
    
    definitionTextarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    function createFlashcard(term, definition) {
        addFlashcard(term, definition);
        saveFlashcard(term, definition);
    }

    function addFlashcard(term, definition) {
        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');
        flashcard.setAttribute('draggable', true);

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = term;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = definition;

        cardFront.setAttribute('data-raw-term', term);
        content.setAttribute('data-raw-definition', definition);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
 
        const refreshButton = document.createElement('button');
        refreshButton.textContent = 'Render';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        flashcard.addEventListener('click', function () {
            cardInner.classList.toggle('is-flipped');
        });

        refreshButton.addEventListener('click', function(event) {
       	    event.stopPropagation(); 
            location.reload(); 
     	});

        editButton.addEventListener('click', function (event) {
            event.stopPropagation();
            openEditModal(cardFront, content);
        });

        deleteButton.addEventListener('click', function (event) {
            event.stopPropagation();
            const confirmation = confirm("Are you sure you want to delete this card?");
            if (confirmation) {
                flashcard.remove();
                updateLocalStorage();
            }
        });

        buttons.appendChild(refreshButton);
        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);
        cardBack.appendChild(content);
        cardBack.appendChild(buttons);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        flashcard.appendChild(cardInner);
        flashcardContainer.insertBefore(flashcard, flashcardContainer.firstChild);

        if (window.MathJax) {
        	MathJax.typesetPromise([flashcard]).catch((err) => console.error(err.message));
   	}
}

    function openEditModal(cardFront, content) {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const termLabel = document.createElement('label');
        termLabel.textContent = "Edit Term:";
        const termInput = document.createElement('textarea');
        termInput.value = cardFront.getAttribute('data-raw-term');

        const definitionLabel = document.createElement('label');
        definitionLabel.textContent = "Edit Definition:";
        const definitionInput = document.createElement('textarea');
        definitionInput.value = content.getAttribute('data-raw-definition');

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', function () {
            if (termInput.value.trim() !== '') {
                cardFront.textContent = termInput.value;
                cardFront.setAttribute('data-raw-term', termInput.value);
            }
            if (definitionInput.value.trim() !== '') {
                content.textContent = definitionInput.value;
                content.setAttribute('data-raw-definition', definitionInput.value);
            }
            closeModal(modal);
            updateLocalStorage();
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cancel';
        closeButton.addEventListener('click', function () {
            closeModal(modal);
        });

        modalContent.appendChild(termLabel);
        modalContent.appendChild(termInput);
        modalContent.appendChild(definitionLabel);
        modalContent.appendChild(definitionInput);
        modalContent.appendChild(saveButton);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
        modal.classList.add('active');
    }

    function closeModal(modal) {
        modal.classList.remove('active'); 
        document.body.removeChild(modal);
    }

    function saveFlashcard(term, definition) {
        let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.push({ term: term, definition: definition });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

    function loadFlashcards() {
        let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.forEach(card => {
            addFlashcard(card.term, card.definition);
        });
    }

    function updateLocalStorage() {
        let flashcards = [];
        const flashcardElements = document.querySelectorAll('.flashcard');
        flashcardElements.forEach(flashcard => {
            const term = flashcard.querySelector('.card-front').textContent;
            const definition = flashcard.querySelector('.content').textContent;
            flashcards.push({ term: term, definition: definition });
        });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
});
