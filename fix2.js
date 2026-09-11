const fs = require('fs');
let html = fs.readFileSync('app/src/main/assets/index.html', 'utf8');

const regex = /\/\/ HIGH-FIDELITY ELA TEXTBOOK SHOWCASE GENERATOR[\s\S]*?function generateTextbookShowcase[\s\S]*?function openGlassTutorModal/g;

const match = html.match(regex);
if (match) {
  console.log("Found generateTextbookShowcase");
  html = html.replace(regex, 'function openGlassTutorModal');
  fs.writeFileSync('app/src/main/assets/index.html', html);
  console.log("Removed generateTextbookShowcase");
} else {
  console.log("Not found generateTextbookShowcase");
}
