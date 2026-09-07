// Snail Time™ Core Physics Engine — Unpredictable Gastropod Dynamics
class SnailTimeEngine {
  constructor() {
    this.activeTasks = new Map();
    this.modalEl = null;
    this.toastContainer = null;
    this.initDOM();
  }

  initDOM() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createDOMElements());
    } else {
      this.createDOMElements();
    }
  }

  createDOMElements() {
    if (document.getElementById('snail-time-modal')) return;

    const toasts = document.createElement('div');
    toasts.id = 'snail-time-toasts';
    toasts.className = 'snail-time-toasts-container';
    document.body.appendChild(toasts);
    this.toastContainer = toasts;

    const modal = document.createElement('div');
    modal.id = 'snail-time-modal';
    modal.className = 'snail-time-modal-overlay hidden';
    modal.innerHTML = `
      <div class="snail-time-modal-card glass-card">
        <div class="modal-header">
          <span class="badge snail-badge">🐌 SNAIL PHYSICS ENGINE™</span>
          <h3 id="snail-modal-title">Delivering your payload...</h3>
        </div>
        <div class="snail-track-container">
          <div class="snail-slime-trail" id="modal-slime-trail"></div>
          <div class="snail-runner" id="modal-snail-runner">
            <span class="snail-avatar-icon">🐌</span>
            <span class="snail-payload-icon" id="modal-payload-icon">📦</span>
          </div>
          <div class="snail-finish-flag">🏁</div>
        </div>
        <div class="snail-progress-meta">
          <span class="status-text" id="modal-status-text">Snail is packing the parcel...</span>
          <span class="percentage-text" id="modal-percentage-text">0%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" id="modal-progress-bar-fill"></div>
        </div>
        <div class="snail-audit-log" id="modal-audit-log" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.75rem; min-height: 20px;"></div>
        <p class="snail-quote" id="modal-quote">"Sorry, the snail is physically walking. There is no cloud."</p>
      </div>
    `;
    document.body.appendChild(modal);
    this.modalEl = modal;
  }

  /**
   * Calculates dynamic delivery duration based on physical snail circumstances
   */
  calculateDynamicDuration(actionType) {
    // Check snail strike
    if (window.SnailState && window.SnailState.state.snailStrike.active) {
      return { totalDuration: 15000, reasons: ["Labor strike active. Snail is picketing with a leaf."] };
    }

    let base = 8000;
    if (actionType === 'like') base = 3000;
    else if (actionType === 'comment') base = 7000;
    else if (actionType === 'follow') base = 10000;
    else if (actionType === 'post') base = 18000;
    else if (actionType === 'message') base = 12000;
    else if (actionType === 'logout') base = 10000;
    else if (actionType === 'complaint') base = 20000;

    const reasons = [];

    // Random Hunger Delay (+3s to +7s)
    if (Math.random() < 0.45) {
      const hunger = Math.round(3000 + Math.random() * 4000);
      base += hunger;
      reasons.push(`+${(hunger/1000).toFixed(1)}s: Snail got hungry and paused for clover snack`);
    }

    // Random Distraction (+4s to +9s)
    if (Math.random() < 0.4) {
      const distraction = Math.round(4000 + Math.random() * 5000);
      base += distraction;
      reasons.push(`+${(distraction/1000).toFixed(1)}s: Snail entered staring contest with an earthworm`);
    }

    // Random Wrong Turn (+5s to +12s)
    if (Math.random() < 0.3) {
      const detour = Math.round(5000 + Math.random() * 7000);
      base += detour;
      reasons.push(`+${(detour/1000).toFixed(1)}s: Snail took the scenic route behind the compost bin`);
    }

    // Garden Traffic Multiplier
    if (window.SnailState && window.SnailState.state.gardenTraffic.active) {
      base *= 1.75;
      reasons.push(`x1.75 Traffic Jam: Sector 4 caterpillar congestion`);
    }

    // User settings multiplier
    const speedMult = (window.SnailState && window.SnailState.state.settings.speedMultiplier) || 1.0;
    base *= speedMult;

    // Turbo mode discount (reduces slightly)
    if (window.SnailState && window.SnailState.state.turboMode.active) {
      base = Math.max(2000, base * 0.88);
    }

    return { totalDuration: Math.round(base), reasons };
  }

  run(options) {
    const {
      actionType,
      title = "Processing...",
      payloadIcon = "📦",
      useModal = false,
      onProgress = null,
      onComplete = null
    } = options;

    // Check strike
    if (window.SnailState && window.SnailState.state.snailStrike.active) {
      alert("🚨 PLATFORM HALTED: Snails are currently on strike! Please wait for the union negotiations to conclude.");
      return null;
    }

    const { totalDuration, reasons } = this.calculateDynamicDuration(actionType);
    const taskId = 'st_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    let startTime = Date.now();

    // Sound effect
    if (window.SnailAudio) window.SnailAudio.playSquish();

    let uiElements = null;
    if (useModal) {
      uiElements = this.showModal(title, payloadIcon, reasons);
    } else {
      uiElements = this.createToast(taskId, title, payloadIcon);
    }

    let isPausedEating = false;
    let hasDroppedPhoto = false;
    let pauseRemainingMs = 0;

    const interval = setInterval(() => {
      // Handle mid-flight random leaf eating
      if (isPausedEating) {
        pauseRemainingMs -= 100;
        if (pauseRemainingMs <= 0) {
          isPausedEating = false;
          if (uiElements && uiElements.statusEl) {
            uiElements.statusEl.textContent = "🐌 Snail swallowed leaf. Resuming delivery...";
          }
        }
        return;
      }

      let elapsed = Date.now() - startTime;
      let progress = Math.min(1, elapsed / totalDuration);
      let percent = Math.round(progress * 100);

      // Random event: Snail stops to eat leaf around 40-50%
      if (!isPausedEating && percent >= 45 && percent <= 52 && Math.random() < 0.25) {
        isPausedEating = true;
        pauseRemainingMs = 3500;
        if (uiElements && uiElements.statusEl) {
          uiElements.statusEl.textContent = "🌿 Snail found a wild leaf! Pausing delivery to chew...";
        }
        if (window.SnailAudio) window.SnailAudio.playLeafRustle();
        return;
      }

      // Random photo drop disaster for uploads
      if (actionType === 'post' && !hasDroppedPhoto && percent >= 30 && percent <= 40 && Math.random() < 0.3) {
        hasDroppedPhoto = true;
        startTime += 6000; // Penalize by 6s
        if (uiElements && uiElements.statusEl) {
          uiElements.statusEl.textContent = "⚠️ Snail dropped the photo in damp soil! Dusting off & restarting...";
        }
        if (window.SnailAudio) window.SnailAudio.playSqueak();
        return;
      }

      // Status messages
      let statusMsg = "🐌 Snail is carrying your payload with maximum dignity...";
      if (percent > 20 && percent < 40) statusMsg = "🌿 Snail paused to inspect local moss quality.";
      else if (percent >= 40 && percent < 65) statusMsg = "🐌 Snail navigating around a treacherous pebble.";
      else if (percent >= 65 && percent < 85) statusMsg = "💨 Snail attempting supersonic crawl (0.0008 km/h)!";
      else if (percent >= 85) statusMsg = "🏁 Almost at destination... just 1.5mm remaining!";

      // Update UI
      if (useModal && this.modalEl) {
        this.updateModalProgress(percent, statusMsg);
      } else if (uiElements && uiElements.toast) {
        this.updateToastProgress(uiElements, percent, statusMsg);
      }

      if (onProgress) {
        onProgress(percent, statusMsg);
      }

      if (progress >= 1) {
        clearInterval(interval);
        this.activeTasks.delete(taskId);

        if (useModal) {
          setTimeout(() => {
            this.hideModal();
            if (window.SnailAudio) window.SnailAudio.playChime();
            if (onComplete) onComplete();
          }, 450);
        } else {
          if (uiElements && uiElements.toast) {
            this.completeToast(uiElements, () => {
              if (window.SnailAudio) window.SnailAudio.playPop();
              if (onComplete) onComplete();
            });
          } else {
            if (onComplete) onComplete();
          }
        }
      }
    }, 100);

    this.activeTasks.set(taskId, { interval });
    return taskId;
  }

  showModal(title, payloadIcon, reasons = []) {
    if (!this.modalEl) this.createDOMElements();
    const titleEl = document.getElementById('snail-modal-title');
    const payloadEl = document.getElementById('modal-payload-icon');
    const statusEl = document.getElementById('modal-status-text');
    const percentEl = document.getElementById('modal-percentage-text');
    const fillEl = document.getElementById('modal-progress-bar-fill');
    const runnerEl = document.getElementById('modal-snail-runner');
    const slimeTrailEl = document.getElementById('modal-slime-trail');
    const auditEl = document.getElementById('modal-audit-log');

    if (titleEl) titleEl.textContent = title;
    if (payloadEl) payloadEl.textContent = payloadIcon;
    if (statusEl) statusEl.textContent = "Snail is embarking on the journey...";
    if (percentEl) percentEl.textContent = "0%";
    if (fillEl) fillEl.style.width = "0%";
    if (runnerEl) runnerEl.style.left = "0%";
    if (slimeTrailEl) slimeTrailEl.style.width = "0%";

    if (auditEl && reasons.length > 0) {
      auditEl.innerHTML = `<strong>Delay Factors:</strong> ${reasons.join(" • ")}`;
    } else if (auditEl) {
      auditEl.textContent = "";
    }

    this.modalEl.classList.remove('hidden');
    return true;
  }

  updateModalProgress(percent, statusMsg) {
    const statusEl = document.getElementById('modal-status-text');
    const percentEl = document.getElementById('modal-percentage-text');
    const fillEl = document.getElementById('modal-progress-bar-fill');
    const runnerEl = document.getElementById('modal-snail-runner');
    const slimeTrailEl = document.getElementById('modal-slime-trail');

    if (statusEl) statusEl.textContent = statusMsg;
    if (percentEl) percentEl.textContent = percent + '%';
    if (fillEl) fillEl.style.width = percent + '%';
    if (runnerEl) runnerEl.style.left = `calc(${percent}% - 28px)`;
    if (slimeTrailEl) slimeTrailEl.style.width = percent + '%';
  }

  hideModal() {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
    }
  }

  createToast(taskId, title, payloadIcon) {
    if (!this.toastContainer) this.createDOMElements();
    const toast = document.createElement('div');
    toast.className = 'snail-time-toast glass-card animate-slide-in';
    toast.id = taskId;
    toast.innerHTML = `
      <div class="toast-top-row">
        <span class="toast-icon">🐌</span>
        <div class="toast-info">
          <div class="toast-title">${title}</div>
          <div class="toast-status">Taking the scenic route...</div>
        </div>
        <div class="toast-payload">${payloadIcon}</div>
        <div class="toast-percent">0%</div>
      </div>
      <div class="toast-progress-bar">
        <div class="toast-slime-fill"></div>
      </div>
    `;

    this.toastContainer.appendChild(toast);
    return {
      toast,
      statusEl: toast.querySelector('.toast-status'),
      percentEl: toast.querySelector('.toast-percent'),
      fillEl: toast.querySelector('.toast-slime-fill')
    };
  }

  updateToastProgress(elements, percent, statusMsg) {
    if (elements.percentEl) elements.percentEl.textContent = percent + '%';
    if (elements.statusEl) elements.statusEl.textContent = statusMsg;
    if (elements.fillEl) elements.fillEl.style.width = percent + '%';
  }

  completeToast(elements, callback) {
    if (elements.statusEl) elements.statusEl.textContent = "✅ Delivered with infinite patience!";
    if (elements.percentEl) elements.percentEl.textContent = "100%";
    if (elements.fillEl) {
      elements.fillEl.style.width = "100%";
      elements.fillEl.style.background = "var(--primary, #4CAF50)";
    }

    setTimeout(() => {
      elements.toast.classList.add('animate-fade-out');
      setTimeout(() => {
        if (elements.toast.parentNode) {
          elements.toast.parentNode.removeChild(elements.toast);
        }
        if (callback) callback();
      }, 300);
    }, 600);
  }
}

window.SnailTime = new SnailTimeEngine();
