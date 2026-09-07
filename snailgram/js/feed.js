// SnailGram Home Feed & Stories Controller — Multi-Slide Stories & Reels Edition
class SnailFeedController {
  constructor() {
    this.container = null;
    this.storiesContainer = null;
    this.pendingLikes = new Set();
    this.pendingComments = new Set();
    this.activeStorySnailId = null;
    this.currentSlideIndex = 0;
    this.storyTimer = null;
  }

  init() {
    this.container = document.getElementById('feed-posts-container');
    this.storiesContainer = document.getElementById('stories-scroll-container');

    window.SnailState.on('feed:updated', () => this.renderPosts());
    window.SnailState.on('user:updated', () => {
      this.renderStories();
      this.renderPosts();
    });

    this.renderStories();
    this.renderPosts();
  }

  renderStories() {
    if (!this.storiesContainer) return;

    const user = window.SnailState.state.user;
    const snails = window.SnailState.state.snails;

    let html = `
      <div class="story-item current-user-story" onclick="window.SnailApp.openCreatePostModal()">
        <div class="story-ring user-ring">
          <div class="story-avatar">${this.getSnailAvatarSvg(user)}</div>
          <span class="story-add-badge">+</span>
        </div>
        <span class="story-name">Your Story</span>
      </div>
    `;

    snails.forEach(snail => {
      const hasMultiple = window.SNAIL_DATA.stories && window.SNAIL_DATA.stories[snail.id];
      html += `
        <div class="story-item" onclick="window.SnailFeed.openMultiSlideStory('${snail.id}')">
          <div class="story-ring ${hasMultiple ? 'has-active-stories' : ''}">
            <div class="story-avatar">${this.getSnailAvatarSvg(snail)}</div>
          </div>
          <span class="story-name">${snail.username.split('_')[0]}</span>
        </div>
      `;
    });

    this.storiesContainer.innerHTML = html;
  }

  // Multi-Slide Instagram Story Viewer
  openMultiSlideStory(snailId) {
    this.activeStorySnailId = snailId;
    this.currentSlideIndex = 0;
    if (window.SnailAudio) window.SnailAudio.playPop();

    const snailStories = (window.SNAIL_DATA.stories && window.SNAIL_DATA.stories[snailId]) || [
      {
        id: "default_1",
        type: "walking",
        title: "Slow Living Today",
        caption: "Crawled 1.2 millimeters today. Feeling accomplished. 🌿",
        sticker: "🐌 CHILLIN",
        soundTrack: "🎵 Garden Birds Ambient"
      }
    ];

    this.activeStoriesList = snailStories;
    this.renderStoryViewerSlide();
  }

  renderStoryViewerSlide() {
    clearTimeout(this.storyTimer);
    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    const snail = window.SnailState.state.snails.find(s => s.id === this.activeStorySnailId);
    if (!snail) return;

    const slide = this.activeStoriesList[this.currentSlideIndex];
    const totalSlides = this.activeStoriesList.length;

    // Segmented progress bar
    let progressBarsHtml = '';
    for (let i = 0; i < totalSlides; i++) {
      let fillClass = '';
      if (i < this.currentSlideIndex) fillClass = 'completed-bar';
      else if (i === this.currentSlideIndex) fillClass = 'active-animating-bar';
      progressBarsHtml += `
        <div class="story-progress-segment">
          <div class="story-progress-fill ${fillClass}"></div>
        </div>
      `;
    }

    dialog.innerHTML = `
      <div class="story-viewer-frame glass-card">
        <!-- Top Segmented Bars -->
        <div class="story-segmented-nav">
          ${progressBarsHtml}
        </div>

        <!-- Header -->
        <div class="story-viewer-header">
          <div class="story-avatar-small">${this.getSnailAvatarSvg(snail)}</div>
          <div class="story-meta-header">
            <strong>${snail.displayName}</strong>
            <small class="text-muted d-block">${slide.soundTrack || '🎵 Snail Nature Audio'}</small>
          </div>
          <button class="icon-btn close-btn" onclick="window.SnailFeed.closeStoryViewer()">✕</button>
        </div>

        <!-- Interactive Tap Zones (Left = Prev, Right = Next) -->
        <div class="story-tap-zone zone-left" onclick="window.SnailFeed.prevStorySlide()"></div>
        <div class="story-tap-zone zone-right" onclick="window.SnailFeed.nextStorySlide()"></div>

        <!-- Visual Media Canvas -->
        <div class="story-media-stage">
          ${this.getStorySceneSvg(slide.type)}
          <div class="story-sticker-badge animate-bounce-in">${slide.sticker || '🐌'}</div>
        </div>

        <!-- Bottom Story Content -->
        <div class="story-viewer-footer">
          <h4>${slide.title}</h4>
          <p class="story-caption-body">${slide.caption}</p>

          <!-- Quick Reaction Emojis -->
          <div class="story-quick-reactions">
            <button class="reaction-emoji-btn" onclick="window.SnailFeed.sendStoryReaction('🐌')">🐌</button>
            <button class="reaction-emoji-btn" onclick="window.SnailFeed.sendStoryReaction('🥬')">🥬</button>
            <button class="reaction-emoji-btn" onclick="window.SnailFeed.sendStoryReaction('❤️')">❤️</button>
            <button class="reaction-emoji-btn" onclick="window.SnailFeed.sendStoryReaction('🔥')">🔥</button>
            <button class="reaction-emoji-btn" onclick="window.SnailFeed.sendStoryReaction('😭')">😭</button>
          </div>
        </div>
      </div>
    `;

    dialog.classList.remove('hidden');

    // Trigger audio
    if (slide.type === 'dancing' && window.SnailAudio) {
      window.SnailAudio.playDiscoBeat();
    } else if (slide.type === 'with_gf' && window.SnailAudio) {
      window.SnailAudio.playChime();
    } else if (slide.type === 'walking' && window.SnailAudio) {
      window.SnailAudio.playDramaticTrekSound();
    }

    // Auto-advance after 7.5 seconds
    this.storyTimer = setTimeout(() => {
      this.nextStorySlide();
    }, 7500);
  }

  nextStorySlide() {
    clearTimeout(this.storyTimer);
    if (this.currentSlideIndex < this.activeStoriesList.length - 1) {
      this.currentSlideIndex++;
      this.renderStoryViewerSlide();
    } else {
      this.closeStoryViewer();
    }
  }

  prevStorySlide() {
    clearTimeout(this.storyTimer);
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.renderStoryViewerSlide();
    }
  }

  closeStoryViewer() {
    clearTimeout(this.storyTimer);
    const dialog = document.getElementById('generic-dialog-modal');
    if (dialog) dialog.classList.add('hidden');
  }

  sendStoryReaction(emoji) {
    if (window.SnailAudio) window.SnailAudio.playPop();
    window.SnailState.addLeaves(1, `Story Reaction ${emoji}`);

    const heart = document.createElement('div');
    heart.className = 'floating-story-reaction';
    heart.textContent = emoji;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }

  // Graphics for Story Themes (dancing, with_gf, walking, workout, foodie)
  getStorySceneSvg(type) {
    if (type === 'dancing') {
      return `
        <svg viewBox="0 0 360 480" class="story-canvas-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="360" height="480" fill="#2E0854"/>
          <!-- Disco Ball & Colored Beams -->
          <polygon points="180,20 40,300 80,300" fill="rgba(255, 64, 129, 0.3)" class="anim-disco-ray1"/>
          <polygon points="180,20 280,300 320,300" fill="rgba(0, 229, 255, 0.3)" class="anim-disco-ray2"/>
          <circle cx="180" cy="35" r="18" fill="#E0E0E0" stroke="#FFF" stroke-width="1.5"/>

          <!-- Dancing Snail -->
          <g transform="translate(130, 220)" class="anim-dancing-snail">
            <ellipse cx="40" cy="70" rx="35" ry="12" fill="#81C784"/>
            <circle cx="35" cy="50" r="24" fill="#4CAF50" stroke="#FFF" stroke-width="2"/>
            <line x1="75" y1="35" x2="68" y2="15" stroke="#81C784" stroke-width="4" stroke-linecap="round" class="anim-eye-left"/>
            <line x1="82" y1="35" x2="88" y2="17" stroke="#81C784" stroke-width="4" stroke-linecap="round" class="anim-eye-right"/>
            <circle cx="68" cy="13" r="3.5" fill="#FFF"/>
            <circle cx="88" cy="15" r="3.5" fill="#FFF"/>
            <text x="75" y="5" font-size="20">✨</text>
            <text x="-5" y="30" font-size="20">🪩</text>
          </g>
        </svg>
      `;
    } else if (type === 'with_gf') {
      return `
        <svg viewBox="0 0 360 480" class="story-canvas-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="storyGfBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FCE4EC"/>
              <stop offset="100%" stop-color="#F8BBD0"/>
            </linearGradient>
          </defs>
          <rect width="360" height="480" fill="url(#storyGfBg)"/>

          <!-- Giant Mushroom Arch -->
          <path d="M180 140 C100 140, 80 230, 180 230 C280 230, 260 140, 180 140 Z" fill="#E91E63"/>
          <circle cx="140" cy="180" r="12" fill="#FFF"/>
          <circle cx="210" cy="170" r="10" fill="#FFF"/>
          <rect x="173" y="230" width="14" height="120" fill="#FFF" rx="4"/>

          <!-- Heart Slime Trail -->
          <path d="M180 340 C140 300, 110 340, 180 390 C250 340, 220 300, 180 340 Z" fill="none" stroke="#00E676" stroke-width="5" class="anim-heart-glow"/>

          <!-- Snail Couple (Gary & Shelly) -->
          <g transform="translate(90, 310)">
            <ellipse cx="25" cy="30" rx="24" ry="10" fill="#81C784"/>
            <circle cx="20" cy="18" r="16" fill="#4CAF50"/>
            <polygon points="12,5 16,10 20,7 24,10 28,5 26,14 14,14" fill="#FFD700"/>
            <line x1="36" y1="24" x2="45" y2="12" stroke="#81C784" stroke-width="3"/>
            <circle cx="45" cy="11" r="3" fill="#FFF"/>
          </g>

          <g transform="translate(190, 310)">
            <ellipse cx="25" cy="30" rx="24" ry="10" fill="#DCEDC8"/>
            <circle cx="30" cy="18" r="16" fill="#8BC34A"/>
            <text x="25" y="8" font-size="14">🌸</text>
            <line x1="14" y1="24" x2="5" y2="12" stroke="#DCEDC8" stroke-width="3"/>
            <circle cx="5" cy="11" r="3" fill="#FFF"/>
          </g>
          <text x="165" y="295" font-size="28" class="anim-heart-float">💕</text>
        </svg>
      `;
    } else if (type === 'walking') {
      return `
        <svg viewBox="0 0 360 480" class="story-canvas-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="360" height="480" fill="#ECEFF1"/>
          <!-- Concrete Pavement -->
          <rect x="20" y="160" width="320" height="200" fill="#CFD8DC" stroke="#B0BEC5" stroke-width="3"/>
          <line x1="20" y1="260" x2="340" y2="260" stroke="#90A4AE" stroke-width="2" stroke-dasharray="10,8"/>

          <!-- Snail walking in slow-mo -->
          <g transform="translate(120, 220)" class="anim-slow-crawl">
            <path d="M-30 25 Q-10 25 10 25" stroke="#00E676" stroke-width="7" fill="none" stroke-linecap="round"/>
            <ellipse cx="30" cy="22" rx="30" ry="10" fill="#81C784"/>
            <circle cx="22" cy="10" r="18" fill="#4CAF50"/>
            <line x1="45" y1="18" x2="55" y2="5" stroke="#81C784" stroke-width="3"/>
            <circle cx="55" cy="4" r="3" fill="#FFF"/>
          </g>
          <text x="180" y="120" font-family="'Fredoka', sans-serif" font-size="18" fill="#37474F" font-weight="bold" text-anchor="middle">🚶 ROAD TRIP (3 MILLIMETERS)</text>
          <text x="180" y="390" font-size="12" fill="#78909C" text-anchor="middle">Estimated arrival at dandelion: Tomorrow 11:30 AM</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 360 480" class="story-canvas-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="360" height="480" fill="#E8F5E9"/>
          <text x="180" y="240" font-size="60" text-anchor="middle">🐌💤</text>
        </svg>
      `;
    }
  }

  renderPosts() {
    if (!this.container) return;
    const posts = window.SnailState.state.posts;

    if (!posts || posts.length === 0) {
      this.container.innerHTML = `
        <div class="empty-garden-state glass-card">
          <div class="empty-snail-icon">🐌</div>
          <h3>Nobody posted anything yet.</h3>
          <p>They're probably still composing the post or taking a snack break under a leaf.</p>
          <button class="btn btn-primary" onclick="window.SnailApp.openCreatePostModal()">Create The First Post</button>
        </div>
      `;
      return;
    }

    let html = '';
    posts.forEach(post => {
      const personality = window.SNAIL_DATA.personalities[post.authorPersonality] || { icon: '🐌', color: '#4CAF50' };
      const isUserPost = post.authorId === window.SnailState.state.user.id;
      const authorObj = isUserPost
        ? window.SnailState.state.user
        : window.SnailState.state.snails.find(s => s.id === post.authorId) || {};

      const likeActive = post.userLiked ? 'liked' : '';
      const isPendingLike = this.pendingLikes.has(post.id);
      const energyVal = authorObj.energy || 75;

      html += `
        <article class="post-card glass-card" id="card-${post.id}">
          <!-- Post Header -->
          <div class="post-header">
            <div class="post-author-group" onclick="window.SnailApp.navigateToProfile('${post.authorId}')">
              <div class="post-author-avatar" title="Click to poke snail!">
                ${this.getSnailAvatarSvg(authorObj)}
              </div>
              <div class="post-author-meta">
                <div class="author-name-row">
                  <span class="author-name">${post.authorName || post.authorUsername}</span>
                  ${authorObj.isVerified ? '<span class="verified-badge" title="Verified Gastropod">✓</span>' : ''}
                  <span class="personality-tag" style="background: ${personality.color}22; color: ${personality.color}; border: 1px solid ${personality.color}44;">
                    ${personality.icon} ${personality.name || ''}
                  </span>
                </div>
                <div class="post-sub-row">
                  <span class="post-location">${post.location}</span>
                  <span class="dot-separator">•</span>
                  <span class="post-timestamp">${post.timestamp}</span>
                  <span class="dot-separator">•</span>
                  <span class="snail-energy-tag" title="Snail Energy Level">⚡ ${energyVal}%</span>
                </div>
              </div>
            </div>
            <button class="icon-btn post-menu-btn" onclick="window.SnailFeed.showPostOptions('${post.id}')">⋯</button>
          </div>

          <!-- Post Media / Illustration -->
          <div class="post-media-container">
            ${this.renderPostMedia(post)}
          </div>

          <!-- Post Actions Bar -->
          <div class="post-actions-bar">
            <button class="action-btn like-btn ${likeActive} ${isPendingLike ? 'disabled-snail' : ''}" 
                    onclick="window.SnailFeed.handleLike('${post.id}')" 
                    id="like-btn-${post.id}">
              <span class="btn-icon">${post.userLiked ? '❤️' : '🤍'}</span>
              <span class="likes-count">${post.likesCount}</span>
            </button>

            <button class="action-btn comment-toggle-btn" onclick="window.SnailFeed.toggleComments('${post.id}')">
              <span class="btn-icon">💬</span>
              <span class="comments-count">${post.commentsCount}</span>
            </button>

            <button class="action-btn share-btn" onclick="window.SnailFeed.handleShare('${post.id}')" title="Share via Snail Postal Route">
              <span class="btn-icon">🍃</span>
              <span>Share</span>
            </button>

            <button class="action-btn feed-leaf-btn" onclick="window.SnailFeed.feedAuthor('${post.authorId}')" title="Feed 1 leaf to this snail (+22% energy)">
              <span class="btn-icon">🥬</span>
              <span>Feed</span>
            </button>
          </div>

          <!-- Post Caption -->
          <div class="post-caption-section">
            <span class="caption-username" onclick="window.SnailApp.navigateToProfile('${post.authorId}')">${post.authorUsername}</span>
            <span class="caption-text">${this.formatCaptionWithHashtags(post.caption)}</span>
          </div>

          <!-- Post Comments Section -->
          <div class="post-comments-container" id="comments-box-${post.id}">
            <div class="comments-list" id="comments-list-${post.id}">
              ${this.renderCommentsList(post.comments)}
            </div>

            <!-- Add Comment Form -->
            <form class="comment-input-form" onsubmit="window.SnailFeed.handleCommentSubmit(event, '${post.id}', '${post.authorUsername}')">
              <input type="text" 
                     placeholder="Write a slow comment (travels physically across flowerbed)..." 
                     class="comment-input" 
                     id="comment-input-${post.id}" 
                     required 
                     maxlength="150" />
              <button type="submit" class="btn btn-sm btn-comment" id="comment-submit-${post.id}">Send 🐌</button>
            </form>
          </div>
        </article>
      `;
    });

    this.container.innerHTML = html;
  }

  feedAuthor(authorId) {
    if (window.SnailState.feedSnail(authorId)) {
      alert("🥬 You fed this mollusk an organic leaf! Energy increased by +22%!");
      this.renderPosts();
    }
  }

  renderCommentsList(comments) {
    if (!comments || comments.length === 0) {
      return `<div class="no-comments-text text-muted">No comments yet. Slither in first!</div>`;
    }
    return comments.map(c => `
      <div class="comment-row">
        <strong class="comment-author">${c.authorUsername}:</strong>
        <span class="comment-text">${this.escapeHtml(c.text)}</span>
        <span class="comment-time">${c.timestamp || 'recently'}</span>
      </div>
    `).join('');
  }

  renderPostMedia(post) {
    if (post.customImage) {
      return `<img src="${post.customImage}" alt="Snail post" class="post-custom-img" />`;
    }
    return this.getPostSvgImage(post.imageTheme || 'dew');
  }

  handleLike(postId) {
    if (this.pendingLikes.has(postId)) return;

    const post = window.SnailState.state.posts.find(p => p.id === postId);
    if (!post) return;

    if (post.userLiked) {
      window.SnailState.likePost(postId);
      if (window.SnailAudio) window.SnailAudio.playSquish();
      return;
    }

    this.pendingLikes.add(postId);
    const likeBtn = document.getElementById(`like-btn-${postId}`);
    if (likeBtn) {
      likeBtn.classList.add('loading-pulse');
      likeBtn.innerHTML = `<span class="btn-icon">🐌</span> <span>Like is crawling...</span>`;
    }

    window.SnailTime.run({
      actionType: 'like',
      title: 'A like is physically approaching...',
      payloadIcon: '❤️',
      useModal: false,
      onComplete: () => {
        this.pendingLikes.delete(postId);
        window.SnailState.likePost(postId);
        if (window.SnailAudio) window.SnailAudio.playPop();

        // Delayed notification arrival joke
        setTimeout(() => {
          const toast = document.createElement('div');
          toast.className = 'easter-toast glass-card animate-bounce-in';
          toast.innerHTML = `🔔 <strong>DELIVERED:</strong> Your like reached ${post.authorUsername}'s shell 38 seconds ago!`;
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 4000);
        }, 1500);
      }
    });
  }

  handleCommentSubmit(e, postId, recipientName) {
    e.preventDefault();
    if (this.pendingComments.has(postId)) return;

    const input = document.getElementById(`comment-input-${postId}`);
    const submitBtn = document.getElementById(`comment-submit-${postId}`);
    if (!input || !input.value.trim()) return;

    const commentText = input.value.trim();
    this.pendingComments.add(postId);

    input.disabled = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Dispatched...";
    }

    // Show Comment Delivery Chain
    this.showCommentDeliveryChain(recipientName, () => {
      this.pendingComments.delete(postId);
      window.SnailState.addComment(postId, commentText);
      input.value = '';
      input.disabled = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send 🐌";
      }
    });
  }

  showCommentDeliveryChain(recipientName, onComplete) {
    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="glass-card dialog-card text-center">
        <span class="badge snail-badge mb-2">💬 COMMENT DELIVERY CHAIN</span>
        <h3>Physical Transport in Progress</h3>
        
        <div class="delivery-chain-diagram my-3">
          <div class="chain-node active">YOU 📱</div>
          <div class="chain-arrow">➔ 🐌 ➔</div>
          <div class="chain-node active">Comment Courier</div>
          <div class="chain-arrow">➔ 🌿 ➔</div>
          <div class="chain-node active">Flowerbed Transit</div>
          <div class="chain-arrow">➔ 🐌 ➔</div>
          <div class="chain-node">${recipientName}'s Shell</div>
        </div>

        <p class="text-muted" style="font-size: 0.85rem;" id="chain-status-text">
          Courier is currently navigating past a row of marigolds...
        </p>

        <div class="progress-bar-bg my-2">
          <div class="progress-bar-fill" id="chain-progress-bar" style="width: 0%;"></div>
        </div>
      </div>
    `;
    dialog.classList.remove('hidden');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 12;
      const bar = document.getElementById('chain-progress-bar');
      const statusText = document.getElementById('chain-status-text');

      if (bar) bar.style.width = progress + '%';
      if (statusText) {
        if (progress > 30 && progress < 70) statusText.textContent = "Negotiating right-of-way with a passing beetle...";
        else if (progress >= 70) statusText.textContent = `Approaching ${recipientName}'s shell doorstep...`;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          dialog.classList.add('hidden');
          if (onComplete) onComplete();
        }, 500);
      }
    }, 450);
  }

  toggleComments(postId) {
    const box = document.getElementById(`comments-box-${postId}`);
    if (box) {
      box.classList.toggle('expanded');
    }
  }

  handleShare(postId) {
    if (window.SnailAudio) window.SnailAudio.playLeafRustle();
    window.SnailState.addLeaves(1, "Shared Snail Lore");

    const url = `https://snailgram.garden/post/${postId}`;
    navigator.clipboard?.writeText?.(url);

    alert("🌿 Snail link copied! A courier slug has been dispatched with this URL. (Estimated arrival: 4 days)");
  }

  showPostOptions(postId) {
    alert("🐌 Post Options: Save to Shell • Report Salt Contamination • Unfollow Snail");
  }

  formatCaptionWithHashtags(caption) {
    if (!caption) return '';
    return caption.replace(/(#\w+)/g, '<span class="hashtag" onclick="window.SnailApp.searchTag(\'$1\')">$1</span>');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getSnailAvatarSvg(snail) {
    const shellColor = snail.shellColor || '#4CAF50';
    const bodyColor = snail.bodyColor || '#81C784';
    const accessory = snail.equippedAccessory || snail.accessory;

    let accessorySvg = '';
    if (accessory === 'crown') {
      accessorySvg = `<path d="M12 12 L14 18 L19 14 L24 18 L26 12 L28 20 L10 20 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1"/>`;
    } else if (accessory === 'sunglasses') {
      accessorySvg = `<rect x="8" y="16" width="10" height="5" rx="2" fill="#111"/><rect x="20" y="16" width="10" height="5" rx="2" fill="#111"/><line x1="18" y1="18" x2="20" y2="18" stroke="#111" stroke-width="2"/>`;
    } else if (accessory === 'chef_hat') {
      accessorySvg = `<path d="M11 18 C10 12, 16 10, 19 13 C22 10, 28 12, 27 18 Z" fill="#FFF" stroke="#CCC"/>`;
    } else if (accessory === 'monocle') {
      accessorySvg = `<circle cx="15" cy="18" r="4" fill="none" stroke="#FFD700" stroke-width="1.5"/><line x1="19" y1="20" x2="24" y2="28" stroke="#FFD700" stroke-width="1"/>`;
    } else if (accessory === 'foil_hat') {
      accessorySvg = `<polygon points="19,10 12,20 26,20" fill="#B0BEC5" stroke="#78909C" stroke-width="1"/>`;
    } else if (accessory === 'sleeping_cap') {
      accessorySvg = `<path d="M12 20 Q18 10 28 14 Q24 20 18 20 Z" fill="#7E57C2"/>`;
    } else if (accessory === 'mushroom') {
      accessorySvg = `<path d="M14 18 C14 10, 26 10, 26 18 Z" fill="#F44336"/><circle cx="17" cy="14" r="1.5" fill="#FFF"/><circle cx="23" cy="15" r="1.5" fill="#FFF"/>`;
    } else if (accessory === 'airpods') {
      accessorySvg = `<circle cx="34" cy="17" r="2.5" fill="#FFF"/><line x1="34" y1="17" x2="34" y2="24" stroke="#FFF" stroke-width="2"/>`;
    } else if (accessory === 'sign') {
      accessorySvg = `<rect x="4" y="28" width="16" height="10" rx="1" fill="#D7CCC8" stroke="#8D6E63"/><text x="12" y="34" font-size="5" fill="#3E2723" text-anchor="middle">SPINACH</text>`;
    }

    return `
      <svg viewBox="0 0 48 48" class="snail-svg-avatar" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="shellGlow_${shellColor.replace('#','')}" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="${shellColor}" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#2E7D32"/>
          </radialGradient>
        </defs>
        <ellipse cx="24" cy="40" rx="18" ry="4" fill="#A5D6A7" opacity="0.4"/>
        <path d="M8 38 C14 38, 20 34, 30 36 C38 37, 44 38, 44 40 C44 41, 10 41, 8 38 Z" fill="${bodyColor}"/>
        <path d="M30 36 C32 30, 36 24, 39 20 C42 22, 42 28, 40 36 Z" fill="${bodyColor}"/>
        <line x1="38" y1="20" x2="35" y2="12" stroke="${bodyColor}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="40" y1="20" x2="43" y2="13" stroke="${bodyColor}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="35" cy="11" r="2.5" fill="#FFF"/>
        <circle cx="35" cy="11" r="1.2" fill="#222"/>
        <circle cx="43" cy="12" r="2.5" fill="#FFF"/>
        <circle cx="43" cy="12" r="1.2" fill="#222"/>
        <circle cx="21" cy="27" r="13" fill="${shellColor}"/>
        <path d="M21 27 A 9 9 0 0 1 27 21 A 6 6 0 0 1 21 31 A 3 3 0 0 1 18 27" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" opacity="0.6"/>
        <path d="M41 26 Q43 27 41 28" fill="none" stroke="#2E7D32" stroke-width="1"/>
        ${accessorySvg}
      </svg>
    `;
  }

  getPostSvgImage(theme) {
    switch (theme) {
      case 'dew':
        return `
          <svg viewBox="0 0 400 300" class="post-illustration" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#E8F5E9"/>
            <path d="M50 260 C120 180, 200 80, 360 60 C320 160, 220 280, 50 260 Z" fill="#81C784"/>
            <path d="M70 250 Q200 170 340 70" stroke="#66BB6A" stroke-width="3" fill="none"/>
            <circle cx="210" cy="140" r="14" fill="#E0F7FA" opacity="0.85"/>
            <ellipse cx="206" cy="136" rx="4" ry="2" fill="#FFF"/>
            <circle cx="290" cy="100" r="9" fill="#E0F7FA" opacity="0.85"/>
            <text x="200" y="275" font-family="'Fredoka', sans-serif" font-size="14" fill="#2E7D32" text-anchor="middle">Hydrated Velvety Sage Leaf 🌿</text>
          </svg>
        `;
      case 'cabbage':
        return `
          <svg viewBox="0 0 400 300" class="post-illustration" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#F1F8E9"/>
            <circle cx="200" cy="150" r="110" fill="#689F38"/>
            <circle cx="200" cy="150" r="85" fill="#7CB342"/>
            <circle cx="200" cy="150" r="60" fill="#9CCC65"/>
            <path d="M280 140 Q265 155 285 170 Q265 185 285 195" fill="#F1F8E9"/>
            <text x="200" y="275" font-family="'Fredoka', sans-serif" font-size="14" fill="#33691E" text-anchor="middle">Sector 7 Savoy Cabbage (Single-Origin) 🥬</text>
          </svg>
        `;
      case 'speed':
        return `
          <svg viewBox="0 0 400 300" class="post-illustration" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#ECEFF1"/>
            <path d="M20 180 Q100 175 250 160 T380 140" stroke="#A7FFEB" stroke-width="12" fill="none" opacity="0.75" stroke-linecap="round"/>
            <rect x="340" y="110" width="10" height="40" fill="#222"/>
            <rect x="350" y="110" width="10" height="40" fill="#FFF"/>
            <text x="200" y="270" font-family="'Fredoka', sans-serif" font-size="15" fill="#FF5722" text-anchor="middle">🏁 Sector 9 Concrete Drag Strip</text>
          </svg>
        `;
      case 'zen':
        return `
          <svg viewBox="0 0 400 300" class="post-illustration" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#EDE7F6"/>
            <ellipse cx="180" cy="165" rx="35" ry="25" fill="#78909C"/>
            <ellipse cx="225" cy="155" rx="25" ry="18" fill="#90A4AE"/>
            <text x="200" y="270" font-family="'Fredoka', sans-serif" font-size="13" fill="#5E35B1" text-anchor="middle">"The millimetre is sacred." 📜</text>
          </svg>
        `;
      default:
        return `
          <svg viewBox="0 0 400 300" class="post-illustration" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#E8F5E9"/>
            <text x="200" y="150" font-size="60" text-anchor="middle">🐌🌿</text>
          </svg>
        `;
    }
  }
}

window.SnailFeed = new SnailFeedController();
