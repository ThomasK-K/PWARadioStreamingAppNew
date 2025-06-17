
import { registerSW } from 'virtual:pwa-register'
import { saveAppState } from '../state/persistantState'

export function setupUpdateFlow() {
  // Register the Service Worker with a periodic check for updates
  const updateSW = registerSW({
    onNeedRefresh() {
      // Show update notification to user
      showUpdateNotification(updateSW)
    },
    onOfflineReady() {
      console.log('App ready to work offline')
    }
  })
  
  // Optional: Implement your own periodic update check if needed
   setInterval(() => updateSW(true), 10 * 1000);

  return updateSW
}
function showUpdateNotification(updateSW: () => Promise<void>) {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = 'update-notification'
  notification.innerHTML = `
    <div class="update-content">
      <p>Eine neue Version der App ist verfügbar!</p>
      <button id="update-button">Jetzt aktualisieren</button>
      <button id="dismiss-button">Später</button>
    </div>
  `
  
  // Add to DOM
  document.body.appendChild(notification)
  
  // Add event listeners
document.getElementById('update-button')?.addEventListener('click', () => {
  // Save current state before updating
  saveAppState()
  
  // Apply the update
  updateSW()
  notification.remove()
})
  document.getElementById('dismiss-button')?.addEventListener('click', () => {
    notification.remove()
  })
}