import sys

with open('app/src/main/assets/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_deck_code = """function synthesizeELASlideDeck(topic, slideCount, targetLevel, deckStyle, slideTheme) {
      const cleanTitle = topic.charAt(0).toUpperCase() + topic.slice(1);
      const slides = [];

      const rawWords = topic
        .replace(/[^a-zA-Z0-9\\s]/g, ' ')
        .split(/\\s+/)
        .filter(w => w.length > 2 && !['for', 'the', 'and', 'with', 'about', 'from', 'into', 'that', 'this', 'have', 'grade', 'level', 'unit', 'lesson', 'worksheet', 'story', 'prompt', 'create', 'generate', 'write', 'make'].includes(w.toLowerCase()));

      const mainKeyword = rawWords.length > 0 ? rawWords.join(' ') : cleanTitle;

      let category = 'general';
      if (/verb|noun|adjective|adverb|pronoun|preposition|conjunction|punctuation|comma|apostrophe|tense|passive|active|clause|sentence|grammar|mechanics|capitalization|speech/i.test(topic)) {
        category = 'grammar';
      } else if (/simile|metaphor|personification|hyperbole|figurative|onomatopoeia|alliteration|imagery|idiom|symbolism|analogy/i.test(topic)) {
        category = 'figurative';
      } else if (/reading|comprehension|passage|story|main idea|inference|context clue|cause and effect|author|purpose|perspective|summary|textual evidence|nonfiction|fiction/i.test(topic)) {
        category = 'reading';
      } else if (/vocabulary|word bank|synonym|antonym|root|prefix|suffix|affix|etymology|tier-2|meaning|definition/i.test(topic)) {
        category = 'vocabulary';
      } else if (/poe|shakespeare|raven|macbeth|romeo|juliet|character|plot|conflict|setting|gothic|poetry|rhyme|stanza|drama|novel|literature/i.test(topic)) {
        category = 'literature';
      } else if (/science|photosynthesis|plant|cell|space|planet|solar system|astronaut|gravity|water cycle|ecosystem|animal|habitat|volcano|energy|fossil|biology|chemistry|physics/i.test(topic)) {
        category = 'science';
      } else if (/history|egypt|pharaoh|pyramid|nile|revolution|civil war|government|constitution|rome|greece|colony|artifact|civilization|social studies/i.test(topic)) {
        category = 'history';
      } else if (/math|fraction|decimal|percentage|word problem|geometry|equation|algebra|ratio|measurement|area|perimeter|angle/i.test(topic)) {
        category = 'math';
      }

      // 1. Title Slide
      slides.push({
        layout: 'title',
        title: cleanTitle,
        subtitle: `Curriculum Unit • Grade Level: ${targetLevel.replace('-', ' ').toUpperCase()}`,
        notes: `Introduce today's lesson on "${cleanTitle}". State learning targets clearly and set an encouraging tone for student participation.`
      });

      // 2. Learning Objectives Slide
      slides.push({
        layout: 'bullets',
        title: `🎯 Objectives: ${cleanTitle}`,
        subtitle: 'Learning Targets & Curriculum Standards',
        bullets: [
          `Master the fundamental rules, mechanics, and vocabulary associated with ${mainKeyword}.`,
          `Analyze contextual evidence and evaluate examples during classroom practice.`,
          `Synthesize key takeaways to complete independent worksheet activities accurately.`
        ],
        notes: `Have student volunteers read each objective aloud. Ask: 'Why is mastering ${mainKeyword} important?'`
      });

      // 3. Deep Dive / Mechanics Slide
      if (category === 'grammar') {
        slides.push({
          layout: 'bullets',
          title: `Grammatical Breakdown: ${cleanTitle}`,
          subtitle: `Structural Formula & Agreement Rules for ${mainKeyword}`,
          bullets: [
            `Rule 1: Always check subject-verb agreement and proper tense consistency in clauses.`,
            `Rule 2: Identify whether sentences are active vs passive or require specific punctuation.`,
            `Rule 3: Revise fragments and run-ons to ensure complete sentence thoughts.`,
            `Common Pitfall: Avoid mixing conflicting verb tenses within the same paragraph.`
          ],
          notes: `Demonstrate before-and-after sentence transformations on the whiteboard.`
        });
      } else if (category === 'figurative') {
        slides.push({
          layout: 'bullets',
          title: `Figurative Devices: ${cleanTitle}`,
          subtitle: 'Literary Devices & Sensory Imagery Breakdown',
          bullets: [
            `Simile vs. Metaphor: Similes use 'like' or 'as'; metaphors state direct equivalency.`,
            `Personification: Endowing non-human entities with human traits or emotions.`,
            `Sensory Impact: Authors use figurative devices to evoke vivid mental imagery.`,
            `Analysis Strategy: Identify the literal base item and the figurative comparison.`
          ],
          notes: `Ask students to transform a plain sentence into a vivid figurative statement.`
        });
      } else if (category === 'science') {
        slides.push({
          layout: 'bullets',
          title: `Scientific Principles: ${cleanTitle}`,
          subtitle: `Energy, Reactions & Processes in ${mainKeyword}`,
          bullets: [
            `Core Mechanism: Natural systems follow specific physical and biological laws.`,
            `Inputs & Outputs: Identify the required materials and resulting products in ${mainKeyword}.`,
            `Evidence & Observation: Formulate testable hypotheses based on empirical data.`,
            `Ecosystem Role: Observe how ${mainKeyword} maintains balance in natural environments.`
          ],
          notes: `Draw a simple process flow diagram on the board illustrating the steps.`
        });
      } else if (category === 'history') {
        slides.push({
          layout: 'bullets',
          title: `Historical Context: ${cleanTitle}`,
          subtitle: 'Civilization, Primary Sources & Key Events',
          bullets: [
            `Historical Catalyst: Social, economic, and political drivers behind ${mainKeyword}.`,
            `Primary Sources: Analyze original documents, decree letters, and physical artifacts.`,
            `Geographical Factor: Observe how rivers, climate, and trade routes shaped developments.`,
            `Historical Legacy: Evaluate how ${cleanTitle} continues to impact modern society.`
          ],
          notes: `Discuss the difference between primary and secondary historical sources with the class.`
        });
      } else if (category === 'math') {
        slides.push({
          layout: 'bullets',
          title: `Mathematical Operations: ${cleanTitle}`,
          subtitle: `Formulas, Ratios & Step-by-Step Logic`,
          bullets: [
            `Terminology: Numerator represents parts selected; denominator represents equal total parts.`,
            `Simplification: Apply greatest common factors to reduce fractions to simplest form.`,
            `Equivalence: Multiply or divide top and bottom by equal non-zero values.`,
            `Real-World Application: Solve scenario word problems step by step with work shown.`
          ],
          notes: `Work through a sample word problem on the board showing all mathematical steps.`
        });
      } else {
        slides.push({
          layout: 'bullets',
          title: `Core Principles: ${cleanTitle}`,
          subtitle: `Essential Concepts & Vocabulary for ${mainKeyword}`,
          bullets: [
            `Concept 1: Understand the core terminology underpinning ${cleanTitle}.`,
            `Concept 2: Analyze contextual clues and author perspective in related readings.`,
            `Concept 3: Apply evidence-based reasoning when answering questions and discussions.`
          ],
          notes: `Walk through these core principles step by step. Highlight key terms on screen.`
        });
      }

      // 4. Interactive Quiz / Practice Slide
      slides.push({
        layout: 'activity',
        title: `Interactive Challenge: ${cleanTitle}`,
        subtitle: 'Classroom Whiteboard Engagement',
        activityHtml: `
          <div class="space-y-3 font-sans text-xs">
            <div class="bg-indigo-50/70 p-3 rounded-xl border border-indigo-100">
              <span class="font-bold text-indigo-950">Q1. Which option correctly demonstrates the core target principle for ${cleanTitle}?</span>
              <div class="grid grid-cols-2 gap-2 mt-2">
                <span class="p-2 bg-white rounded-lg border border-slate-200 font-medium text-slate-800">A) Choice correctly exhibiting ${mainKeyword}</span>
                <span class="p-2 bg-white rounded-lg border border-slate-200 font-medium text-slate-800">B) Choice containing common mistake</span>
              </div>
            </div>
            <div class="bg-indigo-50/70 p-3 rounded-xl border border-indigo-100">
              <span class="font-bold text-indigo-950">Q2. Guided Practice: How does mastering ${cleanTitle} improve clarity and understanding?</span>
            </div>
          </div>
        `,
        answersRevealedHtml: `
          <div class="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1 text-xs text-emerald-850 font-medium animate-fade-in">
            <h5 class="font-extrabold uppercase text-[10px] text-emerald-800">★ Solutions Guide ★</h5>
            <p>✔ Q1: Choice A represents the correct standard application of ${cleanTitle}.</p>
            <p>✔ Q2: Mastering ${cleanTitle} ensures structural clarity and evidence-based comprehension.</p>
          </div>
        `,
        notes: "Invite two students to the board to circle the correct answers. Discuss why Choice B was a distractor."
      });

      // 5. Wrap Up & Reflection Slide
      slides.push({
        layout: 'bullets',
        title: "Lesson Summary & Exit Ticket",
        subtitle: "Consolidating Classroom Mastery",
        bullets: [
          `Key Takeaway: Remember the central rules and strategies we practiced for ${cleanTitle}.`,
          `Exit Ticket Challenge: Write one original example applying ${cleanTitle} in your notebook.`,
          `Homework Extension: Complete the corresponding digital worksheet exercises.`
        ],
        notes: "Give students 3 minutes of silent reflection to write their exit ticket responses before dismissal."
      });

      return slides.slice(0, Math.max(3, slideCount));
    }"""

start_idx = content.find('function synthesizeELASlideDeck(')
end_idx = content.find('// 4. Interactive Classroom Quiz', start_idx)
# find end of synthesizeELASlideDeck function
end_func_idx = content.find('return slides.slice(0, Math.max(3, slideCount));\n    }', start_idx) + len('return slides.slice(0, Math.max(3, slideCount));\n    }')

if start_idx != -1 and end_func_idx != -1:
    content = content[:start_idx] + new_deck_code + content[end_func_idx:]
    print("Successfully replaced synthesizeELASlideDeck!")
else:
    print("Error: Could not find synthesizeELASlideDeck boundaries")
    sys.exit(1)

with open('app/src/main/assets/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated deck code successfully!")
