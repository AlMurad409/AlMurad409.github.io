// Generate Contribution Graph
function generateContributionGraph() {
  const graph = document.getElementById('contributionGraph');
  if (!graph) return;

  const contributions = [];
  const now = new Date();
  
  // Generate random contribution data
  for (let i = 0; i < 364; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Random activity level (0-4)
    const level = Math.floor(Math.random() * 5);
    contributions.push({ date, level });
  }

  // Render graph
  graph.innerHTML = contributions.map(cont => {
    const color = getContributionColor(cont.level);
    return `<div class="contribution-day" style="background-color:${color}" 
            title="${cont.date.toDateString()} - Level ${cont.level}"></div>`;
  }).join('');
}

function getContributionColor(level) {
  const colors = [
    '#161b22', // No activity
    '#0e4429', // Low
    '#006d32', // Medium
    '#26a641', // High
    '#39d353'  // Very high
  ];
  return colors[level];
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
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

  // Generate visual elements
  generateContributionGraph();

  // Animate skill bars on scroll
  const animateSkills = () => {
    document.querySelectorAll('.skill-progress').forEach(bar => {
      if (isElementInViewport(bar)) {
        bar.style.width = bar.parentElement.getAttribute('data-level') || '75%';
      }
    });
  };

  window.addEventListener('scroll', animateSkills);
  animateSkills(); // Initial check
});

// Helper function
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
