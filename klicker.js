// JavaScript code for the cookie clicker game with upgrades, auto-clicker, and achievements
var score = 0;
var clickValue = 1;
var autoClickerEnabled = false;
var autoClickerInterval;
var upgradeCount = 0;
var upgradeCost = 10;
var upgradeIncrease = 1;
var cookiesAchievementThreshold = 100;
var upgradesAchievementThreshold = 5;

function clickCookie() {
    var cookie = document.getElementById('cookie');
    cookie.classList.remove('clicked');
    void cookie.offsetWidth;
    cookie.classList.add('clicked');

    score += clickValue;
    updateScore();
    checkAchievements();
}

function updateScore() {
    document.getElementById('scoreValue').innerText = score;
}

function updateClickValue() {
    document.getElementById('clickValue').innerText = 'Click Value: ' + clickValue;
}

function updateAchievement(achievementId, message) {
    document.getElementById(achievementId).innerText = message;
}

function buyUpgrade() {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        clickValue += upgradeIncrease;
        upgradeCount++;
        upgradeCost = Math.ceil(upgradeCost * 1.6);
        upgradeIncrease++;
        updateScore();
        updateClickValue();
        updateUpgradeButton();
        checkAchievements();
    } else {
        alert('Not enough cookies to buy this upgrade!');
    }
}

function updateUpgradeButton() {
    var upgradeButton = document.getElementById('mainUpgrade');
    if (upgradeButton) {
        upgradeButton.innerText = 'Upgrade (Cost: ' + upgradeCost + ' cookies)';
    }
}

function buyAutoClicker(cost, initialSpeed) {
    if (score >= cost && !autoClickerEnabled) {
        score -= cost;
        autoClickerEnabled = true;
        document.getElementById('autoClickerStatus').innerText = 'Auto-Clicker: On';
        autoClickerInterval = setInterval(autoClick, 1000 / initialSpeed);
        updateScore();
        checkAchievements();
    } else if (autoClickerEnabled) {
        alert('Auto-Clicker is already enabled!');
    } else {
        alert('Not enough cookies to buy the Auto-Clicker!');
    }
}

function buyUpgradeAutoClicker(cost, speedIncrease) {
    if (score >= cost && autoClickerEnabled) {
        score -= cost;
        clearInterval(autoClickerInterval);
        autoClickerInterval = setInterval(autoClick, 1000 / (1 + speedIncrease));
        updateScore();
        checkAchievements();
    } else {
        alert('Either Auto-Clicker is not enabled, or not enough cookies to buy this upgrade!');
    }
}

function autoClick() {
    score += clickValue;
    updateScore();
    checkAchievements();
}

updateUpgradeButton();
