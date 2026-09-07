// SnailGram Master Application Controller & Router (Snail Physics & Reels Edition)
class SnailAppController {
  constructor() {
    this.currentView = 'landing';
  }

  init() {
    console.log("🐌 SnailGram Snail Physics & Reels Engine initializing at 0.0007 km/h...");

    if (window.SnailFeed) window.SnailFeed.init();
    if (window.SnailReels) window.SnailReels.init();
    if (window.SnailGarden) window.SnailGarden.init();
    if (window.SnailProfile) window.SnailProfile.init();
    if (window.SnailMessages) window.SnailMessages.init();
    if (window.SnailAchievements) window.SnailAchievements.init();
    if (window.SnailAnalytics) window.SnailAnalytics.init();
    if (window.SnailSettings) window.SnailSettings.init();
    if (window.SnailEasterEggs) window.SnailEasterEggs.init();

    this.updateGlobalHeader();
    this.updateRightSidebar();

    // Listen to state changes
    window.SnailState.on('user:updated', () => {
      this.updateGlobalHeader();
      this.updateRightSidebar();
    });
    window.SnailState.on('leaves:changed', () => {
      this.updateGlobalHeader();
      this.updateRightSidebar();
    });
    window.SnailState.on('traffic:changed', (traffic) => {
      this.handleTrafficBanner(traffic);
    });

    // Check if user already exists
    if (window.SnailState.state.user.created) {
      this.navigate('home');
    } else {
      this.navigate('landing');
    }
  }

  handleTrafficBanner(traffic) {
    const banner = document.getElementById('garden-traffic-banner');
    if (!banner) return;
    banner.classList.toggle('hidden', !traffic.active);
    if (traffic.active && window.SnailAudio) {
      window.SnailAudio.playDoomChord();
    }
  }

  navigate(viewName) {
    this.currentView = viewName;

    document.querySelectorAll('.app-view-container').forEach(view => {
      view.classList.toggle('hidden', view.dataset.view !== viewName);
    });

    const isLanding = viewName === 'landing';
    const mainShell = document.getElementById('main-app-shell');
    const landingView = document.getElementById('landing-page-view');
    const topNav = document.getElementById('global-top-navbar');

    if (mainShell) mainShell.classList.toggle('hidden', isLanding);
    if (landingView) landingView.classList.toggle('hidden', !isLanding);
    if (topNav) topNav.classList.toggle('hidden', isLanding);

    document.querySelectorAll('.nav-link-item, .mobile-nav-item').forEach(link => {
      link.classList.toggle('active', link.dataset.view === viewName);
    });

    if (viewName === 'profile') {
      if (window.SnailProfile) {
        if (!window.SnailProfile.viewingSnailId) {
          window.SnailProfile.viewProfile(null);
        } else {
          window.SnailProfile.renderProfile();
        }
      }
    } else if (viewName === 'reels') {
      window.SnailReels.renderCurrentReel();
      window.SnailReels.renderReelsSelectionGrid();
    } else if (viewName === 'analytics') {
      window.SnailAnalytics.renderDashboard();
    } else if (viewName === 'garden') {
      if (window.SnailGarden) {
        window.SnailGarden.renderTrendingPodium();
        window.SnailGarden.renderHashtags();
        window.SnailGarden.renderGardenMap();
        window.SnailGarden.renderExploreGrid();
      }
    } else if (viewName === 'messages') {
      window.SnailMessages.renderContactsList();
      window.SnailMessages.renderChatWindow();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateGlobalHeader() {
    const user = window.SnailState.state.user;
    const leafCountEl = document.getElementById('header-leaf-count');
    const userAvatarEl = document.getElementById('header-user-avatar');

    if (leafCountEl) leafCountEl.textContent = user.leaves || 0;
    if (userAvatarEl && window.SnailFeed) {
      userAvatarEl.innerHTML = window.SnailFeed.getSnailAvatarSvg(user);
    }
  }

  updateRightSidebar() {
    const user = window.SnailState.state.user;
    const sidebarAvatar = document.getElementById('sidebar-user-avatar');
    const sidebarName = document.getElementById('sidebar-user-name');
    const sidebarHandle = document.getElementById('sidebar-user-handle');
    const sidebarLeaves = document.getElementById('sidebar-leaf-count');

    if (sidebarAvatar && window.SnailFeed) {
      sidebarAvatar.innerHTML = window.SnailFeed.getSnailAvatarSvg(user);
    }
    if (sidebarName) sidebarName.textContent = user.displayName || user.username;
    if (sidebarHandle) sidebarHandle.textContent = `@${user.username}`;
    if (sidebarLeaves) sidebarLeaves.textContent = user.leaves || 0;

    const trendingContainer = document.getElementById('sidebar-trending-snails');
    if (trendingContainer) {
      const snails = window.SnailState.state.snails.slice(0, 4);
      let html = '';
      snails.forEach(s => {
        const isFollowing = window.SnailState.isFollowing(s.id);
        html += `
          <div class="sidebar-snail-row">
            <div class="sidebar-snail-meta" onclick="window.SnailApp.navigateToProfile('${s.id}')">
              <div class="sidebar-snail-avatar">${window.SnailFeed.getSnailAvatarSvg(s)}</div>
              <div>
                <strong>${s.displayName}</strong>
                <small class="text-muted d-block">${s.speedRank || '#1'} • ⚡ ${s.speed}</small>
              </div>
            </div>
            <button class="btn btn-xs ${isFollowing ? 'btn-following' : 'btn-primary'}" 
                    id="sidebar-follow-${s.id}"
                    onclick="window.SnailGarden.handleFollow('${s.id}')">
              ${isFollowing ? '✓' : '+ Follow'}
            </button>
          </div>
        `;
      });
      trendingContainer.innerHTML = html;
    }
  }

  navigateToProfile(snailId) {
    if (window.SnailAudio) window.SnailAudio.playPop();
    window.SnailProfile.viewProfile(snailId);
  }

  openCreatePostModal() {
    if (window.SnailPosts) window.SnailPosts.openModal();
  }

  searchTag(tag) {
    this.navigate('garden');
    if (window.SnailGarden) window.SnailGarden.filterByHashtag(tag);
  }

  startOnboarding() {
    if (window.SnailAudio) window.SnailAudio.playFanfare();
    const modal = document.getElementById('snail-creation-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.updateOnboardingPreview();
    }
  }

  closeOnboarding() {
    const modal = document.getElementById('snail-creation-modal');
    if (modal) modal.classList.add('hidden');
  }

  updateOnboardingPreview() {
    const nameInput = document.getElementById('onboard-name-input')?.value.trim() || 'Gary_The_Great';
    const personalitySelect = document.getElementById('onboard-personality-select')?.value || 'influencer';
    const foodSelect = document.getElementById('onboard-food-select')?.value || 'Lettuce';
    const shellColor = document.getElementById('onboard-shell-color')?.value || '#4CAF50';
    const bodyColor = document.getElementById('onboard-body-color')?.value || '#81C784';

    const personalityData = window.SNAIL_DATA.personalities[personalitySelect] || {};
    const previewContainer = document.getElementById('onboard-preview-card');

    if (previewContainer && window.SnailFeed) {
      const mockSnail = {
        displayName: nameInput,
        username: nameInput.toLowerCase().replace(/\s+/g, '_'),
        title: `Professional ${foodSelect} Enthusiast 🌿`,
        personality: personalitySelect,
        shellColor,
        bodyColor,
        speed: "0.0007 km/h",
        speedRank: "#4,827",
        followers: 0,
        leaves: 35,
        equippedAccessory: null
      };

      previewContainer.innerHTML = `
        <div class="profile-avatar-large">
          ${window.SnailFeed.getSnailAvatarSvg(mockSnail)}
        </div>
        <div class="mt-2 text-center">
          <h3 class="m-0">🐌 ${mockSnail.displayName}</h3>
          <div class="text-muted" style="font-size: 0.85rem;">${mockSnail.title}</div>
          <div class="mt-2">
            <span class="personality-tag" style="background: ${personalityData.color}22; color: ${personalityData.color};">
              ${personalityData.icon} ${personalityData.name}
            </span>
          </div>
          <div class="onboard-stats-row">
            <div>Speed: <strong>${mockSnail.speed} (${mockSnail.speedRank})</strong></div>
            <div>Followers: <strong>0</strong></div>
            <div>Treasury: <strong>🌿 35 Leaves</strong></div>
          </div>
        </div>
      `;
    }
  }

  submitOnboarding(e) {
    e.preventDefault();
    const name = document.getElementById('onboard-name-input')?.value.trim() || 'Slow_Mollusk';
    const personality = document.getElementById('onboard-personality-select')?.value || 'influencer';
    const food = document.getElementById('onboard-food-select')?.value || 'Lettuce';
    const shellColor = document.getElementById('onboard-shell-color')?.value || '#4CAF50';
    const bodyColor = document.getElementById('onboard-body-color')?.value || '#81C784';

    window.SnailState.setUserProfile({
      username: name.replace(/\s+/g, '_'),
      displayName: name,
      title: `Professional ${food} Enthusiast 🌿`,
      personality,
      favoriteFood: food,
      shellColor,
      bodyColor,
      bio: "Living slowly. Dreaming slowly. Posting slowly. 🌿"
    });

    this.closeOnboarding();
    if (window.SnailAudio) window.SnailAudio.playFanfare();
    this.navigate('home');
  }
}

window.SnailApp = new SnailAppController();

document.addEventListener('DOMContentLoaded', () => {
  window.SnailApp.init();
});
