/*
 * Word Guessing Game - Template
 *
 */
'use strict';
//Define a container for the game, its variables and its methods.
var game = {
    state: 0,       // current position in the wordlist
    display: '',   // the current dash display
    wrong: '',     // the wrong letters guessed so far 
    answer: '',    // the correct answer for this round
    wrongCount: 0, // the number of wrong guesses so far
    wordList: [    // list of words to cycle through
        'JavaScript',
        'document',
        'element',
        'object',
        'property',
        'event',
        'propagation',
        'listener',
        'transition',
        'animation',
        'MiChAel'
    ]
};

game.check = function (letter) {
    /*
     * Checks all occurrences of the letter guessed against the answer. 
     * Returns true if the guess is correct and false otherwise. 
     * Updates the game dash display variable if applicable.
     */
    // You may use snippets of code from questions 11 and 12 in assignment 1 here.
    if (this.answer.toLowerCase().indexOf(letter.toLowerCase()) > -1) {
        // Search the string and counts the number of letters
        var pos = 0;
        var i = -1;
        var posArray = [];
        while (pos != -1) {
            pos = this.answer.toLowerCase().indexOf(letter.toLowerCase(), i + 1);
            i = pos;
            if (pos != -1) {
                posArray.push(pos);
            }
        }
        $.each(posArray, function( index, position ) {
            var myString = game.display.substring(0, position) + letter.toLowerCase() + game.display.substring(position + 1);
            game.display = myString;
        });
    }
    else {
        this.wrong += " " + letter;
        this.wrongCount++;
    }
}

game.restart = function () {
    // Initialize the game at the beginning or after restart
    // Enter your code here
    game.wrongCount = 0;
    game.wrong = '';
    game.display = '';
    game.answer = game.wordList[Math.floor(Math.random() * game.wordList.length)];
    game.dashes(game.answer.length);
    game.outcome();
    // The focus method invoked on an input allows the user to type in that inout without having to click it.
    $('#guess').focus();
};

game.dashes = function (number) {
    // you may use your function definition from question 4 in assignment 2 here.
    for (var i=0;i<number;i++) {
        this.display += '-';
    }
}

game.play = function () {
    // Invoked when the user clicks on GUESS
    var letter = $("#guess").val();
    if (letter) {
        game.check(letter);
        game.outcome();
    }
};

game.outcome = function () {
    // check if the game is won or lost
    if (this.wrongCount >= 10) {
        $("#wrong").html("No more guesses - the correct answer was : " + this.answer);
        $("#indicator").val(10);
    } else {
        if (this.display.indexOf("-") == -1) {
            $("#wrong").html("Congratulations! You win!");
        }
        else {
            $("#indicator").val(this.wrongCount);
            $("#wrong").html(this.wrong);
        }
    }
    $("#display").html(this.display);
    $("#guess").val('');
};

// Main program starts here
$(document).ready(function () {
    game.restart();
    $('#guessbutton').click(game.play);
    $('#restart').click(game.restart);
});

