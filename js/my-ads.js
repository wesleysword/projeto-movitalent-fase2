document.addEventListener('DOMContentLoaded', () => {
    setupMyAds();
    setupLogout();
});

function setupMyAds() {
    let myAds = JSON.parse(localStorage.getItem('myEcoTradeAds'));

    if (!myAds) {
        myAds = [
            { id: 1001, title: "Mesa de Centro de Vidro", category: "Móveis", description: "Mesa de centro com tampo de vidro temperado e base de madeira maciça.", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", location: "São Paulo, SP", duration: 15, status: "Ativo" },
            { id: 1002, title: "Bicicleta Ergométrica Antiga", category: "Eletrônicos", description: "Bicicleta ergométrica com painel digital.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", location: "São Paulo, SP", duration: 7, status: "Ativo" }
        ];
        localStorage.setItem('myEcoTradeAds', JSON.stringify(myAds));
    }

    const tbody = document.getElementById('my-ads-tbody');
    const adModalElement = document.getElementById('adModal');
    if (!adModalElement) return;

    const adModal = new bootstrap.Modal(adModalElement);
    const adForm = document.getElementById('ad-form');
    const btnAddNew = document.getElementById('btn-add-new');

    const imageInput = document.getElementById('adImageFile');
    const imageBase64 = document.getElementById('adImageBase64');
    const imagePreview = document.getElementById('imagePreview');
    const imagePreviewText = document.getElementById('imagePreviewText');

    if (imageInput) {
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (imageBase64) imageBase64.value = event.target.result;
                    if (imagePreview) {
                        imagePreview.src = event.target.result;
                        imagePreview.classList.remove('d-none');
                    }
                    if (imagePreviewText) imagePreviewText.classList.add('d-none');
                };
                reader.readAsDataURL(file);
            } else {
                resetImagePreview();
            }
        });
    }

    const resetImagePreview = () => {
        if (imageBase64) imageBase64.value = '';
        if (imagePreview) {
            imagePreview.src = '';
            imagePreview.classList.add('d-none');
        }
        if (imagePreviewText) imagePreviewText.classList.remove('d-none');
        if (imageInput) imageInput.value = '';
    };

    const renderAds = () => {
        if (!tbody) return;
        tbody.innerHTML = '';

        if (myAds.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Você ainda não possui anúncios criados.</td></tr>`;
            return;
        }

        myAds.forEach(ad => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${ad.image}" class="ad-thumbnail" alt="${ad.title}"></td>
                <td class="fw-bold" style="color: var(--color-primary);">${ad.title}</td>
                <td>${ad.category}</td>
                <td>${ad.duration} dias</td>
                <td><span class="badge bg-success">${ad.status}</span></td>
                <td>
                    <button type="button" class="btn-action-icon btn-edit me-1" data-id="${ad.id}"><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn-action-icon btn-delete" data-id="${ad.id}"><i class="bi bi-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => openEditModal(parseInt(e.currentTarget.getAttribute('data-id'))));
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => deleteAd(parseInt(e.currentTarget.getAttribute('data-id'))));
        });
    };

    if (btnAddNew) {
        btnAddNew.addEventListener('click', () => {
            if (adForm) adForm.reset();
            const adIdInput = document.getElementById('adId');
            if (adIdInput) adIdInput.value = '';
            
            const adDurationSelect = document.getElementById('adDuration');
            if (adDurationSelect) adDurationSelect.value = '7';
            
            resetImagePreview();
            
            const adModalLabel = document.getElementById('adModalLabel');
            if (adModalLabel) adModalLabel.textContent = 'Novo Anúncio';
            
            adModal.show();
        });
    }

    const openEditModal = (id) => {
        const ad = myAds.find(a => a.id === id);
        if (!ad) return;

        const adIdInput = document.getElementById('adId');
        if (adIdInput) adIdInput.value = ad.id;

        const adTitleInput = document.getElementById('adTitle');
        if (adTitleInput) adTitleInput.value = ad.title;

        const adCategorySelect = document.getElementById('adCategory');
        if (adCategorySelect) adCategorySelect.value = ad.category;

        const adLocationInput = document.getElementById('adLocation');
        if (adLocationInput) adLocationInput.value = ad.location;

        const adDurationSelect = document.getElementById('adDuration');
        if (adDurationSelect) adDurationSelect.value = ad.duration || 7;

        const adDescriptionInput = document.getElementById('adDescription');
        if (adDescriptionInput) adDescriptionInput.value = ad.description;
        
        if (ad.image) {
            if (imageBase64) imageBase64.value = ad.image;
            if (imagePreview) {
                imagePreview.src = ad.image;
                imagePreview.classList.remove('d-none');
            }
            if (imagePreviewText) imagePreviewText.classList.add('d-none');
        } else {
            resetImagePreview();
        }

        const adModalLabel = document.getElementById('adModalLabel');
        if (adModalLabel) adModalLabel.textContent = 'Editar Anúncio';

        adModal.show();
    };

    const deleteAd = (id) => {
        if (confirm("Tem certeza que deseja excluir este anúncio?")) {
            myAds = myAds.filter(a => a.id !== id);
            localStorage.setItem('myEcoTradeAds', JSON.stringify(myAds));
            renderAds();
        }
    };

    if (adForm) {
        adForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (imageBase64 && !imageBase64.value) {
                alert("Por favor, selecione uma imagem para o item.");
                return;
            }

            const btnSave = document.getElementById('btn-save-ad');
            const originalText = btnSave.innerHTML;
            btnSave.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Salvando...';
            btnSave.disabled = true;

            setTimeout(() => {
                const adIdInput = document.getElementById('adId');
                const adId = adIdInput ? adIdInput.value : '';

                const newAd = {
                    id: adId ? parseInt(adId) : Date.now(),
                    title: document.getElementById('adTitle') ? document.getElementById('adTitle').value : '',
                    category: document.getElementById('adCategory') ? document.getElementById('adCategory').value : '',
                    description: document.getElementById('adDescription') ? document.getElementById('adDescription').value : '',
                    duration: document.getElementById('adDuration') ? parseInt(document.getElementById('adDuration').value) : 7,
                    image: imageBase64 ? imageBase64.value : '',
                    location: document.getElementById('adLocation') ? document.getElementById('adLocation').value : '',
                    status: "Ativo"
                };

                if (adId) {
                    const index = myAds.findIndex(a => a.id === parseInt(adId));
                    myAds[index] = newAd;
                } else {
                    myAds.unshift(newAd);
                }

                localStorage.setItem('myEcoTradeAds', JSON.stringify(myAds));
                renderAds();
                
                btnSave.innerHTML = originalText;
                btnSave.disabled = false;
                adModal.hide();
            }, 600);
        });
    }

    renderAds();
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