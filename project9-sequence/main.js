const questions = [
    {
        question: "How many chairs are made worldwide each year?",
        answers: [
            { text: "Over 10 million", correct: false },
            { text: "100 million", correct: false },
            { text: "Over 1 billion", correct: true },
            { text: "5 billion", correct: false }
        ]
    },
    {
        question: "Where is the tallest chair in the world?",
        answers: [
            { text: "New York, USA", correct: false },
            { text: "Tokyo, Japan", correct: false },
            { text: "Toronto, Canada", correct: false },
            { text: "Manzano, Italy", correct: true }
        ]
    },
    {
        question: "When did the first known chairs appear?",
        answers: [
            { text: "Ancient Greece, 600 BCE", correct: false },
            { text: "Ancient Egypt, 2600 BCE", correct: true },
            { text: "Medieval Europe, 1100 CE", correct: false },
            { text: "Roman Empire, 100 CE", correct: false }
        ]
    },
    {
        question: "What is the most common material used for chairs?",
        answers: [
            { text: "Wood", correct: true },
            { text: "Glass", correct: false },
            { text: "Marble", correct: false },
            { text: "Copper", correct: false }
        ]
    }
];

const startPage = document.getElementById('start-page');
const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const resultsContainer = document.getElementById('results-container');
const questionContainer = document.getElementById('question-container');
const controlsContainer = document.getElementById('controls');

let currentQuestionIndex = 0;

function startQuiz() {
    startPage.classList.add('hide');
    currentQuestionIndex = 0;
    nextButton.classList.remove('hide');
    resultsContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    controlsContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    document.body.classList.remove('correct', 'wrong');
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct === "true";
    document.body.classList.add(correct ? 'correct' : 'wrong');
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.add(button.dataset.correct === "true" ? 'correct' : 'wrong');
        button.removeEventListener('click', selectAnswer); 
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.classList.add('hide');
    controlsContainer.classList.add('hide');
    resultsContainer.classList.remove('hide');
}

startButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', () => {
    startPage.classList.remove('hide');
    resultsContainer.classList.add('hide');
});