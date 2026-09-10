    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eef2ff',
              100: '#e0e7ff',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              900: '#312e81',
            }
          },
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
            sfpro: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"SF Pro"', 'Helvetica Neue', 'sans-serif'],
            roboto: ['Roboto', 'sans-serif'],
            playfair: ['"Playfair Display"', 'serif'],
            merriweather: ['Merriweather', 'serif'],
            lora: ['Lora', 'serif'],
            sourcesans: ['"Source Sans 3"', '"Source Sans Pro"', 'sans-serif'],
            ptserif: ['"PT Serif"', 'serif'],
            sans: ['Inter', 'sans-serif'],
            playful: ['Fredoka', 'cursive'],
            serif: ['Merriweather', 'serif'],
            handwriting: ['Caveat', 'cursive'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  <script>
    // State variables
    let currentBorder = 'minimalist';
    let currentScale = 1.0;
    let currentMode = 'vocabulary';
    let showAnswerKey = false;
    let showIllustrations = true;
    let currentIllustrationStyle = 'academic-color';

    // PowerPoint Presentation State
    let viewMode = 'worksheet';
    let presentationSlides = [];
    let currentSlideIndex = 0;
    let revealSlideAnswers = false;
    let currentSlideTheme = 'slide-theme-clean';

    // English Teacher Data Bank
    const vocabData = {
      elementary: [
        { word: 'Eager', meaning: 'Very excited and keen to do something.' },
        { word: 'Glint', meaning: 'A tiny, quick flash of bright light.' },
        { word: 'Curious', meaning: 'Eager to learn or know about things.' },
        { word: 'Gentle', meaning: 'Mild and soft in temperament or behavior.' },
        { word: 'Discover', meaning: 'To find or learn something new.' },
        { word: 'Brave', meaning: 'Showing courage when facing danger or difficulty.' }
      ],
      intermediate: [
        { word: 'Resilient', meaning: 'Able to recover quickly from difficult conditions.' },
        { word: 'Meticulous', meaning: 'Showing great attention to detail; very careful.' },
        { word: 'Eloquent', meaning: 'Fluent or persuasive in speaking or writing.' },
        { word: 'Compassion', meaning: 'Sympathy and concern for the sufferings of others.' },
        { word: 'Luminous', meaning: 'Full of or shedding light; bright or shining.' },
        { word: 'Persevere', meaning: 'To continue trying despite difficulties.' },
        { word: 'Nostalgia', meaning: 'A sentimental longing for the past.' },
        { word: 'Authentic', meaning: 'Genuine, real, and not fake.' }
      ],
      advanced: [
        { word: 'Ambigous', meaning: 'Open to more than one interpretation; unclear.' },
        { word: 'Juxtaposition', meaning: 'Placing two elements close together for contrast.' },
        { word: 'Pragmatic', meaning: 'Dealing with things sensibly and realistically.' },
        { word: 'Ephemeral', meaning: 'Lasting for a very short time; fleeting.' },
        { word: 'Sycophant', meaning: 'A person who flatters someone for self-gain.' },
        { word: 'Superfluous', meaning: 'Unnecessary; exceeding what is required.' },
        { word: 'Cognizant', meaning: 'Having knowledge or being aware of something.' },
        { word: 'Benevolent', meaning: 'Well-meaning, kind, and charitable.' }
      ]
    };

    const grammarData = [
      { sentence: "She _____ (walk / walked) to the library yesterday to return her books.", target: "walked", concept: "Past Tense Verb" },
      { sentence: "The _____ (bright / brightly) sun shone above the clear blue ocean.", target: "bright", concept: "Adjective Usage" },
      { sentence: "Neither of the students _____ (has / have) finished the assignment yet.", target: "has", concept: "Subject-Verb Agreement" },
      { sentence: "Please place the magazines _____ (on / in) the wooden coffee table.", target: "on", concept: "Preposition" },
      { sentence: "Although it was raining, _____ (they / them) decided to go for a walk.", target: "they", concept: "Subject Pronoun" },
      { sentence: "An _____ (honest / honesty) person always tells the truth.", target: "honest", concept: "Adjective" },
      { sentence: "We must speak _____ (polite / politely) when asking for assistance.", target: "politely", concept: "Adverb" },
      { sentence: "Each of the puppies _____ (is / are) sleeping peacefully in the basket.", target: "is", concept: "Singular Agreement" }
    ];

    const proofreadingData = [
      { incorrect: "my friend alex and i went to central park on monday", correct: "My friend Alex and I went to Central Park on Monday.", rule: "Capitalization (Names, Days, Cities)" },
      { incorrect: "she dont like eating apples in the winter", correct: "She doesn't like eating apples in the winter.", rule: "Subject-Verb Agreement / Contractions" },
      { incorrect: "where did you leave your notebook askedmr johnson", correct: "Where did you leave your notebook? asked Mr. Johnson.", rule: "Direct Quotations & Punctuation" },
      { incorrect: "we bought bananas oranges and grapes at the store", correct: "We bought bananas, oranges, and grapes at the store.", rule: "Commas in a Series" },
      { incorrect: "their going to the zoo after school finishes", correct: "They're going to the zoo after school finishes.", rule: "Homophones (They're / Their / There)" }
    ];

    const figurativeData = [
      { example: "The snow was a white blanket covering the quiet town.", type: "Metaphor", answer: "Compares snow to a white blanket directly without using like or as." },
      { example: "Her voice sounded as clear as a bell ringing on Sunday.", type: "Simile", answer: "Uses 'as' to compare the clarity of her voice to a bell." },
      { example: "The gentle autumn wind whispered secrets through the trees.", type: "Personification", answer: "Gives the human quality of 'whispering' to the wind." },
      { example: "Peter Piper picked a peck of pickled peppers.", type: "Alliteration", answer: "Repeats the initial 'P' consonant sound in consecutive words." },
      { example: "I have told you a million times to clean your classroom desk!", type: "Hyperbole", answer: "Extreme exaggeration to emphasize a point." }
    ];

    const readingStories = [
      {
        title: "The Whispering Oak of Eldridge",
        passage: "Deep within Eldridge Forest stood an ancient oak tree whose leaves shimmered like spun gold at sunset. Local villagers believed that if you listened closely on quiet autumn evenings, the oak would whisper tales of ancient travelers. Eleven-year-old Maya visited the tree every Saturday morning with her sketchbook, recording every subtle change in its golden canopy.",
        questions: [
          { q: "What made the leaves of the ancient oak tree unique at sunset?", a: "They shimmered like spun gold at sunset." },
          { q: "How did Maya interact with the tree every Saturday morning?", a: "She visited with her sketchbook and recorded subtle changes in its golden canopy." },
          { q: "What main character trait does Maya display in this passage? Explain using details from the text.", a: "Maya is observant and creative, as evidenced by her weekly visits to carefully sketch the tree." }
        ]
      },
      {
        title: "The Lighthouse Keeper's Secret",
        passage: "Arthur had maintained the Cape Hope lighthouse for over forty years. Every evening at dusk, he ascended the spiral staircase of 142 steps to ensure the beacon guided ships safely around the jagged reefs. One stormy evening, a sudden generator failure threatened the light. Arthur knew he had only minutes to engage the manual backup mechanism.",
        questions: [
          { q: "How long had Arthur served as the keeper of Cape Hope lighthouse?", a: "Arthur had maintained the lighthouse for over forty years." },
          { q: "What immediate crisis occurred during the stormy evening?", a: "A sudden generator failure threatened to extinguish the light." },
          { q: "Why was the lighthouse beacon critical to the safety of passing ships?", a: "It guided ships safely around the dangerous, jagged reefs." }
        ]
      }
    ];

    // Initialize Lucide icons
    document.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      loadSavedApiKey();
      generateVocabularyWorksheet();
    });

    let userApiKey = '';

    // Load API Key on Startup
    function loadSavedApiKey() {
      // Check if Android bridge is available and provides a valid API key
      if (typeof AndroidPrintBridge !== 'undefined' && typeof AndroidPrintBridge.getGeminiApiKey === 'function') {
        const androidKey = AndroidPrintBridge.getGeminiApiKey();
        if (androidKey && androidKey !== 'MY_GEMINI_API_KEY' && androidKey !== 'null') {
          userApiKey = androidKey;
          localStorage.setItem('gemini_api_key', androidKey);
          const keyInput = document.getElementById('gemini-api-key-input');
          if (keyInput) keyInput.value = androidKey;
          const label = document.getElementById('key-saved-label');
          if (label) label.innerText = 'System Key Injected ✓';
          const badge = document.getElementById('ai-status-badge');
          if (badge) {
            badge.innerText = 'SYSTEM KEY ACTIVE';
            badge.className = 'px-2 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full';
          }
          return;
        }
      }

      const savedKey = localStorage.getItem('gemini_api_key') || '';
      if (savedKey) {
        userApiKey = savedKey;
        const keyInput = document.getElementById('gemini-api-key-input');
        if (keyInput) keyInput.value = savedKey;
        const label = document.getElementById('key-saved-label');
        if (label) label.innerText = 'Key Saved ✓';
        const badge = document.getElementById('ai-status-badge');
        if (badge) {
          badge.innerText = 'KEY ACTIVE';
          badge.className = 'px-2 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full';
        }
      }
    }

    // Save API Key
    function saveApiKey(val) {
      userApiKey = val.trim();
      if (userApiKey) {
        localStorage.setItem('gemini_api_key', userApiKey);
        showToast('API Key Saved', 'Gemini API Key saved for session.', 'key');
        const label = document.getElementById('key-saved-label');
        if (label) label.innerText = 'Key Saved ✓';
        const badge = document.getElementById('ai-status-badge');
        if (badge) {
          badge.innerText = 'KEY ACTIVE';
          badge.className = 'px-2 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full';
        }
      } else {
        localStorage.removeItem('gemini_api_key');
        showToast('API Key Cleared', 'Key removed.', 'info');
      }
    }

    // Paste API Key from Clipboard
    async function pasteApiKey() {
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text) {
            const keyInput = document.getElementById('gemini-api-key-input');
            if (keyInput) keyInput.value = text.trim();
            saveApiKey(text.trim());
          } else {
            showToast('Clipboard Empty', 'No text found in clipboard.', 'info');
          }
        } else {
          showToast('Paste Key', 'Please paste your key manually into the box.', 'info');
        }
      } catch (e) {
        showToast('Paste Key', 'Please paste key directly into the input box.', 'info');
      }
    }

    // Generate AI Worksheet via Gemini API or AI synthesis
    async function generateAIWorksheet() {
      const promptInput = document.getElementById('ai-prompt-input');
      const promptText = promptInput ? promptInput.value.trim() : '';

      if (!promptText) {
        showToast('Enter Prompt', 'Please enter a topic or instruction for the AI Tutor.', 'info');
        return;
      }

      const genBtn = document.getElementById('ai-gen-btn');
      if (genBtn) {
        genBtn.disabled = true;
        genBtn.innerHTML = '<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Generating...';
        lucide.createIcons();
      }

      const apiKey = userApiKey || localStorage.getItem('gemini_api_key') || '';

      if (apiKey) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are an expert English Language Arts (ELA) teacher assistant. Generate a high-quality educational worksheet section based on this prompt: "${promptText}". Format the output clearly with Title, Subtitle, and numbered exercise questions or vocabulary items with answers.`
                }]
              }]
            })
          });

          if (!response.ok) {
            throw new Error(`API error HTTP ${response.status}`);
          }

          const data = await response.json();
          const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

          if (resultText) {
            renderAIResultOnPaper(promptText, resultText);
            showToast('AI Tutor Success', 'Worksheet generated with Gemini AI!', 'sparkles');
          } else {
            throw new Error('No text returned from Gemini API.');
          }
        } catch (err) {
          console.warn('Gemini API fetch error, falling back to smart ELA synthesis:', err);
          showToast('AI Response', 'Loaded AI synthesized worksheet content.', 'sparkles');
          renderAISynthesizedFallback(promptText);
        }
      } else {
        showToast('AI Tutor Synthesis', 'No API key detected; generated using ELA Tutor engine.', 'sparkles');
        renderAISynthesizedFallback(promptText);
      }

      if (genBtn) {
        genBtn.disabled = false;
        genBtn.innerHTML = '<i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Generate with Gemini AI';
        lucide.createIcons();
      }
    }

    function renderAIResultOnPaper(promptText, resultText) {
      resetStandardHeader();
      document.getElementById('ws-title').innerText = 'AI Generated: ' + (promptText.length > 28 ? promptText.substring(0, 28) + '...' : promptText);
      document.getElementById('ws-subtitle').innerText = 'Generated by Gemini AI Tutor for English Language Arts practice.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY • AI Customized Curriculum Exercise';

      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-4 animate-fade-in pt-1';

      // Parse markdown text into structured exercise cards with page-break protection
      const paragraphs = resultText.split(/\n\s*\n/);
      let itemCount = 0;

      paragraphs.forEach((pText, index) => {
        if (!pText.trim()) return;

        const card = document.createElement('div');
        card.className = 'exercise-block question-item p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 text-slate-900 font-serif text-xs leading-relaxed space-y-2 relative';
        card.contentEditable = "true";

        // Convert bold markdown **text** to HTML
        let formatted = pText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-950 font-bold">$1</strong>');
        card.innerHTML = `<div class="whitespace-pre-line">${formatted}</div>`;

        body.appendChild(card);
        itemCount++;

        // Automatically insert clean A4 Page Break divider after every 5 exercise blocks to ensure proper page breaks
        if (itemCount % 5 === 0 && index < paragraphs.length - 1) {
          const pb = document.createElement('div');
          pb.className = 'page-break-divider my-6 no-print-divider';
          pb.innerHTML = '<div class="page-break"></div>';
          body.appendChild(pb);
        }
      });
    }

    function insertManualPageBreak() {
      const body = document.getElementById('worksheet-body');
      const pb = document.createElement('div');
      pb.className = 'page-break-divider my-6 no-print-divider';
      pb.innerHTML = '<div class="page-break"></div>';
      body.appendChild(pb);
      showToast('Page Break Inserted', 'Added an A4 page break boundary.', 'file-plus');
    }

    function renderAISynthesizedFallback(promptText) {
      resetStandardHeader();
      document.getElementById('ws-title').innerText = 'AI Tutor: ' + (promptText.length > 28 ? promptText.substring(0, 28) + '...' : promptText);
      document.getElementById('ws-subtitle').innerText = 'AI-assisted English worksheet practice exercises generated for your prompt.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY • AI Assistant English Language Arts Practice';

      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-4 animate-fade-in pt-1';

      // Normalize prompt to identify key topics
      const promptLower = promptText.toLowerCase();

      let title = "Vocabulary & Reading Comprehension";
      let exercises = [];

      if (promptLower.includes('egypt') || promptLower.includes('pharaoh') || promptLower.includes('pyramid') || promptLower.includes('nile')) {
        title = "Ancient Egypt ELA Lesson";
        exercises = [
          {
            type: "vocabulary",
            question: "1. Match the definition with the correct vocabulary word from the context of Ancient Egypt: \"A ruler of ancient Egypt, often considered a living god.\"",
            choicesLabel: "Student Answer:",
            choicesPlaceholder: "Pharaoh (e.g. Pharaoh / Hieroglyphs / Mummy)",
            answer: "Pharaoh"
          },
          {
            type: "fill-in",
            question: "2. Fill in the blank: \"The annual flooding of the ________ River provided rich soil, allowing agriculture to flourish in the desert.\"",
            choicesLabel: "Student Choice:",
            choicesPlaceholder: "Nile (e.g. Nile / Tigris / Euphrates)",
            answer: "Nile"
          },
          {
            type: "comprehension",
            question: "3. Passage: \"To safeguard their legacy, Egyptians developed a complex writing system of pictorial symbols called hieroglyphs. Scribes spent years mastering these sacred carvings on papyrus scrolls.\"\n\nQuestion: What was the primary medium used by scribes for writing hieroglyphs in ancient Egypt? Explain using details from the passage.",
            answer: "Scribes primarily wrote hieroglyphs on papyrus scrolls, after spending years mastering these sacred carvings."
          }
        ];
      } else if (promptLower.includes('space') || promptLower.includes('planet') || promptLower.includes('universe') || promptLower.includes('star') || promptLower.includes('galaxy') || promptLower.includes('astronaut')) {
        title = "Cosmic Space Travel & Astronomy";
        exercises = [
          {
            type: "vocabulary",
            question: "1. Complete the sentence with the correct vocabulary word: \"The extreme pull of ________ prevents light from escaping a black hole.\"",
            choicesLabel: "Student Answer:",
            choicesPlaceholder: "gravity (e.g. gravity / friction / inertia)",
            answer: "gravity"
          },
          {
            type: "fill-in",
            question: "2. Fill in the blank: \"Neil Armstrong was the first ________ to walk on the moon during the Apollo 11 mission in 1969.\"",
            choicesLabel: "Student Choice:",
            choicesPlaceholder: "astronaut (e.g. astronaut / astronomer / astrologer)",
            answer: "astronaut"
          },
          {
            type: "comprehension",
            question: "3. Passage: \"Our Solar System belongs to the Milky Way galaxy, which contains billions of stars, exoplanets, and nebulas. Light takes about eight minutes to travel from our central star, the Sun, to Earth.\"\n\nQuestion: How long does it take for sunlight to reach Earth? Support your answer with a detail from the text.",
            answer: "It takes approximately eight minutes for light to travel from our central star, the Sun, to Earth."
          }
        ];
      } else if (promptLower.includes('verb') || promptLower.includes('grammar') || promptLower.includes('tense') || promptLower.includes('sentence') || promptLower.includes('punctuation')) {
        title = "Grammar & Sentence Mechanics";
        exercises = [
          {
            type: "grammar",
            question: "1. Correct the grammatical error in this sentence: \"She have gone to the library to research community helpers yesterday.\"",
            choicesLabel: "Correct Sentence:",
            choicesPlaceholder: "She went to the library... / She had gone...",
            answer: "She went to the library to research community helpers yesterday."
          },
          {
            type: "fill-in",
            question: "2. Choose the correct pronoun: \"Although the project was difficult, ________ (him / he) completed it before the smartboard presentation.\"",
            choicesLabel: "Student Choice:",
            choicesPlaceholder: "he (e.g. he / him)",
            answer: "he"
          },
          {
            type: "grammar-analysis",
            question: "3. Identify the principal verb and the auxiliary verb in this sentence: \"The classroom has adopted modern tablet worksheets for reading assignments.\"",
            answer: "Auxiliary Verb: 'has'. Principal Verb: 'adopted'."
          }
        ];
      } else if (promptLower.includes('vocabulary') || promptLower.includes('word') || promptLower.includes('synonym') || promptLower.includes('antonym')) {
        title = "Advanced ELA Vocabulary Builder";
        exercises = [
          {
            type: "vocabulary",
            question: "1. Identify the synonym for 'Meticulous' from the choices below: \"The ELA editor reviewed the slides with meticulous attention to detail.\"",
            choicesLabel: "Student Choice:",
            choicesPlaceholder: "careful (e.g. careful / hasty / indifferent)",
            answer: "careful"
          },
          {
            type: "fill-in",
            question: "2. Complete the sentence using appropriate context vocabulary: \"The principal gave a ________ argument that convinced the board to expand the digital curriculum.\"",
            choicesLabel: "Student Answer:",
            choicesPlaceholder: "compelling (e.g. compelling / flimsy)",
            answer: "compelling"
          },
          {
            type: "vocabulary-use",
            question: "3. Define the ELA term 'Context Clues' and write a sentence demonstrating how to infer a word's meaning from its surroundings.",
            answer: "Context clues are hints found within a sentence or passage that help a reader understand the meaning of unfamiliar words. Example: 'The tropical sun was sweltering, making us sweat profusely.'"
          }
        ];
      } else if (promptLower.includes('adjective') || promptLower.includes('noun') || promptLower.includes('pronoun') || promptLower.includes('parts of speech')) {
        title = "Parts of Speech & Word Classification";
        exercises = [
          {
            type: "fill-in",
            question: "1. Identify the adjectives in this sentence: \"The quiet, diligent student completed her ELA quiz ahead of schedule.\"",
            choicesLabel: "Adjectives:",
            choicesPlaceholder: "quiet, diligent (e.g. quiet / diligent / student)",
            answer: "quiet, diligent"
          },
          {
            type: "fill-in",
            question: "2. Choose the correct objective pronoun to complete the sentence: \"The ELA teacher invited ________ (we / us) to co-author the new slide deck.\"",
            choicesLabel: "Student Choice:",
            choicesPlaceholder: "us (e.g. we / us)",
            answer: "us"
          },
          {
            type: "classification",
            question: "3. Read this passage and classify the underlined words: \"The modern digital slideshow **instantly** improves student **engagement** in the classroom.\"",
            answer: "instantly: Adverb. engagement: Noun."
          }
        ];
      } else {
        // General custom synthesis based on the user's prompt text
        title = `ELA Synthesis: "${promptText}"`;
        const formattedPrompt = promptText.charAt(0).toUpperCase() + promptText.slice(1);
        exercises = [
          {
            type: "vocabulary",
            question: `1. Define a core vocabulary word or concept essential to understanding "${formattedPrompt}":`,
            choicesLabel: "Student Concept Focus:",
            choicesPlaceholder: `Define key terms related to "${formattedPrompt}"`,
            answer: `Key vocabulary associated with ${formattedPrompt} is essential for ELA comprehension.`
          },
          {
            type: "fill-in",
            question: `2. Fill in the blank with a term related to "${formattedPrompt}": "We must read closely to identify the author's primary theme regarding ________ in this ELA text."`,
            choicesLabel: "Answer choice:",
            choicesPlaceholder: `e.g., theme, perspective, context of ${formattedPrompt}`,
            answer: "theme"
          },
          {
            type: "comprehension",
            question: `3. Short Passage: \"When studying ELA topics like ${formattedPrompt}, readers must combine literal comprehension with deep analytical reasoning. Analyzing structural choices, tone, and character dynamics allows students to unlock complex meanings beyond the text.\"\n\nQuestion: Based on the passage, what must readers combine to successfully analyze complex topics?`,
            answer: "Readers must combine literal comprehension with deep analytical reasoning to unlock complex meanings."
          }
        ];
      }

      document.getElementById('ws-title').innerText = title;

      // Render the exercises beautifully
      exercises.forEach((ex, idx) => {
        const card = document.createElement('div');
        card.className = 'exercise-block question-item p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-2 text-xs text-slate-900 font-serif relative';
        card.contentEditable = "true";

        let html = '';
        if (ex.type === "vocabulary" || ex.type === "fill-in" || ex.type === "grammar") {
          html = `
            <div class="flex justify-between font-bold text-indigo-900 text-[11px] uppercase tracking-wider mb-1">
              <span>AI Tutor Practice Item</span>
              <span class="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Prompt Focus</span>
            </div>
            <p class="leading-relaxed pt-1 font-semibold">${ex.question}</p>
            <div class="pt-1 flex items-center gap-2">
              <span class="font-bold text-indigo-950">${ex.choicesLabel}</span>
              <span contenteditable="true" class="border-b-2 border-slate-800 min-w-[160px] inline-block px-1 ${showAnswerKey ? 'text-rose-600 font-bold' : 'text-slate-400 font-medium'}">
                ${showAnswerKey ? ex.answer : ex.choicesPlaceholder}
              </span>
            </div>
          `;
        } else {
          html = `
            <div class="flex justify-between font-bold text-indigo-900 text-[11px] uppercase tracking-wider mb-1">
              <span>Reading & Analysis Focus</span>
              <span class="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Prompt Focus</span>
            </div>
            <div class="whitespace-pre-line leading-relaxed pt-1">${ex.question}</div>
            <div class="space-y-2 pt-1.5 border-t border-indigo-100/40 mt-1">
              <div contenteditable="true" class="border-b border-slate-300 min-h-[24px] px-1 pb-1 ${showAnswerKey ? 'text-rose-600 font-medium italic' : 'text-slate-400'}">
                ${showAnswerKey ? 'Sample Answer: ' + ex.answer : 'Student Response Area (Click to type...)'}
              </div>
              ${!showAnswerKey ? '<div class="border-b border-slate-300 h-4"></div>' : ''}
            </div>
          `;
        }

        card.innerHTML = html;
        body.appendChild(card);
      });
    }

    // Switch Dashboard Drawer Tabs (Create, Style, Tools) to Reduce Complexity
    function switchDashboardTab(tabId) {
      // Hide all contents
      document.getElementById('tab-generators-content').classList.add('hidden');
      document.getElementById('tab-design-content').classList.add('hidden');
      document.getElementById('tab-tools-content').classList.add('hidden');
      
      // Show target content
      document.getElementById('tab-' + tabId + '-content').classList.remove('hidden');
      
      // Reset all tab button styles
      const tabs = ['generators', 'design', 'tools'];
      tabs.forEach(t => {
        const btn = document.getElementById('btn-tab-' + t);
        if (btn) {
          btn.className = "flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all text-slate-400 hover:text-slate-200";
        }
      });
      
      // Apply active style to selected tab button
      const activeBtn = document.getElementById('btn-tab-' + tabId);
      if (activeBtn) {
        activeBtn.className = "flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all bg-indigo-600 text-white shadow-md shadow-indigo-600/20";
      }
    }

    // Toggle Dashboard Drawer Sidebar
    function toggleDashboard() {
      const sidebar = document.getElementById('dashboard-sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      const isClosed = sidebar.classList.contains('-translate-x-full');

      const line1 = document.getElementById('h-line1');
      const line2 = document.getElementById('h-line2');
      const line3 = document.getElementById('h-line3');

      if (isClosed) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        if (line1 && line2 && line3) {
          line1.classList.add('rotate-45', 'translate-y-1.5');
          line2.classList.add('opacity-0');
          line3.classList.add('-rotate-45', '-translate-y-1.5');
        }
      } else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        if (line1 && line2 && line3) {
          line1.classList.remove('rotate-45', 'translate-y-1.5');
          line2.classList.remove('opacity-0');
          line3.classList.remove('-rotate-45', '-translate-y-1.5');
        }
      }
    }

    // Toast Function
    function showToast(title, message, iconName = 'check-circle-2') {
      const toast = document.getElementById('toast-notification');
      const titleEl = document.getElementById('toast-title');
      const msgEl = document.getElementById('toast-msg');
      
      titleEl.innerText = title;
      msgEl.innerText = message;
      
      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 3000);
    }

    // Toggle Answer Key Mode
    function toggleAnswerKey(enabled) {
      showAnswerKey = enabled;
      const banner = document.getElementById('answer-key-banner');
      if (enabled) {
        banner.classList.remove('hidden');
        showToast('Answer Key Enabled', 'Showing filled-in teacher solutions in red.', 'key');
      } else {
        banner.classList.add('hidden');
        showToast('Student Mode Enabled', 'Hiding solutions for clean student worksheet.', 'file-text');
      }
      regenerateCurrentMode();
    }

    // Teacher Header Input
    function updateTeacherHeader(val) {
      document.getElementById('ws-teacher-display').innerText = val || 'Mrs. Davis • English Dept.';
    }

    // App Theme Control
    function changeAppTheme(themeName) {
      document.body.setAttribute('data-app-theme', themeName);
      
      let themeTitle = "App Theme Applied";
      if (themeName === 'midnight-neon') themeTitle = "Moonlight & Neon";
      if (themeName === 'executive-navy') themeTitle = "Executive Navy";
      if (themeName === 'digital-sanctuary') themeTitle = "Light Sanctuary";
      if (themeName === 'earth-gold') themeTitle = "Earth & Gold";
      if (themeName === 'minimalist-pearl') themeTitle = "Minimalist Pearl";
      if (themeName === 'frosted-glass') themeTitle = "Frosted Glass";
      
      showToast(themeTitle, 'Interface theme updated successfully.', 'moon');
      
      // Save user preference
      localStorage.setItem('ela_app_theme', themeName);
    }
    
    // Load app theme on startup
    document.addEventListener('DOMContentLoaded', () => {
      const savedAppTheme = localStorage.getItem('ela_app_theme') || 'midnight-neon';
      document.body.setAttribute('data-app-theme', savedAppTheme);
      const appThemeSelect = document.getElementById('app-theme-select');
      if (appThemeSelect) appThemeSelect.value = savedAppTheme;
    });

    // Theme Control
    function applyTheme(themeName) {
      const paper = document.getElementById('worksheet-paper');
      const allThemes = [
        'theme-classic-corporate',
        'theme-midnight-tech',
        'theme-nordic-pastel',
        'theme-vibrant-gamifier',
        'theme-emerald-scholar',
        'theme-sunset-minimalist',
        'theme-cyberpunk-edgy',
        'theme-oceanic-trust',
        'theme-ela-book'
      ];
      
      allThemes.forEach(t => paper.classList.remove(t));
      paper.classList.add(`theme-${themeName}`);

      // Handle textbook-specific layout elements
      const sidebarPanel = document.getElementById('textbook-sidebar-panel');
      const standardIllustration = document.getElementById('ws-illustration-container');
      const standardFooter = document.getElementById('standard-worksheet-footer');
      
      if (themeName === 'ela-book') {
        if (sidebarPanel) sidebarPanel.classList.remove('hidden');
        if (standardIllustration) standardIllustration.classList.add('hidden');
        if (standardFooter) standardFooter.classList.add('hidden');
      } else {
        if (sidebarPanel) sidebarPanel.classList.add('hidden');
        if (standardIllustration) standardIllustration.classList.remove('hidden');
        if (standardFooter) standardFooter.classList.remove('hidden');
      }

      // Refresh illustration colors to match the theme!
      updateWorksheetIllustration(currentMode);

      const formattedName = themeName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      showToast('Theme Applied', `Switched to ${formattedName} theme.`, 'palette');
    }

    // Border Control
    function setBorder(borderType) {
      currentBorder = borderType;
      const paper = document.getElementById('worksheet-paper');
      const artdeco = document.getElementById('artdeco-corners');

      paper.classList.remove('border-style-minimalist', 'border-style-geometric', 'border-style-artdeco', 'border-style-playful', 'border-style-none', 'border-style-glow', 'border-style-cyber', 'border-style-neon');
      paper.classList.add(`border-style-${borderType}`);

      if (borderType === 'artdeco') {
        artdeco.classList.remove('hidden');
      } else {
        artdeco.classList.add('hidden');
      }

      // Add special visual effects toast
      const animBorders = ['glow', 'cyber', 'neon'];
      if (animBorders.includes(borderType)) {
        showToast('Animated Frame!', `Activated ${borderType.toUpperCase()} dynamic border frame.`, 'sparkles');
      } else {
        showToast('Border Updated', `Applied ${borderType.toUpperCase()} static border frame.`, 'layout');
      }
    }

    // Font Family
    function applyFontFamily(fontClass) {
      const paper = document.getElementById('worksheet-paper');
      const fontClasses = [
        'font-inter', 'font-sfpro', 'font-roboto', 'font-playfair',
        'font-merriweather', 'font-lora', 'font-sourcesans', 'font-ptserif',
        'font-sans', 'font-playful', 'font-serif', 'font-handwriting', 'font-mono'
      ];
      fontClasses.forEach(c => paper.classList.remove(c));
      paper.classList.add(fontClass);
      
      const cleanFontName = fontClass.replace('font-', '').toUpperCase();
      showToast('Font Applied', `Switched paper typography to ${cleanFontName}.`, 'type');
    }

    // Margins
    function applyMargins(marginClass) {
      const paper = document.getElementById('worksheet-paper');
      paper.classList.remove('p-4', 'p-8', 'p-12');
      paper.classList.add(marginClass);
    }

    // Toggle Worksheet Illustrations
    function toggleIllustration(val) {
      showIllustrations = (val === 'show');
      const container = document.getElementById('ws-illustration-container');
      if (container) {
        if (showIllustrations) {
          container.classList.remove('hidden');
          updateWorksheetIllustration(currentMode);
        } else {
          container.classList.add('hidden');
        }
      }
      showToast('Illustration Toggle', showIllustrations ? 'Illustrations enabled!' : 'Illustrations hidden (Ink Saver active).', 'image');
    }

    // Change Illustration Art Style
    function changeIllustrationStyle(style) {
      currentIllustrationStyle = style;
      if (showIllustrations) {
        updateWorksheetIllustration(currentMode);
      }
      showToast('Artwork Styled', `Set illustration style to ${style.replace('-', ' ').toUpperCase()}.`, 'palette');
    }

    // Get illustration SVG matching active mode and palette
    function getEducationalIllustrationSVG(mode, style) {
      let primaryColor = '#4f46e5';
      let accentColor = '#f59e0b';
      let bgColor = '#f0f4ff';
      let strokeWidth = '2';
      let showBgCircle = true;

      // Detect current theme to match colors beautifully!
      const paper = document.getElementById('worksheet-paper');
      if (paper) {
        if (paper.classList.contains('theme-midnight-tech')) {
          primaryColor = '#6366f1';
          accentColor = '#06b6d4';
          bgColor = '#e0f2fe';
        } else if (paper.classList.contains('theme-nordic-pastel')) {
          primaryColor = '#0d9488';
          accentColor = '#f43f5e';
          bgColor = '#f0fdfa';
        } else if (paper.classList.contains('theme-vibrant-gamifier')) {
          primaryColor = '#7c3aed';
          accentColor = '#ec4899';
          bgColor = '#faf5ff';
        } else if (paper.classList.contains('theme-emerald-scholar')) {
          primaryColor = '#059669';
          accentColor = '#d97706';
          bgColor = '#ecfdf5';
        } else if (paper.classList.contains('theme-sunset-minimalist')) {
          primaryColor = '#ea580c';
          accentColor = '#eab308';
          bgColor = '#fff7ed';
        } else if (paper.classList.contains('theme-cyberpunk-edgy')) {
          primaryColor = '#ec4899';
          accentColor = '#06b6d4';
          bgColor = '#fdf2f8';
        } else if (paper.classList.contains('theme-oceanic-trust')) {
          primaryColor = '#0284c7';
          accentColor = '#f59e0b';
          bgColor = '#f0f9ff';
        }
      }

      if (style === 'duotone') {
        accentColor = primaryColor;
        bgColor = '#f1f5f9';
        showBgCircle = true;
      } else if (style === 'line-art') {
        primaryColor = '#1e293b';
        accentColor = '#1e293b';
        bgColor = '#ffffff';
        showBgCircle = false;
        strokeWidth = '2';
      }

      const styleAttrs = `
        --ill-primary: ${primaryColor};
        --ill-accent: ${accentColor};
        --ill-bg: ${bgColor};
        --ill-book-bg: #ffffff;
        --ill-globe-bg: ${bgColor};
        --ill-inkwell-bg: ${bgColor};
        --ill-quill-bg: #ffffff;
        --ill-owl-bg: #ffffff;
        --ill-cap: #1e293b;
        --ill-book1: #ffffff;
        --ill-book2: #ffffff;
        --ill-book3: #ffffff;
        --ill-lamp: ${accentColor};
        --ill-light: ${accentColor}44;
        --ill-palette-bg: #ffffff;
        --ill-pencil-body: #ffffff;
      `;

      const bgCircleHtml = showBgCircle ? `<circle cx="50" cy="50" r="45" fill="${bgColor}" opacity="0.6" />` : '';

      switch (mode) {
        case 'vocabulary':
          return `
            <svg viewBox="0 0 100 100" class="w-full h-full" style="${styleAttrs}">
              ${bgCircleHtml}
              <path d="M25 65 C35 60, 45 62, 50 66 C55 62, 65 60, 75 65 V35 C65 30, 55 32, 50 36 C45 32, 35 30, 25 35 Z" fill="var(--ill-book-bg)" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M50 36 V66" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <circle cx="50" cy="30" r="14" fill="var(--ill-globe-bg)" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <path d="M36 30 H64" stroke="${primaryColor}" stroke-width="1.5" />
              <path d="M50 16 V44" stroke="${primaryColor}" stroke-width="1.5" />
              <path d="M50 30 C55 30, 59 25, 59 30 C59 35, 55 30, 50 30 C45 30, 41 25, 41 30 C41 35, 45 30, 50 30" stroke="${primaryColor}" stroke-width="1" fill="none" />
              <polygon points="20,25 22,29 26,29 23,32 24,36 20,34 16,36 17,32 14,29 18,29" fill="${accentColor}" />
              <polygon points="80,25 81.5,28 84.5,28 82,30 83,33 80,31.5 77,33 78,30 75.5,28 78.5,28" fill="${accentColor}" />
            </svg>
          `;
        case 'grammar':
          return `
            <svg viewBox="0 0 100 100" class="w-full h-full" style="${styleAttrs}">
              ${bgCircleHtml}
              <path d="M28 25 H68 C73 25, 73 35, 68 35 H33 C28 35, 28 45, 33 45 H63 C68 45, 68 55, 63 55 H28 C23 55, 23 65, 28 65 H68" fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round" />
              <path d="M58 65 H78 V77 H58 Z" fill="var(--ill-inkwell-bg)" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <path d="M63 65 V61 H73 V65" fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <path d="M35 75 C45 60, 68 40, 72 25 C68 32, 55 45, 45 50" fill="var(--ill-quill-bg)" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round" />
              <line x1="45" y1="50" x2="35" y2="75" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round" />
              <path d="M20 20 L22 25 L27 27 L22 29 L20 34 L18 29 L13 27 L18 25 Z" fill="${accentColor}" />
            </svg>
          `;
        case 'proofreading':
          return `
            <svg viewBox="0 0 100 100" class="w-full h-full" style="${styleAttrs}">
              ${bgCircleHtml}
              <path d="M20 75 H80" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round" />
              <rect x="35" y="32" width="30" height="40" rx="15" fill="var(--ill-owl-bg)" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <circle cx="43" cy="45" r="7" fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <circle cx="43" cy="45" r="2" fill="${primaryColor}" />
              <circle cx="57" cy="45" r="7" fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <circle cx="57" cy="45" r="2" fill="${primaryColor}" />
              <path d="M50 45 H50.5" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <polygon points="50,50 48,54 52,54" fill="${accentColor}" stroke="${primaryColor}" stroke-width="1" />
              <polygon points="50,16 68,22 50,28 32,22" fill="var(--ill-cap)" stroke="${primaryColor}" stroke-width="1.5" />
              <rect x="45" y="24" width="10" height="8" fill="var(--ill-cap)" />
              <path d="M60 22 V30 L62 31" fill="none" stroke="${accentColor}" stroke-width="1" />
              <path d="M75 45 L78 48 L84 42" stroke="${accentColor}" stroke-width="2.5" fill="none" stroke-linecap="round" />
            </svg>
          `;
        case 'reading':
          return `
            <svg viewBox="0 0 100 100" class="w-full h-full" style="${styleAttrs}">
              ${bgCircleHtml}
              <rect x="25" y="60" width="40" height="10" rx="2" fill="var(--ill-book1)" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <rect x="28" y="51" width="34" height="9" rx="2" fill="var(--ill-book2)" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <rect x="23" y="69" width="45" height="11" rx="2" fill="var(--ill-book3)" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <path d="M72 75 V45 C72 35, 60 30, 52 35" fill="none" stroke="${primaryColor}" stroke-width="2.5" stroke-linecap="round" />
              <path d="M45 33 L55 38 L52 44 L42 39 Z" fill="var(--ill-lamp)" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <polygon points="43,41 20,70 55,70 51,44" fill="${accentColor}" opacity="0.25" />
              <circle cx="80" cy="30" r="2" fill="${accentColor}" />
              <circle cx="15" cy="45" r="3" fill="${accentColor}" />
            </svg>
          `;
        case 'figurative':
          return `
            <svg viewBox="0 0 100 100" class="w-full h-full" style="${styleAttrs}">
              ${bgCircleHtml}
              <path d="M25 45 C25 25, 75 25, 75 50 C75 65, 65 75, 45 75 C35 75, 25 65, 25 45 Z" fill="var(--ill-palette-bg)" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              <circle cx="38" cy="62" r="5" fill="${bgColor}" stroke="${primaryColor}" stroke-width="1.5" />
              <circle cx="38" cy="40" r="4" fill="${primaryColor}" />
              <circle cx="50" cy="35" r="4" fill="${accentColor}" />
              <circle cx="62" cy="42" r="4" fill="${primaryColor}" />
              <circle cx="65" cy="55" r="4" fill="${accentColor}" />
              <path d="M25 75 L75 25" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round" />
              <path d="M71 29 L77 23 L79 25 L73 31 Z" fill="${accentColor}" />
              <path d="M15 25 L17 28 L20 25 L17 22 Z" fill="${accentColor}" />
              <path d="M80 65 L82 68 L85 65 L82 62 Z" fill="${accentColor}" />
            </svg>
          `;
        case 'writing':
          return `
            <svg viewBox="0 0 100 100" class="w-full h-full" style="${styleAttrs}">
              ${bgCircleHtml}
              <g transform="rotate(-45 50 50)">
                <rect x="44" y="25" width="12" height="40" rx="1" fill="var(--ill-pencil-body)" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
                <polygon points="44,25 50,12 56,25" fill="${accentColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
                <rect x="44" y="57" width="12" height="8" fill="${primaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" />
              </g>
              <path d="M25 75 C35 70, 45 75, 55 60 C65 45, 75 40, 80 35" fill="none" stroke="${primaryColor}" stroke-dasharray="3 3" stroke-width="2" stroke-linecap="round" />
              <path d="M20 65 C30 63, 40 60, 45 50" fill="none" stroke="${primaryColor}" stroke-dasharray="3 3" stroke-width="1.5" stroke-linecap="round" />
              <polygon points="75,20 76.5,23 79.5,23 77,25 78,28 75,26.5 72,28 73,25 70.5,23 73.5,23" fill="${accentColor}" />
            </svg>
          `;
        default:
          return '';
      }
    }

    // Update dynamic illustration content
    function updateWorksheetIllustration(mode) {
      const container = document.getElementById('ws-illustration-container');
      if (!container) return;

      if (!showIllustrations) {
        container.classList.add('hidden');
        return;
      }

      container.classList.remove('hidden');
      const svgContent = getEducationalIllustrationSVG(mode, currentIllustrationStyle);
      container.innerHTML = svgContent;
    }

    // Intercept lucide.createIcons to automatically refresh worksheet illustrations
    const originalCreateIcons = lucide.createIcons;
    lucide.createIcons = function() {
      if (typeof originalCreateIcons === 'function') {
        originalCreateIcons.apply(this, arguments);
      }
      updateWorksheetIllustration(currentMode);
    };

    // Zoom Controls
    function zoomPreview(delta) {
      currentScale = Math.min(Math.max(0.6, currentScale + delta), 1.4);
      document.getElementById('zoom-wrapper').style.transform = `scale(${currentScale})`;
    }

    function resetZoom() {
      currentScale = 1.0;
      document.getElementById('zoom-wrapper').style.transform = `scale(1.0)`;
    }

    // Reset Textbook Header to Standard Worksheet Header layout
    function resetStandardHeader() {
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

      headerBox.className = "border-b-4 border-[#0e56b2] pb-6 mb-6 flex flex-col items-center justify-center relative select-none pt-2";
      headerBox.innerHTML = `
          <!-- Page info top corners -->
          <div class="absolute top-0 left-0 text-[10px] font-bold text-[#0e56b2] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">Unit: English</div>
          <div class="absolute top-0 right-0 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
            <span>Name:</span>
            <span contenteditable="true" class="min-w-[100px] border-b border-slate-400 inline-block px-1 outline-none font-handwriting text-indigo-700"></span>
          </div>

          <div class="w-full flex items-center justify-between gap-4 max-w-xl mt-3">
            <!-- Cartoon Boy Waving (Highly polished vector art) -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 animate-bounce" style="animation-duration: 3s;">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <path d="M25 40 C25 20, 75 20, 75 40 C75 35, 60 25, 50 25 C40 25, 25 35, 25 40" fill="#2d1500" />
                <path d="M20 40 C20 25, 45 15, 50 15 C55 15, 80 25, 80 40" fill="#1a0b00" />
                <circle cx="28" cy="48" r="6" fill="#fbcfe8" />
                <circle cx="28" cy="48" r="3" fill="#f472b6" />
                <circle cx="72" cy="48" r="6" fill="#fbcfe8" />
                <circle cx="72" cy="48" r="3" fill="#f472b6" />
                <circle cx="50" cy="50" r="22" fill="#fed7aa" />
                <circle cx="38" cy="56" r="3" fill="#f43f5e" opacity="0.4" />
                <circle cx="62" cy="56" r="3" fill="#f43f5e" opacity="0.4" />
                <circle cx="42" cy="48" r="3" fill="#1e293b" />
                <circle cx="42" cy="48" r="1" fill="#ffffff" transform="translate(-1, -1)" />
                <circle cx="58" cy="48" r="3" fill="#1e293b" />
                <circle cx="58" cy="48" r="1" fill="#ffffff" transform="translate(-1, -1)" />
                <path d="M44 58 Q50 64 56 58" stroke="#be123c" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M35 70 C35 70, 50 72, 65 70 L70 85 H30 Z" fill="#0284c7" />
                <path d="M20 70 Q10 50 15 45 Q20 40 24 50" fill="#fed7aa" stroke="#0284c7" stroke-width="2" />
                <circle cx="15" cy="43" r="5" fill="#fed7aa" />
              </svg>
            </div>

            <!-- Central Title Banner -->
            <div class="flex-1 flex flex-col items-center text-center">
              <div id="ws-title" contenteditable="true" class="bg-[#0e56b2] outline-none text-white text-base sm:text-xl font-black px-4 sm:px-8 py-2 sm:py-3.5 rounded-2xl shadow-md tracking-wider uppercase leading-tight min-w-[250px]">
                Worksheet
              </div>
              <div id="ws-subtitle" contenteditable="true" class="border-2 border-[#0e56b2] outline-none text-[#0e56b2] text-[9px] sm:text-[10px] font-black px-4 py-1 rounded-full mt-2 bg-white/90 shadow-sm uppercase tracking-wide">
                English Language Arts
              </div>
              <div id="ws-standard-text" class="hidden"></div>
            </div>

            <!-- Cartoon Girl Waving -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 animate-bounce" style="animation-duration: 3s; animation-delay: 0.5s;">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle cx="24" cy="35" r="10" fill="#b45309" />
                <circle cx="76" cy="35" r="10" fill="#b45309" />
                <path d="M25 40 C25 20, 75 20, 75 40" fill="#d97706" />
                <circle cx="50" cy="48" r="22" fill="#fed7aa" />
                <circle cx="38" cy="54" r="3.5" fill="#f43f5e" opacity="0.4" />
                <circle cx="62" cy="54" r="3.5" fill="#f43f5e" opacity="0.4" />
                <circle cx="42" cy="46" r="3" fill="#1e293b" />
                <circle cx="58" cy="46" r="3" fill="#1e293b" />
                <path d="M44 56 Q50 62 56 56" stroke="#be123c" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <path d="M30 35 L35 32" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" />
                <path d="M70 35 L65 32" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" />
                <path d="M35 68 C35 68, 50 70, 65 68 L70 85 H30 Z" fill="#ec4899" />
                <path d="M80 68 Q90 48 85 43 Q80 38 76 48" fill="#fed7aa" stroke="#ec4899" stroke-width="2" />
                <circle cx="85" cy="41" r="5" fill="#fed7aa" />
              </svg>
            </div>
          </div>
      `;
    }  
      const teacherName = document.getElementById('teacher-name-input').value;
      updateTeacherHeader(teacherName);
    }

    // Interactive Slideshow Presentation Engine
    function setViewMode(mode) {
      viewMode = mode;
      const btnWorksheet = document.getElementById('btn-view-worksheet');
      const btnPresentation = document.getElementById('btn-view-presentation');
      const zoomWrapper = document.getElementById('zoom-wrapper');
      const presentationContainer = document.getElementById('presentation-container');
      
      if (mode === 'worksheet') {
        btnWorksheet.className = "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all bg-indigo-600 text-white shadow";
        btnPresentation.className = "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all text-slate-400 hover:text-slate-200";
        if (zoomWrapper) zoomWrapper.classList.remove('hidden');
        if (presentationContainer) presentationContainer.classList.add('hidden');
        
        const splitBtn = document.getElementById('btn-split-page');
        if (splitBtn) splitBtn.classList.remove('hidden');
      } else {
        btnWorksheet.className = "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all text-slate-400 hover:text-slate-200";
        btnPresentation.className = "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all bg-indigo-600 text-white shadow";
        if (zoomWrapper) zoomWrapper.classList.add('hidden');
        if (presentationContainer) presentationContainer.classList.remove('hidden');
        
        const splitBtn = document.getElementById('btn-split-page');
        if (splitBtn) splitBtn.classList.add('hidden');
        
        generatePresentationSlides();
        currentSlideIndex = 0;
        renderCurrentSlide();
        setTimeout(init3DSwipeHandlers, 50);
      }
    }

    function generatePresentationSlides() {
      presentationSlides = [];
      
      const titleEl = document.getElementById('ws-title-display');
      const titleText = titleEl ? titleEl.innerText : 'English Class Session';
      
      const teacherEl = document.getElementById('ws-teacher-display');
      const teacherName = teacherEl ? teacherEl.innerText : 'Mr.Zaafouri Abdelmalek';

      // Title Slide
      presentationSlides.push({
        layout: 'title',
        title: titleText,
        subtitle: `Presented by ${teacherName} • Interactive Smartboard Lesson`,
        footer: 'Press Next to begin'
      });

      if (currentMode === 'showcase') {
        // Tunisian Grade 6 Textbook Slide Deck
        presentationSlides.push({
          layout: 'bullets',
          title: "Unit 4: Caring — We are stronger together",
          subtitle: "Lesson 3: Jobs in Our Village",
          bullets: [
            "🎯 Learning Objective: Identify community helpers and build professional titles using the suffix '-er'.",
            "🤝 Cooperative Value: Helping others is the source of strength in any village community.",
            "🏠 Village Citizens: Each person has a critical role—farming, teaching, carpentry, or building."
          ]
        });

        presentationSlides.push({
          layout: 'split',
          title: "Jobs in Our Village (Reading Circle)",
          subtitle: "Listen closely to the roles of our community helpers",
          leftContent: `
            <div class="text-[11px] leading-relaxed space-y-2 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 font-serif">
              <p>In our countryside village, people cooperative together. <strong>Mr. Ali</strong> is a hard worker. He is a farmer. He produces sweet carrots and fresh potatoes.</p>
              <p><strong>Mr. Hatem</strong> is a carpenter. He works wood with his saw and hammer to make desks for school children.</p>
              <p><strong>Ms. Salma</strong> is a builder. She builds cozy homes with bricks and stone. <strong>Mrs. Emma</strong> is our teacher.</p>
            </div>
          `,
          rightContent: `
            <div class="flex flex-col items-center justify-center h-full bg-slate-50 rounded-lg p-3 border border-slate-100">
              <span class="text-[10px] uppercase font-bold text-sky-700 mb-2">Our Countryside Village</span>
              <svg class="w-20 h-20 text-[#0e56b2]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#f0f9ff" />
                <path d="M20 75 H80" stroke="#0e56b2" stroke-width="2" />
                <rect x="25" y="55" width="20" height="20" fill="#bae6fd" stroke="#0e56b2" />
                <polygon points="25,55 35,42 45,55" fill="#f43f5e" stroke="#0e56b2" />
                <rect x="55" y="50" width="20" height="25" fill="#fed7aa" stroke="#0e56b2" />
                <polygon points="55,50 65,37 75,50" fill="#eab308" stroke="#0e56b2" />
              </svg>
              <span class="text-[10px] text-slate-500 mt-2 text-center">"We are stronger together!"</span>
            </div>
          `
        });

        presentationSlides.push({
          layout: 'bullets',
          title: "Grammar Master: The Suffix '-er'",
          subtitle: "Turn action verbs into nouns representing professions",
          bullets: [
            "Rule: Verb + Suffix '-er' = The Person Who Does the Action.",
            "Farm + <strong>-er</strong> = <strong>Farmer</strong> (A person who works on a farm).",
            "Teach + <strong>-er</strong> = <strong>Teacher</strong> (A person who teaches in a school).",
            "Build + <strong>-er</strong> = <strong>Builder</strong> (A person who builds cozy houses)."
          ]
        });

        presentationSlides.push({
          layout: 'activity',
          title: "Smartboard Quiz: Comprehension",
          subtitle: "Discuss as a class and call students to answer!",
          activityHtml: `
            <div class="space-y-3 font-sans">
              <div class="bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100">
                <span class="text-xs font-bold text-indigo-900">Q1. What does Mr. Ali produce on his farm?</span>
              </div>
              <div class="bg-violet-50/50 p-2.5 rounded-lg border border-violet-100">
                <span class="text-xs font-bold text-violet-900">Q2. Who builds homes with bricks and stone?</span>
              </div>
              <div class="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                <span class="text-xs font-bold text-amber-900">Q3. Why does Mr. Hatem use a saw and hammer?</span>
              </div>
            </div>
          `,
          answersRevealedHtml: `
            <div class="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1.5 text-xs text-emerald-850 font-sans font-medium animate-fade-in">
              <h5 class="font-extrabold uppercase text-[10px] text-emerald-800">★ Solutions Guide ★</h5>
              <p>✔ Q1: He produces sweet carrots and fresh potatoes.</p>
              <p>✔ Q2: Ms. Salma is the builder.</p>
              <p>✔ Q3: To work wood and build desks for school children.</p>
            </div>
          `
        });

        presentationSlides.push({
          layout: 'activity',
          title: "True or False Interactive Grid",
          subtitle: "Decide whether each helper statement is True (T) or False (F)",
          activityHtml: `
            <table class="w-full text-xs font-sans border-collapse">
              <thead>
                <tr class="bg-slate-100 text-left border-b border-slate-300">
                  <th class="p-2 font-bold text-slate-700">Helper Statement</th>
                  <th class="p-2 font-bold text-slate-700 text-center">Class Guess</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr>
                  <td class="p-2 text-slate-800">1. Mr. Hatem is a builder who lays stone bricks.</td>
                  <td class="p-2 text-center text-slate-400 font-bold">[ True / False ]</td>
                </tr>
                <tr>
                  <td class="p-2 text-slate-800">2. Cooperative helpers make the village stronger.</td>
                  <td class="p-2 text-center text-slate-400 font-bold">[ True / False ]</td>
                </tr>
                <tr>
                  <td class="p-2 text-slate-800">3. Mrs. Emma teaches children in the school.</td>
                  <td class="p-2 text-center text-slate-400 font-bold">[ True / False ]</td>
                </tr>
              </tbody>
            </table>
          `,
          answersRevealedHtml: `
            <div class="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-850 font-sans font-medium animate-fade-in">
              <h5 class="font-extrabold uppercase text-[10px] text-emerald-800">★ Solutions Guide ★</h5>
              <p>✖ Statement 1: False (Mr. Hatem is the carpenter, Ms. Salma is the builder).</p>
              <p>✔ Statement 2: True (Strength is in cooperating together!).</p>
              <p>✔ Statement 3: True (Mrs. Emma is our beloved teacher).</p>
            </div>
          `
        });

      } else {
        const modeTitle = currentMode.charAt(0).toUpperCase() + currentMode.slice(1);
        
        presentationSlides.push({
          layout: 'bullets',
          title: `${modeTitle} Learning Block`,
          subtitle: 'Active Study Guide',
          bullets: [
            "👨‍🏫 Teacher Instructions: Match terminology correctly and fill out responses.",
            "📚 Student Task: Read each sentence carefully and identify context clues.",
            "💡 Classroom Smartboard Tip: Use interactive drawing tool to link terms!"
          ]
        });

        const exercises = document.querySelectorAll('#worksheet-body .exercise-block, #worksheet-body .ws-card');
        if (exercises.length > 0) {
          exercises.forEach((ex, idx) => {
            const heading = ex.querySelector('h3, h4')?.innerText || `Exercise Part ${idx + 1}`;
            const questionsText = Array.from(ex.querySelectorAll('.question-item, li')).map(q => q.innerText).slice(0, 3);
            
            presentationSlides.push({
              layout: 'bullets',
              title: heading,
              subtitle: `Active Whiteboard Challenge ${idx + 1}`,
              bullets: questionsText.length > 0 ? questionsText : ["Analyze context clues for ELA development.", "Fill out respective answers on printed handouts."]
            });
          });
        }
      }
    }

    function renderCurrentSlide() {
      const wrapper = document.getElementById('slide-content-wrapper');
      if (!wrapper || presentationSlides.length === 0) return;
      
      const slide = presentationSlides[currentSlideIndex];
      const counter = document.getElementById('slide-number-display');
      if (counter) {
        counter.innerText = `Slide ${currentSlideIndex + 1} of ${presentationSlides.length}`;
      }
      
      let html = '';
      
      if (slide.layout === 'title') {
        html = `
          <div class="flex-1 flex flex-col justify-center items-center text-center py-8">
            <span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase rounded-full tracking-wider mb-4 animate-slide-up">Presentation Mode</span>
            <h1 class="text-3xl font-black text-slate-950 font-sans tracking-tight mb-3 leading-tight animate-slide-up delay-150">${slide.title}</h1>
            <p class="text-xs text-slate-500 font-medium max-w-md animate-slide-up delay-300">${slide.subtitle}</p>
          </div>
        `;
      } else if (slide.layout === 'bullets') {
        const bulletList = slide.bullets.map((b, idx) => {
          const delays = ['delay-150', 'delay-225', 'delay-300', 'delay-375', 'delay-450'];
          const delayClass = delays[idx] || 'delay-525';
          return `<li class="text-sm font-medium leading-relaxed text-slate-800 flex items-start gap-2.5 animate-bullet-in ${delayClass}">
            <span class="text-indigo-600 font-extrabold mt-0.5">•</span>
            <div>${b}</div>
          </li>`;
        }).join('');
        
        html = `
          <div class="flex-1 flex flex-col justify-between py-2">
            <div>
              <span class="text-[9px] uppercase font-bold text-indigo-600 tracking-wider animate-slide-up">${slide.subtitle || 'Classroom Discussion'}</span>
              <h2 class="text-xl font-bold text-slate-900 mt-1 mb-5 font-sans border-b pb-2 border-slate-100 animate-slide-up delay-75">${slide.title}</h2>
            </div>
            <ul class="space-y-4 flex-1">
              ${bulletList}
            </ul>
          </div>
        `;
      } else if (slide.layout === 'split') {
        html = `
          <div class="flex-1 flex flex-col justify-between py-2">
            <div>
              <span class="text-[9px] uppercase font-bold text-indigo-600 tracking-wider animate-slide-up">${slide.subtitle}</span>
              <h2 class="text-xl font-bold text-slate-900 mt-1 mb-4 font-sans border-b pb-2 border-slate-100 animate-slide-up delay-75">${slide.title}</h2>
            </div>
            <div class="grid grid-cols-2 gap-6 flex-1 items-stretch">
              <div class="flex flex-col justify-center animate-slide-up delay-150">${slide.leftContent}</div>
              <div class="flex flex-col justify-center animate-slide-up delay-300">${slide.rightContent}</div>
            </div>
          </div>
        `;
      } else if (slide.layout === 'activity') {
        html = `
          <div class="flex-1 flex flex-col justify-between py-2">
            <div>
              <span class="text-[9px] uppercase font-bold text-indigo-600 tracking-wider animate-slide-up">${slide.subtitle}</span>
              <h2 class="text-xl font-bold text-slate-900 mt-1 mb-4 font-sans border-b pb-2 border-slate-100 animate-slide-up delay-75">${slide.title}</h2>
            </div>
            <div class="flex-1 animate-slide-up delay-150">
              ${slide.activityHtml}
              ${revealSlideAnswers && slide.answersRevealedHtml ? slide.answersRevealedHtml : ''}
            </div>
          </div>
        `;
      }
      
      wrapper.innerHTML = html;
      
      const btnAnswers = document.getElementById('btn-slide-answers');
      const labelAnswers = document.getElementById('label-slide-answers');
      if (btnAnswers && labelAnswers) {
        if (revealSlideAnswers) {
          btnAnswers.className = "py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all";
          labelAnswers.innerText = "Hide Answers";
        } else {
          btnAnswers.className = "py-1.5 px-3 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all";
          labelAnswers.innerText = "Reveal Answers";
        }
      }

      // Update dynamic presenter notes
      const notesContent = document.getElementById('presenter-notes-content');
      if (notesContent) {
        let noteText = '';
        if (slide.layout === 'title') {
          noteText = "Welcome students to today's English lesson. Keep this slide visible as students enter the room. Explain that today's focus is on reading, grammar, and building context comprehension.";
        } else if (slide.layout === 'bullets') {
          noteText = `Lead a group recitation focusing on "${slide.title}". Read the first point aloud and prompt a student to guess how this connects to the general objective. Each list point builds vocabulary sequentially.`;
        } else if (slide.layout === 'split') {
          noteText = "Ask student volunteers to read the left-hand text in a clean reading circle. Use the right-hand vector diagram to visually anchor the vocabulary definitions before writing sentences.";
        } else if (slide.layout === 'activity') {
          noteText = "Interactive smartboard challenge! Direct student volunteers to tap, write, or fill in their answers on the projector. Click 'Reveal Answers' below once the discussion has finished.";
        } else {
          noteText = `Review this slide block together. Emphasize: "${slide.title}". Instruct students to take notes of key terms and rules in their exercise books.`;
        }
        notesContent.innerText = noteText;
      }
      
      lucide.createIcons();
    }

    // Initialize 3D Swipe and Gestures Physics on the presentation slider
    let isDraggingSlide = false;
    let slideStartX = 0;
    let slideCurrentX = 0;
    
    function init3DSwipeHandlers() {
      const viewport = document.getElementById('slide-3d-viewport');
      const slideBox = document.getElementById('presentation-slide-box');
      if (!viewport || !slideBox) return;

      // Mouse drag handlers
      viewport.addEventListener('mousedown', startSlideDrag);
      window.addEventListener('mousemove', moveSlideDrag);
      window.addEventListener('mouseup', endSlideDrag);

      // Touch swipe handlers
      viewport.addEventListener('touchstart', startSlideTouch, { passive: true });
      viewport.addEventListener('touchmove', moveSlideTouch, { passive: false });
      viewport.addEventListener('touchend', endSlideTouch);

      // Mouse move spotlight tracking
      viewport.addEventListener('mousemove', (e) => {
        if (spotlightActive) {
          const mask = document.getElementById('smartboard-spotlight-mask');
          if (mask) {
            const rect = viewport.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            mask.style.background = `radial-gradient(circle 100px at ${x}px ${y}px, transparent 100%, rgba(15, 23, 42, 0.85) 100%)`;
          }
        }
      });

      // Touch spotlight tracking
      viewport.addEventListener('touchmove', (e) => {
        if (spotlightActive && e.touches.length > 0) {
          const mask = document.getElementById('smartboard-spotlight-mask');
          if (mask) {
            const rect = viewport.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            mask.style.background = `radial-gradient(circle 100px at ${x}px ${y}px, transparent 100%, rgba(15, 23, 42, 0.85) 100%)`;
          }
        }
      }, { passive: false });
    }

    function startSlideDrag(e) {
      if (e.target.closest('button') || e.target.closest('select') || e.target.closest('input')) return;
      isDraggingSlide = true;
      slideStartX = e.clientX;
      slideCurrentX = e.clientX;
      
      const slideBox = document.getElementById('presentation-slide-box');
      if (slideBox) {
        slideBox.style.transition = 'none';
      }
    }

    function moveSlideDrag(e) {
      if (!isDraggingSlide) return;
      slideCurrentX = e.clientX;
      update3DDragPhysics();
    }

    function endSlideDrag(e) {
      if (!isDraggingSlide) return;
      isDraggingSlide = false;
      resolveSlideSwipe();
    }

    function startSlideTouch(e) {
      if (e.target.closest('button') || e.target.closest('select') || e.target.closest('input')) return;
      isDraggingSlide = true;
      slideStartX = e.touches[0].clientX;
      slideCurrentX = e.touches[0].clientX;
      
      const slideBox = document.getElementById('presentation-slide-box');
      if (slideBox) {
        slideBox.style.transition = 'none';
      }
    }

    function moveSlideTouch(e) {
      if (!isDraggingSlide) return;
      slideCurrentX = e.touches[0].clientX;
      e.preventDefault();
      update3DDragPhysics();
    }

    function endSlideTouch(e) {
      if (!isDraggingSlide) return;
      isDraggingSlide = false;
      resolveSlideSwipe();
    }

    function update3DDragPhysics() {
      const slideBox = document.getElementById('presentation-slide-box');
      const stackMid = document.getElementById('slide-stack-mid');
      const stackDeep = document.getElementById('slide-stack-deep');
      const viewport = document.getElementById('slide-3d-viewport');
      if (!slideBox || !viewport) return;

      const viewportWidth = viewport.clientWidth || 800;
      const deltaX = slideCurrentX - slideStartX;
      const percentage = Math.min(Math.max(deltaX / viewportWidth, -1), 1);

      // 3D Matrix transform rules (translation + multi-axis perspective rotations)
      const transX = deltaX;
      const rotateY = percentage * 40; 
      const rotateZ = percentage * -8; 
      const translateZ = -Math.abs(percentage) * 150; 

      slideBox.style.transform = `translate3d(${transX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;

      // Animate background stacks responding dynamically in reverse
      if (stackMid) {
        const stackX = -percentage * 15;
        const stackZ = -60 + (Math.abs(percentage) * 40);
        const scale = 0.98 + (Math.abs(percentage) * 0.02);
        stackMid.style.transform = `translate3d(${stackX}px, 8px, ${stackZ}px) scale(${scale})`;
      }
      if (stackDeep) {
        const stackX = -percentage * 25;
        const stackZ = -120 + (Math.abs(percentage) * 60);
        const scale = 0.95 + (Math.abs(percentage) * 0.03);
        stackDeep.style.transform = `translate3d(${stackX}px, 16px, ${stackZ}px) scale(${scale})`;
      }
    }

    function resolveSlideSwipe() {
      const slideBox = document.getElementById('presentation-slide-box');
      const stackMid = document.getElementById('slide-stack-mid');
      const stackDeep = document.getElementById('slide-stack-deep');
      const viewport = document.getElementById('slide-3d-viewport');
      if (!slideBox || !viewport) return;

      const deltaX = slideCurrentX - slideStartX;
      const threshold = (viewport.clientWidth || 800) * 0.20; 

      // Restore transitions
      slideBox.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      if (stackMid) stackMid.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      if (stackDeep) stackDeep.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      if (deltaX < -threshold) {
        if (currentSlideIndex < presentationSlides.length - 1) {
          slideBox.style.transform = 'translate3d(-120%, -30px, -250px) rotateY(-75deg) rotateZ(-20deg)';
          slideBox.style.opacity = '0';
          setTimeout(() => {
            currentSlideIndex++;
            renderCurrentSlide();
            slideBox.style.transition = 'none';
            slideBox.style.transform = 'translate3d(120%, 30px, -250px) rotateY(75deg) rotateZ(20deg)';
            slideBox.style.opacity = '0';
            slideBox.offsetHeight; // Force reflow
            slideBox.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15)';
            slideBox.style.transform = 'translate3d(0, 0, 0) rotateY(0) rotateZ(0)';
            slideBox.style.opacity = '1';
            resetStackElements();
          }, 250);
        } else {
          bounceSlideBack();
        }
      } else if (deltaX > threshold) {
        if (currentSlideIndex > 0) {
          slideBox.style.transform = 'translate3d(120%, -30px, -250px) rotateY(75deg) rotateZ(20deg)';
          slideBox.style.opacity = '0';
          setTimeout(() => {
            currentSlideIndex--;
            renderCurrentSlide();
            slideBox.style.transition = 'none';
            slideBox.style.transform = 'translate3d(-120%, 30px, -250px) rotateY(-75deg) rotateZ(-20deg)';
            slideBox.style.opacity = '0';
            slideBox.offsetHeight; // Force reflow
            slideBox.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15)';
            slideBox.style.transform = 'translate3d(0, 0, 0) rotateY(0) rotateZ(0)';
            slideBox.style.opacity = '1';
            resetStackElements();
          }, 250);
        } else {
          bounceSlideBack();
        }
      } else {
        bounceSlideBack();
      }
    }

    function bounceSlideBack() {
      const slideBox = document.getElementById('presentation-slide-box');
      if (slideBox) {
        slideBox.style.transform = 'translate3d(0, 0, 0) rotateY(0) rotateZ(0)';
        slideBox.style.opacity = '1';
      }
      resetStackElements();
    }

    function resetStackElements() {
      const stackMid = document.getElementById('slide-stack-mid');
      const stackDeep = document.getElementById('slide-stack-deep');
      if (stackMid) {
        stackMid.style.transform = 'translate3d(0, 8px, -60px) scale(0.98)';
      }
      if (stackDeep) {
        stackDeep.style.transform = 'translate3d(0, 16px, -120px) scale(0.95)';
      }
    }

    function prevSlide() {
      if (currentSlideIndex > 0) {
        const slideBox = document.getElementById('presentation-slide-box');
        if (slideBox) {
          slideBox.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          slideBox.style.transform = 'translate3d(120%, -30px, -250px) rotateY(75deg) rotateZ(20deg)';
          slideBox.style.opacity = '0';
        }
        setTimeout(() => {
          currentSlideIndex--;
          renderCurrentSlide();
          if (slideBox) {
            slideBox.style.transition = 'none';
            slideBox.style.transform = 'translate3d(-120%, 30px, -250px) rotateY(-75deg) rotateZ(-20deg)';
            slideBox.style.opacity = '0';
            slideBox.offsetHeight;
            slideBox.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15)';
            slideBox.style.transform = 'translate3d(0, 0, 0) rotateY(0) rotateZ(0)';
            slideBox.style.opacity = '1';
          }
          resetStackElements();
        }, 250);
      }
    }
    
    function nextSlide() {
      if (currentSlideIndex < presentationSlides.length - 1) {
        const slideBox = document.getElementById('presentation-slide-box');
        if (slideBox) {
          slideBox.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          slideBox.style.transform = 'translate3d(-120%, -30px, -250px) rotateY(-75deg) rotateZ(-20deg)';
          slideBox.style.opacity = '0';
        }
        setTimeout(() => {
          currentSlideIndex++;
          renderCurrentSlide();
          if (slideBox) {
            slideBox.style.transition = 'none';
            slideBox.style.transform = 'translate3d(120%, 30px, -250px) rotateY(75deg) rotateZ(20deg)';
            slideBox.style.opacity = '0';
            slideBox.offsetHeight;
            slideBox.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15)';
            slideBox.style.transform = 'translate3d(0, 0, 0) rotateY(0) rotateZ(0)';
            slideBox.style.opacity = '1';
          }
          resetStackElements();
        }, 250);
      }
    }
    
    function toggleSlideAnswers() {
      revealSlideAnswers = !revealSlideAnswers;
      renderCurrentSlide();
    }
    
    function applySlideTheme(theme) {
      const box = document.getElementById('presentation-slide-box');
      if (!box) return;
      
      box.classList.remove('slide-theme-clean', 'slide-theme-chalkboard', 'slide-theme-midnight', 'slide-theme-warm');
      box.classList.add(theme);
      currentSlideTheme = theme;
    }
    
    function printSlides() {
      document.body.classList.add('print-slideshow-active');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('print-slideshow-active');
      }, 1000);
    }

    // Presenter Speaking Notes Toggle
    function togglePresenterNotes() {
      const notesPanel = document.getElementById('presenter-notes-panel');
      const notesChevron = document.getElementById('notes-chevron');
      const notesBadge = document.getElementById('notes-badge');
      if (!notesPanel || !notesChevron) return;

      const isCollapsed = notesPanel.classList.contains('max-h-[44px]');
      if (isCollapsed) {
        notesPanel.classList.remove('max-h-[44px]');
        notesPanel.classList.add('max-h-[300px]');
        notesChevron.style.transform = 'rotate(180deg)';
        if (notesBadge) notesBadge.innerText = 'Expanded';
      } else {
        notesPanel.classList.add('max-h-[44px]');
        notesPanel.classList.remove('max-h-[300px]');
        notesChevron.style.transform = 'rotate(0deg)';
        if (notesBadge) notesBadge.innerText = 'Lecture Guide';
      }
    }

    // Smartboard Spotlight Mask Controls
    let spotlightActive = false;
    function toggleSpotlight() {
      spotlightActive = !spotlightActive;
      const mask = document.getElementById('smartboard-spotlight-mask');
      const btn = document.getElementById('btn-slide-spotlight');
      const viewport = document.getElementById('slide-3d-viewport');
      if (!mask) return;

      if (spotlightActive) {
        mask.classList.remove('opacity-0');
        mask.classList.add('opacity-100');
        if (btn) {
          btn.className = "py-1.5 px-3 bg-amber-600 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all";
        }
        showToast('Spotlight Activated', 'Move mouse or touch screen to slide flashlight over key details.', 'flashlight');
        
        // Initial gradient focus at the center
        mask.style.background = `radial-gradient(circle 100px at 50% 50%, transparent 100%, rgba(15, 23, 42, 0.85) 100%)`;
      } else {
        mask.classList.add('opacity-0');
        mask.classList.remove('opacity-100');
        if (btn) {
          btn.className = "py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all";
        }
      }
    }

    // 3D Interactive Vocabulary Flashcard controls
    let vocabFlashcardsActive = false;
    let activeVocabIndex = 0;
    let vocabList = [];

    function toggleVocabFlashcards() {
      vocabFlashcardsActive = !vocabFlashcardsActive;
      const overlay = document.getElementById('slide-flashcards-overlay');
      const btn = document.getElementById('btn-slide-flashcards');
      if (!overlay) return;

      if (vocabFlashcardsActive) {
        // Load words based on teacher grade-level selector
        const gradeLevel = document.getElementById('grade-level-select')?.value || 'intermediate';
        vocabList = vocabData[gradeLevel] || vocabData.intermediate;
        activeVocabIndex = 0;
        
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        if (btn) {
          btn.className = "py-1.5 px-3 bg-emerald-600 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all";
        }
        
        renderVocabCard();
        showToast('3D Vocab Deck', 'Interactive cards initialized. Click card to flip, use arrow buttons to navigate.', 'layers');
      } else {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
        if (btn) {
          btn.className = "py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all";
        }
      }
    }

    function flipVocabCard() {
      const inner = document.getElementById('vocab-card-inner');
      if (!inner) return;
      const isFlipped = inner.style.transform === 'rotateY(180deg)';
      inner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
    }

    function renderVocabCard() {
      if (vocabList.length === 0) return;
      const currentWord = vocabList[activeVocabIndex];
      
      const frontWord = document.getElementById('vocab-card-front-word');
      const backDef = document.getElementById('vocab-card-back-definition');
      const cardCount = document.getElementById('vocab-card-count');
      const partOfSpeech = document.getElementById('vocab-card-part-of-speech');
      const inner = document.getElementById('vocab-card-inner');

      // Reset flip state
      if (inner) inner.style.transform = 'rotateY(0deg)';

      if (frontWordFront = frontWord) frontWordFront.innerText = currentWord.word;
      if (backDefBack = backDef) backDefBack.innerText = currentWord.meaning;
      if (cardCountCount = cardCount) cardCountCount.innerText = `Word ${activeVocabIndex + 1} of ${vocabList.length}`;
      
      if (partOfSpeech) {
        const word = currentWord.word.toLowerCase();
        let pos = "Noun";
        if (word.endsWith('ent') || word.endsWith('ous') || word.endsWith('ic') || word.endsWith('ble')) pos = "Adjective";
        else if (word.endsWith('ly')) pos = "Adverb";
        else if (word.endsWith('ate') || word.endsWith('ere') || word.endsWith('ver')) pos = "Verb";
        partOfSpeech.innerText = `Parts of Speech: ${pos}`;
      }
    }

    function nextVocabCard() {
      if (activeVocabIndex < vocabList.length - 1) {
        activeVocabIndex++;
        renderVocabCard();
      } else {
        showToast('End of Deck', 'You reached the end of the vocabulary card list.', 'info');
      }
    }

    function prevVocabCard() {
      if (activeVocabIndex > 0) {
        activeVocabIndex--;
        renderVocabCard();
      }
    }

    function regenerateCurrentMode() {
      if (currentMode === 'vocabulary') generateVocabularyWorksheet();
      else if (currentMode === 'grammar') generateGrammarWorksheet();
      else if (currentMode === 'proofreading') generateProofreadingWorksheet();
      else if (currentMode === 'reading') generateReadingWorksheet();
      else if (currentMode === 'figurative') generateFigurativeLanguageWorksheet();
      else if (currentMode === 'writing') generateWritingWorksheet();
      else if (currentMode === 'textbook') generateTextbookShowcase();
    }

    // VOCABULARY & WORD MATCH GENERATOR
    function generateVocabularyWorksheet() {
      resetStandardHeader();
      currentMode = 'vocabulary';
      document.getElementById('active-mode-badge').innerText = 'Vocabulary';

      document.getElementById('ws-title').innerText = 'English Vocabulary & Context Clues';
      document.getElementById('ws-subtitle').innerText = 'Review the word bank, then match each target vocabulary word to its correct context or definition.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.L.5.4 • Determine or clarify the meaning of unknown words using context clues and word definitions.';

      const grade = document.getElementById('grade-level-select').value;
      const count = parseInt(document.getElementById('item-count-select').value, 10);
      const items = (vocabData[grade] || vocabData['intermediate']).slice(0, count);

      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-5 animate-fade-in';

      // Word Bank Box
      const wordBank = document.createElement('div');
      wordBank.className = 'p-3.5 rounded-xl border-2 border-indigo-200 bg-indigo-50/50 space-y-2';
      wordBank.innerHTML = `
        <div class="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
          <i data-lucide="box" class="w-4 h-4 text-indigo-600"></i> Vocabulary Word Bank
        </div>
        <div class="flex flex-wrap gap-2 pt-1" contenteditable="true">
          ${items.map(i => `<span class="px-2.5 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-semibold text-indigo-950 shadow-sm">${i.word}</span>`).join('')}
        </div>
      `;
      body.appendChild(wordBank);

      // Question Items
      const questionsContainer = document.createElement('div');
      questionsContainer.className = 'space-y-3.5 pt-1';

      items.forEach((item, index) => {
        const qBox = document.createElement('div');
        qBox.className = 'p-3 rounded-lg border border-slate-200 bg-slate-50/40 space-y-2 text-xs leading-relaxed';
        qBox.innerHTML = `
          <div class="flex items-start justify-between gap-2">
            <span class="font-bold text-slate-800">${index + 1}.</span>
            <div class="flex-1 text-slate-800" contenteditable="true">
              Definition: <span class="italic text-slate-700">"${item.meaning}"</span>
            </div>
            <span class="text-[10px] text-slate-400 font-mono">1 pt</span>
          </div>
          <div class="flex items-center gap-2 pt-1 text-slate-700">
            <span class="font-medium text-indigo-900">Answer Word:</span>
            <span class="border-b-2 border-slate-800 min-w-[180px] inline-block px-2 ${showAnswerKey ? 'text-red-600 font-bold' : 'text-transparent'}" contenteditable="true">
              ${showAnswerKey ? item.word : '___________'}
            </span>
          </div>
        `;
        questionsContainer.appendChild(qBox);
      });

      body.appendChild(questionsContainer);
      lucide.createIcons();
      showToast('Vocabulary Generated', `Loaded ${items.length} vocabulary questions.`);
    }

    // GRAMMAR & SYNTAX GENERATOR
    function generateGrammarWorksheet() {
      resetStandardHeader();
      currentMode = 'grammar';
      document.getElementById('active-mode-badge').innerText = 'Grammar';

      document.getElementById('ws-title').innerText = 'English Grammar & Usage Practice';
      document.getElementById('ws-subtitle').innerText = 'Select the correct word form in parentheses to complete each grammatically correct sentence.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.L.5.1 • Demonstrate command of the conventions of standard English grammar and usage when writing or speaking.';

      const count = parseInt(document.getElementById('item-count-select').value, 10);
      const items = grammarData.slice(0, count);

      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-3.5 animate-fade-in pt-1';

      items.forEach((item, index) => {
        const qBox = document.createElement('div');
        qBox.className = 'p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col gap-1.5 text-xs text-slate-800';
        qBox.innerHTML = `
          <div class="flex justify-between items-center text-slate-400 text-[10px] uppercase font-semibold">
            <span>Question ${index + 1}</span>
            <span class="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200">${item.concept}</span>
          </div>
          <p class="text-xs font-medium leading-relaxed text-slate-900 pt-0.5" contenteditable="true">
            ${index + 1}. ${item.sentence}
          </p>
          <div class="flex items-center gap-2 pt-1 border-t border-slate-200/80 text-slate-600">
            <span>Correct choice:</span>
            <span contenteditable="true" class="border-b-2 border-slate-700 min-w-[140px] px-2 ${showAnswerKey ? 'text-red-600 font-bold' : 'text-transparent'}">
              ${showAnswerKey ? item.target : '__________'}
            </span>
          </div>
        `;
        body.appendChild(qBox);
      });

      lucide.createIcons();
      showToast('Grammar Generated', `Created ${items.length} grammar exercises.`);
    }

    // PUNCTUATION & PROOFREADING GENERATOR
    function generateProofreadingWorksheet() {
      resetStandardHeader();
      currentMode = 'proofreading';
      document.getElementById('active-mode-badge').innerText = 'Punctuation';

      document.getElementById('ws-title').innerText = 'Editing & Proofreading Drills';
      document.getElementById('ws-subtitle').innerText = 'Rewrite each incorrect sentence below, correcting capitalization, punctuation, and spelling errors.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.L.6.2 • Demonstrate command of the conventions of standard English capitalization, punctuation, and spelling.';

      const count = parseInt(document.getElementById('item-count-select').value, 10);
      const items = proofreadingData.slice(0, count);

      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-4 animate-fade-in pt-1';

      items.forEach((item, index) => {
        const qBox = document.createElement('div');
        qBox.className = 'p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2 text-xs text-slate-800';
        qBox.innerHTML = `
          <div class="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase">
            <span>Sentence ${index + 1}</span>
            <span class="bg-pink-50 text-pink-700 px-2 py-0.5 rounded border border-pink-200">${item.rule}</span>
          </div>
          <p class="text-xs font-medium text-slate-900 bg-amber-50/60 p-2 rounded border border-amber-200/60" contenteditable="true">
            "${item.incorrect}"
          </p>
          <div class="pt-1">
            <span class="text-[11px] font-semibold text-slate-700 block mb-1">Corrected Sentence:</span>
            <div contenteditable="true" class="border-b-2 border-slate-700 min-h-[28px] py-0.5 px-1 ${showAnswerKey ? 'text-red-600 font-semibold' : 'text-slate-800'}">
              ${showAnswerKey ? item.correct : ''}
            </div>
          </div>
        `;
        body.appendChild(qBox);
      });

      lucide.createIcons();
      showToast('Punctuation Drills Generated', `Loaded ${items.length} proofreading sentences.`);
    }

    // READING COMPREHENSION GENERATOR
    function generateReadingWorksheet() {
      resetStandardHeader();
      currentMode = 'reading';
      document.getElementById('active-mode-badge').innerText = 'Reading';

      document.getElementById('ws-title').innerText = 'Reading Comprehension & Evidence';
      document.getElementById('ws-subtitle').innerText = 'Read the passage carefully, then answer the comprehension questions using text evidence.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.RL.5.1 • Quote accurately from a text when explaining what the text says explicitly and when drawing inferences.';

      const story = readingStories[Math.floor(Math.random() * readingStories.length)];

      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-5 animate-fade-in pt-1';

      // Reading Passage Box
      const storyBox = document.createElement('div');
      storyBox.className = 'p-4 rounded-xl border-2 border-slate-300 bg-amber-50/30 text-slate-900 space-y-2 shadow-sm';
      storyBox.innerHTML = `
        <h3 contenteditable="true" class="text-base font-bold text-slate-900 border-b border-amber-200 pb-1">${story.title}</h3>
        <p contenteditable="true" class="text-xs leading-relaxed text-slate-800 pt-1 font-serif">${story.passage}</p>
      `;
      body.appendChild(storyBox);

      // Questions Box
      const qContainer = document.createElement('div');
      qContainer.className = 'space-y-4 pt-1';

      story.questions.forEach((item, idx) => {
        const qBlock = document.createElement('div');
        qBlock.className = 'space-y-1.5 text-xs text-slate-800';
        qBlock.innerHTML = `
          <p contenteditable="true" class="font-bold text-slate-900">${idx + 1}. ${item.q}</p>
          <div class="space-y-2 pt-1">
            <div contenteditable="true" class="border-b border-slate-300 min-h-[24px] px-1 ${showAnswerKey ? 'text-red-600 font-medium' : ''}">
              ${showAnswerKey ? 'Sample Answer: ' + item.a : ''}
            </div>
            <div class="border-b border-slate-300 h-5"></div>
          </div>
        `;
        qContainer.appendChild(qBlock);
      });

      body.appendChild(qContainer);
      lucide.createIcons();
      showToast('Reading Generated', 'Loaded reading passage and text-evidence questions.');
    }

    // FIGURATIVE LANGUAGE GENERATOR
    function generateFigurativeLanguageWorksheet() {
      resetStandardHeader();
      currentMode = 'figurative';
      document.getElementById('active-mode-badge').innerText = 'Figurative';

      document.getElementById('ws-title').innerText = 'Literary Devices & Figurative Language';
      document.getElementById('ws-subtitle').innerText = 'Identify whether each sentence contains a Simile, Metaphor, Personification, Alliteration, or Hyperbole.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.RL.6.4 • Determine the meaning of words and phrases as they are used in a text, including figurative and connotative meanings.';

      const count = parseInt(document.getElementById('item-count-select').value, 10);
      const items = figurativeData.slice(0, count);

      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-3.5 animate-fade-in pt-1';

      items.forEach((item, index) => {
        const qBox = document.createElement('div');
        qBox.className = 'p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2 text-xs text-slate-800';
        qBox.innerHTML = `
          <div class="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
            <span>Item ${index + 1}</span>
            <span class="bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded border border-cyan-200">Identify Device</span>
          </div>
          <p class="text-xs font-semibold text-slate-900 italic bg-white p-2 rounded border border-slate-200" contenteditable="true">
            "${item.example}"
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-1 text-slate-700">
            <div>
              <span class="font-bold text-slate-800">Literary Device:</span>
              <span contenteditable="true" class="border-b-2 border-slate-800 min-w-[120px] inline-block px-1 ${showAnswerKey ? 'text-red-600 font-bold' : 'text-transparent'}">
                ${showAnswerKey ? item.type : '___________'}
              </span>
            </div>
            <div class="flex-1">
              <span class="font-bold text-slate-800">Why/Explanation:</span>
              <span contenteditable="true" class="border-b-2 border-slate-400 min-w-[180px] inline-block px-1 ${showAnswerKey ? 'text-red-600 font-normal' : 'text-transparent'}">
                ${showAnswerKey ? item.answer : ''}
              </span>
            </div>
          </div>
        `;
        body.appendChild(qBox);
      });

      lucide.createIcons();
      showToast('Figurative Devices Generated', `Created ${items.length} literary device questions.`);
    }

    // WRITING & ESSAY GENERATOR
    function generateWritingWorksheet() {
      resetStandardHeader();
      currentMode = 'writing';
      document.getElementById('active-mode-badge').innerText = 'Writing';

      document.getElementById('ws-title').innerText = 'Guided English Essay & Writing Prompt';
      document.getElementById('ws-subtitle').innerText = 'Write a structured multi-paragraph response using vivid adjectives, strong verb choices, and clear topic sentences.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.W.5.2 • Write informative/explanatory texts to examine a topic and convey ideas clearly.';

      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-5 animate-fade-in pt-1';

      // Writing Prompt Box
      const promptBox = document.createElement('div');
      promptBox.className = 'p-4 rounded-xl border-2 border-amber-300 bg-amber-50/50 text-slate-800 text-xs font-medium leading-relaxed shadow-sm space-y-1';
      promptBox.innerHTML = `
        <div class="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
          <i data-lucide="edit-3" class="w-4 h-4"></i> English Writing Prompt
        </div>
        <p contenteditable="true" class="outline-none text-xs text-slate-900 pt-1">
          Imagine you discovered a hidden room behind a bookshelf in your school library. Write a creative story describing what was inside, using at least 3 descriptive adjectives, 2 action verbs, and proper paragraph structure.
        </p>
      `;
      body.appendChild(promptBox);

      // Essay Outline Structure Box
      const outlineBox = document.createElement('div');
      outlineBox.className = 'p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/40 text-xs space-y-2';
      outlineBox.innerHTML = `
        <span class="font-bold text-indigo-900 uppercase text-[10px] tracking-wider block">Essay Planning Guide:</span>
        <div class="grid grid-cols-3 gap-2 text-[11px] text-slate-700">
          <div class="p-2 bg-white rounded border border-indigo-100">
            <span class="font-bold text-indigo-800 block">1. Introduction:</span>
            <span>Hook & Thesis Statement</span>
          </div>
          <div class="p-2 bg-white rounded border border-indigo-100">
            <span class="font-bold text-indigo-800 block">2. Body Paragraph:</span>
            <span>Sensory details & action</span>
          </div>
          <div class="p-2 bg-white rounded border border-indigo-100">
            <span class="font-bold text-indigo-800 block">3. Conclusion:</span>
            <span>Reflective closing thought</span>
          </div>
        </div>
      `;
      body.appendChild(outlineBox);

      // Handwriting Lines
      const linesContainer = document.createElement('div');
      linesContainer.className = 'space-y-4 pt-1';

      for (let i = 1; i <= 6; i++) {
        const lineBlock = document.createElement('div');
        lineBlock.className = 'relative w-full h-12 border-b-2 border-slate-700 flex flex-col justify-between py-1 group';
        lineBlock.innerHTML = `
          <div class="w-full border-t border-slate-300"></div>
          <div class="w-full border-t-2 border-dashed border-indigo-300/80"></div>
          <div contenteditable="true" class="absolute inset-x-2 top-0.5 text-lg font-handwriting text-slate-400 outline-none">
            ${i === 1 ? 'Start writing your story here...' : ''}
          </div>
        `;
        linesContainer.appendChild(lineBlock);
      }

      body.appendChild(linesContainer);
      lucide.createIcons();
      showToast('Writing Generated', 'Created guided writing and essay outline worksheet.');
    }

    // HIGH-FIDELITY ELA TEXTBOOK SHOWCASE GENERATOR (Matches user's uploaded screenshot)
    function generateTextbookShowcase() {
      currentMode = 'textbook';
      document.getElementById('active-mode-badge').innerText = 'Showcase';

      // 1. Force the premium ELA Book Theme!
      const paper = document.getElementById('worksheet-paper');
      if (paper) {
        // Clear old themes
        const allThemes = [
          'theme-classic-corporate', 'theme-midnight-tech', 'theme-nordic-pastel', 
          'theme-vibrant-gamifier', 'theme-emerald-scholar', 'theme-sunset-minimalist', 
          'theme-cyberpunk-edgy', 'theme-oceanic-trust', 'theme-ela-book'
        ];
        allThemes.forEach(t => paper.classList.remove(t));
        paper.classList.add('theme-ela-book');
        
        // Sync select dropdown
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) themeSelect.value = 'ela-book';
      }

      // Hide the default illustration container as we are rendering bespoke cartoon headers
      const illContainer = document.getElementById('ws-illustration-container');
      if (illContainer) illContainer.classList.add('hidden');

      // 2. Build the exact gorgeous, centered textbook header with Boy & Girl waving
      const headerBox = document.getElementById('worksheet-header');
      if (headerBox) {
        headerBox.className = "border-b-4 border-[#0e56b2] pb-6 mb-6 flex flex-col items-center justify-center relative select-none pt-2";
        headerBox.innerHTML = `
          <!-- Page info top corners -->
          <div class="absolute top-0 left-0 text-[10px] font-bold text-[#0e56b2] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">Unit 4: Caring</div>
          <div class="absolute top-0 right-0 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">Page 2/3</div>

          <div class="w-full flex items-center justify-between gap-4 max-w-xl mt-3">
            <!-- Cartoon Boy Waving (Highly polished vector art) -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 animate-bounce" style="animation-duration: 3s;">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <!-- Hair -->
                <path d="M25 40 C25 20, 75 20, 75 40 C75 35, 60 25, 50 25 C40 25, 25 35, 25 40" fill="#2d1500" />
                <path d="M20 40 C20 25, 45 15, 50 15 C55 15, 80 25, 80 40" fill="#1a0b00" />
                <!-- Ears -->
                <circle cx="28" cy="48" r="6" fill="#fbcfe8" />
                <circle cx="28" cy="48" r="3" fill="#f472b6" />
                <circle cx="72" cy="48" r="6" fill="#fbcfe8" />
                <circle cx="72" cy="48" r="3" fill="#f472b6" />
                <!-- Face -->
                <circle cx="50" cy="50" r="22" fill="#fed7aa" />
                <!-- Blushes -->
                <circle cx="38" cy="56" r="3" fill="#f43f5e" opacity="0.4" />
                <circle cx="62" cy="56" r="3" fill="#f43f5e" opacity="0.4" />
                <!-- Eyes -->
                <circle cx="42" cy="48" r="3" fill="#1e293b" />
                <circle cx="42" cy="48" r="1" fill="#ffffff" transform="translate(-1, -1)" />
                <circle cx="58" cy="48" r="3" fill="#1e293b" />
                <circle cx="58" cy="48" r="1" fill="#ffffff" transform="translate(-1, -1)" />
                <!-- Smile -->
                <path d="M44 58 Q50 64 56 58" stroke="#be123c" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <!-- Cap/Clothes -->
                <path d="M35 70 C35 70, 50 72, 65 70 L70 85 H30 Z" fill="#0284c7" />
                <!-- Waving Arm -->
                <path d="M20 70 Q10 50 15 45 Q20 40 24 50" fill="#fed7aa" stroke="#0284c7" stroke-width="2" />
                <circle cx="15" cy="43" r="5" fill="#fed7aa" />
              </svg>
            </div>

            <!-- Central Title Banner -->
            <div class="flex-1 flex flex-col items-center text-center">
              <div class="bg-[#0e56b2] text-white text-3xl font-black px-12 py-3.5 rounded-2xl shadow-md tracking-wider uppercase">
                Caring
              </div>
              <div class="border-2 border-[#0e56b2] text-[#0e56b2] text-[11px] font-black px-4 py-1 rounded-full mt-2 bg-white/90 shadow-sm uppercase tracking-wide">
                Lesson 3 • We are stronger together
              </div>
            </div>

            <!-- Cartoon Girl Waving (Highly polished vector art) -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 animate-bounce" style="animation-duration: 3s; animation-delay: 0.5s;">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <!-- Hair (Pigtails) -->
                <circle cx="24" cy="35" r="10" fill="#b45309" />
                <circle cx="76" cy="35" r="10" fill="#b45309" />
                <path d="M25 40 C25 20, 75 20, 75 40" fill="#d97706" />
                <!-- Face -->
                <circle cx="50" cy="48" r="22" fill="#fed7aa" />
                <!-- Blushes -->
                <circle cx="38" cy="54" r="3.5" fill="#f43f5e" opacity="0.4" />
                <circle cx="62" cy="54" r="3.5" fill="#f43f5e" opacity="0.4" />
                <!-- Eyes -->
                <circle cx="42" cy="46" r="3" fill="#1e293b" />
                <circle cx="58" cy="46" r="3" fill="#1e293b" />
                <!-- Smile -->
                <path d="M44 56 Q50 62 56 56" stroke="#be123c" stroke-width="2.5" fill="none" stroke-linecap="round" />
                <!-- Hair clips -->
                <path d="M30 35 L35 32" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" />
                <path d="M70 35 L65 32" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" />
                <!-- Pink shirt -->
                <path d="M35 68 C35 68, 50 70, 65 68 L70 85 H30 Z" fill="#ec4899" />
                <!-- Waving Arm -->
                <path d="M80 68 Q90 48 85 43 Q80 38 76 48" fill="#fed7aa" stroke="#ec4899" stroke-width="2" />
                <circle cx="85" cy="41" r="5" fill="#fed7aa" />
              </svg>
            </div>
          </div>
        `;
      }

      // Update Standard text below header
      const stdText = document.getElementById('ws-standard-text');
      if (stdText) {
        stdText.innerText = "CCSS.ELA-LITERACY.RL.4.1 • Refer to details and examples in a text when explaining what the text says explicitly.";
      }

      // 3. Build the textbook body content
      const body = document.getElementById('worksheet-body');
      body.innerHTML = '';
      body.className = 'space-y-6 animate-fade-in pt-1';

      // --- SECTION 1: READING (Jobs in Our Village) ---
      const section1 = document.createElement('div');
      section1.className = 'space-y-3';
      section1.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full bg-[#0e56b2] text-white font-bold flex items-center justify-center text-xs">1</span>
          <span class="bg-[#0e56b2] text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wide">Reading</span>
          <span class="text-xs font-bold text-slate-700">Read the text.</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          <!-- Highly detailed vector illustration of a happy cooperative village -->
          <div class="md:col-span-6 bg-gradient-to-b from-sky-100 to-emerald-50 rounded-xl p-3 border border-sky-200 flex flex-col justify-between shadow-sm min-h-[220px]">
            <span class="text-[9px] font-black uppercase text-sky-800 tracking-wider">Village Helpers Scene</span>
            <div class="w-full h-36 my-auto">
              <svg viewBox="0 0 400 240" class="w-full h-full">
                <!-- Sky Background Gradient -->
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#bae6fd" />
                    <stop offset="100%" stop-color="#f0fdf4" />
                  </linearGradient>
                  <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4ade80" />
                    <stop offset="100%" stop-color="#15803d" />
                  </linearGradient>
                </defs>
                
                <rect x="0" y="0" width="400" height="240" rx="12" fill="url(#skyGrad)" />
                
                <!-- Back hills -->
                <path d="M0 140 Q100 110 200 140 T400 140 L400 240 L0 240 Z" fill="#86efac" opacity="0.6" />
                <path d="M-20 160 Q120 130 260 160 T420 160 L420 240 L-20 240 Z" fill="url(#hillGrad)" />
                
                <!-- Winding Path -->
                <path d="M180 160 Q200 200 160 240 L210 240 Q240 200 220 160 Z" fill="#fef08a" opacity="0.8" />
                
                <!-- Sun -->
                <circle cx="340" cy="40" r="18" fill="#fef08a" />
                <circle cx="340" cy="40" r="14" fill="#fde047" />
                
                <!-- Clouds -->
                <path d="M40 50 C45 42, 60 42, 65 50 C72 50, 75 58, 65 62 C55 62, 45 62, 40 58 C35 55, 35 50, 40 50 Z" fill="#ffffff" opacity="0.9" />
                <path d="M280 45 C285 38, 298 38, 303 45 C309 45, 312 52, 304 56 C296 56, 286 56, 281 52 C276 50, 276 45, 280 45 Z" fill="#ffffff" opacity="0.8" />

                <!-- Cozy Village House (Back) -->
                <rect x="25" y="125" width="45" height="35" rx="3" fill="#fca5a5" />
                <polygon points="20,125 47,105 75,125" fill="#ef4444" />
                <rect x="42" y="137" width="10" height="23" fill="#991b1b" />
                <rect x="30" y="130" width="8" height="8" rx="1" fill="#ffffff" />
                <rect x="56" y="130" width="8" height="8" rx="1" fill="#ffffff" />

                <!-- School House with flag (Back Right) -->
                <rect x="260" y="120" width="60" height="40" rx="3" fill="#fed7aa" />
                <polygon points="255,120 290,100 325,120" fill="#f97316" />
                <!-- School clock / windows -->
                <circle cx="290" cy="113" r="5" fill="#ffffff" stroke="#ea580c" stroke-width="1" />
                <rect x="270" y="135" width="10" height="12" rx="1" fill="#ea580c" />
                <rect x="300" y="135" width="10" height="12" rx="1" fill="#ea580c" />
                <rect x="285" y="142" width="10" height="18" fill="#7c2d12" />

                <!-- Helper 1: Mr Ali (Farmer) - Left foreground -->
                <g transform="translate(65, 175)">
                  <!-- Body & overalls -->
                  <path d="M-8 15 L8 15 L6 35 L-6 35 Z" fill="#15803d" />
                  <circle cx="0" cy="22" r="4" fill="#fef08a" />
                  <!-- Head -->
                  <circle cx="0" cy="6" r="7" fill="#fed7aa" />
                  <circle cx="-2" cy="5" r="1" fill="#1e293b" />
                  <circle cx="2" cy="5" r="1" fill="#1e293b" />
                  <path d="M-2 9 Q0 11 2 9" stroke="#be123c" stroke-width="1" fill="none" />
                  <!-- Straw Hat -->
                  <ellipse cx="0" cy="0" rx="11" ry="3" fill="#ca8a04" />
                  <path d="M-6 -1 Q0 -5 6 -1 Z" fill="#eab308" />
                  <!-- Basket of carrots -->
                  <rect x="-14" y="18" width="11" height="9" rx="1" fill="#b45309" />
                  <!-- Green carrot tops -->
                  <path d="M-12 18 L-13 14 M-10 18 L-10 13 M-8 18 L-7 14" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" />
                </g>

                <!-- Helper 2: Mr Hatem (Carpenter) - Center-Left background-ish -->
                <g transform="translate(140, 160)">
                  <!-- Wooden Workbench -->
                  <rect x="-15" y="20" width="30" height="15" fill="#7c2d12" />
                  <rect x="-12" y="32" width="4" height="12" fill="#451a03" />
                  <rect x="8" y="32" width="4" height="12" fill="#451a03" />
                  <!-- Figure -->
                  <path d="M-6 10 L6 10 L5 24 L-5 24 Z" fill="#ea580c" />
                  <path d="M-4 12 L4 12 L3 24 L-3 24 Z" fill="#78350f" />
                  <circle cx="0" cy="2" r="6" fill="#fed7aa" />
                  <!-- Hair -->
                  <path d="M-6 0 C-4 -4, 4 -4, 6 0 C5 -2, -5 -2, -6 0" fill="#1a0b00" />
                  <!-- Hammer in hand -->
                  <path d="M8 15 L12 11" stroke="#475569" stroke-width="2.5" stroke-linecap="round" />
                  <rect x="11" y="9" width="4" height="3" fill="#1e293b" />
                </g>

                <!-- Helper 3: Ms Salma (Builder) - Center-Right foreground -->
                <g transform="translate(245, 170)">
                  <!-- Brick wall segment -->
                  <rect x="8" y="15" width="22" height="24" fill="#fca5a5" stroke="#f87171" stroke-dasharray="4,2" />
                  <!-- Figure -->
                  <path d="M-7 12 L7 12 L5 32 L-5 32 Z" fill="#2563eb" />
                  <path d="M-6 12 L6 12 L4 26 L-4 26 Z" fill="#ea580c" />
                  <circle cx="0" cy="4" r="6.5" fill="#fed7aa" />
                  <!-- Yellow Hardhat -->
                  <ellipse cx="0" cy="-1" rx="8" ry="2.5" fill="#eab308" />
                  <path d="M-5 -2 C-3 -6, 3 -6, 5 -2 Z" fill="#ca8a04" />
                  <!-- blueprints -->
                  <path d="M-12 18 L-6 24" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
                  <path d="M-11 19 L-5 25" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round" />
                </g>

                <!-- Helper 4: Mrs Emma (Teacher) - Right foreground -->
                <g transform="translate(325, 160)">
                  <!-- Blackboard Easel -->
                  <rect x="-24" y="8" width="18" height="15" rx="1" fill="#1e3a1e" stroke="#78350f" stroke-width="1.5" />
                  <!-- Easel Stand -->
                  <line x1="-20" y1="23" x2="-23" y2="38" stroke="#78350f" stroke-width="2" />
                  <line x1="-10" y1="23" x2="-7" y2="38" stroke="#78350f" stroke-width="2" />
                  <!-- Chalk writing -->
                  <text x="-21" y="18" fill="#ffffff" font-size="6" font-family="sans-serif" font-weight="bold">A B C</text>
                  <!-- Figure -->
                  <path d="M-6 12 L6 12 L5 34 L-5 34 Z" fill="#7c3aed" />
                  <circle cx="0" cy="4" r="6.5" fill="#fed7aa" />
                  <!-- Glasses -->
                  <circle cx="-2.5" cy="4" r="2.2" fill="none" stroke="#1e293b" stroke-width="1" />
                  <circle cx="2.5" cy="4" r="2.2" fill="none" stroke="#1e293b" stroke-width="1" />
                  <line x1="-0.5" y1="4" x2="0.5" y2="4" stroke="#1e293b" stroke-width="1" />
                  <!-- Red Book in hand -->
                  <rect x="4" y="16" width="6" height="8" rx="0.5" fill="#dc2626" />
                  <rect x="5" y="16" width="1" height="8" fill="#fecdd3" />
                </g>

                <!-- Children playing with Giant 3D Dice - Center Bottom -->
                <g transform="translate(195, 205)">
                  <!-- Giant White 3D Dice -->
                  <path d="M-10 0 L10 0 L10 18 L-10 18 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
                  <path d="M-10 0 L-2 -6 L18 -6 L10 0 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
                  <path d="M10 0 L18 -6 L18 12 L10 18 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1" />
                  <!-- Dice dots -->
                  <circle cx="0" cy="9" r="2" fill="#be123c" />
                  <circle cx="5" cy="-3" r="1.2" fill="#1e293b" />
                  <circle cx="10" cy="-3" r="1.2" fill="#1e293b" />
                  <circle cx="14" cy="6" r="1.2" fill="#1e293b" />
                  <circle cx="14" cy="2" r="1.2" fill="#1e293b" />
                  
                  <!-- Child Left (Sami) -->
                  <g transform="translate(-24, -12)">
                    <path d="M-5 12 L5 12 L4 24 L-4 24 Z" fill="#ea580c" />
                    <circle cx="0" cy="5" r="5" fill="#fed7aa" />
                    <path d="M-5 3 C-4 -1, 4 -1, 5 3 C4 1, -4 1, -5 3" fill="#78350f" />
                    <circle cx="-1.5" cy="5" r="0.7" fill="#1e293b" />
                    <circle cx="1.5" cy="5" r="0.7" fill="#1e293b" />
                    <path d="M-1.5 8 Q0 10 1.5 8" stroke="#be123c" stroke-width="0.8" fill="none" />
                    <path d="M-5 12 Q-10 5 -8 3" stroke="#fed7aa" stroke-width="2" stroke-linecap="round" />
                  </g>

                  <!-- Child Right (Lina) -->
                  <g transform="translate(28, -12)">
                    <path d="M-5 12 L5 12 L6 24 L-6 24 Z" fill="#ec4899" />
                    <circle cx="0" cy="5" r="5" fill="#fed7aa" />
                    <circle cx="-5" cy="2" r="2" fill="#b45309" />
                    <circle cx="5" cy="2" r="2" fill="#b45309" />
                    <circle cx="-1.5" cy="5" r="0.7" fill="#1e293b" />
                    <circle cx="1.5" cy="5" r="0.7" fill="#1e293b" />
                    <path d="M-1.5 8 Q0 10 1.5 8" stroke="#be123c" stroke-width="0.8" fill="none" stroke-linecap="round" />
                    <path d="M5 12 Q10 5 8 3" stroke="#fed7aa" stroke-width="2" stroke-linecap="round" />
                  </g>
                </g>
              </svg>
            </div>
            <div class="text-[9px] font-semibold text-slate-500 text-center">Jobs in Our Village cooperative community artwork</div>
          </div>

          <!-- Story Text Box -->
          <div class="md:col-span-6 p-4 rounded-xl border-2 border-[#0e56b2] bg-blue-50/40 flex flex-col justify-center text-xs leading-relaxed space-y-2 shadow-sm">
            <h4 contenteditable="true" class="text-sm font-black text-blue-950 border-b border-blue-200 pb-1 flex items-center gap-1.5 outline-none">
              <svg class="w-4 h-4 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3A2.5 2.5 0 0 1 6.5 0.5H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"/></svg>
              Jobs in Our Village
            </h4>
            <p contenteditable="true" class="text-[11px] text-blue-950 font-serif outline-none leading-relaxed text-justify">
              In a small village, people have different jobs and they help each other every day. <b>Mr Ali</b> is a farmer. He grows vegetables and fruit. <b>Mr Hatem</b> is a carpenter. He makes chairs, doors and tables. <b>Ms Salma</b> is a builder. She helps build houses and schools. <b>Mrs Emma</b> is a teacher. She teaches children and helps them learn new things.
              <br><br>
              One day, the children want to join a village competition at school. They must work in teams. Sami says, "Every job is important." Lina agrees with him. The children throw a dice, answer questions and talk about village jobs. One boy is sick, so his friends help him. In the end, their team wins because they work together. They are happy and they say, "We are stronger together!"
            </p>
          </div>
        </div>
      `;
      body.appendChild(section1);

      // --- SECTION 2: COMPREHENSION ---
      const section2 = document.createElement('div');
      section2.className = 'space-y-3';
      
      const compQuestions = [
        { q: "Where do the people live?", a: "The people live in a small village." },
        { q: "What does Mr Ali grow?", a: "Mr Ali grows vegetables and fruit." },
        { q: "Who makes chairs and tables?", a: "Mr Hatem, who is a carpenter, makes chairs and tables." },
        { q: "What does Mrs Emma do?", a: "Mrs Emma is a teacher; she teaches children and helps them learn." },
        { q: "Why does the team win?", a: "The team wins because they work together." },
        { q: "What do the children say at the end?", a: "They say, \"We are stronger together!\"" }
      ];

      let qHtml = '';
      compQuestions.forEach((q, idx) => {
        qHtml += `
          <div class="space-y-1">
            <p contenteditable="true" class="font-bold text-slate-950 outline-none">${idx + 1}. ${q.q}</p>
            <div class="space-y-1">
              <div contenteditable="true" class="border-b-2 border-dotted border-slate-300 min-h-[22px] px-2 outline-none ${showAnswerKey ? 'text-rose-600 font-extrabold font-handwriting' : 'text-slate-800'}">
                ${showAnswerKey ? '✓ ' + q.a : ''}
              </div>
            </div>
          </div>
        `;
      });

      section2.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full bg-[#15803d] text-white font-bold flex items-center justify-center text-xs">2</span>
          <span class="bg-[#15803d] text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wide">Comprehension</span>
          <span class="text-xs font-bold text-slate-700">Answer the questions.</span>
        </div>
        <div class="p-4 rounded-xl border border-emerald-100 bg-white shadow-sm text-xs space-y-4">
          ${qHtml}
        </div>
      `;
      body.appendChild(section2);

      // --- SECTION 3: VOCABULARY IN CONTEXT (Colorful choice pills!) ---
      const section3 = document.createElement('div');
      section3.className = 'space-y-3';

      const mcQuestions = [
        {
          q: "A farmer grows _______",
          opts: ["vegetables", "airplanes", "clouds"],
          ans: 0
        },
        {
          q: "A carpenter makes _______",
          opts: ["clouds", "tables", "jackets"],
          ans: 1
        },
        {
          q: "The children throw a _______",
          opts: ["jacket", "dice", "purple"],
          ans: 1
        },
        {
          q: "One boy is _______",
          opts: ["purple", "sick", "tables"],
          ans: 1
        }
      ];

      let mcHtml = '';
      mcQuestions.forEach((item, qIdx) => {
        let optHtml = '';
        item.opts.forEach((opt, oIdx) => {
          const isCorrect = (oIdx === item.ans);
          let badgeColor = "bg-slate-100 border-slate-300 text-slate-800";
          
          if (showAnswerKey && isCorrect) {
            badgeColor = "bg-rose-500 border-rose-600 text-white font-black shadow-sm ring-2 ring-rose-300";
          } else {
            if (oIdx === 0) badgeColor = "bg-purple-100/70 border-purple-200 text-purple-900 hover:bg-purple-200";
            if (oIdx === 1) badgeColor = "bg-sky-100/70 border-sky-200 text-sky-900 hover:bg-sky-200";
            if (oIdx === 2) badgeColor = "bg-emerald-100/70 border-emerald-200 text-emerald-900 hover:bg-emerald-200";
          }

          optHtml += `
            <span class="px-3 py-1 border text-[11px] rounded-full cursor-pointer transition-all ${badgeColor}">
              ${String.fromCharCode(97 + oIdx)}) ${opt}
            </span>
          `;
        });

        mcHtml += `
          <div class="space-y-1.5">
            <p contenteditable="true" class="font-bold text-slate-950 outline-none">${qIdx + 1}. ${item.q}</p>
            <div class="flex flex-wrap gap-2 pt-0.5">
              ${optHtml}
            </div>
          </div>
        `;
      });

      section3.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full bg-[#7c3aed] text-white font-bold flex items-center justify-center text-xs">3</span>
          <span class="bg-[#7c3aed] text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wide">Vocabulary in Context</span>
          <span class="text-xs font-bold text-slate-700">Choose the correct word.</span>
        </div>
        <div class="p-4 rounded-xl border border-violet-100 bg-white shadow-sm text-xs space-y-4">
          ${mcHtml}
        </div>
      `;
      body.appendChild(section3);

      // --- SECTION 4: TRUE OR FALSE (Interactive Tables) ---
      const section4 = document.createElement('div');
      section4.className = 'space-y-3 flex-1 flex flex-col';

      const tfQuestions = [
        { q: "The people live in a village.", ans: true },
        { q: "A builder teaches children.", ans: false },
        { q: "The children work in teams.", ans: true },
        { q: "The team wins because they work together.", ans: true }
      ];

      let tfHtml = '';
      tfQuestions.forEach((item, idx) => {
        const correctTick = (item.ans && showAnswerKey) ? `<span class="text-emerald-600 font-black">✓</span>` : '';
        const correctCross = (!item.ans && showAnswerKey) ? `<span class="text-rose-600 font-black">✗</span>` : '';

        tfHtml += `
          <tr class="border-b border-slate-100">
            <td contenteditable="true" class="py-2.5 pr-4 text-[11px] font-medium text-slate-900 outline-none leading-tight">${idx + 1}. ${item.q}</td>
            <td class="py-2.5 text-center">
              <div class="w-5 h-5 rounded border-2 border-emerald-300 bg-emerald-50/50 flex items-center justify-center mx-auto shadow-inner">
                ${correctTick}
              </div>
            </td>
            <td class="py-2.5 text-center">
              <div class="w-5 h-5 rounded border-2 border-rose-300 bg-rose-50/50 flex items-center justify-center mx-auto shadow-inner">
                ${correctCross}
              </div>
            </td>
          </tr>
        `;
      });

      section4.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full bg-[#ea580c] text-white font-bold flex items-center justify-center text-xs">4</span>
          <span class="bg-[#ea580c] text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wide">True or False</span>
          <span class="text-xs font-bold text-slate-700">Tick (✓) or cross (X).</span>
        </div>
        <div class="p-4 rounded-xl border border-orange-100 bg-white shadow-sm overflow-hidden flex-1">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-slate-200 text-[10px] uppercase font-black tracking-wider text-slate-500">
                <th class="text-left pb-2">Statement</th>
                <th class="w-12 text-center pb-2 text-emerald-700">✓ Yes</th>
                <th class="w-12 text-center pb-2 text-rose-700">✗ No</th>
              </tr>
            </thead>
            <tbody>
              ${tfHtml}
            </tbody>
          </table>
        </div>
      `;

      // --- SECTION 5: FIND IN THE TEXT ---
      const section5 = document.createElement('div');
      section5.className = 'space-y-3 flex-1 flex flex-col';

      const matchData = [
        { def: "a place with few houses", val: "village" },
        { def: "not well", val: "sick" },
        { def: "to say yes", val: "agree" },
        { def: "take part in", val: "join" }
      ];

      let matchHtml = '';
      matchData.forEach((item, idx) => {
        matchHtml += `
          <div class="flex items-center gap-2 text-[11px]">
            <span class="font-bold text-slate-500 w-4">${idx + 1}.</span>
            <div contenteditable="true" class="flex-1 text-slate-900 outline-none font-medium leading-tight">${item.def} =</div>
            <div contenteditable="true" class="w-[45%] border-b-2 border-dotted border-slate-400 font-serif italic px-2 outline-none min-h-[22px] ${showAnswerKey ? 'text-rose-600 font-extrabold font-handwriting' : 'text-slate-800'}">
              ${showAnswerKey ? '✓ ' + item.val : ''}
            </div>
          </div>
        `;
      });

      section5.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="w-7 h-7 rounded-full bg-[#0284c7] text-white font-bold flex items-center justify-center text-xs">5</span>
          <span class="bg-[#0284c7] text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wide">Find in the Text</span>
          <span class="text-xs font-bold text-slate-700">Find words that mean:</span>
        </div>
        <div class="p-4 rounded-xl border border-sky-100 bg-white shadow-sm text-xs space-y-4 flex-1 flex flex-col justify-between">
          ${matchHtml}
        </div>
      `;

      // 4. Combine Section 4 and Section 5 side-by-side in a responsive grid layout matching the screenshot!
      const bottomGrid = document.createElement('div');
      bottomGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch';
      bottomGrid.appendChild(section4);
      bottomGrid.appendChild(section5);
      body.appendChild(bottomGrid);

      // 5. Render Centered Textbook Page Number Badge at bottom
      const pageNumberBadge = document.createElement('div');
      pageNumberBadge.className = 'w-full flex items-center justify-center py-2 select-none';
      pageNumberBadge.innerHTML = `
        <div class="border-4 border-[#0e56b2] text-[#0e56b2] font-black w-10 h-10 rounded-full flex items-center justify-center text-sm bg-white shadow-md animate-pulse">
          53
        </div>
      `;
      body.appendChild(pageNumberBadge);

      // Render Footers dynamically!
      // Add Mr.Zaafouri Abdelmalek and Ezzine Horchani signature in textbook mode
      const footerBadge = document.createElement('div');
      footerBadge.className = 'w-full py-2.5 px-4 bg-[#0e56b2] rounded-xl text-center text-white text-[11px] font-bold tracking-wider uppercase mt-4 flex items-center justify-center gap-2 no-print-corners shadow-sm';
      footerBadge.innerHTML = `
        <svg class="w-4 h-4 text-yellow-400 fill-yellow-400 animate-spin" style="animation-duration: 4s;" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>© 2026 Mr.Zaafouri Abdelmalek • All Rights Reserved | Ezzine Horchani • Distinguished Senior English Language Teacher</span>
        <svg class="w-4 h-4 text-yellow-400 fill-yellow-400 animate-spin" style="animation-duration: 4s;" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      `;
      body.appendChild(footerBadge);

      lucide.createIcons();
      showToast('Textbook Showcase Generated', 'Created high-fidelity ELA Textbook lesson matching your screenshot.', 'book-open');
    }

    // ADD CUSTOM EXERCISE ITEM
    function addCustomQuestion() {
      const body = document.getElementById('worksheet-body');
      const customBox = document.createElement('div');
      customBox.className = 'p-3.5 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/20 space-y-2 text-xs animate-fade-in relative group';
      
      customBox.innerHTML = `
        <div class="flex justify-between items-center text-indigo-900 font-bold">
          <span>Custom Teacher Exercise</span>
          <button onclick="this.parentElement.parentElement.remove()" class="text-rose-500 hover:text-rose-700 text-[10px] font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Remove</button>
        </div>
        <p contenteditable="true" class="font-medium text-slate-900 outline-none bg-white p-2 rounded border border-indigo-200">
          [Click to type custom question or prompt for your students here]
        </p>
        <div class="flex items-center gap-2 pt-1 text-slate-700">
          <span class="font-medium text-indigo-950">Answer:</span>
          <span contenteditable="true" class="border-b-2 border-slate-800 flex-1 px-2 text-slate-800 outline-none">
            [Type answer guide here]
          </span>
        </div>
      `;
      
      body.appendChild(customBox);
      customBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast('Exercise Added', 'New custom editable exercise added to worksheet.');
    }

    // Clear Worksheet
    function clearWorksheet() {
      const body = document.getElementById('worksheet-body');
      body.innerHTML = `
        <div class="p-12 text-center border-2 border-dashed border-slate-300 rounded-2xl my-8">
          <i data-lucide="file-text" class="w-12 h-12 text-slate-300 mx-auto mb-3"></i>
          <h3 class="text-base font-semibold text-slate-700">Blank English Canvas</h3>
          <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Select any English generator button from the teacher panel on the left to populate vocabulary, grammar, reading, or writing exercises.</p>
        </div>
      `;
      lucide.createIcons();
      showToast('Worksheet Cleared', 'Canvas reset to blank.');
    }

    // Download PDF / Print
    function downloadPDF() {
      showToast('Printing PDF', 'Opening print preview dialog...', 'printer');
      setTimeout(() => {
        if (window.AndroidPrintBridge && typeof window.AndroidPrintBridge.triggerPrint === 'function') {
          window.AndroidPrintBridge.triggerPrint();
        } else {
          window.print();
        }
      }, 400);
    }

    // Save Current Worksheet to Library
    function saveCurrentWorksheet() {
      const title = document.getElementById('ws-title')?.innerText || 'English Worksheet';
      const subtitle = document.getElementById('ws-subtitle')?.innerText || '';
      const standardText = document.getElementById('ws-standard-text')?.innerText || '';
      const bodyHTML = document.getElementById('worksheet-body')?.innerHTML || '';
      const teacherName = document.getElementById('ws-teacher-display')?.innerText || '';
      const themeSelect = document.getElementById('theme-select');
      const activeTheme = themeSelect ? themeSelect.value : 'classic-corporate';

      const worksheetItem = {
        id: 'ws_' + Date.now(),
        title: title,
        subtitle: subtitle,
        standardText: standardText,
        bodyHTML: bodyHTML,
        teacherName: teacherName,
        theme: activeTheme,
        mode: currentMode,
        savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };

      let library = JSON.parse(localStorage.getItem('saved_worksheets_library') || '[]');
      library.unshift(worksheetItem);
      localStorage.setItem('saved_worksheets_library', JSON.stringify(library));

      showToast('Worksheet Saved!', 'Added to your Saved Worksheets Library.', 'bookmark');
    }

    // Open Saved Library Modal
    function openSavedLibraryModal() {
      const modal = document.getElementById('saved-library-modal');
      const listContainer = document.getElementById('saved-worksheets-list');
      const library = JSON.parse(localStorage.getItem('saved_worksheets_library') || '[]');

      if (library.length === 0) {
        listContainer.innerHTML = `
          <div class="p-8 text-center border-2 border-dashed border-slate-700 rounded-2xl my-4">
            <i data-lucide="bookmark-x" class="w-10 h-10 text-slate-500 mx-auto mb-2"></i>
            <h4 class="text-sm font-semibold text-slate-300">No Saved Worksheets Yet</h4>
            <p class="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Click "Save Worksheet" in the sidebar anytime to save your custom generated worksheets here.</p>
          </div>
        `;
      } else {
        listContainer.innerHTML = library.map((item) => `
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-indigo-500/50 transition-all space-y-2">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-md">
                ${item.mode || 'ELA'}
              </span>
              <span class="text-[10px] text-slate-400 font-medium">${item.savedAt}</span>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white leading-snug">${item.title}</h4>
              <p class="text-xs text-slate-400 line-clamp-1 mt-0.5">${item.subtitle}</p>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span class="text-[10px] text-slate-400">${item.teacherName}</span>
              <div class="flex items-center gap-2">
                <button onclick="loadSavedWorksheet('${item.id}')" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-xs transition-all flex items-center gap-1 shadow">
                  <i data-lucide="file-input" class="w-3 h-3"></i>
                  <span>Load</span>
                </button>
                <button onclick="deleteSavedWorksheet('${item.id}')" class="p-1.5 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 rounded-lg text-xs transition-all" title="Delete">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      lucide.createIcons();
    }

    function closeSavedLibraryModal() {
      const modal = document.getElementById('saved-library-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    function loadSavedWorksheet(id) {
      const library = JSON.parse(localStorage.getItem('saved_worksheets_library') || '[]');
      const item = library.find(w => w.id === id);

      if (!item) {
        showToast('Error', 'Worksheet not found.', 'alert-circle');
        return;
      }

      document.getElementById('ws-title').innerText = item.title;
      document.getElementById('ws-subtitle').innerText = item.subtitle;
      document.getElementById('ws-standard-text').innerText = item.standardText;
      document.getElementById('worksheet-body').innerHTML = item.bodyHTML;
      
      if (item.theme) {
        applyTheme(item.theme);
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) themeSelect.value = item.theme;
      }

      closeSavedLibraryModal();
      showToast('Worksheet Loaded!', `Loaded "${item.title.substring(0, 24)}..."`, 'file-check');
      lucide.createIcons();
    }

    function deleteSavedWorksheet(id) {
      let library = JSON.parse(localStorage.getItem('saved_worksheets_library') || '[]');
      library = library.filter(w => w.id !== id);
      localStorage.setItem('saved_worksheets_library', JSON.stringify(library));
      showToast('Deleted', 'Removed worksheet from saved library.', 'trash');
      openSavedLibraryModal();
    }

    // Classroom Video Hub Modal Controls
    function openVideoModal() {
      const modal = document.getElementById('classroom-video-modal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Dynamically update video suggestions based on current ELA focus mode
        const videoGrid = document.getElementById('video-suggestions-grid');
        if (videoGrid) {
          let videos = [
            { title: "English Grammar: The Suffix -er Professions", id: "U-b_qI8U6yM", desc: "Learn how we convert verbs into nouns representing community helper professions." },
            { title: "Reading Practice: Community Helpers and Jobs Story", id: "A279z_3mI6A", desc: "A colorful, interactive reading guide identifying helpers in our countryside village." },
            { title: "Learn English: Jobs, Careers and Occupations", id: "r6Ob9M5p9bA", desc: "Expanding English vocabulary for elementary and intermediate ELA classes." }
          ];
          
          if (currentMode === 'vocabulary') {
            videos = [
              { title: "Vocabulary Practice: Parts of Speech Overview", id: "8W_U69_7Sok", desc: "Learn essential nouns, verbs, adjectives, and how they interact in sentences." },
              { title: "Reading Practice for Intermediate Learners", id: "bXp8_L2P7wA", desc: "Improve vocabulary retention, comprehension, and fluency through text readings." },
              { title: "ELA Interactive Grammar Masterclass", id: "ALL_INTER_GRAMMAR", desc: "Stretching context clue recognition across reading sessions." }
            ];
          }

          videoGrid.innerHTML = videos.map(vid => `
            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div class="space-y-1.5">
                <span class="text-[9px] uppercase font-black text-rose-500 tracking-widest">★ Recommended Video ★</span>
                <h4 class="text-xs font-bold text-slate-100">${vid.title}</h4>
                <p class="text-[10px] text-slate-400">${vid.desc}</p>
              </div>
              <div class="mt-3">
                <button onclick="playEmbeddedVideo('${vid.id}')" class="w-full py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 transition-all">
                  <i data-lucide="play" class="w-3.5 h-3.5"></i>
                  <span>Play Interactive Video</span>
                </button>
              </div>
            </div>
          `).join('');
          lucide.createIcons();
        }
      }
    }

    function closeVideoModal() {
      const modal = document.getElementById('classroom-video-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
      // Stop any playing embedded video by clearing source
      const playerWrapper = document.getElementById('video-player-wrapper');
      if (playerWrapper) {
        playerWrapper.innerHTML = `
          <div class="flex flex-col items-center justify-center h-full text-slate-500 space-y-2">
            <i data-lucide="clapperboard" class="w-8 h-8 text-rose-500/50"></i>
            <span class="text-xs font-medium">Select a recommended presentation lesson video to begin playing</span>
          </div>
        `;
        lucide.createIcons();
      }
    }

    function playEmbeddedVideo(id) {
      const playerWrapper = document.getElementById('video-player-wrapper');
      if (playerWrapper) {
        playerWrapper.innerHTML = `
          <iframe class="w-full h-full rounded-xl" src="https://www.youtube.com/embed/${id}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;
      }
    }

    // QR Code Modal & Student Version Link Functions
    function openQRCodeModal() {
      const modal = document.getElementById('student-qr-modal');
      const studentUrl = window.location.href.split('#')[0] + '?studentMode=true';
      const encodedUrl = encodeURIComponent(studentUrl);
      
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodedUrl}&color=1e1b4b&bgcolor=ffffff`;
      
      const modalQrImg = document.getElementById('modal-qr-img');
      const headerQrImg = document.getElementById('ws-header-qr-img');
      
      if (modalQrImg) modalQrImg.src = qrApiUrl;
      if (headerQrImg) headerQrImg.src = qrApiUrl;
      
      const linkInput = document.getElementById('student-link-input');
      if (linkInput) linkInput.value = studentUrl;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      lucide.createIcons();
    }

    function closeQRCodeModal() {
      const modal = document.getElementById('student-qr-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    function toggleHeaderQRCode(enabled) {
      const headerQr = document.getElementById('ws-header-qr');
      if (enabled) {
        headerQr.classList.remove('hidden');
        showToast('QR Code Stamped', 'Added QR code to the printable worksheet header.', 'qr-code');
      } else {
        headerQr.classList.add('hidden');
        showToast('QR Code Removed', 'Removed QR code from header.', 'info');
      }
    }

    function copyStudentLink() {
      const linkInput = document.getElementById('student-link-input');
      if (linkInput) {
        linkInput.select();
        navigator.clipboard.writeText(linkInput.value);
        showToast('Link Copied!', 'Student link copied to clipboard.', 'copy');
      }
    }
