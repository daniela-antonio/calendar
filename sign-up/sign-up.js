let form = document.getElementById('form');
let username = document.getElementById('username');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let password = document.getElementById('password');
let cpassword = document.getElementById('cpassword');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    Validate();
})

// let sendData = (usernameVal, sRate, Count) => {
//     if (sRate === Count) {
//         swal("Hello " + usernameVal, "You are Registered", "success");
//     }
// }

// let SuccessMsg = (usernameVal) => {
//     let formContr = document.getElementsByClassName('form-control');
//     var Count = formContr.length - 1;
//     for (var i = 0; i < formContr.length; i++) {
//         if (formContr[i].className === "form-control success") {
//             var sRate = 0 + i;
//             console.log(sRate);
//             sendData(usernameVal, sRate, Count);
//         }
//         else {
//             return false;
//         }
//     }
// }


let isEmail = (emailVal) => {
    var atSymbol = emailVal.indexOf('@');
    if (atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if (dot <= atSymbol + 2) return false;
    if (dot === emailVal.length - 1) return false;
    return true;
}

function Validate() {
    let usernameVal = username.value.trim();
    let lastnameVal = lastname.value.trim();
    let emailVal = email.value.trim();
    let passwordVal = password.value.trim();
    let cpasswordVal = cpassword.value.trim();

    //username
    if (usernameVal === "") {
        setErrorMsg(username, 'first name cannot be blank');
    } else if (usernameVal.length <= 2) {
        setErrorMsg(username, 'min 3 char');
    } else {
        setSuccessMsg(username);
    }

    //last name
    if (lastnameVal === "") {
        setErrorMsg(lastname, 'last name cannot be blank');
    } else if (lastnameVal.length <= 2) {
        setErrorMsg(lastname, 'min 3 char');
    } else {
        setSuccessMsg(lastname);
    }

    //email
    if (emailVal === "") {
        setErrorMsg(email, 'email cannot be blank');
    } else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'email is not valid');
    } else {
        setSuccessMsg(email);
    }

    //password
    if (passwordVal === "") {
        setErrorMsg(password, 'password cannot be blank');
    } else if (passwordVal.length <= 7) {
        setErrorMsg(password, 'min 8 char');
    } else {
        setSuccessMsg(password);
    }

    //confirm password
    if (cpasswordVal === "") {
        setErrorMsg(cpassword, 'confirm password cannot be blank');
    } else if (passwordVal != cpasswordVal) {
        setErrorMsg(cpassword, 'Not Matched!');
    } else {
        setSuccessMsg(cpassword);
    }
    // SuccessMsg(usernameVal);

}

function setErrorMsg(input, errormsgs) {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');
    formControl.className = "form-control error";
    small.innerText = errormsgs;
}

function setSuccessMsg(input) {
    let formControl = input.parentElement;
    formControl.className = "form-control success";
}
