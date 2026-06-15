/*
command list:
command n: new elem
arrow key: move elem
command b: send elem back
command f: send elem front
command shift b: send all the way back
command shift f: send all the way front
*/

let elemSelected = null;
document.addEventListener("keydown", function(ev) {
    const modifer = ev.metaKey || ev.ctrlKey;
    if (modifer) {
        if (ev.key.toLowerCase() === "n") {
            ev.preventDefault();
            let newElem = prompt("What new element do you want: ");
            if (newElem === "box") {
                let newBox = document.createElement("div");
                newBox.classList.add("box");
                document.body.appendChild(newBox);
            }
        }
    }
});