import { Router, Response } from 'express'
import pool from '../db'
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/project/:projectId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [projects] = await connection.query<RowDataPacket[]>(
      'SELECT id FROM projects WHERE id = ? AND user_id = ?',
      [req.params.projectId, req.user!.id]
    )
    if (!projects.length) {
      connection.release()
      return res.status(403).json({ error: 'Zugriff verweigert' })
    }
    const [tasks] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC',
      [req.params.projectId]
    )
    connection.release()
    return res.json(tasks)
  } catch (error) {
    console.error('Get Tasks Error:', error)
    res.status(500).json({ error: 'Tasks konnten nicht geladen werden' })
  }
})

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { project_id, title, description, status, priority, due_date } = req.body
    if (!project_id || !title) {
      return res.status(400).json({ error: 'Projekt und Titel sind erforderlich' })
    }

    const connection = await pool.getConnection()
    const [projects] = await connection.query<RowDataPacket[]>(
      'SELECT id FROM projects WHERE id = ? AND user_id = ?',
      [project_id, req.user!.id]
    )
    if (!projects.length) {
      connection.release()
      return res.status(403).json({ error: 'Zugriff verweigert' })
    }

    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO tasks (project_id, user_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [project_id, req.user!.id, title, description || null, status || 'todo', priority || 'medium', due_date || null]
    )
    const [tasks] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM tasks WHERE id = ?',
      [result.insertId]
    )
    connection.release()
    return res.status(201).json(tasks[0])
  } catch (error) {
    console.error('Create Task Error:', error)
    res.status(500).json({ error: 'Task konnte nicht erstellt werden' })
  }
})

router.patch('/:id/status', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body
    const connection = await pool.getConnection()
    await connection.query(
      'UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?',
      [status, req.params.id, req.user!.id]
    )
    connection.release()
    return res.json({ message: 'Status aktualisiert' })
  } catch (error) {
    console.error('Update Task Error:', error)
    res.status(500).json({ error: 'Task konnte nicht aktualisiert werden' })
  }
})

router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const connection = await pool.getConnection()
    await connection.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [req.params.id, req.user!.id]
    )
    connection.release()
    return res.json({ message: 'Task gelöscht' })
  } catch (error) {
    console.error('Delete Task Error:', error)
    res.status(500).json({ error: 'Task konnte nicht gelöscht werden' })
  }
})

export default router
