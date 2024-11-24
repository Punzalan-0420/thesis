const questions = [
    {
        question: 'Who is the first programmer?',
        answers: [
            { text: 'Linus Torvalds', correct: false },
            { text: 'Guido van Rossum', correct: false },
            { text: 'Ada Lovelace', correct: true },
            { text: 'Grace Hopper', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'Who wrote "To be, or not to be"?',
        answers: [
            { text: 'Charles Dickens', correct: false },
            { text: 'William Shakespeare', correct: true },
            { text: 'Mark Twain', correct: false },
            { text: 'Ernest Hemingway', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let currentPlayerIndex = 0;
const players = [];
const scores = {};

document.getElementById('add-player').addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value;
    if (playerName && !players.includes(playerName)) {
        players.push(playerName);
        scores[playerName] = 0;
        document.getElementById('player-name').value = '';
        updateCurrentPlayer(); // Update current player display
        if (players.length === 1) {
            startGame(); // Start the game if it's the first player added
        }
    }
});

function updateCurrentPlayer() {
    document.getElementById('current-player').innerText = players[currentPlayerIndex] || 'No Players';
    if (players.length === 0) {
        document.getElementById('next-button').style.display = 'none';
    } else {
        document.getElementById('next-button').style.display = 'block';
        document.getElementById('question-container').style.display = 'block';
        showQuestion(questions[currentQuestionIndex]);
    }
}

function startGame() {
    currentQuestionIndex = 0;
    currentPlayerIndex = 0;
    document.getElementById('score-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'block';
    document.getElementById('question-container').style.display = 'block';
    updateCurrentPlayer();
}

function showQuestion(question) {
    document.getElementById('question').innerText = question.question;
    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    if (answer.correct) {
        scores[players[currentPlayerIndex]]++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScores();
    }
}

function showScores() {
    document.getElementById('question-container').style.display = 'none';
    const scoresContainer = document.getElementById('scores');
    scoresContainer.innerHTML = '';
    for (const player in scores) {
        scoresContainer.innerHTML += `<p>${player}: ${scores[player]}</p>`;
    }
    document.getElementById('score-container').style.display = 'block';
}

document.getElementById('next-button').addEventListener('click', () => {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Move to the next player
    updateCurrentPlayer(); // Update the current player display
});

document.getElementById('restart-button').addEventListener('click', () => {
    players.length = 0; // Clear players
    for (const player in scores) {
        delete scores[player]; // Reset scores
    }
    startGame();
});

document.getElementById('finish-button').addEventListener('click', () => {
    const scoresContainer = document.getElementById('scores');
    scoresContainer.innerHTML = '';
    for (const player in scores) {
        scoresContainer.innerHTML += `<p>${player}: ${scores[player]}</p>`;
    }
    console.log('Game finished! Thanks for playing.')
});


