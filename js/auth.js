const loginForm = document.getElementById('login-section');
const registerForm = document.getElementById('register-section');
const btnShowRegister = document.getElementById('show-register');
const btnShowLogin = document.getElementById('show-login');

initApp();

function initApp() {
    if (!loginForm || !registerForm || !btnShowRegister || !btnShowLogin) {
        console.error('⚙️ EcoTrade: Elementos de autenticação não encontrados na página.');
        return;
    }

    btnShowRegister.addEventListener('click', (e) => {
        e.preventDefault();
        switchToRegister();
    });

    btnShowLogin.addEventListener('click', (e) => {
        e.preventDefault();
        switchToLogin();
    });

    checkInitialState();
    
    window.addEventListener('hashchange', checkInitialState);
}

function checkInitialState() {
    if (window.location.hash === '#register') {
        switchToRegister();
    } else {
        switchToLogin();
    }
}

function switchToRegister() {
    loginForm.classList.add('d-none');
    registerForm.classList.remove('d-none');
    window.location.hash = '#register'; 
}

function switchToLogin() {
    registerForm.classList.add('d-none');
    loginForm.classList.remove('d-none');
    history.replaceState("", document.title, window.location.pathname + window.location.search);
}