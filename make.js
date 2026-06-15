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
let highestZ = 1;
let lowestZ = -1;
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
                newBox.style.zIndex = "0";
                newBox.addEventListener("click", function() {
                    clickEvent.stopPropagation();
                    elemClick(newBox);
                });
                document.body.appendChild(newBox);
            }
        }
        else if (ev.key.toLowerCase() === "d") {

        }
        else if (ev.key.toLowerCase() === "v") {
            ev.preventDefault();
            elemSelected.style.zIndex = lowestZ;
            lowestZ--;
        }
        else if (ev.key.toLowerCase() === "g") {
            ev.preventDefault();
            elemSelected.style.zIndex = highestZ;
            highestZ++;
        }
        else if (ev.key.toLowerCase() === "f") {
            if (elemSelected) {
                ev.preventDefault();
                const currentZ = parseInt(window.getComputedStyle(elemSelected).zIndex) || 0;
                const allBoxes = Array.from(document.querySelectorAll('.box'));
                let nextHighestBox = null;
                let nextHighestZ = Infinity;
                allBoxes.forEach(box => {
                    if (box === elemSelected) return;
                    const boxZ = parseInt(window.getComputedStyle(box).zIndex) || 0;
                    if (boxZ > currentZ && boxZ < nextHighestZ) {
                        nextHighestZ = boxZ;
                        nextHighestBox = box;
                    }
                });
                if (nextHighestBox) {
                    elemSelected.style.zIndex = nextHighestZ;
                    nextHighestBox.style.zIndex = currentZ;
                } else {
                    elemSelected.style.zIndex = highestZ;
                    highestZ++;
                }
            }
        }
        else if (ev.key.toLowerCase() === "b") {
            if (elemSelected) {
                ev.preventDefault();
                const currentZ = parseInt(window.getComputedStyle(elemSelected).zIndex) || 0;
                const allBoxes = Array.from(document.querySelectorAll('.box'));
                let nextLowestBox = null;
                let nextLowestZ = -Infinity;
                allBoxes.forEach(box => {
                    if (box === elemSelected) return;
                    const boxZ = parseInt(window.getComputedStyle(box).zIndex) || 0;
                    if (boxZ < currentZ && boxZ > nextLowestZ) {
                        nextLowestZ = boxZ;
                        nextLowestBox = box;
                    }
                });
                if (nextLowestBox) {
                    elemSelected.style.zIndex = nextLowestZ;
                    nextLowestBox.style.zIndex = currentZ;
                } else {
                    elemSelected.style.zIndex = lowestZ;
                    lowestZ--;
                }
            }
        }
    }
});