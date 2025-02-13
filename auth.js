const users = [
    {
        type: 'user',
        username: 'user',
        password: '123',
        name: 'João Silva',
        points: 1500,
        phone: '(11) 9876-5432'
    },
    {
        type: 'empresa',
        username: 'empresa',
        password: '123',
        name: 'Eco Óleo Ltda',
        address: 'Rua Sustentável, 123',
        phone: '(11) 1234-5678',
        logo: null,
        collections: [],
        coupons: []
    },
    {
        type: 'admin',
        username: 'admin',
        password: 'admin',
        name: 'Administrador'
    }
];

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('loginMessage');

    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        
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