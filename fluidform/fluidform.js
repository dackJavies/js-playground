// Fluidform, written by Jack Davis
'use strict';

function sectionClickHandler() {
    var children = this.getElementsByClassName("section-item");
    if (this.className.includes("closed-section")) {
        for(var i = 0; i < children.length; i++) {
            children[i].classList.remove("hidden-item");
        }
        this.classList.remove("closed-section");
        this.classList.add("open-section");
    } else {
        for(var i = 0; i < children.length; i++) {
            children[i].classList.add("hidden-item");
        }
        this.classList.remove("open-section");
        this.classList.add("closed-section");
    }
}

function itemResponseClickHandler(event) {
    if (event && event.stopPropagation) {
        event.stopPropagation();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    var sections = document.getElementsByClassName("section");
    for(var i = 0; i < sections.length; i++) {
        sections[i].addEventListener("click", sectionClickHandler);
    }

    var itemResponses = document.getElementsByClassName("item-response");
    for(var i = 0; i < itemResponses.length; i++) {
        itemResponses[i].addEventListener("click", itemResponseClickHandler);
    }
});

const animTypes = {
    GROW: "grow",
    SHRINK: "shrink"
};

// AnimationQueueElement represents an animation that needs to happen
// - id       : The id of the HTML element to be animated
// - animType : An enum of animations that can be performed
// - info     : An object containing information specific to the animation being performed
//      - GROW  : originalSize (Number), targetSize (Number)
//      - SHRINK: originalSize (Number), targetSize (Number)
class AnimationQueueElement {

    constructor(id, animType, info) {
        this.id = id;
        this.animType = animType;
        this.info = info;
    }

    get id() {
        return this.id;
    }

    get animType() {
        return this.animType;
    }

    get target() {
        return this.info;
    }

}

// Queue for animations to be performed
var animationQueue = [];

function grow(id) {
    animationQueue.push(new AnimationQueueElement(
        id,
        animTypes.GROW,
        getGrowthInfo(id)
    ));
}

// Calculate the information needed to successfully perform a growth animation
function getGrowthInfo(id) {
    var element = document.getElementById(id);
    if (!element) {
        throw new Error("Could not find element with id: " + id);
    }
    if (!element.className.match(/(?<!-)section/g)) {
        throw new Error("This element is not a section element.");
    }
    var info = {};
    var originalSize = element.offsetHeight;
    var sectionItems = element.getElementsByClassName("section-item");
    // TODO find a way to calculate the heights of the hidden section items
    return info;
}
