function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let btnStatus = false;
let timerId = null;

btnStart.addEventListener('click', onStartBtn);
btnStop.addEventListener('click', onStopBtn);

function onStartBtn() {
  if (btnStatus) {
    return;
  }

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  btnStatus = true;

  console.log(btnStatus);
}

function onStopBtn() {
  clearInterval(timerId);
  btnStatus = false;
}
