// region spoilers

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

// endregion

// region video

function openModal() {
    var modal = document.getElementById("video-modal");
    var iframe = document.getElementById("video");

    // Display window & autoplay
    modal.style.display = "block";
    iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
}

function closeModal(event) {
    var modal = document.getElementById("video-modal");
    var iframe = document.getElementById("video");

    if (event.target !== iframe) {
        // Hide window & remove source (including autoplaying)
        modal.style.display = "none";
        iframe.src = "";
    }
}

// endregion

//region modal form

document.querySelectorAll(".try-for-free-button").forEach(function (item) {
    item.addEventListener("click", openModalForm)
})

// DEBUG ONLY
document.querySelector("#continue-button").addEventListener("click", function () {
    document.cookie = "isRegistered=no"
})

let timeoutID


function openModalForm() {
    createModalForm()
    setTimeout(function () {
        document.querySelector(".modal-registration").classList.add("open-modal")
    }, 0)
}

function createModalForm() {

    let modalRegistration = document.createElement("div")
    modalRegistration.classList.add("modal-registration")
    document.body.append(modalRegistration);

    let modalBorder = document.createElement("div")
    modalBorder.classList.add("modal-border")
    modalRegistration.append(modalBorder)

    let modalForm = document.createElement("div")
    modalForm.classList.add("modal-form")
    modalBorder.append(modalForm)

    let form = document.createElement("div")
    form.classList.add("form")

    let closeButton = document.createElement("i")
    closeButton.classList.add("fa", "fa-times", "fa-2x", "modal-close-btn")
    closeButton.addEventListener("click", closeModalForm)

    modalForm.append(form, closeButton)

    let isRegistered = getCookie("isRegistered")
    if (isRegistered === undefined || isRegistered === "no"){

        let modalLabel = document.createElement("h3")
        modalLabel.classList.add("modal-label")
        modalLabel.textContent = "Apply for registration"

        let nameInput = document.createElement("input")
        with (nameInput) {
            type = "text"
            id = "name"
            name = "Name"
            placeholder = "Enter name"
            classList.add("modal-input")
            required = true
            addEventListener("change", validateForm)
        }

        let mailInput = document.createElement("input")
        with (mailInput) {
            type = "email"
            id = "email"
            name = "Mail"
            placeholder = "Enter Email address"
            classList.add("modal-input")
            required = true
            addEventListener("change", validateForm)
        }

        let telephoneInput = document.createElement("input")
        with (telephoneInput) {
            type = "tel"
            id = "phone"
            name = "Phone"
            placeholder = "Enter telephone number"
            classList.add("modal-input")
            required = true
            pattern = "\\+375[0-9]{9}"
            addEventListener("change", validateForm)
        }

        let applyButton = document.createElement("input")
        with (applyButton) {
            type = "submit"
            id = "ApplyButton"
            name = "Apply"
            classList.add("big-blue-button", "modal-btn")
            disabled = true
            addEventListener("click", submitModalForm)
        }

        form.append(modalLabel, nameInput, mailInput, telephoneInput, applyButton)

    } else {

        modalBorder.classList.add("small-modal-border")

        let isRegisteredMessage = document.createElement("p")
        isRegisteredMessage.classList.add("success-message")
        isRegisteredMessage.textContent = "Registration has already been made"

        form.append(isRegisteredMessage)
        if (timeoutID)
            clearTimeout(timeoutID)
        timeoutID = setTimeout(closeModalForm, 5000)

    }


}

function closeModalForm() {
    document.querySelector(".modal-registration")?.classList.remove("open-modal")
    if (timeoutID)
        clearTimeout(timeoutID)
    setTimeout(removeModalForm, 400)
}

function removeModalForm() {
    document.querySelector(".modal-registration")?.remove()
}


function validateForm() {
    let name = document.getElementById("name").validity.valid;
    let email = document.getElementById("email").validity.valid;
    let telephone = document.getElementById("phone").validity.valid;

    document.getElementById("ApplyButton").disabled = !(name && email && telephone);
}

function submitModalForm() {
    let success = document.createElement("p")
    success.classList.add("success-message")
    success.textContent = "form was submitted successfully"
    let form = document.querySelector(".form")
    form.append(success)
    document.cookie = "isRegistered=yes"
    if (timeoutID)
        clearTimeout(timeoutID)
    timeoutID = setTimeout(closeModalForm, 5000)
}

//endregion

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}