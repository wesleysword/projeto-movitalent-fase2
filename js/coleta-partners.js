import { initialPartners } from '../data/coleta-partners.js';

document.addEventListener('DOMContentLoaded', () => {
    setupPartners();
    setupLogout();
});

function setupPartners() {
    const grid = document.getElementById('partner-grid-container');
    const searchInput = document.getElementById('partner-search-input');
    
    const renderPartners = (list) => {
        if (!grid) return;
        grid.innerHTML = '';

        if (list.length === 0) {
            grid.innerHTML = `<div class="text-center py-4 text-muted w-100">Nenhum ponto de coleta localizado para os critérios informados.</div>`;
            return;
        }

        list.forEach(partner => {
            const card = document.createElement('div');
            card.className = 'partner-card';
            card.innerHTML = `
                <div>
                    <h5 class="partner-name">${partner.name}</h5>
                    <div class="partner-location">
                        <i class="bi bi-geo-alt-fill"></i> ${partner.address} - ${partner.city}/${partner.state}
                    </div>
                    <div class="partner-badge-container">
                        ${partner.types.map(t => `<span class="partner-badge">${t}</span>`).join('')}
                    </div>
                </div>
                <div>
                    <div class="partner-info-item">
                        <i class="bi bi-clock"></i> <span>${partner.schedule}</span>
                    </div>
                    <div class="partner-info-item">
                        <i class="bi bi-telephone"></i> <span>${partner.phone}</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = initialPartners.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.city.toLowerCase().includes(query) ||
                p.types.some(t => t.toLowerCase().includes(query))
            );
            renderPartners(filtered);
        });
    }

    renderPartners(initialPartners);
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