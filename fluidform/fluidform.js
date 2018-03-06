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
        var intervalID = setInterval(frame, 5);
        var sectionElement = this;
        function frame() {
            var computedStyle = window.getComputedStyle(sectionElement);
            var currentHeight = parseInt(computedStyle.height.slice(0, -2), 10);
            console.log("current height: " + currentHeight);
            if (currentHeight >= 400) {
                sectionElement.style.height = 400;
                clearInterval(intervalID);
            } else {
                var increased = currentHeight + 10;
                sectionElement.style.height = increased.toString();
            }
        }
    });

}









