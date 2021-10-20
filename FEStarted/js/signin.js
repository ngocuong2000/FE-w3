document.getElementById("pop").addEventListener("click", clickSign);
var popUp = document.getElementById("pop-md");

function mouseOver() {
    document.getElementById("pop-item-md").classList.toggle("visible");
}
function clickSign() {
    document.getElementById("pop-item").classList.toggle("visible");
}