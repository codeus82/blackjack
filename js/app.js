console.log("Working");

console.log(deck);

let playerHand = [];
let dealerHand = [];

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

function initialHand() {
  shuffle(deck);
  for (let i = 0; i < 2; i++) {
    playerHand.push(deck.shift());
    dealerHand.push(deck.shift());
  }
  return playerHand;
}

console.log(playerHand);

let firstCard = deck.pop();

let addCard = document.getElementById("dealer-hand");

let hitTest = document.getElementById("hit");
hitTest.addEventListener("click", function() {
  console.log("click");
});

let stayTest = document.getElementById("stay");
stayTest.addEventListener("click", function(e) {
  console.log("clicked");
});
