package main

import (
	"log"
	"net/http"
)

func main() {
	// Statische Dateien im Verzeichnis "static" bereitstellen
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	// Server auf Port 8080 starten
	log.Println("Server läuft auf http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}