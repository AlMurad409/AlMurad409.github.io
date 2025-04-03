// 🌙 Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.documentElement.toggleAttribute("data-theme");
    localStorage.setItem("theme", document.documentElement.hasAttribute("data-theme") ? "dark" : "light");
});

// 🌓 Remember Theme Preference
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
}

// 📱 Mobile Navigation Toggle (Hamburger Menu)
const menuToggle = document.createElement("div");
menuToggle.classList.add("hamburger-menu");
menuToggle.innerHTML = "&#9776;";
document.body.insertBefore(menuToggle, document.body.firstChild);

const nav = document.querySelector(".gh-nav");
menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// 🔗 Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
