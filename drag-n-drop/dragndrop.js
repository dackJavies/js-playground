window.addEventListener("load", (e) => {
    let tiles = document.getElementsByClassName("tile");

    Array.prototype.forEach.call(tiles, (tile) => {
        if (!tile.dragging) {
            tile.dragging = false;
            tile.oldSlot = tile.parentNode;
            tile.slotWidth = tile.offsetWidth;
            tile.slotHeight = tile.offsetHeight;
            tile.windowDragHandler = windowDragHandler.bind(tile/*, tile*/);
            tile.addEventListener("mousedown", drag);
            tile.addEventListener("mouseup", stopDragging);
        }
    });

});

function drag(dragEvent) {
    dragEvent.stopPropagation();
    this.dragging = true;
    this.oldSlot.parentNode.appendChild(this.oldSlot.removeChild(this));
    this.style.width = this.slotWidth;
    this.style.height = this.slotHeight;
    this.style.position = "absolute";
    window.addEventListener("mousemove", this.windowDragHandler);
}

function windowDragHandler(/*tile, */mouseMoveEvent) {
    followMouse(this, mouseMoveEvent.clientX, mouseMoveEvent.clientY);
}

function followMouse(tile, clientX, clientY) {
    if (tile.dragging) {
        tile.style.left = clientX - (tile.offsetWidth / 2);
        tile.style.top = clientY - (tile.offsetHeight / 2);
        setTimeout(() => followMouse(tile), 0);
    }
}

function stopDragging(e) {
    this.dragging = false;
    window.removeEventListener("mousemove", windowDragHandler);
}
