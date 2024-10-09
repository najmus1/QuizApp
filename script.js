const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlink And Text Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Tell Markup Language", correct: false },
        ],
    },
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
        ],
    },
    {
        question: " Which animal is known as the 'Ship of the Desert?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Camel", correct: true },
            { text: "Horse", correct: false },
            { text: "None of these", correct: false },
        ],
    },
    {
        question: " Which is the smallest country in the world",
        answers: [
            { text: "Votican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Napal", correct: false },
            { text: "Shri lanka", correct: false },
        ],
    },
    {
        question: " How many seconds make one hour? ",
        answers: [
            { text: "2800 seconds", correct: false },
            { text: "2400 seconds", correct: false },
            { text: "1300 seconds", correct: false },
            { text: "3600 seconds", correct: true },
        ],
    },
    {
        question:
            "How many vowels are there in the English alphabet and name them? ",
        answers: [
            { text: "5 vowels namely a, e, i, o, and u.", correct: true },
            { text: "5 vowels namely a, e, o, v, and y.", correct: false },
            {
                text: "8 vowels namely i, o, y, m, q, and s, u.",
                correct: false,
            },
            { text: "6 vowels namely a, e, i, o and u, x.", correct: false },
        ],
    },
    {
        question: " What is the National Anthem of India? ",
        answers: [
            {
                text: " The National Anthem of India is Sujalam suphalam malayaja sheetalam",
                correct: false,
            },
            {
                text: "The National Anthem of India is  Vande maataram.",
                correct: false,
            },
            {
                text: " The National Anthem of India is Jana Gana Mana.",
                correct: true,
            },
            { text: "Sare Jahan Se Achha Hindustan Hamara", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 10;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    timeLeft = 10;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    nextButton.style.display = "block"; // Always show the next button
    startTimer();
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    clearInterval(timerInterval); // Stop any previous timer
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.disabled = false; // Enable the next button after selection
    clearInterval(timerInterval); // Stop the timer after an answer is selected
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function startTimer() {
    nextButton.disabled = true; // Disable the next button while the timer is running
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            Array.from(answerButtons.children).forEach((button) => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            nextButton.disabled = false; // Enable the next button when time runs out
        }
    }, 1000);
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
