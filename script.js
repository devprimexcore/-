function base64Encode() {
  const input = document.getElementById('input').value;
  const encoded = btoa(unescape(encodeURIComponent(input)));
  document.getElementById('output').value = encoded;
}

function base64Decode() {
  const input = document.getElementById('input').value;
  try {
    const decoded = decodeURIComponent(escape(atob(input)));
    document.getElementById('output').value = decoded;
  } catch (e) {
    document.getElementById('output').value = '❌ خطأ في التشفير Base64.';
  }
}

function rot13() {
  const input = document.getElementById('input').value;
  const output = input.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode(
      c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
    );
  });
  document.getElementById('output').value = output;
}

function reverse() {
  const input = document.getElementById('input').value;
  document.getElementById('output').value = input.split('').reverse().join('');
}

function xorEncrypt() {
  const input = document.getElementById('input').value;
  const key = 13;
  let result = '';
  for (let i = 0; i < input.length; i++) {
    result += String.fromCharCode(input.charCodeAt(i) ^ key);
  }
  document.getElementById('output').value = btoa(result);
}

function xorDecrypt() {
  const input = document.getElementById('input').value;
  const key = 13;
  try {
    const decoded = atob(input);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key);
    }
    document.getElementById('output').value = result;
  } catch (e) {
    document.getElementById('output').value = '❌ خطأ في فك تشفير XOR.';
  }
}
