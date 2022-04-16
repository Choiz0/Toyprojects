const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDiplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");
const url = "https://random-word-api.herokuapp.com/word?number=200";
init();

function init() {
  buttonChange("loading...");
  getWords();

  wordInput.addEventListener("input", checkMatch);
}
button.addEventListener("click", run);
// compare two words
function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    score.innerText = score;
    scoreDiplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex];
  }
}
// when starting game
function run() {
  if (isPlaying) {
    return;
  }
  scoreDiplay.innerText = 0;
  score = 0;
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();

  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange("Playing...");
}
// time count down to zero
function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerHTML = time;
}

// Get words from url limited length of word
function getWords() {
  axios
    .get(url)
    .then(function (response) {
      // handle success
      response.data.forEach((word) => {
        if (word.length < 5) {
          words.push(word);
        }
      });
      buttonChange("Game Start");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
// checking gaming time
function checkStatus() {
  if (isPlaying && time === 0) {
    buttonChange("Game Start");
    clearInterval(checkInterval);
  }
}

function buttonChange(text) {
  button.innerText = text;
  text === "Game Start"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}
