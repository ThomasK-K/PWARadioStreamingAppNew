# Radio Streaming App PWA - Installation Guide

Diese Anleitung beschreibt die Installation und Einrichtung der PWARadioStreamingApp Progressive Web App sowohl für Entwickler als auch für Benutzer.

## Für Entwickler

### Voraussetzungen

- Node.js (v16 oder höher)
- npm (v8 oder höher)
- Git

### Installation und Entwicklung

```bash
# Repository klonen
git clone https://github.com/ThomasK-K/PWARadioStreamingAppNew.git
cd PWARadioStreamingAppNew

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### Projektstruktur erstellen (bei neuem Projekt)

Falls Sie das Projekt von Grund auf neu erstellen möchten:

```bash
# Vite-Projekt mit React und TypeScript initialisieren
npx create-vite@latest PWARadioStreamingApp --template react-ts
cd PWARadioStreamingApp

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


### https
```
mkdir -p certs

openssl req -x509 -newkey rsa:2048 -keyout certs/radioapp-key.pem -out certs/radioapp-cert.pem -days 365 -nodes -subj "/CN=localhost" -addext "subjectAltName = DNS:localhost,IP:192.168.10.113"


chmod +x generate_ssl_certs.sh

chmod +x start-https.sh
```
### update manifest
```
#!/bin/bash
# update manifest
# Dieses Skript aktualisiert die URLs in manifest.webmanifest zu HTTPS
# nach einem Build

echo "Aktualisiere Manifest-URLs zu HTTPS..."

# Das Verzeichnis, in dem sich die manifest.webmanifest nach dem Build befindet
MANIFEST_PATH="./dist/manifest.webmanifest"

if [ -f "$MANIFEST_PATH" ]; then
    # Ersetzen Sie HTTP durch HTTPS oder fügen Sie HTTPS hinzu, wenn keine Protokoll-Angabe vorhanden ist
    sed -i 's|http://|https://|g' "$MANIFEST_PATH"
    # Für Pfade, die mit / beginnen, fügen Sie https://domainname hinzu
    # (ersetzen Sie 'your-domain.com' durch Ihre eigene Domain)
    sed -i 's|"start_url": "/|"start_url": "https://localhost/|g' "$MANIFEST_PATH"
    sed -i 's|"scope": "/|"scope": "https://localhost/|g' "$MANIFEST_PATH"
    
    echo "Manifest wurde erfolgreich aktualisiert."
    
    # Zeigen Sie das aktualisierte Manifest an
    echo "Aktualisiertes Manifest:"
    cat "$MANIFEST_PATH"
else
    echo "Fehler: manifest.webmanifest nicht gefunden in $MANIFEST_PATH"
    exit 1
fi

```

### Docker Update
```
version: '3.8'

services:
  # Entwicklungsumgebung
  app-dev:
    image: node:20-alpine
    container_name: counterapp-dev
    working_dir: /app
    volumes:
      - .:/app
      # Anstelle eines benannten Volumes verwenden wir einen anonymen Volume-Mount
      - /app/node_modules
      # Zertifikate für HTTPS in der Entwicklung
      - ./certs:/app/certs
    ports:
      - "3001:3000"
      - "3002:443"  # HTTPS-Port
    environment:
      - NODE_ENV=development
      - HTTPS=true
    command: sh -c "npm install && npm run dev -- --host 0.0.0.0 --port 3000"
    networks:
      - counterapp-network

  # Produktionsumgebung mit Build-Stufe
  app-prod:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - NODE_ENV=production
    container_name: counterapp-prod
    restart: unless-stopped
    ports:
      - "80:80"    # HTTP (für Weiterleitung zu HTTPS)
      - "443:443"  # HTTPS
    volumes:
      - ./dist:/usr/share/nginx/html
      - ./nginx-https.conf:/etc/nginx/conf.d/default.conf
      - ./ssl:/etc/nginx/ssl  # SSL-Zertifikate
    environment:
      - NODE_ENV=production
    networks:
      - counterapp-network

# Netzwerk-Definition
networks:
  counterapp-network:
    driver: bridge
```