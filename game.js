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
        appleCount += applesPerClick;
        updateDisplay();
        checkAchievements();
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
    } else {
        alert('Not enough money to invest in cryptocurrency.');
    }
});

// Gambling logic
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
    } else {
        alert("Not enough money to trade.");
    }
});

function updateTradeHistory() {
    tradeResult.innerHTML = "<h3>Trade History</h3>";
    tradeHistory.slice(-5).forEach(entry => {
        const logEntry = document.createElement('div');
        logEntry.textContent = entry;
        tradeResult.appendChild(logEntry);
    });
}

// Check for achievements
function checkAchievements() {
    if (!achievements.firstApple && appleCount >= 1) {
        achievements.firstApple = true;
        addAchievement('First Apple Collected');
    }
    if (!achievements.firstSell && money >= 10) {
        achievements.firstSell = true;
        addAchievement('First Sale Made');
    }
    if (!achievements.richInvestor && money >= 1000) {
        achievements.richInvestor = true;
        addAchievement('Rich Investor');
    }
    if (!achievements.trader && tradeHistory.length >= 1) {
        achievements.trader = true;
        addAchievement('First Trade Completed');
    }
}

// Add achievements to the UI
function addAchievement(description) {
    const listItem = document.createElement('li');
    listItem.textContent = description;
    achievementsList.appendChild(listItem);
}

// Initial display update
updateDisplay();


// Pop-up element for achievements
const achievementPopup = document.getElementById('achievement-popup');
const achievementMessage = document.getElementById('achievement-message');
const closePopupButton = document.getElementById('close-popup');

// Show pop-up function
function showAchievementPopup(message) {
    achievementMessage.textContent = message;
    achievementPopup.classList.remove('hidden');
}

// Close pop-up listener
closePopupButton.addEventListener('click', () => {
    achievementPopup.classList.add('hidden');
});

// Modify `addAchievement` function to show the pop-up
function addAchievement(description) {
    const listItem = document.createElement('li');
    listItem.textContent = description;
    achievementsList.appendChild(listItem);
    showAchievementPopup(`Achievement Unlocked: ${description}`);
}
