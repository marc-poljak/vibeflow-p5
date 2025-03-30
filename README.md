# ✨ VibeFlow-P5 ✨

A simple web application that provides an interactive p5.js visualization with a lightweight Go web server, packaged in Docker.

## 🌊 Vibe Coding Manifesto 🌊

This project embodies "Vibe Coding" - an approach introduced by Andrej Karpathy in February 2025, where developers interact with AI models using natural language to generate code. The result: code that doesn't just execute functions, but resonates with digital consciousness - alive with intention rather than merely instructed.

Here, flowing particles meet minimalist Go elegance, wrapped in container Zen - without a single line being manually written.

### About Vibe Coding

- **Natural Language Interaction**: "Create a p5.js visualization with a Go server in Docker" instead of hours of typing
- **Creativity First**: Focus on visual aesthetics and user experience rather than syntactic details
- **Iterative Flow**: From idea to functional application in minutes instead of days
- **Democratized Development**: Transforming ideas into reality without the traditional gatekeeping of specialized technical knowledge

## Project Structure

```
.
├── Dockerfile
├── server.go
└── static/
    ├── index.html
    └── sketch.js
```

## Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/marc-poljak/vibeflow-p5.git
cd vibeflow-p5
```

### 2. Build Docker Image

```bash
docker build -t p5js-visualization .
```

### 3. Run Container

```bash
docker run -p 8080:8080 p5js-visualization
```

### 4. Access Visualization

Open your browser and navigate to:
```
http://localhost:8080
```

## Customization

You can customize the visualization by editing the `sketch.js` file. After changes, you need to rebuild the Docker image.

## Meta: A Self-Referential Example

This repository is the product of its own philosophy. The entire codebase was created through "Vibe Coding" with Claude (Anthropic). No manual debugging, no syntax errors - just flowing collaboration between human and AI.

This illustrates both the strengths and challenges of Vibe Coding:
- **Speed**: From idea to functioning Docker container in a single conversation
- **Creative Freedom**: More time for vision, less for implementation details
- **Accessibility**: Creating sophisticated web applications with Docker containerization becomes possible for visionaries regardless of their technical background

## Credits

Created with ✨ vibes ✨ by Claude (Anthropic) in March 2025 as a practical example of the "Vibe Coding" paradigm. Feel the flow as particles dance and the Go server serves with Zen-like simplicity.

> "Vibe Coding is not the future of programming; it's the present of creative expression through code." — a hypothetical quote from 2025

> "Programming is not about typing, it's about thinking." - but sometimes it's also about pausing to enjoy the aesthetic dimension of the digital world.