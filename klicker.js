// JavaScript code for the cookie clicker game with upgrades, auto-clicker, and achievements
var score = 0;
var clickValue = 1;
var autoClickerEnabled = false;
var autoClickerInterval;
var autoClickerCost = 50;
var autoClickerSpeed = 0;
var autoClickerLevel = 0;
var autoClickerUpgradeCost = 30;
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

function buyAutoClicker() {
    if (score >= autoClickerCost && !autoClickerEnabled) {
        score -= autoClickerCost;
        autoClickerEnabled = true;
        autoClickerLevel = 1;
        autoClickerSpeed = 1;
        document.getElementById('autoClickerStatus').innerText = 'Auto-Clicker: On';
        autoClickerInterval = setInterval(autoClick, 1000 / autoClickerSpeed);
        updateScore();
        updateAutoClickerButtons();
        checkAchievements();
    } else if (autoClickerEnabled) {
        alert('Auto-Clicker is already enabled!');
    } else {
        alert('Not enough cookies to buy the Auto-Clicker!');
    }
}

function buyUpgradeAutoClicker() {
    if (!autoClickerEnabled) {
        alert('Buy the Auto-Clicker first!');
        return;
    }

    if (score >= autoClickerUpgradeCost) {
        score -= autoClickerUpgradeCost;
        autoClickerLevel++;
        autoClickerSpeed = Math.max(1, autoClickerSpeed * 2);
        autoClickerUpgradeCost = Math.ceil(autoClickerUpgradeCost * 2.5);
        clearInterval(autoClickerInterval);
        autoClickerInterval = setInterval(autoClick, 1000 / autoClickerSpeed);
        updateScore();
        updateAutoClickerButtons();
        checkAchievements();
    } else {
        alert('Not enough cookies to upgrade the Auto-Clicker!');
    }
}

function updateAutoClickerButtons() {
    var buyBtn = document.getElementById('buyAutoClickerBtn');
    var upgradeBtn = document.getElementById('upgradeAutoClickerBtn');
    if (buyBtn) {
        buyBtn.innerText = 'Buy Auto-Clicker (Cost: ' + autoClickerCost + ' cookies)';
    }
    if (upgradeBtn) {
        upgradeBtn.innerText = 'Upgrade Auto-Clicker (Cost: ' + autoClickerUpgradeCost + ' cookies)';
    }
}

function autoClick() {
    score += clickValue;
    updateScore();
    checkAchievements();
}

updateAutoClickerButtons();
updateUpgradeButton();
