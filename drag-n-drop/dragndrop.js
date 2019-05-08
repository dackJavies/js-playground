window.addEventListener("load", (e) => {

    Array.prototype.forEach.call(
        document.getElementsByClassName("tile-container"),
        (container) => {
            let selectedTile = null;
            let homeSlot = null;
            let selectedSlot = null;
            container.addEventListener("mousedown", (mouseDownEvent) => {
                if (mouseDownEvent.button !== 0) {
                    return;
                }
                switch(mouseDownEvent.target.className) {
                    case "tile":
                        console.log("Selected a tile.");
                        selectedTile = mouseDownEvent.target;
                        homeSlot = mouseDownEvent.target.parentNode;
                        let oldWidth = mouseDownEvent.target.offsetWidth;
                        let oldHeight = mouseDownEvent.target.offsetHeight;
                        container.appendChild(homeSlot.removeChild(selectedTile));
                        selectedTile.style.position = "absolute";
                        selectedTile.style.width = oldWidth;
                        selectedTile.style.height = oldHeight;
                        selectedTile.style.left = mouseDownEvent.clientX + 10;
                        selectedTile.style.top = mouseDownEvent.clientY + 10;
                        break;

                    case "tile-slot":
                        console.log("Clicked on tile slot.");
                        break;

                    default:
                        console.log("Clicked on the container.");
                        break;
                }
            });
            container.addEventListener("mouseup", (mouseUpEvent) => {
                if (mouseUpEvent.button !== 0) {
                    return;
                }
                switch(mouseUpEvent.target.className) {
                    case "tile":
                        break;

                    case "tile-slot":
                        if (selectedTile) {
                            console.log("Dropping selected tile in new slot.");
                            selectedTile.style.position = "";
                            selectedTile.style.width = "";
                            selectedTile.style.height = "";
                            selectedTile.style.left = "";
                            selectedTile.style.top = "";
                            if (mouseUpEvent.target === homeSlot) {
                                homeSlot.appendChild(container.removeChild(selectedTile));
                            } else {
                                selectedSlot.appendChild(container.removeChild(selectedTile));
                            }
                            selectedTile = null;
                            selectedSlot = null;
                            homeSlot = null;
                        }
                        break;

                    default:
                        if (selectedTile) {
                            console.log("Dropped selected tile.");
                            selectedTile.style.position = "";
                            selectedTile.style.width = "";
                            selectedTile.style.height = "";
                            selectedTile.style.left = "";
                            selectedTile.style.top = "";
                            homeSlot.appendChild(container.removeChild(selectedTile));
                            selectedTile = null;
                            selectedSlot = null;
                            homeSlot = null;
                        }
                        break;
                }
            });
            container.addEventListener("mouseover", (mouseOverEvent) => {
                if (mouseOverEvent.button !== 0) {
                    return;
                }
                switch(mouseOverEvent.target.className) {
                    case "tile-slot":
                        if (selectedTile && mouseOverEvent.target !== homeSlot) {
                            console.log("Selected a slot.");
                            selectedSlot = mouseOverEvent.target;
                        }
                        break;

                    default:
                        break;
                }
            });
            container.addEventListener("mouseexit", (mouseExitEvent) => {
                if (mouseExitEvent.button !== 0) {
                    return;
                }
                switch(mouseExitEvent.target.className) {
                    case "tile-slot":
                        selectedSlot = null;
                        break;

                    default:
                        break;
                }
            });
            container.addEventListener("mousemove", (mouseMoveEvent) => {
                if (mouseMoveEvent.button !== 0) {
                    return;
                }
                if (selectedTile) {
                    console.log("Attempting to drag.");
                    selectedTile.style.left = mouseMoveEvent.clientX + 10;
                    selectedTile.style.top = mouseMoveEvent.clientY + 10;
                }
            });
        }
    );

});
