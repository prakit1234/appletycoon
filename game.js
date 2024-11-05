// Initial game variables
let appleCount = 0;
let money = 0;
let applesPerClick = 1;
let profitPerApple = 1;
let storageCapacity = 50;
let tradeHistory = [];

// DOM elements
const appleCountElement = document.getElementById('apple-count');
const moneyCountElement = document.getElementById('money-count');
const storageCapacityElement = document.getElementById('storage-capacity');
const achievementsList = document.getElementById('achievements-list');
const tradeResult = document.getElementById('trade-result');

// Achievements tracking
let achievements = {
    firstApple: false,
    firstSell: false,
    richInvestor: false,
    trader: false,
};

// Update display functions
function updateDisplay() {
    appleCountElement.textContent = appleCount;
    moneyCountElement.textContent = money.toFixed(2);
    storageCapacityElement.textContent = storageCapacity;
}

// Collect apples
document.getElementById('collect-button').addEventListener('click', () => {
    if (appleCount < storageCapacity) {
        for (let i = 0; i < applesPerClick; i++) {
            if (appleCount < storageCapacity) {
                appleCount++;
                showFloatingApple();
            }
        }
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
        money -= 50;
        applesPerClick += 1;
        updateDisplay();
        saveGame();
    } else {
        alert('Not enough money for this upgrade.');
    }
});

// Upgrade profit per apple
document.getElementById('upgrade-profit').addEventListener('click', () => {
    if (money >= 100) {
        money -= 100;
        profitPerApple += 0.1;
        updateDisplay();
        saveGame();
    } else {
        alert('Not enough money for this upgrade.');
    }
});

// Upgrade storage capacity
document.getElementById('upgrade-storage').addEventListener('click', () => {
    if (money >= 200) {
        money -= 200;
        storageCapacity += 50;
        updateDisplay();
        saveGame();
    } else {
        alert('Not enough money for this upgrade.');
    }
});

// Buy items in the shop
document.getElementById('buy-house').addEventListener('click', () => {
    if (money >= 500) {
        money -= 500;
        alert('You bought a house!');
        checkAchievements();
        updateDisplay();
        saveGame();
    } else {
        alert('Not enough money to buy a house.');
    }
});

document.getElementById('buy-car').addEventListener('click', () => {
    if (money >= 1000) {
        money -= 1000;
        alert('You bought a car!');
        checkAchievements();
        updateDisplay();
        saveGame();
    } else {
        alert('Not enough money to buy a car.');
    }
});

document.getElementById('buy-crypto').addEventListener('click', () => {
    if (money >= 2000) {
        money -= 2000;
        alert('You invested in cryptocurrency!');
        checkAchievements();
        updateDisplay();
        saveGame();
    } else {
        alert('Not enough money to invest in cryptocurrency.');
    }
});

// Trading logic
document.getElementById('trade-button').addEventListener('click', () => {
    let amount = parseFloat(prompt("Enter the amount to trade:"));
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount. Trade cancelled.");
        return;
    }

    if (money >= amount) {
        let userChoice = prompt("Choose 'heads' or 'tails':").toLowerCase();
        if (userChoice !== 'heads' && userChoice !== 'tails') {
            alert("Invalid choice. Trade cancelled.");
            return;
        }

        const result = Math.random() < 0.2 ? 'heads' : 'tails'; // 2 in 10 chance to win
        if (result === userChoice) {
            money += amount * 2;
            alert(`You won! The result was ${result}. You gained $${amount * 2}.`);
            tradeHistory.push(`Win: +$${amount * 2}`);
        } else {
            money -= amount;
            alert(`You lost! The result was ${result}. You lost $${amount}.`);
            tradeHistory.push(`Loss: -$${amount}`);
        }

        updateDisplay();
        updateTradeHistory();
        checkAchievements();
        saveGame();
    } else {
        alert("Not enough money to trade.");
    }
});

function updateTradeHistory() {
     ```javascript
    tradeResult.innerHTML = tradeHistory.map(entry => `<li>${entry}</li>`).join('');
}

// Check achievements
function checkAchievements() {
    if (appleCount === 1 && !achievements.firstApple) {
        achievements.firstApple = true;
        showAchievement("You collected your first apple!");
    }
    if (money >= 100 && !achievements.firstSell) {
        achievements.firstSell = true;
        showAchievement("You made your first sale!");
    }
    if (money >= 1000 && !achievements.richInvestor) {
        achievements.richInvestor = true;
        showAchievement("You are now a rich investor!");
    }
    if (tradeHistory.length > 0 && !achievements.trader) {
        achievements.trader = true;
        showAchievement("You are now a trader!");
    }
}

// Show achievement pop-up
function showAchievement(message) {
    const popup = document.getElementById('achievement-popup');
    const achievementMessage = document.getElementById('achievement-message');
    achievementMessage.textContent = message;
    popup.classList.remove('hidden');
}

// Close achievement pop-up
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
        achievements
    };
    localStorage.setItem('appleTycoonSave', JSON.stringify(gameState));
}

// Load game state
function loadGame() {
    const savedGame = localStorage.getItem('appleTycoonSave');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        appleCount = gameState.appleCount;
        money = gameState.money;
        applesPerClick = gameState.applesPerClick;
        profitPerApple = gameState.profitPerApple;
        storageCapacity = gameState.storageCapacity;
        achievements = gameState.achievements;
        updateDisplay();
    }
}

// Show floating apple emoji
function showFloatingApple() {
    const apple = document.createElement('div');
    apple.textContent = '🍎';
    apple.className = 'floating-apple';
    apple.style.left = `${Math.random() * 80 + 10}%`;
    document.body.appendChild(apple);
    setTimeout(() => {
        apple.remove();
    }, 1000);
}

// Load game on page load
window.onload = loadGame;
