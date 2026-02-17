/* ARUNX — Core App (IMPROVED) */
const App = {
  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.displayDashboardStats();
    this.setupDropdowns();
  },
  
  setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  },
  
  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });
      
      // Close on click outside
      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          sidebar.classList.remove('active');
        }
      });
    }
  },
  
  setupDropdowns() {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = toggle.closest('.dropdown');
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
          if (d !== dropdown) d.classList.remove('active');
        });
        
        dropdown.classList.toggle('active');
      });
    });
    
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown').forEach(d => {
        d.classList.remove('active');
      });
    });
  },
  
  displayDashboardStats() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    const resumes = Utils.Storage.get('resumes_' + user.id, []);
    const resumeCount = document.getElementById('resumeCount');
    if (resumeCount) resumeCount.textContent = resumes.length;
    
    const completion = Auth.getProfileCompletion();
    const completionPercent = document.getElementById('profileCompletion');
    const completionBar = document.getElementById('completionBar');
    
    if (completionPercent) completionPercent.textContent = completion;
    if (completionBar) completionBar.style.width = completion + '%';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;