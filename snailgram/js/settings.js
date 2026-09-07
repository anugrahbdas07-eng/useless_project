// SnailGram Settings Controller
class SnailSettingsController {
  constructor() {}

  init() {
    this.applyTheme(window.SnailState.state.settings.theme);
    this.renderSettingsView();
  }

  renderSettingsView() {
    const container = document.getElementById('settings-view-container');
    if (!container) return;

    const s = window.SnailState.state.settings;

    container.innerHTML = `
      <div class="settings-wrapper glass-card">
        <div class="settings-header">
          <span class="badge">⚙️ GARDEN PREFERENCES</span>
          <h2>Application Settings</h2>
          <p class="text-muted">Configure the atmosphere and slowness of your SnailGram experience.</p>
        </div>

        <div class="settings-sections-list">
          <!-- Theme -->
          <div class="setting-item-row">
            <div class="setting-meta">
              <strong>Garden Atmosphere (Theme)</strong>
              <p class="text-muted">Choose between sunlit botanical morning and midnight dew</p>
            </div>
            <div class="setting-control">
              <select id="setting-theme-select" class="custom-select" onchange="window.SnailSettings.handleThemeChange(this.value)">
                <option value="light" ${s.theme === 'light' ? 'selected' : ''}>☀️ Light Garden (Sage & Cream)</option>
                <option value="dark" ${s.theme === 'dark' ? 'selected' : ''}>🌙 Dark Garden (Moss & Slate)</option>
              </select>
            </div>
          </div>

          <!-- Snail Time Multiplier -->
          <div class="setting-item-row">
            <div class="setting-meta">
              <strong>Snail Time™ Velocity</strong>
              <p class="text-muted">Control the deliberate latency for likes, follows, and messages</p>
            </div>
            <div class="setting-control">
              <select id="setting-speed-select" class="custom-select" onchange="window.SnailSettings.handleSpeedChange(this.value)">
                <option value="1.0" ${s.speedMultiplier === 1.0 ? 'selected' : ''}>🐌 Normal Snail Pace (Standard)</option>
                <option value="2.0" ${s.speedMultiplier === 2.0 ? 'selected' : ''}>🧘 Extra Slow (For Zen Masters)</option>
                <option value="0.5" ${s.speedMultiplier === 0.5 ? 'selected' : ''}>🏎️ Turbo Snail (Still delightfully slow)</option>
              </select>
            </div>
          </div>

          <!-- Sound Synthesizer -->
          <div class="setting-item-row">
            <div class="setting-meta">
              <strong>Gastropod Sound Synthesizer</strong>
              <p class="text-muted">Procedural squishes, leaf rustles, and chimes via Web Audio API</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" ${s.soundEnabled ? 'checked' : ''} onchange="window.SnailSettings.handleSoundToggle(this.checked)" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>

          <!-- Animations -->
          <div class="setting-item-row">
            <div class="setting-meta">
              <strong>Garden Particle & Slime Animations</strong>
              <p class="text-muted">Floating leaves and crawling snail runners</p>
            </div>
            <div class="setting-control">
              <label class="toggle-switch">
                <input type="checkbox" ${s.animationsEnabled ? 'checked' : ''} onchange="window.SnailSettings.handleAnimationsToggle(this.checked)" />
                <span class="slider round"></span>
              </label>
            </div>
          </div>

          <!-- Data Reset -->
          <div class="setting-item-row danger-row">
            <div class="setting-meta">
              <strong class="text-danger">Reset Garden Ecosystem</strong>
              <p class="text-muted">Clear all local posts, leaves, and custom snail data back to defaults</p>
            </div>
            <div class="setting-control">
              <button class="btn btn-danger" onclick="window.SnailSettings.confirmReset()">⚠️ Reset All Data</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  handleThemeChange(val) {
    this.applyTheme(val);
    window.SnailState.updateSettings({ theme: val });
    if (window.SnailAudio) window.SnailAudio.playPop();
  }

  applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-garden');
      document.body.classList.remove('light-garden');
    } else {
      document.body.classList.remove('dark-garden');
      document.body.classList.add('light-garden');
    }
  }

  handleSpeedChange(val) {
    const mult = parseFloat(val);
    window.SnailState.updateSettings({ speedMultiplier: mult });
    if (window.SnailAudio) window.SnailAudio.playSquish();
  }

  handleSoundToggle(val) {
    window.SnailState.updateSettings({ soundEnabled: val });
    if (val && window.SnailAudio) window.SnailAudio.playPop();
  }

  handleAnimationsToggle(val) {
    window.SnailState.updateSettings({ animationsEnabled: val });
    document.body.classList.toggle('reduce-motion', !val);
  }

  confirmReset() {
    if (confirm("🐌 Are you certain? This will wipe your leaves, your snail shell styling, and return the garden to day one.")) {
      window.SnailState.resetAllData();
      alert("🌿 Garden has returned to its primordial soil. Refreshing ecosystem...");
      window.location.reload();
    }
  }
}

window.SnailSettings = new SnailSettingsController();
