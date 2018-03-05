function addListenerToClass(name, event, listener) {
    var inputs = Array.from(document.getElementsByClassName(name));
    inputs.map(element => element.addEventListener(event, listener));
}

function performOnClass(name, action) {
    var inputs = Array.from(document.getElementsByClassName(name));
    inputs.map(action);
}

window.onload = function () {

/*
    hide = element => element.style.visibility = "hidden";
    performOnClass("any-input", hide);

    function fadeInInputs(element) {
        
    }
*/

    addListenerToClass("any-input", "click", function() { console.log(this.className); });

}
