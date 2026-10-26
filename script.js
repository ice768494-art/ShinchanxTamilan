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

const continueButton = document.getElementById('continueButton');
const transition = document.getElementById('transition');
continueButton.addEventListener('click', () => {
  continueButton.disabled = true;
  continueButton.textContent = 'INITIALIZING...';
  transition.classList.add('show');
  transition.setAttribute('aria-hidden', 'false');
  // Open the portfolio page after the cinematic transition animation.
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 2200);
});

// Optional procedural synth soundtrack: no external audio file or download required.
// Browsers only allow audio after the visitor taps the music control.
const musicToggle = document.getElementById('musicToggle');
let audioContext = null, masterGain = null, musicTimer = null, musicStep = 0;
function playSynthNote() {
  if (!audioContext || !masterGain || audioContext.state !== 'running') return;
  const now = audioContext.currentTime;
  const notes = [55, 82.41, 110, 82.41, 65.41, 98, 130.81, 98];
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  osc.type = musicStep % 4 === 0 ? 'triangle' : 'sine';
  osc.frequency.value = notes[musicStep % notes.length];
  filter.type = 'lowpass'; filter.frequency.value = 420;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.045, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);
  osc.connect(filter); filter.connect(gain); gain.connect(masterGain);
  osc.start(now); osc.stop(now + 0.66);
  musicStep++;
}
async function toggleMusic() {
  if (!musicToggle) return;
  try {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) { musicToggle.textContent = '♫ AUDIO NOT SUPPORTED'; return; }
      audioContext = new AudioCtx();
      masterGain = audioContext.createGain(); masterGain.gain.value = 0.22; masterGain.connect(audioContext.destination);
    }
    if (musicTimer) {
      clearInterval(musicTimer); musicTimer = null;
      masterGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.08);
      musicToggle.textContent = '♫ MUSIC: OFF'; musicToggle.classList.remove('is-playing'); musicToggle.setAttribute('aria-pressed', 'false');
    } else {
      await audioContext.resume();
      masterGain.gain.setTargetAtTime(0.22, audioContext.currentTime, 0.12);
      playSynthNote(); musicTimer = setInterval(playSynthNote, 460);
      musicToggle.textContent = '♫ MUSIC: ON'; musicToggle.classList.add('is-playing'); musicToggle.setAttribute('aria-pressed', 'true');
    }
    musicToggle.classList.remove('tap-flash'); void musicToggle.offsetWidth; musicToggle.classList.add('tap-flash');
  } catch (err) { musicToggle.textContent = '♫ TAP TO ENABLE'; }
}
if (musicToggle) musicToggle.addEventListener('click', toggleMusic);

// Tactile feedback for every button/link: ripple + quick neon flash.
document.querySelectorAll('button, .jump-button, .project-link, .social-buttons a, .logo, .socials span').forEach((control) => {
  control.classList.add('button-ripple');
  control.addEventListener('click', (event) => {
    const rect = control.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-dot';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = ((event.clientX || rect.left + rect.width / 2) - rect.left - size / 2) + 'px';
    ripple.style.top = ((event.clientY || rect.top + rect.height / 2) - rect.top - size / 2) + 'px';
    control.appendChild(ripple);
    control.classList.remove('tap-flash'); void control.offsetWidth; control.classList.add('tap-flash');
    setTimeout(() => ripple.remove(), 700);
  });
});

// Gentle 3D tilt on project cards for pointer devices; disabled on touch screens.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

// Tiny synthesized cyber-click sound for interactive controls.
function cyberClickSound(){
  try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;const c=cyberClickSound.ctx||(cyberClickSound.ctx=new AC());if(c.state==='suspended')c.resume();const o=c.createOscillator(),g=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(520,c.currentTime);o.frequency.exponentialRampToValueAtTime(170,c.currentTime+.09);g.gain.setValueAtTime(.035,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.1);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.11)}catch(e){}
}
document.querySelectorAll('button, .jump-button, .project-link, .social-buttons a').forEach(el=>el.addEventListener('click',cyberClickSound));
