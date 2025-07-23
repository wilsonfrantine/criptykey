import { generatePassword } from './core.js';

document.getElementById("ckey-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const pass = document.getElementById("pass").value;
  const site = document.getElementById("site").value;
  const len = parseInt(document.getElementById("length").value);
  const style = document.getElementById("style").value;

  const output = await generatePassword(pass, site, len, style);

  const outputElement = document.getElementById("output");
  outputElement.value = output;

  document.getElementById("output-container").classList.remove("hidden");
});
