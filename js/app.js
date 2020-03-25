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
function calculateScore() {
  let pScore = 0;
  let dScore = 0;
  playerHand.forEach(function(card) {
    pScore += card.value;
    document.getElementById("player-score").innerHTML = "Score: " + pScore;
    return pScore;
  });
  dealerHand.forEach(function(card) {
    dScore += card.value;
    document.getElementById("dealer-score").innerHTML = dScore;
    return dScore;
  });
  // if (pScore > 21 && dScore <= 21) {
  //   iswinner = dealer;
  // } else if (pScore <= 21 && dScore > 21) {
  //   iswinner = player;
  // } else if (pScore === dScore) {
  //   iswinner = tie;
  // } else if (pScore <= 21 && dScore <= 21 && pScore < dScore) {
  //   iswinner = dealer;
  // } else if (pScore <= 21 && dScore <= 21 && pScore > dScore) {
  //   iswinner = player;
  // }
}

//adds a card to the player's hand
function hit() {
  playerHand.push(deck.pop());
  pScore = calculateScore(playerHand);
  if (pScore > 21) {
    iswinner = dealer;
  }
  render();
}

//function if player is content with their hand
function stay() {
  dScore = calculateScore(dealerHand);
  console.log(dScore);
  pScore = calculateScore(playerHand);
  console.log(pScore);
  while (dScore < 17 && !iswinner) {
    dealerHand.push(deck.pop());
  }
  if (dScore > 21) {
    iswinner = player;
  } else if (dScore > pScore) {
    iswinner = dealer;
  } else if (dScore < pScore) {
    iswinner = player;
  } else if (dScore === pScore) {
    iswinner = tie;
  } else if (dScore > 21 && pScore > 21) {
    iswinner = bust;
  }
  console.log(iswinner);
  render();
  checkForWinner();
}

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
    } else if (iswinner == bust) {
      document.getElementById("winner").innerHTML = "You both busted";
    } else if (winner == tie) {
      document.getElementById("winner").innerHTML = "It's a tie!";
    }
  }
  hide();
  showResetBtn();
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

function showBtns() {
  document.getElementById("hit").style.visibility = "visible";
  document.getElementById("stay").style.visibility = "visible";
}

function startGame() {
  hideResetBtn();
  initialHand();
  render();
  calculateScore();
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
  playerHand = [];
  dealerHand = [];
  iswinner = null;
  startGame();
  showBtns();
});
