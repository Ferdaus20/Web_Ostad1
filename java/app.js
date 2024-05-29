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
            if (element.classList.contains('price-value1')) {
                let value = parseInt(element.textContent.replace('$', ''), 10);
                if (increment) {
                    value += 199;
                    element.textContent = `$${value}`;
                } else if (value > 199) {
                    value -= 199;
                    element.textContent = `$${value}`;
                }
            } else if (element.classList.contains('price-value2')) {
                let value = parseInt(element.textContent.replace('$', ''), 10);
                if (increment) {
                    value += 249;
                    element.textContent = `$${value}`;
                } else if (value > 249) {
                    value -= 249;
                    element.textContent = `$${value}`;
                }
            } else if (element.classList.contains('room-value1') || element.classList.contains('room-value2')) {
                let roomValue = parseInt(element.textContent, 10);
                if (increment) {
                    roomValue += 1;
                    element.textContent = `${roomValue}`;
                } else if (roomValue > 1) { // Assuming the minimum room value is 1
                    roomValue -= 1;
                    element.textContent = `${roomValue}`;
                }
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
        updateValue('.price-basic.price-value1', true);
        updateValue('.room-value1', true);
    });

    document.querySelector('.negative1').addEventListener('click', () => {
        updateValue('.price-basic.price-value1', false);
        updateValue('.room-value1', false);
    });

    // Event listeners for + and - buttons for Pro plan
    document.querySelector('.positive2').addEventListener('click', () => {
        updateValue('.price-pro.price-value2', true);
        updateValue('.room-value2', true);
    });

    document.querySelector('.negative2').addEventListener('click', () => {
        updateValue('.price-pro.price-value2', false);
        updateValue('.room-value2', false);
    });


    // Toggle sign-up message and button styles for Basic plan
    toggleSignUpMessage('.sign-up1', '.sign-up-msg1', 'signUp1ClickCount');

    // Toggle sign-up message and button styles for Pro plan
    toggleSignUpMessage('.sign-up2', '.sign-up-msg2', 'signUp2ClickCount');
});
