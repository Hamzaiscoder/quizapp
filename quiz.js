const quizData = [
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Apple", "Netscape", "Google"],
        answer: "Netscape"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/*", "#", "<!--"],
        answer: "//"
    },
    {
        question: "Which method is used to parse a string to an integer in JavaScript?",
        options: ["parseInt()", "parseFloat()", "Number()", "parseNumber()"],
        answer: "parseInt()"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["Django", "Rails", "Angular", "Laravel"],
        answer: "Angular"
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "def myFunction()", "function:myFunction()", "create function myFunction()"],
        answer: "function myFunction()"
    }
];

const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('next');
const resultModal = document.getElementById('result-modal');
const closeButton = document.querySelector('.close-button');
const retryButton = document.getElementById('retry');
const resultDetails = document.getElementById('result-details');
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function showQuestion(questionIndex) {
    const currentQuestion = quizData[questionIndex];
    const options = currentQuestion.options.map(option => 
        `<label>
            <input type="radio" name="question" value="${option}">
            ${option}
        </label>`
    ).join('');

    quizContainer.innerHTML = `
        <div class="question"> ${currentQuestion.question} </div>
        <div class="options"> ${options} </div>
    `;
    
    nextButton.textContent = questionIndex === quizData.length - 1 ? 'Submit' : 'Next';
}

function checkAnswer() {
    const answerContainers = quizContainer.querySelector('.options');
    const selector = `input[name=question]:checked`;
    const userAnswer = (answerContainers.querySelector(selector) || {}).value;

    if (!userAnswer) {
        alert("Please select an answer before proceeding.");
        return;
    }

    userAnswers.push({
        question: quizData[currentQuestionIndex].question,
        userAnswer: userAnswer,
        correctAnswer: quizData[currentQuestionIndex].answer
    });

    if (userAnswer === quizData[currentQuestionIndex].answer) {
        score++;
    }

    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function showResults() {
    const totalQuestions = quizData.length;
    const scorePercentage = (score / totalQuestions) * 100;
    const passMessage = scorePercentage >= 35 ? 'Congratulations! You Passed!' : 'Sorry! You Failed.';

    resultDetails.innerHTML = `
        <h2 style="text-align: center; color: ${scorePercentage >= 35 ? 'green' : 'red'};">${passMessage}</h2>
        ${userAnswers.map(answer => `
            <div class="${answer.userAnswer === answer.correctAnswer ? 'correct' : 'incorrect'}">
                <p><strong>Question:</strong> ${answer.question}</p>
                <p><strong>Your Answer:</strong> ${answer.userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${answer.correctAnswer}</p>
            </div>
        `).join('')}
    `;

    resultModal.style.display = 'block';
}

function closeModal() {
    resultModal.style.display = 'none';
}

function retryQuiz() {
    window.location.reload();
}

quizContainer.addEventListener('change', () => {
    nextButton.style.display = 'block';
});

nextButton.addEventListener('click', checkAnswer);
closeButton.addEventListener('click', closeModal);
retryButton.addEventListener('click', retryQuiz);

showQuestion(currentQuestionIndex);
