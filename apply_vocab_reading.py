import os

file_path = 'app/src/main/assets/index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Vocabulary
old_vocab = '''function generateVocabularyWorksheet() {
      resetStandardHeader();
      currentMode = 'vocabulary';
      document.getElementById('active-mode-badge').innerText = 'Vocabulary';

      document.getElementById('ws-title').innerText = 'English Vocabulary & Context Clues';
      document.getElementById('ws-subtitle').innerText = 'Review the word bank, then match each target vocabulary word to its correct context or definition.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.L.5.4 • Determine or clarify the meaning of unknown words using context clues and word definitions.';

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
      if (subEl) subEl.innerText = 'Review the word bank, then match each target vocabulary word to its correct context or definition.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY.L.5.4 • Determine or clarify the meaning of unknown words using context clues and word definitions.';

      const grade = document.getElementById('grade-level-select')?.value || document.getElementById('ai-grade-level')?.value || 'intermediate';
      const count = parseInt(document.getElementById('item-count-select')?.value || '5', 10);'''

if old_vocab in html:
    html = html.replace(old_vocab, new_vocab, 1)
    print('Successfully updated generateVocabularyWorksheet')
else:
    print('Could not find old_vocab')

# Reading
old_reading = '''function generateReadingWorksheet() {
      resetStandardHeader();
      currentMode = 'reading';
      document.getElementById('active-mode-badge').innerText = 'Reading';

      document.getElementById('ws-title').innerText = 'Reading Comprehension & Evidence';
      document.getElementById('ws-subtitle').innerText = 'Read the passage carefully, then answer the comprehension questions using text evidence.';
      document.getElementById('ws-standard-text').innerText = 'CCSS.ELA-LITERACY.RL.5.1 • Quote accurately from a text when explaining what the text says explicitly and when drawing inferences.';'''

new_reading = '''function generateReadingWorksheet() {
      setViewMode('worksheet');
      resetStandardHeader();
      currentMode = 'reading';
      const badge = document.getElementById('active-mode-badge');
      if (badge) badge.innerText = 'Reading';

      const titleEl = document.getElementById('ws-title');
      if (titleEl) titleEl.innerText = 'Reading Comprehension & Evidence';
      const subEl = document.getElementById('ws-subtitle');
      if (subEl) subEl.innerText = 'Read the passage carefully, then answer the comprehension questions using text evidence.';
      const stdEl = document.getElementById('ws-standard-text');
      if (stdEl) stdEl.innerText = 'CCSS.ELA-LITERACY.RL.5.1 • Quote accurately from a text when explaining what the text says explicitly and when drawing inferences.';'''

if old_reading in html:
    html = html.replace(old_reading, new_reading, 1)
    print('Successfully updated generateReadingWorksheet')
else:
    print('Could not find old_reading')

with open('app/src/main/assets/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

if os.path.exists('index.html'):
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if os.path.exists('public/index.html'):
    with open('public/index.html', 'w', encoding='utf-8') as f:
        f.write(html)

print('Updated files successfully!')
