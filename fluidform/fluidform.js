function addListenerToClass(name, event, listener) {
    var inputs = Array.from(document.getElementsByClassName(name));
    inputs.map(element => element.addEventListener(event, listener));
}

function performOnClass(name, action) {
    var inputs = Array.from(document.getElementsByClassName(name));
    inputs.map(action);
}

window.onload = function () {

    // Hover style changes for closed sections
    addListenerToClass("closed-section", "mouseover", function() {
        this.style.backgroundColor = "#eeeeee";
    });
    addListenerToClass("closed-section", "mouseout", function() {
        this.style.backgroundColor = "White";
    });

    // Animate section opening
    addListenerToClass("closed-section", "click", function() {
        var sectionElement = this;
        var intervalID = setInterval(openSection, 5);
        function openSection() {
            var computedStyle = window.getComputedStyle(sectionElement);
            var currentHeight = parseInt(computedStyle.height.slice(0, -2), 10);
            if (currentHeight >= 400) {
                sectionElement.style.height = 400;
                clearInterval(intervalID);
                sectionElement.className = sectionElement.className.replace(/\bclosed-section\b/g, "");
                sectionElement.className += " open-section";
            } else {
                var increased = currentHeight + 10;
                sectionElement.style.height = increased.toString();
            }
        }
    });

    // Animate section closing
    addListenerToClass("open-section", "click", function() {
        var sectionElement = this;
        var intervalID = setInterval(closeSection, 5);
        function closeSection() {
            var computedStyle = window.getComputedStyle(sectionElement);
            var currentHeight = parseInt(computedStyle.height.slice(0, -2), 10);
            if (currentHeight <= 120) {
                console.log("all done closing");
                sectionElement.style.height = 120;
                clearInterval(intervalID);
                sectionElement.className = sectionElement.className.replace(/\bopen-section\b/g, "");
                sectionElement.className += " closed-section";
            } else {
                console.log("trying to close...");
                var decreased = currentHeight - 10;
                sectionElement.style.height = decreased.toString();
            }
        }
    });

}









