const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let width, height, columns, drops;
const chars = '01アイウエオカキクケコサシスセソタチツテトSXT';
function resizeMatrix() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / 17);
  drops = Array(columns).fill(1).map(() => Math.random() * -50);
}
function drawMatrix() {
  ctx.fillStyle = 'rgba(3, 4, 8, 0.09)';
  ctx.fillRect(0, 0, width, height);
  ctx.font = '12px monospace';
  drops.forEach((y, i) => {
    ctx.fillStyle = i % 4 === 0 ? '#ff2348' : '#19bfff';
    ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 17, y * 17);
    if (y * 17 > height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.55 + Math.random() * 0.45;
  });
  requestAnimationFrame(drawMatrix);
}
window.addEventListener('resize', resizeMatrix);
resizeMatrix();
drawMatrix();

const lines = [
  ['[+] Initializing SXT core...', 'blue'],
  ['[+] Loading anime modules...', ''],
  ['[+] Connecting gaming network...', ''],
  ['[+] Checking creator identity...', ''],
  ['[+] Access granted.', 'good'],
  ['[+] Welcome to your world.', 'good'],
  ['> Anime library ........ READY', 'red'],
  ['> Gaming zone .......... READY', 'red'],
  ['> Creative mode ........ READY', 'red'],
  ['> Preparing portal .... 100%', 'good']
];
const terminal = document.getElementById('terminalLines');
let lineIndex = 0;
function addTerminalLine() {
  if (lineIndex >= lines.length) return;
  const row = document.createElement('div');
  row.textContent = lines[lineIndex][0];
  if (lines[lineIndex][1]) row.className = lines[lineIndex][1];
  terminal.appendChild(row);
  lineIndex++;
  setTimeout(addTerminalLine, 330 + Math.random() * 250);
}
setTimeout(addTerminalLine, 400);

const clock = document.getElementById('clock');
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
}
updateClock();
setInterval(updateClock, 1000);

const loadBar = document.getElementById('loadBar');
const loadPercent = document.getElementById('loadPercent');
const loadText = document.getElementById('loadText');
let progress = 0;
const loadTimer = setInterval(() => {
  progress = Math.min(100, progress + Math.ceil(Math.random() * 8));
  loadBar.style.width = progress + '%';
  loadPercent.textContent = String(progress).padStart(2, '0') + '%';
  if (progress >= 100) {
    clearInterval(loadTimer);
    loadText.textContent = 'PORTAL READY';
    loadPercent.style.color = 'var(--green)';
  }
}, 210);

const form = document.getElementById('accessForm');
const input = document.getElementById('accessCode');
const message = document.getElementById('message');
const transition = document.getElementById('transition');
form.addEventListener('submit', event => {
  event.preventDefault();
  const code = input.value.trim();
  if (!code) {
    message.textContent = '>> TYPE A NAME OR CODE TO START YOUR JOURNEY.';
    message.style.color = 'var(--red)';
    input.focus();
    return;
  }
  message.textContent = '>> ACCESS GRANTED // WELCOME, ' + code.toUpperCase() + '.';
  message.style.color = 'var(--green)';
  transition.classList.add('show');
  transition.setAttribute('aria-hidden', 'false');
  // Replace "home.html" with the filename of your main website page.
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 2200);
});
