var startButton = document.querySelector('#startButton');
var startButtonContainer = document.querySelector('#startButtonContainer');
var countdownContainer = document.querySelector('#countdownContainer');
var countdownText = document.querySelector('#countdownText');
var countdownValue = document.querySelector('#countdownValue');

countdownValue = 10; //might have to put it into a function so that when i grab it for the timer
                    //in the upper right corner it does not interfer

startButton.addEventListener('click', function(){

    var counter = setInterval(function(){
        
        countdownText.textContent = countdownValue;
        countdownValue--;
        
        //makes start button disapear, and allows the countdown container to display//
        startButtonContainer.style.display = "none";
        countdownContainer.style.display = "block";

        
        if(countdownValue < 0)
        clearInterval(counter);

    }, 1000); //this is by every second
        //put in the next function for the questions here.
});
