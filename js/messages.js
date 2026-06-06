import { initialChats } from '../data/messages.js';

document.addEventListener('DOMContentLoaded', () => {
    setupChatSystem();
    setupLogout();
});

function setupChatSystem() {
    let chats = JSON.parse(localStorage.getItem('ecoTradeChats')) || initialChats;
    localStorage.setItem('ecoTradeChats', JSON.stringify(chats));

    const chatListContainer = document.getElementById('chat-list-container');
    const chatWindowBody = document.getElementById('chat-window-body');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    
    let activeChatId = chats[0]?.id || null;

    const renderChatList = () => {
        if (!chatListContainer) return;
        chatListContainer.innerHTML = '';

        chats.forEach(chat => {
            const isActive = chat.id === activeChatId;
            const item = document.createElement('a');
            item.className = `chat-item ${isActive ? 'active' : ''} ${chat.unread ? 'unread' : ''}`;
            item.innerHTML = `
                <img src="${chat.userAvatar}" class="chat-item-avatar" alt="${chat.userName}">
                <div class="chat-item-info">
                    <div class="chat-item-header">
                        <h6 class="chat-item-name">${chat.userName}</h6>
                        <span class="chat-item-time">${chat.time}</span>
                    </div>
                    <div class="chat-item-meta">${chat.itemTitle}</div>
                    <p class="chat-item-preview">${chat.lastMessage}</p>
                </div>
            `;
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                activeChatId = chat.id;
                chat.unread = false;
                localStorage.setItem('ecoTradeChats', JSON.stringify(chats));
                renderChatList();
                renderMessages();
            });

            chatListContainer.appendChild(item);
        });
    };

    const renderMessages = () => {
        if (!chatWindowBody) return;
        chatWindowBody.innerHTML = '';

        const activeChat = chats.find(c => c.id === activeChatId);
        if (!activeChat) return;

        document.getElementById('active-chat-avatar').src = activeChat.userAvatar;
        document.getElementById('active-chat-name').textContent = activeChat.userName;
        document.getElementById('active-chat-item').textContent = activeChat.itemTitle;

        activeChat.messages.forEach(msg => {
            const bubble = document.createElement('div');
            bubble.className = `msg-bubble ${msg.sender}`;
            bubble.innerHTML = `${msg.text} <span class="msg-time">${msg.time}</span>`;
            chatWindowBody.appendChild(bubble);
        });

        chatWindowBody.scrollTop = chatWindowBody.scrollHeight;
    };

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            const activeChat = chats.find(c => c.id === activeChatId);
            if (activeChat) {
                const now = new Date();
                const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                
                const newMsg = { sender: "me", text: text, time: timeStr };
                activeChat.messages.push(newMsg);
                activeChat.lastMessage = text;
                activeChat.time = timeStr;

                localStorage.setItem('ecoTradeChats', JSON.stringify(chats));
                chatInput.value = '';
                renderChatList();
                renderMessages();
            }
        });
    }

    renderChatList();
    renderMessages();
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