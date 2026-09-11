import sys

with open('app/src/main/assets/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix Gemini endpoints
content = content.replace('models/gemini-2.5-flash:generateContent', 'models/gemini-1.5-flash:generateContent')
content = content.replace('models/gemini-3.5-flash:generateContent', 'models/gemini-1.5-flash:generateContent')

# 2. Prepare new renderAISynthesizedFallback code
new_fallback_code = """function renderAISynthesizedFallback(promptText) {
      resetStandardHeader();
      const cleanTitle = formatWorksheetTitle(promptText);
      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = cleanTitle;
      
      const gradeSelect = document.getElementById('ai-grade-level')?.value || 'Middle School (Grades 6-8)';
      const actSelect = document.getElementById('ai-activity-type')?.value || 'Complete Educational Unit';
      
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = `Grade Level: ${gradeSelect} • ${actSelect} • Read directions and complete all exercises.`;
      
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS Curriculum Alignment • Core Standards';

      const body = document.getElementById('worksheet-body');
      if (!body) return;
      body.innerHTML = '';
      body.className = 'space-y-4 animate-fade-in pt-1';

      const promptLower = promptText.toLowerCase().trim();

      // Extract key words from prompt
      const rawWords = promptText
        .replace(/[^a-zA-Z0-9\s]/g, ' ')
        .split(/\\s+/)
        .filter(w => w.length > 2 && !['for', 'the', 'and', 'with', 'about', 'from', 'into', 'that', 'this', 'have', 'grade', 'level', 'unit', 'lesson', 'worksheet', 'story', 'prompt', 'create', 'generate', 'write', 'make'].includes(w.toLowerCase()));

      const mainKeyword = rawWords.length > 0 ? rawWords.join(' ') : cleanTitle;

      let category = 'general';
      if (/verb|noun|adjective|adverb|pronoun|preposition|conjunction|punctuation|comma|apostrophe|tense|passive|active|clause|sentence|grammar|mechanics|capitalization|speech/i.test(promptText)) {
        category = 'grammar';
      } else if (/simile|metaphor|personification|hyperbole|figurative|onomatopoeia|alliteration|imagery|idiom|symbolism|analogy/i.test(promptText)) {
        category = 'figurative';
      } else if (/reading|comprehension|passage|story|main idea|inference|context clue|cause and effect|author|purpose|perspective|summary|textual evidence|nonfiction|fiction/i.test(promptText)) {
        category = 'reading';
      } else if (/vocabulary|word bank|synonym|antonym|root|prefix|suffix|affix|etymology|tier-2|meaning|definition/i.test(promptText)) {
        category = 'vocabulary';
      } else if (/poe|shakespeare|raven|macbeth|romeo|juliet|character|plot|conflict|setting|gothic|poetry|rhyme|stanza|drama|novel|literature/i.test(promptText)) {
        category = 'literature';
      } else if (/science|photosynthesis|plant|cell|space|planet|solar system|astronaut|gravity|water cycle|ecosystem|animal|habitat|volcano|energy|fossil|biology|chemistry|physics/i.test(promptText)) {
        category = 'science';
      } else if (/history|egypt|pharaoh|pyramid|nile|revolution|civil war|government|constitution|rome|greece|colony|artifact|civilization|social studies/i.test(promptText)) {
        category = 'history';
      } else if (/math|fraction|decimal|percentage|word problem|geometry|equation|algebra|ratio|measurement|area|perimeter|angle/i.test(promptText)) {
        category = 'math';
      }

      // Hero Image
      const heroImage = document.createElement('div');
      heroImage.className = 'w-full flex justify-center mb-3';
      let imgSrc = 'images/magical_storybook.jpg';
      if (category === 'science' || category === 'math') imgSrc = 'images/classroom_hero.jpg';
      heroImage.innerHTML = `<img src="${imgSrc}" class="w-full max-w-[500px] rounded-xl shadow-md border-2 border-slate-200" alt="Worksheet Header Image">`;
      body.appendChild(heroImage);

      let passageText = '';
      let wordBankList = [];
      let exercises = [];

      if (category === 'grammar') {
        passageText = `Grammar and sentence mechanics form the structural foundation of clear communication. When studying "${cleanTitle}", writers must pay close attention to syntax, agreement, and word choice. Applying proper grammatical conventions ensures that sentences express complete thoughts clearly and maintain audience engagement.`;
        wordBankList = [mainKeyword, 'Syntax', 'Agreement', 'Predicate', 'Auxiliary', 'Convention'];
        exercises = [
          {
            num: 1,
            type: 'fill-in',
            question: `1. Rule Application Drill: Fill in the blank with the appropriate form or concept related to ${cleanTitle}: "When revising a draft, a writer must check that each sentence correctly demonstrates proper ________."`,
            placeholder: `e.g., ${mainKeyword} / syntax / agreement`,
            answer: mainKeyword
          },
          {
            num: 2,
            type: 'mc',
            question: `2. Multiple Choice Identification: Which of the following sentences correctly applies the principles of ${cleanTitle}?`,
            options: [
              `A) The student carefully reviewed the draft to apply standard ${mainKeyword} rules.`,
              `B) The student carefully review the draft with missing punctuation everywhere.`,
              `C) Carefully the student review without proper grammar or agreement structure.`,
              `D) Reviewing student draft without subject verb or proper syntax.`
            ],
            answer: 'A'
          },
          {
            num: 3,
            type: 'open',
            question: `3. Sentence Revision Drill: Read the unedited sentence below:\n"the students was studying ${mainKeyword} in class yesterday when the teacher asked a question"\n\nTask: Rewrite the sentence above using correct capitalization, punctuation, and proper grammatical agreement.`,
            placeholder: 'Write your corrected sentence here...',
            answer: `The students were studying ${mainKeyword} in class yesterday when the teacher asked a question.`
          },
          {
            num: 4,
            type: 'open',
            question: `4. Structural Analysis: Explain why using proper ${cleanTitle} improves the clarity of a written argument or story. Cite an example from your own writing.`,
            placeholder: 'Student response area...',
            answer: `Proper ${cleanTitle} ensures that readers can follow the author's logic without confusion or grammatical distraction.`
          },
          {
            num: 5,
            type: 'open',
            question: `5. Application & Composition: Write two original sentences that demonstrate your complete understanding of ${cleanTitle}. Underline the target grammatical structure in each sentence.`,
            placeholder: 'Sentence 1:\\nSentence 2:',
            answer: `Student responses will vary. Each sentence should correctly showcase ${cleanTitle}.`
          }
        ];
      } else if (category === 'figurative') {
        passageText = `Figurative language elevates writing by painting vivid imagery in the reader's mind. When exploring "${cleanTitle}", authors compare unlike items, endow objects with human traits, or exaggerate for dramatic effect. Understanding how these literary devices operate allows readers to analyze tone, atmosphere, and deeper thematic meaning.`;
        wordBankList = [mainKeyword, 'Simile', 'Metaphor', 'Imagery', 'Personification', 'Sensory Details'];
        exercises = [
          {
            num: 1,
            type: 'fill-in',
            question: `1. Device Classification (${cleanTitle}): Identify the figurative language term: "A direct comparison between two unlike things using 'like' or 'as' is a simile, whereas stating one thing IS another is a ________."`,
            placeholder: 'metaphor (e.g. metaphor / personification)',
            answer: 'metaphor'
          },
          {
            num: 2,
            type: 'mc',
            question: `2. Multiple Choice Identification: Read the quote: "The old library books were ancient treasures waiting to reveal their secrets." What figurative device is featured?`,
            options: [
              'A) Metaphor (direct comparison without using like or as)',
              'B) Simile (comparison using like or as)',
              'C) Onomatopoeia (sound word representation)',
              'D) Literal statement of facts'
            ],
            answer: 'A'
          },
          {
            num: 3,
            type: 'open',
            question: `3. Figurative Transformation Drill:\nPlain Sentence: "The storm was very loud and scary."\n\nTask: Rewrite this plain sentence into a powerful, figurative statement incorporating ${cleanTitle} and vivid sensory details.`,
            placeholder: 'Write your transformed figurative sentence here...',
            answer: `Sample: "The storm roared like an enraged lion, its thunderous claws shaking the fragile windowpanes."`
          },
          {
            num: 4,
            type: 'open',
            question: `4. Textual Analysis & Impact: How does the author's use of ${cleanTitle} affect the emotional mood of a story or poem? Explain with details.`,
            placeholder: 'Explain mood and reader impact...',
            answer: `${cleanTitle} creates sensory imagery and emotional depth, making the narrative atmosphere far more immersive.`
          },
          {
            num: 5,
            type: 'open',
            question: `5. Creative Composition: Create an original paragraph (3-4 sentences) describing a stormy night or a bustling city scene. Include at least two examples of ${cleanTitle}.`,
            placeholder: 'Write your original paragraph...',
            answer: 'Student paragraphs will vary. Must feature 2 distinct examples of figurative language.'
          }
        ];
      } else if (category === 'science') {
        passageText = `Scientific inquiry relies on observation, evidence, and clear terminology. In our study of "${cleanTitle}", we examine how natural systems operate, transform energy, and maintain equilibrium. Whether observing biological processes or physical phenomena, understanding the underlying principles of ${mainKeyword} allows us to comprehend the natural world.`;
        wordBankList = [mainKeyword, 'Ecosystem', 'Energy', 'Hypothesis', 'Observation', 'Equilibrium'];
        exercises = [
          {
            num: 1,
            type: 'fill-in',
            question: `1. Scientific Vocabulary (${cleanTitle}): Complete the sentence with the correct scientific concept: "In the study of ${mainKeyword}, scientists formulate a tested ________ to explain observed phenomena."`,
            placeholder: 'hypothesis (e.g. hypothesis / opinion / guess)',
            answer: 'hypothesis'
          },
          {
            num: 2,
            type: 'mc',
            question: `2. Multiple Choice Concept Check: Which statement accurately describes a core mechanism involved in ${cleanTitle}?`,
            options: [
              `A) It involves systematic energy transformation and evidence-based reactions in natural environments.`,
              `B) It occurs randomly without any chemical or physical principles governing the outcome.`,
              `C) It only applies to artificial laboratory settings and not natural ecosystems.`,
              `D) It eliminates the need for water, oxygen, or sunlight in biological systems.`
            ],
            answer: 'A'
          },
          {
            num: 3,
            type: 'open',
            question: `3. Process Analysis & Diagram Explanation: Describe the step-by-step process of ${cleanTitle}. What inputs are required, and what products or outcomes are generated?`,
            placeholder: 'Detail the inputs, process, and outputs...',
            answer: `In ${cleanTitle}, key inputs undergo systematic chemical/physical transformation to generate specific products and energy.`
          },
          {
            num: 4,
            type: 'open',
            question: `4. Text-Based Evidence Question: Based on the introductory passage, why is evidence-based observation critical when studying ${mainKeyword}?`,
            placeholder: 'Cite evidence from the passage...',
            answer: 'Observation and evidence allow scientists to form reliable conclusions about natural systems and energy equilibrium.'
          },
          {
            num: 5,
            type: 'open',
            question: `5. Real-World Application: How does our understanding of ${cleanTitle} impact everyday human life or environmental conservation?`,
            placeholder: 'Explain environmental or real-world importance...',
            answer: `Understanding ${cleanTitle} helps humans protect natural habitats, manage resources efficiently, and develop technological solutions.`
          }
        ];
      } else if (category === 'history') {
        passageText = `History is the ongoing story of human civilizations, societal shifts, and cultural legacies. Studying "${cleanTitle}" helps us understand how past decisions, artifacts, and historical figures shaped the modern world. By analyzing primary sources and historical context, historians reconstruct events to learn valuable lessons from the past.`;
        wordBankList = [mainKeyword, 'Civilization', 'Artifact', 'Heritage', 'Primary Source', 'Sovereign'];
        exercises = [
          {
            num: 1,
            type: 'fill-in',
            question: `1. Historical Vocabulary (${cleanTitle}): Fill in the blank: "An object created and used by humans during the historical period of ${mainKeyword} is known as a historical ________."`,
            placeholder: 'artifact (e.g. artifact / document / fossil)',
            answer: 'artifact'
          },
          {
            num: 2,
            type: 'mc',
            question: `2. Multiple Choice Cause & Effect: What was a primary factor or historical catalyst surrounding ${cleanTitle}?`,
            options: [
              `A) Social, economic, and political factors led to significant historical developments in the region.`,
              `B) The event happened instantly without any prior cultural or geographical context.`,
              `C) Historical records show that human populations were completely unaffected by government or trade.`,
              `D) Primary sources were banned and no records survived from this period.`
            ],
            answer: 'A'
          },
          {
            num: 3,
            type: 'open',
            question: `3. Primary Source Analysis: Why do historians prioritize primary sources (such as letters, official decrees, or tools) when studying ${cleanTitle}?`,
            placeholder: 'Explain primary vs secondary sources...',
            answer: 'Primary sources provide firsthand, eyewitness evidence directly from people who lived during that historical period.'
          },
          {
            num: 4,
            type: 'open',
            question: `4. Historical Impact & Geography: How did geography or natural resources influence the development of ${cleanTitle}? Cite specific historical details.`,
            placeholder: 'Analyze geography, rivers, trade routes, or climate...',
            answer: 'Geography, rivers, and natural resources determined trade routes, agricultural productivity, and strategic defense.'
          },
          {
            num: 5,
            type: 'open',
            question: `5. Historical Synthesis & Reflection: Summarize the lasting legacy of ${cleanTitle} on human society today in 2-3 well-constructed sentences.`,
            placeholder: 'Write your historical summary...',
            answer: `${cleanTitle} left a lasting legacy in law, culture, architecture, and governance that continues to influence modern society.`
          }
        ];
      } else if (category === 'math') {
        passageText = `Mathematics provides precise tools for logical reasoning and real-world problem solving. Studying "${cleanTitle}" requires understanding key mathematical principles, step-by-step algorithms, and numerical relationships. Mastering these concepts enables students to convert, compare, and compute values accurately.`;
        wordBankList = [mainKeyword, 'Numerator', 'Denominator', 'Equivalent', 'Proportion', 'Equation'];
        exercises = [
          {
            num: 1,
            type: 'fill-in',
            question: `1. Mathematical Definitions (${cleanTitle}): Complete the mathematical definition: "In fractions and ratios related to ${mainKeyword}, the top number that represents the parts selected is the ________."`,
            placeholder: 'numerator (e.g. numerator / denominator)',
            answer: 'numerator'
          },
          {
            num: 2,
            type: 'mc',
            question: `2. Multiple Choice Computation: Which of the following expressions correctly represents a simplified or equivalent form of ${cleanTitle}?`,
            options: [
              `A) Standard mathematical reduction applying equal operations to both terms.`,
              `B) Adding the top and bottom numbers directly without common denominators.`,
              `C) Multiplying by zero to eliminate all values in the equation.`,
              `D) Ignoring mathematical place value and decimal points entirely.`
            ],
            answer: 'A'
          },
          {
            num: 3,
            type: 'open',
            question: `3. Scenario Word Problem Drill: Word Problem: "A classroom is conducting an experiment involving ${cleanTitle}. If 3 out of 12 equal groups complete the assignment in the first hour, what simplified fraction and percentage of the total work is complete?"\\n\\nTask: Show your step-by-step work and state your final answer.`,
            placeholder: 'Show your work:\\nSimplification:\\nFinal Answer:',
            answer: '3/12 simplifies to 1/4, which is equivalent to 25% of the total work.'
          },
          {
            num: 4,
            type: 'open',
            question: `4. Mathematical Logic Explanation: Explain why finding a common denominator or common factor is necessary when performing operations with ${mainKeyword}.`,
            placeholder: 'Explain equal parts and place value...',
            answer: 'Common denominators ensure that quantities are broken into equal-sized units before addition or comparison.'
          },
          {
            num: 5,
            type: 'open',
            question: `5. Student Problem Creation: Create your own original math word problem involving ${cleanTitle}. Provide the solution and explanation below.`,
            placeholder: 'My Word Problem:\\nSolution & Explanation:',
            answer: 'Student word problems will vary. Must feature correct numerical setup and accurate solution.'
          }
        ];
      } else {
        // Universal Custom Generator for any topic!
        passageText = `Reading comprehension and critical analysis require active engagement with text content. In this lesson on "${cleanTitle}", students examine key concepts, analyze textual evidence, and apply domain vocabulary. Developing strong analytical skills allows readers to draw logical conclusions and articulate well-supported responses.`;
        wordBankList = [mainKeyword, 'Context Clues', 'Textual Evidence', 'Analysis', 'Perspective', 'Synthesis'];
        exercises = [
          {
            num: 1,
            type: 'fill-in',
            question: `1. Vocabulary & Concept Check (${cleanTitle}): Define or complete the key concept related to ${cleanTitle}: "When studying this topic, readers must use ________ clues in the text to infer unfamiliar meanings."`,
            placeholder: 'context (e.g. context / random / literal)',
            answer: 'context'
          },
          {
            num: 2,
            type: 'mc',
            question: `2. Multiple Choice Analytical Question: What is the primary objective when analyzing a text or lesson focusing on ${cleanTitle}?`,
            options: [
              `A) To combine literal facts with textual evidence to build a deep, accurate understanding.`,
              `B) To read quickly without checking supporting details or vocabulary definitions.`,
              `C) To memorize isolated facts without understanding how they connect to the main theme.`,
              `D) To ignore author perspective and skip the central message of the passage.`
            ],
            answer: 'A'
          },
          {
            num: 3,
            type: 'open',
            question: `3. Text Structure & Evidence Drill: Re-read the introductory passage on ${cleanTitle}. Identify the main idea of the paragraph and cite one specific detail that supports it.`,
            placeholder: 'Main Idea:\\nSupporting Detail:',
            answer: `Main Idea: Analyzing ${cleanTitle} requires active engagement and textual evidence. Detail: It allows readers to draw logical conclusions.`
          },
          {
            num: 4,
            type: 'open',
            question: `4. Short Passage Comprehension: Question: How does mastering ${cleanTitle} help students become more effective readers, writers, or thinkers? Support your answer with two reasons.`,
            placeholder: 'Reason 1:\\nReason 2:',
            answer: `Mastering ${cleanTitle} improves reading comprehension, vocabulary acquisition, and evidence-based writing skills.`
          },
          {
            num: 5,
            type: 'open',
            question: `5. Creative Synthesis Response: Write a short response (3-4 sentences) explaining what you learned about ${cleanTitle} today. Use at least two words from the Word Bank above.`,
            placeholder: 'Write your synthesis response here...',
            answer: 'Student responses will vary. Must demonstrate understanding of topic and include target word bank terms.'
          }
        ];
      }

      // Render Passage Block
      const passageCard = document.createElement('div');
      passageCard.className = 'p-5 rounded-2xl border-2 border-indigo-200 bg-slate-50/50 shadow-sm text-slate-800 font-serif text-xs leading-relaxed space-y-2.5 relative page-break-inside-avoid';
      passageCard.contentEditable = "true";
      passageCard.innerHTML = `
        <div class="flex items-center gap-1.5 text-[10px] font-bold text-indigo-700 uppercase tracking-widest">
          <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
          <span>Reading Passage & Lesson Focus</span>
        </div>
        <div class="whitespace-pre-line border-l-4 border-indigo-500 pl-3.5 italic text-slate-800 font-medium">${passageText}</div>
      `;
      body.appendChild(passageCard);

      // Render Word Bank Block
      const wbCard = document.createElement('div');
      wbCard.className = 'p-4 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/40 space-y-2 relative page-break-inside-avoid';
      wbCard.contentEditable = "true";
      let wbHTML = wordBankList.map(w => `<span class="px-2.5 py-1 text-xs font-bold font-sans tracking-wide bg-white text-indigo-700 border border-indigo-200 rounded-lg shadow-sm">${w}</span>`).join(' ');
      wbCard.innerHTML = `
        <div class="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-indigo-600">
          <i data-lucide="brain-circuit" class="w-3.5 h-3.5"></i>
          <span>Lesson Word Bank & Target Concepts</span>
        </div>
        <div class="flex flex-wrap gap-2 pt-1">${wbHTML}</div>
      `;
      body.appendChild(wbCard);

      // Render Exercises
      exercises.forEach((ex) => {
        const card = document.createElement('div');
        card.className = 'exercise-block question-item p-4.5 rounded-xl border border-indigo-100 bg-white shadow-sm text-slate-800 font-serif text-xs leading-relaxed space-y-3 relative page-break-inside-avoid';
        card.contentEditable = "true";

        if (ex.type === 'fill-in') {
          card.innerHTML = `
            <div class="flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white font-sans font-bold text-xs flex items-center justify-center shadow-sm flex-shrink-0">${ex.num}</span>
              <div class="flex-1 space-y-2">
                <h4 class="text-xs font-bold text-slate-900 leading-snug">${ex.question}</h4>
                <div class="pt-1 flex items-center gap-2">
                  <span class="font-bold text-indigo-950 text-[11px]">Student Answer:</span>
                  <span class="border-b-2 border-slate-800 min-w-[200px] inline-block px-1 ${showAnswerKey ? 'text-rose-600 font-bold' : 'text-slate-400 font-medium'}">
                    ${showAnswerKey ? ex.answer : ex.placeholder}
                  </span>
                </div>
              </div>
            </div>
          `;
        } else if (ex.type === 'mc') {
          let optionsHTML = ex.options.map(opt => {
            return `
              <div class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-100 bg-slate-50/50">
                <span class="text-[11px] text-slate-800 font-medium">${opt}</span>
              </div>
            `;
          }).join('');

          card.innerHTML = `
            <div class="flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white font-sans font-bold text-xs flex items-center justify-center shadow-sm flex-shrink-0">${ex.num}</span>
              <div class="flex-1 space-y-2">
                <h4 class="text-xs font-bold text-slate-900 leading-snug">${ex.question}</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">${optionsHTML}</div>
                ${showAnswerKey ? `<div class="mt-2 text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">★ Correct Answer: Choice ${ex.answer}</div>` : ''}
              </div>
            </div>
          `;
        } else {
          card.innerHTML = `
            <div class="flex items-start gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white font-sans font-bold text-xs flex items-center justify-center shadow-sm flex-shrink-0">${ex.num}</span>
              <div class="flex-1 space-y-2">
                <h4 class="text-xs font-bold text-slate-900 leading-snug whitespace-pre-line">${ex.question}</h4>
                <div class="space-y-2 pt-1.5 border-t border-indigo-100/60">
                  <div class="border-b border-dotted border-slate-400 min-h-[24px] px-1 pb-1 ${showAnswerKey ? 'text-rose-600 font-bold italic bg-rose-50/50 p-2 rounded' : 'text-slate-400'}">
                    ${showAnswerKey ? '★ Answer Key: ' + ex.answer : ex.placeholder}
                  </div>
                  ${!showAnswerKey ? '<div class="border-b border-dotted border-slate-400 h-4"></div><div class="border-b border-dotted border-slate-400 h-4"></div>' : ''}
                </div>
              </div>
            </div>
          `;
        }
        body.appendChild(card);
      });

      // Render Answer Key Footer
      const akCard = document.createElement('div');
      akCard.className = 'mt-6 p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/40 space-y-3 relative page-break-inside-avoid';
      akCard.contentEditable = "true";
      let akHTML = exercises.map(ex => `<div class="text-xs font-serif text-slate-800"><strong class="text-rose-800 font-bold">Q${ex.num}:</strong> ${ex.answer}</div>`).join('');
      akCard.innerHTML = `
        <div class="flex items-center justify-between border-b border-rose-200 pb-2">
          <div class="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-800">
            <i data-lucide="key-round" class="w-4 h-4"></i>
            <span>Teacher Answer Key & Solutions Guide</span>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">Confidential / Educator Reference</span>
        </div>
        <div class="space-y-2 pt-1">${akHTML}</div>
      `;
      body.appendChild(akCard);

      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    }"""

# Replace old renderAISynthesizedFallback
start_idx = content.find('function renderAISynthesizedFallback(')
end_idx = content.find('// Switch Dashboard Drawer Tabs', start_idx)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_fallback_code + '\n    ' + content[end_idx:]
    print("Successfully replaced renderAISynthesizedFallback!")
else:
    print("Error: Could not find renderAISynthesizedFallback boundaries")
    sys.exit(1)

with open('app/src/main/assets/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html successfully!")
