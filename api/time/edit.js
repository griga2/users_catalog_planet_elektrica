// Edit Time API Endpoint
import express from 'express'
import { authenticate } from '../middleware/auth.js'
import { sanitize, sanitizeTime } from '../../src/utils/sanitize.js'

const router = express.Router()

router.put('/', authenticate, async (req, res) => {
  try {
    const { workerId, startTime, endTime, workingDays } = req.body
    
    // Validate input
    if (!workerId || !startTime || !endTime) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Missing required fields: workerId, startTime, endTime'
      })
    }
    
    // Sanitize and validate time
    const sanitizedStartTime = sanitizeTime(sanitize(startTime))
    const sanitizedEndTime = sanitizeTime(sanitize(endTime))
    
    if (!sanitizedStartTime || !sanitizedEndTime) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid time format. Use HH:MM format'
      })
    }
    
    // Validate working days format
    if (workingDays && typeof workingDays === 'string') {
      const days = workingDays.split(',')
      for (const day of days) {
        if (!['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].includes(day.toLowerCase())) {
          return res.status(400).json({
            error: 'Bad Request',
            message: 'Invalid working day format'
          })
        }
      }
    }
    
    // Save to database
    const result = await db.time.update({
      where: { workerId },
      data: {
        startTime: sanitizedStartTime,
        endTime: sanitizedEndTime,
        workingDays: workingDays || []
      }
    })
    
    res.status(200).json({
      success: true,
      message: 'Time updated successfully',
      data: result
    })
  } catch (error) {
    console.error('Error updating time:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update time'
    })
  }
})

export default router
"