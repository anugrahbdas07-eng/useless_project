// SnailGram Central State Management & Store (Snail Physics Engine)
const STORAGE_KEY = 'snailgram_app_state_v2';

class SnailStateStore {
  constructor() {
    this.listeners = {};
    this.state = this.loadInitialState();

    // Auto-update time spent and decay energy
    setInterval(() => {
      this.state.analytics.timeSpentSeconds += 60;
      
      // Gradually drain energy unless fed
      if (this.state.user.energy > 15) {
        this.state.user.energy = Math.max(10, this.state.user.energy - 3);
      }

      // Randomly trigger garden traffic (15% chance every 2 mins)
      if (Math.random() < 0.15 && !this.state.gardenTraffic.active) {
        this.triggerGardenTraffic(true);
      } else if (this.state.gardenTraffic.active && Math.random() < 0.3) {
        this.triggerGardenTraffic(false);
      }

      this.save();
      this.emit('analytics:updated', this.state.analytics);
      this.emit('user:updated', this.state.user);
      if (this.state.analytics.timeSpentSeconds >= 300) {
        this.unlockAchievement('procrastinator');
      }
    }, 60000);
  }

  getDefaultState() {
    return {
      user: {
        created: false,
        id: "current_user_snail",
        username: "New_Snail",
        displayName: "New Gastropod",
        personality: "philosopher",
        favoriteFood: "Artisanal Lettuce",
        shellColor: "#4CAF50",
        bodyColor: "#81C784",
        speed: "0.0007 km/h",
        speedTier: "cruising",
        speedRank: "#4,827",
        energy: 85,
        isSleeping: false,
        location: "🌿 Hydrangea Gardens",
        followers: 0,
        following: 0,
        postsCount: 0,
        likesCount: 0,
        leaves: 35,
        bio: "Living slowly. Dreaming slowly. Posting slowly. 🌿",
        equippedAccessory: null
      },
      snails: JSON.parse(JSON.stringify(window.SNAIL_DATA.snails)),
      posts: JSON.parse(JSON.stringify(window.SNAIL_DATA.posts)),
      messages: {
        gary_the_great: [
          { 
            id: "m_init_1",
            sender: 'snail', 
            text: "Welcome to SnailGram, darling! Don't rush into anything. Take a sip of dew and explore slowly! ✨🌿", 
            timestamp: "Yesterday", 
            status: 'delivered',
            trackingNumber: "TRK-GARY-92841",
            route: ["Hydrangea Gardens", "Flowerbed District", "Snail City"]
          }
        ],
        turbo_snail: [
          { 
            id: "m_init_2",
            sender: 'snail', 
            text: "Welcome to the slow lane! If you need high-speed mucus tips, holler at me! 🏎️", 
            timestamp: "Yesterday", 
            status: 'delivered',
            trackingNumber: "TRK-TURBO-11048",
            route: ["The Dewdrop Pond", "The Leaf Market", "Snail City"]
          }
        ]
      },
      notifications: [
        { id: 'n1', icon: '🌿', text: 'Welcome to the Garden! You received 35 starter leaves.', time: 'Just now', unread: true, isDelivered: true },
        { id: 'n2', icon: '🐌', text: 'Gary_The_Great is nearby in The Flowerbed District.', time: '1 hour ago', unread: true, isDelivered: true },
        { id: 'n3', icon: '🏎️', text: 'TurboSnail broke another drag-strip speed record (0.0012 km/h).', time: '3 hours ago', unread: false, isDelivered: true }
      ],
      achievements: JSON.parse(JSON.stringify(window.SNAIL_DATA.achievements)),
      inventory: [],
      followedSnails: [],
      gardenTraffic: {
        active: false,
        capacity: 100,
        delayMultiplier: 1.0,
        cause: "Family of caterpillars crossing Sector 4"
      },
      snailStrike: {
        active: false,
        remainingSec: 0
      },
      turboMode: {
        active: false,
        speedBonus: 0
      },
      analytics: {
        timeSpentSeconds: 120,
        messagesDelayedCount: 0,
        leavesEarnedCount: 35,
        leavesConsumedCount: 0,
        interactionsDelayedCount: 0,
        racesParticipated: 0,
        racesWon: 0,
        leavesFedCount: 0
      },
      settings: {
        theme: 'light',
        speedMultiplier: 1.0,
        soundEnabled: true,
        animationsEnabled: true
      }
    };
  }

  loadInitialState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const defaults = this.getDefaultState();
        
        // Ensure snails always have new fields (location, speedRank, speedTier, energy)
        const mergedSnails = defaults.snails.map(defaultSnail => {
          const savedSnail = (parsed.snails || []).find(s => s.id === defaultSnail.id);
          return savedSnail ? { ...defaultSnail, ...savedSnail } : defaultSnail;
        });

        // Ensure messages dictionary contains entries
        const mergedMessages = { ...defaults.messages, ...(parsed.messages || {}) };

        return {
          ...defaults,
          ...parsed,
          snails: mergedSnails,
          messages: mergedMessages,
          user: { ...defaults.user, ...(parsed.user || {}) },
          analytics: { ...defaults.analytics, ...(parsed.analytics || {}) },
          settings: { ...defaults.settings, ...(parsed.settings || {}) },
          gardenTraffic: { ...defaults.gardenTraffic, ...(parsed.gardenTraffic || {}) }
        };
      }
    } catch (e) {
      console.warn("Failed to load state from localStorage:", e);
    }
    return this.getDefaultState();
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to save state to localStorage:", e);
    }
  }

  resetAllData() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.getDefaultState();
    this.save();
    this.emit('state:reset', this.state);
  }

  // Pub/Sub
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error in listener for ${event}:`, err);
        }
      });
    }
  }

  // Actions
  setUserProfile(profileData) {
    this.state.user = {
      ...this.state.user,
      ...profileData,
      created: true
    };
    this.save();
    this.emit('user:updated', this.state.user);
  }

  feedSnail(snailId = null) {
    const isCurrentUser = !snailId || snailId === this.state.user.id;
    const target = isCurrentUser
      ? this.state.user
      : this.state.snails.find(s => s.id === snailId);

    if (!target) return false;

    if (this.state.user.leaves < 1) {
      alert("⚠️ Treasury empty! You need at least 🌿 1 leaf to feed your snail.");
      return false;
    }

    // Spend 1 leaf
    this.spendLeaves(1, `Feeding ${target.displayName}`);
    target.energy = Math.min(100, (target.energy || 50) + 22);

    // Minor speed boost with a funny cap at 0.0009 km/h
    let currentSpeed = parseFloat(target.speed) || 0.0007;
    currentSpeed = Math.min(0.0009, currentSpeed + 0.00004);
    target.speed = currentSpeed.toFixed(4) + " km/h";

    this.state.analytics.leavesFedCount = (this.state.analytics.leavesFedCount || 0) + 1;
    this.save();
    this.emit('user:updated', this.state.user);
    this.emit('snail:fed', { target, energy: target.energy, speed: target.speed });
    if (window.SnailAudio) window.SnailAudio.playLeafRustle();
    return true;
  }

  triggerGardenTraffic(activate = true) {
    this.state.gardenTraffic.active = activate;
    if (activate) {
      this.state.gardenTraffic.capacity = 43;
      this.state.gardenTraffic.delayMultiplier = 1.75;
      this.state.gardenTraffic.cause = [
        "A family of earthworms is protesting near Sector 3",
        "A stray maple leaf fell across the main concrete thoroughfare",
        "Garden sprinkler puddle created a 2-centimeter traffic detour",
        "Gary stopped in the intersection to adjust his shell crown"
      ][Math.floor(Math.random() * 4)];
    } else {
      this.state.gardenTraffic.capacity = 100;
      this.state.gardenTraffic.delayMultiplier = 1.0;
    }
    this.save();
    this.emit('traffic:changed', this.state.gardenTraffic);
  }

  triggerSnailStrike(durationSec = 15) {
    this.state.snailStrike.active = true;
    this.state.snailStrike.remainingSec = durationSec;
    this.emit('strike:started', durationSec);

    const interval = setInterval(() => {
      this.state.snailStrike.remainingSec--;
      if (this.state.snailStrike.remainingSec <= 0) {
        clearInterval(interval);
        this.state.snailStrike.active = false;
        this.emit('strike:ended', {});
      }
    }, 1000);
  }

  toggleTurboMode() {
    this.state.turboMode.active = !this.state.turboMode.active;
    if (this.state.turboMode.active) {
      this.state.turboMode.speedBonus = 0.0001;
      this.state.user.speed = "0.0008 km/h";
    } else {
      this.state.turboMode.speedBonus = 0;
      this.state.user.speed = "0.0007 km/h";
    }
    this.save();
    this.emit('user:updated', this.state.user);
    this.emit('turbo:changed', this.state.turboMode);
    return this.state.turboMode.active;
  }

  addLeaves(amount, reason = "") {
    this.state.user.leaves = (this.state.user.leaves || 0) + amount;
    this.state.analytics.leavesEarnedCount += amount;
    this.save();
    this.emit('leaves:changed', { total: this.state.user.leaves, diff: amount, reason });
    if (window.SnailAudio) window.SnailAudio.playLeafRustle();

    if (this.state.user.leaves >= 100) {
      this.unlockAchievement('leaf_collector');
    }
  }

  spendLeaves(amount, itemName) {
    if (this.state.user.leaves < amount) return false;
    this.state.user.leaves -= amount;
    this.state.analytics.leavesConsumedCount += amount;
    this.save();
    this.emit('leaves:changed', { total: this.state.user.leaves, diff: -amount, reason: itemName });
    return true;
  }

  equipAccessory(itemId) {
    this.state.user.equippedAccessory = itemId;
    if (!this.state.inventory.includes(itemId)) {
      this.state.inventory.push(itemId);
    }
    this.save();
    this.emit('user:updated', this.state.user);
    this.unlockAchievement('wardrobe_stylist');
  }

  likePost(postId) {
    const post = this.state.posts.find(p => p.id === postId);
    if (!post) return;

    if (!post.userLiked) {
      post.likesCount += 1;
      post.userLiked = true;
      this.addLeaves(2, "Post Like Reward");
    } else {
      post.likesCount = Math.max(0, post.likesCount - 1);
      post.userLiked = false;
    }
    this.state.analytics.interactionsDelayedCount += 1;
    this.save();
    this.emit('post:updated', post);
    this.emit('feed:updated', this.state.posts);
  }

  addComment(postId, commentText) {
    const post = this.state.posts.find(p => p.id === postId);
    if (!post) return null;

    const newComment = {
      id: 'c_' + Date.now(),
      authorUsername: this.state.user.username,
      authorName: this.state.user.displayName,
      text: commentText,
      timestamp: 'Just now'
    };

    post.comments.push(newComment);
    post.commentsCount = post.comments.length;
    this.addLeaves(5, "Comment Contribution");
    this.state.analytics.interactionsDelayedCount += 1;
    this.save();
    this.emit('post:updated', post);
    this.emit('feed:updated', this.state.posts);
    return newComment;
  }

  toggleFollow(snailId) {
    const snail = this.state.snails.find(s => s.id === snailId);
    if (!snail) return false;

    const idx = this.state.followedSnails.indexOf(snailId);
    let isNowFollowing = false;

    if (idx === -1) {
      this.state.followedSnails.push(snailId);
      snail.followers += 1;
      this.state.user.following += 1;
      isNowFollowing = true;
      this.addLeaves(3, "Slow Network Expansion");
    } else {
      this.state.followedSnails.splice(idx, 1);
      snail.followers = Math.max(0, snail.followers - 1);
      this.state.user.following = Math.max(0, this.state.user.following - 1);
      isNowFollowing = false;
    }

    this.state.analytics.interactionsDelayedCount += 1;
    this.save();
    this.emit('snail:followed', { snailId, isFollowing: isNowFollowing });
    this.emit('user:updated', this.state.user);
    return isNowFollowing;
  }

  isFollowing(snailId) {
    return this.state.followedSnails.includes(snailId);
  }

  addNewPost(postData) {
    const newPost = {
      id: 'post_' + Date.now(),
      authorId: this.state.user.id,
      authorUsername: this.state.user.username,
      authorName: this.state.user.displayName,
      authorPersonality: this.state.user.personality,
      location: postData.location || "Somewhere in the garden 🌿",
      timestamp: "Just now",
      imageTheme: postData.imageTheme || "custom",
      customImage: postData.customImage || null,
      caption: postData.caption,
      likesCount: 1,
      commentsCount: 0,
      userLiked: true,
      comments: []
    };

    this.state.posts.unshift(newPost);
    this.state.user.postsCount += 1;
    this.addLeaves(15, "Carried Post Across Garden");
    this.unlockAchievement('first_post');
    this.save();
    this.emit('feed:updated', this.state.posts);
    this.emit('user:updated', this.state.user);
    return newPost;
  }

  addMessage(snailId, msg) {
    if (!this.state.messages) {
      this.state.messages = {};
    }
    if (!this.state.messages[snailId]) {
      this.state.messages[snailId] = [];
    }
    this.state.messages[snailId].push(msg);
    if (this.state.analytics) {
      this.state.analytics.messagesDelayedCount = (this.state.analytics.messagesDelayedCount || 0) + 1;
    }
    this.unlockAchievement('social_butterfly');
    this.save();
    this.emit('message:sent', { snailId, message: msg });
    return msg;
  }

  sendChatMessage(snailId, text) {
    if (!this.state.messages[snailId]) {
      this.state.messages[snailId] = [];
    }

    const trackingNum = "TRK-" + Math.floor(10000 + Math.random() * 90000);
    const msg = {
      id: 'm_' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just now',
      status: 'delivered',
      trackingNumber: trackingNum,
      route: ["Your Flowerpot", "Hydrangea Gardens", "The Leaf Market", "Recipient Shell"]
    };

    this.state.messages[snailId].push(msg);
    this.state.analytics.messagesDelayedCount += 1;
    this.unlockAchievement('social_butterfly');
    this.save();
    this.emit('message:sent', { snailId, message: msg });
    return msg;
  }

  receiveBotReply(snailId, text) {
    if (!this.state.messages[snailId]) {
      this.state.messages[snailId] = [];
    }
    const msg = {
      id: 'm_' + Date.now(),
      sender: 'snail',
      text,
      timestamp: 'Just now',
      status: 'delivered'
    };
    this.state.messages[snailId].push(msg);
    this.save();
    this.emit('message:received', { snailId, message: msg });
    if (window.SnailAudio) window.SnailAudio.playChime();
    return msg;
  }

  unlockAchievement(achId) {
    const ach = this.state.achievements.find(a => a.id === achId);
    if (!ach || ach.unlocked) return;

    ach.unlocked = true;
    this.addLeaves(ach.rewardLeaves, `Achievement: ${ach.title}`);
    this.save();
    this.emit('achievement:unlocked', ach);
    if (window.SnailAudio) window.SnailAudio.playFanfare();
  }

  updateSettings(newSettings) {
    this.state.settings = { ...this.state.settings, ...newSettings };
    if (window.SnailAudio) {
      window.SnailAudio.enabled = this.state.settings.soundEnabled;
    }
    this.save();
    this.emit('settings:updated', this.state.settings);
  }
}

window.SnailState = new SnailStateStore();
