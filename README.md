📝 Neon-Notion: Minimalist Block Editor (v1.5)
🚀 Project Overview
A high-tech, dark-themed block editor inspired by Notion’s modular architecture and the Visual Lab minimalist aesthetic. Built with Vanilla JavaScript, this editor treats every line as an independent data block with real-time command processing and persistent storage.

✨ Features (Latest Update)
🌑 Cyberpunk UI: Deep black background with Electric Neon Green (#39FF14) accents and glassmorphism headers.

💾 Full Persistence: Automatically saves both Page Title and Editor Content to localStorage.

⌨️ Slash Commands: Transform blocks instantly using /h1, /li, or /p followed by a space.

🎯 Precision Focus: Custom Selection & Range API ensures the cursor never loses its place during block transitions.

🔘 Intelligent Lists: Automatic bullet generation on Enter and "Smart Exit" logic for empty list items.

🛠️ Technologies & Concepts
JavaScript (ES6+): Event delegation and dynamic DOM manipulation.

Web Storage API: Managing persistent state across browser sessions.

Selection & Range API: Low-level browser control for cursor placement.

CSS Glassmorphism: Using backdrop-filter and rgba for a premium UI feel.

💡 Technical Deep Dive: The Storage Engine
To ensure no data is lost, I implemented a dual-key storage system. Every input event triggers a sync between the DOM and the browser's local database.

JavaScript
function saveData() {
    // Saves the structured HTML of the editor
    localStorage.setItem("notionData", editor.innerHTML);
    
    // Saves the specific Page Title text
    const pageTitle = document.querySelector(".page-title");
    localStorage.setItem("notionTitle", pageTitle.innerText);
}

// Restoration on Page Load Js
window.onload = () => {
    const savedData = localStorage.getItem("notionData");
    const savedTitle = localStorage.getItem("notionTitle");
    
    if (savedData) editor.innerHTML = savedData;
    if (savedTitle) document.querySelector(".page-title").innerText = savedTitle;
};
📂 Project Structure
/notion-neon-clone
  ├── index.html   # Semantic structure with Neon Header
  ├── notion.css   # Dark/Neon styling & Glassmorphism
  └── notion.js    # Core logic (Enter, Backspace, Storage, Commands)
📌 Roadmap & Progress
[x] Basic UI & Block Styling

[x] Enter/Backspace Logic with Range API

[x] Slash Commands (/h1, /p, /li)

[x] Dark Neon "Visual Lab" Theme

[x] Page Title Persistence Logic

[ ] Next: Export to Markdown / PDF

[ ] Next: Draggable Blocks (Reordering)

👨‍💻 Author
Hunain Shahid — Digital Production Specialist | Web Developer