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
    setupImageGallery();
    setupProposalForm(item);
    setupQA(item);
});

function populateItemDetails(item) {
    document.title = `${item.title} - EcoTrade`;
    document.getElementById('breadcrumb-category').textContent = item.category;
    document.getElementById('breadcrumb-title').textContent = item.title;
    
    document.getElementById('detail-title').textContent = item.title;
    document.getElementById('detail-location').innerHTML = `<i class="bi bi-geo-alt me-1"></i> ${item.location}`;
    
    const mainImage = document.getElementById('detail-main-image');
    mainImage.src = item.image;
    mainImage.alt = item.title;

    const firstThumb = document.querySelector('.gallery-thumb');
    if (firstThumb) {
        firstThumb.src = item.image;
        firstThumb.classList.add('active');
    }

    document.getElementById('detail-advertiser-avatar').src = item.advertiser.avatar;
    document.getElementById('detail-advertiser-name').textContent = item.advertiser.name;
    document.getElementById('detail-advertiser-rating').innerHTML = `<i class="bi bi-star-fill text-warning"></i> ${item.advertiser.rating}`;
    document.getElementById('detail-advertiser-deals').textContent = `${item.advertiser.deals} negócios na plataforma`;
}

function setupImageGallery() {
    const mainImage = document.getElementById('detail-main-image');
    const thumbnails = document.querySelectorAll('.gallery-thumb');

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;
            
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupProposalForm(item) {
    const form = document.getElementById('proposal-form');
    const proposalOptions = document.querySelectorAll('input[name="proposalType"]');
    const valueContainer = document.getElementById('proposal-value-container');
    const valueInput = document.getElementById('proposalValue');
    const valueLabel = document.getElementById('proposal-value-label');

    proposalOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            const selectedType = e.target.value;

            document.querySelectorAll('.proposal-option-card').forEach(card => {
                card.classList.remove('active');
            });
            e.target.closest('.proposal-option-card').classList.add('active');

            if (selectedType === 'pay') {
                valueContainer.classList.remove('d-none');
                valueInput.required = true;
                if(valueLabel) valueLabel.textContent = 'Qual valor você oferece? (R$)';
            } else if (selectedType === 'charge') {
                valueContainer.classList.remove('d-none');
                valueInput.required = true;
                if(valueLabel) valueLabel.textContent = 'Quanto você cobra pelo serviço? (R$)';
            } else {
                valueContainer.classList.add('d-none');
                valueInput.required = false;
                valueInput.value = '';
            }
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const typeElement = document.querySelector('input[name="proposalType"]:checked');
        if (!typeElement) return;

        const type = typeElement.value;
        const amount = parseFloat(valueInput.value) || 0;
        
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
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-circle"></i> Proposta Enviada!';
        btn.classList.replace('btn-primary-custom', 'btn-success');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.replace('btn-success', 'btn-primary-custom');
            form.reset();
            document.querySelectorAll('.proposal-option-card').forEach(c => c.classList.remove('active'));
            valueContainer.classList.add('d-none');
            valueInput.required = false;
        }, 2000);
    });
}

function setupQA(item) {
    const qaList = document.getElementById('qa-list');
    const qaForm = document.getElementById('qa-form');
    const qaInput = document.getElementById('qaInput');

    const mockQA = [
        {
            qAuthor: "Julio Costa",
            qAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            qTime: "Há 1 dia",
            qText: "Olá! Gostaria de saber se tem algum defeito estrutural que impeça o uso.",
            aAuthor: item.advertiser.name,
            aAvatar: item.advertiser.avatar,
            aTime: "Há 20 horas",
            aText: "Boa tarde, Julio. Estruturalmente está perfeito, o detalhe é apenas na parte estética conforme descrito."
        }
    ];

    const renderQA = () => {
        qaList.innerHTML = '';
        mockQA.forEach(qa => {
            let html = `
                <div class="qa-item">
                    <div class="qa-question">
                        <img src="${qa.qAvatar}" class="qa-avatar" alt="Avatar">
                        <div class="qa-content">
                            <div class="qa-header">
                                <p class="qa-author">${qa.qAuthor}</p>
                                <span class="qa-time">${qa.qTime}</span>
                            </div>
                            <p class="qa-text">${qa.qText}</p>
                        </div>
                    </div>
                    <div class="qa-answer">
                        <img src="${qa.aAvatar}" class="qa-avatar" alt="Avatar">
                        <div class="qa-content">
                            <div class="qa-header">
                                <p class="qa-author">${qa.aAuthor} <span class="badge bg-secondary ms-1" style="font-size: 0.65rem; background-color: var(--color-secondary) !important;">Vendedor</span></p>
                                <span class="qa-time">${qa.aTime}</span>
                            </div>
                            <p class="qa-text">${qa.aText}</p>
                        </div>
                    </div>
                </div>`;
            qaList.insertAdjacentHTML('beforeend', html);
        });
    };

    renderQA();

    qaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = qaInput.value.trim();
        if (!text) return;

        mockQA.unshift({
            qAuthor: "Você",
            qAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            qTime: "Agora mesmo",
            qText: text,
            aText: null
        });

        renderQA();
        qaForm.reset();
    });
}