#!/bin/bash

# Start-Skript für die PubQuiz Counter PWA mit HTTPS-Unterstützung

# Verzeichnis für SSL-Zertifikate erstellen
mkdir -p ssl

# Prüfen, ob Zertifikate existieren, andernfalls generieren
if [ ! -f "./ssl/radioapp.crt" ] || [ ! -f "./ssl/radioapp.key" ]; then
    echo "SSL-Zertifikate nicht gefunden. Generiere selbstsignierte Zertifikate..."
    
    # Server-Name abfragen
    read -p "Server-Name (z.B. example.com oder IP-Adresse): " SERVER_NAME
    
    # Selbstsigniertes Zertifikat generieren
    openssl req -x509 -newkey rsa:4096 -nodes -keyout ./ssl/radioapp.key -out ./ssl/radioapp.crt -days 365 \
    -subj "/CN=$SERVER_NAME" \
    -addext "subjectAltName = DNS:$SERVER_NAME,IP:127.0.0.1"
    
    # Berechtigungen setzen
    chmod 400 ./ssl/radioapp.key
    chmod 444 ./ssl/radioapp.crt
    
    echo "SSL-Zertifikate wurden erfolgreich generiert."
else
    echo "Bestehende SSL-Zertifikate gefunden."
fi

# Docker-Compose starten
echo "Starte die Anwendung mit HTTPS-Unterstützung..."
docker-compose -f docker-compose-https.yml up --build -d

echo "Die Anwendung ist gestartet und unter https://192.168.10.113 erreichbar."
echo "HTTP-Port: 8080, HTTPS-Port: 443"
echo "Hinweis: Bei selbstsignierten Zertifikaten wird der Browser eine Sicherheitswarnung anzeigen."
echo "Um die Anwendung zu stoppen, führen Sie 'docker-compose -f docker-compose-https.yml down' aus."
