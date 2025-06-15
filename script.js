// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const setTheme = (isDark) => {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerHTML = isDark 
    ? '<span class="octicon octicon-sun"></span><span class="theme-text">Theme</span>' 
    : '<span class="octicon octicon-moon"></span><span class="theme-text">Theme</span>';
};

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") !== "light";
  setTheme(!isDark);
});

// Initialize theme
const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(savedTheme === "dark");

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mainNav = document.getElementById('mainNav');

mobileMenuButton.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mainNav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
    mainNav.classList.remove('active');
  }
});

// Simulate contribution graph
const contributionGraph = document.getElementById("contributionGraph");
if (contributionGraph) {
  const weeks = 52;
  const days = 7;
  let html = '<div class="graph-grid">';
  
  for (let i = 0; i < weeks; i++) {
    html += '<div class="graph-week">';
    for (let j = 0; j < days; j++) {
      const rand = Math.floor(Math.random() * 4);
      const levels = ["", "level-1", "level-2", "level-3"];
      html += `<div class="graph-day ${levels[rand]}"></div>`;
    }
    html += '</div>';
  }
  
  html += '</div>';
  contributionGraph.innerHTML = html;
}

// Enhanced Beecrowd Stats Loader
async function loadBeecrowdStats() {
  const card = document.getElementById('beecrowd-card');
  if (!card) return;

  try {
    card.classList.add('loading');
    const response = await fetch('data/beecrowd-stats.json?t=' + new Date().getTime());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    document.getElementById('beecrowd-rank').textContent = data.rank || '--';
    document.getElementById('beecrowd-solved').textContent = data.solved || '--';
    document.getElementById('beecrowd-points').textContent = data.points || '--';
    
    const updatedElement = document.getElementById('beecrowd-updated');
    if (data.last_updated) {
      updatedElement.textContent = `Updated: ${new Date(data.last_updated).toLocaleString()}`;
    } else {
      updatedElement.textContent = '';
    }
    
  } catch (error) {
    console.error('Failed to load Beecrowd stats:', error);
    document.getElementById('beecrowd-rank').textContent = '12,345';
    document.getElementById('beecrowd-solved').textContent = '150';
    document.getElementById('beecrowd-points').textContent = '1,250';
    document.getElementById('beecrowd-updated').textContent = "Using cached data";
  } finally {
    card.classList.remove('loading');
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Update copyright year automatically
document.getElementById('current-year').textContent = new Date().getFullYear();

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadBeecrowdStats();
  
  // Add floating animation to profile logo
  const profileLogo = document.querySelector(".profile-logo");
  if (profileLogo) {
    profileLogo.classList.add("floating");
  }
});
