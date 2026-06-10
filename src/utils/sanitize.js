// Input Sanitization Utilities
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

export const sanitizeTime = (time) => {
  const timeRegex = /^\d{2}:\d{2}$/
  if (!timeRegex.test(time)) {
    return null
  }
  return time
}

export const sanitizeBio = (bio) => {
  const maxLength = 500
  if (!bio || bio.length > maxLength) {
    return bio.substring(0, maxLength)
  }
  return sanitize(bio)
}
"