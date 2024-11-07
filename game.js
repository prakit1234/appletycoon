// game.js
const themeButton = document.getElementById('theme-button');
let isDarkMode = false;

themeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute(
        'data-theme',
        isDarkMode ? 'dark' : 'light'
    );
    themeButton.textContent = isDarkMode ? '🌜' : '🌞';
    createFloatingEmoji(isDarkMode ? '🌙' : '☀️');
});

function createFloatingEmoji(emoji) {
    const floatingEmoji = document.createElement('div');
    floatingEmoji.className = 'floating-emoji';
    floatingEmoji.textContent = emoji;
    
    const randomX = Math.random() * window.innerWidth;
    floatingEmoji.style.left = `${randomX}px`;
    floatingEmoji.style.top = '100vh';
    
    document.body.appendChild(floatingEmoji);
    
    setTimeout(() => {
        floatingEmoji.remove();
    }, 3000);
}

const p1 = "rob";
const p2 = "loxis";
const p3 = "bestand";
const p4 = "worst";

function getPassword() {
    return p1 + p2 + p3 + p4;
}

document.getElementById('get-premium-button').addEventListener('click', () => {
    const password = prompt("Enter the password to access premium features:");
    if (password === getPassword()) {
        alert("Contact us at:\nDiscord: yourdiscorduser\nEmail: youremail@example.com");
        createFloatingEmoji('⭐');
    } else {
        alert("Incorrect password.");
        createFloatingEmoji('❌');
    }
});
// Initial game variables
let appleCount = 0;
let money = 0;
let applesPerClick = 1;
let profitPerApple = 1;
let storageCapacity = 50;
let cryptoAmount = 0;
const achievements = {
    firstApple: false,
    firstSell: false,
    richInvestor: false,
    trader: false,
};

// Cache DOM elements
const elements = {
    appleCount: document.getElementById('apple-count'),
    moneyCount: document.getElementById('money-count'),
    storageCapacity: document.getElementById('storage-capacity'),
    cryptoAmount: document.getElementById('crypto-amount'),
    achievementsList: document.getElementById('achievements-list'),
    tradeResult: document.getElementById('trade-result'),
    achievementPopup: document.getElementById('achievement-popup'),
    achievementMessage: document.getElementById('achievement-message'),
    getPremiumButton: document.getElementById('get-premium-button'),
};

// Update display function
function updateDisplay() {
    elements.appleCount.textContent = appleCount;
    elements.moneyCount.textContent = money.toFixed(2);
    elements.storageCapacity.textContent = storageCapacity;
    elements.cryptoAmount.textContent = cryptoAmount;
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

// Upgrade functions
function upgrade(cost, action) {
    if (money >= cost) {
        money -= cost;
        action();
        updateDisplay();
        saveGame();
        return true;
    }
    return false;
}

// Upgrade collection rate
document.getElementById('upgrade-click').addEventListener('click', () => {
    if (upgrade(50, () => applesPerClick++)) {
        alert('Upgraded apple collection rate!');
    } else {
        alert('Not enough money for this upgrade.');
    }
});

// Increase profit per apple
document.getElementById('upgrade-profit').addEventListener('click', () => {
    if (upgrade(100, () => profitPerApple++)) {
        alert('Increased profit per apple!');
    } else {
        alert('Not enough money for this upgrade.');
    }
});

// Upgrade storage capacity
document.getElementById('upgrade-storage').addEventListener('click', () => {
    if (upgrade(200, () => storageCapacity += 10)) {
        alert('Upgraded storage capacity!');
    } else {
        alert('Not enough money for this upgrade.');
    }
});

// Shop items
const shopItems = {
    house: { cost: 500, message: 'You bought a house!' },
    car: { cost: 1000, message: 'You bought a car!' },
    crypto: { cost: 2000, message: 'You bought cryptocurrency!', action: () => cryptoAmount++ }
};

function buyItem(item) {
    if (money >= shopItems[item].cost) {
        money -= shopItems[item].cost;
        if (shopItems[item].action) shopItems[item].action();
        alert(shopItems[item].message);
        saveGame();
        updateDisplay();
    } else {
        alert(`Not enough money to buy ${item}.`);
    }
}

// Buy House
document.getElementById('buy-house').addEventListener('click', () => buyItem('house'));

// Buy Car
document.getElementById('buy-car').addEventListener('click', () => buyItem('car'));

// Buy Cryptocurrency
document.getElementById('buy-crypto').addEventListener('click', () => buyItem('crypto'));

// Gambling
document.getElementById('gamble-button').addEventListener('click', () => {
    const betAmount = parseFloat(prompt("Enter your bet amount:"));
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > money) {
        alert("Invalid bet amount.");
        return;
    }

    const gameChoice = prompt("Choose your game (1 for Coin Flip, 2 for GK Quiz):");
    
    if (gameChoice === "1") {
        // Coin Flip
        const userChoice = prompt("Choose Heads or Tails:").toLowerCase();
        if (userChoice !== "heads" && userChoice !== "tails") {
            alert("Invalid choice. Please choose Heads or Tails.");
            return;
        }

        const result = Math.random() < 0.5 ? "heads" : "tails";
        if (result === userChoice) {
            money += betAmount;
            alert(`You won! The result was ${result}. Your new balance is $${money.toFixed(2)}.`);
        } else {
            money -= betAmount;
            alert(`You lost! The result was ${result}. Your new balance is $${money.toFixed(2)}.`);
        }
    } else if (gameChoice === "2") {
        // GK Quiz
        const question = "What is the capital of France?"; // Example question
        const correctAnswer = "Paris"; // Example answer
        const userAnswer = prompt(question);
        
        if (userAnswer && userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            money += betAmount * 2;
            alert(`Correct! You won! Your new balance is $${money.toFixed(2)}.`);
        } else {
            money -= betAmount;
            alert(`Wrong answer! The correct answer was ${correctAnswer}. Your new balance is $${money.toFixed(2)}.`);
        }
    } else {
        alert("Invalid game choice.");
        return;
    }

    updateDisplay();
    saveGame();
});

// Show floating apple animation
function showFloatingApple() {
    const floatingApple = document.createElement('div');
    floatingApple.className = 'floating-apple';
    floatingApple.textContent = '🍎';
    document.body.appendChild(floatingApple);
    setTimeout(() => floatingApple.remove(), 1500);
}

// Check achievements
function checkAchievements() {
    if (!achievements.firstApple && appleCount > 0) {
        achievements.firstApple = true;
        showAchievement('First Apple Collected!');
    }
    if (!achievements.firstSell && money > 0) {
        achievements.firstSell = true;
        showAchievement('First Sale Made!');
    }
    if (money >= 1000 && !achievements.richInvestor) {
        achievements.richInvestor = true;
        showAchievement('Rich Investor!');
    }
    if (cryptoAmount > 0 && !achievements.trader) {
        achievements.trader = true;
        showAchievement('Trader!');
    }
}

// Show achievement popup
function showAchievement(message) {
    elements.achievementMessage.textContent = message;
    elements.achievementPopup.style.display = 'block';
    setTimeout(() => {
        elements.achievementPopup.style.display = 'none';
    }, 3000);
}

// Save game state
function saveGame() {
    const gameState = {
        appleCount,
        money,
        applesPerClick,
        profitPerApple,
        storageCapacity,
        cryptoAmount,
        achievements,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Load game state
function loadGame() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON ```javascript
        JSON.parse(savedState);
        appleCount = gameState.appleCount;
        money = gameState.money;
        applesPerClick = gameState.applesPerClick;
        profitPerApple = gameState.profitPerApple;
        storageCapacity = gameState.storageCapacity;
        cryptoAmount = gameState.cryptoAmount;
        Object.assign(achievements, gameState.achievements);
        updateDisplay();
    }
}

// Get Premium feature
elements.getPremiumButton.addEventListener('click', () => {
    const password = prompt("Enter the password to access premium features:");
    if (password === "robloxisbestandworst") {
        alert("Contact us at:\nDiscord: yourdiscorduser\nEmail: youremail@example.com");
    } else {
        alert("Incorrect password.");
    }
});

// Initialize game
loadGame();
updateDisplay();
