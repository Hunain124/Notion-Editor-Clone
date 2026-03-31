/**
 * Custom function to move the cursor to the end of a block
 */
function setCursorToEnd(el) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

const editor = document.querySelector("#editor");
const titleElement = document.querySelector(".page-title");

// --- CLOUD SYNC LOGIC ---
async function syncToCloud() {
    const userEmail = localStorage.getItem("userEmail");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const syncText = document.querySelector("#sync-text");

    if (isLoggedIn !== "true" || !userEmail) return;

    if (syncText) syncText.innerText = "Saving...";

    try {
        const response = await fetch("http://localhost:5000/api/save-content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: userEmail,
                content: editor.innerHTML,
                title: titleElement.innerText
            })
        });
        
        if (response.ok && syncText) {
            syncText.innerText = "Saved to Cloud";
            console.log("Cloud Synced ✅");
        }
    } catch (err) {
        if (syncText) syncText.innerText = "Offline Mode";
        console.log("Cloud sync failed, saving locally only.");
    }
}

// --- SAVE & LOAD LOGIC ---
function saveData(){
    // 1. Local backup for instant response
    localStorage.setItem("notionData", editor.innerHTML);
    localStorage.setItem("notionTitle", titleElement.innerText);

    // 2. Sync to MongoDB (Backend)
    syncToCloud();
}

// --- WINDOW LOAD (The Heart of the App) ---
window.addEventListener("load" , async () =>{
    const userEmail = localStorage.getItem("userEmail");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const overlay = document.querySelector("#auth-overlay");
    const app = document.querySelector(".app-container");

    // 1. UI Check: Login hai toh editor dikhao
    if (isLoggedIn === "true") {
        if(overlay) overlay.style.display = "none";
        if(app) app.style.display = "block";
    } else {
        if(overlay) overlay.style.display = "flex";
        if(app) app.style.display = "none";
        return; 
    }

    // 2. Immediate Local Load (Taaki screen khali na rahay)
    const localData = localStorage.getItem("notionData");
    const localTitle = localStorage.getItem("notionTitle");
    if(localData) editor.innerHTML = localData;
    if(localTitle) titleElement.innerText = localTitle;

    // 3. Background Cloud Fetch (Database se asli data uthao)
    if (userEmail) {
        try {
            const res = await fetch(`http://localhost:5000/api/get-content?email=${userEmail}`);
            const data = await res.json();
            
            if (data.success && data.content) {
                // Background update
                editor.innerHTML = data.content;
                titleElement.innerText = data.title || "Untitled";
                
                // Update local backup to match cloud
                localStorage.setItem("notionData", data.content);
                localStorage.setItem("notionTitle", data.title);
                console.log("Data fetched from Cloud ☁️");
            }
        } catch (err) {
            console.log("Using Local Storage due to server error.");
        }
    }
});

// --- EVENTS ---

// Enter & Backspace Logic
editor.addEventListener("keydown", (e) => {
    let currentBlock = e.target.closest(".block");
    if (!currentBlock) return;

    if (e.key === "Enter") {
        if (currentBlock.classList.contains("li-block") && currentBlock.innerText.trim() === "") {
            e.preventDefault();
            currentBlock.className = "block";
            currentBlock.setAttribute("data-placeholder", "Type '/' for commands...");
            return;
        }

        e.preventDefault();
        const newdiv = document.createElement("div");
        newdiv.contentEditable = "true";

        if (currentBlock.classList.contains("li-block")) {
            newdiv.className = "block li-block";
            newdiv.setAttribute("data-placeholder", "List item");
        } else {
            newdiv.className = "block";
            newdiv.setAttribute("data-placeholder", "Type '/' for commands...");
        }

        currentBlock.after(newdiv);
        newdiv.focus();

    } else if (e.key === "Backspace") {
        let prevBlock = currentBlock.previousElementSibling;
        if (currentBlock.innerText.trim().length === 0 && prevBlock) {
            e.preventDefault();
            currentBlock.remove();
            prevBlock.focus();
            setCursorToEnd(prevBlock);
        }
    }
});

// Commands & Auto-save
editor.addEventListener("input", (e) => {
    let block = e.target.closest(".block");
    if (!block) return;
    
    let text = block.innerText;

    if (text.startsWith("/h1")) {
        block.innerText = ""; 
        block.className = "block h1-block";
        block.setAttribute("data-placeholder", "H1 Heading");
    } 
    else if (text.startsWith("/p")) {
        block.innerText = "";
        block.className = "block"; 
        block.setAttribute("data-placeholder", "Type '/' for commands...");
    } 
    else if (text.startsWith("/li")) {
        block.innerText = "";
        block.className = "block li-block";
        block.setAttribute("data-placeholder", "List item");
    }
    saveData();
});

titleElement.addEventListener("input", () => {
    saveData();
});