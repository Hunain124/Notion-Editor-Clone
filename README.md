# Notion-Editor-Clone
# 📝 Notion Style Editor (JavaScript)

## 🚀 Project Overview

This project is a **Notion-like text editor** built using **Vanilla JavaScript**.
It allows users to create and manage content in a **block-based structure**, similar to modern editors like Notion.

---

## ✨ Features

* ➕ Create new blocks using the **Enter key**
* 🎯 Auto focus on newly created block
* 🧱 Block-based editing system
* ⚡ Smooth and minimal user experience

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES6)

---

## 📂 Project Structure

```
/project-folder
  ├── index.html
  ├── style.css
  └── script.js
```

---

## ⚙️ How It Works

* The editor listens for **keyboard events**
* When the **Enter key** is pressed:

  * Default behavior is prevented
  * A new editable block is created
  * The new block is inserted after the current block
  * Focus automatically shifts to the new block

---

## 💡 Key Code Logic

```js
editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        let block = e.target.closest(".block");

        const newdiv = document.createElement("div");
        newdiv.className = "block";
        newdiv.contentEditable = "true";

        block.after(newdiv);
        newdiv.focus();
    }
});
```

---

## 🔥 Future Improvements

* ⌨️ Backspace to delete empty blocks
* 🎨 Slash commands (/h1, /list)
* 💾 Save data using LocalStorage
* 🧠 Advanced cursor management
* 🧩 Block types (heading, list, code)

---

## 📌 Learning Outcome

This project helps in understanding:

* DOM Manipulation
* Event Handling
* Dynamic UI creation
* Block-based editor architecture

---

## 👨‍💻 Author

**Hunain Shahid**

---

## ⭐ Contribution

Feel free to fork this project and improve it!
