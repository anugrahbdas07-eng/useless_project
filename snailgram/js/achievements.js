// SnailGram Achievements System & Toast Notifier
class SnailAchievementsController {
  constructor() {
    this.toastContainer = null;
  }

  init() {
    this.createToastContainer();
    window.SnailState.on('achievement:unlocked', (ach) => this.showAchievementToast(ach));
  }

  createToastContainer() {
    if (document.getElementById('achievement-toast-container')) return;
    const container = document.createElement('div');
    container.id = 'achievement-toast-container';
    container.className = 'achievement-toast-container';
    document.body.appendChild(container);
    this.toastContainer = container;
  }

  showAchievementToast(ach) {
    if (!this.toastContainer) this.createToastContainer();

    const toast = document.createElement('div');
    toast.className = 'achievement-toast glass-card animate-bounce-in';
    toast.innerHTML = `
      <div class="ach-toast-icon">${ach.icon}</div>
      <div class="ach-toast-body">
        <span class="ach-toast-badge">🏆 MILESTONE UNLOCKED!</span>
        <h4 class="m-0">${ach.title}</h4>
        <p class="m-0 text-muted" style="font-size: 0.8rem;">${ach.description}</p>
        <span class="ach-toast-reward">🌿 +${ach.rewardLeaves} Leaves added to treasury!</span>
      </div>
    `;

    this.toastContainer.appendChild(toast);

    // Auto dismiss after 5.5s
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 5500);
  }
}

window.SnailAchievements = new SnailAchievementsController();
