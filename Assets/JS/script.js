{//start button id's pulled from HTML//
var startButton = document.getElementById('startButton');
var startButtonContainer = document.getElementById('startButtonContainer');

//ccountdown timer id's pulled from HTML//
var countdownContainer = document.getElementById('countdownContainer');
var countdownText = document.getElementById('countdownText');
var countdownValue = document.getElementById('countdownValue');

//question id's pulled from HTML//
var questionsContainer = document.getElementById('questionsContainer');
var questionElement = document.getElementById('questionElement');
var answerElement = document.getElementById('answerElement')

//quiztimer located in the header//
var quizTimerContainer = document.getElementById('quizTimerContainer');
var quizText = document.getElementById('quizText');
var quizValue = document.getElementById('quizValue');

//Click start button message loacted in header will disapear//
var messageToStart = document.getElementById('messageToStart');
}
//questions that will be put up on the screen for the 
const questions = [
    {
        text: "1. What is 2 plus 2?",
        choices: [4, 6, 8, 10],
        correctAnswer: 0

    },
    //must have a comma to make other questions.
    {
        text: "2. What is 4 plus 2?",
        choices: [4, 6, 8, 10],
        correctAnswer: 1
    },

    {
        text: "3. What is 6 plus 2?",
        choices: [4, 6, 8, 10],
        correctAnswer: 2
    },

    {
        text: "4. What is 8 plus 2?",
        choices: [4, 6, 8, 10],
        correctAnswer: 3
    }
];

//start button and timer functions before test questions pop up on screen// DONE!!!!!!
startButton.addEventListener('click', function(){

    countdownValue = 2; //CHANGE BACK TOOO 5 SECONDS
    var counter = setInterval(function(){
        
        countdownText.textContent = countdownValue;
        countdownValue--;
        
        //makes start button disapear, and allows the countdown container to display//
        startButtonContainer.style.display = "none";
        countdownContainer.style.display = "block";

        //if statement makes it when countdown is at 0 it clears it and removes the countdown container from the screen.
        if(countdownValue < 0){
            clearInterval(counter);
            countdownContainer.style.display = "none";
            renderQuestion();
        }    
    }, 1000); //this is by every second//
});


//function starts and put the question on the screen.
function renderQuestion() {
    
    messageToStart.style.display = 'none'
    quizTimerContainer.style.display = "block"
    questionsContainer.style.display = "block";
  
    //this state that we are at question 0 in the array//
    var currentQuestionNumber = 0;
    var question = questions[currentQuestionNumber];

    //the choice that the user starts at//
    let selectedAnswer = -1;

    //How many seconds the you have during the quiz//
    let quizValue = 30;

    //timer in the RH corner timing down during the test.
    var quizCounter = setInterval(function(){
        
        quizText.textContent = quizValue + " seconds left in quiz.";
        quizValue--;
        
       
        //quizTimerContainer.style.display = "block";

        //if statement makes it when countdown is at 0 it clears it and removes the countdown container from the screen.
        if(quizValue < 0){
            clearInterval(quizCounter);
            quizTimerContainer.style.display = "none";
            //YOU WILL DISPLAY SCORE CARD IF SUBJECT HAS NOT FINIHSED HERE NEED TO FINISH THIS PART OF THE CODE LATER ONCE WE HAVE THE SCORE CARD DONE//
        }    
    }, 1000); //this is by every second//

        questionElement.textContent = questions.text;
        answerElement.innerHTML = '';
        correctAnswer = questions.correctAnswer;

        for (var i = 0; i < questions.length; i++) {
            var choiceButton = document.createElement('button');
            choiceButton.textContent = question.choices[i];
    
            // Use a closure to capture the current value of i
            (function(i) {
                choiceButton.addEventListener('click', function() {
                    selectedAnswer = i;

                    if(selectedAnswer === correctAnswer)
                        console.log('correct answer!')
                    // Handle user's selected answer
                    // For example, compare selectedAnswer with question.correctAnswer
                });
            })(i);
    
            answerElement.appendChild(choiceButton);
        }
}
