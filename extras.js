// 🔐 extras.js — Contains full list of encryption and decryption algorithms

// Helper functions
function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
}

function xorEncrypt(str, key = 42) {
    return str.split("").map(c => String.fromCharCode(c.charCodeAt(0) ^ key)).join("");
}

function xorDecrypt(str, key = 42) {
    return xorEncrypt(str, key); // XOR is symmetric
}

function base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function base64Decode(str) {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (e) {
        return "[Invalid Base64]";
    }
}

function hexEncode(str) {
    return Array.from(str).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}

function hexDecode(hex) {
    try {
        return hex.match(/.{1,2}/g).map(h => String.fromCharCode(parseInt(h, 16))).join('');
    } catch (e) {
        return "[Invalid Hex]";
    }
}

function binaryEncode(str) {
    return str.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}

function binaryDecode(bin) {
    try {
        return bin.split(" ").map(b => String.fromCharCode(parseInt(b, 2))).join('');
    } catch (e) {
        return "[Invalid Binary]";
    }
}

function atbashCipher(str) {
    return str.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(base + (25 - (c.charCodeAt(0) - base)));
    });
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function caesarEncrypt(str, shift = 3) {
    return str.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
    });
}

function caesarDecrypt(str, shift = 3) {
    return caesarEncrypt(str, 26 - shift);
}

function urlEncode(str) {
    return encodeURIComponent(str);
}

function urlDecode(str) {
    try {
        return decodeURIComponent(str);
    } catch (e) {
        return "[Invalid URL Encoding]";
    }
}

// Dictionary of methods
const EncryptionMethods = {
    "Base64 Encode": base64Encode,
    "Base64 Decode": base64Decode,
    "Hex Encode": hexEncode,
    "Hex Decode": hexDecode,
    "Binary Encode": binaryEncode,
    "Binary Decode": binaryDecode,
    "ROT13": rot13,
    "Reverse": reverseString,
    "Atbash": atbashCipher,
    "Caesar Encrypt": caesarEncrypt,
    "Caesar Decrypt": caesarDecrypt,
    "XOR Encrypt": xorEncrypt,
    "XOR Decrypt": xorDecrypt,
    "URL Encode": urlEncode,
    "URL Decode": urlDecode
};
