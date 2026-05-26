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
    setupProposalForm();
    setupQA(item);
});

function populateItemDetails(item) {
    document.title = `${item.title} - EcoTrade`;
    document.getElementById('breadcrumb-category').textContent = item.category;
    document.getElementById('breadcrumb-title').textContent = item.title;
    
    document.getElementById('detail-title').textContent = item.title;
    document.getElementById('detail-location').innerHTML = `<i class="bi bi-geo-alt me-1"></i> ${item.location}`;
    document.getElementById('detail-time').innerHTML = `<i class="bi bi-clock me-1"></i> Faltam ${item.timeRemaining}`;

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

function setupProposalForm() {
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
                valueLabel.textContent = 'Qual valor você oferece?';
                valueInput.placeholder = 'Ex: 50,00';
            } else if (selectedType === 'charge') {
                valueContainer.classList.remove('d-none');
                valueLabel.textContent = 'Quanto você cobra pelo serviço?';
                valueInput.placeholder = 'Ex: 100,00';
            } else {
                valueContainer.classList.add('d-none');
                valueInput.value = '';
            }
        });
    });

    const form = document.getElementById('proposal-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('btn-submit-proposal');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="bi bi-check-circle"></i> Proposta Enviada!';
            btn.classList.replace('btn-primary-custom', 'btn-success');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.replace('btn-success', 'btn-primary-custom');
                btn.disabled = false;
                form.reset();
                document.querySelectorAll('.proposal-option-card').forEach(c => c.classList.remove('active'));
                valueContainer.classList.add('d-none');
            }, 3000);
        }, 1500);
    });
}

function setupQA(item) {
    const qaList = document.getElementById('qa-list');
    const qaForm = document.getElementById('qa-form');
    const qaInput = document.getElementById('qaInput');
    const btnSubmit = document.getElementById('btn-submit-qa');

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
        },
        {
            qAuthor: "Aline Pereira",
            qAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            qTime: "Há 4 horas",
            qText: "Qual a melhor rua/bairro para retirar?",
            aAuthor: item.advertiser.name,
            aAvatar: item.advertiser.avatar,
            aTime: "Há 1 hora",
            aText: "Fica perto do centro. Assim que fecharmos a proposta eu libero o endereço completo no chat."
        }
    ];

    const renderQA = () => {
        qaList.innerHTML = '';
        if (mockQA.length === 0) {
            qaList.innerHTML = '<p class="text-muted mb-0">Nenhuma pergunta foi feita ainda. Seja o primeiro a perguntar!</p>';
            return;
        }

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
                    </div>`;
            
            if (qa.aText) {
                html += `
                    <div class="qa-answer">
                        <img src="${qa.aAvatar}" class="qa-avatar" alt="Avatar">
                        <div class="qa-content">
                            <div class="qa-header">
                                <p class="qa-author">${qa.aAuthor} <span class="badge bg-secondary ms-1" style="font-size: 0.65rem; background-color: var(--color-secondary) !important;">Vendedor</span></p>
                                <span class="qa-time">${qa.aTime}</span>
                            </div>
                            <p class="qa-text">${qa.aText}</p>
                        </div>
                    </div>`;
            }

            html += `</div>`;
            qaList.insertAdjacentHTML('beforeend', html);
        });
    };

    renderQA();

    qaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = qaInput.value.trim();
        if (!text) return;

        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
        btnSubmit.disabled = true;

        setTimeout(() => {
            mockQA.unshift({
                qAuthor: "Você",
                qAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                qTime: "Agora mesmo",
                qText: text,
                aText: null
            });

            renderQA();
            qaForm.reset();
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
        }, 800);
    });
}