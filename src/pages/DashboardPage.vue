<template>
  <div class="dashboard-page">
    <!-- Top Navigation -->
    <nav class="top-nav">
      <div class="nav-left">
        <h2>📋 TaskFlow Dashboard</h2>
      </div>
      <div class="nav-right">
        <span class="user-name" v-if="userName">Hallo, {{ userName }}!</span>
        <button @click="handleLogout" class="btn btn-logout">Abmelden</button>
      </div>
    </nav>

    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-menu">
          <button class="menu-item active">
            📊 Dashboard
          </button>
          <button class="menu-item">
            📝 Meine Tasks
          </button>
          <button class="menu-item">
            👥 Projekte
          </button>
          <button class="menu-item">
            ⚙️ Einstellungen
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <div class="content-header">
          <h1>Willkommen zurück!</h1>
          <p>Verwalte deine Aufgaben und Projekte</p>
        </div>

        <!-- Quick Stats -->
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📌</div>
            <div class="stat-info">
              <p class="stat-label">Gesamt Tasks</p>
              <p class="stat-value">0</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
              <p class="stat-label">Abgeschlossen</p>
              <p class="stat-value">0</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⏳</div>
            <div class="stat-info">
              <p class="stat-label">Ausstehend</p>
              <p class="stat-value">0</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🚀</div>
            <div class="stat-info">
              <p class="stat-label">Aktive Projekte</p>
              <p class="stat-value">0</p>
            </div>
          </div>
        </section>

        <!-- Dashboard Content -->
        <section class="dashboard-section">
          <div class="section-header">
            <h2>Anstehende Tasks</h2>
            <button class="btn btn-primary">+ Neue Task</button>
          </div>
          <div class="tasks-placeholder">
            <p>📭 Keine Tasks vorhanden</p>
            <p class="text-muted">Starte indem du deine erste Task erstellst</p>
          </div>
        </section>

        <section class="dashboard-section">
          <div class="section-header">
            <h2>Deine Projekte</h2>
            <button class="btn btn-primary">+ Neues Projekt</button>
          </div>
          <div class="projects-placeholder">
            <p>📁 Keine Projekte vorhanden</p>
            <p class="text-muted">Erstelle ein neues Projekt, um zu beginnen</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { authService } from '../services/auth'

export default defineComponent({
  name: 'DashboardPage',
  data() {
    return {
      userName: '',
      userEmail: ''
    }
  },
  mounted() {
    // Überprüfe, ob Benutzer angemeldet ist
    const token = authService.getToken()
    const user = authService.getUser()

    if (!token || !user) {
      this.$router.push('/login')
      return
    }

    this.userName = user.name || user.email
    this.userEmail = user.email
  },
  methods: {
    handleLogout() {
      authService.logout()
      this.$router.push('/')
    }
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* Top Navigation */
.top-nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
}

.nav-left h2 {
  font-size: 1.5rem;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-name {
  font-weight: 600;
}

.btn-logout {
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* Dashboard Container */
.dashboard-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background: white;
  padding: 2rem 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  min-height: calc(100vh - 70px);
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 1rem 2rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.menu-item:hover {
  background-color: #f5f7fa;
  border-left-color: #667eea;
  color: #667eea;
}

.menu-item.active {
  background-color: #f5f7fa;
  border-left-color: #667eea;
  color: #667eea;
  font-weight: 600;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem;
}

.content-header {
  margin-bottom: 2rem;
}

.content-header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.content-header p {
  color: #999;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-label {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #667eea;
}

/* Dashboard Sections */
.dashboard-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  color: #333;
}

.btn {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover {
  background-color: #5568d3;
  transform: translateY(-2px);
}

/* Placeholders */
.tasks-placeholder,
.projects-placeholder {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.tasks-placeholder p:first-child,
.projects-placeholder p:first-child {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.text-muted {
  color: #bbb;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: auto;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
  }

  .sidebar-menu {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .menu-item {
    flex: 1;
    border-left: none;
    border-bottom: 4px solid transparent;
    padding: 1rem;
  }

  .menu-item.active,
  .menu-item:hover {
    border-left: none;
    border-bottom-color: #667eea;
  }

  .nav-right {
    flex-direction: column;
    gap: 0.5rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
