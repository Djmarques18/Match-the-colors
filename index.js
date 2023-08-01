
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let clicks = 0;
let gameStarted = true;

cards.forEach((card) =>
  card.addEventListener('click', function () {
    if (!lockBoard && !this.classList.contains('flip') && gameStarted) {
      flipCard(this);
      updateScore();
      if (gameOver()) {
        lockBoard = true;
      }
    }
  })
);

function flipCard(card) {
  card.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
  } else {
    hasFlippedCard = false;
    secondCard = card;
    checkForMatch();
  }
}

function checkForMatch() {
  const color1 = firstCard.dataset.color;
  const color2 = secondCard.dataset.color;

  if (color1 === color2) {
    disableCards();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1000);
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

function updateScore() {
  clicks++;
  console.log('Score:', clicks);
}

function gameOver() {
  return Array.from(cards).every((card) => card.classList.contains('flip'));
}


const congratulationsPopup = document.getElementById('congratulations-popup');
const playAgainButton = document.getElementById('play-again-button');

playAgainButton.addEventListener('click', () => {
  location.href = 'index.html';
});

function showCongratulationsPopup() {
  congratulationsPopup.style.display = 'block';
}


function gameOver() {
  if (Array.from(cards).every((card) => card.classList.contains('flip'))) {
    lockBoard = true;
    showCongratulationsPopup();
  }
}