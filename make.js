/*
command list:
command m: new elem
arrow key: move elem
command b: send elem back
command f: send elem front
command v: send all the way back
command g: send all the way front
command d: download
*/

let elemSelected = null;
function elemClick(elem) {
    if (elemSelected) {
        elemSelected.classList.remove("selected");
    }
    elemSelected = elem;
    elemSelected.classList.add("selected");
}
document.addEventListener("keydown", function(ev) {
    const modifer = ev.metaKey || ev.ctrlKey;
    if (modifer) {
        if (ev.key.toLowerCase() === "m") {
            ev.preventDefault();
            let newElem = prompt("What new element do you want: ");
            if (newElem === "box") {
                let newBox = document.createElement("div");
                newBox.classList.add("box");
                newBox.style.width = "10%";
                newBox.style.height = "10%";
                newBox.addEventListener("click", function() {
                    elemClick(newBox);
                });
                document.body.appendChild(newBox);
            }
        }
        else if (ev.key.toLowerCase() === "d") {

        }
        else if (ev.key.toLowerCase() === "") {

        }
    }
});