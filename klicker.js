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
var dangerEventActive = false;
var dangerEventTimeout;
var dangerCountdownInterval;
var dangerCountdownTime = 0;
var dangerImageUrl = 'https://i.ibb.co/Wpv7wnsy/Untitled.jpg';
var mysteryEventActive = false;
var mysteryEventTimeout;
var mysteryCountdownTime = 0;
var mysteryImageUrl = 'https://m.media-amazon.com/images/I/71TX2dnHokL._AC_UY1000_.jpg';
var tylerKillerEnabled = false;
var erikaClickerEnabled = false;
var erikaClickerValue = 0;
var erikaCost = 500000;
var erikaUpgradeCost = 1000000;

function clickCookie() {
    var cookie = document.getElementById('cookie');
    cookie.classList.remove('clicked');
    void cookie.offsetWidth;
    cookie.classList.add('clicked');

    score += clickValue + erikaClickerValue;
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
        showNotification('Not enough cookies to buy this upgrade!');
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
        showNotification('Auto-Clicker is already enabled!');
    } else {
        showNotification('Not enough cookies to buy the Auto-Clicker!');
    }
}

function buyUpgradeAutoClicker() {
    if (!autoClickerEnabled) {
        showNotification('Buy the Auto-Clicker first!');
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
        showNotification('Not enough cookies to upgrade the Auto-Clicker!');
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

function startRandomDangerEvents() {
    scheduleDangerEvent();
}

function scheduleDangerEvent() {
    var randomDelay = Math.random() * 5000 + 3000;
    dangerEventTimeout = setTimeout(triggerDangerEvent, randomDelay);
}

function triggerDangerEvent() {
    if (dangerEventActive) return;
    
    dangerEventActive = true;
    dangerCountdownTime = 5;
    
    var dangerImage = document.getElementById('dangerImage');
    dangerImage.src = dangerImageUrl;
    dangerImage.classList.remove('hidden');
    
    var randomX = Math.random() * (window.innerWidth - 150);
    var randomY = Math.random() * (window.innerHeight - 150);
    
    dangerImage.style.left = randomX + 'px';
    dangerImage.style.top = randomY + 'px';
    
    dangerCountdownInterval = setInterval(function() {
        dangerCountdownTime--;
        if (dangerCountdownTime <= 0) {
            closeDangerEvent(false);
        }
    }, 1000);
}

function saveCookie() {
    closeDangerEvent(true);
}

function closeDangerEvent(saved) {
    dangerEventActive = false;
    clearInterval(dangerCountdownInterval);
    
    var dangerImage = document.getElementById('dangerImage');
    dangerImage.classList.add('hidden');
    
    if (!saved && !tylerKillerEnabled) {
        score = 0;
        updateScore();
        showNotification('Cookie was crumbled! Lost all cookies!');
    } else if (!saved && tylerKillerEnabled) {
        showNotification('Tyler already killed the crumbler!');
    } else {
        score += 100;
        updateScore();
        showNotification('Saved the cookie! +100 cookies');
    }
    
    scheduleDangerEvent();
}

function setDangerImage(imageUrl) {
    dangerImageUrl = imageUrl;
}

function startRandomMysteryEvents() {
    scheduleMysteryEvent();
}

function scheduleMysteryEvent() {
    var randomDelay = 60000;
    mysteryEventTimeout = setTimeout(triggerMysteryEvent, randomDelay);
}

function triggerMysteryEvent() {
    if (mysteryEventActive) return;
    
    mysteryEventActive = true;
    mysteryCountdownTime = 5;
    
    var mysteryImage = document.getElementById('mysteryImage');
    mysteryImage.src = mysteryImageUrl;
    mysteryImage.classList.remove('hidden');
    
    var randomX = Math.random() * (window.innerWidth - 150);
    var randomY = Math.random() * (window.innerHeight - 150);
    
    mysteryImage.style.left = randomX + 'px';
    mysteryImage.style.top = randomY + 'px';
    
    var mysteryCountdownInterval = setInterval(function() {
        mysteryCountdownTime--;
        if (mysteryCountdownTime <= 0) {
            closeMysteryEvent(false);
        }
    }, 1000);
    
    setTimeout(function() {
        if (mysteryEventActive) {
            closeMysteryEvent(false);
        }
    }, 5000);
}

function claimMysteryBonus() {
    closeMysteryEvent(true);
}

function closeMysteryEvent(claimed) {
    mysteryEventActive = false;
    
    var mysteryImage = document.getElementById('mysteryImage');
    mysteryImage.classList.add('hidden');
    
    if (claimed) {
        var randomBonus = Math.floor(Math.random() * 2000001) - 1000000;
        score += randomBonus;
        if (randomBonus >= 0) {
            showNotification('Mystery Bonus: +' + randomBonus + ' cookies!');
        } else {
            showNotification('Mystery Bonus: ' + randomBonus + ' cookies!');
        }
        updateScore();
    }
    
    scheduleMysteryEvent();
}

function showNotification(message) {
    var notification = document.getElementById('notification');
    notification.innerText = message;
    notification.classList.remove('hidden');
    
    setTimeout(function() {
        notification.classList.add('hidden');
    }, 3000);
}

function buyTylerKiller() {
    if (tylerKillerEnabled) {
        showNotification('Tyler Killer already purchased!');
        return;
    }
    
    if (score >= 10000000) {
        score -= 10000000;
        tylerKillerEnabled = true;
        updateScore();
        showNotification('Tyler Killer activated! Cookie crumbler is dead!');
        var btn = document.getElementById('tylerKillerBtn');
        if (btn) {
            btn.innerText = 'Tyler Killer (ACTIVATED)';
            btn.disabled = true;
        }
    } else {
        showNotification('Not enough cookies! Need 10,000,000 cookies for Tyler Killer!');
    }
}

function buyErikaClicker() {
    if (erikaClickerEnabled) {
        showNotification('Erika Klicker already purchased!');
        return;
    }
    
    if (score >= erikaCost) {
        score -= erikaCost;
        erikaClickerEnabled = true;
        erikaClickerValue = 10000;
        updateScore();
        showNotification('Erika Klicker activated! +10,000 per click!');
        var btn = document.getElementById('erikaClickerBtn');
        var upgradeBtn = document.getElementById('upgradeErikaBtn');
        var erikaImg = document.getElementById('erikaImage');
        if (btn) {
            btn.innerText = 'Erika Klicker (ACTIVE)';
            btn.disabled = true;
        }
        if (upgradeBtn) {
            upgradeBtn.style.display = 'block';
        }
        if (erikaImg) {
            erikaImg.classList.remove('hidden');
        }
    } else {
        showNotification('Not enough cookies! Need ' + erikaCost + ' cookies for Erika Klicker!');
    }
}

function upgradeErikaClicker() {
    if (!erikaClickerEnabled) {
        showNotification('Buy Erika Klicker first!');
        return;
    }
    
    if (score >= erikaUpgradeCost) {
        score -= erikaUpgradeCost;
        erikaClickerValue += 10000;
        erikaUpgradeCost = Math.ceil(erikaUpgradeCost * 1.8);
        updateScore();
        var upgradeBtn = document.getElementById('upgradeErikaBtn');
        if (upgradeBtn) {
            upgradeBtn.innerText = 'Upgrade Erika (Cost: ' + erikaUpgradeCost + ' cookies)';
        }
        showNotification('Erika upgraded! Now +' + erikaClickerValue + ' per click!');
    } else {
        showNotification('Not enough cookies! Need ' + erikaUpgradeCost + ' cookies!');
    }
}

updateAutoClickerButtons();
updateUpgradeButton();
startRandomDangerEvents();
startRandomMysteryEvents();

function toggleModMenu() {
    var modMenu = document.getElementById('modMenu');
    modMenu.classList.toggle('hidden');
}

function addCookies() {
    var input = document.getElementById('cookieInput');
    var amount = parseInt(input.value) || 0;
    score += amount;
    updateScore();
    showNotification('Added ' + amount + ' cookies!');
}
