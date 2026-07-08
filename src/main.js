import './style.css'
import './styles/tablet-style.css'
import './styles/mobile-style.css'
import './scripts/round-list.js'
import './scripts/crypto-ws.js'
import './scripts/word-by-word-anim.js'
import './scripts/pop-ups.js'
import './scripts/tablet-menu.js'
import './scripts/form-buttons-colorchange.js'

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');

    if (userParam) {
        const userData = JSON.parse(decodeURIComponent(userParam));
        console.log("Ура, мы вошли!", userData);
        localStorage.setItem('user', JSON.stringify(userData));
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});