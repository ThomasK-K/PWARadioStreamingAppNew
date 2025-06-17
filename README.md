# CounterApp - Progressive Web App

Eine Progressive Web App (PWA) mit React und TypeScript, die einen Zähler und einen Countdown-Timer implementiert sowie Audio-Streaming-Funktionalitäten bietet.

![CounterApp Logo](public/pwa-192x192.png)

## Features

- **Counter-Komponente** mit LocalStorage-Speicherung
- **Countdown-Timer** mit konfigurierbaren Alarmen
- **Radio-Streaming** mit zwei Modi:
  - MPD (Music Player Daemon) Unterstützung
  - Direktes Web-Radio-Streaming
- **Offline-Funktionalität** für nahtloses Erlebnis
- **Installierbar als PWA** auf Desktop- und Mobilgeräten
- **Responsives Design** für alle Bildschirmgrößen
- **Dark Mode** und anpassbare Farbschemata
- **Benachrichtigungen** (mit Benutzererlaubnis)

## Technologien

- **React 18** mit TypeScript für moderne Entwicklung
- **Vite** als schnelles und effizientes Build-Tool
- **Recoil** für State Management
- **vite-plugin-pwa** für PWA-Unterstützung
- **CSS3** für Layout und Styling

## Installation

```bash
# Projekt klonen
git clone https://github.com/username/counterapp.git
cd counterapp

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist dann unter [http://localhost:8080](http://localhost:8080) verfügbar.

## Verzeichnisstruktur

```
/public             # Statische Assets und PWA-Icons
/src                # Quellcode
  /assets           # Bilder und andere Assets
  /components       # React-Komponenten
  /data             # Daten-Handler (z.B. MPD-Playlist-Fetcher)
  /state            # Recoil State Management
  /styles           # CSS-Dateien
  /types            # TypeScript-Typdefinitionen
  /utils            # Hilfs-Utilities
  App.tsx           # Hauptkomponente
  main.tsx          # Einstiegspunkt
```

## Entwicklung

### Verfügbare Scripts

- `npm run dev` - Startet den Entwicklungsserver
- `npm run build` - Erstellt die Produktionsversion
- `npm run preview` - Vorschau der Produktionsversion
- `npm run lint` - Führt ESLint für Codequalitätsprüfung aus

### PWA-Funktionalität

Die Anwendung nutzt Service Worker für Offline-Unterstützung. Die PWA kann auf unterstützten Browsern auf dem Homescreen installiert werden.

## Verwendung

### Counter

Der Counter speichert seinen Zustand lokal und bleibt auch nach dem Schließen der App erhalten. Er bietet Funktionalitäten zum Erhöhen, Verringern und Zurücksetzen des Zählers.

### Countdown

Der Countdown-Timer kann für verschiedene Zeitintervalle eingestellt werden und benachrichtigt den Benutzer, wenn die Zeit abgelaufen ist (falls Benachrichtigungen aktiviert sind).

### Radio-Streaming

#### MPD-Modus

Im MPD-Modus kann die App mit einem Music Player Daemon-Server verbunden werden. URLs können in den Einstellungen hinzugefügt, bearbeitet und gelöscht werden.

#### Radio-Modus

Im Radio-Modus können Webradiosender direkt gestreamt werden.

## Einstellungen

In den Einstellungen können folgende Parameter angepasst werden:

- Player-Modus (MPD/Radio)
- MPD-Server-URLs
- Aktualisierungsintervall für Songinformationen
- Design-Modus (Hell/Dunkel/System)
- Farbschema (Blau/Grün/Lila)
- Benachrichtigungen

## Erweiterungsmöglichkeiten

Beim Hinzufügen neuer Features bitte beachten:
- Benutzerfreundliches UI-Design beibehalten
- Barrierefreiheit berücksichtigen
- Progressive Enhancement sicherstellen
- Offline-First-Ansatz verfolgen

## Lizenz

MIT

---

Gebaut mit ❤️ und React