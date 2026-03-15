/* Fateh ERP Docs — docs.js */
(function () {
  'use strict';

  // ---- Sidebar toggle (mobile) ----
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const mobileBtn = document.getElementById('mobileMenuBtn');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if (mobileBtn) mobileBtn.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // ---- Active nav link ----
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ---- Breadcrumb auto-title ----
  const activeBreadcrumb = document.querySelector('.topbar-breadcrumb span.active');
  const pageTitle = document.querySelector('h1');
  if (activeBreadcrumb && pageTitle) {
    activeBreadcrumb.textContent = pageTitle.textContent;
  }

  // ---- Search (client-side simple) ----
  const searchInput = document.getElementById('docsSearch');
  if (searchInput) {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));

    searchInput.addEventListener('input', function () {
      const q = this.value.trim().toLowerCase();
      if (!q) {
        navLinks.forEach(l => {
          l.style.display = '';
          l.closest('.nav-group') && (l.closest('.nav-group').style.display = '');
        });
        document.querySelectorAll('.nav-group-label').forEach(el => el.style.display = '');
        return;
      }
      navLinks.forEach(link => {
        const match = link.textContent.toLowerCase().includes(q);
        link.style.display = match ? '' : 'none';
      });
      document.querySelectorAll('.nav-group').forEach(group => {
        const visible = group.querySelectorAll('.nav-link:not([style="display: none;"])').length > 0;
        group.style.display = visible ? '' : 'none';
      });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
