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

// Mobile Navigation
const menuToggle = document.createElement("button");
menuToggle.classList.add("mobile-menu-toggle");
menuToggle.innerHTML = '<span class="octicon octicon-three-bars"></span>';
menuToggle.setAttribute("aria-label", "Toggle menu");
document.body.prepend(menuToggle);

const nav = document.querySelector(".gh-nav");
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.innerHTML = nav.classList.contains("open") 
    ? '<span class="octicon octicon-x"></span>' 
    : '<span class="octicon octicon-three-bars"></span>';
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove("open");
    menuToggle.innerHTML = '<span class="octicon octicon-three-bars"></span>';
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

// Beecrowd Stats Loader
async function loadBeecrowdStats() {
  try {
    const response = await fetch('data/beecrowd-stats.json');
    if (!response.ok) throw new Error("Failed to fetch stats");
    
    const data = await response.json();
    
    document.getElementById('beecrowd-stats').innerHTML = `
      <div class="stat-item">
        <div class="stat-number">${data.rank || '--'}</div>
        <div class="stat-label">Global Rank</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${data.solved || '--'}</div>
        <div class="stat-label">Problems Solved</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${data.points || '--'}</div>
        <div class="stat-label">Points</div>
      </div>
    `;
    
    if (data.last_updated) {
      document.getElementById('beecrowd-updated').textContent = 
        `Updated: ${data.last_updated}`;
    }
  } catch (error) {
    console.error("Error loading Beecrowd stats:", error);
    document.getElementById('beecrowd-stats').innerHTML = `
      <div class="stat-item">
        <div class="stat-number">--</div>
        <div class="stat-label">Global Rank</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">--</div>
        <div class="stat-label">Problems Solved</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">--</div>
        <div class="stat-label">Points</div>
      </div>
    `;
    document.getElementById('beecrowd-updated').textContent = "Failed to load stats";
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

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadBeecrowdStats();
  
  // Add floating animation to profile logo
  const profileLogo = document.querySelector(".profile-logo");
  if (profileLogo) {
    profileLogo.classList.add("floating");
  }
});
