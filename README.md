📝 Neon-Notion: Minimalist Block Editor (v1.5)
🚀 Project Overview
A high-tech, dark-themed block editor inspired by Notion’s architecture and Visual Lab’s minimalist aesthetic. Built with Vanilla JavaScript, this editor treats every line as a modular data block with real-time command processing.

✨ Features (Latest Update)
🌑 Cyberpunk UI: Deep black background with Electric Neon Green (#39FF14) accents for a premium developer feel.

💾 Full Persistence: Automatically saves both Page Title and Editor Content to localStorage. Your workspace is exactly how you left it after a refresh.

⌨️ Smart Slash Commands: * /h1 — Neon Bold Heading

/li — Square Tech-style Bullets

/p  — Standard Paragraph

🎯 Precision Focus: Custom Selection & Range API ensures the cursor never loses its place during block deletion or creation.

🔘 Intelligent Lists: Supports auto-continuation of bullets and "Smart Exit" (Pressing Enter on an empty bullet reverts it to a normal block).

🛠️ Technical Deep Dive
Glassmorphism: Sticky header with backdrop-filter: blur for a modern app feel.

Event Delegation: Efficiently manages thousands of potential blocks using a single event listener on the parent container.

Data Persistence Logic:

JavaScript
function saveData() {
    localStorage.setItem("notionData", editor.innerHTML);
    localStorage.setItem("notionTitle", pageTitle.innerText);
}
📂 Project Structure
/notion-neon-clone
  ├── index.html   # Semantic structure with Neon Header
  ├── notion.css   # Dark/Neon styling & Glassmorphism
  └── notion.js    # Core logic (Enter, Backspace, Storage, Commands)
📌 Roadmap & Progress
[x] Basic UI & Block Styling

[x] Enter/Backspace Logic

[x] Slash Commands (/h1, /p, /li)

[x] Dark Neon Theme Integration

[x] Page Title Persistence

[ ] Next: Multi-color commands (e.g., /red, /blue)

[ ] Next: Export to PDF/Markdown

👨‍💻 Author
Hunain Shahid — Digital Production Specialist | Web Developer