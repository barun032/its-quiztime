const allQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      { answer: "HyperText Markup Language", isCorrect: true },
      { answer: "Hyper Transfer Markup Language", isCorrect: false },
      { answer: "HyperText Machine Language", isCorrect: false },
      { answer: "Hyper Transfer Machine Language", isCorrect: false },
    ],
  },
  {
    question:
      "Which of the following is used to link an external CSS file in HTML?",
    options: [
      { answer: "<css>", isCorrect: false },
      { answer: "<link>", isCorrect: true },
      { answer: "<style>", isCorrect: false },
      { answer: "<external>", isCorrect: false },
    ],
  },
  {
    question: "Which of the following is not a valid CSS property?",
    options: [
      { answer: "color", isCorrect: false },
      { answer: "font-size", isCorrect: false },
      { answer: "text-decoration", isCorrect: false },
      { answer: "border-style", isCorrect: true },
    ],
  },
  {
    question:
      "What is the correct syntax for including an external JavaScript file in HTML?",
    options: [
      { answer: "<script src='file.js'></script>", isCorrect: true },
      { answer: "<script href='file.js'></script>", isCorrect: false },
      { answer: "<javascript src='file.js'></javascript>", isCorrect: false },
      { answer: "<js src='file.js'></js>", isCorrect: false },
    ],
  },
  {
    question: "What does the `z-index` property in CSS do?",
    options: [
      { answer: "Controls the opacity of an element", isCorrect: false },
      { answer: "Defines the stacking order of elements", isCorrect: true },
      { answer: "Defines the size of an element", isCorrect: false },
      { answer: "Sets the border width of an element", isCorrect: false },
    ],
  },
  {
    question:
      "Which JavaScript function is used to parse a string into an integer?",
    options: [
      { answer: "parseInt()", isCorrect: true },
      { answer: "toInt()", isCorrect: false },
      { answer: "int()", isCorrect: false },
      { answer: "convertToInt()", isCorrect: false },
    ],
  },
  {
    question:
      "Which CSS property is used to change the background color of an element?",
    options: [
      { answer: "background-color", isCorrect: true },
      { answer: "bg-color", isCorrect: false },
      { answer: "color", isCorrect: false },
      { answer: "background", isCorrect: false },
    ],
  },
  {
    question:
      "Which of the following is the correct way to select an element with the class 'example' in CSS?",
    options: [
      { answer: ".example {}", isCorrect: true },
      { answer: "#example {}", isCorrect: false },
      { answer: "example {}", isCorrect: false },
      { answer: "class=example {}", isCorrect: false },
    ],
  },
  {
    question: "What is the default value of the `position` property in CSS?",
    options: [
      { answer: "absolute", isCorrect: false },
      { answer: "relative", isCorrect: false },
      { answer: "static", isCorrect: true },
      { answer: "fixed", isCorrect: false },
    ],
  },
  {
    question:
      "Which JavaScript event is fired when a user clicks on an HTML element?",
    options: [
      { answer: "click", isCorrect: true },
      { answer: "hover", isCorrect: false },
      { answer: "onmouseover", isCorrect: false },
      { answer: "focus", isCorrect: false },
    ],
  },
];

const answerElm = document.querySelectorAll(".answer");
const answerContainer = document.querySelector(".answer-section");
const questionContainer = document.querySelector(".questions");
const nextButton = document.querySelector(".next-btn");
const showTotalQuestions = document.querySelector(".total-question");
const showCurrenQuestion = document.querySelector(".current-question");
const mainContainer = document.querySelector("main");
const showScore = document.querySelector(".show-score");
const showCurrentScore = document.querySelector('.score');
const timerElm = document.querySelector(".timer");
const startQuiz = document.querySelector(".start-now-btn");
const homePage = document.querySelector(".home-page");
const correctSound = document.querySelector("#correct-sound");
const InCorrectSound = document.querySelector("#in-correct-sound");
const speaker = document.querySelector("#speaker");

let currentQuestionIndex = 0;
let isAnswered = false;
let heighestScore = localStorage.getItem("heighestScore") || 0;
let currentScore = 0;
let timerId = null;
let rightAnswer = null;
let isMute = false;

localStorage.setItem("heighestScore", heighestScore);
showScore.textContent = `Highest Score: ${heighestScore}/${allQuestions.length}`;

startQuiz.addEventListener("click", () => {
  mainContainer.classList.remove("close");
  homePage.classList.add("close");
  startTimer();
  updateQestionsAndAnswer(currentQuestionIndex);
});

nextButton.addEventListener("click", () => {
  startTimer();
  clearPreviousAnswers();
  if (currentQuestionIndex < allQuestions.length - 1) {
    currentQuestionIndex++;
    updateQestionsAndAnswer(currentQuestionIndex);
  } else questionsOver();
});

speaker.addEventListener("click", () => {
  if (speaker.src.includes("volume.png")) {
    speaker.src = `/images/mute.png`;
    isMute = true;
  } else {
    speaker.src = `/images/volume.png`;
    isMute = false;
  }
});

function updateQestionsAndAnswer(index) {
  questionContainer.textContent = allQuestions[index].question;
  showCurrenQuestion.textContent = index + 1;
  showTotalQuestions.textContent = allQuestions.length;

  answerElm.forEach((answer, i) => {
    if (allQuestions[currentQuestionIndex].options[i].isCorrect) {
      rightAnswer = answer.parentElement;
    }
    answer.textContent = allQuestions[index].options[i].answer;
    answer.parentElement.addEventListener("click", () => {
      if (isAnswered) return;
      const isCorrect = allQuestions[currentQuestionIndex].options[i].isCorrect;
      if (isCorrect) {
        currentScore++;
        if(!isMute) correctSound.play();
        answer.parentElement.classList.add("right");
      } else {
        answer.parentElement.classList.add("wrong");
        rightAnswer.classList.add("right");
        if(!isMute) InCorrectSound.play();
      }
      isAnswered = true;
    });
  });
}

function clearPreviousAnswers() {
  Array.from(answerContainer.children).forEach((element) => {
    element.classList.remove("right", "wrong");
  });
  isAnswered = false;
  mainContainer.style.backgroundColor = "rgba(204, 226, 194, 1)";
}

function questionsOver() {
  if (currentScore > heighestScore) {
    heighestScore = currentScore;
    localStorage.setItem("heighestScore", heighestScore);
  }
  showCurrentScore.textContent = currentScore
  currentScore = 0;
  currentQuestionIndex = 0;
  clearInterval(timerId);
  showScore.textContent = `Highest Score: ${heighestScore}/${allQuestions.length}`;
  homePage.classList.remove("close");
  mainContainer.classList.add("close");
}

function startTimer() {
  clearInterval(timerId);
  initialTimer = 30;
  timerElm.textContent = `00:30`;
  timerId = setInterval(() => {
    updateTimerDisplay();
    if (initialTimer === 0) nextButton.click();
  }, 1000);
}

function updateTimerDisplay() {
  initialTimer--;
  const normalColor =
    initialTimer > 15
      ? "rgba(204, 226, 194, 1)"
      : initialTimer > 5
      ? "rgba(212, 214, 159, 0.55)"
      : "rgba(219, 173, 173, 1)";
  const dengerColor =
    initialTimer > 15
      ? "rgba(2, 164, 9, 0.43)"
      : initialTimer > 5
      ? "rgba(197, 177, 0, 0.43)"
      : "rgba(197, 12, 0, 0.43)";
  mainContainer.style.backgroundColor = normalColor;
  timerElm.style.backgroundColor = dengerColor;
  timerElm.textContent =
    initialTimer < 10 ? `00:0${initialTimer}` : `00:${initialTimer}`;
}
