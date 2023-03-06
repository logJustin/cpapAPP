// declare variables
const toggle = document.querySelector('#flexSwitchCheckDefault')
const mainSection = document.querySelector('.mainSection')
// toggler logic to switch between light and dark mode
toggle.addEventListener('change', function () {
    if (toggle.checked) {
        let lightIcons = document.querySelectorAll('.initialIcons')
        let lightText = document.querySelectorAll('.text-light')
        mainSection.classList.toggle('mainSectionDark');

        [...lightText].forEach(x => {
            x.classList.add('text-dark');
            x.classList.remove('text-light');
        });
        [...lightIcons].forEach(x => {
            x.classList.add('initialIconsDark');
            x.classList.remove('initialIcons');
        });

    } else {
        let darkText = document.querySelectorAll('.text-dark')
        let darkIcons = document.querySelectorAll('.initialIconsDark')
        mainSection.classList.toggle('mainSectionDark');

        [...darkText].forEach(x => {
            x.classList.add('text-light');
            x.classList.remove('text-dark');
        });
        [...darkIcons].forEach(x => {
            x.classList.add('initialIcons');
            x.classList.remove('initialIconsDark');
        });

    }
})