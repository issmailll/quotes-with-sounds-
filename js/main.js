const quoteText = document.querySelector("#quote");
const newQuoteBtn = document.querySelector("#new-quote-btn");
const pastQuoteBtn = document.querySelector("#past-quote-btn");
const loader = document.querySelector("#loader");
const copyBtn = document.querySelector("#copy-btn");

let currentQuote = "";
let previousQuote = "";

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function getRandomQuote() {
  showLoader();
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      previousQuote = currentQuote;
      currentQuote = data.content;
      quoteText.textContent = currentQuote;
      hideLoader();
    })
    .catch((error) => {
      console.log("Error:", error);
      hideLoader();
    });
}

function displayPastQuote() {
  showLoader();
  setTimeout(() => {
    quoteText.textContent = previousQuote;
    hideLoader();
  }, 1000);
}

getRandomQuote();

newQuoteBtn.addEventListener("click", () => {
  getRandomQuote();
});

pastQuoteBtn.addEventListener("click", () => {
  displayPastQuote();
});

const messageDisplay = document.querySelector("#message");

copyBtn.addEventListener("click", () => {
  const quoteText = document.querySelector("#quote").textContent;
  const tempInput = document.createElement("input");
  tempInput.setAttribute("value", quoteText);
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  messageDisplay.textContent = "Copied to clipboard!";
  setTimeout(() => {
    messageDisplay.textContent = ""
  }, 1500);

});

const quoteDisplay = document.querySelector('#quote');
const speakBtn = document.querySelector('#speak-btn');

function speakQuote() {
  const quoteText = quoteDisplay.textContent;
  const speech = new SpeechSynthesisUtterance(quoteText);
  speech.lang = 'en-US';
  speech.rate = 0.8;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

speakBtn.addEventListener('click', speakQuote);

