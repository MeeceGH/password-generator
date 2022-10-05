const result = document.getElementById('result');
const lengthEl = document.getElementById('settings-length-number');
const uppercase = document.getElementById('settings-uppercase');
const lowercase = document.getElementById('settings-lowercase');
const numbers = document.getElementById('settings-numbers');
const symbols = document.getElementById('settings-symbols');
const submit = document.getElementById('settings-submit');
const clipboard = document.getElementById('clipboard');

function createAvailChars() {
    let availChars = [];

    if (lowercase.checked) {
        for (let index = 0; index < 26; index++) {
            availChars.push(97 + index);
        };
    }
    if (uppercase.checked) {
        for (let index = 0; index < 26; index++) {
            availChars.push(65 + index);
        };
    }
    if (numbers.checked) {
        for (let index = 0; index < 10; index++) {
            availChars.push(48 + index);
        };
    }
    if (symbols.checked) {
        for (let index = 0; index < 15; index++) {
            availChars.push(33 + index);
        };
        for (let index = 0; index < 7; index++) {
            availChars.push(58 + index);
        };
        for (let index = 0; index < 4; index++) {
            availChars.push(123 + index);
        };
    }

    return availChars;
}

function createPassword(availChars) {
    let password = '';

    if (lengthEl.value > 20) {
        lengthEl.value = 20;
    } else if (lengthEl.value < 8) {
        lengthEl.value = 8;
    };

    for (let index = 0; index < lengthEl.value; index++) {
        const randIndex = Math.floor(Math.random() * availChars.length);
        password += String.fromCharCode(availChars[randIndex]);
    };

    return password;
}

submit.addEventListener('click', () => {
    if (lowercase.checked || uppercase.checked || numbers.checked || symbols.checked) {
        const availChars = createAvailChars();
        const password = createPassword(availChars);
        result.textContent = password;
    } else {
        result.textContent = 'Please Check Something';
    }
});

clipboard.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = result.textContent;

    if (!password) { return };

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password Copied to Clipboard!');
})