const loginFormSection = document.getElementById('login-section');
const registerFormSection = document.getElementById('register-section');
const btnShowRegister = document.getElementById('show-register');
const btnShowLogin = document.getElementById('show-login');
const formLogin = document.getElementById('form-login');

initApp();

function initApp() {
    if (!loginFormSection || !registerFormSection || !btnShowRegister || !btnShowLogin) {
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

    if (formLogin) {
        setupLoginSimulation();
    }

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
    loginFormSection.classList.add('d-none');
    registerFormSection.classList.remove('d-none');
    window.location.hash = '#register'; 
}

function switchToLogin() {
    registerFormSection.classList.add('d-none');
    loginFormSection.classList.remove('d-none');
    history.replaceState("", document.title, window.location.pathname + window.location.search);
}

function setupLoginSimulation() {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = document.getElementById('loginUsername').value;
        const pass = document.getElementById('loginPassword').value;
        const errorMsg = document.getElementById('login-error-msg');
        const submitBtn = formLogin.querySelector('.btn-submit');
        
        if (user === 'admin' && pass === 'admin') {
            errorMsg.classList.add('d-none');
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Autenticando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = './dashboard.html';
            }, 1200);
            
        } else {
            errorMsg.classList.remove('d-none');
            submitBtn.classList.add('bg-danger');
            setTimeout(() => {
                submitBtn.classList.remove('bg-danger');
            }, 500);
        }
    });
}