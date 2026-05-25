/**
 * Arquivo: auth.js
 * Descrição: Gerencia a lógica da página de autenticação (Alternância entre Login e Cadastro)
 */

// Elementos do DOM
const loginForm = document.getElementById('login-section');
const registerForm = document.getElementById('register-section');
const btnShowRegister = document.getElementById('show-register');
const btnShowLogin = document.getElementById('show-login');

// Como usamos type="module" no HTML, o DOM já está pronto quando este script roda.
// Inicializamos a aplicação imediatamente.
initApp();

function initApp() {
    // Trava de segurança: Se os elementos não existirem, o script para aqui e avisa no console.
    if (!loginForm || !registerForm || !btnShowRegister || !btnShowLogin) {
        console.error('⚙️ EcoTrade: Elementos de autenticação não encontrados na página.');
        return;
    }

    // Ações de clique nos botões internos
    btnShowRegister.addEventListener('click', (e) => {
        e.preventDefault();
        switchToRegister();
    });

    btnShowLogin.addEventListener('click', (e) => {
        e.preventDefault();
        switchToLogin();
    });

    // Verifica o estado inicial (se veio com #register na URL)
    checkInitialState();
    
    // Ouve mudanças na URL caso o usuário navegue pelos botões "voltar/avançar" do navegador
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
    // Limpa a URL de forma elegante
    history.replaceState("", document.title, window.location.pathname + window.location.search);
}