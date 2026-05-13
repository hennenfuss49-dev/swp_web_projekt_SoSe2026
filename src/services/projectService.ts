import api from './auth'

export interface Project {
  id: number
  user_id: number
  name: string
  description: string | null
  color: string
  created_at: string
  tasks: Task[]
}

export interface Task {
  id: number
  project_id: number
  user_id: number
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
  created_at: string
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return { Authorization: `Bearer ${token}` }
}

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const response = await api.get('/projects', { headers: getAuthHeaders() })
    return response.data
  },

  async createProject(data: { name: string; description?: string; color?: string }): Promise<Project> {
    const response = await api.post('/projects', data, { headers: getAuthHeaders() })
    return response.data
  },

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/projects/${id}`, { headers: getAuthHeaders() })
  },

  async getTasksForProject(projectId: number): Promise<Task[]> {
    const response = await api.get(`/tasks/project/${projectId}`, { headers: getAuthHeaders() })
    return response.data
  },

  async createTask(data: {
    project_id: number
    title: string
    description?: string
    priority?: string
    due_date?: string
  }): Promise<Task> {
    const response = await api.post('/tasks', data, { headers: getAuthHeaders() })
    return response.data
  },

  async updateTaskStatus(id: number, status: string): Promise<void> {
    await api.patch(`/tasks/${id}/status`, { status }, { headers: getAuthHeaders() })
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`, { headers: getAuthHeaders() })
  }
}
