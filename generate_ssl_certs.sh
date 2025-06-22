#!/bin/bash
# SSL-Zertifikate für die Produktion generieren
# Dieses Skript sollte auf dem Produktionsserver ausgeführt werden

# Verzeichnis für SSL-Zertifikate erstellen
mkdir -p /etc/nginx/ssl

# Interaktives Skript zum Generieren von selbstsignierten Zertifikaten
# Für Produktionsumgebungen sollten Sie Let's Encrypt oder einen anderen vertrauenswürdigen CA-Dienst verwenden
echo "Generiere selbstsignierte SSL-Zertifikate für die Produktion..."
echo "Hinweis: Für eine Produktionsumgebung empfehlen wir Let's Encrypt-Zertifikate zu verwenden."

# Name des Servers abfragen
read -p "Server-Name (z.B. example.com oder IP-Adresse): " SERVER_NAME

# Selbstsigniertes Zertifikat generieren
openssl req -x509 -newkey rsa:4096 -nodes -keyout /etc/nginx/ssl/radioapp.key -out /etc/nginx/ssl/radioapp.crt -days 365 \
  -subj "/CN=$SERVER_NAME" \
  -addext "subjectAltName = DNS:$SERVER_NAME,IP:127.0.0.1"

# Berechtigungen setzen
chmod 400 /etc/nginx/ssl/radioapp.key
chmod 444 /etc/nginx/ssl/radioapp.crt

echo "SSL-Zertifikate wurden erfolgreich generiert."
echo "Zertifikatspfad: /etc/nginx/ssl/radioapp.crt"
echo "Schlüsselpfad: /etc/nginx/ssl/radioapp.key"
echo "Die Zertifikate sind 365 Tage gültig."

# Für eine Produktionsumgebung empfehlen wir:
echo ""
echo "Für eine Produktionsumgebung empfehlen wir Let's Encrypt mit Certbot:"
echo "sudo apt-get install certbot python3-certbot-nginx"
echo "sudo certbot --nginx -d $SERVER_NAME"
