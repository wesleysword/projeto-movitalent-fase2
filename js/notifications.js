import { notifications as initialNotifications } from '../data/notifications.js';

document.addEventListener('DOMContentLoaded', () => {
    setupNotifications();
});

function setupNotifications() {
    let notifications = JSON.parse(localStorage.getItem('ecoTradeNotifications'));
    
    if (!notifications) {
        notifications = initialNotifications;
        localStorage.setItem('ecoTradeNotifications', JSON.stringify(notifications));
    }

    renderNotifications(notifications);

    const btnMarkRead = document.getElementById('btn-mark-all-read');
    if (btnMarkRead) {
        btnMarkRead.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            notifications = notifications.map(n => ({ ...n, isRead: true }));
            localStorage.setItem('ecoTradeNotifications', JSON.stringify(notifications));
            renderNotifications(notifications);
        });
    }
}

function renderNotifications(notifications) {
    const list = document.getElementById('notifications-list');
    const badge = document.getElementById('notifications-badge');
    
    if (!list) return;

    const unreadCount = notifications.filter(n => !n.isRead).length;

    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.classList.remove('d-none');
        } else {
            badge.classList.add('d-none');
        }
    }

    list.innerHTML = '';

    if (notifications.length === 0) {
        list.innerHTML = `<div class="p-4 text-center text-muted small">Nenhuma notificação no momento.</div>`;
        return;
    }

    notifications.forEach(notif => {
        let iconClass = 'bi-bell icon-info';
        if (notif.type === 'success') iconClass = 'bi-check-circle icon-success';
        if (notif.type === 'warning') iconClass = 'bi-exclamation-triangle icon-warning';

        const item = document.createElement('a');
        item.href = '#';
        item.className = `notification-item ${!notif.isRead ? 'unread' : ''}`;
        item.innerHTML = `
            <div class="notification-icon ${iconClass.split(' ')[1]}">
                <i class="bi ${iconClass.split(' ')[0]}"></i>
            </div>
            <div class="notification-content">
                <p>${notif.text}</p>
                <span>${notif.date}</span>
            </div>
        `;
        
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!notif.isRead) {
                notif.isRead = true;
                localStorage.setItem('ecoTradeNotifications', JSON.stringify(notifications));
                renderNotifications(notifications);
            }
        });

        list.appendChild(item);
    });
}