// Matrix Rain
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cols = Math.floor(canvas.width / 16);
const drops = Array(cols).fill(1);
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&アイウエオカキク';

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff41';
  ctx.font = '14px Share Tech Mono';
  drops.forEach((y, i) => {
    ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y * 16);
    if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 60);
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Toggle Password
function togglePW(id, iconId) {
  const inp = document.getElementById(id);
  const icon = document.getElementById(iconId);
  if (inp.type === 'password') {
    inp.type = 'text';
    icon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;
  } else {
    inp.type = 'password';
    icon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
  }
}

// Password Strength
function checkStrength() {
  const pw = document.getElementById('pw1').value;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const colors = ['#ff3333', '#ff8800', '#ffdd00', '#00ff41'];
  const labels = ['WEAK', 'FAIR', 'GOOD', 'STRONG'];
  for (let i = 1; i <= 4; i++) {
    const fill = document.getElementById(`s${i}`);
    fill.style.width = i <= score ? '100%' : '0%';
    fill.style.background = colors[score - 1] || 'transparent';
  }
  const label = document.getElementById('strength-label');
  label.textContent = score > 0 ? labels[score - 1] : '';
  label.style.color = colors[score - 1] || 'rgba(0,255,65,0.4)';
}

// Field Validators
function setFieldState(wrapId, errId, isValid, showError) {
  const wrap = document.getElementById(wrapId);
  const err = document.getElementById(errId);
  wrap.classList.toggle('error', !isValid && showError);
  wrap.classList.toggle('success', isValid);
  if (err) err.classList.toggle('visible', !isValid && showError);
}

function validateUsername() {
  const val = document.getElementById('username').value;
  setFieldState('wrap-username', 'err-username', val.length >= 3, val.length > 0);
}

function validateEmail() {
  const val = document.getElementById('email').value;
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  setFieldState('wrap-email', 'err-email', ok, val.length > 0);
}

function validateConfirm() {
  const pw1 = document.getElementById('pw1').value;
  const pw2 = document.getElementById('pw2').value;
  if (!pw2) return;
  setFieldState('wrap-confirm', 'err-confirm', pw1 === pw2, true);
}

// Register Button
function handleRegister(btn) {
  const user = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const pw1 = document.getElementById('pw1').value;
  const pw2 = document.getElementById('pw2').value;
  const terms = document.getElementById('terms').checked;

  validateUsername(); validateEmail(); validateConfirm();
  if (user.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || pw1 !== pw2 || !pw1 || !terms) return;

  const orig = btn.innerHTML;
  btn.innerHTML = '&gt;_ INITIALIZING...';
  btn.disabled = true;
  let dots = 0;
  const iv = setInterval(() => {
    dots = (dots + 1) % 4;
    btn.innerHTML = `&gt;_ CREATING ACCOUNT${'.'.repeat(dots)}`;
  }, 300);
  setTimeout(() => {
    clearInterval(iv);
    btn.innerHTML = '&gt;_ ACCESS GRANTED ✓';
    btn.style.background = '#00ff41';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
    }, 2000);
  }, 2500);
}