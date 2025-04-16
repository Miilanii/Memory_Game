const letters = ['A','B','C','D','E','F','G','H'];
const cards = [...letters, ...letters]; // Two of each letter
const board = document.getElementById('game-board');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(cards);

// Create card elements
cards.forEach(letter => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.letter = letter;
  card.textContent = '';
  board.appendChild(card);

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flip')) return;

    card.textContent = card.dataset.letter;
    card.classList.add('flip');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;

      if (firstCard.dataset.letter === secondCard.dataset.letter) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetTurn();
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          firstCard.textContent = '';
          secondCard.textContent = '';
          resetTurn();
        }, 1000);
      }
    }
  });
});

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;

  // Check win condition
  if (document.querySelectorAll('.matched').length === cards.length) {
    setTimeout(() => {
      alert("🎉 Congratulations! You've matched all pairs!");
      location.reload();
    }, 500);
  }
}
