// script.js — No-Emoji, Clean UI Version

const inputArea = document.getElementById("inputText");
const methodSelect = document.getElementById("methodSelect");
const runBtn = document.getElementById("runBtn");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");
const copyBtn = document.getElementById("copyBtn");
const lastResult = document.getElementById("lastResult");
const statusIcon = document.getElementById("statusIcon"); // New

function detectEncoding(str) {
    if (/^[A-Za-z0-9+/=]{10,}$/.test(str)) return "Base64 Decode";
    if (/^([0-9a-f]{2})+$/i.test(str.replace(/\s/g, ""))) return "Hex Decode";
    if (/^([01]{8}\s*)+$/.test(str.trim())) return "Binary Decode";
    if (/^(https?|%[0-9A-F]{2})/.test(str)) return "URL Decode";
    return null;
}

function showResult(text) {
    resultText.textContent = text;
    resultBox.classList.add("show");
    lastResult.style.display = "block";
    localStorage.setItem("lastInput", inputArea.value);
    localStorage.setItem("lastOutput", text);
}

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(resultText.textContent);
    copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-check" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg> Copied`;
    setTimeout(() => {
        copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg> Copy`;
    }, 1500);
});

runBtn.addEventListener("click", () => {
    const input = inputArea.value.trim();
    let selected = methodSelect.value;

    if (!input) {
        statusIcon.innerHTML = `<svg class="icon icon-alert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.607c.75 1.335-.213 2.994-1.742 2.994H3.48c-1.53 0-2.492-1.659-1.743-2.994L8.257 3.1zM9 13h2v2H9v-2zm0-6h2v4H9V7z" /></svg>`;
        alert("Please enter text to process.");
        return;
    }

    if (selected === "Auto Detect") {
        const detected = detectEncoding(input);
        if (detected) {
            selected = detected;
            methodSelect.value = detected;
        } else {
            statusIcon.innerHTML = `<svg class="icon icon-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M21.5 19.5l-9-15-9 15h18z" stroke="currentColor" stroke-width="2"/></svg>`;
            alert("Unable to detect format.");
            return;
        }
    }

    try {
        const methodFn = EncryptionMethods[selected];
        const output = methodFn(input);
        statusIcon.innerHTML = `<svg class="icon icon-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
        showResult(output);
    } catch (e) {
        statusIcon.innerHTML = `<svg class="icon icon-error" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2H9v-2zm0-6h2v4H9V7z" /></svg>`;
        showResult(`[Error] ${e.message}`);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const savedInput = localStorage.getItem("lastInput");
    const savedOutput = localStorage.getItem("lastOutput");
    if (savedInput) inputArea.value = savedInput;
    if (savedOutput) showResult(savedOutput);
});
