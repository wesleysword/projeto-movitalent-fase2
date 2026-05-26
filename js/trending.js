const mockTrendingCategories = [
    {
        name: "Eletrônicos",
        icon: "bi-laptop",
        dealsThisWeek: 42
    },
    {
        name: "Móveis",
        icon: "bi-house",
        dealsThisWeek: 35
    },
    {
        name: "Vestuário",
        icon: "bi-bag",
        dealsThisWeek: 29
    },
    {
        name: "Ferramentas",
        icon: "bi-tools",
        dealsThisWeek: 21
    },
    {
        name: "Livros",
        icon: "bi-book",
        dealsThisWeek: 18
    },
    {
        name: "Construção",
        icon: "bi-hammer",
        dealsThisWeek: 15
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderTrendingCategories();
});

function renderTrendingCategories() {
    const sliderContainer = document.getElementById('category-slider');
    if (!sliderContainer) return;

    sliderContainer.innerHTML = '';

    mockTrendingCategories.forEach(category => {
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