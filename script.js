// Array of themes (emojis)
const themes = {
    animals: ['🐶', '🐱', '🦊', '🐻', '🐼', '🐯', '🦁', '🐨'],
    objects: ['🎈', '🪁', '🎁', '🔑', '🖥️', '🛒', '📱', '🚲'],
    emojis: ['😊', '😂', '😍', '😎', '😇', '🥳', '😈', '😡']
};

let selectedTheme = 'animals';
let cardsArray = [];
let flippedCards = [];
let matchedCards = [];

// Game difficulty
let difficulty = 'easy';

// Shuffle cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create card elements
function createCards() {
    let cardSet = [...themes[selectedTheme]];
    if (difficulty === 'medium') cardSet = [...themes[selectedTheme], ...themes[selectedTheme].slice(0, 2)];
    else if (difficulty === 'hard') cardSet = [...themes[selectedTheme], ...themes[selectedTheme]];

    cardsArray = shuffle([...cardSet, ...cardSet]); // Double the cards and shuffle
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear board
    gameBoard.className = `game-board ${difficulty}`;

    cardsArray.forEach((cardSymbol, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.symbol = cardSymbol;
        cardElement.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back">${cardSymbol}</div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Flip card
function flipCard() {
    if (flippedCards.length === 2) return; // Prevent flipping more than two cards
    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 1000);
    }
}

// Check if the flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedCards.push(card1, card2);
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
    }

    flippedCards = [];

    if (matchedCards.length === cardsArray.length) {
        setTimeout(() => alert('You Win!'), 500);
    }
}

// Start game
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    createCards();
});

// Restart game
document.getElementById('restart-btn').addEventListener('click', () => {
    matchedCards = [];
    flippedCards = [];
    createCards();
});

// Change theme
document.getElementById('theme-btn').addEventListener('click', () => {
    const themeKeys = Object.keys(themes);
    selectedTheme = themeKeys[(themeKeys.indexOf(selectedTheme) + 1) % themeKeys.length];
    createCards();
});

// Handle difficulty change
document.getElementById('difficulty').addEventListener('change', (e) => {
    difficulty = e.target.value;
});

// Initial game setup (start screen)
document.getElementById('start-screen').classList.remove('hidden');
document.getElementById('game-screen').classList.add('hidden');
