import { useState, useEffect } from 'react'
import './App.css'
import TabContainer from './components/TabContainer'
import type { TabData } from './components/TabContainer'
import Counter from './components/Counter'
import Countdown from './components/Countdown'
import Settings from './components/Settings'
import type { RadioStation } from '../src/types/types';
import { fetchMPDPlaylists } from '../src/data/fetchMPDPlaylists';
import { useRecoilState } from 'recoil';
import { selectedMpdUrlState } from "../src/state/mpdUrls";
import { useLocalStorageCleanup } from '../src/utils/localStorageCleanup';

function App() {
  // Bereinige localStorage beim App-Start
  useLocalStorageCleanup();

  // Prüfe die Online/Offline-Verbindung
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
  const [newVersionAvailable, setNewVersionAvailable] = useState<boolean>(false)
  
  const [selectedUrl] = useRecoilState(selectedMpdUrlState);
  const [stations, setStations] = useState<RadioStation[]>([]);
  
  useEffect(() => {
    console.log('App selectedUrl:', selectedUrl);
    // Lade Playlists vom MPD-Server, wenn sich die URL ändert
    const loadStations = async () => {
      if (!selectedUrl) {
        console.warn('Keine URL ausgewählt');
        return;
      }
      
      try {
        const apiUrl = `${selectedUrl}/listplaylists`;
        console.log('Versuche Playlists zu laden von:', apiUrl);
        const stations = await fetchMPDPlaylists(apiUrl);
        setStations(stations);
      } catch (e) {
        console.error('Fehler beim Laden der Stationen:', e);
        setStations([]);
      }
    };
    
    // Umgeben Sie den Aufruf mit einem try-catch-Block
    try {
      loadStations();
    } catch (error) {
      console.error('Unerwarteter Fehler:', error);
    }
  }, [selectedUrl]);

  // Aktiver Tab
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    return localStorage.getItem('activeTab') || 'counter'
  })

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Überprüfe, ob eine PWA-Aktualisierung verfügbar ist
    window.addEventListener('sw-update-available', () => {
      setNewVersionAvailable(true)
    })

    // System-Farbschema änderungen überwachen
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === 'system') {
        document.documentElement.dataset.theme = e.matches ? 'dark' : 'light'
      }
    }
    
    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('sw-update-available', () => {
        setNewVersionAvailable(false)
      })
      
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])
  
  // Speichere den aktiven Tab im LocalStorage
  useEffect(() => {
    localStorage.setItem('activeTab', activeTabId)
  }, [activeTabId])

  const updateApp = () => {
    // Eine benutzerdefinierte Funktion, die den Service Worker aktualisiert
    window.location.reload()
  }
  
  // Tab-Definition
  const tabs: TabData[] = [
    {
      id: 'counter',
      label: 'Zähler',
      content: <Counter stations={stations} />,
    },
    {
      id: 'countdown',
      label: 'Countdown',
      content: <Countdown />
    },
    {
      id: 'settings',
      label: 'Einstellungen',
      content: <Settings />
    }
  ]

  return (
    <div className="app-container">
      <header>
        <h1>Radio Streaming App</h1>
        <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </header>

      {newVersionAvailable && (
        <div className="update-banner">
          <p>Eine neue Version ist verfügbar!</p>
          <button onClick={updateApp} className="update-btn">Aktualisieren</button>
        </div>
      )}
      
      <TabContainer 
        tabs={tabs} 
        defaultTab={activeTabId}
        onTabChange={(tabId) => setActiveTabId(tabId)}
      />
    </div>
  )
}

export default App
