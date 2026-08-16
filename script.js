const rollButton = document.querySelector('#rollButton');
const result = document.querySelector('#result');
const rollsDisplay = document.querySelector("#rollsDisplay");
const totalResult = document.querySelector("#totalResult");
const targetResult = document.querySelector("#targetResult");
const matchesResult = document.querySelector("#matchesResult");
const diceCount = document.querySelector('#diceCount');
const targetNumber = document.querySelector('#targetNumber');
const diceOptions = document.querySelector("#diceOptions");
const historyList = document.querySelector('#historyList');
const clearHistoryButton = document.querySelector('#clearHistoryButton');
const maxHistoryItems = 5;

rollButton.addEventListener('click', function () {
    const amount = Number(diceCount.value);
    const selectedDie =
        document.querySelector("#diceOptions input:checked");

    const sides = Number(selectedDie.value);
    const target = Number(targetNumber.value);

    if (!Number.isInteger(amount) || amount < 1 || amount > 1000) {
        result.textContent = "Enter a whole number of dice from 1 to 1000.";
        return;
    }
    if (!Number.isInteger(target) || target < 1 || target > sides) {
        result.textContent =
        "Choose a whole target number from 1 to " + sides + ".";
        return;
    }

    let total = 0;
    let matches = 0;
    let rolls = [];

        for (let i = 0; i < amount; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        total += roll;

        if (roll === target) {
            matches++;
        }
    }

    rollsDisplay.textContent = "";

    for (const roll of rolls) {
        const rollBox = document.createElement("span");
        rollBox.classList.add("roll-box");
        rollBox.textContent = roll;

        if (roll === target) {
            rollBox.classList.add("match");
        }

        rollsDisplay.append(rollBox);
    }

    totalResult.textContent = total;
    targetResult.textContent = target;
    matchesResult.textContent = matches;

    result.textContent =
        amount + "d" + sides + " roll complete.";

    const historyItem = document.createElement("li");

    historyItem.textContent =
        amount + "d" + sides +
        " - Total: " + total +
        " - Number of " + target + "s: " + matches;

    historyList.prepend(historyItem);

        while (historyList.children.length > maxHistoryItems) {
        historyList.removeChild(historyList.lastElementChild);
    }
});

clearHistoryButton.addEventListener("click", function () {
    historyList.textContent = "";
});

diceOptions.addEventListener("change", function () {
    const selectedDie =
        document.querySelector("#diceOptions input:checked");

    const sides = Number(selectedDie.value);

    targetNumber.max = sides;

    if (Number(targetNumber.value) > sides) {
        targetNumber.value = 1;
    }
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./service-worker.js");
    });
}