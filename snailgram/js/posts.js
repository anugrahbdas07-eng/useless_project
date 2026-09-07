// SnailGram Create Post Controller & SnailMind™ Caption Generator (Comedy Edition)
class SnailPostController {
  constructor() {
    this.selectedTheme = 'dew';
    this.customImageData = null;
  }

  init() {}

  openModal() {
    if (window.SnailAudio) window.SnailAudio.playPop();
    const modal = document.getElementById('create-post-modal');
    if (!modal) return;

    this.selectedTheme = 'dew';
    this.customImageData = null;

    const captionEl = document.getElementById('new-post-caption');
    const locEl = document.getElementById('new-post-location');
    if (captionEl) captionEl.value = '';
    if (locEl) locEl.value = 'Under The Lawn Chair Nobody Has Moved Since 2018 🪑';

    this.highlightSelectedTheme('dew');
    modal.classList.remove('hidden');
  }

  closeModal() {
    const modal = document.getElementById('create-post-modal');
    if (modal) modal.classList.add('hidden');
  }

  selectTheme(theme) {
    this.selectedTheme = theme;
    this.customImageData = null;
    this.highlightSelectedTheme(theme);
    if (window.SnailAudio) window.SnailAudio.playPop();

    const previewContainer = document.getElementById('post-image-preview');
    if (previewContainer && window.SnailFeed) {
      previewContainer.innerHTML = window.SnailFeed.getPostSvgImage(theme);
    }
  }

  highlightSelectedTheme(theme) {
    document.querySelectorAll('.theme-option-card').forEach(card => {
      card.classList.toggle('active', card.dataset.theme === theme);
    });
  }

  handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      this.customImageData = event.target.result;
      this.selectedTheme = 'custom';
      this.highlightSelectedTheme(null);
      const previewContainer = document.getElementById('post-image-preview');
      if (previewContainer) {
        previewContainer.innerHTML = `<img src="${this.customImageData}" alt="Uploaded image" class="post-custom-img preview-fit"/>`;
      }
      if (window.SnailAudio) window.SnailAudio.playLeafRustle();
    };
    reader.readAsDataURL(file);
  }

  generateSnailMindCaption() {
    if (window.SnailAudio) window.SnailAudio.playChime();

    const personality = (window.SnailState && window.SnailState.state.user.personality) || 'philosopher';
    const moodEl = document.getElementById('snailmind-mood-select');
    const topicEl = document.getElementById('snailmind-topic-select');
    const captionInput = document.getElementById('new-post-caption');

    const mood = moodEl ? moodEl.value : 'majestic';
    const topic = topicEl ? topicEl.value : 'leaf';

    const templates = window.SNAIL_DATA.snailMindTemplates[personality] || window.SNAIL_DATA.snailMindTemplates.philosopher;
    let baseText = templates[mood] || templates.majestic || "Gliding at 0.0007 km/h with unbothered grace 🌿";

    // Append hashtag humor
    let hashtags = " #SlowLife #SnailGram";
    if (mood === 'linkedin') hashtags = " #MucusHustle #B2BGastropod #DisruptingSlime";
    else if (mood === 'karen') hashtags = " #GardenerComplaint #Unacceptable #0Stars";
    else if (topic === 'salt') hashtags = " #SaltHazard #CodeRed #EvacuateShell";
    else if (topic === 'worm') hashtags = " #StaringContest #NoBlinking #MolluskDominance";
    else if (topic === 'dew') hashtags = " #DewGlowUp #HydrationGoals #Moisturize";
    else if (topic === 'leaf') hashtags = " #LeafReview #FoliageSnob #ArtisanalGreens";

    if (captionInput) {
      captionInput.value = `${baseText}${hashtags}`;
      captionInput.classList.add('animate-highlight');
      setTimeout(() => captionInput.classList.remove('animate-highlight'), 1000);
    }
  }

  addHashtagToCaption(tag) {
    const captionInput = document.getElementById('new-post-caption');
    if (!captionInput) return;
    if (!captionInput.value.includes(tag)) {
      captionInput.value = (captionInput.value.trim() + ' ' + tag).trim();
    }
    if (window.SnailAudio) window.SnailAudio.playPop();
  }

  submitPost(e) {
    e.preventDefault();
    const captionEl = document.getElementById('new-post-caption');
    const locEl = document.getElementById('new-post-location');

    const caption = captionEl ? captionEl.value.trim() : '';
    const location = locEl ? locEl.value.trim() : 'Somewhere in the damp soil 🌿';

    if (!caption) {
      alert("🐌 Your snail cannot carry an empty post! Please add a caption.");
      return;
    }

    this.closeModal();

    // 20-second Snail Time modal delivery
    window.SnailTime.run({
      actionType: 'post',
      title: 'Carrying Post Across The Garden 🐌📦',
      payloadIcon: '📸',
      useModal: true,
      onComplete: () => {
        window.SnailState.addNewPost({
          caption,
          location,
          imageTheme: this.selectedTheme,
          customImage: this.customImageData
        });

        window.SnailApp.navigate('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

window.SnailPosts = new SnailPostController();
