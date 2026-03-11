// drift field - particles that float upward like lost signals
const field = document.querySelector('.drift-field');
if (!field) throw new Error('no drift field');

let burstMode = false;

function spawnParticle(options = {}) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const x = options.x ?? Math.random() * 100;
    const duration = options.fast
        ? 2 + Math.random() * 3
        : 6 + Math.random() * 8;
    const dx = (Math.random() - 0.5) * (options.fast ? 120 : 80);

    p.style.left = x + '%';
    p.style.bottom = options.bottom ?? '0';
    p.style.setProperty('--dx', dx + 'px');
    p.style.animationDuration = duration + 's';

    const size = options.fast
        ? 1 + Math.random() * 3
        : 1 + Math.random() * 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';

    // color variation
    if (burstMode) {
        const colors = ['#c6a07a', '#9ab0cc', '#cc9a9a', '#a0cc9a', '#7a9cc6'];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
    } else if (Math.random() > 0.85) {
        p.style.background = '#c6a07a';
    }

    field.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
}

// steady stream
setInterval(() => {
    spawnParticle(burstMode ? { fast: true } : {});
    if (burstMode) {
        spawnParticle({ fast: true });
        spawnParticle({ fast: true });
    }
}, burstMode ? 80 : 300);

// initial burst
for (let i = 0; i < 12; i++) {
    setTimeout(spawnParticle, i * 80);
}

// mouse interaction
field.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.6) return;
    const rect = field.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const bottom = ((rect.bottom - e.clientY) / rect.height) * 100 + '%';
    spawnParticle({ x, bottom });
});

// easter egg: type "2014" anywhere on the page to trigger a burst
let keyBuffer = '';
document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    keyBuffer += e.key;
    if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);

    if (keyBuffer.includes('2014')) {
        keyBuffer = '';
        triggerBurst();
    }
});

function triggerBurst() {
    burstMode = true;
    field.style.transition = 'border-color 0.3s ease';
    field.style.borderColor = '#2a2a3a';

    // intense particle spawn
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            spawnParticle({
                fast: true,
                x: 30 + Math.random() * 40,
                bottom: Math.random() * 30 + '%'
            });
        }, i * 50);
    }

    // settle after 3 seconds
    setTimeout(() => {
        burstMode = false;
        field.style.borderColor = '#1a1a1a';
    }, 3000);
}
