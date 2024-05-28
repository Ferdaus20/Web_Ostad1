document.addEventListener('DOMContentLoaded', () => {
    const clickCounts = {
        signUp1ClickCount: 0,
        signUp2ClickCount: 0
    };

    // Define the $$ template literal tag function if it's not defined
    function $$(strings, ...values) {
        return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
    }

    // Function to update values
    function updateValue(selector, increment) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.classList.contains('price-value')) {
                let value = parseInt(element.textContent.replace('$', ''), 10);
                element.textContent = `\$${increment ? value + 1 : value - 1}`;
            } else if (element.classList.contains('room-value1') || element.classList.contains('room-value2')) {
                let value = parseInt(element.textContent, 10);
                element.textContent = increment ? value + 1 : value - 1;
            }
        });
    }

    // Function to toggle sign-up messages and button styles
    function toggleSignUpMessage(buttonSelector, msgSelector, clickCount) {
        const button = document.querySelector(buttonSelector);
        const message = document.querySelector(msgSelector);

        button.addEventListener('click', () => {
            clickCounts[clickCount]++;
            if (clickCounts[clickCount] % 2 === 1) { // Odd clicks
                message.style.display = 'block';
                button.style.color = 'black';
                button.style.backgroundColor = 'white';
            } else { // Even clicks
                message.style.display = 'none';
                button.style.color = ''; // Reset to original color
                button.style.backgroundColor = ''; // Reset to original background color
            }
        });
    }

    // Event listeners for + and - buttons for Basic plan
    document.querySelector('.positive1').addEventListener('click', () => {
        updateValue('.price-basic', true);
        updateValue('.room-value1', true);
    });

    document.querySelector('.negative1').addEventListener('click', () => {
        updateValue('.price-basic', false);
        updateValue('.room-value1', false);
    });

    // Event listeners for + and - buttons for Pro plan
    document.querySelector('.positive2').addEventListener('click', () => {
        updateValue('.price-pro', true);
        updateValue('.room-value2', true);
    });

    document.querySelector('.negative2').addEventListener('click', () => {
        updateValue('.price-pro', false);
        updateValue('.room-value2', false);
    });

    // Toggle sign-up message and button styles for Basic plan
    toggleSignUpMessage('.sign-up1', '.sign-up-msg1', 'signUp1ClickCount');

    // Toggle sign-up message and button styles for Pro plan
    toggleSignUpMessage('.sign-up2', '.sign-up-msg2', 'signUp2ClickCount');
});
