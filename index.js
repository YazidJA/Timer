const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const log = document.getElementById("log");
const minText = document.getElementById("minText");
const secText = document.getElementById("secText");
const msText = document.getElementById("msText");
const minUp = document.getElementById("minUp");
const secUp = document.getElementById("secUp");
const msUp = document.getElementById("msUp");
const minDown = document.getElementById("minDown");
const secDown = document.getElementById("secDown");
const msDown = document.getElementById("msDown");
const sound = new Audio("sound.mp3");

let running,
  stopwatch,
  ms,
  seconds,
  minutes,
  duration = [0, 0, 0]; // miliseconds, seconds, minutes

timerHandler = function () {
  if (duration[0] + duration[1] + duration[2] === 0) {
    stopHandler();
    log.textContent = "TIMER ENDED";
    sound.play();
  } else {
    if (duration[0] === 0) {
      if (duration[1] === 0) {
        duration[1] = 59;
        duration[2] -= 1;
      } else {
        duration[1] -= 1;
      }
      duration[0] = 99;
    } else {
      duration[0] -= 1;
    }
  }
  setText();
};

padding = () => {
  // ms padding
  if (duration[0] < 10) {
    ms = "0" + duration[0];
  } else {
    ms = duration[0];
  }
  // seconds padding
  if (duration[1] < 10) {
    seconds = "0" + duration[1];
  } else {
    seconds = duration[1];
  }
  // minutes padding
  if (duration[2] < 10) {
    minutes = "0" + duration[2];
  } else {
    minutes = duration[2];
  }
};

setText = () => {
  padding();
  minText.innerHTML = minutes;
  secText.innerHTML = seconds;
  msText.innerHTML = ms;
};

startHandler = () => {
  log.textContent = "RUNNING";
  running = true;
  stopwatch = setInterval(timerHandler, 10);
  startBtn.textContent = "STOP";
};

stopHandler = () => {
  clearInterval(stopwatch);
  running = false;
  log.textContent = "STOPPED";
  startBtn.textContent = "START";
};

startstop = () => {
  if (!running) {
    startHandler();
  } else {
    stopHandler();
  }
};

reset = () => {
  running = false;
  startBtn.textContent = "START";
  log.textContent = "STOPPED";
  clearInterval(stopwatch);
  duration = [0, 0, 0];
  setText();
};

upHandler = (unit) => {
  if (unit === 0 && duration[unit] === 99) {
    duration[unit] = 0;
  } else if (duration[unit] === 59) {
    duration[unit] = 0;
  } else {
    duration[unit] += 1;
  }
  setText();
};

downHandler = (unit) => {
  if (unit === 0 && duration[unit] === 0) {
    duration[unit] = 99;
  } else if (duration[unit] === 0) {
    duration[unit] = 59;
  } else {
    duration[unit] -= 1;
  }
  setText();
};

startBtn.addEventListener("click", startstop);
resetBtn.addEventListener("click", reset);
minUp.addEventListener("click", (unit) => {
  upHandler(2);
});
secUp.addEventListener("click", (unit) => {
  upHandler(1);
});
msUp.addEventListener("click", (unit) => {
  upHandler(0);
});
minDown.addEventListener("click", (unit) => {
  downHandler(2);
});
secDown.addEventListener("click", (unit) => {
  downHandler(1);
});
msDown.addEventListener("click", (unit) => {
  downHandler(0);
});
