
var isSignedUp = false; //ajax email validation flag

$(function () {

    if (window.location.pathname.toLowerCase() == "/Account/Login".toLowerCase())
        ToggleTab();

    $('[data-toggle="tooltip"]').tooltip();
    BindCountryDropDownFunctions();
    $('#txt_name').focusout(() => {
        checkName();
    })
    $("#txt_name").keydown(function (e) {
        var ReturnValue = CharactersAndNumbers(e);
        return ReturnValue;
    });
    $('#txt_name').on('keypress', function (e) {

        // check for characters that are not allowed. 
        if (/[$&+,:;=?[\]@#|{}^'<>.*()%!-/]/.test(e.key)) {
            return false;
        }
    });


    $('#txt_email').on('focusout', function () {
        //checkEmail();
        checkEmailAsync();
    });
    $('#txt_email').on('keypress', function (e) {
        // prevent spaces in emails
        if (/\s/g.test(e.key)) {
            return false;
        }
    });
    // Append Email with forgot password url
    var appendEmail = function appendEmail() {
        var btn = $('#btnForgotPassword');
        btn.attr('href', function () {
            return btn.attr('href') + '?email=' + $('#txt_email_login').val();
        });
    }
    $('#txt_email_login').on('focusout', function () {
        checkLoginEmail();
    })


    $('#txt_pass').on('focusout', function () {
        checkPassword("#SignUpForm");
    });

    $("#txt_phone").on('keyup', function (e) {
       // //phoneNumbertextChange();
        var ReturnValue = NumbersOnly(e);
       //// phoneNumbertextChange();
       return ReturnValue;
       //return true;
    });
    $("#txt_phone").on('focusout', function (e) {
        checkPhoneNumber();
    });
    $('#txt_pass_login').on('focusout', function () {
        checkLoginPassword();
    })




    // Toggle to login form
    $('body').on('click', ".loginButton", ToggleTab);

    // Toggle to sign_up form
    $('body').on('click', ".signUpButton, #sectionsignup", function () {
        $("#sectionB").removeClass("active in");
        $("#sectionA").addClass("active in");
        $(".loginButton").removeClass("active");
        $(".signUpButton").addClass("active");

        loginRegisterTitle();

        $('#txt_name').focus();
    });
    $('#btnForgotPassword').click(appendEmail);

});

let phoneNumbertextChange = () => {
    if (!$("#txt_phone").val()) {
    } else {
        let PhoneNumber = $("#txt_phone").val();
        $("#phone_typedtxt").text(PhoneNumber);
    }
}



//#region Login Validation And Login

let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        const genratedRef = Math.floor(Math.random() * 100) + 1;
        $("[name ='RefrenceNo']").val(genratedRef);
    }
}, 100);
// Phone number field country select dropdown
var BindCountryDropDownFunctions = function () {
    $('#countryddl').change(function () {
        $('#CountryIsoCode').val($('option:selected', "#countryddl").data('iso'));
        $('#Phonecode').val('+' + $('option:selected', "#countryddl").val());
        $('.country-code').text('+' + $('option:selected', "#countryddl").val());
    });
    //set default region
    var DefaultRegion = $('#txt_phone').attr('data-default-region').toLowerCase();
    if (DefaultRegion == 'us') {
        $('#CountryIsoCode').val('US');
        $('#Phonecode').val('+1');
        $('.country-code').text('+1');
    }
    else if (DefaultRegion == 'usr') {
        $('#CountryIsoCode').val('US');
        $('#Phonecode').val('+1');
        $('.country-code').text('+1');
    }
    else if (DefaultRegion == 'ca') {
        $('#CountryIsoCode').val('CA');
        $('#Phonecode').val('+1');
        $('.country-code').text('+1');
    }
    else if (DefaultRegion == 'gb') {
        $('#CountryIsoCode').val('GB');
        $('#Phonecode').val('+44');
        $('.country-code').text('+44');
    }
    else if (DefaultRegion == 'au') {
        $('#CountryIsoCode').val('AU');
        $('#Phonecode').val('+61');
        $('.country-code').text('+61');
    }
}

let checkLoginEmail = () => {
    $('#txt_email_login').removeClass('parsley-error');
    $('#txt_email_login').removeClass('parsley-success');
    if (!ValidateEmailAddress($('#txt_email_login').val())) {
    $('#txt_email_login').addClass('parsley-error');
        return false;
    } else {
        $('#txt_email_login').addClass('parsley-success');
        return true;
    }
}
let checkLoginPassword = () => {
    $('#txt_pass_login').removeClass('parsley-success');
    $('#txt_pass_login').removeClass('parsley-error');
    if ($('#txt_pass_login').val() == '') {
        $('#txt_pass_login').addClass('parsley-error');
        return false;
    } else {
        $('#txt_pass_login').addClass('parsley-success');
        return true;
    }
}

$('#LoginForm').submit(function (e) {
    if (checkLoginEmail() == true && checkLoginPassword() == true) {
        return true;
    } else {
        $('#txt_email_login').focus();
        return false;
    }
})

//#endregion
var ToggleTab = function () {
    $("#sectionA").removeClass("active in");
    $("#sectionB").addClass("active in");
    $(".loginButton").addClass("active");
    $(".signUpButton").removeClass("active");

    loginRegisterTitle();

    setTimeout(function () {
        $("#txt_email_login").focus();
    }, 1000);


}

// Enable when parsley form validation fails after click.
var EnableSignupButton = function () {
    $('#btn_Signup').prop("disabled", false);
    $('#btn_Signup').attr("value", "Register Now");
}


//#region Helper Functions

// Validation on Name Field.
let checkName = () => {
    let value = $('#txt_name').val();
    if (value == '') {
        $('#txt_name').addClass('parsley-error');
        return false;
    } else if (!value.match(/^[a-zA-Z0-9\s]+$/) || value.trim().length === 0 || value.length > 200) {
        $('#txt_name').addClass('parsley-error');
        $('#nameError').text('Only letters (a-z), numbers (0-9) and spaces are allowed in name up to 200 characters.').show();
        return false;
    } else if (value.match(/^[0-9\s]+$/) || value.trim().length === 0 || value.length > 200) {
        $('#txt_name').addClass('parsley-error');
        $('#nameError').text('Only  numbers (0-9) and spaces are not allowed in name up to 200 characters.').show();
        return false;
    }
    else {
        $('#txt_name').removeClass('parsley-error');
        $('#nameError').text('').hide();
        $('#txt_name').addClass('parsley-success');
        return true;
    }
}


// Validation on Email Field.
let checkEmail = () => {
    var emailStatus;
    $('#spn_Emailerror').hide();
    $('#spn_Emailconfirm').hide();
    $("#emailError").text("").hide();
    $('#txt_email').removeClass('parsley-error');
    $('#txt_email').removeClass('parsley-success');
    var errMessage = '';
    var Emaillength = $('#txt_email').val().length;
    if (!(Emaillength >= 1 && Emaillength <= 50)) {
        $('#txt_email').addClass('parsley-error');
        $("#emailError").text("Sorry, your email address must be between 1 and 50 characters.").show();
        return emailStatus = false;
    }
    else if (!ValidateEmailAddress($('#txt_email').val())) {
        $('#txt_email').addClass('parsley-error');
        $("#emailError").text("Email should be valid").show();
        return emailStatus = false;
    }
    else {
        $.ajax({
            url: '/Account/IsEmailAddressTaken',
            type: 'POST',
            async: false,
            data: { "email": $('#txt_email').val() },
            datatype: 'json',
            success: function (data) {
                if (data.Result) {
                   emailStatus = true;
                    errMessage = data.Message;
                    $('#spn_Emailconfirm').show();
                    $('#txt_email').addClass('parsley-success');
                }
                else {
                    emailStatus = false;
                    $("#emailError").text(data.Message).show();
                    $('#txt_email').addClass('parsley-error');
                }
            },
            error: function (data) {
                emailStatus = false;
                $("#emailError").text(data.responseJSON.Message).show();
                $('#txt_email').addClass('parsley-error');

            }
        });
    }
    return emailStatus;
}
let checkEmailAsync = () => {
    var emailStatus;
    $('#spn_Emailerror').hide();
    $('#spn_Emailconfirm').hide();
    $("#emailError").text("").hide();
    $('#txt_email').removeClass('parsley-error');
    $('#txt_email').removeClass('parsley-success');
    var errMessage = '';
    var Emaillength = $('#txt_email').val().length;
    if (!(Emaillength >= 1 && Emaillength <= 50)) {
        $('#txt_email').addClass('parsley-error');
        $("#emailError").text("Sorry, your email address must be between 1 and 50 characters.").show();
        return emailStatus = false;
    }
    else if (!ValidateEmailAddress($('#txt_email').val())) {
        $('#txt_email').addClass('parsley-error');
        $("#emailError").text("Email should be valid").show();
       
        return emailStatus = false;
    }
    else {
        $.ajax({
            url: '/Account/IsEmailAddressTaken',
            type: 'POST',
            //async: false,
            data: { "email": $('#txt_email').val() },
            datatype: 'json',
            success: function (data) {
                if (data.Result) {
                    emailStatus = true;
                    errMessage = data.Message;
                    $('#spn_Emailconfirm').show();
                    $('#txt_email').addClass('parsley-success');
                }
                else {
                    emailStatus = false;
                    $("#emailError").text(data.Message).show();
                    $('#txt_email').addClass('parsley-error');
                }
            },
            error: function (data) {
                emailStatus = false;
                $("#emailError").text(data.responseJSON.Message).show();
                $('#txt_email').addClass('parsley-error');

            }
        });
    }
    return emailStatus;
}
let checkPhoneNumber = () => {
    let phoneNumber = $('#txt_phone').val();
    let Phonecode = $("#Phonecode").val();
     if (phoneNumber == '' || phoneNumber.length < 5) {
        $('#txt_phone').removeClass('parsley-success');
        $('#txt_phone').addClass('parsley-error');
        return false;
    } else if (isNaN(phoneNumber)) {
        $('#txt_phone').removeClass('parsley-success');
        $('#txt_phone').addClass('parsley-error');
        return false;
    }
    else {
        $('#txt_phone').addClass('parsley-success');
        $('#txt_phone').removeClass('parsley-error');
        return true;
    }
}

let ValidateEmailAddress = (email) => {
    
    var countAt = 0;
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '@')
            countAt++;
        if (!CheckAllowedString(email[i])) {
            return false;
        }
    }
    if (countAt > 1 || countAt == 0 || IsStringorNumEmailFirstCharacter(email.charAt(0)) == false)
        return false

    var emailParts = email.split('@');
    if (emailParts[0].length < 1 || emailParts[1] < 4 || emailParts[1].lastIndexOf(".") == -1) {
        return false
    }

    var length = emailParts[1].length;
    var lastIndex = emailParts[1].lastIndexOf(".");
    if (length - lastIndex <= 2) return false;
    //check for -,.,_ double accurance
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '@' && (email[i + 1] == '_' || email[i + 1] == '-')) {
            return false;
        }
        if (!IsAllowedCharacter(email[i]) && !IsAllowedCharacter(email[i + 1])) return false;
    }
    for (let i = lastIndex + 1; i < length; i++) {
        if (!IsCharacterString(emailParts[1][i])) return false;
    }
    return true
}
let IsStringorNumEmailFirstCharacter = (chr) => {
    if (isCharacterNumeric(chr) || IsCharacterString(chr)) return true;

    return false;
}
let IsAllowedCharacter = (val) => {
    if (typeof val === 'undefined') return true;
    if (isCharacterNumeric(val) || IsCharacterString(val) || val == '_' || val=='-') return true;
   
    return false
}
let isCharacterNumeric = (character) => {
    return $.isNumeric(character);
}
let IsCharacterString = (character) => {
    var characterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    if (characterArray.indexOf(character.toLowerCase()) != -1) return true;
    return false
}
let CheckAllowedString = (chr) => {
    if (chr == '@') {
        return true
    } else if (chr == '-') {
        return true
    } else if (chr == '.') {
        return true
    } else if (chr == '_') {
        return true
    }
    else if (IsAllowedCharacter(chr)) {
        return true
    } else {
        return false
    }
}


// Action after signUp button is clicked.
$('#btn_Signup').on('click', function (e) {
    var SignupButton = $('#btn_Signup');
    $(SignupButton).attr("value", "Please wait..");
    $(SignupButton).prop("disabled", true);
    var isValidName = checkName();
    var isValidEmail = checkEmail();
    var isValidPassword = checkPassword();
    var isEnteredNumber = checkPhoneNumber();
    var form = $('#SignUpForm');
    if (isValidName == true && isValidEmail == true && isValidPassword == true && isEnteredNumber == true) {
        form.submit();
        isSignedUp = true; //to avoid email validation after succussfully register
    } else {
        $('#txt_name').focus();
        $(SignupButton).attr("value", "Register Now");
        $(SignupButton).prop("disabled", false);
        isSignedUp = false;
    }

})

// Set login or register title according to the active form tab.
const loginRegisterTitle = function () {
    let register = $('#sectionA').hasClass('active');

    if (!register) {
        $('.login_register').text('LOG IN TO YOUR ACCOUNT');
    } else {
        $('.login_register').text('REGISTER YOUR ACCOUNT');
    }
}

// Allow only numbers
var NumbersOnly = function (e) {
    const inputValue = event.target.value;
    const numericValue = getNumericValue(inputValue);

    if (numericValue !== inputValue) {
        event.target.value = numericValue;
        return true;
    } else {
        return false;
    }
}

function getNumericValue(value) {
    let numericValue = '';
    for (const char of value) {
        if (!isNaN(char)) {
            numericValue += char;
        }
    }
    return numericValue;
}

// Disable the keys which aren't allowed.
var CharactersAndNumbers = function (Text) {
    if (Text.keyCode == 8 ||
        Text.keyCode == 9 ||
        Text.keyCode == 32 ||
        Text.keyCode == 35 ||
        Text.keyCode == 36 ||
        Text.keyCode == 37 ||
        Text.keyCode == 39 ||
        Text.keyCode == 46 ||
        Text.keyCode == 0) {
        //Leving backspace, tab, end, home, left arrow, right arrow, delete and period
        return true;
    } else if (Text.keyCode >= 65 && Text.keyCode <= 90) {
        return true;
    } else if (Text.keyCode >= 48 && Text.keyCode <= 57) {
        return true;
    } else if (Text.keyCode >= 96 && Text.keyCode <= 105) {
        return true;
    } else {
        return false;
    }
}

// Password validation
var checkPassword = function (formName) {
    var index = 0;
    if (formName == "#SignUpForm") {
        index = 2;
    } else if (formName == "#form") {
        index = 0;
    } else {
        index = 1;
    }
    
    if (checkPasswordStrength($('#txt_pass').val()) < 2){
        $('#txt_pass').removeClass('parsley-success');
        $('#txt_pass').addClass('parsley-error');
        $("#passwordError").addClass("text-danger");
        $('#passwordError').text("Use 8 or more characters with a mix of letters, numbers & symbols without spaces.").show();
        return false;
    }else {
        $('#passwordError').hide();
        $('#txt_pass').addClass('parsley-success');
        $('#txt_pass').removeClass('parsley-error');
        return true;
    }
}

let checkPasswordStrength = (Text)=>{
    let strength = 0;
    if (Text.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){
        strength += 1;
    }
    if(Text.match(/[a-zA-Z]/)){
        strength += 1;
    }
    if (Text.match(/[0-9]/)) {
        strength += 1;
    }
    if (Text == null || Text.Text == "" || Text.length < 8) {
        strength = 0;
    }
    if (Text.includes(" ")) {
        strength = 0;
    }
    return strength;
}



