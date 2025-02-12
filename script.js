// Dados Mockados


// Sistema de Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'grid';
        
        if(user.type === 'empresa') {
            loadCompanyData(user);
        } else {
            // Redirecionar para outras dashboards conforme o tipo
            alert(`Bem-vindo ${user.name}! (Dashboard não implementada)`);
        }
    } else {
        alert('Credenciais inválidas!');
    }
});

// ... (mantenha todas as outras funções da resposta anterior aqui, 
// ajustando para receber o parâmetro user quando necessário) ...

// Exemplo de ajuste na função loadCompanyData
function loadCompanyData(company) {
    document.getElementById('company-name').textContent = company.name;
    document.getElementById('company-name-input').value = company.name;
    document.getElementById('address').value = company.address;
    document.getElementById('phone').value = company.phone;
    updateCollections(company);
}

// Ajuste nos event listeners para usar o objeto company
document.getElementById('schedule-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // ... (usar o objeto company atual) ...
});

// ... (demais funções ajustadas para trabalhar com os dados do usuário logado) ...

// Dados Mockados
const mockCompany = {
    logo: 'logo.png',
    name: 'Eco Óleo Sustentável',
    address: 'Av. Ecológica, 1234',
    phone: '(11) 98765-4321',
    collections: [
        { date: '2024-03-25T10:00', volume: 150, status: 'Agendado' }
    ],
    coupons: [
        { code: 'ECO10', discount: 10, valid: true }
    ]
};

// Função para criar elementos com Tailwind
function createElement(tag, classes = '', attributes = {}) {
    const element = document.createElement(tag);
    element.className = classes;
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
}

// Exemplo de card de coleta
function createCollectionCard(collection) {
    const card = createElement('div', 'bg-white p-6 rounded-xl shadow-sm animate-in');
    card.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <div>
                <h3 class="font-semibold text-lg">${new Date(collection.date).toLocaleDateString()}</h3>
                <p class="text-gray-500">${collection.volume} litros</p>
            </div>
            <span class="px-3 py-1 rounded-full text-sm 
                ${collection.status === 'Agendado' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'}">
                ${collection.status}
            </span>
        </div>
        <div class="flex gap-2 mt-4">
            <button class="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                Editar
            </button>
            <button class="text-sm px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600">
                Cancelar
            </button>
        </div>
    `;
    return card;
}

// Dados mockados de usuários
const users = [
    {
        type: 'user',
        username: 'user',
        password: '123',
        name: 'João Silva',
        points: 1500
    },
    {
        type: 'empresa',
        username: 'empresa',
        password: '123',
        name: 'Eco Óleo Ltda'
    },
    {
        type: 'admin',
        username: 'admin',
        password: 'admin',
        name: 'Administrador'
    }
];

// Sistema de Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('loginMessage');

    // Validar credenciais
    const user = users.find(u => 
        u.username === username && u.password === password
    );

    if(user) {
        // Salvar sessão
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirecionar para dashboard correto
        switch(user.type) {
            case 'user':
                window.location.href = 'user.html';
                break;
            case 'empresa':
                window.location.href = 'empresa.html';
                break;
            case 'admin':
                window.location.href = 'admin.html';
                break;
        }
    } else {
        messageEl.textContent = 'Credenciais inválidas!';
        messageEl.classList.remove('hidden');
        setTimeout(() => messageEl.classList.add('hidden'), 3000);
    }
});

// Controle do Menu Mobile
const mobileMenuButton = document.getElementById('mobileMenuButton');
const sidebar = document.getElementById('sidebar');
const overlay = document.createElement('div');

function setupResponsive() {
    // Criar overlay
    overlay.className = 'mobile-overlay hidden';
    document.body.appendChild(overlay);

    // Event Listeners
    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    });

    // Atualizar dados do usuário na navbar
    const updateNavbar = () => {
        document.getElementById('navUserName').textContent = user.name;
        document.getElementById('navUserPhoto').src = user.photo;
        document.getElementById('navUserRole').textContent = 
            user.type === 'user' ? 'Usuário' : 
            user.type === 'empresa' ? 'Empresa' : 'Administrador';
    };
    
    updateNavbar();
}

// Inicializar
setupResponsive();