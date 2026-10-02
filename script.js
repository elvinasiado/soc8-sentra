function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour12: false });
  document.getElementById("clock").textContent = time;
  document.getElementById("lastUpdate").textContent = time;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".module-card").forEach(card => {
  card.addEventListener("click", () => {
    showToast(`${card.dataset.module} — V1 module ready for integration.`);
  });
});

// Demo values only. Replace these later with API calls.
function demoRefresh() {
  const running = 8 + Math.floor(Math.random() * 2);
  const down = running === 9 ? 0 : 1;
  const reject = (1.10 + Math.random() * 0.35).toFixed(2);
  const parcels = 125000 + Math.floor(Math.random() * 1500);

  document.getElementById("scadaRunning").textContent = running;
  document.getElementById("scadaDown").textContent = down;
  document.getElementById("rejectRate").textContent = `${reject}%`;
  document.getElementById("parcelCount").textContent = parcels.toLocaleString();
}

updateClock();
setInterval(updateClock, 1000);
setInterval(demoRefresh, 10000);
