const playBtn = document.getElementById('vid-btn-2');
const videos = document.querySelectorAll('.split-video');

if (playBtn && videos.length === 2) {
    const master = videos[0];
    const slave = videos[1]; 
    
    const btnText = playBtn.querySelector('.vid-btn-text');
    const btnIconContainer = playBtn.querySelector('.vid-btn-icon-2');

    const playIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    const pauseIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;

    btnText.textContent = 'Pause Video';
    btnIconContainer.innerHTML = pauseIcon;

    playBtn.addEventListener('click', () => {
        if (master.paused) {
            master.play();
        } else {
            master.pause();
        }
    });

    master.addEventListener('play', () => {
        slave.currentTime = master.currentTime;
        slave.play().catch(() => {}); 
        btnText.textContent = 'Pause Video';
        btnIconContainer.innerHTML = pauseIcon;
    });

    master.addEventListener('pause', () => {
        slave.pause();
        slave.currentTime = master.currentTime;
        
        btnText.textContent = 'Play Video';
        btnIconContainer.innerHTML = playIcon;
    });

    master.addEventListener('timeupdate', () => {
        const drift = Math.abs(master.currentTime - slave.currentTime);
        
        if (drift > 0.03) {
            slave.currentTime = master.currentTime;
        }
    });
}