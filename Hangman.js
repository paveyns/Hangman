var randword = "";
var underscores = [];
var turnsleft = 10;
var usedletters = [];
drawnextpeice()
function getWord() {
    document.getElementById("guessbtn").disabled = false;
    var e = document.getElementById("difficultyselect");
    var difficulty = e.options[e.selectedIndex].value;
    var requestString = "https://hangman-api.lively.software/?difficulty=" + difficulty;
    var wordRequest = new XMLHttpRequest;
    wordRequest.onload = function () {
        console.log(requestString);
        var word = JSON.parse(wordRequest.responseText);
        console.log(word.word);
        randword = word.word;
        setunderscores();
    }
    wordRequest.open("GET", requestString);
    wordRequest.send();
}
function setunderscores() {
    var len = randword.length
    underscores = [];
    for (let index = 0; index < len; index++) {
        underscores.push("_")
    }
    var str = underscores.toString();
    document.getElementById("letters").innerHTML = str.split(",").join(" ");
}
function processguess() {
    var e = document.getElementById("guessselect");
    var guess = e.options[e.selectedIndex].value;
    if (!randword.includes(guess) && !usedletters.includes(guess)) {
        turnsleft--;
        drawnextpeice();
    }
    else if (usedletters.includes(guess)) {
        confirm("You already guessed that letter!");
    }
    if (turnsleft < 1) {
        endgame(false);
    }
    document.getElementById("turnsleft").innerHTML = turnsleft;
    for (var i = 0; i < randword.length; i++) {
        if (randword[i] == guess) {
            underscores[i] = guess;
            var str = underscores.toString();
            document.getElementById("letters").innerHTML = str.split(",").join(" ");
        }
        else if (!usedletters.includes(guess)) {
            usedletters.push(guess)
            var str = usedletters.toString();
            document.getElementById("usedletters").innerHTML = str.split(",").join(" ");
        }
    }
    if (underscores.toString().split(",").join("") == randword) {
        document.getElementById("letters").innerHTML = randword;
        endgame(true);
    }
}

function drawnextpeice() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    if (turnsleft < 10) {
        //frame 1
        ctx.moveTo(25, 275);
        ctx.lineTo(275, 275);
        ctx.stroke();
    } if (turnsleft < 9) {
        //frame 2
        ctx.moveTo(75, 275);
        ctx.lineTo(75, 25);
        ctx.stroke();
    } if (turnsleft < 8) {
        //frame 3
        ctx.moveTo(75, 25);
        ctx.lineTo(150, 25);
        ctx.stroke();
    } if (turnsleft < 7) {
        //rope
        ctx.moveTo(150, 25);
        ctx.lineTo(150, 80);
        ctx.stroke();
    } if (turnsleft < 6) {
        //head
        ctx.beginPath();
        ctx.arc(150, 95, 15, 0, 2 * Math.PI);
        ctx.stroke();
    } if (turnsleft < 5) {
        //torso
        ctx.moveTo(150, 110);
        ctx.lineTo(150, 170);
        ctx.stroke();
    } if (turnsleft < 4) {
        //r arm
        ctx.moveTo(150, 130);
        ctx.lineTo(175, 155);
        ctx.stroke();
    } if (turnsleft < 3) {
        //l arm
        ctx.moveTo(150, 130);
        ctx.lineTo(125, 155);
        ctx.stroke();
    } if (turnsleft < 2) {
        //r leg
        ctx.moveTo(150, 170);
        ctx.lineTo(165, 205);
        ctx.stroke();
    } if (turnsleft < 1) {
        //l leg
        ctx.moveTo(150, 170);
        ctx.lineTo(135, 205);
        ctx.stroke();
    }
}

function endgame(win) {
    if (win == true) {
        confirm("You Win!\nThe word was: " + randword);
        startnew();
    }
    else {
        confirm("You Lose!\nThe word was: " + randword);
        startnew();
    }
}

function startnew() {
    document.getElementById("newgamemodal").hidden = false;
}




