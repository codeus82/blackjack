console.log("Working");

const dealer = "Dealer";
const player = "You";
const tie = "tie";
let playerHand = [];
let dealerHand = [];
let iswinner = null;
let pScore = 0;
let dScore = 0;

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
  document.getElementById("player-score").innerHTML = "Score: " + pScore;
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
  document.getElementById("dealer-hand").innerHTML = "";
  dealerHand.forEach((card, idx) => {
    let dealerCards = `<div class="card ${
      idx === 1 && !iswinner ? "back" : card.face
    }"></div>`;
    document.getElementById("dealer-hand").innerHTML += dealerCards;
  });
  document.getElementById("player-hand").innerHTML = "";
  playerHand.forEach(card => {
    let playerCards = `<div class="card ${card.face}"></div>`;
    document.getElementById("player-hand").innerHTML += playerCards;
  });
}

// checks for winner
function checkForWinner() {
  if (iswinner !== null) {
    if (iswinner == player) {
      document.getElementById("winner").innerHTML = "Congrats! You won.";
    } else if (iswinner == dealer) {
      document.getElementById("winner").innerHTML = "Sorry, you lost :(";
    } else if (iswinner == tie) {
      document.getElementById("winner").innerHTML = "It's a tie!";
    }
    document.getElementById("player-score").innerHTML = "Score: " + pScore;
    document.getElementById("dealer-score").innerHTML = "Score: " + dScore;
    hide();
    showResetBtn();
  }
}
//styles the button to be hidden when there is a winner
function hide() {
  document.getElementById("hit").style.visibility = "hidden";
  document.getElementById("stay").style.visibility = "hidden";
}

//styles reset button to be hidden when the game is on.
function hideResetBtn() {
  document.getElementById("reset").style.visibility = "hidden";
}

//styles reset button to show when winner is found.
function showResetBtn() {
  document.getElementById("reset").style.visibility = "visible";
}

//shows hit and stay buttons once player hits reset
function showBtns() {
  document.getElementById("hit").style.visibility = "visible";
  document.getElementById("stay").style.visibility = "visible";
}

//clears the scores of the previous game if player hit reset button
function clearScores() {
  document.getElementById("dealer-score").innerHTML = "Score:";
  document.getElementById("player-score").innerHTML = "Score:";
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
  document.getElementById("winner").innerHTML = " ";
  clearScores();
  playerHand = [];
  dealerHand = [];
  iswinner = null;
  startGame();
  showBtns();
});
