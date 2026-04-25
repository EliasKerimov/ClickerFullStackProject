const BASE_URL = "api/"
let xpClickModifier = 1;
let xpAutoClickModifier = 1;
let xpAutoClickerPerSecond = 0;
let xpAutoClickerBasePerSecond = 0;
let xp = 0;
const purchaseAcc = 1.337

const xpTracker = document.getElementById("xpTracker");
const xppsTracker = document.getElementById("xppsTracker")
const clickBtn = document.getElementById("clickBtn");
const upgradeContainer = document.getElementById("upgradeContainer")
const autoclickerContainer = document.getElementById("autoclickerContainer")

let upgrades = [];
let autoclickers = [];

const gameState = {
    upgradesPurchased: {},
    autoClickerAmounts: {}
};

function updateAutoClickers(){
    autoclickerContainer.innerHTML = "";

    autoclickers.forEach((clicker)=>{
        const nrOwned = gameState.autoClickerAmounts[clicker.id]
        const cost = Math.floor(clicker.cost * Math.pow(purchaseAcc, nrOwned))

        let cBtn = document.createElement("button")
        cBtn.className = "btn btn-autoclicker w-100 mb-2"
        cBtn.title = clicker.title

        let nopBadgeSpan = document.createElement("span")
        nopBadgeSpan.innerText = nrOwned
        nopBadgeSpan.className = "badge bg-light text-dark me-3"

        let costBadgeSpan = document.createElement("span")
        costBadgeSpan.innerText = cost
        costBadgeSpan.className = "badge bg-warning text-dark ms-3"

        let nameSpan = document.createElement("span")
        nameSpan.innerText = clicker.name

        cBtn.appendChild(nopBadgeSpan)
        cBtn.appendChild(nameSpan)
        cBtn.appendChild(costBadgeSpan)

        if (cost > xp) {
            cBtn.disabled = true
        }

        cBtn.addEventListener("click", () => {
            gameState.autoClickerAmounts[clicker.id] += 1;
            xp -= cost

            updateEverything()
        })

        autoclickerContainer.appendChild(cBtn)
    })

}

function updateUpgrades() {
    upgradeContainer.innerHTML = "";
    upgrades.forEach((upgrade) => {
        const owned = gameState.upgradesPurchased[upgrade.id]
        let uBtn = document.createElement("button")
        uBtn.className = "btn w-100 mb-2 btn-primary"
        uBtn.title = upgrade.title

        if (upgrade.cost > xp || owned) {
            uBtn.disabled = true
        }

        let badgeSpan = document.createElement("span")
        badgeSpan.innerText = owned ? "purchased" : upgrade.cost
        badgeSpan.className = "badge bg-warning text-dark ms-3"

        let nameSpan = document.createElement("span")
        nameSpan.innerText = upgrade.name

        uBtn.appendChild(nameSpan)
        uBtn.appendChild(badgeSpan)


        upgradeContainer.appendChild(uBtn)

        uBtn.addEventListener("click", () => {
            gameState.upgradesPurchased[upgrade.id] = true;
            xp -= upgrade.cost

            updateEverything()
        })
    })
}

clickBtn.addEventListener("click", () => {
    xp += xpClickModifier;
    updateEverything()

});

function updateTrackers() {
    xpTracker.textContent = Math.ceil(xp);
    xppsTracker.textContent = Math.ceil(xpAutoClickerPerSecond)
}

function updateModifiers() {
    xpClickModifier = 1;
    xpAutoClickModifier = 1;
    xpAutoClickerBasePerSecond =0;

    for (let upgrade of upgrades) {
        if (gameState.upgradesPurchased[upgrade.id]) {
            xpClickModifier *= upgrade.clickMulti
            xpAutoClickModifier *= upgrade.cpsMulti
        }
    }

    for (let clicker of autoclickers){
        xpAutoClickerBasePerSecond += clicker.cps * gameState.autoClickerAmounts[clicker.id]
    }
    xpAutoClickerPerSecond = xpAutoClickerBasePerSecond * xpAutoClickModifier;
}

function updateClickerImage(){
    //TODO: make the clicker image dynamically update based on how many xpAutoclicker per second in the game.
    // you can make your own images or you can use the resources in /img
    const currentImage = clickBtn.children[0].src;
    let newImage;
    if (xpAutoClickerPerSecond < 25) {
        newImage = "img/student.png"
    } else if(xpAutoClickerPerSecond < 50){
        newImage = "img/studentCoffee.png"
    } else if(xpAutoClickerPerSecond < 100){
        newImage = "img/studentCoffeeCoffee.png"
    } else if(xpAutoClickerPerSecond < 500){
        newImage = "img/studentCoffeeCoffeeDev.png"
    }else if(xpAutoClickerPerSecond < 1000) {
        newImage = "img/Graduate.png"
    }else {
        newImage = "img/Prof.png"
    }
    if (currentImage !== newImage) {
        clickBtn.children[0].src = newImage;
    }
}
function updateEverything(){
    updateModifiers()
    updateUpgrades()
    updateAutoClickers()
    updateTrackers()
    updateClickerImage()
}

async function init(){

    let responseUpg = await fetch(`${BASE_URL}upgrades`)
    upgrades = await responseUpg.json()

    let responseAC = await fetch(`${BASE_URL}autoclickers`)
    autoclickers = await responseAC.json()

    // Initialize upgrade purchase state
    upgrades.forEach(upg => {
        gameState.upgradesPurchased[upg.id] = false
    })

    // Initialize auto clicker counts
    autoclickers.forEach(ac => {
        gameState.autoClickerAmounts[ac.id] = 0
    })

    setInterval(function() {
        xp += xpAutoClickerBasePerSecond * xpAutoClickModifier
        updateEverything()
    }, 1000)

    updateEverything()
}

init()

