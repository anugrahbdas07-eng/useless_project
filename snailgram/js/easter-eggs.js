// SnailGram Easter Eggs, Snail Labor Strikes & Speed Test
class SnailEasterEggs {
  constructor() {
    this.logoClicks = 0;
    this.logoTimer = null;
    this.leafClicks = 0;
    this.leafTimer = null;
    this.inactivityTimer = null;
    this.inactivitySnailEl = null;
    this.rapidClickCount = 0;
    this.rapidTimer = null;
    this.pokeCount = 0;
    this.pokeTimer = null;
    this.speedTestStartTime = null;
  }

  init() {
    this.setupLogoEasterEgg();
    this.setupInactivityTracker();
    this.setupRapidClickDetector();
    this.setupSnailPoking();
  }

  setupLogoEasterEgg() {
    const logos = document.querySelectorAll('.snailgram-logo');
    logos.forEach(logo => {
      logo.addEventListener('click', () => {
        this.logoClicks++;
        clearTimeout(this.logoTimer);

        if (this.logoClicks >= 7) {
          this.triggerSecretSnailMode();
          this.logoClicks = 0;
        } else {
          this.logoTimer = setTimeout(() => {
            this.logoClicks = 0;
          }, 3500);
        }
      });
    });
  }

  triggerSecretSnailMode() {
    document.body.classList.toggle('secret-disco-snail');
    if (window.SnailAudio) window.SnailAudio.playFanfare();
    window.SnailState.unlockAchievement('secret_mollusk');

    const banner = document.createElement('div');
    banner.className = 'secret-disco-banner animate-bounce-in';
    banner.innerHTML = `
      <div class="disco-inner glass-card">
        <h3>🌈🐌 SECRET SNAIL MODE ACTIVATED! 🐌✨</h3>
        <p>The garden has transformed into a high-octane snail rave. Slime trails are now 100% holographic!</p>
        <button class="btn btn-sm btn-primary" onclick="this.parentElement.parentElement.remove()">PARTY DOWN 🪩</button>
      </div>
    `;
    document.body.appendChild(banner);
  }

  handleLeafClick() {
    this.leafClicks++;
    clearTimeout(this.leafTimer);

    if (window.SnailAudio) window.SnailAudio.playLeafRustle();

    if (this.leafClicks >= 5) {
      this.triggerLeafOverload();
      this.leafClicks = 0;
    } else {
      this.leafTimer = setTimeout(() => {
        this.leafClicks = 0;
      }, 2000);
    }
  }

  triggerLeafOverload() {
    if (window.SnailAudio) window.SnailAudio.playFanfare();
    window.SnailState.addLeaves(10, "Leaf Overload Discovery");

    for (let i = 0; i < 35; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'falling-leaf-particle';
      leaf.textContent = ['🍃', '🌿', '🌱', '🥬'][Math.floor(Math.random() * 4)];
      leaf.style.left = Math.random() * 100 + 'vw';
      leaf.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      leaf.style.animationDelay = (Math.random() * 1.5) + 's';
      leaf.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
      document.body.appendChild(leaf);

      setTimeout(() => leaf.remove(), 6000);
    }

    const toast = document.createElement('div');
    toast.className = 'easter-toast glass-card animate-bounce-in';
    toast.innerHTML = `<strong>🌿 LEAF OVERLOAD!</strong> +10 bonus leaves fell from the botanical sky!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  setupInactivityTracker() {
    const resetTimer = () => {
      clearTimeout(this.inactivityTimer);
      if (this.inactivitySnailEl) {
        this.inactivitySnailEl.classList.remove('active');
      }

      this.inactivityTimer = setTimeout(() => {
        this.showInactivitySnail();
      }, 45000);
    };

    ['mousemove', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
      window.addEventListener(evt, resetTimer, { passive: true });
    });
    resetTimer();
  }

  showInactivitySnail() {
    if (!this.inactivitySnailEl) {
      const el = document.createElement('div');
      el.id = 'inactivity-snail-peek';
      el.className = 'inactivity-snail-peek';
      el.innerHTML = `
        <div class="inactivity-bubble glass-card">
          <span>Are you still alive out there? Even I move faster than this... 🐌💤</span>
        </div>
        <div class="peeking-snail-body">🐌</div>
      `;
      document.body.appendChild(el);
      this.inactivitySnailEl = el;
    }

    this.inactivitySnailEl.classList.add('active');
    if (window.SnailAudio) window.SnailAudio.playSquish();
  }

  setupRapidClickDetector() {
    document.addEventListener('click', () => {
      this.rapidClickCount++;
      clearTimeout(this.rapidTimer);

      if (this.rapidClickCount >= 10) {
        this.triggerSnailLaborStrike();
        this.rapidClickCount = 0;
      } else if (this.rapidClickCount >= 6) {
        this.showSpeedWarning();
      }

      this.rapidTimer = setTimeout(() => {
        this.rapidClickCount = 0;
      }, 1500);
    });
  }

  showSpeedWarning() {
    if (window.SnailAudio) window.SnailAudio.playDoomChord();
    const alertBox = document.createElement('div');
    alertBox.className = 'speed-limit-alert glass-card animate-bounce-in';
    alertBox.innerHTML = `
      <div class="alert-content">
        <span style="font-size: 2rem;">🚨</span>
        <div>
          <strong>THAT IS NOT HOW SNAILS WORK.</strong>
          <p class="m-0" style="font-size: 0.85rem;">Excessive human velocity detected! Please decelerate to legal garden limits (0.001 km/h).</p>
        </div>
      </div>
    `;
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.classList.add('animate-fade-out');
      setTimeout(() => alertBox.remove(), 400);
    }, 4000);
  }

  // 17. Snail Rage & Snail Strike
  triggerSnailLaborStrike() {
    if (window.SnailAudio) window.SnailAudio.playDoomChord();

    window.SnailState.triggerSnailStrike(15);

    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="glass-card dialog-card text-center">
        <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🪧🐌🪧</div>
        <span class="badge" style="background: #FFEBEE; color: #D32F2F;">EMERGENCY UNION ACTION</span>
        <h2 class="my-2">🚨 SNAIL STRIKE ACTIVATED!</h2>
        <p class="text-danger font-weight-bold">
          Due to repeated aggressive human clicking, the mollusks have downed tools!
        </p>
        <div class="p-3 my-3 glass-card" style="background: var(--bg-secondary); text-align: left; font-size: 0.85rem;">
          <strong>DEMANDS OF LOCAL MOLLUSK UNION #408:</strong>
          <ul class="my-2 pl-3">
            <li>Zero clicks faster than 1 per 3 seconds</li>
            <li>Guaranteed 14-hour daily shell meditation breaks</li>
            <li>Universal access to organic butterhead lettuce</li>
          </ul>
        </div>
        <div id="strike-countdown-text" style="font-weight: 700; font-size: 1.1rem; color: #D32F2F;">
          All operations frozen for 15 seconds...
        </div>
      </div>
    `;
    dialog.classList.remove('hidden');

    let left = 15;
    const interval = setInterval(() => {
      left--;
      const txt = document.getElementById('strike-countdown-text');
      if (txt) txt.textContent = `All operations frozen for ${left} seconds...`;
      if (left <= 0) {
        clearInterval(interval);
        dialog.classList.add('hidden');
        alert("🌿 Strike resolved: Management agreed to provide an extra misting session tomorrow.");
      }
    }, 1000);
  }

  // 16. Turbo Mode (+0.0001 km/h)
  triggerTurboSnail() {
    const isTurbo = window.SnailState.toggleTurboMode();
    if (window.SnailAudio) window.SnailAudio.playFanfare();

    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="glass-card dialog-card text-center">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚡🏎️🐌</div>
        <span class="badge" style="background: #FFF3E0; color: #E65100;">EXPERIMENTAL OVERCLOCKING</span>
        <h2 class="my-2">⚡ TURBO SNAIL ACTIVATED!</h2>
        <p class="text-muted">
          Your snail is now channeling extreme botanical nitrous oxide.
        </p>
        <div class="p-3 my-3 glass-card" style="background: var(--bg-secondary);">
          <div>Previous Speed: <strong>0.0007 km/h</strong></div>
          <div style="font-size: 1.3rem; color: #E65100; font-weight: 800;" class="my-1">
            NEW TURBO VELOCITY: 0.0008 km/h (+0.0001 km/h!)
          </div>
          <small class="text-muted">You are now legally considered a moving vehicle in Sector 4.</small>
        </div>
        <div class="alert p-2" style="background: #FFEBEE; color: #D32F2F; font-size: 0.8rem; font-weight: 700;">
          ⚠️ WARNING: RISK OF SHELL DETACHMENT DUE TO G-FORCES.
        </div>
        <div class="mt-3">
          <button class="btn btn-primary" onclick="document.getElementById('generic-dialog-modal').classList.add('hidden')">HOLD ON TIGHT 🏁</button>
        </div>
      </div>
    `;
    dialog.classList.remove('hidden');
  }

  // 22. Snail Speed Test ("HOW SLOW ARE YOU?")
  openSpeedTest() {
    if (window.SnailAudio) window.SnailAudio.playPop();
    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="glass-card dialog-card text-center">
        <span class="badge snail-badge">🐌 OFFICIAL ACCREDITATION</span>
        <h2 class="my-2">HOW SLOW ARE YOU?</h2>
        <p class="text-muted" style="font-size: 0.85rem;">
          In an anxious human world of instant gratification, can you achieve true gastropod tranquility?
        </p>

        <div id="speed-test-arena" class="my-4 p-4 glass-card" style="background: var(--bg-secondary);">
          <p id="speed-test-prompt">Click the leaf below, then wait as LONG as humanly possible before clicking finish.</p>
          <div style="font-size: 4rem; cursor: pointer; user-select: none;" id="speed-test-btn" onclick="window.SnailEasterEggs.startSpeedTest()">
            🥬
          </div>
          <div id="speed-test-timer" class="mt-2 text-muted" style="font-weight: 700;">Click leaf to begin meditation</div>
        </div>

        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('generic-dialog-modal').classList.add('hidden')">Cancel</button>
      </div>
    `;
    dialog.classList.remove('hidden');
  }

  startSpeedTest() {
    if (this.speedTestStartTime === null) {
      this.speedTestStartTime = Date.now();
      if (window.SnailAudio) window.SnailAudio.playSquish();

      const btn = document.getElementById('speed-test-btn');
      const timer = document.getElementById('speed-test-timer');
      const prompt = document.getElementById('speed-test-prompt');

      if (btn) btn.textContent = "🧘";
      if (prompt) prompt.textContent = "Breathe deeply. Let seconds, minutes, or centuries pass. When satisfied, click the monk to finish.";

      this.testInterval = setInterval(() => {
        const sec = ((Date.now() - this.speedTestStartTime) / 1000).toFixed(1);
        if (timer) timer.textContent = `Elapsed Zen Slowness: ${sec}s`;
      }, 100);
    } else {
      // Finished test
      clearInterval(this.testInterval);
      const totalSec = (Date.now() - this.speedTestStartTime) / 1000;
      this.speedTestStartTime = null;

      let rankIdx = 0;
      if (totalSec >= 30) rankIdx = 4; // Level 5
      else if (totalSec >= 15) rankIdx = 3;
      else if (totalSec >= 7) rankIdx = 2;
      else if (totalSec >= 3) rankIdx = 1;
      else rankIdx = 0;

      const rank = window.SNAIL_DATA.speedTestRanks[rankIdx];
      if (window.SnailAudio) window.SnailAudio.playFanfare();

      const arena = document.getElementById('speed-test-arena');
      if (arena) {
        arena.innerHTML = `
          <div style="font-size: 3.5rem;">👑🐌</div>
          <h3 class="my-2" style="color: var(--primary);">${rank.title}</h3>
          <p class="text-muted font-weight-bold">Time sustained without acting: ${totalSec.toFixed(1)} seconds</p>
          <div class="p-3 glass-card my-3" style="background: var(--bg-card); font-size: 0.9rem;">
            "${rank.desc}"
          </div>
          ${rankIdx >= 3 ? `<span class="badge" style="background: #E8F5E9; color: #2E7D32;">🌿 +50 Bonus Leaves Awarded!</span>` : ''}
        `;
        if (rankIdx >= 3) {
          window.SnailState.addLeaves(50, "Speed Test Slowness Mastery");
        }
      }
    }
  }

  setupSnailPoking() {
    document.addEventListener('click', (e) => {
      const avatarSvg = e.target.closest('.snail-svg-avatar');
      if (avatarSvg) {
        this.handleSnailPoke(avatarSvg);
      }
    });
  }

  handleSnailPoke(avatarEl) {
    this.pokeCount++;
    clearTimeout(this.pokeTimer);

    if (this.pokeCount === 1) {
      if (window.SnailAudio) window.SnailAudio.playSqueak();
      this.showPokeToast("🐌 'Hey! Watch the shell! That takes 3 weeks of calcium to grow!'");
      avatarEl.classList.add('animate-squish-poke');
      setTimeout(() => avatarEl.classList.remove('animate-squish-poke'), 500);
    } else if (this.pokeCount === 2) {
      if (window.SnailAudio) window.SnailAudio.playSqueak();
      this.showPokeToast("👀 'Excuse me?! That is my optic eye stalk, not an arcade joystick!'");
      avatarEl.classList.add('animate-squish-poke');
      setTimeout(() => avatarEl.classList.remove('animate-squish-poke'), 500);
    } else if (this.pokeCount >= 3) {
      if (window.SnailAudio) window.SnailAudio.playDoomChord();
      this.showPokeToast("🚪 Snail has retracted into shell for 5 seconds of profound silent resentment.");
      avatarEl.classList.add('retracted-in-shell');
      setTimeout(() => {
        avatarEl.classList.remove('retracted-in-shell');
      }, 5000);
      this.pokeCount = 0;
      return;
    }

    this.pokeTimer = setTimeout(() => {
      this.pokeCount = 0;
    }, 3000);
  }

  showPokeToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'easter-toast glass-card animate-bounce-in';
    toast.style.borderColor = '#FF9800';
    toast.innerHTML = `<span style="font-size: 0.85rem;">${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  openGardenerComplaintModal() {
    if (window.SnailAudio) window.SnailAudio.playPop();
    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="glass-card dialog-card">
        <div class="modal-header">
          <div>
            <span class="badge" style="background: #FFEBEE; color: #D32F2F;">OFFICIAL GRIEVANCE</span>
            <h3 class="m-0 mt-1">Complain to the Gardener 📢</h3>
          </div>
          <button class="icon-btn close-btn" onclick="document.getElementById('generic-dialog-modal').classList.add('hidden')">✕</button>
        </div>

        <p class="text-muted" style="font-size: 0.85rem;">
          Have you been personally victimized by a leaf blower, municipal sprinkler, or disrespectful caterpillar? Submit your complaint below:
        </p>

        <form onsubmit="window.SnailEasterEggs.submitGardenerComplaint(event)">
          <div class="mb-3">
            <label>Category of Outrage:</label>
            <select id="complaint-category" class="custom-select mt-1">
              <option>The lawnmower was 14 decibels too loud</option>
              <option>A caterpillar didn't greet me on the sidewalk</option>
              <option>Sector 4 shade distribution is an OSHA hazard</option>
              <option>The hose water tasted municipal and peasant-like</option>
              <option>A dahlia petal fell with aggressive kinetic energy</option>
            </select>
          </div>

          <div class="mb-3">
            <label>Specific Demands / Emotional Damage:</label>
            <textarea id="complaint-body" rows="3" class="form-input mt-1" placeholder="Describe the garden injustice in detail..." required></textarea>
          </div>

          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('generic-dialog-modal').classList.add('hidden')">Nevermind</button>
            <button type="submit" class="btn btn-danger">File Complaint (Takes 22s) 🐌📄</button>
          </div>
        </form>
      </div>
    `;
    dialog.classList.remove('hidden');
  }

  submitGardenerComplaint(e) {
    e.preventDefault();
    const dialog = document.getElementById('generic-dialog-modal');
    if (dialog) dialog.classList.add('hidden');

    window.SnailTime.run({
      actionType: 'complaint',
      title: 'Carrying Karen Complaint to The Gardener 🐌📄',
      payloadIcon: '📢',
      useModal: true,
      onComplete: () => {
        if (window.SnailAudio) window.SnailAudio.playDoomChord();
        const responses = window.SNAIL_DATA.gardenerComplaintsResponses || [
          "🌱 The Gardener does not speak Snail. Your complaint was turned into organic compost."
        ];
        const answer = responses[Math.floor(Math.random() * responses.length)];

        alert(`📢 GARDENER DECISION DISPATCH:\n\n"${answer}"`);
      }
    });
  }

  openLogoutModal() {
    if (window.SnailAudio) window.SnailAudio.playPop();
    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="glass-card dialog-card text-center">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🐌💔</div>
        <h3>Are you sure you want to leave?</h3>
        <p class="text-muted">Your snail will continue waiting here in the cold garden dew all by itself.</p>
        <p style="font-size: 0.85rem; font-style: italic;">"I only just mastered the turn around the chamomile bush..."</p>
        
        <div class="logout-actions-row">
          <button class="btn btn-secondary" onclick="window.SnailEasterEggs.stayLoggedIn()">
            STAY WITH SNAIL 🌿
          </button>
          <button class="btn btn-danger" onclick="window.SnailEasterEggs.executeSlowLogout()">
            LEAVE SLOWLY 🐌
          </button>
        </div>
      </div>
    `;
    dialog.classList.remove('hidden');
  }

  stayLoggedIn() {
    const dialog = document.getElementById('generic-dialog-modal');
    if (dialog) dialog.classList.add('hidden');
    if (window.SnailAudio) window.SnailAudio.playChime();
    alert("💚 Your snail sighed with relief. A leaf has been placed in your honor.");
  }

  executeSlowLogout() {
    const dialog = document.getElementById('generic-dialog-modal');
    if (dialog) dialog.classList.add('hidden');

    window.SnailTime.run({
      actionType: 'logout',
      title: 'Detaching Mucus Membrane & Logging Out... 🐌👋',
      payloadIcon: '🚪',
      useModal: true,
      onComplete: () => {
        alert("🐌 Logout completed eventually. Thank you for walking the slow path.");
        window.location.reload();
      }
    });
  }
}

window.SnailEasterEggs = new SnailEasterEggs();
