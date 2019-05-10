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
    let sections = document.getElementsByClassName("section");
    for(var i = 0; i < sections.length; i++) {
        sections[i].addEventListener("click", sectionClickHandler);
    }

    let itemResponses = document.getElementsByClassName("item-response");
    for(var i = 0; i < itemResponses.length; i++) {
        itemResponses[i].addEventListener("click", itemResponseClickHandler);
    }

    Array.prototype.forEach.call(document.getElementsByClassName("any-input"), (input) => {
        if (input.className.includes("required")) {
            input.addEventListener("blur", (blurEvent) => {
                let completed = Array.prototype.filter.call(
                    document.getElementsByClassName("required-input"),
                    (response) => response.value != "" && response.value !== 0
                ).length;

                document.getElementById("backdrop").style.top =
                    (100 - (100 * (completed / itemResponses.length))) + "%";
            });
        }
        input.addEventListener("blur", (blurEvent) => {
            blurEvent.target.className = blurEvent.target.className.replace(/completed-input/, "");
            if (blurEvent.target.value != "" && blurEvent.target.value !== 0) {
                blurEvent.target.className += " completed-input";
            }
        })
    });
});
