function getKey (e) {
    var location = e.location;
    var selector;
    if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
        selector = ['[data-key="' + e.keyCode + '-R"]']
    } else {
        var code = e.keyCode || e.which;
        selector = [
            '[data-key="' + code + '"]',
            '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
        ].join(',');
    }
    return document.querySelector(selector);
}

function pressKey (char) {
    var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
    if (!key) {
        return console.warn('No key for', char);
    }
    key.setAttribute('data-pressed', 'on');
    setTimeout(function () {
        key.removeAttribute('data-pressed');
    }, 200);
}

var h1 = document.querySelector('h1');
var originalQueue = h1.innerHTML;
var queue = h1.innerHTML;

function next () {
    var c = queue[0];
    queue = queue.slice(1);
    h1.innerHTML = originalQueue.slice(0, originalQueue.length - queue.length);
    pressKey(c);
    if (queue.length) {
        setTimeout(next, Math.random() * 200 + 50);
    }
}

var h2 = document.querySelector('h2');
var originalQueue2 = h2.innerHTML;
var queue2 = h2.innerHTML;

function next2 () {
    var c2 = queue2[0];
    queue2 = queue2.slice(1);
    h2.innerHTML = originalQueue2.slice(0, originalQueue2.length - queue2.length);
    pressKey(c2);
    if (queue2.length) {
        setTimeout(next2, Math.random() * 200 + 50);
    }
}

h1.innerHTML = "&nbsp;";
setTimeout(next, 500);

h2.innerHTML = "&nbsp;";
setTimeout(next2, 4000);

document.body.addEventListener('keydown', function (e) {
    var key = getKey(e);
    if (!key) {
        return console.warn('No key for', e.keyCode);
    }

    key.setAttribute('data-pressed', 'on');
});

document.body.addEventListener('keyup', function (e) {
    var key = getKey(e);
    key && key.removeAttribute('data-pressed');
});

function size () {
    var size = keyboard.parentNode.clientWidth / 90;
    keyboard.style.fontSize = size + 'px';
    console.log(size);
}

var keyboard = document.querySelector('.keyboard');
window.addEventListener('resize', function (e) {
    size();
});
size();

const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");

const words = [
  "came",
  "come",
  "letter",
  "end",
  "I",
  "all",
  "number",
  "oil",
  "within",
  "now",
  "right",
  "feet",
  "leave",
  "what",
  "now",
  "fall",
  "came",
  "live",
  "year",
  "about",
  "got",
  "came",
  "set",
  "were",
  "follow",
  "study",
  "day",
  "eye",
  "over",
  "why",
  "why",
  "talk",
  "soon",
  "because",
  "eye",
  "watch",
  "year",
  "her",
  "any",
  "by",
  "I",
  "both",
  "around",
  "book",
  "line",
  "mother",
  "open",
  "now",
  "that",
  "mile",
  "go",
  "by",
  "found",
  "said",
  "eye",
  "come",
  "so",
  "place",
  "food",
  "got",
  "city",
  "always",
  "these",
  "any",
  "use",
  "been",
  "was",
  "read",
  "their",
  "without",
  "as",
  "change",
  "leave",
  "can",
  "they",
  "those",
  "eat",
  "never",
  "no",
  "eat",
  "story",
  "idk"
];


let randomWord;
let score = 0;
let time = 60;
const timeInterval = 0
const start = document.getElementById('start')

text.focus();

start.addEventListener('click',()=>{
    start.style.display='none';
    addWordToDOM();
    timeInterval = setInterval(updateTime, 1000);
})

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

function updateTime() {
  time--;
  timeElement.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

function gameOver() {
  endGameElement.innerHTML = 
  `<h1>Time ran out</h1>
  <p>Your final score is : ${score}</p>
  <button onclick="location.reload()" style="
  background: #4e5e73; color: #fff;">Reload</button>`;

  endGameElement.style.display = "flex";
  endGameElement.style.marginLeft = "500px";
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = "";
  }
});

