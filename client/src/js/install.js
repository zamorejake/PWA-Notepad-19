const butInstall = document.getElementById("buttonInstall");
let pwaPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  pwaPrompt = event;
  butInstall.classList.remove("hidden");
});

butInstall.addEventListener("click", async () => {
    //next gen javascript syntax for requirements
  !pwaPrompt
    ? (butInstall.textContent = "Already installed.")
    : (pwaPrompt.prompt(),
      butInstall.classList.add("hidden"),
      (pwaPrompt = null));
});

window.addEventListener("appinstalled", (event) => {
  console.log("PWA installed!");
});
