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