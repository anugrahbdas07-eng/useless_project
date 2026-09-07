// SnailGram Snail Reels™ Controller (The World's Slowest Vertical Video — 16 Reels Edition)
class SnailReelsController {
  constructor() {
    this.currentReelIndex = 0;
    this.reels = [];
    this.isPlayingAudio = false;
  }

  init() {
    this.reels = window.SNAIL_DATA.reels || [];
    this.renderReelsSelectionGrid();
    this.renderCurrentReel();

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (window.SnailApp.currentView !== 'reels') return;
      if (e.key === 'ArrowDown' || e.key === 'j') this.nextReel();
      if (e.key === 'ArrowUp' || e.key === 'k') this.prevReel();
    });
  }

  renderReelsSelectionGrid() {
    const container = document.getElementById('reels-selection-grid');
    if (!container) return;

    let html = '';
    this.reels.forEach((reel, idx) => {
      const isCurrent = idx === this.currentReelIndex;
      html += `
        <div class="reel-thumbnail-card glass-card ${isCurrent ? 'active-thumb' : ''}" onclick="window.SnailReels.selectReel(${idx})">
          <div class="thumb-media-box">
            ${this.getReelSvgGraphic(reel.theme, true)}
            <div class="thumb-badge">👁️ ${reel.views}</div>
            <div class="thumb-author">@${reel.authorUsername}</div>
          </div>
          <div class="thumb-meta-p">
            <h5>${reel.title}</h5>
            <small class="text-muted">${reel.tags.join(' ')}</small>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  selectReel(index) {
    this.currentReelIndex = index;
    if (window.SnailAudio) window.SnailAudio.playPop();
    this.renderReelsSelectionGrid();
    this.renderCurrentReel();
    this.playCurrentReelAudio();

    // Scroll player into view
    const player = document.getElementById('reels-main-player-card');
    if (player) {
      player.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  nextReel() {
    if (this.currentReelIndex < this.reels.length - 1) {
      this.currentReelIndex++;
    } else {
      this.currentReelIndex = 0;
    }
    this.selectReel(this.currentReelIndex);
  }

  prevReel() {
    if (this.currentReelIndex > 0) {
      this.currentReelIndex--;
    } else {
      this.currentReelIndex = this.reels.length - 1;
    }
    this.selectReel(this.currentReelIndex);
  }

  renderCurrentReel() {
    const container = document.getElementById('reels-player-content');
    if (!container) return;

    const reel = this.reels[this.currentReelIndex];
    if (!reel) return;

    const authorSnail = window.SnailState.state.snails.find(s => s.id === reel.authorId) || {};
    const likeActive = reel.userLiked ? 'liked' : '';

    container.innerHTML = `
      <div class="reel-vertical-viewport">
        <!-- Live Animated SVG Canvas -->
        <div class="reel-scene-stage">
          ${this.getReelSvgGraphic(reel.theme, false)}
        </div>

        <!-- Top Header Overlay -->
        <div class="reel-overlay-top">
          <span class="badge" style="background: rgba(0,0,0,0.6); color: #FFF; backdrop-filter: blur(4px);">
            🎬 SNAIL REELS™ • ${this.currentReelIndex + 1}/${this.reels.length}
          </span>
          <span class="badge" style="background: rgba(76, 175, 80, 0.85); color: #FFF;">
            SLOW 4K
          </span>
        </div>

        <!-- Right Side Floating Actions -->
        <div class="reel-side-actions">
          <button class="reel-action-btn ${likeActive}" onclick="window.SnailReels.handleReelLike('${reel.id}')" title="Deliver Slow Like">
            <span class="action-icon">${reel.userLiked ? '❤️' : '🤍'}</span>
            <span class="action-count">${reel.likesCount.toLocaleString()}</span>
          </button>

          <button class="reel-action-btn" onclick="window.SnailReels.handleReelComment('${reel.id}')" title="Comment (Takes 7s)">
            <span class="action-icon">💬</span>
            <span class="action-count">${reel.commentsCount.toLocaleString()}</span>
          </button>

          <button class="reel-action-btn" onclick="window.SnailReels.handleReelShare('${reel.id}')" title="Share Slow Reel">
            <span class="action-icon">🍃</span>
            <span class="action-count">Share</span>
          </button>

          <button class="reel-action-btn" onclick="window.SnailReels.toggleAudio()" title="Sound Track">
            <span class="action-icon">${this.isPlayingAudio ? '🔊' : '🔈'}</span>
            <span class="action-count">Music</span>
          </button>
        </div>

        <!-- Bottom Info Overlay -->
        <div class="reel-overlay-bottom">
          <div class="reel-author-tag" onclick="window.SnailApp.navigateToProfile('${authorSnail.id}')">
            <div class="reel-author-avatar">
              ${window.SnailFeed ? window.SnailFeed.getSnailAvatarSvg(authorSnail) : ''}
            </div>
            <strong>${reel.authorName}</strong>
            <span class="reel-follow-chip">+ Follow</span>
          </div>

          <h4 class="reel-title-text">${reel.title}</h4>
          <p class="reel-desc-text">${reel.description}</p>

          <div class="reel-tags-row">
            ${reel.tags.map(t => `<span class="hashtag" style="color: #A7FFEB; margin-right: 6px;">${t}</span>`).join('')}
          </div>

          <div class="reel-sound-track" onclick="window.SnailReels.toggleAudio()">
            <span>🎵</span>
            <div class="sound-marquee">${reel.soundTrack}</div>
            <div class="audio-bars">
              <span class="bar b1"></span>
              <span class="bar b2"></span>
              <span class="bar b3"></span>
            </div>
          </div>
        </div>

        <!-- Next / Prev Quick Floating Arrows -->
        <button class="reel-nav-float btn-prev" onclick="window.SnailReels.prevReel()" title="Previous Reel (Key: ↑)">▲</button>
        <button class="reel-nav-float btn-next" onclick="window.SnailReels.nextReel()" title="Next Reel (Key: ↓)">▼</button>
      </div>
    `;
  }

  playCurrentReelAudio() {
    this.isPlayingAudio = true;
    const reel = this.reels[this.currentReelIndex];
    if (!reel || !window.SnailAudio) return;

    if (['disco_dance', 'slime_shuffle'].includes(reel.theme)) {
      window.SnailAudio.playDiscoBeat();
    } else if (['speed_rush', 'shopping_haul', 'vacation_beach'].includes(reel.theme)) {
      window.SnailAudio.playFanfare();
    } else if (['epic_trek', 'conspiracy_podcast', 'chef_critic'].includes(reel.theme)) {
      window.SnailAudio.playDramaticTrekSound();
    } else if (['salt_critique', 'awkward_date'].includes(reel.theme)) {
      window.SnailAudio.playDoomChord();
    } else if (['romantic_date', 'snail_yoga', 'snail_gaming'].includes(reel.theme)) {
      window.SnailAudio.playChime();
    } else {
      window.SnailAudio.playLeafRustle();
    }
  }

  toggleAudio() {
    this.isPlayingAudio = !this.isPlayingAudio;
    if (this.isPlayingAudio) {
      this.playCurrentReelAudio();
    }
    this.renderCurrentReel();
  }

  handleReelLike(reelId) {
    const reel = this.reels.find(r => r.id === reelId);
    if (!reel) return;

    if (reel.userLiked) {
      reel.likesCount--;
      reel.userLiked = false;
      this.renderCurrentReel();
      return;
    }

    if (window.SnailAudio) window.SnailAudio.playPop();

    window.SnailTime.run({
      actionType: 'like',
      title: 'Carrying Reel Like to Author... ❤️',
      payloadIcon: '❤️',
      useModal: false,
      onComplete: () => {
        reel.likesCount++;
        reel.userLiked = true;
        window.SnailState.addLeaves(2, "Reel Interaction");
        window.SnailState.unlockAchievement('reels_connoisseur');
        if (window.SnailAudio) window.SnailAudio.playNotificationSound();
        this.renderCurrentReel();
      }
    });
  }

  handleReelComment(reelId) {
    const comment = prompt("🐌 Write a comment on this Snail Reel (takes 7s to crawl into the comments section):");
    if (comment && comment.trim()) {
      window.SnailTime.run({
        actionType: 'comment',
        title: 'Delivering Reel Comment... 💬',
        payloadIcon: '💬',
        useModal: false,
        onComplete: () => {
          const reel = this.reels.find(r => r.id === reelId);
          if (reel) reel.commentsCount++;
          window.SnailState.addLeaves(3, "Reel Commentary");
          if (window.SnailAudio) window.SnailAudio.playNotificationSound();
          this.renderCurrentReel();
          alert("✅ Comment pinned to the mollusk reel!");
        }
      });
    }
  }

  handleReelShare(reelId) {
    if (window.SnailAudio) window.SnailAudio.playNotificationSound();
    alert("🌿 Reel URL copied! A messenger slug has departed to notify your friends. (ETA: Friday)");
  }

  // Rich Graphic Scenes for Vertical Reels
  getReelSvgGraphic(theme, isThumb = false) {
    switch (theme) {
      case 'disco_dance':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#1A0933"/>
            <polygon points="180,40 20,400 60,400" fill="rgba(255, 64, 129, 0.25)"/>
            <polygon points="180,40 300,400 340,400" fill="rgba(0, 229, 255, 0.25)"/>
            <line x1="180" y1="0" x2="180" y2="50" stroke="#FFF" stroke-width="2"/>
            <circle cx="180" cy="65" r="25" fill="#E0E0E0" stroke="#FFF" stroke-width="2"/>
            <g transform="translate(140, 320)">
              <ellipse cx="40" cy="90" rx="35" ry="12" fill="#81C784"/>
              <path d="M55 85 C65 65, 75 50, 85 45 C88 55, 80 75, 70 85 Z" fill="#81C784"/>
              <circle cx="35" cy="65" r="28" fill="#4CAF50" stroke="#FFF" stroke-width="2"/>
              <text x="70" y="10" font-size="24">🪩</text>
            </g>
          </svg>
        `;

      case 'speed_rush':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#212121"/>
            <line x1="-50" y1="200" x2="400" y2="200" stroke="#00E676" stroke-width="4" stroke-dasharray="20,15"/>
            <line x1="-50" y1="360" x2="400" y2="360" stroke="#FF5722" stroke-width="6" stroke-dasharray="40,25"/>
            <g transform="translate(100, 270)">
              <ellipse cx="60" cy="55" rx="55" ry="14" fill="#FF8A65"/>
              <circle cx="50" cy="30" r="32" fill="#FF5722" stroke="#D84315" stroke-width="3"/>
              <rect x="110" y="10" width="18" height="8" rx="2" fill="#111"/>
              <text x="-15" y="-10" font-size="28">💨💨</text>
            </g>
            <rect x="90" y="80" width="180" height="50" rx="10" fill="rgba(0,0,0,0.7)" stroke="#FF5722" stroke-width="2"/>
            <text x="180" y="112" fill="#00E676" font-family="'Fredoka', sans-serif" font-size="20" font-weight="bold" text-anchor="middle">0.0008 km/h</text>
          </svg>
        `;

      case 'romantic_date':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#2E112D"/>
            <path d="M180 80 Q100 80 80 180 Q180 200 280 180 Q260 80 180 80 Z" fill="#E91E63"/>
            <rect x="165" y="180" width="30" height="150" fill="#F8BBD0"/>
            <g transform="translate(110, 310)">
              <ellipse cx="40" cy="50" rx="25" ry="10" fill="#81C784"/>
              <circle cx="35" cy="35" r="20" fill="#4CAF50"/>
              <ellipse cx="100" cy="50" rx="25" ry="10" fill="#DCEDC8"/>
              <circle cx="105" cy="35" r="20" fill="#8BC34A"/>
              <text x="60" y="0" font-size="36">💕</text>
            </g>
          </svg>
        `;

      case 'epic_trek':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#37474F"/>
            <rect x="0" y="420" width="360" height="220" fill="#455A64"/>
            <g transform="translate(130, 370)">
              <ellipse cx="50" cy="50" rx="40" ry="12" fill="#D7CCC8"/>
              <circle cx="45" cy="30" r="26" fill="#795548"/>
              <text x="30" y="-10" font-size="14" fill="#FFF">🚶 2.1mm</text>
            </g>
            <rect x="0" y="0" width="360" height="70" fill="#000"/>
            <rect x="0" y="570" width="360" height="70" fill="#000"/>
          </svg>
        `;

      case 'gym_workout':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#1B1B1B"/>
            <line x1="60" y1="280" x2="300" y2="280" stroke="#795548" stroke-width="8" stroke-linecap="round"/>
            <circle cx="60" cy="280" r="20" fill="#FFC107"/>
            <circle cx="300" cy="280" r="20" fill="#FFC107"/>
            <g transform="translate(135, 330)">
              <ellipse cx="45" cy="40" rx="35" ry="12" fill="#FF8A65"/>
              <circle cx="45" cy="20" r="25" fill="#FF5722"/>
              <text x="25" y="-15" font-size="28">💪</text>
            </g>
          </svg>
        `;

      case 'salt_critique':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#4A148C"/>
            <rect x="130" y="140" width="100" height="180" rx="10" fill="#ECEFF1" stroke="#B0BEC5" stroke-width="4"/>
            <text x="180" y="240" fill="#B71C1C" font-family="'Fredoka', sans-serif" font-size="24" font-weight="bold" text-anchor="middle">SALT</text>
            <g transform="translate(130, 360)">
              <ellipse cx="50" cy="50" rx="40" ry="12" fill="#DCEDC8"/>
              <circle cx="45" cy="30" r="24" fill="#8BC34A"/>
              <text x="80" y="10" font-size="28">😡🚫</text>
            </g>
          </svg>
        `;

      case 'slime_shuffle':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#0D0221"/>
            <circle cx="180" cy="320" r="140" fill="none" stroke="#FF007F" stroke-width="4" stroke-dasharray="10,10"/>
            <g transform="translate(130, 260)">
              <circle cx="50" cy="50" r="38" fill="#4CAF50" stroke="#00F5D4" stroke-width="4"/>
              <path d="M50 50 A 24 24 0 0 1 65 35 A 15 15 0 0 1 50 65" fill="none" stroke="#FFF" stroke-width="3"/>
              <ellipse cx="50" cy="95" rx="35" ry="12" fill="#81C784"/>
              <text x="80" y="10" font-size="32">⚡</text>
              <text x="-15" y="40" font-size="32">🔥</text>
            </g>
            <text x="180" y="520" fill="#00F5D4" font-family="'Fredoka', sans-serif" font-size="20" font-weight="bold" text-anchor="middle">THE SLIME SHUFFLE</text>
          </svg>
        `;

      case 'awkward_date':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#1C1917"/>
            <ellipse cx="180" cy="360" rx="140" ry="40" fill="#78350F"/>
            <rect x="175" y="300" width="10" height="40" fill="#FEF08A"/>
            <polygon points="180,285 170,300 190,300" fill="#F97316"/>
            <g transform="translate(60, 310)">
              <circle cx="30" cy="30" r="22" fill="#4CAF50"/>
              <text x="25" y="-5" font-size="20">💧</text>
            </g>
            <g transform="translate(240, 310)">
              <circle cx="30" cy="30" r="22" fill="#8BC34A"/>
              <text x="20" y="-5" font-size="20">🤨</text>
            </g>
            <rect x="140" y="380" width="80" height="50" fill="#FFF" rx="4"/>
            <text x="180" y="405" fill="#111" font-size="10" font-weight="bold" text-anchor="middle">BILL: 40 🌿</text>
            <text x="180" y="420" fill="#E11D48" font-size="9" text-anchor="middle">SPLIT? 💸</text>
          </svg>
        `;

      case 'sleep_asmr':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#030712"/>
            <circle cx="280" cy="100" r="40" fill="#FEF08A" opacity="0.9"/>
            <g transform="translate(130, 320)">
              <circle cx="50" cy="50" r="42" fill="#6B7280" stroke="#4B5563" stroke-width="4"/>
              <text x="80" y="-10" font-size="32" fill="#93C5FD">Z</text>
              <text x="105" y="-35" font-size="24" fill="#93C5FD">z</text>
              <text x="120" y="-55" font-size="16" fill="#93C5FD">z</text>
            </g>
            <text x="180" y="500" fill="#93C5FD" font-family="'Fredoka', sans-serif" font-size="18" text-anchor="middle">16-HOUR ASMR NAP 💤</text>
          </svg>
        `;

      case 'eating_mukbang':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#064E3B"/>
            <path d="M60 200 Q180 120 300 200 Q320 380 180 420 Q40 380 60 200 Z" fill="#10B981" stroke="#059669" stroke-width="6"/>
            <path d="M180 160 Q180 300 180 420" stroke="#ECFDF5" stroke-width="4"/>
            <g transform="translate(130, 240)">
              <circle cx="50" cy="50" r="28" fill="#8BC34A"/>
              <text x="25" y="-5" font-size="32">😋🍴</text>
              <text x="75" y="40" font-size="20">CRUNCH!</text>
            </g>
          </svg>
        `;

      case 'snail_gaming':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#111827"/>
            <rect x="70" y="140" width="220" height="150" rx="8" fill="#1F2937" stroke="#3B82F6" stroke-width="4"/>
            <rect x="130" y="190" width="50" height="50" fill="#16A34A"/>
            <rect x="130" y="215" width="50" height="25" fill="#854D0E"/>
            <g transform="translate(130, 360)">
              <circle cx="50" cy="50" r="32" fill="#FF5722"/>
              <text x="30" y="0" font-size="28">🎧🎮</text>
            </g>
            <text x="180" y="520" fill="#60A5FA" font-family="'Fredoka', sans-serif" font-size="18" font-weight="bold" text-anchor="middle">APM: 0.2 ACTIONS/MIN</text>
          </svg>
        `;

      case 'chef_critic':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#450A0A"/>
            <g transform="translate(130, 280)">
              <circle cx="50" cy="50" r="30" fill="#8BC34A"/>
              <text x="35" y="0" font-size="32">👨‍🍳</text>
              <text x="65" y="25" font-size="28">🔥</text>
            </g>
            <text x="180" y="440" fill="#FCA5A5" font-family="'Fredoka', sans-serif" font-size="24" font-weight="bold" text-anchor="middle">IT'S RAW! 😡</text>
            <text x="180" y="475" fill="#FECDD3" font-size="14" text-anchor="middle">The mulch is bone dry!</text>
          </svg>
        `;

      case 'snail_yoga':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#14532D"/>
            <ellipse cx="180" cy="400" rx="120" ry="30" fill="#86EFAC" opacity="0.4"/>
            <g transform="translate(130, 290)">
              <circle cx="50" cy="50" r="32" fill="#795548"/>
              <text x="25" y="-10" font-size="36">🧘🌸</text>
            </g>
            <text x="180" y="500" fill="#BBF7D0" font-family="'Fredoka', sans-serif" font-size="20" font-weight="bold" text-anchor="middle">DOWNWARD SNAIL POSE</text>
          </svg>
        `;

      case 'shopping_haul':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#4A044E"/>
            <g transform="translate(130, 280)">
              <circle cx="50" cy="50" r="32" fill="#4CAF50"/>
              <text x="35" y="-5" font-size="32">🍄</text>
              <text x="65" y="40" font-size="28">🛍️</text>
            </g>
            <text x="180" y="480" fill="#F472B6" font-family="'Fredoka', sans-serif" font-size="20" font-weight="bold" text-anchor="middle">GUCCI SHROOM UNBOXING 🍄</text>
          </svg>
        `;

      case 'conspiracy_podcast':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#042F2E"/>
            <polygon points="180,60 80,380 280,380" fill="rgba(45, 212, 191, 0.25)"/>
            <circle cx="180" cy="60" r="30" fill="#2DD4BF"/>
            <g transform="translate(130, 310)">
              <circle cx="50" cy="50" r="30" fill="#009688"/>
              <text x="35" y="0" font-size="32">🛸🎙️</text>
            </g>
            <text x="180" y="500" fill="#5EEAD4" font-family="'Fredoka', sans-serif" font-size="16" font-weight="bold" text-anchor="middle">ARE EARTHWORMS SPIES? 🪱📡</text>
          </svg>
        `;

      case 'vacation_beach':
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#0C4A6E"/>
            <rect x="0" y="380" width="360" height="260" fill="#FDE047"/>
            <text x="180" y="240" font-size="48" text-anchor="middle">🏖️</text>
            <g transform="translate(130, 340)">
              <circle cx="50" cy="50" r="30" fill="#4CAF50"/>
              <text x="35" y="10" font-size="28">🕶️🧴</text>
            </g>
            <text x="180" y="500" fill="#0369A1" font-family="'Fredoka', sans-serif" font-size="18" font-weight="bold" text-anchor="middle">POND VACATION SPF 5000</text>
          </svg>
        `;

      default:
        return `
          <svg viewBox="0 0 360 640" class="reel-graphic-svg" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="640" fill="#1B3320"/>
            <circle cx="180" cy="320" r="40" fill="#4CAF50"/>
            <text x="180" y="330" font-size="30" text-anchor="middle">🐌</text>
          </svg>
        `;
    }
  }
}

window.SnailReels = new SnailReelsController();
