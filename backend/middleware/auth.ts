import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'

export interface AuthRequest extends Request {
  user?: { id: number; email: string; name: string }
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token erforderlich' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; name: string }
    req.user = decoded
    next()
  } catch {
    return res.status(403).json({ error: 'Token ungültig' })
  }
}
