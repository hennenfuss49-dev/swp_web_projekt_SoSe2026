import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db'
import { RowDataPacket } from 'mysql2/promise'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'

// User Interface für TypeScript
interface User extends RowDataPacket {
  id: number
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
}

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    // Validierung
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, Email und Passwort sind erforderlich' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Passwort muss mindestens 6 Zeichen lang sein' })
    }

    const connection = await pool.getConnection()

    // Überprüfe ob Email bereits existiert
    const [existing] = await connection.query('SELECT id FROM users WHERE email = ?', [email])
    
    if (Array.isArray(existing) && existing.length > 0) {
      connection.release()
      return res.status(409).json({ error: 'Diese Email wird bereits verwendet' })
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Benutzer erstellen
    await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    connection.release()

    return res.status(201).json({ 
      message: 'Registrierung erfolgreich',
      user: { name, email }
    })
  } catch (error) {
    console.error('Register Error:', error)
    res.status(500).json({ error: 'Registrierung fehlgeschlagen' })
  }
})

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validierung
    if (!email || !password) {
      return res.status(400).json({ error: 'Email und Passwort sind erforderlich' })
    }

    const connection = await pool.getConnection()

    // Benutzer finden
    const [rows] = await connection.query<User[]>('SELECT * FROM users WHERE email = ?', [email])
    const user = (rows as User[])[0]

    if (!user) {
      connection.release()
      return res.status(401).json({ error: 'Email oder Passwort ungültig' })
    }

    // Passwort überprüfen
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      connection.release()
      return res.status(401).json({ error: 'Email oder Passwort ungültig' })
    }

    // JWT Token erstellen
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    connection.release()

    return res.json({
      message: 'Login erfolgreich',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ error: 'Login fehlgeschlagen' })
  }
})

// Verify Token
router.post('/verify', (req: Request, res: Response) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ error: 'Token erforderlich' })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    return res.json({ valid: true, user: decoded })
  } catch (error) {
    return res.status(401).json({ valid: false, error: 'Token ungültig' })
  }
})

export default router
