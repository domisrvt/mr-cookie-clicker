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
var dangerImageUrl = 'https://static.wikia.nocookie.net/inconsistently-heinous/images/e/eb/Cookie-monster.webp/revision/latest?cb=20260103004509';
var mysteryEventActive = false;
var mysteryEventTimeout;
var mysteryCountdownTime = 0;
var mysteryImageUrl = 'https://media.tenor.com/wmXw4IwUrB8AAAAM/dice-roll-the-dice.gif';
var cookieMuncherStopperEnabled = false;
var angryGambleEnabled = false;
var angryGambleCost = 20000000;
var mrFireCookieClickerEnabled = false;
var mrFireCookieClickerValue = 0;
var mrFireCookieClickerCost = 500000;
var mrFireCookieClickerUpgradeCost = 1000000;

function clickCookie() {
    var cookie = document.getElementById('cookie');
    cookie.classList.remove('clicked');
    void cookie.offsetWidth;
    cookie.classList.add('clicked');

    score += clickValue + mrFireCookieClickerValue;
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
    
    if (!saved && !cookieMuncherStopperEnabled) {
        score = 0;
        updateScore();
        showNotification('Cookie was crumbled! Lost all cookies!');
    } else if (!saved && cookieMuncherStopperEnabled) {
        showNotification('Cookie Muncher was already fed so the cookie was saved!');
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
    
    if (angryGambleEnabled) {
        setTimeout(function() {
            if (mysteryEventActive) {
                showNotification('Angry Gamble grabbed the prize!');
                closeMysteryEvent(true);
            }
        }, 500);
        return;
    }
    
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

function buyCookieMuncherStopper() {
    if (cookieMuncherStopperEnabled) {
        showNotification('Cookie Muncher Stopper already purchased!');
        return;
    }
    
    if (score >= 10000000) {
        score -= 10000000;
        cookieMuncherStopperEnabled = true;
        updateScore();
        showNotification('Cookie Muncher Stopper activated! Cookie muncher is stopped!');
        var btn = document.getElementById('cookieMuncherStopperBtn');
        if (btn) {
            btn.innerText = 'Cookie Muncher Stopper (ACTIVATED)';
            btn.disabled = true;
        }
    } else {
        showNotification('Not enough cookies! Need 10,000,000 cookies for Cookie Muncher Stopper!');
    }
}

function buyAngryGamble() {
    if (angryGambleEnabled) {
        showNotification('Angry Gamble already purchased!');
        return;
    }
    
    if (score >= angryGambleCost) {
        score -= angryGambleCost;
        angryGambleEnabled = true;
        updateScore();
        showNotification('Angry Gamble recruited! Mystery prizes are auto-collected.');
        var btn = document.getElementById('angryGambleBtn');
        if (btn) {
            btn.innerText = 'Angry Gamble (ACTIVATED)';
            btn.disabled = true;
        }
    } else {
        showNotification('Not enough cookies! Need ' + angryGambleCost + ' cookies for Angry Gamble!');
    }
}

function buyMrFireCookieClicker() {
    if (mrFireCookieClickerEnabled) {
        showNotification('Mr Fire Cookie Clicker already purchased!');
        return;
    }
    
    if (score >= mrFireCookieClickerCost) {
        score -= mrFireCookieClickerCost;
        mrFireCookieClickerEnabled = true;
        mrFireCookieClickerValue = 10000;
        updateScore();
        showNotification('Mr Fire Cookie Clicker activated! +10,000 per click!');
        var btn = document.getElementById('mrFireCookieClickerBtn');
        var upgradeBtn = document.getElementById('upgradeMrFireCookieClickerBtn');
        var mrFireCookieClickerImg = document.getElementById('mrFireCookieClickerImage');
        if (btn) {
            btn.innerText = 'Mr Fire Cookie Clicker (ACTIVE)';
            btn.disabled = true;
        }
        if (upgradeBtn) {
            upgradeBtn.style.display = 'block';
        }
        if (mrFireCookieClickerImg) {
            mrFireCookieClickerImg.classList.remove('hidden');
        }
    } else {
        showNotification('Not enough cookies! Need ' + mrFireCookieClickerCost + ' cookies for Mr Fire Cookie Clicker!');
    }
}

function upgradeMrFireCookieClicker() {
    if (!mrFireCookieClickerEnabled) {
        showNotification('Buy Mr Fire Cookie Clicker first!');
        return;
    }
    
    if (score >= mrFireCookieClickerUpgradeCost) {
        score -= mrFireCookieClickerUpgradeCost;
        mrFireCookieClickerValue += 10000;
        mrFireCookieClickerUpgradeCost = Math.ceil(mrFireCookieClickerUpgradeCost * 1.8);
        updateScore();
        var upgradeBtn = document.getElementById('upgradeMrFireCookieClickerBtn');
        if (upgradeBtn) {
            upgradeBtn.innerText = 'Upgrade Mr Fire Cookie Clicker (Cost: ' + mrFireCookieClickerUpgradeCost + ' cookies)';
        }
        showNotification('Mr Fire Cookie Clicker upgraded! Now +' + mrFireCookieClickerValue + ' per click!');
    } else {
        showNotification('Not enough cookies! Need ' + mrFireCookieClickerUpgradeCost + ' cookies!');
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
