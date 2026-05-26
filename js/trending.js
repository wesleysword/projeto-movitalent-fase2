import { trendingCategories } from '../data/categories.js';

document.addEventListener('DOMContentLoaded', () => {
    renderTrendingCategories();
});

function renderTrendingCategories() {
    const sliderContainer = document.getElementById('category-slider');
    if (!sliderContainer) return;

    sliderContainer.innerHTML = '';

    trendingCategories.forEach(category => {
        const categoryHTML = `
            <a href="#showcase" class="category-card" data-category="${category.name}">
                <div class="icon-wrapper">
                    <i class="bi ${category.icon}"></i>
                </div>
                <div class="category-name">${category.name}</div>
                <div class="deals-count">${category.dealsThisWeek} acordos</div>
            </a>
        `;
        
        sliderContainer.insertAdjacentHTML('beforeend', categoryHTML);
    });
}