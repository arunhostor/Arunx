/* ARUNX — Authentication (IMPROVED) */
const Auth = {
  init() {
    this.checkAuth();
    this.setupEventListeners();
  },
  
  isAuthenticated() {
    return Utils.Storage.get('currentUser') !== null;
  },
  
  getCurrentUser() {
    return Utils.Storage.get('currentUser');
  },
  
  checkAuth() {
    const publicPages = ['index.html', 'auth.html', ''];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!this.isAuthenticated() && !publicPages.includes(currentPage)) {
      window.location.href = currentPage.includes('pages/') ? 'auth.html' : 'pages/auth.html';
    }
  },
  
  register(userData) {
    if (!Validator.email(userData.email)) {
      Utils.Toast.error('Invalid email');
      return false;
    }
    if (!Validator.minLength(userData.password, 6)) {
      Utils.Toast.error('Password must be at least 6 characters');
      return false;
    }
    if (userData.password !== userData.confirmPassword) {
      Utils.Toast.error('Passwords do not match');
      return false;
    }
    
    const users = Utils.Storage.get('users', []);
    if (users.find(u => u.email === userData.email)) {
      Utils.Toast.error('Email already exists');
      return false;
    }
    
    const newUser = {
      id: Utils.generateId(),
      name: userData.name,
      email: userData.email,
      password: btoa(userData.password),
      createdAt: new Date().toISOString(),
      profile: { skills: [], experience: [], education: [] }
    };
    
    users.push(newUser);
    Utils.Storage.set('users', users);
    
    const { password, ...userWithoutPassword } = newUser;
    Utils.Storage.set('currentUser', userWithoutPassword);
    
    Utils.Toast.success('Account created!');
    setTimeout(() => {
      window.location.href = 'pages/dashboard.html';
    }, 1000);
    return true;
  },
  
  login(email, password) {
    if (!Validator.email(email)) {
      Utils.Toast.error('Invalid email');
      return false;
    }
    
    const users = Utils.Storage.get('users', []);
    const user = users.find(u => u.email === email);
    
    if (!user) {
      Utils.Toast.error('User not found');
      return false;
    }
    
    if (atob(user.password) !== password) {
      Utils.Toast.error('Incorrect password');
      return false;
    }
    
    const { password: pwd, ...userWithoutPassword } = user;
    Utils.Storage.set('currentUser', userWithoutPassword);
    
    Utils.Toast.success('Login successful!');
    setTimeout(() => {
      window.location.href = 'pages/dashboard.html';
    }, 1000);
    return true;
  },
  
  logout() {
    Utils.Storage.remove('currentUser');
    Utils.Toast.info('Logged out');
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 500);
  },
  
  setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.login(
          document.getElementById('loginEmail').value,
          document.getElementById('loginPassword').value
        );
      });
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.register({
          name: document.getElementById('registerName').value,
          email: document.getElementById('registerEmail').value,
          password: document.getElementById('registerPassword').value,
          confirmPassword: document.getElementById('registerConfirmPassword').value
        });
      });
    }
    
    document.querySelectorAll('.logout-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Logout?')) this.logout();
      });
    });
  },
  
  displayUserInfo() {
    const user = this.getCurrentUser();
    if (!user) return;
    
    document.querySelectorAll('.user-name').forEach(el => {
      el.textContent = user.name;
    });
    
    document.querySelectorAll('.user-avatar').forEach(el => {
      el.textContent = user.name.charAt(0).toUpperCase();
    });
  },
  
  getProfileCompletion() {
    const user = this.getCurrentUser();
    if (!user) return 0;
    
    const fields = [
      user.name,
      user.email,
      user.profile?.skills?.length > 0,
      user.profile?.experience?.length > 0,
      user.profile?.education?.length > 0
    ];
    
    const completed = fields.filter(f => f).length;
    return Math.round((completed / fields.length) * 100);
  },
  
  createDemoAccount() {
    const users = Utils.Storage.get('users', []);
    if (users.find(u => u.email === 'demo@arunx.com')) return;
    
    users.push({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@arunx.com',
      password: btoa('demo123'),
      createdAt: new Date().toISOString(),
      profile: {
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: [],
        education: []
      }
    });
    
    Utils.Storage.set('users', users);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
  Auth.displayUserInfo();
});

window.Auth = Auth;