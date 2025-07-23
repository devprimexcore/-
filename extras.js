// ======================
// 🔗 ELEMENT REFERENCES
// ======================
const inputArea = document.getElementById('input-text');
const outputArea = document.getElementById('output-text');
const autoBtn = document.getElementById('auto-detect-btn');
const loader = document.getElementById('loader');
const statusArea = document.getElementById('status');

// ======================
// 📣 STATUS SYSTEM
// ======================
function showStatus(message, type = 'info') {
  statusArea.textContent = message;
  statusArea.className = type;
}

// ======================
// 🧠 AUTO-DETECT CORE
// ======================
function autoDetectAndDecode(input) {
  const results = [];

  // Try Base64
  try {
    const b64 = atob(input);
    if (b64) results.push(['Base64', b64]);
  } catch {}

  // Try Hex
  try {
    const hexDecoded = input.match(/.{1,2}/g)
      ?.map(byte => String.fromCharCode(parseInt(byte, 16)))
      .join('');
    if (hexDecoded) results.push(['Hex', hexDecoded]);
  } catch {}

  // Try ROT13
  const rot13 = input.replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
  });
  if (rot13 && rot13 !== input) results.push(['ROT13', rot13]);

  return results;
}

// ======================
// ⚡ AUTO-DETECT HANDLER
// ======================
autoBtn.addEventListener('click', () => {
  const input = inputArea.value.trim();
  if (!input) return showStatus('Please paste encoded text.', 'error');

  loader.style.display = 'inline-block';
  showStatus('Detecting...', 'info');

  setTimeout(() => {
    const guesses = autoDetectAndDecode(input);
    loader.style.display = 'none';

    if (guesses.length === 0) {
      showStatus('Unable to decode. No matches found.', 'error');
      return;
    }

    outputArea.value = '';
    guesses.forEach(([label, decoded], i) => {
      outputArea.value += `🔍 ${label} → ${decoded}${i !== guesses.length - 1 ? '\n\n' : ''}`;
    });

    showStatus('Auto-detection complete ✔️', 'success');
  }, 500);
});

// ======================
// 🎞️ LOADER ANIMATION
// ======================
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
// 🚀 DEVELOPER TOOLS
// ======================
const futureHooks = {
  xor: (str, key = 'secret') =>
    str.split('').map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join(''),

  caesar: (str, shift = 3) =>
    str.replace(/[a-z]/gi, char => {
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
    })
};

window.__prime_core = {
  xor: futureHooks.xor,
  caesar: futureHooks.caesar,
  rawDecode: autoDetectAndDecode,
  log: (...args) => console.log('[PRIME-X]:', ...args)
};

console.log('%c[PRIMEX-CORE] Encryption Enhancer Loaded 🔒', 'color: cyan; font-weight: bold');
