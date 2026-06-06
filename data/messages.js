export const initialChats = [
    {
        id: 1,
        userName: "Mariana Souza",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        itemTitle: "Mesa de Centro de Vidro",
        lastMessage: "Combinado! Consigo buscar na sexta às 14h.",
        time: "10:30",
        unread: true,
        messages: [
            { sender: "them", text: "Olá! Ainda está disponível?", time: "09:15" },
            { sender: "me", text: "Olá, Mariana! Sim, está sim.", time: "09:30" },
            { sender: "them", text: "Ótimo. Fiz uma proposta de retirada gratuita no painel.", time: "09:35" },
            { sender: "me", text: "Acabei de aceitar aqui. Qual dia fica bom para você retirar?", time: "10:15" },
            { sender: "them", text: "Combinado! Consigo buscar na sexta às 14h.", time: "10:30" }
        ]
    },
    {
        id: 2,
        userName: "Carlos Pereira",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        itemTitle: "Bicicleta Ergométrica Antiga",
        lastMessage: "Vou fazer o Pix do valor assim que chegar.",
        time: "Ontem",
        unread: false,
        messages: [
            { sender: "them", text: "Boa tarde! Tenho muito interesse na bicicleta.", time: "Ontem 14:00" },
            { sender: "me", text: "Boa tarde, Carlos. Ela está funcionando perfeitamente.", time: "Ontem 14:20" },
            { sender: "them", text: "Perfeito, enviei a proposta de R$ 150. Pode ser?", time: "Ontem 14:30" },
            { sender: "me", text: "Aceito sim! Fechado.", time: "Ontem 15:00" },
            { sender: "them", text: "Vou fazer o Pix do valor assim que chegar.", time: "Ontem 15:05" }
        ]
    }
];