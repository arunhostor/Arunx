/* ARUNX — Utilities (IMPROVED) */
const ThemeManager = {
  init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    document.addEventListener('click', (e) => {
      if (e.target.closest('.theme-toggle')) {
        this.toggleTheme();
      }
    });
  },
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
  },
  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }
};

const Storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  },
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

const Toast = {
  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    const colors = {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#6366F1'
    };
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 16px 24px;
      background: ${colors[type]};
      color: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 10000;
      font-weight: 500;
      animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  },
  success(msg) { this.show(msg, 'success'); },
  error(msg) { this.show(msg, 'error'); },
  info(msg) { this.show(msg, 'info'); }
};

const Validator = {
  email(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  required(value) {
    return value && value.toString().trim() !== '';
  },
  minLength(value, length) {
    return value.length >= length;
  }
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

window.Utils = { ThemeManager, Storage, Toast, Validator, generateId };

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
});