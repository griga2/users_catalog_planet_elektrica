// Work Time API Endpoint
import express from 'express'
import { authenticate } from '../middleware/auth.js'
import { sanitize } from '../../src/utils/sanitize.js'

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  try {
    const { workerId } = req.query
    
    if (!workerId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Missing workerId parameter'
      })
    }
    
    // Sanitize workerId
    const sanitizedWorkerId = sanitize(workerId)
    
    // Fetch work time data
    const data = await db.time.find({
      where: { workerId: sanitizedWorkerId }
    })
    
    res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    console.error('Error fetching work time:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch work time'
    })
  }
})

export default router
"