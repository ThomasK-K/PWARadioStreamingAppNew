# CounterApp PWA - Installation Guide

Diese Anleitung beschreibt die Installation und Einrichtung der CounterApp Progressive Web App sowohl für Entwickler als auch für Benutzer.

## Für Entwickler

### Voraussetzungen

- Node.js (v16 oder höher)
- npm (v8 oder höher)
- Git

### Installation und Entwicklung

```bash
# Repository klonen
git clone https://github.com/username/counterapp.git
cd counterapp

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### Projektstruktur erstellen (bei neuem Projekt)

Falls Sie das Projekt von Grund auf neu erstellen möchten:

```bash
# Vite-Projekt mit React und TypeScript initialisieren
npx create-vite@latest my-counterapp --template react-ts
cd my-counterapp

# PWA-Support hinzufügen
npm install vite-plugin-pwa -D

# Recoil für State Management
npm install recoil

# Projekt starten
npm install
npm run dev
```

### Build für Produktion

```bash
# Build erstellen
npm run build

# Build-Version vorschau
npm run preview
```

## Für Benutzer

### Installation als PWA

1. Öffnen Sie die Website in einem unterstützten Browser (Chrome, Edge, Firefox, Safari)
2. Besuchen Sie die URL: [https://your-app-domain.com](https://your-app-domain.com)
3. So installieren Sie die App:

#### Auf Desktop:
- **Chrome/Edge**: Klicken Sie auf das Installations-Symbol in der Adressleiste oder gehen Sie zu Menü > Apps > App installieren
- **Firefox**: Klicken Sie auf das Haus-Symbol in der Adressleiste

#### Auf Mobilgeräten:
- **Android (Chrome)**: Tippen Sie auf "Zum Startbildschirm hinzufügen" im Menü
- **iOS (Safari)**: Tippen Sie auf "Teilen" und dann "Zum Startbildschirm"

### System-Anforderungen

- **Desktop**: Moderner Browser (Chrome, Firefox, Edge, Safari)
- **Mobile**: iOS 12.2+ oder Android 5+
- **Speicherplatz**: ca. 5 MB
- **MPD-Modus**: Zugriff auf einen MPD-Server im Netzwerk
