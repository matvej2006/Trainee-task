const btnLearnMore = document.getElementById('vid-btn-1'); 
const btnPlayVideo = document.getElementById('vid-btn-2'); 

const overlay = document.getElementById('popupOverlay');
const popupLearnMore = document.getElementById('popupLearnMore');
const popupPlayVideo = document.getElementById('popupPlayVideo');
const modalPlayer = document.getElementById('modalPlayer'); 
const closeButtons = document.querySelectorAll('.popup-close-btn');

function openPopup(popupElement) {
    overlay.classList.add('active');
    popupElement.style.display = 'block';
    setTimeout(() => {
        popupElement.classList.add('active');
    }, 10);
}

// Функция закрытия всех окон
function closeAllPopups() {
    overlay.classList.remove('active');
    popupLearnMore.classList.remove('active');
    popupPlayVideo.classList.remove('active');
    if (modalPlayer) {
        modalPlayer.pause();
    }
    setTimeout(() => {
        popupLearnMore.style.display = 'none';
        popupPlayVideo.style.display = 'none';
    }, 400);
}

if (btnLearnMore && popupLearnMore) {
    btnLearnMore.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup(popupLearnMore);
    });
}

if (btnPlayVideo && popupPlayVideo) {
    btnPlayVideo.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup(popupPlayVideo);
        if (modalPlayer) {
            modalPlayer.play().catch(() => {});
        }
    });
}

closeButtons.forEach(btn => {
    btn.addEventListener('click', closeAllPopups);
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeAllPopups();
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeAllPopups();
    }
})