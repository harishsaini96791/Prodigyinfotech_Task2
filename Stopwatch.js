let startTime;
let interval;
let lapCount = 1;

const timeDisplay = document.getElementById("time");
const startStopButton = document.getElementById("startStopButton");
const lapButton = document.getElementById("lapButton");
const resetButton = document.getElementById("resetButton");
const lapList = document.getElementById("lapList");

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    const formattedTime = formatTime(currentTime);
    timeDisplay.textContent = formattedTime;
}

function formatTime(time) {
    const ms = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 3600);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
}

function toggleStartStop() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        startStopButton.textContent = "Start";
        lapButton.disabled = true;
    } else {
        startTime = Date.now() - (interval ? interval : 0);
        interval = setInterval(updateDisplay, 10);
        startStopButton.textContent = "Stop";
        lapButton.disabled = false;
    }
}

function recordLap() {
    const lapTime = timeDisplay.textContent;
    const lapItem = document.createElement("li");
    lapItem.classList.add("lap");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCount++;
}

function resetStopwatch() {
    clearInterval(interval);
    interval = null;
    timeDisplay.textContent = "00:00:00.00";
    startStopButton.textContent = "Start";
    lapButton.disabled = true;
    lapList.innerHTML = "";
    lapCount = 1;
}

startStopButton.addEventListener("click", toggleStartStop);
lapButton.addEventListener("click", recordLap);
resetButton.addEventListener("click", resetStopwatch);

