//GLOBAL VARS
SESSIONKEYID = Number();
USERNAME = '';

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
    if (string.length < 2 || string.length > 20) {
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

$('#adopterName-input').on('input', function(event) {
    NameErrorHtml(event.currentTarget.value);
    enableButton();
});
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
$('#Username-input').on('input', function(event) {
    usernameErrorHtml(event.currentTarget.value);
    enableButton();
});
// }

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

$('#Email-input').on('input', function(event) {
    EmailErrorHtml(event.currentTarget.value);
    enableButton();
});

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

$('#Password-input').on('input', function(event) {
    passwordErrorHtml(event.currentTarget.value);
    enableButton();
});

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
    }
}

// Button controller (top-bar)
function loadPages() {
    $('.headline-btns').click(function() {
        $('.main-div-group').hide();
        var id = $(this).attr('id');
        // creating string name for which div to show
        var div = '#' + id.replace('btn', 'div');
        $(div).show();
    });
}

// ------------------------------------------
function registerSignUpHandler(event) {
    console.log(
        JSON.stringify({
            // IntelliJ (adoptername): Html form id(#adopterName-input')
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
    })
        .then(function successfulSignUp(response) {
            console.log();
            SESSIONKEYID = response.sessionKey;
            USERNAME = response.username;
            successfulLoginLoadUp(response);
        })
        .catch(function unsuccessfulLogin(response) {
            console.log('Unable to Sign Up');
            console.log(response.statusText);
        });
}

$('#Signup-form').on('submit', function(event) {
    event.preventDefault();
    registerSignUpHandler(event);
});

// ------------------------------------------
$('#login-form').on('submit', function(event) {
    event.preventDefault();
    // console.log($('#Password-Input').val());
    $.ajax({
        url: 'http://localhost:8080/Login/',
        method: 'POST',
        dataType: 'json',
        crossDomain: true,
        data: JSON.stringify({
            username: $('#Username-Input').val(),
            password: $('#Password-Input').val()
        }),
        contentType: 'application/json',
        mimeType: 'application/json',
        error: function(data, status, er) {
            alert('Username or Password incorrect please try again!!');
        }
    })
        .then(function successfulLogin(response) {
            SESSIONKEYID = response.sessionKey;
            USERNAME = response.username;
            console.log(SESSIONKEYID);
            console.log(USERNAME);
            successfulLoginLoadUp(response);
        })
        .catch(function unsuccessfulLogin(response) {
            console.log('Unable to Login');
            console.log(response.statusText);
        });
    // .then(alert('Woo! Good Job!'));
});

function successfulLoginLoadUp(response) {
    console.log('this works');
    console.log(response);
    console.log(response.adopterName);
    showPuppies();
    $('#welcome-username').text(
        'Welcome to Puppy Love  ' + response.adopterName + ''
    );
    // $('#puppy_records').attr('disabled', false);
    $('#LogOut').show();
    $('.main-group-div').hide(250);
    $('#login-div').remove();
    $('#signUp-div').remove();
    $('#puppy_records').show(450);
}

function puppy_records(puppies) {
    var puppiesLayout = puppies
        .map(function(puppy_records) {
            return [
                "<div class='PuppyTables' col-lg-6 col-md-8 col-sm-5",
                "<tr id='all-puppies' class='card text-white bg-dark mb-3' style='max-width: 30em;'>",
                '<td>' +
                    '<img src=' +
                    puppy_records.puppy_img_url +
                    '>' +
                    '<p> Breed: ' +
                    puppy_records.breed +
                    '</p>' +
                    '<p> Gender: ' +
                    puppy_records.gender +
                    '</p>' +
                    '<p> AGE: ' +
                    puppy_records.age +
                    '</p>' +
                    '<p> Price: $' +
                    puppy_records.price +
                    '</p>' +
                    '<button onclick=buypuppy("' +
                    puppy_records.id +
                    '") class="btn btn-info">' +
                    '<i class="fas fa-paw"></i>&nbsp&nbspAdopt</button>' +
                    '</td>' +
                    '</tr>',
                '</div>',
                '</div>'
            ].join('');
        })
        .join('');

    return '<table>' + puppiesLayout + '</table>';
}

function initializeExistingPuppiesView(puppies) {
    $('#puppy_records').html(puppy_records(puppies));
}

function showPuppies() {
    fetch('http://localhost:8080/puppies/')
        .then(response => response.json())
        .then(initializeExistingPuppiesView);
}

function logout() {
    var url = 'http://localhost:8080/logout/' + USERNAME;
    console.log(url);
    $.ajax({
        url: url,
        method: 'Post',
        dataType: 'json',
        crossDomain: true,
        contentType: 'application/json',
        mimeType: 'application/json',
        mode: 'cors',
        error: function(data, status, er) {
            console.log(status + ' ' + er);
        }
    }).then(function() {
        $('.container').html('<h2>Logged out.</h2><p>Please come again!</p>');
    });
}
$('#logout-button').click(function() {
    console.log('The button works!!!!!');
    console.log('logging out...');
    logout();
});

function adoptPuppy(id) {
    console.log(id);
}

function buypuppy(id) {
    console.log('The button is working');
    console.log(id);
    var url = 'http://localhost:8080/Buy/' + id;
    $.ajax({
        url: url,
        method: 'Post',
        dataType: 'json',
        crossDomain: false,
        data: JSON.stringify({
            id: id
        }),
        contentType: 'application/json',
        mimeType: 'application/json',
        mode: 'cors'
    })
        .then(function handleResponse(response) {
            var DATA = response;
            console.log(DATA);
        })
        .catch(function handleError(error) {
            console.log(error);
        });
}

function main() {
    loadPages();
    // showPuppies();
}

$(main);
