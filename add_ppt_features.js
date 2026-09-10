const fs = require('fs');

let html = fs.readFileSync('app/src/main/assets/index.html', 'utf8');

// 1. Add CSS styling for Drawing Canvas, Laser Pointer, Interactive Quiz Polls, Timer, and Flashcards
const pptStyles = `
    /* === POWERPOINT & SMARTBOARD PRESENTATION ENHANCEMENTS === */
    #slide-draw-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 25;
      pointer-events: none;
      border-radius: 1rem;
    }
    #slide-draw-canvas.drawing-active {
      pointer-events: auto;
      cursor: crosshair;
    }
    #slide-draw-canvas.laser-active {
      pointer-events: auto;
      cursor: none;
    }
    .laser-dot {
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #ff0055;
      box-shadow: 0 0 12px 4px #ff0055, 0 0 24px 8px rgba(255, 0, 85, 0.6);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 28;
      transition: transform 0.04s ease-out;
      display: none;
    }
    .laser-dot::after {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: 50%;
      background: #ffffff;
      opacity: 0.9;
    }
    .slide-timer-ring {
      stroke-dasharray: 100;
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.5s linear;
    }
    .quiz-poll-bar {
      transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card-3d-wrapper {
      perspective: 1000px;
    }
    .card-3d-inner {
      transform-style: preserve-3d;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .card-3d-inner.is-flipped {
      transform: rotateY(180deg);
    }
    .card-face {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .card-face-back {
      transform: rotateY(180deg);
    }
    .ppt-tool-btn.active {
      background: #6366f1 !important;
      color: #ffffff !important;
      border-color: #818cf8 !important;
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.5);
    }
`;

// Insert the PPT styles right before </style>
if (!html.includes('/* === POWERPOINT & SMARTBOARD PRESENTATION ENHANCEMENTS === */')) {
  html = html.replace('</style>', pptStyles + '\n  </style>');
}

fs.writeFileSync('app/src/main/assets/index.html', html);
console.log('Appended PowerPoint styles.');
