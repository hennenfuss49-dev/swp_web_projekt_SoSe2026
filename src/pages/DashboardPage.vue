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
          <button class="menu-item" :class="{ active: currentView === 'dashboard' }" @click="currentView = 'dashboard'">📊 Dashboard</button>
          <button class="menu-item" :class="{ active: currentView === 'tasks' }" @click="currentView = 'tasks'">📝 Meine Tasks</button>
          <button class="menu-item" :class="{ active: currentView === 'projects' }" @click="currentView = 'projects'">👥 Projekte</button>
          <button class="menu-item" :class="{ active: currentView === 'settings' }" @click="currentView = 'settings'">⚙️ Einstellungen</button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">

        <!-- Dashboard View -->
        <template v-if="currentView === 'dashboard'">
          <div class="content-header">
            <h1>Willkommen zurück!</h1>
            <p>Verwalte deine Aufgaben und Projekte</p>
          </div>

          <section class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📌</div>
              <div class="stat-info">
                <p class="stat-label">Gesamt Tasks</p>
                <p class="stat-value">{{ totalTasks }}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-info">
                <p class="stat-label">Abgeschlossen</p>
                <p class="stat-value">{{ completedTasks }}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏳</div>
              <div class="stat-info">
                <p class="stat-label">Ausstehend</p>
                <p class="stat-value">{{ pendingTasks.length }}</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🚀</div>
              <div class="stat-info">
                <p class="stat-label">Aktive Projekte</p>
                <p class="stat-value">{{ projects.length }}</p>
              </div>
            </div>
          </section>

          <section class="dashboard-section">
            <div class="section-header">
              <h2>Anstehende Tasks</h2>
              <button class="btn btn-primary" @click="openTaskModal(null)">+ Neue Task</button>
            </div>
            <div v-if="pendingTasks.length === 0" class="tasks-placeholder">
              <p>📭</p>
              <p class="text-muted">Keine offenen Tasks vorhanden</p>
            </div>
            <div v-else class="task-list">
              <div v-for="task in pendingTasks" :key="task.id" class="task-row">
                <input type="checkbox" :checked="task.status === 'done'" @change="toggleTask(task)" class="task-checkbox" />
                <span class="task-title" :class="{ done: task.status === 'done' }">{{ task.title }}</span>
                <span class="project-badge" :style="{ background: task.projectColor }">{{ task.projectName }}</span>
                <span class="priority-badge" :class="task.priority">{{ priorityLabel(task.priority) }}</span>
                <span v-if="task.due_date" class="due-date">📅 {{ formatDate(task.due_date) }}</span>
                <button class="btn-icon" @click="deleteTask(task.id, task.project_id)" title="Löschen">✕</button>
              </div>
            </div>
          </section>

          <section class="dashboard-section">
            <div class="section-header">
              <h2>Deine Projekte</h2>
              <button class="btn btn-primary" @click="openProjectModal">+ Neues Projekt</button>
            </div>
            <div v-if="projects.length === 0" class="projects-placeholder">
              <p>📁</p>
              <p class="text-muted">Erstelle ein neues Projekt, um zu beginnen</p>
            </div>
            <div v-else class="projects-grid">
              <div v-for="project in projects" :key="project.id" class="project-card">
                <div class="project-card-header">
                  <div class="project-color-dot" :style="{ background: project.color }"></div>
                  <h3 class="project-name">{{ project.name }}</h3>
                  <span class="task-count-badge">{{ project.tasks.length }} Tasks</span>
                  <button class="btn-icon delete-btn" @click="deleteProject(project.id)" title="Projekt löschen">✕</button>
                </div>
                <p v-if="project.description" class="project-description">{{ project.description }}</p>
                <div class="project-tasks">
                  <div v-if="project.tasks.length === 0" class="no-tasks-hint">Noch keine Tasks — füge die erste hinzu!</div>
                  <div v-for="task in project.tasks" :key="task.id" class="task-row task-row--compact">
                    <input type="checkbox" :checked="task.status === 'done'" @change="toggleTask(task)" class="task-checkbox" />
                    <span class="task-title" :class="{ done: task.status === 'done' }">{{ task.title }}</span>
                    <span class="priority-badge" :class="task.priority">{{ priorityLabel(task.priority) }}</span>
                    <button class="btn-icon" @click="deleteTask(task.id, project.id)" title="Löschen">✕</button>
                  </div>
                </div>
                <button class="btn-add-task" @click="openTaskModal(project.id)">+ Task hinzufügen</button>
              </div>
            </div>
          </section>
        </template>

        <!-- Meine Tasks View -->
        <template v-else-if="currentView === 'tasks'">
          <div class="content-header">
            <h1>Meine Tasks</h1>
            <p>Alle deine Aufgaben auf einen Blick</p>
          </div>

          <div class="filter-bar">
            <select v-model="taskFilter.project_id" class="filter-select">
              <option value="">Alle Projekte</option>
              <option v-for="p in projects" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
            <select v-model="taskFilter.status" class="filter-select">
              <option value="">Alle Status</option>
              <option value="todo">Offen</option>
              <option value="in_progress">In Bearbeitung</option>
              <option value="done">Abgeschlossen</option>
            </select>
            <select v-model="taskFilter.priority" class="filter-select">
              <option value="">Alle Prioritäten</option>
              <option value="low">Niedrig</option>
              <option value="medium">Mittel</option>
              <option value="high">Hoch</option>
            </select>
            <button class="btn btn-primary" @click="openTaskModal(null)">+ Neue Task</button>
          </div>

          <section class="dashboard-section">
            <div v-if="filteredAllTasks.length === 0" class="tasks-placeholder">
              <p>📭</p>
              <p class="text-muted">Keine Tasks gefunden</p>
            </div>
            <div v-else class="task-list">
              <div v-for="task in filteredAllTasks" :key="task.id" class="task-row">
                <input type="checkbox" :checked="task.status === 'done'" @change="toggleTask(task)" class="task-checkbox" />
                <span class="task-title" :class="{ done: task.status === 'done' }">{{ task.title }}</span>
                <span class="project-badge" :style="{ background: task.projectColor }">{{ task.projectName }}</span>
                <span class="priority-badge" :class="task.priority">{{ priorityLabel(task.priority) }}</span>
                <span v-if="task.due_date" class="due-date">📅 {{ formatDate(task.due_date) }}</span>
                <span class="status-badge" :class="task.status">{{ statusLabel(task.status) }}</span>
                <button class="btn-icon" @click="deleteTask(task.id, task.project_id)" title="Löschen">✕</button>
              </div>
            </div>
          </section>
        </template>

        <!-- Projekte View -->
        <template v-else-if="currentView === 'projects'">
          <div class="content-header">
            <h1>Projekte</h1>
            <p>Alle deine Projekte und ihre Aufgaben</p>
          </div>

          <section class="dashboard-section">
            <div class="section-header">
              <h2>Deine Projekte</h2>
              <button class="btn btn-primary" @click="openProjectModal">+ Neues Projekt</button>
            </div>
            <div v-if="projects.length === 0" class="projects-placeholder">
              <p>📁</p>
              <p class="text-muted">Erstelle ein neues Projekt, um zu beginnen</p>
            </div>
            <div v-else class="projects-grid">
              <div v-for="project in projects" :key="project.id" class="project-card">
                <div class="project-card-header">
                  <div class="project-color-dot" :style="{ background: project.color }"></div>
                  <h3 class="project-name">{{ project.name }}</h3>
                  <span class="task-count-badge">{{ project.tasks.length }} Tasks</span>
                  <button class="btn-icon delete-btn" @click="deleteProject(project.id)" title="Projekt löschen">✕</button>
                </div>
                <p v-if="project.description" class="project-description">{{ project.description }}</p>
                <div class="project-tasks">
                  <div v-if="project.tasks.length === 0" class="no-tasks-hint">Noch keine Tasks — füge die erste hinzu!</div>
                  <div v-for="task in project.tasks" :key="task.id" class="task-row task-row--compact">
                    <input type="checkbox" :checked="task.status === 'done'" @change="toggleTask(task)" class="task-checkbox" />
                    <span class="task-title" :class="{ done: task.status === 'done' }">{{ task.title }}</span>
                    <span class="priority-badge" :class="task.priority">{{ priorityLabel(task.priority) }}</span>
                    <button class="btn-icon" @click="deleteTask(task.id, project.id)" title="Löschen">✕</button>
                  </div>
                </div>
                <button class="btn-add-task" @click="openTaskModal(project.id)">+ Task hinzufügen</button>
              </div>
            </div>
          </section>
        </template>

        <!-- Einstellungen View -->
        <template v-else-if="currentView === 'settings'">
          <div class="content-header">
            <h1>Einstellungen</h1>
            <p>Deine Kontoeinstellungen</p>
          </div>
          <section class="dashboard-section">
            <div class="settings-info">
              <div class="settings-row">
                <span class="settings-label">Name</span>
                <span class="settings-value">{{ userName }}</span>
              </div>
            </div>
          </section>
        </template>

      </main>
    </div>

    <!-- Modal: Neues Projekt -->
    <div v-if="showProjectModal" class="modal-overlay" @click.self="showProjectModal = false">
      <div class="modal">
        <h3 class="modal-title">Neues Projekt erstellen</h3>
        <div v-if="modalError" class="modal-error">{{ modalError }}</div>

        <label class="form-label">Name *</label>
        <input
          v-model="newProject.name"
          class="form-input"
          placeholder="z.B. Website Redesign"
          @keyup.enter="createProject"
        />

        <label class="form-label">Beschreibung</label>
        <textarea
          v-model="newProject.description"
          class="form-input"
          placeholder="Optionale Beschreibung..."
          rows="3"
        ></textarea>

        <label class="form-label">Farbe</label>
        <div class="color-picker">
          <span
            v-for="color in presetColors"
            :key="color"
            class="color-dot"
            :style="{ background: color }"
            :class="{ selected: newProject.color === color }"
            @click="newProject.color = color"
          ></span>
        </div>

        <div class="modal-actions">
          <button class="btn btn-secondary" @click="showProjectModal = false">Abbrechen</button>
          <button class="btn btn-primary" @click="createProject" :disabled="modalLoading">
            {{ modalLoading ? 'Erstelle...' : 'Projekt erstellen' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal: Neue Task -->
    <div v-if="showTaskModal" class="modal-overlay" @click.self="showTaskModal = false">
      <div class="modal">
        <h3 class="modal-title">Neue Task erstellen</h3>
        <div v-if="modalError" class="modal-error">{{ modalError }}</div>

        <label class="form-label">Projekt *</label>
        <select v-model="newTask.project_id" class="form-input">
          <option :value="null" disabled>Projekt auswählen...</option>
          <option v-for="p in projects" :key="p.id" :value="p.id">{{ p.name }}</option>
        </select>

        <label class="form-label">Titel *</label>
        <input
          v-model="newTask.title"
          class="form-input"
          placeholder="z.B. Login-Seite gestalten"
          @keyup.enter="createTask"
        />

        <label class="form-label">Beschreibung</label>
        <textarea
          v-model="newTask.description"
          class="form-input"
          placeholder="Optionale Beschreibung..."
          rows="3"
        ></textarea>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Priorität</label>
            <select v-model="newTask.priority" class="form-input">
              <option value="low">Niedrig</option>
              <option value="medium">Mittel</option>
              <option value="high">Hoch</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Fällig am</label>
            <input v-model="newTask.due_date" type="date" class="form-input" />
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-secondary" @click="showTaskModal = false">Abbrechen</button>
          <button class="btn btn-primary" @click="createTask" :disabled="modalLoading">
            {{ modalLoading ? 'Erstelle...' : 'Task erstellen' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { authService } from '../services/auth'
import { projectService, type Project, type Task } from '../services/projectService'

interface ProjectWithTasks extends Project {
  tasks: (Task & { projectName?: string; projectColor?: string })[]
}

interface PendingTask extends Task {
  projectName: string
  projectColor: string
}

export default defineComponent({
  name: 'DashboardPage',
  data() {
    return {
      userName: '',
      currentView: 'dashboard',
      taskFilter: { project_id: '' as number | '', status: '', priority: '' },
      projects: [] as ProjectWithTasks[],
      showProjectModal: false,
      showTaskModal: false,
      modalLoading: false,
      modalError: '',
      newProject: { name: '', description: '', color: '#667eea' },
      newTask: { project_id: null as number | null, title: '', description: '', priority: 'medium', due_date: '' },
      presetColors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b', '#fa709a', '#fee140']
    }
  },
  computed: {
    totalTasks(): number {
      return this.projects.reduce((sum, p) => sum + p.tasks.length, 0)
    },
    completedTasks(): number {
      return this.projects.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'done').length, 0)
    },
    pendingTasks(): PendingTask[] {
      return this.projects.flatMap(p =>
        p.tasks
          .filter(t => t.status !== 'done')
          .map(t => ({ ...t, projectName: p.name, projectColor: p.color }))
      )
    },
    allTasksFlat(): PendingTask[] {
      return this.projects.flatMap(p =>
        p.tasks.map(t => ({ ...t, projectName: p.name, projectColor: p.color }))
      )
    },
    filteredAllTasks(): PendingTask[] {
      return this.allTasksFlat.filter(t => {
        if (this.taskFilter.project_id !== '' && t.project_id !== Number(this.taskFilter.project_id)) return false
        if (this.taskFilter.status && t.status !== this.taskFilter.status) return false
        if (this.taskFilter.priority && t.priority !== this.taskFilter.priority) return false
        return true
      })
    }
  },
  async mounted() {
    const token = authService.getToken()
    const user = authService.getUser()
    if (!token || !user) {
      this.$router.push('/login')
      return
    }
    this.userName = user.name || user.email
    await this.loadProjects()
  },
  methods: {
    async loadProjects() {
      try {
        const projects = await projectService.getProjects()
        const withTasks = await Promise.all(
          projects.map(async p => {
            const tasks = await projectService.getTasksForProject(p.id)
            return { ...p, tasks }
          })
        )
        this.projects = withTasks
      } catch {
        // ignore load errors silently
      }
    },
    openProjectModal() {
      this.newProject = { name: '', description: '', color: '#667eea' }
      this.modalError = ''
      this.showProjectModal = true
    },
    openTaskModal(projectId: number | null) {
      this.newTask = { project_id: projectId, title: '', description: '', priority: 'medium', due_date: '' }
      this.modalError = ''
      this.showTaskModal = true
    },
    async createProject() {
      if (!this.newProject.name.trim()) {
        this.modalError = 'Bitte gib einen Projektnamen ein.'
        return
      }
      this.modalLoading = true
      this.modalError = ''
      try {
        const project = await projectService.createProject({
          name: this.newProject.name.trim(),
          description: this.newProject.description.trim() || undefined,
          color: this.newProject.color
        })
        this.projects.unshift({ ...project, tasks: [] })
        this.showProjectModal = false
      } catch (err: any) {
        this.modalError = err?.error || 'Projekt konnte nicht erstellt werden.'
      } finally {
        this.modalLoading = false
      }
    },
    async createTask() {
      if (!this.newTask.project_id) {
        this.modalError = 'Bitte wähle ein Projekt aus.'
        return
      }
      if (!this.newTask.title.trim()) {
        this.modalError = 'Bitte gib einen Titel ein.'
        return
      }
      this.modalLoading = true
      this.modalError = ''
      try {
        const task = await projectService.createTask({
          project_id: this.newTask.project_id,
          title: this.newTask.title.trim(),
          description: this.newTask.description.trim() || undefined,
          priority: this.newTask.priority,
          due_date: this.newTask.due_date || undefined
        })
        const project = this.projects.find(p => p.id === this.newTask.project_id)
        if (project) project.tasks.unshift(task)
        this.showTaskModal = false
      } catch (err: any) {
        this.modalError = err?.error || 'Task konnte nicht erstellt werden.'
      } finally {
        this.modalLoading = false
      }
    },
    async toggleTask(task: Task) {
      const newStatus = task.status === 'done' ? 'todo' : 'done'
      try {
        await projectService.updateTaskStatus(task.id, newStatus)
        task.status = newStatus
      } catch {
        // revert on error by doing nothing (checkbox state is reactive)
      }
    },
    async deleteTask(taskId: number, projectId: number) {
      try {
        await projectService.deleteTask(taskId)
        const project = this.projects.find(p => p.id === projectId)
        if (project) project.tasks = project.tasks.filter(t => t.id !== taskId)
      } catch {
        // ignore
      }
    },
    async deleteProject(projectId: number) {
      if (!confirm('Projekt und alle zugehörigen Tasks wirklich löschen?')) return
      try {
        await projectService.deleteProject(projectId)
        this.projects = this.projects.filter(p => p.id !== projectId)
      } catch {
        // ignore
      }
    },
    handleLogout() {
      authService.logout()
      this.$router.push('/')
    },
    priorityLabel(priority: string): string {
      return ({ low: 'Niedrig', medium: 'Mittel', high: 'Hoch' } as Record<string, string>)[priority] || priority
    },
    statusLabel(status: string): string {
      return ({ todo: 'Offen', in_progress: 'In Bearbeitung', done: 'Abgeschlossen' } as Record<string, string>)[status] || status
    },
    formatDate(dateStr: string): string {
      return new Date(dateStr).toLocaleDateString('de-AT')
    }
  }
})
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.dashboard-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.top-nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  color: white;
}

.nav-left h2 { font-size: 1.5rem; }

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-name { font-weight: 600; }

.btn-logout {
  padding: 0.5rem 1rem;
  background-color: rgba(255,255,255,0.2);
  border: 2px solid white;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-logout:hover { background-color: rgba(255,255,255,0.3); }

.dashboard-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
}

.sidebar {
  width: 250px;
  background: white;
  padding: 2rem 0;
  box-shadow: 2px 0 10px rgba(0,0,0,0.05);
  min-height: calc(100vh - 70px);
}

.sidebar-menu { display: flex; flex-direction: column; }

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

.menu-item:hover, .menu-item.active {
  background-color: #f5f7fa;
  border-left-color: #667eea;
  color: #667eea;
}

.menu-item.active { font-weight: 600; }

.main-content { flex: 1; padding: 2rem; }

.content-header { margin-bottom: 2rem; }
.content-header h1 { font-size: 2rem; color: #333; margin-bottom: 0.5rem; }
.content-header p { color: #999; }

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
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon { font-size: 2.5rem; }
.stat-label { color: #999; font-size: 0.9rem; margin-bottom: 0.5rem; }
.stat-value { font-size: 1.8rem; font-weight: 700; color: #667eea; }

.dashboard-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 { font-size: 1.5rem; color: #333; }

.btn {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary { background-color: #667eea; color: white; }
.btn-primary:hover:not(:disabled) { background-color: #5568d3; transform: translateY(-2px); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-secondary { background-color: #f0f0f0; color: #333; }
.btn-secondary:hover { background-color: #e0e0e0; }

/* Task list */
.task-list { display: flex; flex-direction: column; gap: 0.5rem; }

.task-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: #f9fafb;
  transition: background 0.2s;
}

.task-row:hover { background: #f0f2f8; }
.task-row--compact { padding: 0.5rem 0.75rem; background: #f5f7fa; }

.task-checkbox { width: 18px; height: 18px; cursor: pointer; flex-shrink: 0; }

.task-title {
  flex: 1;
  font-size: 0.95rem;
  color: #333;
}

.task-title.done {
  text-decoration: line-through;
  color: #aaa;
}

.project-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.priority-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.priority-badge.low { background: #e8f5e9; color: #388e3c; }
.priority-badge.medium { background: #fff8e1; color: #f57f17; }
.priority-badge.high { background: #ffebee; color: #c62828; }

.due-date { font-size: 0.8rem; color: #999; white-space: nowrap; }

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  color: #ccc;
  font-size: 0.85rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-icon:hover { background: #fee; color: #c62828; }

/* Projects grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  border: 1px solid #e8ecf0;
  border-radius: 10px;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.project-card:hover { box-shadow: 0 4px 15px rgba(0,0,0,0.08); }

.project-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.project-color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
}

.project-name { font-size: 1.1rem; font-weight: 700; color: #333; flex: 1; }

.task-count-badge {
  background: #f0f2f8;
  color: #667eea;
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.delete-btn { margin-left: auto; }

.project-description { color: #888; font-size: 0.9rem; margin-bottom: 1rem; }

.project-tasks {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
  min-height: 20px;
}

.no-tasks-hint { color: #bbb; font-size: 0.85rem; padding: 0.5rem 0; }

.btn-add-task {
  width: 100%;
  padding: 0.6rem;
  background: none;
  border: 2px dashed #d0d7e8;
  border-radius: 8px;
  color: #667eea;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-add-task:hover { background: #f0f2f8; border-color: #667eea; }

/* Placeholders */
.tasks-placeholder, .projects-placeholder {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.tasks-placeholder p:first-child, .projects-placeholder p:first-child {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.text-muted { color: #bbb; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
}

.modal-error {
  background: #ffebee;
  color: #c62828;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-input:focus { outline: none; border-color: #667eea; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; }
.form-group .form-input { margin-bottom: 0; }

.color-picker {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.color-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: transform 0.2s, border-color 0.2s;
}

.color-dot:hover { transform: scale(1.15); }
.color-dot.selected { border-color: #333; transform: scale(1.1); }

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.filter-select {
  padding: 0.6rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #333;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-select:focus { outline: none; border-color: #667eea; }

/* Status Badge */
.status-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-badge.todo { background: #e3f2fd; color: #1565c0; }
.status-badge.in_progress { background: #fff8e1; color: #f57f17; }
.status-badge.done { background: #e8f5e9; color: #388e3c; }

/* Settings */
.settings-info { display: flex; flex-direction: column; gap: 1rem; }

.settings-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.settings-label { font-weight: 600; color: #555; width: 120px; }
.settings-value { color: #333; }

/* Responsive */
@media (max-width: 768px) {
  .dashboard-container { flex-direction: column; }
  .sidebar { width: 100%; min-height: auto; }
  .sidebar-menu { flex-direction: row; }
  .menu-item { flex: 1; border-left: none; border-bottom: 4px solid transparent; padding: 1rem; }
  .menu-item.active, .menu-item:hover { border-left: none; border-bottom-color: #667eea; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .section-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .projects-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
