// *****Name FUNCTIONS*****//
function onlyLetters(string) {
    var letters = /[a-z]/i;
    if (letters.test(string)) {
        return true;
    }
    return false;
}
function checkingNameError(string) {
    var characters = [];
    if (string.length < 8 || string.length > 20) {
        characters.push('<li>Please Enter a valid name</li>');
    }
    if (onlyLetters(string) == false) {
        characters.push('<li>Invalid Only letters</li>');
    }
    return characters.join('');
}
function NameErrorHtml(name) {
    const html = checkingNameError(name);
    $('#adopterName-errors').html(html);
}

function addNameValidation() {
    const input = $('#adopterName-input');
    input.on('input', function(event) {
        NameErrorHtml(event.currentTarget.value);
        enableButton();
    });
}
// ********USERNAME FUNCTION***********

function onlyNumbersAndLetters(string) {
    var letters = /^[0-9a-z]*$/i;
    if (letters.test(string)) {
        return true;
    }
    return false;
}
function checkingUsernameError(string) {
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
    const html = checkingUsernameError(username);
    $('#Username-errors').html(html);
}

function addUsernameValidation() {
    const input = $('#Username-input');
    input.on('input', function(event) {
        usernameErrorHtml(event.currentTarget.value);
        enableButton();
    });
}

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

function EmailErrorHtml(email) {
    const html = checkingEmailError(email);
    $('#Email-errors').html(html);
}

function addEmailValidation() {
    const input = $('#Email-input');
    input.on('input', function(event) {
        EmailErrorHtml(event.currentTarget.value);
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
function checkValidName() {
    return checkingNameError($('#adopterName-input').val()).trim() === '';
}
function checkValidUsername() {
    return checkingUsernameError($('#Username-input').val()).trim() === '';
}
function checkValidEmail() {
    return checkingEmailError($('#Email-input').val()).trim() === '';
}
function checkValidPassword() {
    return checkingPasswordError($('#Password-input').val()).trim() === '';
}
function enableButton() {
    if (
        checkValidName() &&
        checkValidEmail() &&
        checkValidUsername() &&
        checkValidPassword()
    ) {
        $('.btn').attr('disabled', false);
    } else {
        $('.btn').attr('disabled', true);
    }
}

function checksSignUpForm() {
    if (
        checkValidName() &&
        checkValidEmail() &&
        checkValidUsername() &&
        checkValidPassword()
    ) {
        $('#Signup-form').hide();
        $('#afterFormMessage')
            .html('<h3>It works</h3>')
            .show();
    } else {
        $('#afterFormMessage')
            .html("<h3>Doesn't work</h3>")
            .show();
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
// LOGIN ACCOUNT
// ********USERNAME FUNCTION***********

function OnlyNumbersAndLetters(string) {
    var letters = /^[0-9a-z]*$/i;
    if (letters.test(string)) {
        return true;
    }
    return false;
}
function UsernameError(string) {
    var characters = [];
    if (string.length < 8 || string.length > 16) {
        characters.push('<li>8-16 characters</li>');
    }
    if (OnlyNumbersAndLetters(string) == false) {
        characters.push('<li>username must contain numbers & letters</li>');
    }
    return characters.join('');
}
function UsernameErrorHtml(username) {
    const html = UsernameError(username);
    $('#Username-Errors').html(html);
}

function AddUsernameValidation() {
    const input = $('#Username-Input');
    input.on('input', function(event) {
        UsernameErrorHtml(event.currentTarget.value);
        EnableButton();
    });
}

// *****PASSWORD FUNCTIONS*****//

function contains(password) {
    var letter = /[0-9a-z!:;"',.?]*S/i;
    if (letter.test(password)) {
        return true;
    }
    return false;
}
function PasswordError(string) {
    var LetterDigitPunctuation = [];
    if (string.length < 11 || string.length > 15) {
        LetterDigitPunctuation.push(
            '<li>has to be between 12-16 character</li>'
        );
    }
    if (contains(string) == false) {
        LetterDigitPunctuation.push('<li>Number && Punctuation</li>');
    }
    return LetterDigitPunctuation.join('');
}

function PasswordErrorHtml(password) {
    const html = PasswordError(password);
    $('#Password-Errors').html(html);
}

function AddpasswordValidation() {
    const input = $('#Password-Input');
    input.on('input', function(event) {
        PasswordErrorHtml(event.currentTarget.value);
        enableButton();
    });
}

// -------------- ENABLE BUTTON -----------
function CheckValidUsername() {
    return UsernameError($('#Username-Input').val()).trim() === '';
}
function CheckValidPassword() {
    return PasswordError($('#Password-Input').val()).trim() === '';
}
function EnableButton() {
    if (CheckValidUsername() && CheckValidPassword()) {
        $('.btn').attr('disabled', false);
    } else {
        $('.btn').attr('disabled', true);
    }
}

function checksLoginForm() {
    if (CheckValidUsername() && CheckValidPassword()) {
        $('#login-form').hide();
        $('#afterLoginFormMessage')
            .html('<h3>It works</h3>')
            .show();
    } else {
        $('#afterLoginFormMessage')
            .html("<h3>Doesn't work</h3>")
            .show();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// Button controller (top-bar)
function loadPages() {
    $('.headline-btns').click(function() {
        $('.main-div-group').hide();
        var id = $(this).attr('id');
        var div = '#' + id.replace('btn', 'div');
        $(div).show();
    });
}

// ------------------------------------------
function registerSignUpHandler() {
    $('#Signup-form').on('submit', function(event) {
        event.preventDefault();
        console.log(
            JSON.stringify({
                adopterName: $('#adopterName-input').val(),
                username: $('#Username-input').val(),
                email: $('#Email-input').val(),
                password: $('#Password-input').val()
            })
        );
        $.ajax({
            url: 'http://localhost:8080/SignUp/',
            method: 'POST',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify({
                adopterName: $('#adopterName-input').val(),
                username: $('#Username-input').val(),
                email: $('#Email-input').val(),
                password: $('#Password-input').val()
            }),
            contentType: 'application/json',
            mimeType: 'application/json',
            error: function(data, status, er) {
                alert('status: ' + status);
            }
        });
    });
}
// ------------------------------------------
function registerLoginHandler() {
    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        console.log(
            JSON.stringify({
                username: $('#Username-Input').val(),
                password: $('#Password-Input').val()
            })
        );
        $.ajax({
            url: 'http://localhost:8080/Login/',
            method: 'POST',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify({
                adopterName: $('#Username-Input').val(),
                password: $('#Password-Input').val()
            }),
            contentType: 'application/json',
            mimeType: 'application/json',
            error: function(data, status, er) {
                alert('status: ' + status);
            }
        });
    });
}
// ------------------------------------------
function main() {
    addNameValidation();
    addUsernameValidation();
    addpasswordValidation();
    addEmailValidation();
    // $('#Signup-form').on('submit', function(event) {
    //     event.preventDefault();
    //     checksSignUpForm();
    //     var name = $('#adopterName-input').val();
    //     console.log(name);
    //     var username = $('#Username-input').val();
    //     console.log(username);
    //     var email = $('#Email-input').val();
    //     console.log(email);
    //     var password = $('#Password-input').val();
    //     console.log(password);
    // });
    AddUsernameValidation();
    AddpasswordValidation();
    // $('#login-form').on('submit', function(event) {
    //     event.preventDefault();
    //     checksLoginForm();
    //     var Username = $('#Username-Input').val();
    //     console.log(Username);
    //     var Password = $('#Password-Input').val();
    //     console.log(Password);
    // });
    loadPages();
    registerSignUpHandler();
    registerLoginHandler();
}

$(main);
