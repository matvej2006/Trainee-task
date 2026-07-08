const playBtn = document.querySelector('#vid-btn-2');
const videos = document.querySelectorAll('.split-video');

if (playBtn && videos.length > 0) {
    const btnText = playBtn.querySelector('.vid-btn-text');
    const btnIconContainer = playBtn.querySelector('.vid-btn-icon-2');

    const playIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    const pauseIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;

    btnText.textContent = 'Pause Video';
    btnIconContainer.innerHTML = pauseIcon;

    playBtn.addEventListener('click', () => {
        if (videos[0].paused) {
            videos.forEach(video => video.play());
            videos[1].currentTime = videos[0].currentTime;
            btnText.textContent = 'Pause Video';
            btnIconContainer.innerHTML = pauseIcon;
        } else {
            videos.forEach(video => video.pause());
            btnText.textContent = 'Play Video';
            btnIconContainer.innerHTML = playIcon;
        }
    });
}