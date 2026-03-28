#📝 Notion-Style Block Editor (Vanilla JS)
#🚀 Project Overview
A lightweight, block-based text editor built from scratch using Vanilla JavaScript. This project moves away from traditional textareas to a modern, block-based architecture where every line is an independent, manageable element—mimicking the core experience of tools like Notion.

#✨ Features (Latest Update)
➕ Dynamic Block Creation: Pressing Enter generates a new editable block and shifts focus instantly.

#🗑️ Smart Deletion: Pressing Backspace on an empty block deletes it and moves the cursor to the previous block.

#🎯 Advanced Cursor Management: Uses Selection & Range API to ensure the cursor always lands at the end of the text during block transitions.

#⌨️ Slash Commands (New): Transform blocks on the fly! Typing /h1 or /p followed by a space instantly changes the block type and styling.

🧱 Block-based Architecture: Pure DOM manipulation for a modular and scalable editor experience.

#🛠️ Technologies & Concepts
JavaScript (ES6+): Arrow functions, event delegation, and input handling.

DOM Traversal: Efficient use of previousElementSibling and closest().

Selection & Range API: Low-level browser API to control cursor focus and placement.

CSS Custom Attributes: Using data-placeholder with pseudo-elements for a clean UI.