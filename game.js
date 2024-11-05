// Initial game variables
let appleCount = 0;
let money = 0;
let applesPerClick = 1;
let profitPerApple = 1;
let storageCapacity = 50;
let tradeHistory = [];
let achievements = {
    firstApple: false,
    firstSell: false,
    richInvestor: false,
    trader: false,
};

// DOM elements
const appleCountElement = document.getElementById('apple-count');
const moneyCountElement = document.getElementById('money-count');
const storageCapacityElement = document.getElementById('storage-capacity');
const achievementsList = document.getElementById('achievements-list');
const tradeResult = document.getElementById('trade-result');

// Update display functions
function updateDisplay() {
    appleCountElement.textContent = appleCount;
    moneyCountElement.textContent = money.toFixed(2);
    storageCapacityElement.textContent = storageCapacity;
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
        tradeHistory
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
