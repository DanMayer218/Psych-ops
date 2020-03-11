// Word list to be referenced
var answerarray = [
  "mystic",
  "foresee",
  "clairvoyant",
  "psychic",
  "tarot",
  "ouiji",
  "palm",
  "scam",
  "crystal",
  "astrology",
  "enigma",
  "vision",
  "fortune"
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
var numGuesses = 9;

// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// =========================================================================================

// startGame()
// Its how we we will start and restart the game.
// (Note: It's not being run here. It's just being made for future use.)
function startGame() {
  // Reset the guesses back to 0.
  numGuesses = 9;

  // Solution is chosen randomly from wordList.
  selectedAnswer = answerarray[Math.floor(Math.random() * answerarray.length)];
  // The word is broken into individual letters.
  answerLetterArray = selectedAnswer.split("");
  // We count the number of letters in the word.
  dashCount = answerLetterArray.length;

  // We print the solution in console (for testing).
  console.log(selectedAnswer);

  // CRITICAL LINE - Here we *reset* the guess and success array at each round.
  dashesAndLetters = [];
  // CRITICAL LINE - Here we *reset* the wrong guesses from the previous round.
  wrongLetters = [];

  // Fill up the dashesAndLetters list with appropriate number of blanks.
  // This is based on number of letters in solution.
  for (var i = 0; i < dashCount; i++) {
    dashesAndLetters.push("_");
  }

  // Print the initial blanks in console.
  console.log(dashesAndLetters);

  // Reprints the guessesLeft to 9
  document.getElementById("guesses-left").innerHTML = numGuesses;

  // Prints the blanks at the beginning of each round in the HTML
  document.getElementById("word-blanks").innerHTML = dashesAndLetters.join(" ");

  // Clears the wrong guesses from the previous round
  document.getElementById("wrong-guesses").innerHTML = wrongLetters.join(" ");
}

// checkLetters() function
// It's where we will do all of the comparisons for matches.
// Again, it's not being called here. It's just being made for future use.
function checkLetters(letter) {
  // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
  var letterInWord = false;

  // Check if a letter exists inside the array at all.
  for (var i = 0; i < dashCount; i++) {
    if (selectedAnswer[i] === letter) {
      // If the letter exists then toggle this boolean to true. This will be used in the next step.
      letterInWord = true;
    }
  }

  // If the letter exists somewhere in the word, then figure out exactly where (which indices).
  if (letterInWord) {
    // Loop through the word.
    for (var j = 0; j < dashCount; j++) {
      // Populate the dashesAndLetters with every instance of the letter.
      if (selectedAnswer[j] === letter) {
        // Here we set the specific space in blanks and letter equal to the letter when there is a match.
        dashesAndLetters[j] = letter;
      }
    }
    // Logging for testing.
    console.log(dashesAndLetters);
  }
  // If the letter doesn't exist at all...
  else {
    // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
    wrongLetters.push(letter);
    numGuesses--;
  }
}

// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made
function roundComplete() {
  // First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
  console.log(
    "WinCount: " +
      victories +
      " | LossCount: " +
      defeats +
      " | NumGuesses: " +
      numGuesses
  );

  // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
  document.getElementById("guesses-left").innerHTML = numGuesses;
  // This will print the array of guesses and blanks onto the page.
  document.getElementById("word-blanks").innerHTML = dashesAndLetters.join(" ");
  // This will print the wrong guesses onto the page.
  document.getElementById("wrong-guesses").innerHTML = wrongLetters.join(" ");

  // If we have gotten all the letters to match the solution...
  if (answerLetterArray.toString() === dashesAndLetters.toString()) {
    // ..add to the win counter & give the user an alert.
    victories++;
    alert("You win!");

    // Update the win counter in the HTML & restart the game.
    document.getElementById("win-counter").innerHTML = victories;
    startGame();
  }

  // If we've run out of guesses..
  else if (numGuesses === 0) {
    // Add to the loss counter.
    defeats++;
    // Give the user an alert.
    alert("You lose");

    // Update the loss counter in the HTML.
    document.getElementById("loss-counter").innerHTML = defeats;
    // Restart the game.
    startGame();
  }
}

// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================

// Starts the Game by running the startGame() function
startGame();

// Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {
  // Check if the key pressed is a letter.
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // Converts all key clicks to lowercase letters.
    var letterGuessed = event.key.toLowerCase();
    // Runs the code to check for correctness.
    checkLetters(letterGuessed);
    // Runs the code after each round is done.
    roundComplete();
  }
};
