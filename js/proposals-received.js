import { initialProposals } from '../data/proposals.js';

document.addEventListener('DOMContentLoaded', () => {
    setupProposals();
    setupLogout();
});

function setupProposals() {
    let proposals = JSON.parse(localStorage.getItem('ecoTradeProposals'));
    
    if (!proposals || proposals.length === 0) {
        proposals = initialProposals;
        localStorage.setItem('ecoTradeProposals', JSON.stringify(proposals));
    }

    renderProposals(proposals);

    window.updateProposalStatus = (id, newStatus) => {
        let currentProposals = JSON.parse(localStorage.getItem('ecoTradeProposals')) || [];
        const index = currentProposals.findIndex(p => p.id === id);
        
        if (index !== -1) {
            currentProposals[index].status = newStatus;
            localStorage.setItem('ecoTradeProposals', JSON.stringify(currentProposals));
            renderProposals(currentProposals);
        }
    };
}

function renderProposals(proposals) {
    const tbody = document.getElementById('proposals-received-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (proposals.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Nenhuma proposta recebida até o momento.</td></tr>`;
        return;
    }

    proposals.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));

    proposals.forEach(prop => {
        const typeBadge = getTypeBadge(prop.type, prop.amount);
        const statusBadge = getStatusBadge(prop.status);
        
        let actionButtons = '';
        if (prop.status === 'pending') {
            actionButtons = `
                <button type="button" class="btn-action-icon btn-accept me-1" title="Aceitar Proposta" onclick="updateProposalStatus(${prop.id}, 'accepted')">
                    <i class="bi bi-check-lg"></i>
                </button>
                <button type="button" class="btn-action-icon btn-reject" title="Recusar Proposta" onclick="updateProposalStatus(${prop.id}, 'rejected')">
                    <i class="bi bi-x-lg"></i>
                </button>
            `;
        } else {
            actionButtons = `<span class="text-muted small fw-semibold">Finalizado</span>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold" style="color: var(--color-primary);">${prop.itemName}</td>
            <td>${prop.user}</td>
            <td>${typeBadge}</td>
            <td>${prop.date}</td>
            <td>${statusBadge}</td>
            <td>${actionButtons}</td>
        `;
        tbody.appendChild(tr);
    });
}

function getTypeBadge(type, amount) {
    if (type === 'free') return `<span class="badge" style="background-color: var(--color-primary);">Retirada Grátis</span>`;
    if (type === 'pay') return `<span class="badge bg-success">Paga R$ ${parseFloat(amount).toFixed(2)}</span>`;
    if (type === 'charge') return `<span class="badge text-white" style="background-color: var(--color-secondary);">Cobra R$ ${parseFloat(amount).toFixed(2)}</span>`;
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