const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const tripInput = document.getElementById('chosen');
const errorMsg = document.getElementsByClassName('error');
const successIcon = document.getElementsByClassName('success-icon');
const failureIcon = document.getElementsByClassName('failure-icon');
const modalBody = document.getElementById('modal-body');
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

let userName = '';
let userSurname = '';
let tripChosen = '';

function openModal(modal) {
    if (modal == null)
        return;
    modal.classList.add('active');
    overlay.classList.add('active');
}
  
function closeModal(modal) {
    if (modal == null)
        return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
      if (validateForm()) {
        const userName = nameInput.value;
        const userSurname = surnameInput.value;
        const tripChosen = tripInput.value;

        const modal = document.querySelector(button.dataset.modalTarget)
        modalBody.innerHTML = '<p class="name"> Imię: '+userName+ '</p>'+
                                '<p class="surname"> Nazwisko: '+ userSurname + '</p>'+
                                '<p class="trip"> Wycieczka: '+ tripChosen + '</p>' +
                                modalBody.innerHTML;
        
        openModal(modal);
      }
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  })
})

function serialOf(id) {
    return id === "name" ? 0 : 1;
}

function constructMessage(field, suffix) {
    return field.charAt(0).toUpperCase() + field.slice(1) + " " + suffix;
}

function displayError(id, serial, message) {
    const field = document.getElementById(id);

    field.style.border = "2px solid red";
    errorMsg[serial].innerHTML = message;
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";
}

function cleanError(id, serial) {
    const field = document.getElementById(id);

    field.style.border = "2px solid green";
    errorMsg[serial].innerHTML = "";
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "1";
}

function validateFormField(field) {
    const value = document.forms['form'][field].value.trim();
    const serial = serialOf(field);

    if (value.length == 0) {
        displayError(field, serial, constructMessage(field, "cannot be empty."));
        return false;
    } else if (value.length > 40) {
        displayError(field, serial, constructMessage(field, "is too long."));
        return false;
    }

    cleanError(field, serial);

    return true;
}

function validateForm() {
    const validName = validateFormField('name');
    const validSurname = validateFormField('surname');
    return validName && validSurname;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
});

nameInput.addEventListener("focus", (event) => {
    nameInput.style.background = "azure";
});

nameInput.addEventListener("blur", (event) => {
    nameInput.style.background = "";
});

surnameInput.addEventListener("focus", (event) => {
    surnameInput.style.background = "azure";
});

surnameInput.addEventListener("blur", (event) => {
    surnameInput.style.background = "";
});