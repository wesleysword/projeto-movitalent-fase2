document.addEventListener('DOMContentLoaded', () => {
    renderNavbarState();
});

function renderNavbarState() {
    const navbarMenu = document.getElementById('navbar-menu');
    if (!navbarMenu) return;

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isSubPage = window.location.pathname.includes('/pages/');
    
    const basePath = isSubPage ? './' : './pages/';
    const homePath = isSubPage ? '../index.html' : 'index.html';

    const commonLinks = `
        <li class="nav-item d-flex align-items-center">
            <a class="nav-link text-white fw-semibold me-2" href="${basePath}how-it-works.html">Como Funciona</a>
        </li>
        <li class="nav-item d-flex align-items-center">
            <a class="nav-link text-white fw-semibold me-2" href="${basePath}items.html">Explorar Itens</a>
        </li>
        <li class="nav-item d-flex align-items-center">
            <a class="nav-link text-white fw-semibold me-3" href="${basePath}privacy-policy.html">Políticas</a>
        </li>
    `;

    if (isLoggedIn) {
        navbarMenu.innerHTML = `
            ${commonLinks}
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-white d-flex align-items-center gap-2 fw-semibold" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Avatar" class="rounded-circle" width="32" height="32" style="object-fit: cover; border: 2px solid var(--color-secondary);">
                    <span>Admin</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item fw-semibold" style="color: var(--color-primary);" href="${basePath}dashboard.html">Painel Administrativo</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item text-danger fw-semibold" id="btn-logout">Sair da Conta</button></li>
                </ul>
            </li>
        `;

        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = homePath;
            });
        }
    } else {
        navbarMenu.innerHTML = `
            ${commonLinks}
            <li class="nav-item">
                <a class="btn btn-outline-light rounded-pill px-4 fw-bold w-100" href="${basePath}auth.html">
                    Entrar
                </a>
            </li>
            <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                <a class="btn btn-custom-secondary rounded-pill px-4 fw-bold w-100" href="${basePath}auth.html#register">
                    Cadastro
                </a>
            </li>
        `;
    }
}