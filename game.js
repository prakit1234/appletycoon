// Initial game variables
let appleCount = 0;
let money = 0;
let applesPerClick = 1;
let profitPerApple = 1;
let storageCapacity = 50;
let tradeHistory = [];
let cryptoAmount = 0; // Amount of cryptocurrency
let achievements = {
    firstApple: false,
    firstSell: false,
    richInvestor: false,
    trader: false,
};

// Fruit prices
const fruitPrices = {
    orange: 2,
    mango: 3,
};

// DOM elements
const appleCountElement = document.getElementById('apple-count');
const moneyCountElement = document.getElementById('money-count');
const storageCapacityElement = document.getElementById('storage-capacity');
const cryptoAmountElement = document.getElementById('crypto-amount');
const achievementsList = document.getElementById('achievements-list');
const tradeResult = document.getElementById('trade-result');

// Update display functions
function updateDisplay() {
    appleCountElement.textContent = appleCount;
    moneyCountElement.textContent = money.toFixed(2);
    storageCapacityElement.textContent = storageCapacity;
    cryptoAmountElement.textContent = cryptoAmount;
}

// Collect apples
document.getElementById('collect-button').addEventListener('click', () => {
    if (appleCount < storageCapacity) {
        appleCount += applesPerClick;
        showFloatingApple();
        updateDisplay();
        checkAchievements();
        saveGame();
    } else {
        alert('Storage full! Upgrade your capacity.');
    }
});

// Sell apples
document.getElementById('sell-button').addEventListener('click', () => {
    if (appleCount > 0) {
        const earnings = appleCount * profitPerApple;
        money += earnings;
        appleCount = 0;
        updateDisplay();
        checkAchievements();
        saveGame();
    } else {
        alert('No apples to sell.');
    }
});

// Upgrade collection rate
document.getElementById('upgrade-click').addEventListener('click', () => {
    if (money >= 50) {
        applesPerClick++;
        money -= 50;
        updateDisplay();
        alert('Upgraded apple collection rate!');
        saveGame();
    } else {
        alert('Not enough money for this upgrade.');
    }
});

// Increase profit per apple
document.getElementById('upgrade-profit').addEventListener('click', () => {
    if (money >= 100) {
        profitPerApple += 1;
        money -= 100;
        updateDisplay();
        alert('Increased profit per apple!');
        saveGame();
    } else {
        alert('Not enough money for this upgrade.');
    }
});

// Upgrade storage capacity
document.getElementById('upgrade-storage').addEventListener('click', () => {
    if (money >= 200) {
        storageCapacity += 10;
        money -= 200;
        updateDisplay();
        alert('Upgraded storage capacity!');
        saveGame();
    } else {
        alert('Not enough money for this upgrade.');
    }
});

// Buy House
document.getElementById('buy-house').addEventListener('click', () => {
    if (money >= 500) {
        money -= 500;
        alert('You bought a house!');
        saveGame();
        updateDisplay();
    } else {
        alert('Not enough money to buy a house.');
    }
});

// Buy Car
document.getElementById('buy-car').addEventListener('click', () => {
    if (money >= 1000) {
        money -= 1000;
        alert('You bought a car!');
        saveGame();
        updateDisplay();
    } else {
        alert('Not enough money to buy a car.');
    }
});

// Buy Cryptocurrency
document.getElementById('buy-crypto').addEventListener('click', () => {
    if (money >= 2000) {
        cryptoAmount += 1; // Buy 1 unit of cryptocurrency
        money -= 2000;
        alert('You bought cryptocurrency!');
        saveGame();
        updateDisplay();
    } else {
        alert('Not enough money to buy cryptocurrency.');
    }
});

// Trade apples for cryptocurrency
document.getElementById('trade-button').addEventListener('click', () => {
    if (appleCount > 0) {
        const tradeValue = appleCount * profitPerApple * 1.1; // 10% profit
        money += tradeValue;
        cryptoAmount += 1; // Assume you get 1 crypto for trading apples
        appleCount = 0; // All apples are traded
        updateDisplay();
        tradeResult.textContent = `Traded apples for $${tradeValue.toFixed(2)} and 1 cryptocurrency!`;
        saveGame();
    } else {
        alert('No apples to trade.');
    }
});

// Trade fruits like oranges and mangoes
document.getElementById('trade-fruit').addEventListener('click', () => {
    const fruitType = document.getElementById('fruit-select').value;
    const fruitCount = parseInt(document.getElementById('fruit-count').value);
    
    if (fruitCount > 0 && fruitPrices[fruitType] !== undefined) {
        const totalValue = fruitCount * fruitPrices[fruitType];
        money += totalValue;
        alert(`Traded ${fruitCount} ${fruitType}(s) for $${totalValue.toFixed(2)}!`);
        updateDisplay();
        saveGame();
    } else {
        alert('Invalid trade. Check your fruit count or type.');
    }
});

// Gambling feature: Heads or Tails
document.getElementById('gamble-coin').addEventListener('click', () => {
    const betAmount = parseFloat(document.getElementById('gamble-amount').value);
    const choice = document.querySelector('input[name="coin-choice"]:checked').value;

    if (betAmount > 0 && betAmount <= money) {
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        if (result === choice) {
            money += betAmount; // Win
            alert(`You won! The result was ${result}. Your new balance is $${money.toFixed(2)}.`);
        } else {
            money -= betAmount; // Lose
            alert(`You lost! The result was ${result}. Your new balance is $${money.toFixed(2)}.`);
        }
        updateDisplay();
        saveGame();
    } else {
        alert('Invalid bet amount.');
    }
});

// Gambling feature: GK Quiz
document.getElementById('gamble-gk').addEventListener('click', () => {
    const betAmount = parseFloat(document.getElementById('gk-bet-amount').value);
    const question = "What is the capital of France?"; // Example question
    const correctAnswer = "Paris"; // Example answer
    const userAnswer = prompt(`${question} (Your answer: )`);

    if (betAmount > 0 && betAmount <= money) {
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            money += betAmount * 2; // Win double the bet
            alert(`Correct! You won! Your new balance is $${money.toFixed(2)}.`);
        } else {
            money -= betAmount; // Lose
            alert(`Wrong answer! The correct answer was ${correctAnswer}. Your new balance is $${money.toFixed(2)}.`);
        }
        updateDisplay();
        saveGame();
    } else {
        alert('Invalid bet amount.');
    }
});

// Show floating apple animation
function showFloatingApple() {
    const floatingApple = document.createElement('div');
    floatingApple.className = 'floating-apple';
    floatingApple.textContent = '🍎';
    document.body.appendChild(floatingApple);
    setTimeout(() => {
        floatingApple.remove();
    }, 1500);
}

// Check achievements
function checkAchievements() {
    if (appleCount >= 1 && !achievements.firstApple) {
        achievements.firstApple = true;
        addAchievement('Collected your first apple!');
    }
    if (money > 0 && !achievements.firstSell) {
        achievements.firstSell = true;
        addAchievement('Sold your first apple!');
    }
    if (money >= 1000 && !achievements.richInvestor) {
        achievements.richInvestor = true;
        addAchievement('You are a rich investor!');
    }
}

// Add achievement to the list
function addAchievement(message) {
    const li = document.createElement('li');
    li.textContent = message;
    achievementsList.appendChild(li);
    showAchievementPopup(message);
}

// Show achievement popup
function showAchievementPopup(message) {
    const popup = document.getElementById('achievement-popup');
    const achievementMessage = document.getElementById('achievement-message');
    achievementMessage.textContent = message;
    popup.classList.remove('hidden');
}

// Close achievement popup
document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('achievement-popup').classList.add('hidden');
});

// Save game state
function saveGame() {
    const gameState = {
        appleCount,
        money,
        applesPerClick,
        profitPerApple,
        storageCapacity,
        achievements,
        tradeHistory,
        cryptoAmount
    };
    localStorage.setItem('appleTycoonGame', JSON.stringify(gameState));
}

// Load game state
function loadGame() {
    const savedGame = localStorage.getItem('appleTycoonGame');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        appleCount = gameState.appleCount;
        money = gameState.money;
        applesPerClick = gameState.applesPerClick;
        profitPerApple = gameState.profitPerApple;
        storageCapacity = gameState.storageCapacity;
        achievements = gameState.achievements;
        tradeHistory = gameState.tradeHistory;
        cryptoAmount = gameState.cryptoAmount;
        updateDisplay();
        updateAchievementsList();
    }
}

// Update achievements list on load
function updateAchievementsList() {
    achievementsList.innerHTML = '';
    if (achievements.firstApple) addAchievement('Collected your first apple!');
    if (achievements.firstSell) addAchievement('Sold your first apple!');
    if (achievements.richInvestor) addAchievement('You are a rich investor!');
    if (achievements.trader) addAchievement('You are now a trader!');
}

// Initialize game
loadGame();
