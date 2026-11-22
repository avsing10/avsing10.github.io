// Took some assistance from ChatGPT to help with this assignment. I did not copy and paste any code, but I did ask for help with some of the logic and structure of the code.

let playerName = "";
let rollCount = 0;
let score = 0;

const nameInput = document.getElementById("playerName");
const welcome = document.getElementById("welcomeMessage");
const dice = document.getElementById("dice");
const result = document.getElementById("rollResult");
const story = document.getElementById("story");

const originalStory = story.innerHTML;

const names = [
  "Shadow Knight",
  "Mystic Warrior",
  "Dragon Rider",
  "Storm Hunter",
  "Moon Guardian",
  "Crystal Wizard",
  "Golden Phoenix",
  "Dark Explorer"
];

// EVENT 1: Generate a random name
document.getElementById("generateBtn")
  .addEventListener("click", function() {

    const randomIndex =
      Math.floor(Math.random() * names.length);

    nameInput.value = names[randomIndex];
  });

// EVENT 2: Save the character
document.getElementById("saveBtn")
  .addEventListener("click", function() {

    const chosenName = nameInput.value.trim();

    if (chosenName === "") {
      welcome.textContent = "Please enter a name first!";
      return;
    }

    playerName = chosenName;

    welcome.textContent =
      "Welcome, " + playerName + "! Your adventure begins!";

    story.innerHTML =
      "<p>Welcome to the Kingdom of Destiny, <strong>" +
      escapeHTML(playerName) +
      "</strong>!</p>" +
      "<p>A mysterious guardian appears before you.</p>" +
      "<p>Roll the magical die to discover your fate!</p>";
  });

// Make player-entered text safe to display in HTML
function escapeHTML(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}

// EVENT 3: Roll the dice
document.getElementById("rollBtn")
  .addEventListener("click", rollDice);

function rollDice() {

  if (playerName === "") {
    result.textContent = "Create your character first!";
    return;
  }

  const roll = Math.floor(Math.random() * 20) + 1;

  rollCount++;
  dice.textContent = roll;

  let message = "";
  let points = 0;

  if (roll === 20) {
    message = "LEGENDARY! You defeated the dragon!";
    points = 100;
    dice.style.background = "#d4a017";

  } else if (roll >= 15) {
    message = "Amazing! You discovered a hidden treasure!";
    points = 50;
    dice.style.background = "#23856b";

  } else if (roll >= 10) {
    message = "Success! You crossed the enchanted forest!";
    points = 25;
    dice.style.background = "#3867b7";

  } else if (roll >= 5) {
    message = "A challenge appears! You barely escape!";
    points = 10;
    dice.style.background = "#b57528";

  } else {
    message = "Oh no! You got lost in the dark castle!";
    points = 0;
    dice.style.background = "#9b354d";
  }

  score += points;

  result.textContent = "You rolled a " + roll + "!";

  document.getElementById("rollCount")
    .textContent = rollCount;

  document.getElementById("score")
    .textContent = score;

  story.innerHTML =
    "<h3>Adventure Result</h3>" +
    "<p><strong>" + escapeHTML(playerName) +
    "</strong> rolled a " + roll + ".</p>" +
    "<p>" + message + "</p>" +
    "<p>You earned " + points + " points!</p>" +
    "<p>Roll again to continue your journey!</p>";
}

// EVENT 4: Change website theme
document.getElementById("themeBtn")
  .addEventListener("click", function() {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      this.textContent = "Dark Theme 🌙";
    } else {
      this.textContent = "Light Theme ☀️";
    }
  });

// EVENT 5: Reset the adventure
document.getElementById("resetBtn")
  .addEventListener("click", function() {

    playerName = "";
    rollCount = 0;
    score = 0;

    nameInput.value = "";
    dice.textContent = "?";
    dice.style.background = "#44316e";

    welcome.textContent = "Your adventure awaits...";
    result.textContent = "Ready to roll?";

    document.getElementById("rollCount")
      .textContent = "0";

    document.getElementById("score")
      .textContent = "0";

    story.innerHTML = originalStory;
  });

// BONUS EVENT: Click the die itself to roll
dice.addEventListener("click", rollDice);

// BONUS EVENT: Press Enter or Space on the die
dice.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    rollDice();
  }
});

