// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Live clock (UTC) in status strip
const clockEl = document.getElementById('clock');
function updateClock() {
  const now = new Date();
  const hh = String(now.getUTCHours()).padStart(2, '0');
  const mm = String(now.getUTCMinutes()).padStart(2, '0');
  const ss = String(now.getUTCSeconds()).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm}:${ss} UTC`;
}
updateClock();
setInterval(updateClock, 1000);

// Ticker text
const tickerMessages = [
  'All monitored endpoints reporting normal',
  'Last full network sweep: completed',
  'Threat intelligence feed: synced',
  'SOC analysts on shift: active',
  'No active critical incidents'
];
document.getElementById('ticker').textContent = tickerMessages.join('   —   ');

// Simulated SOC console log lines in hero
const logLines = [
  { time: '00:00:01', tag: '[OK]', text: 'Network sensors initialized', type: 'ok' },
  { time: '00:00:04', tag: '[INFO]', text: 'SIEM ingest connected — 12 sources', type: 'info' },
  { time: '00:00:09', tag: '[OK]', text: 'Endpoint agents reporting: 100%', type: 'ok' },
  { time: '00:00:14', tag: '[WARN]', text: 'Unusual login pattern flagged for review', type: 'warn' },
  { time: '00:00:18', tag: '[INFO]', text: 'Analyst assigned — case #4471', type: 'info' },
  { time: '00:00:24', tag: '[OK]', text: 'Threat intel feed synchronized', type: 'ok' },
  { time: '00:00:29', tag: '[OK]', text: 'No active critical incidents', type: 'ok' }
];

const consoleBody = document.getElementById('consoleBody');
let lineIndex = 0;

function typeNextLine() {
  if (lineIndex >= logLines.length) {
    setTimeout(() => {
      consoleBody.innerHTML = '';
      lineIndex = 0;
      typeNextLine();
    }, 2500);
    return;
  }
  const line = logLines[lineIndex];
  const div = document.createElement('div');
  div.className = `console__line ${line.type}`;
  div.innerHTML = `<span class="time">${line.time}</span><span class="tag">${line.tag}</span> ${line.text}`;
  consoleBody.appendChild(div);
  lineIndex++;
  setTimeout(typeNextLine, 650);
}
typeNextLine();

// Animated stat counters (trigger once visible)
const statNums = document.querySelectorAll('.stat__num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statNums.forEach(el => statObserver.observe(el));

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 900;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}
