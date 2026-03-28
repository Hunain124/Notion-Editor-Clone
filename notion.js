/**
 * Custom function to move the cursor to the end of a block
 * (Essential for smooth Backspace behavior)
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

// --- KEYDOWN EVENTS (Enter & Backspace Logic) ---
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

const titleElement = document.querySelector(".page-title");

titleElement.addEventListener("input", () => {
    saveData();
});

function saveData(){
    localStorage.setItem("notionData", editor.innerHTML);
    const pageTitle = document.querySelector(".page-title");
    localStorage.setItem("notionTitle", pageTitle.innerText);
}

window.addEventListener("load" , () =>{
    const saveData = localStorage.getItem("notionData");
    if(saveData){
        editor.innerHTML = saveData;
    }
    const savedTitle = localStorage.getItem("notionTitle");
    const pageTitle = document.querySelector(".page-title");
    
    if (savedTitle) {
        pageTitle.innerText = savedTitle;
    }
})