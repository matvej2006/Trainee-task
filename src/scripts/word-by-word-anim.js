document.addEventListener("DOMContentLoaded", () => {
    
    function animateTextByWords(selector) {
        const element = document.querySelector(selector);
        if (!element) return;

        const words = element.textContent.trim().split(/\s+/);
        element.innerHTML = words.map((word, index) => {
            return `<span class="word" style="--i: ${index}">${word}</span>`;
        }).join(' ');
    }

    animateTextByWords('.main-title');
    animateTextByWords('.sub-text');
});