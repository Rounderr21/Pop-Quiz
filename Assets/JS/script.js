//start button id's pulled from HTML//
var startButton = document.getElementById("startButton");
var startButtonContainer = document.getElementById("startButtonContainer");

//ccountdown timer id's pulled from HTML//
var countdownContainer = document.getElementById("countdownContainer");
var countdownText = document.getElementById("countdownText");
var countdownValue = document.getElementById("countdownValue");

//question id's pulled from HTML//
var questionsContainer = document.getElementById("questionsContainer");
var questionElement = document.getElementById("questionElement");
var answerElement = document.getElementById("answerElement");

//quiztimer located in the header//
var quizTimerContainer = document.getElementById("quizTimerContainer");
var quizText = document.getElementById("quizText");
var quizValue = document.getElementById("quizValue");

//Click start button message loacted in header//
var messageToStart = document.getElementById("messageToStart");

//getting initals and score at end of quiz//
var formContainer = document.getElementById("formContainer");
var formElement = document.getElementById("formElement");
var input = document.getElementById("input");
var enterButton = document.getElementById("enterButton");

//scorecard for the end//
var leaderboard = document.getElementById("leaderboard");
var results = document.getElementById("results");
var eraseButton = document.getElementById("erase");
var restartButton = document.getElementById("restart");

//questions that will be put up on the screen for the test. this is a variable that has an array of objects.//
const questions = [
  {
    text: "1. What is 2 plus 2?",
    choices: ["A. " + 4, "B. " + 6, "C. " + 8, "D. " + 10],
    correctAnswer: 0,
  },
  //must have a comma to make other questions.
  {
    text: "2. What is 4 plus 2?",
    choices: ["A. " + 200, "B. " + 6, "C. " + 8, "D. " + 10],
    correctAnswer: 1,
  },

  {
    text: "3. What is 6 plus 2?",
    choices: ["A. " + 2000, "B. " + 6, "C. " + 8, "D. " + 10],
    correctAnswer: 2,
  },

  {
    text: "4. What is 8 plus 2?",
    choices: ["A. " + 4, "B. " + 6, "C. " + 8, "D. " + 10],
    correctAnswer: 3,
  },
];

//global variables so that all functions can access them//
let score = 0;
let index = 0;
quizValue = 90;


//startQuiz function is called and the quiz starts//
startQuiz();

function startQuiz() {
  //start button and timer functions before test questions pop up on screen//
  startButton.addEventListener("click", function () {
    countdownValue = 2; //CHANGE BACK TOOO 5 SECONDS
    var counter = setInterval(function () {
      countdownText.textContent = countdownValue;
      countdownValue--;

      //makes start button disapear, and allows the countdown container to display//
      startButtonContainer.style.display = "none";
      messageToStart.style.display = "none";
      countdownContainer.style.display = "block";

      //if statement makes it when countdown is at 0 it clears it and removes the countdown container from the screen.
      if (countdownValue < 0) {
        clearInterval(counter);
        countdownContainer.style.display = "none";
        //once we clear the countdown timer, we start functions quizCounter and generateQuestion//
        generateQuestion();
        quizCounter();
      }
    }, 1000); //this is by every second//
  });
}

//function starts and puts the answers in the questions array on the screen via for loop//
function renderAnswers() {

  var question = questions[index];

  answerElement.innerHTML = "";

  questionsContainer.style.display = "block";
  answerElement.style.display = "block";

  for (var i = 0; i < question.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = question.choices[i];

    choiceButton.addEventListener("click", function (event) {
      checkAnswer(event.target.textContent);
    });

    //puts the answer buttons to the answerelement and displays
    answerElement.appendChild(choiceButton);
  }
}

//Function generates questions onto the page//
function generateQuestion() {
  var question = questions[index];
  questionElement.style.display = "block";

  //if statement is used to make sure every question in the array has been asked and calls renderAnswers fucntion, when all asked we end the quiz by calling quizFinished function//
  if (index === questions.length) {
    quizFinished();
    localStorage.setItem("score", score);
  } else {
    questionElement.textContent = question.text;
    renderAnswers();
  }
}

//this function is how much time the user has to finish the quiz//
function quizCounter() {
  quizTimerContainer.style.display = "block";

  var quizCounterInterval = setInterval(function () {
    quizText.textContent = quizValue + " seconds left in quiz.";
    quizValue--;

    //if statement makes it when countdown is at 0 it clears it and removes the countdown container from the screen. it then calls function quizFinished to start//
    if (quizValue < 0) {
      clearInterval(quizCounterInterval);
      quizFinished();
    }
  }, 1000); //this is by every second//
}

function quizFinished() {
  
  questionElement.style.display = "none";
  answerElement.style.display = "none";
  quizTimerContainer.style.display = "none";
  questionsContainer.style.display = "none";

  formElement.style.display = "block";
  input.style.display = "block";
  enterButton.style.display = "block";

  localStorage.getItem("score");
  formElement.textContent =
    "Your score is: " + score + "! Please enter your initals.";

  addInfo(); //run a function to add the click event to button//
}

function checkAnswer(selectedAnswer) {
  let question = questions[index];
  if (selectedAnswer === question.choices[question.correctAnswer]) {
    console.log("Correct Answer!");
    score += 15;
  } else {
    quizValue -= 20;
    console.log("Wrong Answer!");
  }
  index++;
  generateQuestion();
}

function addInfo() {
  enterButton.addEventListener("click", function () {
    var initials = input.value;
    localStorage.setItem("initials", initials);

    if (formElement.style.display !== "none") {
      formElement.style.display = "none";
      input.style.display = "none";
      enterButton.style.display = "none";
      scorecard();
    }
  });
}

function scorecard() {
  leaderboard.style.display = "block";

  var initials = localStorage.getItem("initials");
  var score = localStorage.getItem("score");

  var scorecardText = "initials: " + initials + " score : " + score;
  results.textContent = scorecardText;

  restartButton.addEventListener("click", function () {
    score = 0;
    index = 0;
    quizValue = 90;

    leaderboard.style.display = "none";
    messageToStart.style.display = "block";
    startButtonContainer.style.display = "flex";

    startQuiz();
  });

  eraseButton.addEventListener("click", function () {
    localStorage.clear();

    results.textContent = "";

    score = 0;
  });
}
