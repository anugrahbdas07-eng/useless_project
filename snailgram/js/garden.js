// SnailGram Garden (Explore) Controller — Garden Map & Snail Algorithm™
class SnailGardenController {
  constructor() {
    this.currentFilter = 'all';
    this.searchQuery = '';
  }

  init() {
    this.renderTrendingPodium();
    this.renderHashtags();
    this.renderExploreGrid();
    this.renderGardenMap();

    window.SnailState.on('snail:followed', () => {
      this.renderTrendingPodium();
    });
  }

  renderTrendingPodium() {
    const container = document.getElementById('garden-podium-container');
    if (!container) return;

    const snails = [...window.SnailState.state.snails].sort((a, b) => b.followers - a.followers);
    const top3 = snails.slice(0, 3);
    const medals = ['🥇', '🥈', '🥉'];

    let html = '';
    top3.forEach((snail, idx) => {
      const isFollowing = window.SnailState.isFollowing(snail.id);
      const personality = window.SNAIL_DATA.personalities[snail.personality] || {};

      html += `
        <div class="podium-card glass-card rank-${idx + 1}">
          <div class="podium-medal">${medals[idx]}</div>
          <div class="podium-avatar-wrapper" onclick="window.SnailApp.navigateToProfile('${snail.id}')">
            ${window.SnailFeed ? window.SnailFeed.getSnailAvatarSvg(snail) : ''}
          </div>
          <h4 class="podium-name" onclick="window.SnailApp.navigateToProfile('${snail.id}')">${snail.displayName}</h4>
          <span class="podium-handle">@${snail.username}</span>
          <div class="podium-badge" style="background: ${personality.color || '#4CAF50'}22; color: ${personality.color || '#4CAF50'}">
            ${personality.icon || '🐌'} ${personality.name || ''}
          </div>
          <div class="podium-stats">
            <span><strong>${snail.followers.toLocaleString()}</strong> followers</span>
            <span>⚡ ${snail.speed} (${snail.speedRank || '#1'})</span>
            <span class="text-muted" style="font-size: 0.7rem;">Location: ${snail.location || 'Sector 4'}</span>
          </div>
          <button class="btn btn-sm ${isFollowing ? 'btn-following' : 'btn-primary'}" 
                  id="podium-follow-btn-${snail.id}"
                  onclick="window.SnailGarden.handleFollow('${snail.id}')">
            ${isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderGardenMap() {
    const container = document.getElementById('garden-map-container');
    if (!container) return;

    const districts = window.SNAIL_DATA.gardenDistricts;
    const snails = window.SnailState.state.snails;

    let markersHtml = '';
    snails.forEach(s => {
      // Pick matching district or random
      const dist = districts.find(d => s.location && s.location.includes(d.name.split(' ')[1])) || districts[Math.floor(Math.random() * districts.length)];
      markersHtml += `
        <div class="map-snail-marker" style="left: ${dist.coord.x}%; top: ${dist.coord.y}%;" title="${s.displayName} is here (${dist.name})" onclick="window.SnailApp.navigateToProfile('${s.id}')">
          <span class="marker-avatar">${s.displayName.split(' ')[0]} 🐌</span>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="garden-map-card glass-card">
        <div class="map-header">
          <div>
            <span class="badge snail-badge">🗺️ REAL-TIME GASTROPOD RADAR</span>
            <h3>The SnailGram World Map</h3>
            <p class="text-muted" style="font-size: 0.8rem;">Every snail physically crawls through these sectors. Zero virtual teleportation.</p>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="window.SnailGarden.runSnailAlgorithm()">
            🧠 Run Snail Algorithm™
          </button>
        </div>

        <div class="garden-interactive-map">
          <!-- District Landmarks -->
          ${districts.map(d => `
            <div class="district-landmark" style="left: ${d.coord.x}%; top: ${d.coord.y}%;">
              <span class="landmark-icon">${d.name.split(' ')[0]}</span>
              <span class="landmark-label">${d.name}</span>
            </div>
          `).join('')}

          <!-- Live Snail Markers -->
          ${markersHtml}

          <!-- Slime trails connecting districts -->
          <svg class="map-trails-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M50 15 Q25 35 40 65 T50 92" fill="none" stroke="rgba(167,255,235,0.4)" stroke-width="2" stroke-dasharray="2,2"/>
            <path d="M25 35 Q75 40 65 75 T50 92" fill="none" stroke="rgba(167,255,235,0.4)" stroke-width="2" stroke-dasharray="2,2"/>
          </svg>
        </div>
      </div>
    `;
  }

  // The hilarious Snail Algorithm™
  runSnailAlgorithm() {
    if (window.SnailAudio) window.SnailAudio.playChime();
    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="glass-card dialog-card text-center">
        <span class="badge" style="background: #EDE7F6; color: #673AB7;">🧠 AI RECOMMENDATION SYSTEM</span>
        <h3 class="my-2">THE SNAIL ALGORITHM™</h3>
        <p class="text-muted" style="font-size: 0.85rem;" id="algo-status">
          Deploying neural mucus networks to analyze your taste...
        </p>

        <div class="progress-bar-bg my-3">
          <div class="progress-bar-fill" id="algo-progress-bar" style="width: 15%;"></div>
        </div>

        <div id="algo-result-box" class="p-3 glass-card hidden" style="background: var(--bg-secondary);">
          <!-- Injected dynamically -->
        </div>
      </div>
    `;
    dialog.classList.remove('hidden');

    const steps = [
      { p: 35, text: "Scanning soil nitrogen levels in Sector 4..." },
      { p: 65, text: "Consulting with ancient server slug under flowerpot #2..." },
      { p: 90, text: "Synthesizing deep gastropod affinity matrix..." },
      { p: 100, text: "Algorithm has reached a philosophical verdict!" }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        const step = steps[i];
        const bar = document.getElementById('algo-progress-bar');
        const status = document.getElementById('algo-status');
        if (bar) bar.style.width = step.p + '%';
        if (status) status.textContent = step.text;
        i++;
      } else {
        clearInterval(interval);
        const resultBox = document.getElementById('algo-result-box');
        const randomSnail = window.SnailState.state.snails[Math.floor(Math.random() * window.SnailState.state.snails.length)];

        if (resultBox) {
          resultBox.classList.remove('hidden');
          resultBox.innerHTML = `
            <h4>VERDICT: You might like @${randomSnail.username}</h4>
            <div class="my-2">${window.SnailFeed.getSnailAvatarSvg(randomSnail)}</div>
            <p style="font-style: italic; font-size: 0.9rem;" class="my-2">
              Why did the algorithm pick this snail?
            </p>
            <div class="alert p-2" style="background: #E8F5E9; border-radius: 6px; font-weight: 700; color: #2E7D32;">
              "We honestly don't know. The server snail just vibed with it."
            </div>
            <button class="btn btn-primary btn-sm mt-3" onclick="window.SnailApp.navigateToProfile('${randomSnail.id}'); document.getElementById('generic-dialog-modal').classList.add('hidden')">
              Visit @${randomSnail.username}
            </button>
          `;
          if (window.SnailAudio) window.SnailAudio.playFanfare();
        }
      }
    }, 750);
  }

  renderHashtags() {
    const container = document.getElementById('garden-hashtags-container');
    if (!container) return;

    const hashtags = window.SNAIL_DATA.trendingHashtags;
    let html = '';
    hashtags.forEach(h => {
      html += `
        <div class="hashtag-pill" onclick="window.SnailGarden.filterByHashtag('${h.tag}')">
          <span class="pill-tag">${h.tag}</span>
          <span class="pill-count">${h.count}</span>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  renderExploreGrid() {
    const container = document.getElementById('garden-grid-container');
    if (!container) return;

    let posts = [...window.SnailState.state.posts];

    if (this.currentFilter === 'foodie') {
      posts = posts.filter(p => p.authorPersonality === 'foodie');
    } else if (this.currentFilter === 'speed') {
      posts = posts.filter(p => p.authorPersonality === 'chaotic');
    } else if (this.currentFilter === 'philosophy') {
      posts = posts.filter(p => p.authorPersonality === 'philosopher');
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      posts = posts.filter(p => 
        p.caption.toLowerCase().includes(q) ||
        p.authorUsername.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="empty-garden-state glass-card col-span-full">
          <div class="empty-snail-icon">🔍🐌</div>
          <h4>No snail posts found for "${this.searchQuery || this.currentFilter}".</h4>
          <p>The search snail got distracted by a piece of damp moss along the way.</p>
        </div>
      `;
      return;
    }

    let html = '';
    posts.forEach(post => {
      html += `
        <div class="garden-mosaic-tile" onclick="window.SnailGarden.openPostDetail('${post.id}')">
          <div class="tile-image-wrapper">
            ${window.SnailFeed ? window.SnailFeed.renderPostMedia(post) : ''}
          </div>
          <div class="tile-overlay">
            <div class="tile-stats">
              <span>❤️ ${post.likesCount}</span>
              <span>💬 ${post.commentsCount}</span>
            </div>
            <div class="tile-author">@${post.authorUsername}</div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  setFilter(filter, el) {
    this.currentFilter = filter;
    document.querySelectorAll('.garden-filter-tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
    if (window.SnailAudio) window.SnailAudio.playPop();
    this.renderExploreGrid();
  }

  filterByHashtag(tag) {
    this.searchQuery = tag;
    const searchInput = document.getElementById('garden-search-input');
    if (searchInput) searchInput.value = tag;
    if (window.SnailAudio) window.SnailAudio.playPop();
    this.renderExploreGrid();
  }

  handleSearch(val) {
    this.searchQuery = val;
    this.renderExploreGrid();
  }

  handleFollow(snailId) {
    const isCurrentlyFollowing = window.SnailState.isFollowing(snailId);

    if (isCurrentlyFollowing) {
      window.SnailState.toggleFollow(snailId);
      if (window.SnailAudio) window.SnailAudio.playSquish();
      return;
    }

    const btn = document.getElementById(`podium-follow-btn-${snailId}`);
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Approaching... 🐌";
    }

    window.SnailTime.run({
      actionType: 'follow',
      title: 'Your snail is physically approaching...',
      payloadIcon: '🤝',
      useModal: false,
      onComplete: () => {
        window.SnailState.toggleFollow(snailId);
        if (window.SnailAudio) window.SnailAudio.playPop();
      }
    });
  }

  openPostDetail(postId) {
    window.SnailApp.navigate('home');
    setTimeout(() => {
      const card = document.getElementById(`card-${postId}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('animate-highlight');
        setTimeout(() => card.classList.remove('animate-highlight'), 1200);
      }
    }, 250);
  }
}

window.SnailGarden = new SnailGardenController();
