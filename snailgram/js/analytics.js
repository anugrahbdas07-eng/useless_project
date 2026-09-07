// SnailGram Creator Analytics & Uselessness Dashboard Controller (Comedy Edition)
class SnailAnalyticsController {
  constructor() {
    this.followerChart = null;
    this.leafChart = null;
  }

  init() {
    window.SnailState.on('analytics:updated', () => this.renderDashboard());
    window.SnailState.on('user:updated', () => this.renderDashboard());
  }

  renderDashboard() {
    const container = document.getElementById('analytics-view-container');
    if (!container) return;

    const user = window.SnailState.state.user;
    const analytics = window.SnailState.state.analytics;
    const totalMinutes = Math.floor((analytics.timeSpentSeconds || 120) / 60);
    const displayMinutes = totalMinutes % 60;

    container.innerHTML = `
      <div class="analytics-wrapper">
        <!-- Hero Header -->
        <div class="analytics-hero-card glass-card">
          <div class="analytics-hero-meta">
            <span class="badge analytics-badge">📊 DEPT OF UNNECESSARY AFFAIRS</span>
            <h2>Gastropod Insights & Anti-Productivity</h2>
            <p class="text-muted">Rigorous statistical proof that you are accomplishing absolutely nothing with extreme dedication.</p>
          </div>
          <div class="usefulness-pill-large">
            <span class="pill-title">APP USEFULNESS INDEX</span>
            <strong class="pill-val">0.003%</strong>
            <small class="text-muted">Margin of error: ±0.003%</small>
          </div>
        </div>

        <!-- Metrics Grid -->
        <div class="metrics-grid">
          <div class="metric-card glass-card">
            <span class="metric-icon">👥</span>
            <div class="metric-data">
              <span class="metric-label">Garden Followers</span>
              <strong class="metric-val">${(user.followers || 142).toLocaleString()}</strong>
              <small class="metric-trend positive">↑ +0.00002% this decade</small>
            </div>
          </div>

          <div class="metric-card glass-card">
            <span class="metric-icon">❤️</span>
            <div class="metric-data">
              <span class="metric-label">Likes Received</span>
              <strong class="metric-val">${(user.likesCount || 849).toLocaleString()}</strong>
              <small class="metric-trend positive">↑ Crawling upward</small>
            </div>
          </div>

          <div class="metric-card glass-card">
            <span class="metric-icon">📸</span>
            <div class="metric-data">
              <span class="metric-label">Total Posts</span>
              <strong class="metric-val">${user.postsCount || 0}</strong>
              <small class="metric-trend text-muted">0.00004 posts/sec</small>
            </div>
          </div>

          <div class="metric-card glass-card">
            <span class="metric-icon">🌿</span>
            <div class="metric-data">
              <span class="metric-label">Treasury Leaves</span>
              <strong class="metric-val">${user.leaves || 0}</strong>
              <small class="metric-trend positive">100% Tax-Free Greens</small>
            </div>
          </div>
        </div>

        <!-- Absurdity & Uselessness Stats Card -->
        <div class="uselessness-banner glass-card">
          <h3>🐌 SCIENTIFIC USELESSNESS METRICS</h3>
          <p class="text-muted">Certified by the International Council of Unhurried Mollusks</p>

          <div class="useless-stats-table">
            <div class="useless-row">
              <span>Actual Human Problems Solved</span>
              <strong>0.0000</strong>
            </div>
            <div class="useless-row">
              <span>Probability of Being Eaten by a Bird While Waiting</span>
              <strong class="text-danger">64.2%</strong>
            </div>
            <div class="useless-row">
              <span>Total Human Calories Burned Scrolling</span>
              <strong>0.0004 kcal</strong>
            </div>
            <div class="useless-row">
              <span>Total Mucus Exuded into Local Storage</span>
              <strong>14.2 mL</strong>
            </div>
            <div class="useless-row">
              <span>Time Meaningfully Squandered</span>
              <strong>17h ${displayMinutes}m</strong>
            </div>
            <div class="useless-row">
              <span>Messages Sent on Scenic Postal Route</span>
              <strong>${924 + (analytics.messagesDelayedCount || 0)}</strong>
            </div>
            <div class="useless-row">
              <span>Government Subsidies Granted for Snail Housing</span>
              <strong>$0.00</strong>
            </div>
            <div class="useless-row highlight-row">
              <span>Current Human Productivity Level</span>
              <strong class="text-danger">0.00% (Sub-zero)</strong>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="analytics-charts-grid">
          <div class="chart-card glass-card">
            <h4>Follower Velocity (Millimetres per Millennium)</h4>
            <div class="chart-canvas-container">
              <canvas id="followerTrajectoryChart"></canvas>
            </div>
          </div>

          <div class="chart-card glass-card">
            <h4>Foliage vs Cardboard Consumption</h4>
            <div class="chart-canvas-container">
              <canvas id="leafConsumptionChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => this.renderCharts(), 50);
  }

  renderCharts() {
    if (typeof Chart === 'undefined') return;

    const followerCtx = document.getElementById('followerTrajectoryChart')?.getContext('2d');
    if (followerCtx) {
      if (this.followerChart) this.followerChart.destroy();
      this.followerChart = new Chart(followerCtx, {
        type: 'line',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [{
            label: 'Follower Crawl Rate',
            data: [12, 14, 15, 18, 22, 29, 35],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.15)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#2E7D32',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    const leafCtx = document.getElementById('leafConsumptionChart')?.getContext('2d');
    if (leafCtx) {
      if (this.leafChart) this.leafChart.destroy();
      this.leafChart = new Chart(leafCtx, {
        type: 'doughnut',
        data: {
          labels: ['Savoy Cabbage', 'Romaine', 'Wet Cardboard (Forbidden Snack)', 'Yard Clover'],
          datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: ['#66BB6A', '#81C784', '#FF8A80', '#C8E6C9'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }
  }
}

window.SnailAnalytics = new SnailAnalyticsController();
