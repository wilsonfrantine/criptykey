document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const icon = toggle.querySelector("i");

  const setTheme = (dark) => {
    document.body.classList.toggle("theme-dark", dark);
    document.body.classList.toggle("theme-light", !dark);
    icon.classList.toggle("fa-moon", !dark);
    icon.classList.toggle("fa-sun", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    setTheme(!isDark);
  });

  // Initial load
  const saved = localStorage.getItem("theme");
  setTheme(saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches));
});
