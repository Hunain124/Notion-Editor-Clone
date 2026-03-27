let editor = document.querySelector("#editor");

editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        const newdiv = document.createElement("div");
        newdiv.className = "block";
        newdiv.contentEditable = "true";

        e.target.after(newdiv);
        newdiv.focus();
    }
});