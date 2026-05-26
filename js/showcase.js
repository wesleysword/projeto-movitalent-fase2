import { items } from '../data/items.js';

let currentItems = [...items];
let currentPage = 1;
let itemsPerPage = 12;

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('showcase-grid');
    if (!grid) return;

    const paginationContainer = document.getElementById('pagination-container');

    if (paginationContainer) {
        setupFilters();
        setupPerPageSelector();
        updateResultsCount();
        renderPage(currentPage);
    } else {
        renderGrid(items.slice(0, 4));
    }
});

function setupFilters() {
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-filter');
    const regionSelect = document.getElementById('region-filter');
    const btnFilter = document.getElementById('btn-filter');

    const applyFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryTerm = categorySelect.value;
        const regionTerm = regionSelect.value;

        currentItems = items.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm) || item.location.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryTerm === "" || item.category === categoryTerm;
            const matchesRegion = regionTerm === "" || item.location.includes(regionTerm);
            
            return matchesSearch && matchesCategory && matchesRegion;
        });

        currentPage = 1;
        updateResultsCount();
        renderPage(currentPage);
    };

    btnFilter.addEventListener('click', applyFilters);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
    });
    categorySelect.addEventListener('change', applyFilters);
    regionSelect.addEventListener('change', applyFilters);
}

function setupPerPageSelector() {
    const perPageSelect = document.getElementById('per-page-select');
    if (!perPageSelect) return;

    perPageSelect.addEventListener('change', (e) => {
        itemsPerPage = parseInt(e.target.value, 10);
        currentPage = 1;
        renderPage(currentPage);
    });
}

function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `Encontrados ${currentItems.length} itens`;
    }
}

function renderPage(page) {
    const totalPages = Math.ceil(currentItems.length / itemsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages && totalPages > 0) page = totalPages;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToRender = currentItems.slice(startIndex, endIndex);

    renderGrid(itemsToRender);
    renderPagination(totalPages);
}

function renderGrid(itemsToRender) {
    const grid = document.getElementById('showcase-grid');
    grid.innerHTML = '';

    if (itemsToRender.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center py-5"><p class="text-muted fs-5">Nenhum item encontrado com os filtros selecionados.</p></div>`;
        return;
    }

    itemsToRender.forEach(item => {
        const cardHTML = `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="card item-card position-relative">
                    <span class="badge badge-category rounded-pill shadow-sm">${item.category}</span>
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-2">${item.title}</h5>
                        <p class="location-text mb-3"><i class="bi bi-geo-alt me-1"></i> ${item.location}</p>
                        
                        <div class="advertiser-profile mb-4">
                            <img src="${item.advertiser.avatar}" alt="${item.advertiser.name}" class="advertiser-avatar">
                            <div class="advertiser-info">
                                <span class="advertiser-name">${item.advertiser.name}</span>
                                <div class="advertiser-stats">
                                    <span><i class="bi bi-star-fill"></i> ${item.advertiser.rating}</span>
                                    <span>&bull;</span>
                                    <span>${item.advertiser.deals} negócios</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-auto">
                            <a href="./item-details.html?id=${item.id}" class="btn btn-details w-100 rounded-pill fw-bold text-center text-decoration-none py-2">Veja mais detalhes</a>
                            <small class="text-muted d-block text-center mt-2"><i class="bi bi-clock me-1"></i> Faltam ${item.timeRemaining}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function renderPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    let paginationHTML = `<ul class="pagination custom-pagination justify-content-center m-0">`;

    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link" data-page="${currentPage - 1}" aria-label="Anterior">
                <i class="bi bi-chevron-left"></i>
            </button>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <button class="page-link" data-page="${i}">${i}</button>
            </li>
        `;
    }

    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link" data-page="${currentPage + 1}" aria-label="Próximo">
                <i class="bi bi-chevron-right"></i>
            </button>
        </li>
    `;

    paginationHTML += `</ul>`;
    paginationContainer.innerHTML = paginationHTML;

    const pageButtons = paginationContainer.querySelectorAll('.page-link');
    pageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const newPage = parseInt(e.currentTarget.getAttribute('data-page'));
            if (!isNaN(newPage) && newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
                currentPage = newPage;
                renderPage(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}