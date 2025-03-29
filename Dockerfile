FROM golang:1.20-alpine AS builder

WORKDIR /app

# Go Modul initialisieren
RUN go mod init p5js-visualization

# Go-Anwendung kopieren und kompilieren
COPY server.go .
RUN go build -o server

FROM alpine:latest

WORKDIR /app

# Binärdatei aus dem Builder-Stage kopieren
COPY --from=builder /app/server .

# HTML und JS-Dateien kopieren
COPY static/ /app/static/

# Port 8080 freigeben
EXPOSE 8080

# Server starten
CMD ["/app/server"]