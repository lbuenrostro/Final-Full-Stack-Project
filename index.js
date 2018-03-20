// *****Email FUNCTIONS**************
function containSymbol(email) {
    var symbol = /[0-9@]/i;
    if (symbol.test(email)) {
        return true;
    }
    return false;
}
function checkingEmailError(string) {
    var characters = [];
    if (containSymbol(string) == false) {
        characters.push('<li>Email must contain "@" & one number</li>');
    }
    return characters.join('');
}
//
function EmailErrorHtml(email) {
    const html = checkingEmailError(email);
    $('#Email-errors').html(html);
}
//
function addEmailValidation() {
    const input = $('#Email-input');
    input.on('input', function(event) {
        EmailErrorHtml(event.currentTarget.value);
        enableButton();
    });
}
//
// ********USERNAME FUNCTION***********

function onlyNumbersAndLetters(string) {
    var letters = /^[0-9a-z]*$/i;
    if (letters.test(string)) {
        return true;
    }
    return false;
}
function checkError(string) {
    var characters = [];
    if (string.length < 8 || string.length > 16) {
        characters.push('<li>8-16 characters</li>');
    }
    if (onlyNumbersAndLetters(string) == false) {
        characters.push('<li>username must contain numbers & letters</li>');
    }
    return characters.join('');
}
function usernameErrorHtml(username) {
    const html = checkError(username);
    $('#Username-errors').html(html);
}

function addUsernameValidation() {
    const input = $('#Username-input');
    input.on('input', function(event) {
        usernameErrorHtml(event.currentTarget.value);
        enableButton();
    });
}

// *****PASSWORD FUNCTIONS*****//

function containsLetter(password) {
    var letter = /[a-z]/i;
    if (letter.test(password)) {
        return true;
    }
    return false;
}

function containsNum(password) {
    var num = /[0-9]/;
    if (num.test(password)) {
        return true;
    }
    return false;
}

function containsPunctation(password) {
    var punctation = /[!:;"',.?]/;
    if (punctation.test(password)) {
        return true;
    }
    return false;
}

function checkingPasswordError(string) {
    var LetterDigitPunctuation = [];
    if (string.length < 11 || string.length > 15) {
        LetterDigitPunctuation.push(
            '<li>has to be between 12-16 character</li>'
        );
    }
    if (containsLetter(string) == false) {
        LetterDigitPunctuation.push('<li>at least one Letter</li>');
    }
    if (containsNum(string) == false) {
        LetterDigitPunctuation.push('<li>at least one number</li>');
    }
    if (containsPunctation(string) == false) {
        LetterDigitPunctuation.push('<li>at least one punctuation</li>');
    }

    return LetterDigitPunctuation.join('');
}

function passwordErrorHtml(password) {
    const html = checkingPasswordError(password);
    $('#Password-errors').html(html);
}

function addpasswordValidation() {
    const input = $('#Password-input');
    input.on('input', function(event) {
        passwordErrorHtml(event.currentTarget.value);
        enableButton();
    });
}

// -------------- ENABLE BUTTON -----------
function checkValidEmail() {
    return checkingEmailError($('#Email-input').val()).trim() === '';
}
function checkValidUser() {
    return checkError($('#Username-input').val()).trim() === '';
}
function checkValidPassword() {
    return checkingPasswordError($('#Password-input').val()).trim() === '';
}
function enableButton() {
    if (checkValidEmail() && checkValidUser() && checkValidPassword()) {
        $('.btn').attr('disabled', false);
    } else {
        $('.btn').attr('disabled', true);
    }
}
// -------------- JSON PAGE-DATA -----------
$('#signup-form').on('submit', function(event) {
    event.preventDefault();
    var email = $('#Email-input').val();
    console.log(email);
    var username = $('#Username-input').val();
    console.log(username);
    var password = $('#Password-input').val();
    console.log(password);
});

function postServer() {
    $('#signup-form').on('submit', function(event) {
        $.post(
            'http://localhost:8080/posts/new/',
            JSON.stringify({
                email: $('#Email-input').val(),
                username: $('#Username-input').val(),
                password: $('#Password-input').val()
            })
        )
            .then(function successfullSignup(data) {
                console.log(data);
            })
            .catch(function unsuccessfulSignup(response) {
                console.log(response.status);
                console.log(response.response.JSON);
            });
    });
}

// -------------- Log-in -----------
function loginServer() {
    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        $.post(
            'http://localhost:8080/posts/new/',
            JSON.stringify({
                username: $('#User').val(),
                password: $('#Pass').val()
            })
        )
            .then(function successfulLogin(data) {
                console.log('Hello World');
                window.location = 'profile/profile.html';
                console.log(data);
            })
            .catch(function unsuccessfulLogin(response) {
                console.log();
                console.log(response.status);
                console.log(response.response.JSON);
            });
    });
}
// ------------------------------------------
function main() {
    addEmailVlidation();
    addUsernameValidation();
    addpasswordValidation();
    postServer();
    loginServer();
}

$(main);
