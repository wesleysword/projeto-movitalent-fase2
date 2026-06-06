<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meus Anúncios - EcoTrade</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">

    <link rel="stylesheet" href="../assets/css/base/variables.css">
    <link rel="stylesheet" href="../assets/css/base/reset.css">
    <link rel="stylesheet" href="../assets/css/components/brand.css">
    <link rel="stylesheet" href="../assets/css/components/notifications.css">
    <link rel="stylesheet" href="../assets/css/pages/dashboard.css">
    <link rel="stylesheet" href="../assets/css/pages/my-ads.css">
</head>
<body>

    <div class="dashboard-wrapper">
        
        <aside class="sidebar">
            <a href="../index.html" class="sidebar-brand">
                <img src="../assets/img/box-logo.svg" alt="Logo EcoTrade" width="36" height="36">
                <span class="brand-text-wrapper fs-5">
                    <span class="brand-eco">Eco</span><span class="brand-trade">Trade</span>
                </span>
            </a>

            <nav class="sidebar-nav">
                <div class="sidebar-heading">Menu Principal</div>
                <a href="./dashboard.html" class="sidebar-link">
                    <i class="bi bi-grid-1x2-fill"></i> Dashboard
                </a>
                <a href="./items.html" class="sidebar-link">
                    <i class="bi bi-card-list"></i> Feed de Itens
                </a>
                <a href="./my-ads.html" class="sidebar-link active">
                    <i class="bi bi-box-seam"></i> Meus Anúncios
                </a>
                <a href="./proposals-received.html" class="sidebar-link">
                    <i class="bi bi-inbox"></i> Propostas Recebidas
                </a>
                <a href="#" class="sidebar-link">
                    <i class="bi bi-send"></i> Propostas Enviadas
                </a>
                
                <div class="sidebar-heading mt-4">Conta</div>
                <a href="./profile.html" class="sidebar-link">
                    <i class="bi bi-person"></i> Meu Perfil
                </a>
                <a href="./settings.html" class="sidebar-link">
                    <i class="bi bi-gear"></i> Configurações
                </a>
            </nav>

            <div class="sidebar-footer">
                <a href="#" id="sidebar-logout" class="sidebar-link px-0 text-danger">
                    <i class="bi bi-box-arrow-left"></i> Sair da Conta
                </a>
            </div>
        </aside>

        <main class="main-content">
            <div class="topbar">
                <div>
                    <h2 class="fw-bold mb-1" style="color: var(--color-primary);">Meus Anúncios</h2>
                    <p class="text-muted mb-0">Gerencie todos os itens que você disponibilizou na plataforma.</p>
                </div>
                
                <div class="user-profile-menu">
                    <div class="dropdown">
                        <button class="btn btn-link text-muted fs-4 p-0 me-3 position-relative border-0 shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            <i class="bi bi-bell"></i>
                            <span id="notifications-badge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none" style="font-size: 0.6rem; padding: 0.25em 0.4em;">0</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end notifications-dropdown shadow">
                            <div class="notifications-header">
                                <h6>Notificações</h6>
                                <button class="btn-mark-read" id="btn-mark-all-read">Marcar como lidas</button>
                            </div>
                            <div class="notifications-body" id="notifications-list"></div>
                            <div class="notifications-footer">
                                <a href="#">Ver todas as notificações</a>
                            </div>
                        </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Avatar" class="user-avatar">
                </div>
            </div>

            <div class="d-flex justify-content-end mb-4">
                <button type="button" class="btn fw-bold" style="background-color: var(--color-secondary); color: white;" id="btn-add-new">
                    <i class="bi bi-plus-lg me-1"></i> Criar Novo Anúncio
                </button>
            </div>

            <div class="data-table-container">
                <table class="table table-custom table-ads">
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Título do Item</th>
                            <th>Categoria</th>
                            <th>Duração</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="my-ads-tbody"></tbody>
                </table>
            </div>

        </main>
    </div>

    <div class="modal fade" id="adModal" tabindex="-1" aria-labelledby="adModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="adModalLabel" style="color: var(--color-primary);">Novo Anúncio</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="ad-form">
                    <div class="modal-body p-4">
                        <input type="hidden" id="adId">
                        
                        <div class="row g-3">
                            <div class="col-md-12">
                                <label class="form-label fw-semibold text-muted">Título do Item</label>
                                <input type="text" class="form-control dash-input" id="adTitle" required>
                            </div>
                            
                            <div class="col-md-4">
                                <label class="form-label fw-semibold text-muted">Categoria</label>
                                <select class="form-select dash-input" id="adCategory" required>
                                    <option value="Eletrônicos">Eletrônicos</option>
                                    <option value="Móveis">Móveis</option>
                                    <option value="Vestuário">Vestuário</option>
                                    <option value="Construção">Construção</option>
                                    <option value="Ferramentas">Ferramentas</option>
                                    <option value="Livros">Livros</option>
                                </select>
                            </div>
                            
                            <div class="col-md-5">
                                <label class="form-label fw-semibold text-muted">Localização (Cidade, UF)</label>
                                <input type="text" class="form-control dash-input" id="adLocation" required>
                            </div>

                            <div class="col-md-3">
                                <label class="form-label fw-semibold text-muted">Duração (Dias)</label>
                                <select class="form-select dash-input" id="adDuration" required>
                                    <option value="7">7 dias</option>
                                    <option value="15">15 dias</option>
                                    <option value="30">30 dias</option>
                                </select>
                            </div>

                            <div class="col-md-12">
                                <label class="form-label fw-semibold text-muted">Descrição do Item</label>
                                <textarea class="form-control dash-input" id="adDescription" rows="4" placeholder="Descreva as condições, tempo de uso e avarias, se houver." required></textarea>
                            </div>

                            <div class="col-md-12">
                                <label class="form-label fw-semibold text-muted">Imagem do Item</label>
                                <input type="file" class="form-control dash-input" id="adImageFile" accept="image/*">
                                <input type="hidden" id="adImageBase64">
                                <div class="image-preview-container" id="imagePreviewContainer">
                                    <div class="image-preview-placeholder" id="imagePreviewText">
                                        <i class="bi bi-image fs-2 d-block mb-2"></i>
                                        Selecione uma imagem para visualizar
                                    </div>
                                    <img src="" alt="Preview" id="imagePreview" class="d-none">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-3">
                        <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn fw-bold" style="background-color: var(--color-primary); color: white;" id="btn-save-ad">Salvar Anúncio</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="../js/notifications.js"></script>
    <script type="module" src="../js/my-ads.js"></script>
</body>
</html>