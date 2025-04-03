// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' 
    ? '<span class="octicon octicon-sun"></span>' 
    : '<span class="octicon octicon-moon"></span>';
  
  localStorage.setItem('theme', newTheme);
});

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' 
  ? '<span class="octicon octicon-sun"></span>' 
  : '<span class="octicon octicon-moon"></span>';

// GitHub-like hover effects
document.querySelectorAll('.gh-nav-item, .gh-btn').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transition = 'all 0.2s ease';
  });
});

// Dynamic year for copyright
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.createElement('span');
  yearSpan.textContent = new Date().getFullYear();
  document.querySelector('footer')?.appendChild(yearSpan);
});
