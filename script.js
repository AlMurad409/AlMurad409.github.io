<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abdullah Al Murad | GitHub Portfolio</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://unpkg.com/@primer/octicons@latest/build/font/octicons.css">
</head>
<body>
  <div class="theme-toggle" id="themeToggle">
    <span class="octicon octicon-sun"></span>
  </div>

  <div class="container">
    <header class="profile-header">
      <img src="assets/profile.png" alt="Abdullah Al Murad" class="profile-logo">
      <div class="profile-info">
        <h1>Abdullah Al Murad</h1>
        <p>Computer Science & Engineering Student</p>
        <div class="social-container">
          <a href="https://github.com/AlMurad409" class="gh-btn" target="_blank">
            <span class="octicon octicon-mark-github"></span> GitHub
          </a>
        </div>
      </div>
    </header>

    <nav class="gh-nav">
      <a href="index.html" class="gh-nav-item active">
        <span class="octicon octicon-home"></span> Overview
      </a>
      <a href="projects.html" class="gh-nav-item">
        <span class="octicon octicon-repo"></span> Projects
      </a>
      <a href="education.html" class="gh-nav-item">
        <span class="octicon octicon-book"></span> Education
      </a>
      <a href="achievements.html" class="gh-nav-item">
        <span class="octicon octicon-trophy"></span> Achievements
      </a>
    </nav>

    <div class="gh-stats">
      <div class="stat-item">
        <div class="stat-number">10+</div>
        <div class="stat-label">Projects</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">4</div>
        <div class="stat-label">Awards</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">3</div>
        <div class="stat-label">Leadership Roles</div>
      </div>
    </div>

    <div class="gh-card">
      <h2 class="gh-card-title">
        <span class="octicon octicon-pin"></span>
        Featured Project
      </h2>
      <h3>One App - Emergency Response</h3>
      <p>A mobile application designed for emergency situations with quick response features.</p>
      <a href="projects.html" class="gh-btn">View Project</a>
    </div>

    <div class="gh-card">
      <h2 class="gh-card-title">
        <span class="octicon octicon-organization"></span>
        Current Education
      </h2>
      <h3>American International University-Bangladesh</h3>
      <p>Bachelor of Science in Computer Science & Engineering (2024-2025)</p>
      <a href="education.html" class="gh-btn">View Education</a>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
