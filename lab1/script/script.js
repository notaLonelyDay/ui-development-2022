
const blocks = document.querySelectorAll(".FAQ-block");

blocks.forEach(function (item) {
    item.addEventListener("click", blockClick);
});

let openIndex = getCookie("openIndex");
let firstElement = blocks[openIndex ?? 0];
let preventActiveElement;

firstElement.click();

function blockClick() {
    if (this.classList.contains("hidden")) {

        this.classList.toggle("hidden");
        preventActiveElement?.classList.toggle("hidden");
        preventActiveElement = this;

        let index;
        blocks.forEach((item, num) => {
            if (item === this) {
                index = num;
            }
        })

        document.cookie = "openIndex=" + index;
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
