document.addEventListener('DOMContentLoaded', () => {
    loadProposals();
});

function loadProposals() {
    const proposals = JSON.parse(localStorage.getItem('ecoTradeProposals')) || [];
    renderProposals(proposals);
}

function renderProposals(proposals) {
    const tbody = document.getElementById('proposals-received-tbody');
    tbody.innerHTML = '';

    if (proposals.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Nenhuma proposta recebida até o momento.</td></tr>`;
        return;
    }

    proposals.forEach(prop => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold">${prop.itemName}</td>
            <td>${prop.user}</td>
            <td>${getTypeBadge(prop.type, prop.amount)}</td>
            <td>${getStatusBadge(prop.status)}</td>
            <td>
                ${prop.status === 'pending' ? `
                    <button class="btn-action-icon btn-accept me-1" onclick="updateStatus(${prop.id}, 'accepted')"><i class="bi bi-check-lg"></i></button>
                    <button class="btn-action-icon btn-reject" onclick="updateStatus(${prop.id}, 'rejected')"><i class="bi bi-x-lg"></i></button>
                ` : '<span class="text-muted small">Finalizado</span>'}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.updateStatus = (id, status) => {
    let proposals = JSON.parse(localStorage.getItem('ecoTradeProposals'));
    const index = proposals.findIndex(p => p.id === id);
    proposals[index].status = status;
    localStorage.setItem('ecoTradeProposals', JSON.stringify(proposals));
    renderProposals(proposals);
};

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