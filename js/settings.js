document.addEventListener('DOMContentLoaded', () => {
    setupSettingsForm();
    setupLogout();
});

function setupSettingsForm() {
    const form = document.getElementById('settings-form');
    if (!form) return;

    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {
        emailNotif: true, smsNotif: false, publicProfile: true
    };

    document.getElementById('emailNotif').checked = savedSettings.emailNotif;
    document.getElementById('smsNotif').checked = savedSettings.smsNotif;
    document.getElementById('publicProfile').checked = savedSettings.publicProfile;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('btn-save-settings');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Salvando...';
        btn.disabled = true;

        const updatedSettings = {
            emailNotif: document.getElementById('emailNotif').checked,
            smsNotif: document.getElementById('smsNotif').checked,
            publicProfile: document.getElementById('publicProfile').checked
        };

        setTimeout(() => {
            localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
            btn.innerHTML = originalText;
            btn.disabled = false;
            showToast('Configurações salvas com sucesso!');
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