// declare variables
const toggle = document.querySelector('#flexSwitchCheckDefault')
const mainSection = document.querySelector('.mainSection')
// toggler logic to switch between light and dark mode
toggle.addEventListener('change', function () {
    if (toggle.checked) {
        let lightText = document.querySelectorAll('.text-light')
        mainSection.classList.toggle('mainSectionDark');

        [...lightText].forEach(x => {
            x.classList.add('text-dark');
            x.classList.remove('text-light');
        });

    } else {
        let darkText = document.querySelectorAll('.text-dark')
        mainSection.classList.toggle('mainSectionDark');

        [...darkText].forEach(x => {
            x.classList.add('text-light');
            x.classList.remove('text-dark');
        });

    }
})