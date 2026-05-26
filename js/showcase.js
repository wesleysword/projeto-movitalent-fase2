/**
 * File: showcase.js
 * Description: Responsible for dynamically injecting item cards into the homepage.
 */

// Mock data simulating items from a database
const mockItems = [
    {
        id: 1,
        title: "Televisão de Tubo 29' (Funcionando)",
        category: "Eletrônicos",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        location: "São Paulo, SP",
        negotiationType: 2, // 2 = Free
        negotiationText: "Retiro Gratuitamente",
        timeRemaining: "15 dias"
    },
    {
        id: 2,
        title: "Lote de Telhas Coloniais Usadas (Aprox. 200 un)",
        category: "Construção",
        image: "https://images.unsplash.com/photo-1621252179027-9ba4595274af?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        location: "Campinas, SP",
        negotiationType: 1, // 1 = Paid
        negotiationText: "R$ 150 pelo lote",
        timeRemaining: "7 dias"
    },
    {
        id: 3,
        title: "Sofá 3 Lugares com avarias no tecido",
        category: "Móveis",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        location: "Belo Horizonte, MG",
        negotiationType: 3, // 3 = Charge to discard
        negotiationText: "Cobro R$ 80 para retirar",
        timeRemaining: "24h"
    },
    {
        id: 4,
        title: "Madeira de Demolição e Caixotes",
        category: "Madeira",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        location: "Curitiba, PR",
        negotiationType: 2,
        negotiationText: "Retiro Gratuitamente",
        timeRemaining: "30 dias"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderShowcase();
});

function renderShowcase() {
    const showcaseGrid = document.getElementById('showcase-grid');
    if (!showcaseGrid) return;

    // Clear loading state
    showcaseGrid.innerHTML = '';

    mockItems.forEach(item => {
        const badgeClass = `badge-type-${item.negotiationType}`;

        const cardHTML = `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card item-card position-relative">
                    <span class="badge badge-category rounded-pill shadow-sm">${item.category}</span>
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-3">${item.title}</h5>
                        <p class="location-text mb-2"><i class="bi bi-geo-alt me-1"></i> ${item.location}</p>
                        <div class="mt-auto">
                            <span class="badge ${badgeClass} w-100 py-2 mb-2 fs-6 fw-semibold text-wrap">${item.negotiationText}</span>
                            <small class="text-muted d-block text-center"><i class="bi bi-clock me-1"></i> Faltam ${item.timeRemaining}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        showcaseGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}