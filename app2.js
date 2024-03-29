/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, gamePlaying, scoreDOM;
var gameScore = 100;

scoreDOM = document.querySelector("#sD");
scoreDOM.textContent = gameScore;

init();

//Get the score input
document.querySelector(".inp").addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 13) {
        gameScore = document.querySelector(".inp").value;
        document.querySelector(".inp").value = "";
        // Displaying the score
        scoreDOM = document.querySelector("#sD");
        scoreDOM.textContent = gameScore;
    }
});

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
         //1. random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        //2. display result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        var diceDOM2 = document.querySelector(".dice2");
        diceDOM2.style.display = "block";
        diceDOM2.src = "dice-" + dice2 + ".png";


        //3. update the round score IF the rolled number was NOT a 1
        if(dice === 6 && lastDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
        lastDice = dice;
    }
});


document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        
        //Check if player won the game
        if (scores[activePlayer] >= gameScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
}



document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

}


// document.querySelector("#current-" + activePlayer).textContent = dice;
// document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";
// var x = document.querySelector("#score-0").textContent;


/***************************
 * 1, A player looses the entire score when he rolls two 6 in a row.
 * After that its the next players turn. Always save the previous dice roll in separate variable.
 */

/****************
 * 2, Add an input field to the HTML where players can set the winning score,
 * so they van change the predefined score of 100. (Value property)
 * 
*/



