// ═══════════════════════════════════════════════════════════════════════
// SOC 8 SENTRA — main dashboard
// ═══════════════════════════════════════════════════════════════════════

// SCADA Fault Monitor runs on the 24/7 PC (port 5005) and is exposed
// publicly via Cloudflare Tunnel. TEMPORARY URL — replace with permanent
// named-tunnel URL once it's set up.
const SCADA_API  = "https://race-del-replies-microwave.trycloudflare.com/api/summary";
const REFRESH_MS = 15000;

// ── Clock ──────────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour12: false });
  const clockEl = document.getElementById("clock");
  if (clockEl) clockEl.textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// ── Toast ──────────────────────────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ── Module card clicks ─────────────────────────────────────────────────
document.querySelectorAll(".module-card").forEach(card => {
  card.addEventListener("click", () => {
    showToast(`${card.dataset.module} — module ready for integration.`);
  });
});

// ── SCADA — real data ──────────────────────────────────────────────────
async function loadScada() {
  try {
    const res = await fetch(SCADA_API, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const knownLines   = Array.isArray(data.known_lines) ? data.known_lines.length : 0;
    const faultedLines = Object.keys(data.by_line || {}).length;
    const running      = Math.max(0, knownLines - faultedLines);
    const down         = faultedLines;

    const runEl  = document.getElementById("scadaRunning");
    const downEl = document.getElementById("scadaDown");
    if (runEl)  runEl.textContent  = running;
    if (downEl) downEl.textContent = down;

    const statusEl = document.getElementById("overallStatus");
    if (statusEl) {
      statusEl.textContent = down === 0 ? "ONLINE" : `${down} FAULT${down > 1 ? "S" : ""}`;
    }

    const updateEl = document.getElementById("lastUpdate");
    if (updateEl) {
      updateEl.textContent = new Date().toLocaleTimeString([], { hour12: false });
    }

    console.log(`[SCADA] ${running} running · ${down} down · ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error("[SCADA] fetch failed:", err);
    const updateEl = document.getElementById("lastUpdate");
    if (updateEl) updateEl.textContent = "SCADA offline";
  }
}

// ── Reject + WCS — still demo values (no API yet) ──────────────────────
function demoOtherBots() {
  const reject  = (1.10 + Math.random() * 0.35).toFixed(2);
  const parcels = 125000 + Math.floor(Math.random() * 1500);

  const rejectEl  = document.getElementById("rejectRate");
  const parcelEl  = document.getElementById("parcelCount");
  if (rejectEl) rejectEl.textContent = `${reject}%`;
  if (parcelEl) parcelEl.textContent = parcels.toLocaleString();
}

// ── Boot ───────────────────────────────────────────────────────────────
loadScada();
demoOtherBots();
setInterval(loadScada, REFRESH_MS);
setInterval(demoOtherBots, 10000);
