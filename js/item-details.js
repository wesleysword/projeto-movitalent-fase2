import { items } from '../data/items.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get('id'));

    if (!itemId) {
        window.location.href = './items.html';
        return;
    }

    const item = items.find(i => i.id === itemId);
    if (!item) {
        window.location.href = './items.html';
        return;
    }

    populateItemDetails(item);
    setupProposalForm(item);
});

function populateItemDetails(item) {
    document.title = `${item.title} - EcoTrade`;
    document.getElementById('detail-title').textContent = item.title;
    document.getElementById('detail-main-image').src = item.image;
    document.getElementById('detail-advertiser-name').textContent = item.advertiser.name;
    document.getElementById('detail-advertiser-avatar').src = item.advertiser.avatar;
}

function setupProposalForm(item) {
    const form = document.getElementById('proposal-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const type = document.querySelector('input[name="proposalType"]:checked').value;
        const amount = parseFloat(document.getElementById('proposalValue').value) || 0;
        
        const newProposal = {
            id: Date.now(),
            itemName: item.title,
            user: "Usuário Interessado",
            type: type,
            amount: amount,
            status: "pending",
            date: new Date().toLocaleDateString('pt-BR')
        };

        let proposals = JSON.parse(localStorage.getItem('ecoTradeProposals')) || [];
        proposals.push(newProposal);
        localStorage.setItem('ecoTradeProposals', JSON.stringify(proposals));

        const btn = document.getElementById('btn-submit-proposal');
        btn.innerHTML = '<i class="bi bi-check-circle"></i> Proposta Enviada!';
        btn.classList.replace('btn-primary-custom', 'btn-success');
        
        setTimeout(() => {
            btn.innerHTML = 'Enviar Proposta';
            btn.classList.replace('btn-success', 'btn-primary-custom');
            form.reset();
        }, 2000);
    });
}