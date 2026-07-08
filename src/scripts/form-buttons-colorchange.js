document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.form-btns');
    const btnPersonal = document.querySelector('.form-btn-1');
    const btnBusiness = document.querySelector('.form-btn-2');

    // Клик на Personal — убираем фиолетовый режим для Business
    btnPersonal.addEventListener('click', () => {
        container.classList.remove('business-active');
    });

    // Клик на Business — включаем фиолетовый режим для Business
    btnBusiness.addEventListener('click', () => {
        container.classList.add('business-active');
    });
});