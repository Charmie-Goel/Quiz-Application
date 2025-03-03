const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers-buttons');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
  quizScore = 0;
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]); // Fixed to use shuffledQuestions
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => { // Fixed typo from forEach9 to forEach
    const button = document.createElement('button');
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
  clearStatusClass(document.body);
  nextButton.classList.add('hide'); // Fixed to use add instead of ass
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  setStatusClass(document.body, correct); // Fixed to pass correct variable
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
  
  if (correct) { // Fixed to check if correct is truthy
    quizScore++;
  }
  document.getElementById("right-answers").innerText = quizScore;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: "Which one of these is a JavaScript framework?",
    answers: [
      { text: 'Python', correct: false },
      { text: 'Django', correct: false },
      { text: 'React', correct: true },
      { text: 'Eclipse', correct: false }
    ],
  },
  {
    question: "Who is the Prime Minister of India?",
    answers: [
      { text: 'Narendra Modi', correct: true },
      { text: 'Rahul Gandhi', correct: false },
    ],
  },
  {
    question: "What is 4 * 3?",
    answers: [
      { text: '6', correct: false },
      { text: '12', correct: true },
    ],
  },
];