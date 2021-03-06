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
    modalRegistration.addEventListener("click", function (event) {
        if (event.target === modalRegistration)
            closeModalForm()
    })

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
    if (isRegistered === undefined || isRegistered === "no") {

        let modalLabel = document.createElement("h3")
        modalLabel.classList.add("modal-label")
        modalLabel.textContent = "Submit for registration"

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

//region slider

const reviews = [
    {
        name: "Zoltan Nemeth",
        position: "CEO of Pixler Lab",
        title: "User friendly & Customizable",
        picture_src: "img/reviews-people/man2.png",
        text: `Bring to the table win-win survival strategies to ensure proactive domi-<br>
                nation. At the end of the day, going forward, a new normal that has<br>
                evolved from generation X is on the runway heading towards a<br>
                streamlined cloud solution. User generated content in real-time will<br>
                have multiple touchpoints for offshoring.`,
        stars: 5,
    },
    {
        name: "Alexey Y.",
        position: "Head of Arc",
        title: "Really bad app",
        picture_src: "img/reviews-people/man3.png",
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.`,
        stars: 1,
    },
    {
        name: "Alexey Ya.",
        position: "Backend developer",
        title: "Perfecto amigos",
        picture_src: "img/reviews-people/man1.png",
        text: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.`,
        stars: 4,
    },
];

function getReviewPos() {
    return getCookie("reviewPos") ?? 0;
}

document.getElementById("slider-btn-left").addEventListener("click", function () {
    let curPos = getReviewPos();
    curPos--;
    if (curPos < 0) curPos += reviews.length;
    changeReview(curPos);
});

document.getElementById("slider-btn-right").addEventListener("click", function () {
    let curPos = getReviewPos();
    curPos++;
    if (curPos >= reviews.length) curPos -= reviews.length;
    changeReview(curPos);
});
changeReview(getReviewPos());

function changeReview(pos) {
    document.cookie = "reviewPos=" + pos;
    let review = reviews[pos];
    document.getElementById("slider-title").innerText = review.title;
    document.getElementById("slider-picture").src = review.picture_src;
    document.getElementById("slider-text").innerHTML = review.text;
    document.getElementById("slider-name").innerText = review.name;
    document.getElementById("slider-position").innerText = review.position;

    // document.getElementById("review-stars").innerHTML = "";
    for (let i = 0; i < 5; i++) {
        let star = document.getElementById("slider-star-" + i);
        if (i < review.stars)
            star.style.display = "inline-block"
        else
            star.style.display = "none"
    }
}

//endregion
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}