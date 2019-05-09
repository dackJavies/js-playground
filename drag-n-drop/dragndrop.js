window.addEventListener("load", (e) => {

    Array.prototype.forEach.call(
        document.getElementsByClassName("tile-container"),
        (container) => {
            let selectedTile = null;
            let homeSlot = null;
            let selectedSlot = null;

            function postDropCleanup() {
                selectedTile.style.position = "";
                selectedTile.style.width = "";
                selectedTile.style.height = "";
                selectedTile.style.left = "";
                selectedTile.style.top = "";
                selectedTile = null;
                selectedSlot = null;
                homeSlot = null;
            }

            function snapToMouse(mouseEvent) {
                selectedTile.style.left = mouseEvent.clientX + 10;
                selectedTile.style.top = mouseEvent.clientY + 10;
            }

            container.addEventListener("mousedown", (mouseDownEvent) => {
                if (mouseDownEvent.button !== 0) {
                    return;
                }
                switch(mouseDownEvent.target.className) {
                    case "tile":
                        selectedTile = mouseDownEvent.target;
                        homeSlot = mouseDownEvent.target.parentNode;
                        let oldWidth = mouseDownEvent.target.offsetWidth;
                        let oldHeight = mouseDownEvent.target.offsetHeight;
                        container.appendChild(homeSlot.removeChild(selectedTile));
                        selectedTile.style.position = "absolute";
                        selectedTile.style.width = oldWidth;
                        selectedTile.style.height = oldHeight;
                        snapToMouse(mouseDownEvent);
                        break;

                    default:
                        break;
                }
            });
            container.addEventListener("mouseup", (mouseUpEvent) => {
                if (mouseUpEvent.button !== 0) {
                    return;
                }
                switch(mouseUpEvent.target.className) {
                    case "tile":
                        if (selectedTile) {
                            let temp = mouseUpEvent.target.parentNode;
                            homeSlot.appendChild(temp.removeChild(mouseUpEvent.target));
                            temp.appendChild(container.removeChild(selectedTile));
                            postDropCleanup();
                        }
                        break;

                    case "tile-slot":
                        if (selectedTile) {
                            if (mouseUpEvent.target === homeSlot) {
                                homeSlot.appendChild(container.removeChild(selectedTile));
                            } else {
                                selectedSlot.appendChild(container.removeChild(selectedTile));
                            }
                            postDropCleanup();
                        }
                        break;

                    default:
                        if (selectedTile) {
                            homeSlot.appendChild(container.removeChild(selectedTile));
                            postDropCleanup();
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
                    snapToMouse(mouseMoveEvent);
                }
            });
        }
    );

});
