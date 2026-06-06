import { initialSentProposals } from '../data/proposals-sent.js';

document.addEventListener('DOMContentLoaded', () => {
    setupSentProposals();
    setupLogout();
});

function setupSentProposals() {
    let sentProposals = JSON.parse(localStorage.getItem('ecoTradeSentProposals'));
    
    if (!sentProposals || sentProposals.length === 0) {
        sentProposals = initialSentProposals;
        localStorage.setItem('ecoTradeSentProposals', JSON.stringify(sentProposals));
    }

    let allProposals = [...sentProposals];
    
    const recentSent = JSON.parse(localStorage.getItem('ecoTradeProposals'));
    if (recentSent && recentSent.length > 0) {
        const recentMapped = recentSent.map(p => ({
            id: p.id,
            itemName: p.itemName,
            advertiser: "Anunciante", 
            type: p.type,
            amount: p.amount,
            status: p.status,
            date: p.date
        }));
        
        recentMapped.forEach(newProp => {
            if (!allProposals.find(existing => existing.id === newProp.id)) {
                allProposals.unshift(newProp);
            }
        });
        
        localStorage.setItem('ecoTradeSentProposals', JSON.stringify(allProposals));
    }

    renderSentProposals(allProposals);

    window.cancelProposal = (id) => {
        if (confirm("Tem certeza que deseja cancelar esta proposta?")) {
            let currentProposals = JSON.parse(localStorage.getItem('ecoTradeSentProposals')) || [];
            currentProposals = currentProposals.filter(p => p.id !== id);
            localStorage.setItem('ecoTradeSentProposals', JSON.stringify(currentProposals));
            renderSentProposals(currentProposals);
        }
    };
}

function renderSentProposals(proposals) {
    const tbody = document.getElementById('proposals-sent-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (proposals.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Você ainda não enviou nenhuma proposta.</td></tr>`;
        return;
    }

    proposals.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));

    proposals.forEach(prop => {
        const typeBadge = getTypeBadge(prop.type, prop.amount);
        const statusBadge = getStatusBadge(prop.status);
        
        let actionButtons = '';
        if (prop.status === 'pending') {
            actionButtons = `
                <button type="button" class="btn-action-icon btn-delete" title="Cancelar Proposta" onclick="cancelProposal(${prop.id})">
                    <i class="bi bi-trash"></i>
                </button>
            `;
        } else {
            actionButtons = `<span class="text-muted small fw-semibold">Encerrada</span>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold" style="color: var(--color-primary);">${prop.itemName}</td>
            <td>${prop.advertiser}</td>
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
    if (type === 'pay') return `<span class="badge bg-success">Pago R$ ${parseFloat(amount).toFixed(2)}</span>`;
    if (type === 'charge') return `<span class="badge text-white" style="background-color: var(--color-secondary);">Cobro R$ ${parseFloat(amount).toFixed(2)}</span>`;
    return '';
}

function getStatusBadge(status) {
    if (status === 'pending') return `<span class="badge bg-warning text-dark">Aguardando Resposta</span>`;
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