# P5.js Visualisierung mit Go und Docker

Eine einfache Webanwendung, die eine interaktive p5.js-Visualisierung mit einem leichtgewichtigen Go-Webserver bereitstellt und in Docker verpackt ist.

## Projektstruktur

```
.
├── Dockerfile
├── server.go
└── static/
    ├── index.html
    └── sketch.js
```

## Anleitung

### 1. Projektstruktur erstellen

Erstelle die folgende Verzeichnisstruktur:

```bash
mkdir -p p5js-docker/static
cd p5js-docker
```

### 2. Dateien erstellen

Kopiere die vier Dateien in dein Projekt:
- `server.go` (Go-Server)
- `Dockerfile` (Docker-Konfiguration)
- `static/index.html` (HTML-Grundlage)
- `static/sketch.js` (p5.js-Skript)

### 3. Docker-Image bauen

```bash
docker build -t p5js-visualization .
```

### 4. Container starten

```bash
docker run -p 8080:8080 p5js-visualization
```

### 5. Visualisierung aufrufen

Öffne deinen Browser und navigiere zu:
```
http://localhost:8080
```

## Anpassungen

Du kannst die Visualisierung anpassen, indem du die `sketch.js` Datei bearbeitest. Nach Änderungen musst du das Docker-Image neu bauen.