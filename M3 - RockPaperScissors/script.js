let you;
let yourScore = 0;
let opponent;
let opponentScore = 0;

let choices = ["rock", "paper", "scissors"];

window.onload = function () {
  // Containers for the game images
  document.getElementById("your-score").textContent =
    "Your Score: " + yourScore;
  document.getElementById("opponent-score").textContent =
    "Opponent's Score: " + opponentScore;
  // Choice buttons
  for (let i = 0; i < 3; i++) {
    let choice = document.createElement("img");
    choice.id = choices[i];
    choice.src = choices[i] + ".png";
    choice.addEventListener("click", selectChoice);
    document.getElementById("choices").append(choice);
  }
};

function selectChoice() {
  you = this.id;

  // Create or update your choice image
  let yourChoiceContainer = document.getElementById("your-choice");
  // Clear previous content
  yourChoiceContainer.innerHTML = "";
  let yourImg = document.createElement("img");
  yourImg.src = you + ".png";
  yourChoiceContainer.appendChild(yourImg);

  // Create or update opponent choice image
  opponent = choices[Math.floor(Math.random() * 3)];
  let opponentChoiceContainer = document.getElementById("opponent-choice");
  // Clear previous content
  opponentChoiceContainer.innerHTML = "";
  let opponentImg = document.createElement("img");
  opponentImg.src = opponent + ".png";
  opponentChoiceContainer.appendChild(opponentImg);

  determineWinner();
}

function determineWinner() {
  const statusElement = document.getElementById("game-status");

  // Remove any existing status classes
  statusElement.classList.remove("win", "lose", "tie");

  if (you === opponent) {
    statusElement.textContent = "It's a Tie! 🤝";
    statusElement.classList.add("tie");
    return "tie";
  }

  if (
    (you === "rock" && opponent === "scissors") ||
    (you === "paper" && opponent === "rock") ||
    (you === "scissors" && opponent === "paper")
  ) {
    statusElement.textContent = "You Win! 🎉";
    statusElement.classList.add("win");
    yourScore++;
    document.getElementById("your-score").textContent =
      "Your Score: " + yourScore;
    return "win";
  } else {
    statusElement.textContent = "You Lost! 😔";
    statusElement.classList.add("lose");
    opponentScore++;
    document.getElementById("opponent-score").textContent =
      "Opponent's Score: " + opponentScore;
    return "lose";
  }
}
