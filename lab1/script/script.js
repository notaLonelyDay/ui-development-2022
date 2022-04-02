const blocks = document.querySelectorAll(".FAQ-block");
let preventActiveElement = blocks[0];


blocks.forEach(function (item) {
    item.addEventListener("click", blockClick);
});

function blockClick() {
    if (this.classList.contains("hidden")) {
        this.classList.toggle("hidden");
        preventActiveElement.classList.toggle("hidden");
        preventActiveElement = this;
    }
}
