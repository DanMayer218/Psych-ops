// Word list to be referenced
var answerarray = [
  "MYSTIC",
  "FORESEE",
  "CLAIRVOYANT",
  "PSYCHIC",
  "TAROT",
  "OUIJI",
  "PALM",
  "SCAM",
  "CRYSTAL",
  "ASTROLOGY",
  "ENIGMA",
  "VISION",
  "FORTUNE",
  "MAGIC",
  "MEDIUM"
];
// The selected word from the words array
var selectedAnswer = "";
// Selected words letters are stored individually in this array
var answerLetterArray = [];
// the number of dashes displayed based on the number of letters
var dashCount = 0;
// dashes and solved letters stored in an array
var dashesAndLetters = [];
// keeps track of the users wrong letters
var wrongLetters = [];

// Game counters
var victories = 0;
var defeats = 0;
var remaining = 9;

// prepares the game for gameplay, doesn't initiate it.
function gameStart() {
  // resets remaining to 9
  remaining = 9;

  // Selects the word from the answerarray randomly
  selectedAnswer = answerarray[Math.floor(Math.random() * answerarray.length)];
  //breaks the answer down into individual letters and stores them in the array
  answerLetterArray = selectedAnswer.split("");
  //counts the length of the array to get the number of letters to create dashes with
  dashCount = answerLetterArray.length;

  // Console logs the selected word for testing purpose
  // console.log(selectedAnswer);

  // emptys the dashes and letters array for the next round
  dashesAndLetters = [];
  // emptys the wrong letters array for the next round
  wrongLetters = [];

  // for loop to cycle through the dash count and holds them in dashes and letters array
  for (var i = 0; i < dashCount; i++) {
    dashesAndLetters.push("_");
  }

  // console log the dashes and letters for testing
  // console.log(dashesAndLetters);

  //sets the remaining guesses back to 9
  document.getElementById("guesses-left").innerHTML = remaining;

  // displays the blanks to the inner html for the next round
  document.getElementById("word-blanks").innerHTML = dashesAndLetters.join(" ");

  // clears the previous user selected letters
  document.getElementById("wrong-guesses").innerHTML = wrongLetters.join(" ");
}

function verifyLetters(letter) {
  // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
  var userLetter = false;

  // for loop to cycle through and see if the users letter exists in the selected answer array
  for (var i = 0; i < dashCount; i++) {
    if (selectedAnswer[i] === letter) {
      // if the letter exists in the selected answer then the user letter will be set to true.
      userLetter = true;
    }
  }

  // if letter exists in the answer this will indicate which indices the letter falls in
  if (userLetter) {
    for (var j = 0; j < dashCount; j++) {
      // everywhere in the dashcount that the userletter is a match it will update the dashes and letters array.
      if (selectedAnswer[j] === letter) {
        dashesAndLetters[j] = letter;
      }
    }
    // console log the dashes and letters for testing
    console.log(dashesAndLetters);
  }
  // else if the letter is not found in the answer the letter is displayed in the wrong letters and the remaining count is decreased.
  else {
    wrongLetters.push(letter);
    remaining--;
  }
}

// Function to execute after each guess
function nextGuess() {
  // updates the remaining guess count
  document.getElementById("guesses-left").innerHTML = remaining;
  //updates the dashes and letters displayed
  document.getElementById("word-blanks").innerHTML = dashesAndLetters.join(" ");
  // updates the wrong letters displayed
  document.getElementById("wrong-guesses").innerHTML = wrongLetters.join(" ");

  // If answer is solved by all of the letters matching....
  if (answerLetterArray.toString() === dashesAndLetters.toString()) {
    // increase victory counter and alert user of victory
    victories++;
    alert("VICTORY IS IN YOUR FUTURE");

    // display new victory count and reset with the gameStart function
    document.getElementById("win-counter").innerHTML = victories;
    gameStart();
  }

  // If remaining runs out and all letters arent matching add to the defeat counter and alert user
  else if (remaining === 0) {
    // Add to the loss counter.
    defeats++;
    // Give the user an alert.
    alert("YOUR STARS AND GUESSES DID NOT ALIGN");

    // display new defeat count and reset with the gameStart function
    document.getElementById("loss-counter").innerHTML = defeats;
    // Restart the game.
    gameStart();
  }
}

// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================

// has the game prepared for start after loading
gameStart();

// game actually starts on users first key click
document.onkeyup = function(event) {
  // verifies that the key pressed is a letter and not a number
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // ALL letters TO UPPERCASE LETTERS.
    var letterGuessed = event.key.toUpperCase();
    // checks the seledtion
    verifyLetters(letterGuessed);
    // next guess code
    nextGuess();
  }
};
