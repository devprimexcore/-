// ========== GLOBAL ELEMENTS ==========
const modeSelect = document.getElementById('mode');
const encodeBtn = document.getElementById('encode-btn');
const decodeBtn = document.getElementById('decode-btn');
const inputArea = document.getElementById('input-text');
const outputArea = document.getElementById('output-text');
const copyBtn = document.getElementById('copy-btn');
const statusMsg = document.getElementById('status');
const loader = document.getElementById('loader');

// ========== UTILITIES ==========
function showStatus(message, type = 'info') {
  statusMsg.textContent = message;
  statusMsg.style.color = type === 'error' ? '#ff4d4d' : '#00f2ff';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showLoader(show = true) {
  loader.style.display = show ? 'inline-block' : 'none';
}

function copyToClipboard() {
  if (outputArea.value.trim() === '') {
    showStatus('Output is empty.', 'error');
    return;
  }
  outputArea.select();
  document.execCommand('copy');
  showStatus('Copied to clipboard ✅');
}

// ========== CORE ALGORITHMS ==========
function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function base64Decode(str) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    throw new Error('Invalid Base64');
  }
}

function rot13(str) {
  return str.replace(/[a-zA-Z]/g, c =>
    String.fromCharCode(
      c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
    )
  );
}

function reverse(str) {
  return str.split('').reverse().join('');
}

function hexEncode(str) {
  return str.split('').map(c => c.charCodeAt(0).toString(16)).join('');
}
function hexDecode(hex) {
  return hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
}

function binaryEncode(str) {
  return str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}
function binaryDecode(bin) {
  return bin.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
}

// ========== ACTIONS ==========
async function encodeHandler() {
  const mode = modeSelect.value;
  const input = inputArea.value.trim();
  if (!input) return showStatus('Please enter some text.', 'error');

  showLoader(true);
  await sleep(600);
  let result;
  try {
    switch (mode) {
      case 'base64': result = base64Encode(input); break;
      case 'rot13': result = rot13(input); break;
      case 'reverse': result = reverse(input); break;
      case 'hex': result = hexEncode(input); break;
      case 'binary': result = binaryEncode(input); break;
      default: throw new Error('Unsupported encoding method');
    }
    outputArea.value = result;
    showStatus('Encoding successful ✅');
  } catch (e) {
    showStatus(e.message, 'error');
  }
  showLoader(false);
}

async function decodeHandler() {
  const mode = modeSelect.value;
  const input = inputArea.value.trim();
  if (!input) return showStatus('Please paste encoded text.', 'error');

  showLoader(true);
  await sleep(600);
  let result;
  try {
    switch (mode) {
      case 'base64': result = base64Decode(input); break;
      case 'rot13': result = rot13(input); break;
      case 'reverse': result = reverse(input); break;
      case 'hex': result = hexDecode(input); break;
      case 'binary': result = binaryDecode(input); break;
      default: throw new Error('Unsupported decoding method');
    }
    outputArea.value = result;
    showStatus('Decoding successful ✅');
  } catch (e) {
    showStatus(e.message, 'error');
  }
  showLoader(false);
}

// ========== AUTO-DETECT FUNCTIONALITY ==========
function autoDetectAndDecode(text) {
  const guesses = [];

  try { guesses.push(['Base64', base64Decode(text)]); } catch {}
  try { guesses.push(['Hex', hexDecode(text)]); } catch {}
  try { guesses.push(['Binary', binaryDecode(text)]); } catch {}
  try { guesses.push(['Rot13', rot13(text)]); } catch {}

  return guesses;
}

// ========== EVENT BINDINGS ==========
encodeBtn.addEventListener('click', encodeHandler);
decodeBtn.addEventListener('click', decodeHandler);
copyBtn.addEventListener('click', copyToClipboard);

// ========== INITIALIZATION ==========
showStatus('Ready to encode/decode. Choose your method ⚔️');
showLoader(false);
