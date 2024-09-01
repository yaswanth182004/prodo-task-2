// DOM elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

// Variables
let timer; // Timer variable
let running = false; // Flag to track if stopwatch is running
let startTime; // Start time of the stopwatch
let pausedTime = 0; // Time paused when the stopwatch is paused
let lapCount = 1; // Lap counter

// Event listeners
startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Start or pause the stopwatch
function startPause() {
    if (!running) {
        startStopwatch();
        startPauseBtn.textContent = 'Pause';
    } else {
        pauseStopwatch();
        startPauseBtn.textContent = 'Resume';
    }
}

// Start the stopwatch
function startStopwatch() {
    running = true;
    startTime = Date.now() - pausedTime;
    timer = setInterval(updateDisplay, 1000);
}

// Pause the stopwatch
function pauseStopwatch() {
    running = false;
    clearInterval(timer);
    pausedTime = Date.now() - startTime;
}

// Reset the stopwatch
function reset() {
    clearInterval(timer);
    running = false;
    pausedTime = 0;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapCount = 1;
    lapsList.innerHTML = '';
}

// Update the stopwatch display
function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
}

// Format time in HH:MM:SS format
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Pad single digits with leading zero
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Record lap time
function lap() {
    if (running) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCount++;
    }
}