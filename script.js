// Crypto Engine by primexcore 🔒
// Core functions for Encoding & Decoding

// ===========================
// Base64
// ===========================
function encodeBase64(input) {
  return btoa(unescape(encodeURIComponent(input)));
}
function decodeBase64(input) {
  return decodeURIComponent(escape(atob(input)));
}

// ===========================
// ROT13
// ===========================
function rot13(input) {
  return input.replace(/[a-zA-Z]/g, c =>
    String.fromCharCode(
      c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
    )
  );
}

// ===========================
// Caesar Cipher
// ===========================
function caesarEncrypt(text, shift = 3) {
  return text.replace(/[a-z]/gi, c =>
    String.fromCharCode(
      ((c.charCodeAt(0) - (c.toLowerCase() < 'a' ? 65 : 97) + shift) % 26) +
      (c.toLowerCase() < 'a' ? 65 : 97)
    )
  );
}
function caesarDecrypt(text, shift = 3) {
  return caesarEncrypt(text, 26 - shift);
}

// ===========================
// Hex Encode / Decode
// ===========================
function encodeHex(input) {
  return [...input].map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}
function decodeHex(hex) {
  return hex.match(/.{1,2}/g).map(h => String.fromCharCode(parseInt(h, 16))).join('');
}

// ===========================
// Binary Encode / Decode
// ===========================
function encodeBinary(input) {
  return input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}
function decodeBinary(binary) {
  return binary.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
}

// ===========================
// Morse Code
// ===========================
const morse = {
  A: '.-', B: '-...', C: '-.-.', D: '-..',
  E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-',
  U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--',
  4: '....-', 5: '.....', 6: '-....', 7: '--...',
  8: '---..', 9: '----.',
  ' ': '/', '.': '.-.-.-', ',': '--..--'
};
const reverseMorse = Object.fromEntries(Object.entries(morse).map(([k, v]) => [v, k]));

function encodeMorse(input) {
  return input.toUpperCase().split('').map(c => morse[c] || '').join(' ');
}
function decodeMorse(code) {
  return code.split(' ').map(symbol => reverseMorse[symbol] || '').join('');
}

// ===========================
// URL Encode / Decode
// ===========================
function encodeURL(input) {
  return encodeURIComponent(input);
}
function decodeURL(input) {
  return decodeURIComponent(input);
}

// ===========================
// Simple XOR Encrypt / Decrypt
// ===========================
function xorEncrypt(input, key = 'k') {
  return [...input].map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join('');
}

// ===========================
// Hash Functions using SubtleCrypto
// ===========================
async function hashSHA256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// ===========================
// UI Handling
// ===========================
async function process(mode) {
  const input = document.getElementById('input').value;
  const algo = document.getElementById('algorithm').value;
  const output = document.getElementById('output');
  let result = '';

  try {
    switch (algo) {
      case 'base64':
        result = mode === 'encode' ? encodeBase64(input) : decodeBase64(input);
        break;
      case 'rot13':
        result = rot13(input);
        break;
      case 'caesar':
        result = mode === 'encode' ? caesarEncrypt(input, 5) : caesarDecrypt(input, 5);
        break;
      case 'hex':
        result = mode === 'encode' ? encodeHex(input) : decodeHex(input);
        break;
      case 'binary':
        result = mode === 'encode' ? encodeBinary(input) : decodeBinary(input);
        break;
      case 'morse':
        result = mode === 'encode' ? encodeMorse(input) : decodeMorse(input);
        break;
      case 'url':
        result = mode === 'encode' ? encodeURL(input) : decodeURL(input);
        break;
      case 'xor':
        result = xorEncrypt(input, 'p');
        break;
      case 'sha256':
        result = await hashSHA256(input);
        break;
      default:
        result = 'Unknown algorithm.';
    }
  } catch (e) {
    result = `Error: ${e.message}`;
  }

  output.value = result;
                                                                   }
