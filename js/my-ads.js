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
    const adModal = new bootstrap.Modal(document.getElementById('adModal'));
    const adForm = document.getElementById('ad-form');
    const btnAddNew = document.getElementById('btn-add-new');

    const imageInput = document.getElementById('adImageFile');
    const imageBase64 = document.getElementById('adImageBase64');
    const imagePreview = document.getElementById('imagePreview');
    const imagePreviewText = document.getElementById('imagePreviewText');

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imageBase64.value = event.target.result;
                imagePreview.src = event.target.result;
                imagePreview.classList.remove('d-none');
                imagePreviewText.classList.add('d-none');
            };
            reader.readAsDataURL(file);
        }
    });

    const resetImagePreview = () => {
        imageBase64.value = '';
        imagePreview.src = '';
        imagePreview.classList.add('d-none');
        imagePreviewText.classList.remove('d-none');
        imageInput.value = '';
    };

    const renderAds = () => {
        tbody.innerHTML = '';

        if (myAds.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Você ainda não possui anúncios criados.</td></tr>`;
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

    btnAddNew.addEventListener('click', () => {
        adForm.reset();
        document.getElementById('adId').value = '';
        document.getElementById('adDuration').value = '7';
        resetImagePreview();
        document.getElementById('adModalLabel').textContent = 'Novo Anúncio';
        adModal.show();
    });

    const openEditModal = (id) => {
        const ad = myAds.find(a => a.id === id);
        if (!ad) return;

        document.getElementById('adId').value = ad.id;
        document.getElementById('adTitle').value = ad.title;
        document.getElementById('adCategory').value = ad.category;
        document.getElementById('adLocation').value = ad.location;
        document.getElementById('adDuration').value = ad.duration;
        document.getElementById('adDescription').value = ad.description;
        
        if (ad.image) {
            imageBase64.value = ad.image;
            imagePreview.src = ad.image;
            imagePreview.classList.remove('d-none');
            imagePreviewText.classList.add('d-none');
        }
        document.getElementById('adModalLabel').textContent = 'Editar Anúncio';
        adModal.show();
    };

    const deleteAd = (id) => {
        if (confirm("Tem certeza que deseja excluir este anúncio?")) {
            myAds = myAds.filter(a => a.id !== id);
            localStorage.setItem('myEcoTradeAds', JSON.stringify(myAds));
            renderAds();
        }
    };

    adForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!imageBase64.value) {
            alert("Por favor, selecione uma imagem para o item.");
            return;
        }

        const btnSave = document.getElementById('btn-save-ad');
        const originalText = btnSave.innerHTML;
        btnSave.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Salvando...';
        btnSave.disabled = true;

        setTimeout(() => {
            const adId = document.getElementById('adId').value;
            const newAd = {
                id: adId ? parseInt(adId) : Date.now(),
                title: document.getElementById('adTitle').value,
                category: document.getElementById('adCategory').value,
                description: document.getElementById('adDescription').value,
                duration: parseInt(document.getElementById('adDuration').value),
                image: imageBase64.value,
                location: document.getElementById('adLocation').value,
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