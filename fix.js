const fs = require('fs');
let html = fs.readFileSync('app/src/main/assets/index.html', 'utf8');

const regex = /\/\/ Reset Textbook Header to Standard Worksheet Header layout[\s\S]*?function resetStandardHeader\(\) \{[\s\S]*?<\/svg>\n\s*<\/div>\n\s*<\/div>\n\s*`;\n\s*\}/;

const replacement = `// Reset Textbook Header to Standard Worksheet Header layout
    function resetStandardHeader() {
      const headerBox = document.getElementById('worksheet-header');
      if (!headerBox) return;

      headerBox.className = "border-b-2 border-slate-800 pb-4 mb-5 flex flex-wrap justify-between items-center gap-4";
      headerBox.innerHTML = \`
            <div class="flex-1 min-w-[200px] flex items-center gap-4">
              <!-- Dynamic Educational Illustration -->
              <div id="ws-illustration-container" class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-1.5 shadow-sm flex items-center justify-center transition-all duration-300">
                <!-- SVG dynamically injected -->
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1 text-[11px] font-semibold text-indigo-700 uppercase tracking-wider no-print-corners">
                  <span id="ws-teacher-display" contenteditable="true">Mrs. Davis • English Dept.</span>
                </div>
                <h1 id="ws-title" contenteditable="true" class="text-2xl font-bold tracking-tight text-slate-900 outline-none">AI Worksheet Workspace</h1>
                <p id="ws-subtitle" contenteditable="true" class="text-xs text-slate-600 mt-1 outline-none">Use the AI Generator in the dashboard to create a comprehensive English lesson.</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <!-- Printable Header QR Code Badge (Toggleable) -->
              <div id="ws-header-qr" class="hidden flex flex-col items-center justify-center p-1.5 bg-white border border-slate-300 rounded-lg shadow-sm text-center">
                <img id="ws-header-qr-img" src="" alt="Student QR Code" class="w-12 h-12 object-contain">
                <span class="text-[8px] font-bold text-slate-700 mt-0.5 tracking-tighter uppercase leading-none">Scan Digital</span>
              </div>
              <div id="ws-student-info" class="flex flex-col gap-1.5 text-xs font-medium text-slate-700 border-l-2 border-slate-200 pl-4">
                <div class="flex items-center gap-1">
                  <span>Student Name:</span>
                  <span contenteditable="true" class="min-w-[120px] border-b border-slate-400 inline-block px-1 outline-none"></span>
                </div>
                <div class="flex items-center gap-1">
                  <span>Date:</span>
                  <span contenteditable="true" class="min-w-[120px] border-b border-slate-400 inline-block px-1 outline-none"></span>
                </div>
                <div class="flex items-center gap-1">
                  <span>Class / Period:</span>
                  <span contenteditable="true" class="min-w-[80px] border-b border-slate-400 inline-block px-1 outline-none"></span>
                </div>
              </div>
            </div>
      \`;

      // Always restore standard features
      const standardIllustration = document.getElementById('ws-illustration-container');
      const standardFooter = document.getElementById('standard-worksheet-footer');
      if (standardIllustration) standardIllustration.classList.remove('hidden');
      if (standardFooter) standardFooter.classList.remove('hidden');
    }`;

if (regex.test(html)) {
  html = html.replace(regex, replacement);
  fs.writeFileSync('app/src/main/assets/index.html', html);
  console.log("Replaced successfully!");
} else {
  console.log("Regex not matched");
}
