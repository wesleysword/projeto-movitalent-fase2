document.addEventListener('DOMContentLoaded', () => {
    setupProfileForm();
    setupLogout();
});

function setupProfileForm() {
    const form = document.getElementById('profile-form');
    if (!form) return;

    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {
        cep: '', street: '', number: '', city: 'São Paulo', state: 'SP'
    };

    document.getElementById('profileCep').value = savedProfile.cep;
    document.getElementById('profileStreet').value = savedProfile.street;
    document.getElementById('profileNumber').value = savedProfile.number;
    document.getElementById('profileCity').value = savedProfile.city;
    document.getElementById('profileState').value = savedProfile.state;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('btn-save-profile');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Salvando...';
        btn.disabled = true;

        const updatedProfile = {
            cep: document.getElementById('profileCep').value,
            street: document.getElementById('profileStreet').value,
            number: document.getElementById('profileNumber').value,
            city: document.getElementById('profileCity').value,
            state: document.getElementById('profileState').value
        };

        setTimeout(() => {
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            btn.innerHTML = originalText;
            btn.disabled = false;
            showToast('Perfil atualizado com sucesso!');
        }, 800);
    });
}

function showToast(message) {
    const toast = document.getElementById('action-toast');
    toast.querySelector('.toast-body').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function setupLogout() {
    const logoutBtn = document.getElementById('sidebar-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = '../index.html';
        });
    }
}