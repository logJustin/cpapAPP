// declare variables
const toggle = document.querySelector('#flexSwitchCheckDefault')
const mainSection = document.querySelector('.mainSection')
// toggler logic to switch between light and dark mode
toggle.addEventListener('change', function () {
    if (toggle.checked) {
        let lightIcons = document.querySelectorAll('.initialIcons')
        let lightText = document.querySelectorAll('.text-light')
        let lightBtn = document.querySelectorAll('.btn-light')
        let menu = document.querySelectorAll('.dropdown-menu')
        mainSection.classList.toggle('mainSectionDark');

        [...lightText].forEach(x => {
            x.classList.add('text-dark');
            x.classList.remove('text-light');
        });
        [...lightIcons].forEach(x => {
            x.classList.add('initialIconsDark');
            x.classList.remove('initialIcons');
        });
        [...lightBtn].forEach(x => {
            x.classList.add('btn-dark');
            x.classList.remove('btn-light');
        });
        menu[0].classList.add('dropdown-menu-light')
        menu[0].classList.remove('dropdown-menu-dark')

    } else {
        let darkText = document.querySelectorAll('.text-dark')
        let darkIcons = document.querySelectorAll('.initialIconsDark')
        let darkBtn = document.querySelectorAll('.btn-dark')
        let menu = document.querySelectorAll('.dropdown-menu')
        mainSection.classList.toggle('mainSectionDark');

        [...darkText].forEach(x => {
            x.classList.add('text-light');
            x.classList.remove('text-dark');
        });
        [...darkIcons].forEach(x => {
            x.classList.add('initialIcons');
            x.classList.remove('initialIconsDark');
        });
        [...darkBtn].forEach(x => {
            x.classList.add('btn-light');
            x.classList.remove('btn-dark');
        });
        menu[0].classList.add('dropdown-menu-dark')
        menu[0].classList.remove('dropdown-menu-light')

    }
})