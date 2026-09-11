import os
import re

file_path = 'app/src/main/assets/index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

print('Initial length:', len(html))

# 1. Add hidden fallback elements in dashboard sidebar if not already present
if 'id="active-mode-badge"' not in html:
    sidebar_marker = '<aside id="dashboard-sidebar"'
    insert_pos = html.find(sidebar_marker)
    if insert_pos != -1:
        closing_bracket = html.find('>', insert_pos)
        fallback_html = '''
    <!-- Fallback inputs for legacy script compatibility -->
    <div class="hidden" aria-hidden="true">
      <span id="active-mode-badge">Worksheet</span>
      <input type="hidden" id="teacher-name-input" value="Mrs. Davis • English Dept.">
      <select id="grade-level-select"><option value="intermediate" selected>Intermediate</option></select>
      <select id="item-count-select"><option value="5" selected>5</option></select>
    </div>'''
        html = html[:closing_bracket+1] + fallback_html + html[closing_bracket+1:]
        print('Added fallback inputs to dashboard-sidebar')

# 2. Update resetStandardHeader
reset_start = html.find('function resetStandardHeader() {')
if reset_start != -1:
    reset_end = html.find('function setViewMode(mode)', reset_start)
    if reset_end != -1:
        new_reset = '''function resetStandardHeader() {
      const headerBox = document.getElementById('worksheet-header');
      if (!headerBox) return;

      // Force the premium ELA Book Theme automatically for all worksheets!
      const paper = document.getElementById('worksheet-paper');
      if (paper) {
        const allThemes = [
          'theme-classic-corporate', 'theme-midnight-tech', 'theme-nordic-pastel', 
          'theme-vibrant-gamifier', 'theme-emerald-scholar', 'theme-sunset-minimalist', 
          'theme-cyberpunk-edgy', 'theme-oceanic-trust', 'theme-ela-book'
        ];
        allThemes.forEach(t => paper.classList.remove(t));
        paper.classList.add('theme-ela-book');
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) themeSelect.value = 'ela-book';
      }

      const teacherName = document.getElementById('teacher-name-input')?.value || 'Mrs. Davis • English Dept.';

      headerBox.className = "border-b-2 border-slate-800 pb-4 mb-5 flex flex-wrap justify-between items-center gap-4";
      headerBox.innerHTML = `
            <div class="flex-1 min-w-[200px] flex items-center gap-4">
              <!-- Dynamic Educational Illustration -->
              <div id="ws-illustration-container" class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-1.5 shadow-sm flex items-center justify-center transition-all duration-300">
                <svg viewBox="0 0 100 100" class="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
                  <path d="M30 65 L50 35 L70 65 Z" fill="#4f46e5"/>
                  <circle cx="50" cy="35" r="5" fill="#f43f5e"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1 text-[11px] font-semibold text-indigo-700 uppercase tracking-wider no-print-corners">
                  <span id="ws-teacher-display" contenteditable="true">${teacherName}</span>
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
      `;

      // Always restore standard features
      const standardIllustration = document.getElementById('ws-illustration-container');
      const standardFooter = document.getElementById('standard-worksheet-footer');
      if (standardIllustration) standardIllustration.classList.remove('hidden');
      if (standardFooter) standardFooter.classList.remove('hidden');

      updateTeacherHeader(teacherName);
    }

    // Interactive Slideshow Presentation Engine
    '''
        html = html[:reset_start] + new_reset + html[reset_end:]
        print('Updated resetStandardHeader')

# 3. Update setViewMode
setview_start = html.find('function setViewMode(mode) {')
if setview_start != -1:
    setview_end = html.find('function generatePresentationSlides() {', setview_start)
    if setview_end != -1:
        new_setview = '''function setViewMode(mode) {
      viewMode = mode;
      const btnWorksheet = document.getElementById('btn-view-worksheet');
      const btnPresentation = document.getElementById('btn-view-presentation');
      const dashWs = document.getElementById('dash-btn-view-ws');
      const dashPres = document.getElementById('dash-btn-view-pres');
      const zoomWrapper = document.getElementById('zoom-wrapper');
      const presentationContainer = document.getElementById('presentation-container');
      
      if (mode === 'worksheet') {
        if (btnWorksheet) btnWorksheet.className = "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all bg-indigo-600 text-white shadow";
        if (btnPresentation) btnPresentation.className = "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all text-slate-400 hover:text-slate-200";
        if (dashWs) dashWs.className = "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all bg-indigo-600 text-white shadow";
        if (dashPres) dashPres.className = "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white";
        if (zoomWrapper) zoomWrapper.classList.remove('hidden');
        if (presentationContainer) presentationContainer.classList.add('hidden');
        
        const previewBar = document.getElementById('preview-mode-bar');
        if (previewBar) {
          previewBar.classList.remove('max-w-6xl', 'max-w-full');
          previewBar.classList.add('max-w-4xl');
        }

        const splitBtn = document.getElementById('btn-split-page');
        if (splitBtn) splitBtn.classList.remove('hidden');
      } else {
        if (btnWorksheet) btnWorksheet.className = "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all text-slate-400 hover:text-slate-200";
        if (btnPresentation) btnPresentation.className = "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all bg-indigo-600 text-white shadow";
        if (dashWs) dashWs.className = "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white";
        if (dashPres) dashPres.className = "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all bg-indigo-600 text-white shadow";
        if (zoomWrapper) zoomWrapper.classList.add('hidden');
        if (presentationContainer) presentationContainer.classList.remove('hidden');
        
        const previewBar = document.getElementById('preview-mode-bar');
        if (previewBar) {
          previewBar.classList.remove('max-w-4xl');
          previewBar.classList.add(isTheaterMode ? 'max-w-full' : 'max-w-6xl');
        }

        const splitBtn = document.getElementById('btn-split-page');
        if (splitBtn) splitBtn.classList.add('hidden');
        
        generatePresentationSlides();
        currentSlideIndex = 0;
        renderCurrentSlide();
        setTimeout(init3DSwipeHandlers, 50);
        if (typeof lucide !== 'undefined' && lucide.createIcons) { lucide.createIcons(); }
        setTimeout(() => {
          initSmartboardCanvas();
          setSmartboardTool('laser');
        }, 150);
      }
    }

    '''
        html = html[:setview_start] + new_setview + html[setview_end:]
        print('Updated setViewMode')

# 4. Update generateAIWorksheet
gen_start = html.find('async function generateAIWorksheet() {')
if gen_start != -1:
    gen_end = html.find('// ==========================================\n    // GLASS AI TUTOR INTERACTIVE DIALOG CONTROLLER', gen_start)
    if gen_end != -1:
        new_gen = '''async function generateAIWorksheet() {
      // 1. Immediately switch view mode to worksheet so user sees output
      setViewMode('worksheet');

      const topicInput = document.getElementById('ai-topic-input');
      let topicText = topicInput ? topicInput.value.trim() : '';
      if (!topicText) {
        topicText = 'Figurative Language: Metaphors & Similes';
        if (topicInput) topicInput.value = topicText;
        showToast('Default Topic Loaded', 'Generating complete ELA unit on Figurative Language.', 'info');
      }
      
      const gradeSelect = document.getElementById('ai-grade-level');
      const gradeText = gradeSelect ? gradeSelect.value : 'Middle School (Grades 6-8)';
      const activitySelect = document.getElementById('ai-activity-type');
      const activityText = activitySelect ? activitySelect.value : 'Complete ELA Unit';
      
      const rigorSelect = document.getElementById('ai-rigor-level');
      const rigorText = rigorSelect ? rigorSelect.value : 'Standard Academic Core';
      const solutionsSelect = document.getElementById('ai-solutions-key');
      const solutionsText = solutionsSelect ? solutionsSelect.value : 'Include complete, detailed Answer Keys at the end';

      const genBtn = document.getElementById('ai-gen-btn');
      if (genBtn) {
        genBtn.disabled = true;
        genBtn.innerHTML = '<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> <span>Generating Worksheet & Deck...</span>';
        if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
      }

      try {
        currentMode = 'ai';
        const apiKey = userApiKey || localStorage.getItem('gemini_api_key') || '';
        let generatedSuccessfully = false;

        if (apiKey) {
          try {
            const masterPrompt = `You are an expert English Language Arts (ELA) and ESL educator. 
Generate a comprehensive, highly engaging, professional educational worksheet for Grade: ${gradeText}.
The topic or concept to focus on is: "${topicText}".
The activity focus is: "${activityText}".
The curriculum rigor level is: "${rigorText}".
${solutionsText}.

Please design a rigorous, beautifully structured ELA worksheet that includes:
1. A Clear, Catchy Title and Subtitle.
2. A list of CCSS (Common Core State Standards) addressed by this worksheet.
3. Warm-up Explanation: A short, engaging story or explanatory concept paragraph introducing the topic to students.
4. Active Exercise Items:
   - If vocabulary-focused: Start with the header "Word Bank: [word1, word2, word3, word4]" containing vocabulary words in brackets, followed by fill-in-the-blank questions (numbered 1. 2. 3. 4.).
   - If reading comprehension: Start with the header "Reading Passage: [Title of story]" followed by a short passage, then followed by comprehension questions (numbered 1. 2. 3. 4.).
   - If grammar-focused (e.g. Parts of speech, Tenses, Sentence Structure, Punctuation, Active/Passive Voice, Clauses, Mechanics): Start with a clear "Grammar Rules & Examples" instructional block. Then provide a numbered list (1. 2. 3. 4.) of targeted grammar drills requiring students to identify, correct, conjugate, or rewrite sentences based on the target. 
   - If multiple-choice questions: Format each option as a separate line starting with letters A) B) C) D) (e.g., A) Option 1\\nB) Option 2).
5. At the very end of the worksheet, include a distinct section starting with the header "Answer Key" containing solutions for each numbered question.

Please format the output in clean Markdown with bold headers and double-spaced paragraphs between sections to assist in parsing.`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            const response = await fetch(endpoint, {
              method: 'POST',
              signal: controller.signal,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: masterPrompt
                  }]
                }]
              })
            });
            clearTimeout(timeoutId);

            if (response.ok) {
              const data = await response.json();
              const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (resultText) {
                renderAIResultOnPaper(topicText, resultText);
                showToast('AI Tutor Success', 'Worksheet generated with Gemini AI!', 'sparkles');
                generatedSuccessfully = true;
              }
            }
          } catch (err) {
            console.warn('Gemini API fetch timeout or error, executing instant ELA synthesis:', err);
          }
        }

        if (!generatedSuccessfully) {
          // Immediate, instant synthesis engine fallback
          renderAISynthesizedFallback(topicText);
          showToast('Worksheet Ready', 'Instant ELA worksheet synthesized immediately!', 'sparkles');
        }

        // Also synthesize and link matching classroom presentation slide deck!
        try {
          if (typeof synthesizeELASlideDeck === 'function') {
            const autoDeck = synthesizeELASlideDeck(topicText, 5, 'middle-school', 'classroom-interactive', 'slide-theme-clean');
            if (Array.isArray(autoDeck) && autoDeck.length > 0) {
              generatedAIDeckSlides = autoDeck;
              presentationSlides = [...autoDeck];
            }
          }
        } catch (deckErr) {
          console.warn('Auto deck synthesis notice:', deckErr);
        }

        // Auto-close sidebar on mobile/tablet if open so user immediately sees worksheet
        const sidebar = document.getElementById('dashboard-sidebar');
        if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
          toggleDashboard();
        }

        const paper = document.getElementById('worksheet-paper');
        if (paper) {
          paper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (mainErr) {
        console.error('generateAIWorksheet error:', mainErr);
        try {
          renderAISynthesizedFallback(topicText);
        } catch (fbErr) {
          console.error('Fallback synthesis error:', fbErr);
        }
      } finally {
        // Restore button state unconditionally so it never freezes
        if (genBtn) {
          genBtn.disabled = false;
          genBtn.innerHTML = '<i data-lucide="sparkles" class="w-4 h-4"></i> <span>Generate Worksheet & Deck</span>';
          if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
        }
      }
    }

    '''
        html = html[:gen_start] + new_gen + html[gen_end:]
        print('Updated generateAIWorksheet')

# 5. Update renderAIResultOnPaper header lines (add safe checks)
old_render_res = '''function renderAIResultOnPaper(promptText, resultText) {
      resetStandardHeader();
      const cleanTitle = formatWorksheetTitle(promptText);
      document.getElementById('ws-title').innerText = cleanTitle;
      document.getElementById('ws-subtitle').innerText = 'Read the directions carefully and complete each English exercise below.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY • Core Language Arts Curriculum Standards';

      const body = document.getElementById('worksheet-body');'''

new_render_res = '''function renderAIResultOnPaper(promptText, resultText) {
      resetStandardHeader();
      const cleanTitle = formatWorksheetTitle(promptText);
      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = cleanTitle;
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = 'Read the directions carefully and complete each English exercise below.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY • Core Language Arts Curriculum Standards';

      const body = document.getElementById('worksheet-body');
      if (!body) return;'''

if old_render_res in html:
    html = html.replace(old_render_res, new_render_res, 1)
    print('Updated renderAIResultOnPaper header checks')

# 6. Update renderAISynthesizedFallback header lines (add safe checks and lucide at end)
old_fallback_head = '''function renderAISynthesizedFallback(promptText) {
      resetStandardHeader();
      const cleanTitle = formatWorksheetTitle(promptText);
      document.getElementById('ws-title').innerText = cleanTitle;
      document.getElementById('ws-subtitle').innerText = 'Read the directions and answer each question with complete sentences.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY • Core Language Arts Standards';

      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-4 animate-fade-in pt-1';'''

new_fallback_head = '''function renderAISynthesizedFallback(promptText) {
      resetStandardHeader();
      const cleanTitle = formatWorksheetTitle(promptText);
      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = cleanTitle;
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = 'Read the directions and answer each question with complete sentences.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY • Core Language Arts Standards';

      const body = document.getElementById('worksheet-body');
      if (!body) return;
      body.innerHTML = '';
      body.className = 'space-y-4 animate-fade-in pt-1';'''

if old_fallback_head in html:
    html = html.replace(old_fallback_head, new_fallback_head, 1)
    print('Updated renderAISynthesizedFallback header checks')

# Make sure renderAISynthesizedFallback calls lucide.createIcons() at the end
fb_card_end = 'card.innerHTML = html;\n        body.appendChild(card);\n      });\n    }'
if fb_card_end in html:
    new_fb_card_end = 'card.innerHTML = html;\n        body.appendChild(card);\n      });\n      if (typeof lucide !== \'undefined\' && lucide.createIcons) { lucide.createIcons(); }\n    }'
    html = html.replace(fb_card_end, new_fb_card_end, 1)
    print('Added lucide.createIcons to renderAISynthesizedFallback')

# 7. Update switchDashboardTab
old_switch_tab = '''function switchDashboardTab(tabId) {
      // Hide all contents
      document.getElementById('tab-generators-content').classList.add('hidden');
      document.getElementById('tab-design-content').classList.add('hidden');
      document.getElementById('tab-tools-content').classList.add('hidden');
      
      // Show target content
      document.getElementById('tab-' + tabId + '-content').classList.remove('hidden');'''

new_switch_tab = '''function switchDashboardTab(tabId) {
      // Hide all contents safely
      const g = document.getElementById('tab-generators-content');
      const d = document.getElementById('tab-design-content');
      const t = document.getElementById('tab-tools-content');
      if (g) g.classList.add('hidden');
      if (d) d.classList.add('hidden');
      if (t) t.classList.add('hidden');
      
      // Show target content
      const target = document.getElementById('tab-' + tabId + '-content');
      if (target) target.classList.remove('hidden');'''

if old_switch_tab in html:
    html = html.replace(old_switch_tab, new_switch_tab, 1)
    print('Updated switchDashboardTab')

# 8. Update all generator functions (vocabulary, grammar, proofreading, reading, figurative, writing)
# Vocabulary
old_vocab = '''function generateVocabularyWorksheet() {
      resetStandardHeader();
      currentMode = 'vocabulary';
      document.getElementById('active-mode-badge').innerText = 'Vocabulary';

      document.getElementById('ws-title').innerText = 'English Vocabulary & Context Clues';
      document.getElementById('ws-subtitle').innerText = 'Review the word bank, then match each target vocabulary word to its correct definition.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.L.5.4 • Determine or clarify the meaning of unknown and multiple-meaning words and phrases.';

      const grade = document.getElementById('grade-level-select').value;
      const count = parseInt(document.getElementById('item-count-select').value, 10);'''

new_vocab = '''function generateVocabularyWorksheet() {
      setViewMode('worksheet');
      resetStandardHeader();
      currentMode = 'vocabulary';
      const badge = document.getElementById('active-mode-badge');
      if (badge) badge.innerText = 'Vocabulary';

      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = 'English Vocabulary & Context Clues';
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = 'Review the word bank, then match each target vocabulary word to its correct definition.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY.L.5.4 • Determine or clarify the meaning of unknown and multiple-meaning words and phrases.';

      const grade = document.getElementById('grade-level-select')?.value || document.getElementById('ai-grade-level')?.value || 'intermediate';
      const count = parseInt(document.getElementById('item-count-select')?.value || '5', 10);'''

if old_vocab in html:
    html = html.replace(old_vocab, new_vocab, 1)
    print('Updated generateVocabularyWorksheet')

# Grammar
old_grammar = '''function generateGrammarWorksheet() {
      resetStandardHeader();
      currentMode = 'grammar';
      document.getElementById('active-mode-badge').innerText = 'Grammar';

      document.getElementById('ws-title').innerText = 'English Grammar & Usage Practice';
      document.getElementById('ws-subtitle').innerText = 'Select the correct word form in parentheses to complete each grammatically correct sentence.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.L.5.1 • Demonstrate command of the conventions of standard English grammar and usage when writing or speaking.';

      const count = parseInt(document.getElementById('item-count-select').value, 10);'''

new_grammar = '''function generateGrammarWorksheet() {
      setViewMode('worksheet');
      resetStandardHeader();
      currentMode = 'grammar';
      const badge = document.getElementById('active-mode-badge');
      if (badge) badge.innerText = 'Grammar';

      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = 'English Grammar & Usage Practice';
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = 'Select the correct word form in parentheses to complete each grammatically correct sentence.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY.L.5.1 • Demonstrate command of the conventions of standard English grammar and usage when writing or speaking.';

      const count = parseInt(document.getElementById('item-count-select')?.value || '5', 10);'''

if old_grammar in html:
    html = html.replace(old_grammar, new_grammar, 1)
    print('Updated generateGrammarWorksheet')

# Proofreading
old_proof = '''function generateProofreadingWorksheet() {
      resetStandardHeader();
      currentMode = 'proofreading';
      document.getElementById('active-mode-badge').innerText = 'Punctuation';

      document.getElementById('ws-title').innerText = 'Editing & Proofreading Drills';
      document.getElementById('ws-subtitle').innerText = 'Rewrite each incorrect sentence below, correcting capitalization, punctuation, and spelling errors.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.L.6.2 • Demonstrate command of the conventions of standard English capitalization, punctuation, and spelling.';

      const count = parseInt(document.getElementById('item-count-select').value, 10);'''

new_proof = '''function generateProofreadingWorksheet() {
      setViewMode('worksheet');
      resetStandardHeader();
      currentMode = 'proofreading';
      const badge = document.getElementById('active-mode-badge');
      if (badge) badge.innerText = 'Punctuation';

      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = 'Editing & Proofreading Drills';
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = 'Rewrite each incorrect sentence below, correcting capitalization, punctuation, and spelling errors.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY.L.6.2 • Demonstrate command of the conventions of standard English capitalization, punctuation, and spelling.';

      const count = parseInt(document.getElementById('item-count-select')?.value || '5', 10);'''

if old_proof in html:
    html = html.replace(old_proof, new_proof, 1)
    print('Updated generateProofreadingWorksheet')

# Reading
old_reading = '''function generateReadingWorksheet() {
      resetStandardHeader();
      currentMode = 'reading';
      document.getElementById('active-mode-badge').innerText = 'Reading';

      document.getElementById('ws-title').innerText = 'Reading Comprehension & Evidence';
      document.getElementById('ws-subtitle').innerText = 'Read the passage carefully, then answer the comprehension and text-evidence questions.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.RL.5.1 • Quote accurately from a text when explaining what the text says explicitly.';'''

new_reading = '''function generateReadingWorksheet() {
      setViewMode('worksheet');
      resetStandardHeader();
      currentMode = 'reading';
      const badge = document.getElementById('active-mode-badge');
      if (badge) badge.innerText = 'Reading';

      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = 'Reading Comprehension & Evidence';
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = 'Read the passage carefully, then answer the comprehension and text-evidence questions.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY.RL.5.1 • Quote accurately from a text when explaining what the text says explicitly.';'''

if old_reading in html:
    html = html.replace(old_reading, new_reading, 1)
    print('Updated generateReadingWorksheet')

# Figurative
old_fig = '''function generateFigurativeLanguageWorksheet() {
      resetStandardHeader();
      currentMode = 'figurative';
      document.getElementById('active-mode-badge').innerText = 'Figurative';

      document.getElementById('ws-title').innerText = 'Literary Devices & Figurative Language';
      document.getElementById('ws-subtitle').innerText = 'Identify whether each sentence contains a Simile, Metaphor, Personification, Alliteration, or Hyperbole.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.RL.6.4 • Determine the meaning of words and phrases as they are used in a text, including figurative and connotative meanings.';

      const count = parseInt(document.getElementById('item-count-select').value, 10);'''

new_fig = '''function generateFigurativeLanguageWorksheet() {
      setViewMode('worksheet');
      resetStandardHeader();
      currentMode = 'figurative';
      const badge = document.getElementById('active-mode-badge');
      if (badge) badge.innerText = 'Figurative';

      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = 'Literary Devices & Figurative Language';
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = 'Identify whether each sentence contains a Simile, Metaphor, Personification, Alliteration, or Hyperbole.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY.RL.6.4 • Determine the meaning of words and phrases as they are used in a text, including figurative and connotative meanings.';

      const count = parseInt(document.getElementById('item-count-select')?.value || '5', 10);'''

if old_fig in html:
    html = html.replace(old_fig, new_fig, 1)
    print('Updated generateFigurativeLanguageWorksheet')

# Writing
old_writing = '''function generateWritingWorksheet() {
      resetStandardHeader();
      currentMode = 'writing';
      document.getElementById('active-mode-badge').innerText = 'Writing';

      document.getElementById('ws-title').innerText = 'Guided English Essay & Writing Prompt';
      document.getElementById('ws-subtitle').innerText = 'Write a structured multi-paragraph response using vivid adjectives, strong verb choices, and clear topic sentences.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.W.5.2 • Write informative/explanatory texts to examine a topic and convey ideas clearly.';'''

new_writing = '''function generateWritingWorksheet() {
      setViewMode('worksheet');
      resetStandardHeader();
      currentMode = 'writing';
      const badge = document.getElementById('active-mode-badge');
      if (badge) badge.innerText = 'Writing';

      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = 'Guided English Essay & Writing Prompt';
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = 'Write a structured multi-paragraph response using vivid adjectives, strong verb choices, and clear topic sentences.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY.W.5.2 • Write informative/explanatory texts to examine a topic and convey ideas clearly.';'''

if old_writing in html:
    html = html.replace(old_writing, new_writing, 1)
    print('Updated generateWritingWorksheet')

# 9. In DOMContentLoaded, render default initial worksheet if empty
old_dom = '''document.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      loadSavedApiKey();
      initWorksheetDragAndDrop();
    });'''

new_dom = '''document.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      loadSavedApiKey();
      initWorksheetDragAndDrop();
      const wsBody = document.getElementById('worksheet-body');
      if (wsBody && wsBody.children.length === 0) {
        renderAISynthesizedFallback('Figurative Language: Metaphors & Similes');
      }
    });'''

if old_dom in html:
    html = html.replace(old_dom, new_dom, 1)
    print('Updated DOMContentLoaded')

# Save updated HTML to app/src/main/assets/index.html, index.html, public/index.html
with open('app/src/main/assets/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Saved app/src/main/assets/index.html')

if os.path.exists('index.html'):
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Saved index.html')

if os.path.exists('public/index.html'):
    with open('public/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Saved public/index.html')

print('Done applying worksheet fixes!')
