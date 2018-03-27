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
    $('#Name-errors').html(html);
}

function addNameValidation() {
    const input = $('#Name-input');
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
    return checkingNameError($('#Name-input').val()).trim() === '';
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
// Fucnction triggers the top-bar buttons
function loadPages() {
    $('.headline-btns').click(function() {
        $('.main-div-group').hide();
        var id = $(this).attr('id');
        var div = '#' + id.replace('btn', 'div');
        $(div).show();
    });
}
// ------------------------------------------
function main() {
    addNameValidation();
    addUsernameValidation();
    addpasswordValidation();
    addEmailValidation();
    $('#Signup-form').on('submit', function(event) {
        event.preventDefault();
        checksSignUpForm();
        var name = $('#Name-input').val();
        console.log(name);
        var username = $('#Username-input').val();
        console.log(username);
        var email = $('#Email-input').val();
        console.log(email);
        var password = $('#Password-input').val();
        console.log(password);
    });
    loadPages();
}

$(main);
