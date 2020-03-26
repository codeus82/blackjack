console.log("Working");

const dealer = "Dealer";
const player = "You";
const tie = "tie";
let playerHand = [];
let dealerHand = [];
let iswinner = null;
let pScore = 0;
let dScore = 0;

const dealerScoreID = document.getElementById("dealer-score");
const playerScoreID = document.getElementById("player-score");
const dealerHandID = document.getElementById("dealer-hand");
const playerHandID = document.getElementById("player-hand");
const winnerID = document.getElementById("winner");
const hitID = document.getElementById("hit");
const stayID = document.getElementById("stay");
const resetID = document.getElementById("reset");

//Fisher-Yate's algorithm
function shuffle(deck) {
  let i = 0,
    j = 0,
    temp = null;
  for (i = deck.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

//gives 2 cards to the dealer and player at the start
function initialHand() {
  shuffle(deck);
  for (let i = 0; i < 2; i++) {
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
  }
  return playerHand, dealerHand;
}

//calculates the score
function calculateScore(hand) {
  let score = 0;
  let aces = 0;
  hand.forEach(function(card) {
    score += card.value;
    if (card.value === 11) {
      aces++;
    }
  });
  while (score > 21 && aces) {
    score -= 10;
    aces--;
  }
  return score;
}

//adds a card to the player's hand
function hit() {
  playerHand.push(deck.pop());
  pScore = calculateScore(playerHand);
  if (pScore > 21) {
    iswinner = dealer;
    checkForWinner();
  }
  render();
  playerScoreID.innerHTML = "Score: " + pScore;
}

//function if player is content with their hand
function stay() {
  dScore = calculateScore(dealerHand);
  pScore = calculateScore(playerHand);

  while (dScore < 17 && !iswinner) {
    dealerHand.push(deck.pop());
    dScore = calculateScore(dealerHand);
  }
  if (dScore > 21) {
    iswinner = player;
  } else if (dScore > pScore) {
    iswinner = dealer;
  } else if (dScore < pScore) {
    iswinner = player;
  } else if (dScore === pScore) {
    iswinner = tie;
  }
  render();
  checkForWinner();
}

//renders cards
function render() {
  dealerHandID.innerHTML = "";
  dealerHand.forEach((card, idx) => {
    let dealerCards = `<div class="card ${
      idx === 1 && !iswinner ? "back" : card.face
    }"></div>`;
    dealerHandID.innerHTML += dealerCards;
  });
  playerHandID.innerHTML = "";
  playerHand.forEach(card => {
    let playerCards = `<div class="card ${card.face}"></div>`;
    playerHandID.innerHTML += playerCards;
  });
}

// checks for winner
function checkForWinner() {
  if (iswinner !== null) {
    if (iswinner == player) {
      winnerID.innerHTML = "Congrats! You won.";
    } else if (iswinner == dealer) {
      winnerID.innerHTML = "Sorry, you lost :(";
    } else if (iswinner == tie) {
      winnerID.innerHTML = "It's a tie!";
    }
    playerScoreID.innerHTML = "Score: " + pScore;
    dealerScoreID.innerHTML = "Score: " + dScore;
    hide();
    showResetBtn();
  }
}

//styles the button to be hidden when there is a winner
function hide() {
  hitID.style.visibility = "hidden";
  stayID.style.visibility = "hidden";
}

//styles reset button to be hidden when the game is on.
function hideResetBtn() {
  resetID.style.visibility = "hidden";
}

//styles reset button to show when winner is found.
function showResetBtn() {
  resetID.style.visibility = "visible";
}

//shows hit and stay buttons once player hits reset
function showBtns() {
  hitID.style.visibility = "visible";
  stayID.style.visibility = "visible";
}

//clears the scores of the previous game if player hit reset button
function clearScores() {
  dealerScoreID.innerHTML = "Score:";
  playerScoreID.innerHTML = "Score:";
}

function startGame() {
  hideResetBtn();
  initialHand();
  render();
  calculateScore(dealerHand);
  calculateScore(playerHand);
  //checkForWinner();
}

startGame();

//event listeners

let hitButton = document.getElementById("hit");
hitButton.addEventListener("click", function(e) {
  hit();
});

let stayButton = document.getElementById("stay");
stayButton.addEventListener("click", function(e) {
  stay();
});

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function(e) {
  winnerID.innerHTML = " ";
  clearScores();
  playerHand = [];
  dealerHand = [];
  iswinner = null;
  startGame();
  showBtns();
});
