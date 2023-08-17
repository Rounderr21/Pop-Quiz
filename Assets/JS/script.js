{
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

  //Click start button message loacted in header will disapear//
  var messageToStart = document.getElementById("messageToStart");

  //How to end the game prematurely//
  var endGame = document.getElementById("endGame");
}

//questions that will be put up on the screen for the
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
let score = 0;
let index = 0;
quizValue = 120;

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
      countdownContainer.style.display = "block";

      //if statement makes it when countdown is at 0 it clears it and removes the countdown container from the screen.
      if (countdownValue < 0) {
        clearInterval(counter);
        countdownContainer.style.display = "none";
        generateQuestion();
        quizCounter();
      }
    }, 1000); //this is by every second//
  });
}

//function starts and put the question on the screen.
function renderAnswers() {
  messageToStart.style.display = "none";

  var question = questions[index];

  answerElement.innerHTML = "";

  questionsContainer.style.display = "block";
  answerElement.style.display = "block";

  for (var i = 0; i < question.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = question.choices[i];

    //console.log(questions[i].correctAnswer);//just to see what it logs//

    choiceButton.addEventListener("click", function (event) {
      checkAnswer(event.target.textContent);
    });

    answerElement.appendChild(choiceButton);
  }
}

//need to figue out how to put questions on page//
function generateQuestion() {
  var question = questions[index];
  questionElement.style.display = "block";
  questionElement.textContent = question.text;
  console.log(question.text);
  renderAnswers();
}

//DONE
function quizCounter() {
  quizTimerContainer.style.display = "block";

  var quizCounter = setInterval(function () {
    quizText.textContent = quizValue + " seconds left in quiz.";
    quizValue--;

    //if statement makes it when countdown is at 0 it clears it and removes the countdown container from the screen.
    if (quizValue < 0) {
      clearInterval(quizCounter);
      quizTimerContainer.style.display = "none";
      //YOU WILL DISPLAY SCORE CARD IF SUBJECT HAS NOT FINIHSED HERE NEED TO FINISH THIS PART OF THE CODE LATER ONCE WE HAVE THE SCORE CARD DONE//
    }
  }, 1000); //this is by every second//
}

//need to figure out why display is hidden and not coming out.//
function endGameButton() {
  var choiceButton = document.createElement("button");
  choiceButton.textContent = endGame.textContent;
  endGame.style.display = "block";

  choiceButton.addEventListener("click", function () {
    choiceButton = startQuiz();
  });
}

function checkAnswer(selectedAnswer) {
  let question = questions[index];
  if (selectedAnswer === question.choices[question.correctAnswer]) {
    score += 5;
    quizValue += 10;
    //console.log(score);
    console.log("Correct Answer!");
  } else {
    score -= 5;
    quizValue -= 20;
    //console.log(score);
    console.log("Wrong Answer!");
  }
  index++;
  generateQuestion();
}