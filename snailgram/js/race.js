// SnailGram Snail Race™ Mini-Game Controller (Comedy Edition)
class SnailRaceController {
  constructor() {
    this.racer1 = null;
    this.racer2 = null;
    this.betAmount = 10;
    this.selectedWinnerId = null;
    this.isRacing = false;
    this.raceInterval = null;
    this.progress1 = 0;
    this.progress2 = 0;
    this.raceStartTime = 0;
  }

  init() {
    this.initRacers();
  }

  initRacers() {
    const snails = window.SnailState.state.snails;
    this.racer1 = snails[0]; // Gary
    this.racer2 = snails[1]; // Turbo
    this.selectedWinnerId = this.racer1.id;
    this.renderRaceSetup();
  }

  renderRaceSetup() {
    const container = document.getElementById('snail-race-container');
    if (!container) return;

    const snails = window.SnailState.state.snails;
    const userLeaves = window.SnailState.state.user.leaves || 0;

    container.innerHTML = `
      <div class="race-arena-card glass-card">
        <div class="race-header">
          <div class="race-title-group">
            <span class="badge race-badge">🏁 THE AGONIZING GARDEN DERBY</span>
            <h2>SNAIL RACE™</h2>
            <p class="text-muted">The slowest, most agonizingly suspenseful spectator sport in the animal kingdom.</p>
          </div>
          <div class="race-treasury">
            <span>🌿 Your Balance:</span>
            <strong>${userLeaves} Leaves</strong>
          </div>
        </div>

        <!-- Snail Selection & Betting Bar -->
        <div class="race-setup-panel" id="race-setup-controls">
          <div class="racer-selector-group">
            <div class="racer-select-box">
              <label>Lane 1 Athlete:</label>
              <select id="race-select-r1" class="custom-select" onchange="window.SnailRace.handleRacerChange(1, this.value)">
                ${snails.map(s => `<option value="${s.id}" ${s.id === this.racer1.id ? 'selected' : ''}>🐌 ${s.displayName} (${s.speed})</option>`).join('')}
              </select>
            </div>
            <div class="race-vs-badge">VS</div>
            <div class="racer-select-box">
              <label>Lane 2 Athlete:</label>
              <select id="race-select-r2" class="custom-select" onchange="window.SnailRace.handleRacerChange(2, this.value)">
                ${snails.map(s => `<option value="${s.id}" ${s.id === this.racer2.id ? 'selected' : ''}>🐌 ${s.displayName} (${s.speed})</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="betting-controls-row">
            <div class="pick-winner-box">
              <label>Predict Champion:</label>
              <div class="winner-radios">
                <label class="radio-label">
                  <input type="radio" name="pick_winner" value="${this.racer1.id}" checked onchange="window.SnailRace.setWinnerPick('${this.racer1.id}')" />
                  <span>${this.racer1.displayName}</span>
                </label>
                <label class="radio-label">
                  <input type="radio" name="pick_winner" value="${this.racer2.id}" onchange="window.SnailRace.setWinnerPick('${this.racer2.id}')" />
                  <span>${this.racer2.displayName}</span>
                </label>
              </div>
            </div>

            <div class="bet-amount-box">
              <label>Wager Leaves:</label>
              <div class="bet-chips">
                <button type="button" class="chip-btn ${this.betAmount === 0 ? 'active' : ''}" onclick="window.SnailRace.setBet(0)">Free (0 🌿)</button>
                <button type="button" class="chip-btn ${this.betAmount === 10 ? 'active' : ''}" onclick="window.SnailRace.setBet(10)">10 🌿</button>
                <button type="button" class="chip-btn ${this.betAmount === 25 ? 'active' : ''}" onclick="window.SnailRace.setBet(25)">25 🌿</button>
                <button type="button" class="chip-btn ${this.betAmount === 50 ? 'active' : ''}" onclick="window.SnailRace.setBet(50)">50 🌿</button>
              </div>
            </div>

            <button class="btn btn-race-start" id="start-race-btn" onclick="window.SnailRace.startRace()">
              🏁 COMMENCE CRAWL
            </button>
          </div>
        </div>

        <!-- Race Track Arena -->
        <div class="race-tracks-wrapper">
          <!-- Lane 1 -->
          <div class="track-lane" id="lane-1">
            <div class="lane-header">
              <span class="lane-racer-name">Lane 1: ${this.racer1.displayName}</span>
              <span class="lane-dist" id="dist-1">0.0 cm</span>
            </div>
            <div class="track-ground">
              <div class="track-finish-line">🏁</div>
              <div class="track-slime" id="slime-1"></div>
              <div class="track-racer" id="racer-node-1" style="left: 0%;">
                ${window.SnailFeed ? window.SnailFeed.getSnailAvatarSvg(this.racer1) : '🐌'}
              </div>
            </div>
          </div>

          <!-- Lane 2 -->
          <div class="track-lane" id="lane-2">
            <div class="lane-header">
              <span class="lane-racer-name">Lane 2: ${this.racer2.displayName}</span>
              <span class="lane-dist" id="dist-2">0.0 cm</span>
            </div>
            <div class="track-ground">
              <div class="track-finish-line">🏁</div>
              <div class="track-slime" id="slime-2"></div>
              <div class="track-racer" id="racer-node-2" style="left: 0%;">
                ${window.SnailFeed ? window.SnailFeed.getSnailAvatarSvg(this.racer2) : '🐌'}
              </div>
            </div>
          </div>
        </div>

        <!-- Live Race Commentary -->
        <div class="race-commentary-card glass-card">
          <div class="commentary-title">
            <span class="live-dot"></span> 🎙️ LIVE GARDEN DERBY COMMENTARY
          </div>
          <div class="commentary-feed" id="race-commentary-log">
            <div class="commentary-entry text-muted">The mollusks are currently doing their pre-race eye stalk stretches. Ambient humidity 97%.</div>
          </div>
        </div>
      </div>
    `;
  }

  handleRacerChange(lane, snailId) {
    const snail = window.SnailState.state.snails.find(s => s.id === snailId);
    if (!snail) return;

    if (lane === 1) {
      if (snail.id === this.racer2.id) {
        alert("A snail cannot race against its own shell (although existential philosophers have attempted this).");
        return;
      }
      this.racer1 = snail;
    } else {
      if (snail.id === this.racer1.id) {
        alert("A snail cannot race against its own shell (although existential philosophers have attempted this).");
        return;
      }
      this.racer2 = snail;
    }
    this.selectedWinnerId = this.racer1.id;
    this.renderRaceSetup();
  }

  setWinnerPick(snailId) {
    this.selectedWinnerId = snailId;
    if (window.SnailAudio) window.SnailAudio.playPop();
  }

  setBet(amount) {
    const userLeaves = window.SnailState.state.user.leaves || 0;
    if (amount > userLeaves) {
      alert("⚠️ You don't have enough leaves for this extravagant wager!");
      return;
    }
    this.betAmount = amount;
    if (window.SnailAudio) window.SnailAudio.playPop();
    document.querySelectorAll('.bet-chips .chip-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.includes(`${amount} 🌿`) || (amount === 0 && btn.textContent.includes('Free')));
    });
  }

  startRace() {
    if (this.isRacing) return;

    if (this.betAmount > 0) {
      if (!window.SnailState.spendLeaves(this.betAmount, "Wager on Snail Derby")) {
        alert("⚠️ Insufficient leaves to place this bet!");
        return;
      }
    }

    this.isRacing = true;
    this.progress1 = 0;
    this.progress2 = 0;
    this.raceStartTime = Date.now();

    const startBtn = document.getElementById('start-race-btn');
    if (startBtn) {
      startBtn.disabled = true;
      startBtn.textContent = "🏁 CRAWL IN PROGRESS...";
    }

    const log = document.getElementById('race-commentary-log');
    if (log) {
      log.innerHTML = `<div class="commentary-entry highlight">🚩 3... 2... 1... AND THEY ARE OFF! (Hold your breath for the next 45 seconds)</div>`;
    }
    if (window.SnailAudio) window.SnailAudio.playFanfare();

    this.runRaceLoop();
  }

  runRaceLoop() {
    const eventsPool = [
      { text: `🚨 SCANDAL! ${this.racer1.displayName} tested positive for illegal morning dew doping!`, effect: 'r1_boost' },
      { text: `🍄 ${this.racer2.displayName} became confused and is now flirting with a wild mushroom in Lane 2.`, effect: 'r2_slow' },
      { text: `⚡ ${this.racer1.displayName} deployed a tactical mucus slick! Gained 0.4 millimeters of momentum!`, effect: 'r1_boost' },
      { text: `🪱 An activist earthworm crawled onto the track demanding universal mulch healthcare!`, effect: 'none' },
      { text: `💤 ${this.racer1.displayName} decided winning doesn't align with their spiritual journey and fell asleep.`, effect: 'r1_slow' },
      { text: `🧂 FALSE ALARM: A grain of sand was mistaken for Morton table salt. Both racers screamed silently.`, effect: 'both_slow' },
      { text: `🌧️ A single raindrop landed on ${this.racer2.displayName}'s head. Filing an immediate OSHA grievance.`, effect: 'r2_slow' },
      { text: `💨 BREAKING: ${this.racer2.displayName} hit an incredible top velocity of 0.0013 km/h! Police on standby!`, effect: 'r2_boost' }
    ];

    let tickCount = 0;
    const speedMult = window.SnailState.state.settings.speedMultiplier || 1.0;
    const tickInterval = 550 * speedMult;

    this.raceInterval = setInterval(() => {
      tickCount++;

      let step1 = 1.2 + Math.random() * 2.2;
      let step2 = 1.2 + Math.random() * 2.2;

      if (this.racer1.personality === 'chaotic') step1 += 0.5;
      if (this.racer2.personality === 'chaotic') step2 += 0.5;

      // Random outrageous event every 3 ticks
      if (tickCount % 3 === 0) {
        const ev = eventsPool[Math.floor(Math.random() * eventsPool.length)];
        this.addCommentary(ev.text);

        if (ev.effect === 'r1_boost') step1 += 3.8;
        else if (ev.effect === 'r2_boost') step2 += 3.8;
        else if (ev.effect === 'r1_slow') step1 = 0.2;
        else if (ev.effect === 'r2_slow') step2 = 0.2;
        else if (ev.effect === 'both_slow') { step1 = 0.3; step2 = 0.3; }

        if (window.SnailAudio) window.SnailAudio.playSquish();
      }

      this.progress1 = Math.min(100, this.progress1 + step1);
      this.progress2 = Math.min(100, this.progress2 + step2);

      this.updateRaceTrackUI();

      if (this.progress1 >= 100 || this.progress2 >= 100) {
        clearInterval(this.raceInterval);
        this.finishRace();
      }
    }, tickInterval);
  }

  updateRaceTrackUI() {
    const r1Node = document.getElementById('racer-node-1');
    const r2Node = document.getElementById('racer-node-2');
    const s1Node = document.getElementById('slime-1');
    const s2Node = document.getElementById('slime-2');
    const d1Node = document.getElementById('dist-1');
    const d2Node = document.getElementById('dist-2');

    if (r1Node) r1Node.style.left = `calc(${this.progress1}% - 32px)`;
    if (r2Node) r2Node.style.left = `calc(${this.progress2}% - 32px)`;
    if (s1Node) s1Node.style.width = `${this.progress1}%`;
    if (s2Node) s2Node.style.width = `${this.progress2}%`;

    if (d1Node) d1Node.textContent = `${(this.progress1 * 0.15).toFixed(1)} cm`;
    if (d2Node) d2Node.textContent = `${(this.progress2 * 0.15).toFixed(1)} cm`;
  }

  addCommentary(text) {
    const log = document.getElementById('race-commentary-log');
    if (!log) return;

    const entry = document.createElement('div');
    entry.className = 'commentary-entry';
    entry.textContent = text;
    log.prepend(entry);
  }

  finishRace() {
    this.isRacing = false;
    const winner = this.progress1 >= this.progress2 ? this.racer1 : this.racer2;
    const totalTimeSec = Math.round((Date.now() - this.raceStartTime) / 1000);
    const userWonBet = this.selectedWinnerId === winner.id;

    if (window.SnailAudio) window.SnailAudio.playFanfare();
    window.SnailState.unlockAchievement('race_champion');

    let rewardHtml = '';
    if (userWonBet && this.betAmount > 0) {
      const prize = this.betAmount * 2;
      window.SnailState.addLeaves(prize, "Snail Derby Wager Won");
      rewardHtml = `<div class="race-win-payout">🎉 YOUR GAMBLING PAID OFF! You earned 🌿 +${prize} Leaves!</div>`;
    } else if (this.betAmount > 0) {
      rewardHtml = `<div class="race-loss-payout">🍂 Your chosen athlete collapsed 3mm before the line. Wager lost to the bookmaker slug.</div>`;
    }

    const dialog = document.getElementById('generic-dialog-modal');
    if (dialog) {
      dialog.innerHTML = `
        <div class="glass-card dialog-card text-center">
          <div class="derby-trophy">🏆</div>
          <h2>${winner.displayName.toUpperCase()} WINS!</h2>
          <p class="text-muted">Total race time: <strong>${Math.floor(totalTimeSec / 60)}m ${totalTimeSec % 60}s</strong> (A blur of raw gastropod power)</p>
          <div class="winner-snail-showcase">
            ${window.SnailFeed ? window.SnailFeed.getSnailAvatarSvg(winner) : '🐌'}
          </div>
          <p class="race-victory-quote">"I'd like to thank my mucus glands, my parents who were both garden snails, and the absence of salt."</p>
          ${rewardHtml}
          <div class="mt-4">
            <button class="btn btn-primary" onclick="window.SnailRace.resetRaceAfterWin()">Race Again 🏁</button>
          </div>
        </div>
      `;
      dialog.classList.remove('hidden');
    }
  }

  resetRaceAfterWin() {
    const dialog = document.getElementById('generic-dialog-modal');
    if (dialog) dialog.classList.add('hidden');
    this.renderRaceSetup();
  }
}

window.SnailRace = new SnailRaceController();
