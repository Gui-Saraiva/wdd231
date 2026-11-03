const hambBtn = document.querySelector('#ham-btn');
const navlinks = document.querySelector("#nav-bar");

hambBtn.addEventListener('click', () => {
    hambBtn.classList.toggle('show');
    navlinks.classList.toggle('show');
})