# Notion-Editor-Clone
📝 Notion-Style Block Editor
🚀 Project Overview
A lightweight, block-based text editor built from scratch using Vanilla JavaScript. Unlike traditional text areas, this editor treats every line as an independent "block" element, mimicking the core experience of modern productivity tools like Notion.

✨ Features (Latest Update)
➕ Dynamic Block Creation: Pressing Enter generates a new editable block and shifts focus instantly.

🗑️ Smart Deletion: Pressing Backspace on an empty block deletes it and moves the cursor to the previous block.

🎯 Advanced Cursor Management: Implemented Selection & Range API to ensure the cursor always lands at the end of the text when moving between blocks.

🧱 ContentEditable Architecture: Leverages native browser capabilities for a seamless typing experience without heavy libraries.

🛠️ Technologies & Concepts
JavaScript (ES6+): Arrow functions, event listeners, and DOM manipulation.

DOM Traversal: Using previousElementSibling and closest() for precise element targeting.

Selection & Range API: Managing low-level browser selection to control cursor positioning.

Event Handling: Overriding default browser behaviors (e.preventDefault()) to create a custom UX.

💡 Technical Deep Dive: The Range API
One of the biggest challenges in building a block editor is focus management. When a block is deleted, simply calling .focus() on the previous block puts the cursor at the start. To fix this, I implemented a custom setCursorToEnd utility:

JavaScript
function setCursorToEnd(el) {
    const range = document.createRange();
    const selection = window.getSelection();
    
    range.selectNodeContents(el);
    range.collapse(false); // Move the range to the very end of the content
    
    selection.removeAllRanges();
    selection.addRange(range);
}
📂 Project Structure
/notion-clone
  ├── index.html   # Semantic structure & editor container
  ├── style.css    # Minimalist Notion-style aesthetics
  └── script.js    # Core logic (Enter/Backspace/Cursor control)
📌 Roadmap & Progress
[x] Basic UI & Block Styling

[x] Enter key logic (New block creation)

[x] Backspace logic (Block deletion)

[x] Precision Cursor Positioning (Range API)

[ ] Next: Slash Commands (/h1, /bullet)

[ ] Next: LocalStorage (Save progress automatically)

👨‍💻 Author
Hunain Shahid