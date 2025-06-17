#!/bin/bash

# Farben für die Ausgabe
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}CounterApp Docker Helper${NC}"
echo "========================="
echo ""

case "$1" in
  dev)
    echo -e "${GREEN}Starte CounterApp in der Entwicklungsumgebung...${NC}"
    echo -e "Die App wird unter ${YELLOW}http://localhost:3001${NC} verfügbar sein."
    # Stoppe zuerst alle laufenden Container
    docker-compose down
    # Dann starte den Entwicklungscontainer
    docker-compose up app-dev
    ;;
  
  prod)
    echo -e "${GREEN}Starte CounterApp in der Produktionsumgebung...${NC}"
    echo -e "Die App wird unter ${YELLOW}http://localhost:8081${NC} verfügbar sein."
    # Stoppe zuerst alle laufenden Container
    docker-compose down
    # Dann starte den Produktionscontainer
    docker-compose up --build app-prod
    ;;
  
  build)
    echo -e "${GREEN}Baue Docker-Images...${NC}"
    docker-compose build
    echo -e "${GREEN}Build abgeschlossen.${NC}"
    ;;
  
  stop)
    echo -e "${YELLOW}Stoppe alle laufenden Container...${NC}"
    docker-compose down
    echo -e "${GREEN}Alle Container wurden gestoppt.${NC}"
    ;;
  
  clean)
    echo -e "${YELLOW}Räume Docker-Ressourcen auf...${NC}"
    # Stoppe alle Container und entferne sie
    docker-compose down
    # Entferne alle verwaisten Volumes
    echo -e "${YELLOW}Entferne verwaiste Volumes...${NC}"
    docker volume prune -f
    # Entferne nicht verwendete Images
    echo -e "${YELLOW}Entferne nicht verwendete Images...${NC}"
    docker image prune -f
    echo -e "${GREEN}Aufräumarbeiten abgeschlossen.${NC}"
    ;;
  
  *)
    echo -e "${BLUE}Verwendung:${NC} ./docker.sh [OPTION]"
    echo ""
    echo "Optionen:"
    echo -e "  ${YELLOW}dev${NC}     Starte die App in der Entwicklungsumgebung (mit Hot-Reload)"
    echo -e "  ${YELLOW}prod${NC}    Starte die App in der Produktionsumgebung"
    echo -e "  ${YELLOW}build${NC}   Baue Docker-Images (ohne zu starten)"
    echo -e "  ${YELLOW}stop${NC}    Stoppe alle laufenden Container"
    echo -e "  ${YELLOW}clean${NC}   Räume Container, Images und Volumes auf"
    ;;
esac

exit 0
