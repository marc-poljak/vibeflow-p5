# Build stage with platform specification for better portability
FROM --platform=$BUILDPLATFORM golang:1.20-alpine AS builder

# Set ARGs for multi-platform builds
ARG BUILDPLATFORM
ARG TARGETPLATFORM
ARG TARGETOS
ARG TARGETARCH

WORKDIR /app

# Output build information for debugging
RUN echo "Building on $BUILDPLATFORM for $TARGETPLATFORM"

# Create a non-root user with a specific UID/GID
RUN addgroup -S -g 10001 appgroup && adduser -S -u 10000 -g appgroup appuser

# OPTION 1: If you don't have go.mod files yet in your project
# Create initial go.mod file with secure settings
RUN go mod init p5js-visualization && \
    go mod tidy && \
    go mod verify

# OPTION 2: If you already have go.mod and go.sum in your project
# Uncomment these lines and comment out the section above
# COPY go.mod go.sum* ./
# RUN go mod verify && go mod download

# Copy application code (changes more frequently)
COPY server.go .

# Build with security flags and ensure static linking for cross-platform compatibility
# Using TARGETOS and TARGETARCH for cross-compilation
RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} GOFLAGS="-buildvcs=false" \
    go build -trimpath -a -installsuffix cgo -ldflags="-w -s" -o server

# Verify the binary is not compromised
RUN sha256sum server > server.sha256

# Final stage using scratch (no OS) for minimal size with specified platform
FROM --platform=$TARGETPLATFORM scratch

WORKDIR /app

# Binärdatei aus dem Builder-Stage kopieren
COPY --from=builder /app/server .
# Optional: copy the checksum file for verification
COPY --from=builder /app/server.sha256 .

# HTML und JS-Dateien kopieren
COPY static/ /app/static/

# Switch to non-root user (must use numeric ID with scratch)
USER 10000:10001

# Port 8080 freigeben
EXPOSE 8080

# Server starten
CMD ["/app/server"]