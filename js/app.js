console.log("Working");

console.log(deck);

let playerHand = [];
let dealerHand = [];
let pscore = 0;
let dscore = 0;

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

function hit() {
  playerHand.push(deck.pop());
}

function calculateScore() {
  let pscore = 0;
  let dscore = 0;
  playerHand.forEach(function(card) {
    pscore += deck.values;
    return pscore;
  });
  dealerHand.forEach(function(card) {
    dscore += card.values;
    return dscore;
  });
}

function startGame() {
  initialHand();
  hit();
  calculateScore();
  console.log(playerHand);
  console.log(pscore);
}

startGame();
// let addCard = document.getElementById("dealer-hand");

// let hitButton = document.getElementById("hit");
// hitButton.addEventListener("click", function(e) {
//   hit();
//   return playerHand;
// });
// let stayTest = document.getElementById("stay");
// stayTest.addEventListener("click", function(e) {
//   console.log("clicked");
// });
