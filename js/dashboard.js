const mockDashboardData = {
    stats: { 
        totalItems: 12, 
        activeProposals: 5, 
        completedDeals: 34 
    },
    proposals: [
        { id: 101, item: "Sofá 3 Lugares", user: "Mariana Souza", type: "free", amount: 0, status: "pending", date: "26/05/2026" },
        { id: 102, item: "Madeira de Demolição", user: "Carlos Pereira", type: "pay", amount: 50, status: "accepted", date: "25/05/2026" },
        { id: 103, item: "Monitor CRT", user: "Letícia Ribeiro", type: "charge", amount: 30, status: "rejected", date: "24/05/2026" },
        { id: 104, item: "Lote de Telhas Coloniais", user: "Roberto Alves", type: "pay", amount: 150, status: "pending", date: "23/05/2026" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderProposals();
    setupLogout();
});

function renderStats() {
    const totalItemsEl = document.getElementById('stat-total-items');
    const activeProposalsEl = document.getElementById('stat-active-proposals');
    const completedDealsEl = document.getElementById('stat-completed-deals');

    if (totalItemsEl) totalItemsEl.textContent = mockDashboardData.stats.totalItems;
    if (activeProposalsEl) activeProposalsEl.textContent = mockDashboardData.stats.activeProposals;
    if (completedDealsEl) completedDealsEl.textContent = mockDashboardData.stats.completedDeals;
}

function renderProposals() {
    const tbody = document.getElementById('proposals-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    mockDashboardData.proposals.forEach(prop => {
        const typeBadge = getTypeBadge(prop.type, prop.amount);
        const statusBadge = getStatusBadge(prop.status);
        
        const actionButtons = prop.status === 'pending' 
            ? `<button class="btn-action-icon btn-accept me-1" title="Aceitar"><i class="bi bi-check-lg"></i></button>
               <button class="btn-action-icon btn-reject" title="Recusar"><i class="bi bi-x-lg"></i></button>`
            : '';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold" style="color: var(--color-primary);">${prop.item}</td>
            <td>${prop.user}</td>
            <td>${typeBadge}</td>
            <td>${prop.date}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn-action-icon btn-view me-1" title="Ver Detalhes"><i class="bi bi-eye"></i></button>
                ${actionButtons}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function getTypeBadge(type, amount) {
    if (type === 'free') return `<span class="badge" style="background-color: var(--color-primary);">Retirada Grátis</span>`;
    if (type === 'pay') return `<span class="badge bg-success">Paga R$ ${amount.toFixed(2)}</span>`;
    if (type === 'charge') return `<span class="badge text-white" style="background-color: var(--color-secondary);">Cobra R$ ${amount.toFixed(2)}</span>`;
    return '';
}

function getStatusBadge(status) {
    if (status === 'pending') return `<span class="badge bg-warning text-dark">Pendente</span>`;
    if (status === 'accepted') return `<span class="badge bg-success">Aceita</span>`;
    if (status === 'rejected') return `<span class="badge bg-danger">Recusada</span>`;
    return '';
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