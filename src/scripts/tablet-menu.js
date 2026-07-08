const burgerBtn = document.getElementById('burgerBtn');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-elem');

if (burgerBtn && mobileMenuBackdrop) {
    
    burgerBtn.addEventListener('click', () => {
        mobileMenuBackdrop.classList.add('active');
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenuBackdrop.classList.remove('active');
        });
    }

    mobileMenuBackdrop.addEventListener('click', (e) => {
        if (e.target === mobileMenuBackdrop) {
            mobileMenuBackdrop.classList.remove('active');
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBackdrop.classList.remove('active');
        });
    });
}