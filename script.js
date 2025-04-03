// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const setTheme = (isDark) => {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerHTML = isDark ? '<span class="octicon octicon-sun"></span>' : '<span class="octicon octicon-moon"></span>';
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

// Add floating animation to profile logo
const profileLogo = document.querySelector(".profile-logo");
if (profileLogo) {
  profileLogo.classList.add("floating");
}