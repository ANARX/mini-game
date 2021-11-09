const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;
const colors = [
  '#6aa19b',
  '#c95fd6',
  '#a3e02d',
  '#e3e6d4',
  '#7b3260',
  '#847066',
  '#b6baeb',
  '#afbbd0',
  '#2c6f63',
  '#415e63',
  '#8ead5a',
  '#a2c2f4',
  '#f5c8e1',
  '#e5afbd',
  '#4ddcb8',
  '#b1eecb',
  '#7e6b86',
  '#e05167',
  '#a3c49d',
  '#81b1ea',
  '#c96b31',
];

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  board.innerHTML = `<h1>Счет: <span class="primary>${score}</span></h1>`;
  timeEl.parentNode.classList.add('hide');
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function createRandomCircle() {
  const { width, height } = board.getBoundingClientRect();
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.background = color;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
