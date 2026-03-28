function setCursorToEnd(el) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
}

let editor = document.querySelector("#editor");

editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        const newdiv = document.createElement("div");
        newdiv.className = "block";
        newdiv.contentEditable = "true";

        e.target.closest(".block").after(newdiv);
        newdiv.focus();

    } else if (e.key === "Backspace") {
        let block = e.target.closest(".block");
        let prevBlock = block.previousElementSibling;

        if (block.innerText.trim().length == 0 && prevBlock) {
            e.preventDefault();

            block.remove();
            prevBlock.focus();
            setCursorToEnd(prevBlock);

        }
    }
});

editor.addEventListener("input", (e) => {
    let block = e.target.closest(".block");
    let text = block.innerText;

    if (text.startsWith("/h1")) {
        block.innerText = " ";
        block.classList.add("h1-block");
        block.setAttribute("placeholder", "H1 Heading");

    } else if (text.startsWith("/p")) {
        block.innerText = " ";
        block.classList.add("p");
        block.setAttribute("placeholder", "Paragraph");

    } else if (text.startsWith("/li")) {
        block.innerText = " ";
        block.classList.add("li-block");
        block.setAttribute("placeholder", "List item");
    }
});

if (e.key === "Enter") {
    e.preventDefault();
    let currentBlock = e.target.closest(".block");

    const newdiv = document.createElement("div");
    newdiv.contentEditable = "true";

    // Check karo: Agar current block list hai, toh naya bhi list banao
    if (currentBlock.classList.contains("li-block")) {
        newdiv.className = "block li-block";
    } else {
        newdiv.className = "block";
    }

    currentBlock.after(newdiv);
    newdiv.focus();
}