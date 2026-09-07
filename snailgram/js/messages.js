// SnailGram Snail DMs Controller — Walking Courier Snail & Snail Logistics Edition
class SnailMessagesController {
  constructor() {
    this.activeSnailId = 'gary_the_great';
    this.isDelivering = false;
    this.currentDeliveryTask = null;
    this.activeCallInterval = null;
    this.callTimer = 0;
    this.isCallMuted = false;
    this.activeCourierTimers = {};
  }

  init() {
    this.renderContactsList();
    this.renderChatWindow();

    // Hook up dynamic typing listener for live ETA updates and Enter key sending
    const msgInput = document.getElementById('dm-message-input');
    if (msgInput) {
      msgInput.addEventListener('input', () => this.renderLiveEtaBar());
      msgInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.sendMessage(e);
        }
      });
    }

    const form = document.getElementById('dm-composer-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.sendMessage(e);
      });
    }

    window.SnailState.on('message:sent', () => {
      this.renderContactsList();
      this.renderChatWindow();
    });
  }

  openChatWith(snailId) {
    this.activeSnailId = snailId;
    window.SnailApp.navigate('messages');
    this.renderContactsList();
    this.renderChatWindow();

    const chatPane = document.getElementById('dm-chat-pane');
    if (chatPane) {
      chatPane.classList.add('mobile-chat-open');
    }
  }

  getEstimatedTransitDetails(snailId, charCount = 0) {
    const snail = (window.SnailState && window.SnailState.state && window.SnailState.state.snails) 
      ? window.SnailState.state.snails.find(s => s.id === snailId) || {}
      : {};

    const locations = {
      "🌸 Flowerbed District": { dist: 14.6, baseSec: 6 },
      "🌊 The Dewdrop Pond": { dist: 22.4, baseSec: 7 },
      "🥬 The Leaf Market": { dist: 11.2, baseSec: 6 },
      "🌳 The Ancient Oak": { dist: 18.0, baseSec: 7 },
      "🌿 Hydrangea Gardens": { dist: 13.5, baseSec: 6 },
      "🐌 Snail City": { dist: 19.8, baseSec: 7 }
    };
    const locInfo = locations[snail.location] || { dist: 15.0, baseSec: 6 };
    const totalSec = locInfo.baseSec; // 6 to 7 seconds!

    return {
      distance: locInfo.dist,
      totalSeconds: totalSec,
      carrierName: `${((snail.displayName || 'Courier')).split(' ')[0]}'s Snail Express 🐌`,
      steps: [
        { name: "Slime Packaging", duration: 2, desc: "Sealing message in protective mucus envelope" },
        { name: "Flowerbed Highway", duration: 2, desc: "Crawling over moist cedar mulch at 0.0007 km/h" },
        { name: "Dandelion Break", duration: 1, desc: "Courier stopped for a quick leaf nibble" },
        { name: "Inbox Delivery", duration: totalSec - 5, desc: "Scaling flowerpot and dropping letter into inbox" }
      ]
    };
  }

  renderLiveEtaBar() {
    const bar = document.getElementById('dm-live-eta-bar');
    if (!bar) return;

    if (!window.SnailState || !window.SnailState.state || !window.SnailState.state.snails) return;

    let snail = window.SnailState.state.snails.find(s => s.id === this.activeSnailId);
    if (!snail && window.SnailState.state.snails.length > 0) {
      snail = window.SnailState.state.snails[0];
      this.activeSnailId = snail.id;
    }
    if (!snail) return;

    const input = document.getElementById('dm-message-input');
    const charCount = input ? input.value.trim().length : 0;
    const eta = this.getEstimatedTransitDetails(snail.id, charCount);

    bar.innerHTML = `
      <div>
        <span class="eta-main">⏱️ Estimated Delivery: <strong>${eta.totalSeconds} seconds</strong></span>
        <span class="eta-sub d-block">Route: Sector 1 ➔ ${snail.location || 'Sector 4'} (${eta.distance}m) • ${eta.carrierName}</span>
      </div>
      <div class="step-time-forecast">
        Next step upon dispatch: <strong>Step 1: ${eta.steps[0].name} (${eta.steps[0].duration}s)</strong>
      </div>
    `;
  }

  renderContactsList() {
    const container = document.getElementById('dm-contacts-container');
    if (!container) return;

    if (!window.SnailState || !window.SnailState.state || !window.SnailState.state.snails) return;

    const snails = window.SnailState.state.snails;
    const messages = window.SnailState.state.messages || {};

    let html = '';
    snails.forEach(snail => {
      const chatHistory = messages[snail.id] || [];
      const lastMsg = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].text : "No messages yet...";
      const isActive = snail.id === this.activeSnailId;

      let sleepBadge = snail.isSleeping ? '<span class="badge" style="background: #E1BEE7; color: #4A148C; font-size: 0.65rem;">💤 ASLEEP</span>' : '';
      let energyText = `⚡ Energy: ${snail.energy || 75}%`;

      html += `
        <div class="dm-contact-item ${isActive ? 'active' : ''}" onclick="window.SnailMessages.selectContact('${snail.id}')">
          <div class="contact-avatar">
            ${window.SnailFeed ? window.SnailFeed.getSnailAvatarSvg(snail) : ''}
            <span class="status-indicator-dot ${snail.isSleeping ? 'asleep-dot' : ''}"></span>
          </div>
          <div class="contact-info">
            <div class="contact-name-row">
              <strong class="contact-name">${snail.displayName}</strong>
              ${sleepBadge}
            </div>
            <div class="contact-status-text">${snail.location || '🌸 Flowerbed District'} • ${energyText}</div>
            <p class="contact-preview">${this.escapeHtml(lastMsg)}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  selectContact(snailId) {
    this.activeSnailId = snailId;
    if (window.SnailAudio) window.SnailAudio.playPop();
    this.renderContactsList();
    this.renderChatWindow();

    const chatPane = document.getElementById('dm-chat-pane');
    if (chatPane) {
      chatPane.classList.add('mobile-chat-open');
    }
  }

  closeMobileChat() {
    const chatPane = document.getElementById('dm-chat-pane');
    if (chatPane) {
      chatPane.classList.remove('mobile-chat-open');
    }
  }

  renderChatWindow() {
    if (!window.SnailState || !window.SnailState.state || !window.SnailState.state.snails) return;

    let snail = window.SnailState.state.snails.find(s => s.id === this.activeSnailId);
    if (!snail && window.SnailState.state.snails.length > 0) {
      snail = window.SnailState.state.snails[0];
      this.activeSnailId = snail.id;
    }
    if (!snail) return;

    if (!window.SnailState.state.messages) {
      window.SnailState.state.messages = {};
    }
    if (!window.SnailState.state.messages[snail.id]) {
      window.SnailState.state.messages[snail.id] = [];
    }

    this.renderLiveEtaBar();

    const header = document.getElementById('dm-active-header');
    const messagesBox = document.getElementById('dm-messages-stream');

    if (header) {
      header.innerHTML = `
        <div class="dm-header-meta">
          <button class="icon-btn mobile-back-btn" onclick="window.SnailMessages.closeMobileChat()">←</button>
          <div class="header-avatar" onclick="window.SnailApp.navigateToProfile('${snail.id}')">
            ${window.SnailFeed ? window.SnailFeed.getSnailAvatarSvg(snail) : ''}
          </div>
          <div>
            <h4 class="m-0">${snail.displayName}</h4>
            <div class="snail-gps-hud" onclick="window.SnailMessages.showSnailGPS('${snail.id}')" title="Click to view live Snail GPS">
              🛰️ <strong>SNAIL GPS:</strong> ${snail.location || 'Sector 4'} • 16.4m away • ETA: 6s
            </div>
          </div>
        </div>
        <div class="dm-header-actions">
          <button class="btn btn-xs btn-secondary" onclick="window.SnailMessages.feedCurrentSnail('${snail.id}')" title="Feed leaf">
            🥬 Feed
          </button>
          <button class="btn btn-xs btn-primary" onclick="window.SnailMessages.startVoiceCall('${snail.id}')" title="Voice Call via tin can and moss wire">
            📞 Call
          </button>
          <button class="btn btn-xs btn-secondary" onclick="window.SnailMessages.startVideoCall('${snail.id}')" title="Slow Video Call (0.5 FPS)">
            📹 Video
          </button>
        </div>
      `;
    }

    if (messagesBox) {
      const chat = window.SnailState.state.messages[snail.id] || [];
      const knowledge = (window.SNAIL_DATA && window.SNAIL_DATA.botKnowledge) ? window.SNAIL_DATA.botKnowledge[snail.id] : null;

      let promptsHtml = '';
      if (knowledge && knowledge.quickPrompts) {
        promptsHtml = `
          <div class="ai-prompts-bar">
            <span class="prompts-label">✨ Ask ${snail.displayName.split(' ')[0]}:</span>
            ${knowledge.quickPrompts.map(p => `
              <button type="button" class="ai-prompt-chip" onclick="window.SnailMessages.useQuickPrompt('${this.escapeHtml(p)}')">
                ${p}
              </button>
            `).join('')}
          </div>
        `;
      }

      // Auto-resume or finish any orphan in-transit messages from earlier sessions
      chat.forEach(msg => {
        if (msg.status === 'in-transit' && !this.activeCourierTimers[msg.id]) {
          this.startCourierWalkingDelivery(snail, msg);
        }
      });

      if (chat.length === 0) {
        messagesBox.innerHTML = `
          ${promptsHtml}
          <div class="empty-garden-state p-4">
            <div class="empty-snail-icon">📭</div>
            <h4>No messages in transit.</h4>
            <p>Send a message and watch the physical courier snail carry it across the garden.</p>
          </div>
        `;
      } else {
        let html = promptsHtml;
        chat.forEach((msg, idx) => {
          const isUser = msg.sender === 'user';
          const trackingId = msg.trackingNumber || `TRK-MSG-${idx + 1048}`;
          const isInTransit = msg.status === 'in-transit';

          let transitTrackHtml = '';
          if (isInTransit) {
            const total = msg.totalSeconds || 6;
            const remaining = msg.secondsRemaining !== undefined ? msg.secondsRemaining : total;
            const progress = Math.max(0.06, Math.min(0.96, 1 - (remaining / total)));
            const curStepIdx = msg.currentStepIndex || 0;
            const stepsList = (msg.steps && Array.isArray(msg.steps) && msg.steps.length > 0) ? msg.steps : [
              { name: "Slime Packaging", duration: 2, desc: "Sealing message in mucus envelope" },
              { name: "Flowerbed Highway", duration: 2, desc: "Crawling over moist cedar mulch" },
              { name: "Dandelion Break", duration: 1, desc: "Courier stopped for a quick snack" },
              { name: "Inbox Delivery", duration: 2, desc: "Dropping envelope into recipient inbox" }
            ];
            const curStep = stepsList[curStepIdx] || stepsList[0];
            const stepSecs = msg.stepSecondsRemaining !== undefined ? msg.stepSecondsRemaining : 2;

            transitTrackHtml = `
              <div class="dm-courier-transit-card" id="transit-card-${msg.id}">
                <div class="dm-transit-header">
                  <span class="transit-badge">🐌 SNAIL WALKING WITH LETTER</span>
                  <span class="transit-eta" id="transit-eta-${msg.id}">ETA: ${remaining}s remaining</span>
                </div>

                <div class="dm-walking-track">
                  <div class="dm-walking-slime" id="transit-slime-${msg.id}" style="width: ${Math.round(progress * 100)}%;"></div>
                  <div class="dm-walking-courier" id="transit-courier-${msg.id}" style="left: ${Math.round(progress * 92)}%;">
                    <span class="mini-carrier-snail">🐌</span>
                    <span class="mini-envelope-pack">✉️</span>
                  </div>
                  <div class="dm-destination-mailbox" title="Recipient Shell Inbox">📬</div>
                </div>

                <div class="dm-transit-step-meta">
                  <div class="step-desc-text" id="transit-step-name-${msg.id}">
                    Step ${curStepIdx + 1}/4 (${curStep.name}): <em>${curStep.desc}</em>
                  </div>
                  <div class="step-time-forecast" id="transit-step-time-${msg.id}">
                    ⏳ Next step in: <strong>${stepSecs}s</strong>
                  </div>
                </div>
              </div>
            `;
          }

          let seenStatusText = isInTransit ? '🐌 Courier walking with letter...' : '✓ Delivered to shell';
          if (!isInTransit && isUser && idx === chat.length - 1) {
            seenStatusText = '👁️ Seen 2m ago • Snail decided to sleep on it 💤';
          }

          html += `
            <div class="dm-bubble-row ${isUser ? 'user-row' : 'snail-row'}">
              <div class="dm-bubble ${isUser ? 'user-bubble' : 'snail-bubble'}">
                <p class="m-0">${this.escapeHtml(msg.text)}</p>
                ${transitTrackHtml}
                <div class="dm-meta-sub">
                  <span>${msg.timestamp}</span>
                  <span class="dm-check">${seenStatusText}</span>
                </div>
                ${isUser ? `
                  <div class="dm-tracking-btn-row">
                    <button type="button" class="btn-track-msg" onclick="window.SnailMessages.openTrackingModal('${trackingId}', '${snail.displayName}')">
                      📦 Track Courier (${trackingId})
                    </button>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        });

        html += `<div id="snail-typing-indicator" class="snail-typing-box hidden"></div>`;
        messagesBox.innerHTML = html;
        messagesBox.scrollTop = messagesBox.scrollHeight;
      }
    }
  }

  useQuickPrompt(promptText) {
    const input = document.getElementById('dm-message-input');
    if (input) {
      input.value = promptText;
      input.focus();
      this.renderLiveEtaBar();
    }
  }

  sendMessage(e) {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    const input = document.getElementById('dm-message-input');
    const text = input ? input.value.trim() : '';
    if (!text) {
      if (input) input.focus();
      return false;
    }

    if (!window.SnailState || !window.SnailState.state || !window.SnailState.state.snails) {
      return false;
    }

    let snail = window.SnailState.state.snails.find(s => s.id === this.activeSnailId);
    if (!snail && window.SnailState.state.snails.length > 0) {
      snail = window.SnailState.state.snails[0];
      this.activeSnailId = snail.id;
    }
    if (!snail) return false;

    if (window.SnailAudio) window.SnailAudio.playPop();

    const trackingId = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    const eta = this.getEstimatedTransitDetails(snail.id, text.length);
    const msgId = 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

    const newMsg = {
      id: msgId,
      sender: 'user',
      text: text,
      timestamp: 'In transit 🐌✉️',
      status: 'in-transit',
      trackingNumber: trackingId,
      totalSeconds: eta.totalSeconds,
      secondsRemaining: eta.totalSeconds,
      currentStepIndex: 0,
      stepSecondsRemaining: eta.steps[0].duration,
      steps: eta.steps
    };

    window.SnailState.addMessage(snail.id, newMsg);
    if (input) input.value = '';
    this.renderLiveEtaBar();
    this.renderChatWindow();

    // Show Undo Button for 3 seconds
    const undoBtn = document.getElementById('dm-undo-btn');
    if (undoBtn) {
      undoBtn.classList.remove('hidden');
      setTimeout(() => { if (undoBtn) undoBtn.classList.add('hidden'); }, 3000);
    }

    // Launch Physical Snail Walking Courier Loop (6-7s)
    this.startCourierWalkingDelivery(snail, newMsg);
    return false;
  }

  startCourierWalkingDelivery(snail, msg) {
    if (this.activeCourierTimers[msg.id]) {
      clearInterval(this.activeCourierTimers[msg.id]);
    }

    if (!msg.steps || !Array.isArray(msg.steps) || msg.steps.length === 0) {
      msg.steps = [
        { name: "Slime Packaging", duration: 2, desc: "Sealing message in protective mucus envelope" },
        { name: "Flowerbed Highway", duration: 2, desc: "Crawling over moist cedar mulch at 0.0007 km/h" },
        { name: "Dandelion Break", duration: 1, desc: "Courier stopped for a quick leaf nibble" },
        { name: "Inbox Delivery", duration: 2, desc: "Dropping envelope into recipient inbox" }
      ];
    }
    if (msg.totalSeconds === undefined) msg.totalSeconds = 6;
    if (msg.secondsRemaining === undefined) msg.secondsRemaining = msg.totalSeconds;
    if (msg.currentStepIndex === undefined) msg.currentStepIndex = 0;
    if (msg.stepSecondsRemaining === undefined) msg.stepSecondsRemaining = msg.steps[0].duration;

    this.activeCourierTimers[msg.id] = setInterval(() => {
      msg.secondsRemaining--;
      msg.stepSecondsRemaining--;

      // Check if current physical step completed
      if (msg.stepSecondsRemaining <= 0) {
        if (msg.currentStepIndex < msg.steps.length - 1) {
          msg.currentStepIndex++;
          msg.stepSecondsRemaining = msg.steps[msg.currentStepIndex].duration;
        } else {
          msg.stepSecondsRemaining = 0;
        }
      }

      const total = msg.totalSeconds || 6;
      const progress = Math.max(0.06, Math.min(0.96, 1 - (msg.secondsRemaining / total)));
      const curStep = msg.steps[msg.currentStepIndex] || msg.steps[0];

      // Update DOM elements in-place for fluid snail crawl
      const slimeEl = document.getElementById(`transit-slime-${msg.id}`);
      const courierEl = document.getElementById(`transit-courier-${msg.id}`);
      const etaEl = document.getElementById(`transit-eta-${msg.id}`);
      const stepNameEl = document.getElementById(`transit-step-name-${msg.id}`);
      const stepTimeEl = document.getElementById(`transit-step-time-${msg.id}`);

      if (slimeEl) slimeEl.style.width = `${Math.round(progress * 100)}%`;
      if (courierEl) courierEl.style.left = `${Math.round(progress * 92)}%`;
      if (etaEl) etaEl.textContent = `ETA: ${Math.max(0, msg.secondsRemaining)}s remaining`;
      if (stepNameEl) stepNameEl.innerHTML = `Step ${msg.currentStepIndex + 1}/4 (${curStep.name}): <em>${curStep.desc}</em>`;
      if (stepTimeEl) stepTimeEl.innerHTML = `⏳ Next step in: <strong>${Math.max(1, msg.stepSecondsRemaining)}s</strong>`;

      // If finished delivery into the app (after ~6-7 seconds)
      if (msg.secondsRemaining <= 0) {
        clearInterval(this.activeCourierTimers[msg.id]);
        delete this.activeCourierTimers[msg.id];

        msg.status = 'delivered';
        msg.timestamp = 'Just now';
        window.SnailState.save();

        if (window.SnailAudio) window.SnailAudio.playNotificationSound();
        this.renderChatWindow();

        // Recipient AI begins writing reply if user message
        if (msg.sender === 'user') {
          this.triggerAiBotReply(snail, msg.text);
        }
      }
    }, 1000);
  }

  triggerUndo() {
    const undoBtn = document.getElementById('dm-undo-btn');
    if (undoBtn) undoBtn.classList.add('hidden');
    if (window.SnailAudio) window.SnailAudio.playDoomChord();

    alert(`❌ UNDO FAILED:\nThe courier snail is already 14 centimeters away.\nPhysically impossible to catch up without breaking garden speed ordinances.`);
  }

  // Conversational AI Snail Reply via Courier Snail
  triggerAiBotReply(snail, userText) {
    const indicator = document.getElementById('snail-typing-indicator');
    if (indicator) {
      indicator.classList.remove('hidden');
      indicator.innerHTML = `🐌 ${snail.displayName} is holding a tiny pen and writing...`;
    }

    const knowledge = (window.SNAIL_DATA && window.SNAIL_DATA.botKnowledge) ? window.SNAIL_DATA.botKnowledge[snail.id] : null;
    let replyText = "Living slowly. Thinking slowly. 🌿";

    if (knowledge) {
      const lower = (userText || '').toLowerCase();
      const matched = (knowledge.keywordResponses || []).find(r => r.match.some(keyword => lower.includes(keyword)));
      if (matched && matched.replies && matched.replies.length > 0) {
        replyText = matched.replies[Math.floor(Math.random() * matched.replies.length)];
      } else if (knowledge.fallbackReplies && knowledge.fallbackReplies.length > 0) {
        replyText = knowledge.fallbackReplies[Math.floor(Math.random() * knowledge.fallbackReplies.length)];
      }
    }

    // Short 1.8s writing delay, then courier walks response into app (takes 6s)
    setTimeout(() => {
      if (indicator) indicator.classList.add('hidden');

      const eta = this.getEstimatedTransitDetails(snail.id, replyText.length);
      const replyMsgId = 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

      const replyMsg = {
        id: replyMsgId,
        sender: 'snail',
        text: replyText,
        timestamp: 'In transit 🐌✉️',
        status: 'in-transit',
        totalSeconds: eta.totalSeconds,
        secondsRemaining: eta.totalSeconds,
        currentStepIndex: 0,
        stepSecondsRemaining: eta.steps[0].duration,
        steps: eta.steps
      };

      window.SnailState.addMessage(snail.id, replyMsg);
      this.renderChatWindow();

      // Snail walks reply back into app
      this.startCourierWalkingDelivery(snail, replyMsg);
    }, 1800);
  }

  // ================= 📞 VOICE CALL MODAL =================
  startVoiceCall(snailId) {
    const snail = window.SnailState.state.snails.find(s => s.id === snailId);
    if (!snail) return;

    if (window.SnailAudio) window.SnailAudio.playPhoneRingtone();
    window.SnailState.unlockAchievement('voice_caller');

    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    this.callTimer = 0;
    this.isCallMuted = false;

    dialog.innerHTML = `
      <div class="glass-card dialog-card text-center voice-call-dialog">
        <span class="badge" style="background: #E8F5E9; color: #2E7D32;">📞 TIN-CAN AUDIO NETWORK</span>
        
        <div class="call-avatar-stage my-3">
          <div class="call-avatar-ring">
            ${window.SnailFeed ? window.SnailFeed.getSnailAvatarSvg(snail) : ''}
          </div>
          <div class="call-pulse-ring"></div>
        </div>

        <h3 class="m-0">${snail.displayName}</h3>
        <p class="text-muted mt-1" id="voice-call-status">Dialing via wet-moss audio cable... (Carrier snail is crawling to receiver) 🐌📞</p>

        <!-- Audio Waveform Visualizer -->
        <div class="audio-waveform-box my-3">
          <div class="waveform-bar" style="animation-delay: 0.1s;"></div>
          <div class="waveform-bar" style="animation-delay: 0.25s;"></div>
          <div class="waveform-bar" style="animation-delay: 0.4s;"></div>
          <div class="waveform-bar" style="animation-delay: 0.15s;"></div>
          <div class="waveform-bar" style="animation-delay: 0.35s;"></div>
          <div class="waveform-bar" style="animation-delay: 0.5s;"></div>
          <div class="waveform-bar" style="animation-delay: 0.2s;"></div>
        </div>

        <!-- Live Subtitles / Gastropod Translation -->
        <div class="call-subtitles-box p-3 glass-card mb-3" id="voice-call-subtitles">
          <em>Waiting for connection...</em>
        </div>

        <div class="d-flex justify-content-center gap-3">
          <button class="btn btn-secondary btn-sm" id="call-mute-btn" onclick="window.SnailMessages.toggleCallMute()">
            🎤 Mute
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.SnailAudio.playSnailGibberish()">
            🧪 Slime Squelch
          </button>
          <button class="btn btn-danger btn-sm" onclick="window.SnailMessages.endCall()">
            🔴 End Call
          </button>
        </div>
      </div>
    `;

    dialog.classList.remove('hidden');

    setTimeout(() => {
      const statusEl = document.getElementById('voice-call-status');
      const subEl = document.getElementById('voice-call-subtitles');
      if (statusEl && subEl) {
        statusEl.innerHTML = `🟢 <strong>CONNECTED (00:01)</strong> • Quality: 96% Moist`;
        if (window.SnailAudio) window.SnailAudio.playSnailGibberish();

        const phrases = [
          `"${snail.displayName}: Hello? Can you hear me? My left ear stalk has Romaine stuck on it..."`,
          `"${snail.displayName}: Wait, hold on, a caterpillar is honking behind me in the flowerbed..."`,
          `"${snail.displayName}: Speaking to you at 0.0004 km/h. Keep your voice hydrated!"`,
          `"${snail.displayName}: Did you call to discuss the price of organic dandelion greens? Because I'm in!"`
        ];

        let pIdx = 0;
        subEl.innerHTML = phrases[0];

        this.activeCallInterval = setInterval(() => {
          this.callTimer++;
          const mins = String(Math.floor(this.callTimer / 60)).padStart(2, '0');
          const secs = String(this.callTimer % 60).padStart(2, '0');
          const curStatus = document.getElementById('voice-call-status');
          if (curStatus) curStatus.innerHTML = `🟢 <strong>CONNECTED (${mins}:${secs})</strong> • Quality: 96% Moist`;

          if (this.callTimer % 4 === 0) {
            pIdx = (pIdx + 1) % phrases.length;
            const curSub = document.getElementById('voice-call-subtitles');
            if (curSub) curSub.innerHTML = phrases[pIdx];
            if (window.SnailAudio) window.SnailAudio.playSnailGibberish();
          }
        }, 1000);
      }
    }, 3500);
  }

  toggleCallMute() {
    this.isCallMuted = !this.isCallMuted;
    const btn = document.getElementById('call-mute-btn');
    if (btn) {
      btn.textContent = this.isCallMuted ? "🔇 Unmute" : "🎤 Mute";
      btn.classList.toggle('btn-danger', this.isCallMuted);
    }
  }

  // ================= 📹 VIDEO CALL MODAL =================
  startVideoCall(snailId) {
    const snail = window.SnailState.state.snails.find(s => s.id === snailId);
    if (!snail) return;

    if (window.SnailAudio) window.SnailAudio.playPhoneRingtone();
    window.SnailState.unlockAchievement('voice_caller');

    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="glass-card dialog-card text-center video-call-frame p-0">
        <div class="video-feed-viewport">
          <div class="video-feed-bg" id="video-feed-graphic">
            ${this.getVideoFeedSvg(snail)}
          </div>

          <div class="video-hud-top">
            <span class="badge" style="background: rgba(0,0,0,0.6); color: #FFF;">
              🔴 LIVE • 0.5 FPS • 4 BITS/HR
            </span>
            <span class="badge" style="background: rgba(76, 175, 80, 0.85); color: #FFF;">
              ${snail.displayName}
            </span>
          </div>

          <div class="video-hud-bottom">
            <p class="m-0 text-white" style="font-size: 0.75rem; text-shadow: 0 1px 3px #000;" id="video-call-meta">
              Camera angle: Pointed directly at right eye stalk • Latency: 4.8s
            </p>
          </div>

          <div class="video-pip-card">
            <span style="font-size: 1.5rem;">🐌</span>
            <small style="color: #FFF; font-size: 0.6rem;">You (Moist)</small>
          </div>
        </div>

        <div class="p-3 d-flex justify-content-between align-items-center gap-2" style="background: #111;">
          <button class="btn btn-xs btn-secondary" onclick="window.SnailMessages.cycleVideoAngle('${snail.id}')">
            🔄 Switch Angle
          </button>
          <button class="btn btn-xs btn-secondary" onclick="window.SnailMessages.toggleMushroomFilter()">
            🍄 Shroom Filter
          </button>
          <button class="btn btn-xs btn-secondary" onclick="window.SnailMessages.sendCallHeart()">
            ❤️ Slime Heart
          </button>
          <button class="btn btn-xs btn-danger" onclick="window.SnailMessages.endCall()">
            🔴 End Call
          </button>
        </div>
      </div>
    `;

    dialog.classList.remove('hidden');

    setTimeout(() => {
      if (window.SnailAudio) window.SnailAudio.playSnailGibberish();
      const meta = document.getElementById('video-call-meta');
      if (meta) meta.textContent = "Snail blinked once. Next frame rendering in 8 seconds...";
    }, 3000);
  }

  getVideoFeedSvg(snail) {
    return `
      <svg viewBox="0 0 360 420" class="webcam-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="420" fill="#1F2922"/>
        <line x1="0" y1="210" x2="360" y2="210" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
        <line x1="180" y1="0" x2="180" y2="420" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
        <g transform="translate(130, 120)">
          <line x1="50" y1="180" x2="30" y2="50" stroke="${snail.bodyColor}" stroke-width="24" stroke-linecap="round"/>
          <line x1="50" y1="180" x2="70" y2="60" stroke="${snail.bodyColor}" stroke-width="24" stroke-linecap="round"/>
          <circle cx="30" cy="40" r="28" fill="#FFF" stroke="#2E7D32" stroke-width="3"/>
          <circle cx="30" cy="40" r="14" fill="#111"/>
          <circle cx="34" cy="36" r="5" fill="#FFF"/>
          <circle cx="70" cy="50" r="22" fill="#FFF" stroke="#2E7D32" stroke-width="3"/>
          <circle cx="70" cy="50" r="11" fill="#111"/>
          <circle cx="50" cy="180" r="60" fill="${snail.shellColor}" opacity="0.6"/>
          <text x="-50" y="-30" font-size="28">🌿</text>
        </g>
      </svg>
    `;
  }

  cycleVideoAngle(snailId) {
    if (window.SnailAudio) window.SnailAudio.playSquish();
    const feed = document.getElementById('video-feed-graphic');
    const meta = document.getElementById('video-call-meta');
    if (!feed) return;

    const angles = [
      "Camera dropped into wet soil. You are now staring at an earthworm.",
      "Camera pointed straight up into an artisanal Savoy cabbage canopy.",
      "Extreme macro close-up of shell calcium whorls.",
      "Camera pointing backwards at Gary's trailing mucus wake."
    ];

    const randomAngle = angles[Math.floor(Math.random() * angles.length)];
    if (meta) meta.textContent = `Angle changed: ${randomAngle}`;

    feed.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #2E1B0E; color: #FFF; flex-direction: column;">
        <span style="font-size: 3rem;">🪱🌱</span>
        <small style="margin-top: 10px; color: #A5D6A7;">0.5 FPS Frame Buffering...</small>
      </div>
    `;
  }

  toggleMushroomFilter() {
    if (window.SnailAudio) window.SnailAudio.playChime();
    const feed = document.getElementById('video-feed-graphic');
    if (!feed) return;
    const existingFilter = feed.querySelector('.shroom-filter-overlay');
    if (existingFilter) {
      existingFilter.remove();
    } else {
      const overlay = document.createElement('div');
      overlay.className = 'shroom-filter-overlay';
      overlay.innerHTML = `🍄✨ TOADSTOOL GLAM FILTER ✨🍄`;
      feed.appendChild(overlay);
    }
  }

  sendCallHeart() {
    if (window.SnailAudio) window.SnailAudio.playPop();
    const feed = document.getElementById('video-feed-graphic');
    if (!feed) return;
    const heart = document.createElement('div');
    heart.className = 'floating-call-heart';
    heart.textContent = '💕';
    feed.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }

  endCall() {
    if (this.activeCallInterval) {
      clearInterval(this.activeCallInterval);
      this.activeCallInterval = null;
    }
    if (window.SnailAudio) window.SnailAudio.playNotificationSound();
    const dialog = document.getElementById('generic-dialog-modal');
    if (dialog) dialog.classList.add('hidden');
  }

  feedCurrentSnail(snailId) {
    if (window.SnailState.feedSnail(snailId)) {
      if (window.SnailAudio) window.SnailAudio.playLeafRustle();
      alert("🥬 Snail fed! Energy restored +22%.");
      this.renderContactsList();
      this.renderChatWindow();
    }
  }

  showSnailGPS(snailId) {
    const snail = window.SnailState.state.snails.find(s => s.id === snailId);
    if (!snail) return;
    if (window.SnailAudio) window.SnailAudio.playChime();
    alert(`🛰️ SNAIL GPS TELEMETRY:\nTarget: ${snail.displayName}\nCurrent Sector: ${snail.location || 'Sector 4'}\nSpeed: ${snail.speed}\nSlime Viscosity: 99.4%\nETA to your flowerbed: 4 minutes 12 seconds.`);
  }

  openTrackingModal(trackingId, snailName) {
    if (window.SnailAudio) window.SnailAudio.playChime();
    const dialog = document.getElementById('generic-dialog-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="glass-card dialog-card">
        <div class="modal-header">
          <div>
            <span class="badge snail-badge">📦 LIVE PHYSICAL TRACKING</span>
            <h3 class="m-0 mt-1">${trackingId}</h3>
          </div>
          <button class="icon-btn close-btn" onclick="document.getElementById('generic-dialog-modal').classList.add('hidden')">✕</button>
        </div>

        <p class="text-muted" style="font-size: 0.85rem;">
          Destination: <strong>${snailName}</strong> • Route: <em>Sector 4 Garden Path</em>
        </p>

        <div class="tracking-timeline-container my-3">
          <div class="tracking-step completed">
            <div class="step-dot">✓</div>
            <div class="step-meta">
              <strong>Message Wrapped in Protective Slime Membrane</strong>
              <small class="text-muted">Origin: Flowerpot #3</small>
            </div>
          </div>
          <div class="tracking-step completed">
            <div class="step-dot">✓</div>
            <div class="step-meta">
              <strong>Carrier Snail Departed Dispatch Depot</strong>
              <small class="text-muted">Speed: 0.0007 km/h</small>
            </div>
          </div>
          <div class="tracking-step in-progress">
            <div class="step-dot">🐌</div>
            <div class="step-meta">
              <strong style="color: #FF9800;">Currently In Transit across Flowerbed Highway</strong>
              <small class="text-muted">Carrier stopped to inspect a damp lettuce leaf</small>
            </div>
          </div>
          <div class="tracking-step">
            <div class="step-dot">○</div>
            <div class="step-meta">
              <strong class="text-muted">Final Delivery to Recipient's Shell</strong>
              <small class="text-muted">Pending arrival</small>
            </div>
          </div>
        </div>

        <button class="btn btn-primary w-100" onclick="document.getElementById('generic-dialog-modal').classList.add('hidden')">
          Close Telemetry
        </button>
      </div>
    `;

    dialog.classList.remove('hidden');
  }

  escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }
}

window.SnailMessages = new SnailMessagesController();
