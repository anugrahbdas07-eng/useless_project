// SnailGram Profile, Wardrobe Shop & Speed Ranking Controller
class SnailProfileController {
  constructor() {
    this.viewingSnailId = null;
    this.currentTab = 'posts';
  }

  init() {
    window.SnailState.on('user:updated', () => {
      if (!this.viewingSnailId) this.renderProfile();
    });
    window.SnailState.on('leaves:changed', () => {
      if (!this.viewingSnailId) this.renderProfile();
    });
    window.SnailState.on('achievement:unlocked', () => {
      if (this.currentTab === 'achievements') this.renderAchievementsTab();
    });
  }

  viewProfile(snailId = null) {
    this.viewingSnailId = snailId;
    this.currentTab = 'posts';

    // Smoothly activate profile view container
    document.querySelectorAll('.app-view-container').forEach(view => {
      view.classList.toggle('hidden', view.dataset.view !== 'profile');
    });

    const mainShell = document.getElementById('main-app-shell');
    const landingView = document.getElementById('landing-page-view');
    const topNav = document.getElementById('global-top-navbar');
    if (mainShell) mainShell.classList.remove('hidden');
    if (landingView) landingView.classList.add('hidden');
    if (topNav) topNav.classList.remove('hidden');

    document.querySelectorAll('.nav-link-item, .mobile-nav-item').forEach(link => {
      link.classList.toggle('active', link.dataset.view === 'profile');
    });

    this.renderProfile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderProfile() {
    const isCurrentUser = !this.viewingSnailId || this.viewingSnailId === window.SnailState.state.user.id;
    const snail = isCurrentUser
      ? window.SnailState.state.user
      : window.SnailState.state.snails.find(s => s.id === this.viewingSnailId) || window.SnailState.state.user;

    const container = document.getElementById('profile-view-container');
    if (!container) return;

    const personality = window.SNAIL_DATA.personalities[snail.personality] || { name: 'Mollusk', icon: '🐌', color: '#4CAF50' };
    const isFollowing = !isCurrentUser && window.SnailState.isFollowing(snail.id);
    const speedTierObj = window.SNAIL_DATA.speedTiers[snail.speedTier || 'cruising'] || { label: "SLOW", color: "#4CAF50" };

    let actionBtnHtml = '';
    if (isCurrentUser) {
      actionBtnHtml = `
        <button class="btn btn-secondary" onclick="window.SnailProfile.openCustomizerModal()">
          🎨 Customize Shell
        </button>
        <button class="btn btn-primary" onclick="window.SnailProfile.feedCurrentSnail()">
          🥬 Feed Snail (1 Leaf)
        </button>
      `;
    } else {
      actionBtnHtml = `
        <button class="btn ${isFollowing ? 'btn-following' : 'btn-primary'}" 
                id="profile-follow-btn" 
                onclick="window.SnailProfile.handleFollow('${snail.id}')">
          ${isFollowing ? 'Following' : 'Follow'}
        </button>
        <button class="btn btn-secondary" onclick="window.SnailMessages.openChatWith('${snail.id}')">
          💬 Send Slow DM
        </button>
        <button class="btn btn-secondary" onclick="window.SnailProfile.feedTargetSnail('${snail.id}')">
          🥬 Feed Leaf
        </button>
      `;
    }

    container.innerHTML = `
      <div class="profile-header-card glass-card">
        <div class="profile-avatar-large" title="Click to poke snail!">
          ${window.SnailFeed ? window.SnailFeed.getSnailAvatarSvg(snail) : ''}
          <div class="profile-speed-pill" style="border-color: ${speedTierObj.color}; color: ${speedTierObj.color}">
            ⚡ ${snail.speed || '0.0007 km/h'} (${speedTierObj.label})
          </div>
          <div class="profile-rank-tag mt-1">
            Official Speed Rank: <strong>${snail.speedRank || '#4,827'}</strong>
          </div>
        </div>

        <div class="profile-info-block">
          <div class="profile-title-row">
            <h2>${snail.displayName || snail.username}</h2>
            ${snail.isVerified ? '<span class="verified-badge" title="Verified Gastropod">✓</span>' : ''}
            <span class="personality-tag" style="background: ${personality.color}22; color: ${personality.color}; border: 1px solid ${personality.color}44;">
              ${personality.icon} ${personality.name}
            </span>
          </div>
          <div class="profile-handle">@${snail.username}</div>
          <div class="profile-subtitle">${snail.title || 'Professional Leaf Enthusiast 🌿'}</div>

          <!-- Energy Gauge -->
          <div class="profile-energy-bar-row mb-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span style="font-size: 0.8rem; font-weight: 700;">⚡ Gastropod Energy:</span>
              <strong style="color: var(--primary); font-size: 0.85rem;">${snail.energy || 75}%</strong>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${snail.energy || 75}%; background: linear-gradient(90deg, #FFB300, #4CAF50);"></div>
            </div>
            <small class="text-muted d-block mt-1">Special Ability: <em>"${snail.specialAbility || 'Gets distracted by leaves easily'}"</em></small>
          </div>

          <div class="profile-stats-row">
            <div class="stat-box">
              <span class="stat-number">${(snail.followers || 0).toLocaleString()}</span>
              <span class="stat-label">Followers</span>
            </div>
            <div class="stat-box">
              <span class="stat-number">${(snail.following || 0).toLocaleString()}</span>
              <span class="stat-label">Following</span>
            </div>
            <div class="stat-box">
              <span class="stat-number">${snail.postsCount || 0}</span>
              <span class="stat-label">Posts</span>
            </div>
            <div class="stat-box">
              <span class="stat-number">🌿 ${isCurrentUser ? window.SnailState.state.user.leaves : (snail.leaves || 100)}</span>
              <span class="stat-label">Leaves</span>
            </div>
          </div>

          <p class="profile-bio-text">${(snail.bio || '').replace(/\n/g, '<br/>')}</p>
          <div class="profile-food-tag">Location: <strong>${snail.location || '🌸 Flowerbed District'}</strong> • Delicacy: <strong>${snail.favoriteFood || 'Romaine'}</strong> 🥗</div>

          <div class="profile-actions-row">
            ${actionBtnHtml}
          </div>
        </div>
      </div>

      <!-- Profile Tabs -->
      <div class="profile-tabs-nav">
        <button class="profile-tab-btn ${this.currentTab === 'posts' ? 'active' : ''}" onclick="window.SnailProfile.switchTab('posts')">
          📸 Posts
        </button>
        ${isCurrentUser ? `
          <button class="profile-tab-btn ${this.currentTab === 'shop' ? 'active' : ''}" onclick="window.SnailProfile.switchTab('shop')">
            🎩 Wardrobe & Cosmetics
          </button>
        ` : ''}
        <button class="profile-tab-btn ${this.currentTab === 'achievements' ? 'active' : ''}" onclick="window.SnailProfile.switchTab('achievements')">
          🏆 Achievements
        </button>
        <button class="profile-tab-btn ${this.currentTab === 'stats' ? 'active' : ''}" onclick="window.SnailProfile.switchTab('stats')">
          📊 Snail Fame Algorithm
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="profile-tab-content" id="profile-tab-content">
        <!-- Rendered dynamically -->
      </div>
    `;

    this.renderCurrentTabContent();
  }

  feedCurrentSnail() {
    if (window.SnailState.feedSnail()) {
      alert("🥬 You fed your snail a fresh leaf! Energy restored +22%. Velocity boosted to " + window.SnailState.state.user.speed + "!");
      this.renderProfile();
    }
  }

  feedTargetSnail(snailId) {
    if (window.SnailState.feedSnail(snailId)) {
      alert("🥬 You fed this snail a leaf! They will remember this generosity for at least 4 centimeters.");
      this.renderProfile();
    }
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    if (window.SnailAudio) window.SnailAudio.playPop();
    document.querySelectorAll('.profile-tab-btn').forEach(btn => btn.classList.remove('active'));
    this.renderProfile();
  }

  renderCurrentTabContent() {
    const container = document.getElementById('profile-tab-content');
    if (!container) return;

    if (this.currentTab === 'posts') {
      this.renderPostsTab(container);
    } else if (this.currentTab === 'shop') {
      this.renderShopTab(container);
    } else if (this.currentTab === 'achievements') {
      this.renderAchievementsTab(container);
    } else if (this.currentTab === 'stats') {
      this.renderStatsTab(container);
    }
  }

  renderPostsTab(container) {
    const isCurrentUser = !this.viewingSnailId || this.viewingSnailId === window.SnailState.state.user.id;
    const authorId = isCurrentUser ? window.SnailState.state.user.id : this.viewingSnailId;

    const posts = window.SnailState.state.posts.filter(p => p.authorId === authorId);

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="empty-garden-state glass-card">
          <div class="empty-snail-icon">🐌📷</div>
          <h4>No posts yet on this shell.</h4>
          <p>This snail is still taking their sweet time to compose the perfect foliage photograph.</p>
        </div>
      `;
      return;
    }

    let html = '<div class="profile-posts-grid">';
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
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  renderShopTab(container) {
    const userLeaves = window.SnailState.state.user.leaves || 0;
    const inventory = window.SnailState.state.inventory || [];
    const equipped = window.SnailState.state.user.equippedAccessory;
    const items = window.SNAIL_DATA.shopItems;

    let html = `
      <div class="shop-header-banner glass-card">
        <div class="shop-leaf-balance">
          <span>🌿 Your Treasury:</span>
          <strong>${userLeaves} Leaves</strong>
        </div>
        <p class="text-muted">Purely virtual garden currency earned through slow living. No microtransactions!</p>
      </div>
      <div class="shop-items-grid">
    `;

    items.forEach(item => {
      const isOwned = inventory.includes(item.id);
      const isEquipped = equipped === item.id;
      const canAfford = userLeaves >= item.price;

      let btnHtml = '';
      if (isEquipped) {
        btnHtml = `<button class="btn btn-sm btn-following" onclick="window.SnailProfile.unequipAccessory()">Equipped ✓</button>`;
      } else if (isOwned) {
        btnHtml = `<button class="btn btn-sm btn-primary" onclick="window.SnailProfile.equipAccessory('${item.id}')">Equip</button>`;
      } else {
        btnHtml = `
          <button class="btn btn-sm ${canAfford ? 'btn-leaf' : 'btn-disabled'}" 
                  ${canAfford ? '' : 'disabled'}
                  onclick="window.SnailProfile.buyItem('${item.id}', ${item.price})">
            🌿 ${item.price} Leaves
          </button>
        `;
      }

      html += `
        <div class="shop-item-card glass-card ${isEquipped ? 'equipped-card' : ''}">
          <div class="shop-item-icon">${item.icon}</div>
          <h4>${item.name}</h4>
          <p class="item-desc">${item.description}</p>
          <div class="shop-item-action">${btnHtml}</div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  buyItem(itemId, price) {
    if (window.SnailState.spendLeaves(price, `Bought item: ${itemId}`)) {
      window.SnailState.equipAccessory(itemId);
      if (window.SnailAudio) window.SnailAudio.playFanfare();
      alert(`🎉 Item equipped! Your snail is now sporting the latest garden fashion.`);
      this.renderProfile();
    } else {
      alert("⚠️ Not enough leaves! Like more posts or participate in the Snail Race to earn leaves.");
    }
  }

  equipAccessory(itemId) {
    window.SnailState.equipAccessory(itemId);
    if (window.SnailAudio) window.SnailAudio.playPop();
    this.renderProfile();
  }

  unequipAccessory() {
    window.SnailState.equipAccessory(null);
    if (window.SnailAudio) window.SnailAudio.playSquish();
    this.renderProfile();
  }

  renderAchievementsTab(container) {
    if (!container) container = document.getElementById('profile-tab-content');
    if (!container) return;

    const achievements = window.SnailState.state.achievements;
    const unlockedCount = achievements.filter(a => a.unlocked).length;

    let html = `
      <div class="achievements-summary-card glass-card">
        <div class="ach-summary-top">
          <h4>Garden Milestones</h4>
          <span class="ach-count-badge">${unlockedCount} / ${achievements.length} Unlocked</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${(unlockedCount / achievements.length) * 100}%"></div>
        </div>
      </div>
      <div class="achievements-grid">
    `;

    achievements.forEach(ach => {
      html += `
        <div class="achievement-card glass-card ${ach.unlocked ? 'unlocked' : 'locked'}">
          <div class="ach-icon">${ach.unlocked ? ach.icon : '🔒'}</div>
          <div class="ach-info">
            <h5>${ach.title}</h5>
            <p>${ach.description}</p>
            <span class="ach-reward">Reward: 🌿 ${ach.rewardLeaves} leaves</span>
          </div>
          <div class="ach-status-pill">
            ${ach.unlocked ? '✅ Claimed' : '⏳ In Progress'}
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  renderStatsTab(container) {
    const isCurrentUser = !this.viewingSnailId || this.viewingSnailId === window.SnailState.state.user.id;
    const snail = isCurrentUser
      ? window.SnailState.state.user
      : window.SnailState.state.snails.find(s => s.id === this.viewingSnailId) || window.SnailState.state.user;

    const followers = snail.followers || 0;
    const likes = snail.likesCount || 0;
    const posts = snail.postsCount || 0;
    const comments = (snail.postsCount || 1) * 8;
    const achievementsCount = window.SnailState.state.achievements.filter(a => a.unlocked).length;

    const followerPart = Math.round(followers * 0.4);
    const likePart = Math.round(likes * 0.3);
    const postPart = Math.round(posts * 0.1);
    const commentPart = Math.round(comments * 0.1);
    const achPart = Math.round(achievementsCount * 50 * 0.1);
    const totalFame = followerPart + likePart + postPart + commentPart + achPart;

    container.innerHTML = `
      <div class="fame-stats-card glass-card">
        <h3>🏆 Snail Fame Algorithm</h3>
        <p class="text-muted">Calculated strictly in accordance with Garden Decree #428:</p>
        
        <div class="fame-formula-box">
          <code>Fame = (Followers × 0.4) + (Likes × 0.3) + (Posts × 0.1) + (Comments × 0.1) + (Achievements × 0.1)</code>
        </div>

        <div class="fame-score-hero">
          <span class="fame-score-num">${totalFame.toLocaleString()}</span>
          <span class="fame-score-label">Fame Rating Points</span>
        </div>

        <div class="fame-breakdown-list">
          <div class="fame-breakdown-row">
            <span>Follower Influence (40%)</span>
            <strong>+${followerPart.toLocaleString()} pts</strong>
          </div>
          <div class="fame-breakdown-row">
            <span>Garden Like Currency (30%)</span>
            <strong>+${likePart.toLocaleString()} pts</strong>
          </div>
          <div class="fame-breakdown-row">
            <span>Foliage Contributions (10%)</span>
            <strong>+${postPart.toLocaleString()} pts</strong>
          </div>
          <div class="fame-breakdown-row">
            <span>Slow Discourse Comments (10%)</span>
            <strong>+${commentPart.toLocaleString()} pts</strong>
          </div>
          <div class="fame-breakdown-row">
            <span>Milestone Badges (10%)</span>
            <strong>+${achPart.toLocaleString()} pts</strong>
          </div>
        </div>

        <div class="absurdity-meter-box">
          <div class="meter-title-row">
            <span>Actual Human Productivity:</span>
            <strong>0.00%</strong>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 0.1%; background: #F44336;"></div>
          </div>
          <small class="text-muted">Congratulations on taking your sweet time doing absolutely nothing.</small>
        </div>
      </div>
    `;
  }

  handleFollow(snailId) {
    const btn = document.getElementById('profile-follow-btn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Approaching... 🐌";
    }

    window.SnailTime.run({
      actionType: 'follow',
      title: 'Your snail is slowly approaching...',
      payloadIcon: '🤝',
      useModal: false,
      onComplete: () => {
        window.SnailState.toggleFollow(snailId);
        if (window.SnailAudio) window.SnailAudio.playPop();
        this.renderProfile();
      }
    });
  }

  openCustomizerModal() {
    const modal = document.getElementById('snail-customizer-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.updateCustomizerPreview();
    }
  }

  closeCustomizerModal() {
    const modal = document.getElementById('snail-customizer-modal');
    if (modal) modal.classList.add('hidden');
  }

  updateCustomizerPreview() {
    const shellColor = document.getElementById('custom-shell-color')?.value || '#4CAF50';
    const bodyColor = document.getElementById('custom-body-color')?.value || '#81C784';
    const previewEl = document.getElementById('customizer-preview-snail');
    
    if (previewEl && window.SnailFeed) {
      const tempUser = {
        ...window.SnailState.state.user,
        shellColor,
        bodyColor
      };
      previewEl.innerHTML = window.SnailFeed.getSnailAvatarSvg(tempUser);
    }
  }

  saveCustomization() {
    const shellColor = document.getElementById('custom-shell-color')?.value || '#4CAF50';
    const bodyColor = document.getElementById('custom-body-color')?.value || '#81C784';
    const displayName = document.getElementById('custom-display-name')?.value || window.SnailState.state.user.displayName;
    const bio = document.getElementById('custom-bio')?.value || window.SnailState.state.user.bio;

    window.SnailState.setUserProfile({
      shellColor,
      bodyColor,
      displayName,
      bio
    });

    this.closeCustomizerModal();
    if (window.SnailAudio) window.SnailAudio.playFanfare();
    this.renderProfile();
  }
}

window.SnailProfile = new SnailProfileController();
