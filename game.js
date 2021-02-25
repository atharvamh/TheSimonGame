var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var isGameStarted = false;
var level = 0;

$('.btn').click(function(){

    if(isGameStarted){
        var userChosenColor = $(this).attr('id');
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
    }
    
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $('h1').text("Level "+ level);

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(chosenColor){
    var audio = new Audio('sounds/'+chosenColor+'.mp3');
    audio.play();
}

function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    }, 100);
}

$(document).keydown(function(){
    if(!isGameStarted){
        $('h1').text("Level "+ level);
        nextSequence();
        isGameStarted = true;
    }
})

function startOver(){
    gamePattern = [];
    isGameStarted = false;
    level = 0;
    userClickedPattern = [];
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){

            $('body').addClass('correct');
            setTimeout(function(){
                $('body').removeClass('correct');
            },200);

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200)
        $('h1').text('Game Over,Press Any Key to Restart');
        startOver();
    }
}