/**
 * Утилита для условного логирования.
 * Выводит сообщения только в режиме разработки (dev).
 * В production сборке сообщения не выводятся.
 */

export function debug(...args) {
  if (import.meta.env.DEV) {
    console.log(...args)
  }
}

export function debugWarn(...args) {
  if (import.meta.env.DEV) {
    console.warn(...args)
  }
}

export function debugError(...args) {
  if (import.meta.env.DEV) {
    console.error(...args)
  }
}
