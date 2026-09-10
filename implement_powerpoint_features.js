const fs = require('fs');

let html = fs.readFileSync('app/src/main/assets/index.html', 'utf8');

// 1. Build the updated Presentation Container HTML
const presStartIdx = html.indexOf('id="presentation-container"');
const presEndIdx = html.indexOf('<!-- UNIFIED THEME & PALETTE MODAL', presStartIdx);

if (presStartIdx === -1) {
  console.error('presentation-container not found!');
  process.exit(1);
}

// Find where the next modal starts
let endOfPresContainer = html.indexOf('id="theme-palette-modal"', presStartIdx);
if (endOfPresContainer === -1) endOfPresContainer = html.indexOf('id="custom-slide-modal"', presStartIdx);
// Find the closing </div> of presentation-container
let presContainerCloseIdx = html.lastIndexOf('</div>', endOfPresContainer);

console.log('Presentation Container found from', presStartIdx, 'to', presContainerCloseIdx);

