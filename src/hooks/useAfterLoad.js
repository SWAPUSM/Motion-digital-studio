import { useEffect, useState } from 'react'

let done = false
const waiters = new Set()

function release() {
  done = true
  waiters.forEach((fn) => fn(true))
  waiters.clear()
}

if (typeof window !== 'undefined') {
  const idle = () => (window.requestIdleCallback ? requestIdleCallback(release, { timeout: 1200 }) : setTimeout(release, 300))
  if (document.readyState === 'complete') idle()
  else window.addEventListener('load', idle, { once: true })
}

/** true once the page has finished loading and the main thread is idle. */
export function useAfterLoad() {
  const [ready, setReady] = useState(done)
  useEffect(() => {
    if (done) return setReady(true)
    waiters.add(setReady)
    return () => waiters.delete(setReady)
  }, [])
  return ready
}
