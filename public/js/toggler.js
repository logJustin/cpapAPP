// declare variables
const toggle = document.querySelector('#flexSwitchCheckDefault');
const mainSection = document.querySelector('.mainSection');

// Function to toggle between light and dark mode
function toggleMode(isDarkMode) {
    let textElements, iconElements, buttonElements, menu;

    if (isDarkMode) {
        textElements = document.querySelectorAll('.text-dark');
        iconElements = document.querySelectorAll('.initialIconsDark');
        buttonElements = document.querySelectorAll('.btn-dark');
        menu = document.querySelector('.dropdown-menu');

        mainSection.classList.add('mainSectionDark');
        menu.classList.add('dropdown-menu-dark');
        menu.classList.remove('dropdown-menu-light');
    } else {
        textElements = document.querySelectorAll('.text-light');
        iconElements = document.querySelectorAll('.initialIcons');
        buttonElements = document.querySelectorAll('.btn-light');
        menu = document.querySelector('.dropdown-menu');

        mainSection.classList.remove('mainSectionDark');
        menu.classList.add('dropdown-menu-light');
        menu.classList.remove('dropdown-menu-dark');
    }

    textElements.forEach(x => {
        x.classList.add(isDarkMode ? 'text-light' : 'text-dark');
        x.classList.remove(isDarkMode ? 'text-dark' : 'text-light');
    });

    iconElements.forEach(x => {
        x.classList.add(isDarkMode ? 'initialIcons' : 'initialIconsDark');
        x.classList.remove(isDarkMode ? 'initialIconsDark' : 'initialIcons');
    });

    buttonElements.forEach(x => {
        x.classList.add(isDarkMode ? 'btn-light' : 'btn-dark');
        x.classList.remove(isDarkMode ? 'btn-dark' : 'btn-light');
    });
}

// Check local storage for darkMode value or default to true (dark mode)
const isDarkMode = localStorage.getItem('darkMode') !== 'false';

// Set the checked attribute of the toggle based on isDarkMode
toggle.checked = isDarkMode;

// Initialize the mode
toggleMode(isDarkMode);

// Add event listener to toggle mode
toggle.addEventListener('change', function () {
    toggleMode(toggle.checked);
    localStorage.setItem('darkMode', toggle.checked ? 'true' : 'false');
});
