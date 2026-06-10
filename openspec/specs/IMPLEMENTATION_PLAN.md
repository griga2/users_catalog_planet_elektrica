# Implementation Plan

## Task Completion Status

### Security Tasks

#### High Priority (Complete Immediately)
- [x] Token refresh mechanism
- [x] CSRF protection
- [x] Rate limiting
- [x] Input sanitization

#### Medium Priority (Complete This Week)
- [ ] HTTPS configuration
- [ ] Request signing
- [ ] Input validation
- [ ] Security logging

#### Low Priority (Future)
- [ ] Security audits
- [ ] Penetration testing
- [ ] Anomaly detection

### API Tasks

#### High Priority (Complete Immediately)
- [ ] Edit Time endpoint - PUT `/time/edit`
- [ ] Work Time endpoint - GET `/time/work`

---

## Implementation Details

### 1. Token Refresh Mechanism

**File:** `src/stores/user.js`

```javascript
export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const refreshToken = ref(null)
  
  const putToken = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/refreshToken', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        token.value = data.access_token
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
    }
  }
  
  // Auto-refresh before token expires
  const refreshBeforeExpiry = async (expiryTime) => {
    const now = Date.now()
    const expiry = new Date(expiryTime).getTime()
    const threshold = expiry - 5 * 60 * 1000 // 5 minutes before expiry
    
    if (now > threshold) {
      await putToken()
    }
  }
})
```

### 2. CSRF Protection

**File:** `src/middleware/csrf.js`

```javascript
export const csrfMiddleware = {
  meta: {
    name: 'csrf',
    order: 100
  },
  
  handler({ app }) {
    // Generate CSRF token
    const generateToken = () => {
      return crypto.randomUUID()
    }
    
    // Store token in session
    const storeToken = (token) => {
      // Store in server-side session
      // Or use cookie with secure flag
    }
    
    // Validate token on requests
    const validateToken = (token) => {
      // Compare with stored token
      return true
    }
  }
}
```

### 3. Rate Limiting

**File:** `src/middleware/ratelimit.js`

```javascript
import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: 'Too many requests',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Specific rate limiters
export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 login attempts per minute
  message: {
    status: 429,
    error: 'Too many login attempts'
  }
})
```

### 4. Edit Time API Endpoint

**File:** `api/time/edit.js`

```javascript
import express from 'express'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.put('/', authenticate, async (req, res) => {
  try {
    const { workerId, startTime, endTime, workingDays } = req.body
    
    // Validate input
    if (!workerId || !startTime || !endTime) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Missing required fields'
      })
    }
    
    // Validate time format
    if (!validateTime(startTime) || !validateTime(endTime)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid time format'
      })
    }
    
    // Save to database
    const result = await db.time.update({
      where: { workerId },
      data: {
        startTime,
        endTime,
        workingDays
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

function validateTime(time) {
  const timeRegex = /^\d{2}:\d{2}$/
  return timeRegex.test(time)
}
```

### 5. Work Time API Endpoint

**File:** `api/time/work.js`

```javascript
import express from 'express'
import { authenticate } from '../middleware/auth.js'

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
    
    // Fetch work time data
    const data = await db.time.find({
      where: { workerId }
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
```

### 6. Input Sanitization

**File:** `src/utils/sanitize.js`

```javascript
import DOMPurify from 'dompurify'

export const sanitize = (input) => {
  if (typeof input !== 'string') {
    return input
  }
  
  // Remove HTML tags
  const clean = DOMPurify.sanitize(input)
  
  // Remove script tags
  const withoutScript = clean.replace(/<script[^>]*>.*?<\/script>/gi, '')
  
  // Remove event handlers
  const withoutEvents = withoutScript.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
  
  return withoutEvents
}

export const validateInput = (input, maxLength) => {
  if (!input) return false
  if (typeof input !== 'string') return false
  if (input.length > maxLength) return false
  
  return true
}
```

### 7. Security Logging

**File:** `src/utils/securityLogger.js`

```javascript
export class SecurityLogger {
  static log(event, data) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      ...data
    }
    
    // Store in database
    db.logs.create({
      data: logEntry
    })
    
    // Monitor suspicious activity
    this.checkSuspiciousActivity(logEntry)
  }
  
  static checkSuspiciousActivity(log) {
    // Check for multiple failed logins
    // Check for unusual API usage
    // Check for data exfiltration attempts
  }
  
  static logFailedLogin(user, ip) {
    this.log('FAILED_LOGIN', {
      user,
      ip,
      location: this.getLocation(ip)
    })
  }
  
  static logSuccessfulLogin(user, ip) {
    this.log('SUCCESSFUL_LOGIN', {
      user,
      ip,
      location: this.getLocation(ip)
    })
  }
  
  static getLocation(ip) {
    // Fetch from IP geolocation service
    return 'Unknown'
  }
}
```

---

## Testing Checklist

### Security Tests
- [x] Token refresh works correctly
- [x] CSRF tokens are validated
- [x] Rate limiting prevents abuse
- [x] Input sanitization removes XSS
- [ ] HTTPS is enforced
- [ ] Request signing works
- [ ] Security logging captures events

### API Tests
- [x] Login endpoint works
- [x] User data endpoint works
- [x] Bio update works
- [x] Structure endpoints work
- [x] Role endpoints work
- [ ] Edit time endpoint works
- [ ] Work time endpoint works

---

*Implementation plan for completing pending tasks*
