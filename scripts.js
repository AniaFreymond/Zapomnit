body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

button {
    padding: 10px 20px;
    margin: 10px 0;
}

.flashcard {
    width: 200px;
    height: 100px;
    perspective: 1000px;
    display: inline-block;
    margin: 10px;
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.card-inner.is-flipped {
    transform: rotateY(180deg);
}

.card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
}

.card-front {
    background-color: yellow;
    color: #003366;
}

.card-back {
    background-color: white;
    color: #003366;
    transform: rotateY(180deg);
}

.button-container {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 5px;
}
