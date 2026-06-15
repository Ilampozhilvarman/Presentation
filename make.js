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
    const modifier = ev.metaKey || ev.ctrlKey;
    if (!modifier && elemSelected) {
        let currentTop = parseInt(elemSelected.style.top) || 50;
        let currentLeft = parseInt(elemSelected.style.left) || 50;
        const moveAmount = 10;
        if (ev.key === "ArrowUp") {
            ev.preventDefault();
            elemSelected.style.top = (currentTop - moveAmount) + "px";
        } else if (ev.key === "ArrowDown") {
            ev.preventDefault();
            elemSelected.style.top = (currentTop + moveAmount) + "px";
        } else if (ev.key === "ArrowLeft") {
            ev.preventDefault();
            elemSelected.style.left = (currentLeft - moveAmount) + "px";
        } else if (ev.key === "ArrowRight") {
            ev.preventDefault();
            elemSelected.style.left = (currentLeft + moveAmount) + "px";
        }
    }
    if (modifier) {
        if (ev.key.toLowerCase() === "i") {
            ev.preventDefault();
            let newElem = prompt("What new element do you want: ");
            if (newElem === "box") {
                let newBox = document.createElement("div");
                newBox.classList.add("box");
                newBox.style.width = "100px";
                newBox.style.height = "100px";
                newBox.style.top = "50px";
                newBox.style.left = "50px";
                newBox.style.zIndex = "0";
                makeElementDraggable(newBox);
                newBox.addEventListener("click", function(ev) {
                    ev.stopPropagation();
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
function makeElementDraggable(elem) {
    elem.addEventListener("mousedown", function(e) {
        if (e.offsetX > elem.clientWidth - 15 && e.offsetY > elem.clientHeight - 15) {
            return;
        }
        e.preventDefault();
        elemClick(elem);
        const offsetX = e.clientX - (parseInt(elem.style.left) || 50);
        const offsetY = e.clientY - (parseInt(elem.style.top) || 50);
        function mouseMoveHandler(moveEv) {
            elem.style.left = (moveEv.clientX - offsetX) + "px";
            elem.style.top = (moveEv.clientY - offsetY) + "px";
        }
        function mouseUpHandler() {
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        }
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    });
}