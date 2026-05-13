import { Router, Response } from 'express'
import pool from '../db'
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const connection = await pool.getConnection()
    const [projects] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
      [req.user!.id]
    )
    connection.release()
    return res.json(projects)
  } catch (error) {
    console.error('Get Projects Error:', error)
    res.status(500).json({ error: 'Projekte konnten nicht geladen werden' })
  }
})

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, color } = req.body
    if (!name) return res.status(400).json({ error: 'Name ist erforderlich' })

    const connection = await pool.getConnection()
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO projects (user_id, name, description, color) VALUES (?, ?, ?, ?)',
      [req.user!.id, name, description || null, color || '#667eea']
    )
    const [projects] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM projects WHERE id = ?',
      [result.insertId]
    )
    connection.release()
    return res.status(201).json(projects[0])
  } catch (error) {
    console.error('Create Project Error:', error)
    res.status(500).json({ error: 'Projekt konnte nicht erstellt werden' })
  }
})

router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const connection = await pool.getConnection()
    await connection.query(
      'DELETE FROM projects WHERE id = ? AND user_id = ?',
      [req.params.id, req.user!.id]
    )
    connection.release()
    return res.json({ message: 'Projekt gelöscht' })
  } catch (error) {
    console.error('Delete Project Error:', error)
    res.status(500).json({ error: 'Projekt konnte nicht gelöscht werden' })
  }
})

export default router
