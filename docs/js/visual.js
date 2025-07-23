document.addEventListener("DOMContentLoaded", () => {
  // Privacidade dos campos (passphrase e resultado)
  document.querySelectorAll(".toggle-visibility").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);
      const icon = button.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });

  // Mostrar/esconder resultado
  const output = document.getElementById("output");
  const revealButton = document.getElementById("reveal-output");

  revealButton.addEventListener("click", () => {
    const icon = revealButton.querySelector("i");
    if (output.type === "password") {
      output.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      output.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });

  // Copiar senha gerada
  const copyButton = document.getElementById("copy-output");

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      copyButton.querySelector("i").classList.replace("fa-copy", "fa-check");
      setTimeout(() => {
        copyButton.querySelector("i").classList.replace("fa-check", "fa-copy");
      }, 2000);
    } catch (err) {
      alert("Failed to copy!");
    }
  });
});

// Modal logic
const aboutBtn = document.getElementById("about-btn");
const modal = document.getElementById("about-modal");
const closeBtn = document.getElementById("close-modal");

aboutBtn.addEventListener("click", () => modal.classList.remove("hidden"));
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});


//Slogan

document.addEventListener("DOMContentLoaded", () => {
  const slogans = [
  "Too many passwords to remember?",
  "Use one phrase. Get one key per site.",
  "Same input, same result, always!",
  "Nothing saved. Nothing synced.",
  "Works fully offline, in your browser.",
  "Type your phrase and the site name.",
  "Instant. Repeatable. Private.",
  "One secret. Infinite passwords.",
  "Remember one. Unlock all."
];


  const sloganEl = document.getElementById("slogan");
  let index = 0;

  setInterval(() => {
    sloganEl.style.opacity = 0;

    setTimeout(() => {
      index = (index + 1) % slogans.length;
      sloganEl.textContent = slogans[index];
      sloganEl.style.opacity = 1;
    }, 1000);
  }, 5000);
});
