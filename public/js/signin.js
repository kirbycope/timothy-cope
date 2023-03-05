/** POSTs the Login form's values to the authentication API. */
function postCredentials() {
    var email = 'email=' + encodeURIComponent(document.getElementById('inputEmail').value);
    var password = '&password=' + encodeURIComponent(document.getElementById('inputPassword').value);
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var newUrl = window.location.origin + "/admin/dashboard";
            location.href = newUrl;
        }
        else if (this.readyState === 4) {
            buttonSubmit.disabled = false;
        }
    };
    xmlHttpRequest.open("POST", "/api/admin/login", true);
    xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.send(email + password);
}

//#region Event Listeners

/** Sets the click event listener for the 'Submit' button. */
function buttonSubmit_click() {
    var buttonSubmit = document.getElementById('buttonSubmit');
    buttonSubmit.addEventListener('click', function () {
        buttonSubmit.disabled = true;
        postCredentials();
    });
}

//#endregion

// After the window has loaded...
window.onload = function () {

    // Set onclick for 'Submit' button
    buttonSubmit_click();

};
