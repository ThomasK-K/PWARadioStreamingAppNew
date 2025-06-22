FROM node:20-alpine AS build

# Arbeitsverzeichnis im Container erstellen
WORKDIR /app

# Optimierung für Pakete durch Kopieren von package.json und package-lock.json
COPY ./package*.json ./

# Abhängigkeiten installieren
RUN npm ci

# Gesamtes Projekt in den Container kopieren
COPY . .

# Produktions-Build erstellen
RUN npm run build

# Nginx-basiertes Produktions-Image für die Bereitstellung
FROM nginx:stable-alpine AS production

# Kopieren der Nginx-Konfiguration
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Kopieren der gebauten Anwendung
COPY --from=build /app/dist /usr/share/nginx/html

# Setzen von Berechtigungen für Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html

# Exponieren des Ports
EXPOSE 80

# Nginx im Vordergrund starten
CMD ["nginx", "-g", "daemon off;"]
