
const buttons = document.querySelectorAll(".blue-btn");
var isCorrectName = false;
var isCorrectEmail = false;
var isCorrectPhone = false;
var registrated = false;

buttons.forEach(function (item) {
    item.onclick = function() {
        if(!localStorage.getItem('reg')){
            open();
        }else{
            alert("Already registrated!");
            registrated = localStorage.getItem('reg');
        }
    }
});

const myModal = modal();

const cross = document.querySelector(".modal-close");
cross.addEventListener("click", close);

let inpPhone = document.querySelector('.modalphone');
let inpEmail = document.querySelector('.email');
let inpName = document.querySelector('.name');
var btn = document.querySelector('.btn-send');

btn.setAttribute('disabled', true);

btn.onclick = function() {
    document.cookie = "user=reg";
    btn.setAttribute('disabled', true);
    alert("Заявка на регистрацию отправлена!");
    registrated = true;
    localStorage.setItem('reg', registrated);
    setTimer();
};

inpPhone.oninput = function() {
    let phone = document.getElementById('phone').value;
    if (!validatePhone(phone)){
        isCorrectPhone = false;
    }else{
        isCorrectPhone = true;
    }

    if(isCorrectPhone){
        inpPhone.classList.add('.corrPhone');
    }else{
        if(inpPhone.classList.contains('.corrPhone')){
            inpPhone.classList.remove('.corrPhone');
        }
        
    }

    checkState(btn);
}

inpEmail.oninput = function() {
    let email = document.getElementById('email').value;
    if(!validateEmail(email)){
        isCorrectEmail = false;
    }else{
        isCorrectEmail = true;
    }

    checkState(btn);
}

inpName.oninput = function() {
    let name = document.getElementById('name').value;
    if(!validateName(name)){
        isCorrectName = false;
    }else{
        isCorrectName = true;
    }

    checkState(btn);
}

function open() {
    return myModal.open();
}

function close() {
    return myModal.close();
}

function validatePhone(phone){
    var regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/;
    return regex.test(phone);
}

function validateEmail(email){
    var regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    return regex.test(email);
}

function validateName(name){
    var regex = /^[a-zA-Z\-]+$/;
    return regex.test(name);
}

function checkState(button) {
    if(isCorrectName && isCorrectEmail && isCorrectPhone){
        button.removeAttribute('disabled');
        document.getElementById('btn-send').style.color = '#fff';
        document.getElementById('btn-send').style.background = '#2500F9';
    }else{
        button.setAttribute('disabled', true);
        document.getElementById('btn-send').style.color = 'gray';
        document.getElementById('btn-send').style.background = 'rgba(37, 0, 249, .15)';
    }
}

function setTimer() {
    timer = setTimeout(function(){
        close();
    }, 5000)
}