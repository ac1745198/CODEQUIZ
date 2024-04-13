const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionsContainerEl = document.getElementById('questionsCon');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let score = 0;
let shuffledQuestions, currentQuestionIndex;

const questions = [
    {
        question: 'What does "DOM" stand for in JavaScript?',
        answers: [
            { text: 'Document Object Model', correct: true },
            { text: 'Data Object Model', correct: false },
            { text: 'Dynamic Object Method', correct: false },
            { text: 'Distributed Object Model', correct: false }
        ]
    },
    {
        question: 'What does the "typeof" operator return in JavaScript?',
        answers: [
            { text: 'The type of a variable or expression', correct: true },
            { text: 'The size of a variable or expression', correct: false },
            { text: 'The value of a variable or expression', correct: false },
            { text: 'The memory address of a variable or expression', correct: false }
        ]
    },
    {
        question: 'Which JavaScript keyword is used to declare a variable that cannot be reassigned?',
        answers: [
            { text: 'var', correct: false },
            { text: 'const', correct: true },
            { text: 'let', correct: false },
            { text: 'static', correct: false }
        ]
    },
    {
        question: 'What is the output of the following code snippet?\n\nconsole.log(1 + "2" + "2");',
        answers: [
            { text: '122', correct: false },
            { text: '32', correct: false },
            { text: '14', correct: false },
            { text: '1222', correct: true }
        ]
    }
];

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    questionsContainerEl.classList.remove('hide');
    currentQuestionIndex = 0;
    nextQuestion();
    nextButton.classList.remove('hide');
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function nextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    scoreElement.textContent = `Score: ${score}`;
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        nextQuestion();
    } else {
        alert(`Quiz ended! Your score is ${score}`);
    }
}
