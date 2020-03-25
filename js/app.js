console.log("Working");

const dealer = "Dealer";
const player = "You";
const tie = "tie";
const bust = "bust";
let playerHand = [];
let dealerHand = [];
let iswinner = null;
let pScore = 0;
let dScore = 0;

// function startOfGame() {
//   startGame();
// }

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
  // render();
  // calculateScore(player);
  // checkForWinner();
  render();
}

//function if player is content with their hand
function stay() {
  // while (dScore < 18) {
  //   dealerHand.push(deck.pop());
  //   render();
  // }
  checkForWinner();
}

function render() {
  document.getElementById("dealer-hand").innerHTML = "";
  dealerHand.forEach(card => {
    let dealerCards = `<div class="card ${card.face}"></div>`;
    document.getElementById("dealer-hand").innerHTML += dealerCards;
  });
  document.getElementById("player-hand").innerHTML = "";
  playerHand.forEach(card => {
    let playerCards = `<div class="card ${card.face}"></div>`;
    document.getElementById("player-hand").innerHTML += playerCards;
  });
  calculateScore(dealerHand);
  calculateScore(playerHand);
}

// checks for winner
function checkForWinner() {
  dScore = calculateScore(dealerHand);
  pScore = calculateScore(playerHand);
  document.getElementById("player-score").innerHTML = "Score: " + pScore;
  document.getElementById("dealer-score").innerHTML = "Score: " + dScore;
  if (pScore > 21 && dScore <= 21) {
    iswinner = dealer;
  } else if (pScore <= 21 && dScore > 21) {
    iswinner = player;
  } else if (pScore === dScore) {
    iswinner = tie;
  } else if (pScore <= 21 && dScore <= 21 && pScore < dScore) {
    iswinner = dealer;
  } else if (pScore <= 21 && dScore <= 21 && pScore > dScore) {
    iswinner = player;
  }
  if (iswinner !== null) {
    if (iswinner == player) {
      document.getElementById("winner").innerHTML = "Congrats! You won.";
      iswinner = null;
    } else if (iswinner == dealer) {
      document.getElementById("winner").innerHTML = "Sorry, you lost :(";
      iswinner = null;
    } else if (iswinner == bust) {
      document.getElementById("winner").innerHTML = "You both busted";
      iswinner = null;
    } else {
      document.getElementById("winner").innerHTML = "It's a tie!";
      iswinner = null;
    }
  }
  //hide();
  showResetBtn();
}

//clea
function clearText() {
  document.getElementById("winner").innerHTML = "";
}

//styles the button to be hidden when there is a winner
function hide() {
  document.getElementById("hit").style.visibility = "hidden";
  document.getElementById("stay").style.visibility = "hidden";
}

function showBtns() {
  document.getElementById("hit").style.visibility = "visible";
  document.getElementById("stay").style.visibility = "visible";
}

//styles reset button to be hidden when the game is on.
function hideResetBtn() {
  document.getElementById("reset").style.visibility = "hidden";
}

//styles reset button to show when winner is found.
function showResetBtn() {
  document.getElementById("reset").style.visibility = "visible";
}

function startGame() {
  iswinner = null;
  playerHand = [];
  dealerHand = [];

  showBtns();
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
  clearText();
  startGame();
});
