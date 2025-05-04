const typingText = document.querySelector(".typing-text p");
const inputField = document.createElement("input");
const timerDisplay = document.querySelector(".time span b");
const mistakeDisplay = document.querySelector(".mistake span");
const wpmDisplay = document.querySelector(".wpm span");
const cpmDisplay = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

let timer,
    maxTime = 30,
    timeLeft = maxTime,
    charIndex = 0,
    mistakes = 0,
    isTyping = false;


inputField.type = "text";
inputField.style.opacity = 0;
inputField.style.position = "absolute";
inputField.style.pointerEvents = "none";
document.body.appendChild(inputField);
inputField.focus();


function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";

  paragraphs[randomIndex].split("").forEach(char => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });

  typingText.querySelectorAll("span")[0].classList.add("active");
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.charAt(charIndex);

  if (!isTyping) {
    timer = setInterval(startTimer, 1000);
    isTyping = true;
  }

  if (charIndex < characters.length) {
    if (typedChar === characters[charIndex].innerText) {
      characters[charIndex].classList.add("correct");
    } else {
      characters[charIndex].classList.add("incorrect");
      mistakes++;
      mistakeDisplay.innerText = mistakes;
    }

    characters[charIndex].classList.remove("active");
    charIndex++;

    if (charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    }

   
    let wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
    let cpm = charIndex - mistakes;

    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    cpm = cpm < 0 ? 0 : cpm;

    wpmDisplay.innerText = wpm;
    cpmDisplay.innerText = cpm;
  } else {
    clearInterval(timer);
  }
}

function startTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
  } else {
    clearInterval(timer);
    inputField.blur(); 
  }
}

function resetTest() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inputField.value = "";
  timerDisplay.innerText = timeLeft;
  mistakeDisplay.innerText = mistakes;
  wpmDisplay.innerText = 0;
  cpmDisplay.innerText = 0;
}


inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetTest);
window.addEventListener("load", loadParagraph);