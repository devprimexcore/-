// ======================
// ⚙️ AUTO-DETECT & DECODE
// ======================

const autoBtn = document.getElementById('auto-detect-btn');

autoBtn.addEventListener('click', () => {
  const input = inputArea.value.trim();
  if (!input) return showStatus('Please paste encoded text.', 'error');

  const guesses = autoDetectAndDecode(input);
  if (guesses.length === 0) {
    showStatus('Unable to decode. No matches found.', 'error');
    return;
  }

  outputArea.value = '';
  guesses.forEach(([label, decoded], i) => {
    outputArea.value += `[${label}] → ${decoded}${i !== guesses.length - 1 ? '\n\n' : ''}`;
  });

  showStatus('Auto-detection complete');
});

// ======================
// 🔄 STATUS ANIMATION
// ======================

const loader = document.getElementById('loader');
let dots = 0;

setInterval(() => {
  if (loader.style.display === 'inline-block') {
    dots = (dots + 1) % 4;
    loader.innerHTML = '<i class="fas fa-cog fa-spin"></i>'.repeat(dots + 1);
  } else {
    loader.innerHTML = '';
    dots = 0;
  }
}, 300);

// ======================
// ⚔️ ADVANCED ENGINES
// ======================

const futureHooks = {
  xor: (str, key = 'secret') => {
    return str
      .split('')
      .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length)))
      .join('');
  },
  caesar: (str, shift = 3) => {
    return str.replace(/[a-z]/gi, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
    });
  }
};

// ======================
// 🔬 CONSOLE ACCESS
// ======================

window.__prime_core = {
  xor: futureHooks.xor,
  caesar: futureHooks.caesar,
  rawDecode: autoDetectAndDecode,
  log: (...args) => console.log('[PRIMEX-CORE]:', ...args)
};

console.log('%c[PRIMEX-CORE] Extras Module Loaded', 'color: cyan; font-weight: bold');
