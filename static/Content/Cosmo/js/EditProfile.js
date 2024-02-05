$("#ViewEmailIcon").click(function () {
    if ($("#ViewEmailIcon").hasClass('view')) {
        $("#ViewEmailIcon").removeClass('fa-eye view');
        $("#ViewEmailIcon").addClass('fa-eye-slash');
        $("#ViewEmailIcon").prop('title', 'Hide Email');
        $("#txt_email").val(getEmail());
    } else {
        $("#ViewEmailIcon").removeClass('fa-eye-slash');
        $("#ViewEmailIcon").addClass('fa-eye view');
        $("#ViewEmailIcon").prop('title', 'View Email');
        $("#txt_email").val('****************');
    }
    
});
$("#ViewPhoneIcon").click(function () {
    if ($("#ViewPhoneIcon").hasClass('view')) {
        $("#ViewPhoneIcon").removeClass('fa-eye view');
        $("#ViewPhoneIcon").addClass('fa-eye-slash');
        $("#ViewPhoneIcon").prop('title', 'Hide Phone');
        $("#phonetxb").val(getPhone());
    } else {
        $("#ViewPhoneIcon").removeClass('fa-eye-slash');
        $("#ViewPhoneIcon").addClass('fa-eye view');
        $("#ViewPhoneIcon").prop('title', 'View Phone');
        $("#phonetxb").val('*************');
    }

   
   
});

$("#UpdateEmailIcon").click(function () {
    $("#oldEmail_txb").val(getEmail());
    $('#New_Email_error').text('').hide();
    $('#New_Email_success').text('').hide();
    $('#NewEmail_txb').removeClass('parsley-error');
    $('#NewEmail_txb').removeClass('parsley-success');
    $('#NewEmail_txb').val('');
    $("#updateEmailModel").modal('show');
})
$("#btn_Update_Email").click(function () {
    if (checkEmail()) {
        $.ajax({
            type: "POST",
            url: "/Account/EditEmail",
            data: { "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(), "Email": $("#NewEmail_txb").val() }
        }).done(function (response) {
            if (response.Result) {
                $('#New_Email_error').text('').hide();
                $("#New_Email_success").css('display', 'block');
                $("#New_Email_success").text(response.Message);
                $("#txt_email").val("*************");
            }
            else {
                $("#New_Email_error").css('display', 'block');
                $("#New_Email_error").text(response.Message);
            }
        });
    }
});
$("#UpdatePhoneIcon").click(function (){
    $("#oldPhone_txb").val(getPhone());
    $('#New_Phone_error').text('').hide();
    $('#New_Phone_success').text('').hide();
    $('#NewPhone_txb').removeClass('parsley-error');
    $('#NewPhone_txb').removeClass('parsley-success');
    $("#NewPhone_txb").val('');
    SetDefaultRegion();
    $("#countryddl").val($("#Phonecode").val().replace('+', '').trim());
    $("#updatePhoneModel").modal('show');
});
$("#btn_Update_Phone").click(function () {
    if (checkPhoneNumber()) {
        $.ajax({
            type: "POST",
            url: "/Account/EditPhone",
            data: {
                "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(),
                "PhoneNumber": $('#NewPhone_txb').val(),
                "phoneCode": $('#Phonecode').val(),
                "CountryIsoCode": $('#CountryIsoCode').val()

            }
        }).done(function (response) {
            if (response.Result) {
                $('#New_Phone_error').text('').hide();
                $("#New_Phone_success").css('display', 'block');
                $("#New_Phone_success").text(response.Message);
                $("#phonetxb").val("*************");
            }
            else {
                $("#New_Phone_error").css('display', 'block');
                $("#New_Phone_error").text(response.Message);
            }
        });
    }
})
$("#updateNameIcon").click(function (e) {
    $("#oldName_txb").val($("#txt_fname").val());
    $('#New_Name_error').text('').hide();
    $('#New_Name_success').text('').hide();
    $('#NewName_txb').removeClass('parsley-error');
    $('#NewName_txb').removeClass('parsley-success');
    $('#NewName_txb').val('');
    $("#updateNameModel").modal('show');
});
$("#btn_Update_Name").click(function (e) {
    if (checkName()) {
        $.ajax({
            type: "POST",
            url: "/Account/EditName",
            data: { "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(), "Name": $("#NewName_txb").val() }
        }).done(function (response) {
            if (response.Result) {
                $("#New_Name_success").css('display', 'block');
                $("#New_Name_success").text(response.Message);
                $("#txt_fname").val($("#NewName_txb").val());
            }
            else {
                $("#New_Name_error").css('display', 'block');
                $("#New_Name_error").text(response.Message);
            }
        });
    }

});
$("#updatepasswordIcon").click(function () {
    hideformErrorMessage();
    $("#ErrorMessage").text('');
    $("#SuccessMessage").text('');
    $("#txt_oldPass").val('');
    $("#txt_confirmPass").val('');
    $('#txt_pass').val('');
    $("#updatepasswordModel").modal('show');
});

let checkName = () => {
    let value = $('#NewName_txb').val();
    $('#New_Name_error').text('').hide();
    $('#New_Name_success').text('').hide();
    if (value == '') {
        $('#NewName_txb').addClass('parsley-error');
        $("#New_Name_error").css('display', 'block');
        $("#New_Name_error").text("Please Provide Your New Name.");
        return false;
    } else if (!value.match(/^[a-zA-Z0-9\s]+$/) || value.trim().length === 0 || value.length > 200) {
        $('#NewName_txb').addClass('parsley-error');
        $("#New_Name_error").css('display', 'block');
        $('#New_Name_error').text('Only letters (a-z), numbers (0-9) and spaces are allowed in name up to 200 characters.').show();
        return false;
    } else if (value.match(/^[0-9\s]+$/) || value.trim().length === 0 || value.length > 200) {
        $("#New_Name_error").css('display', 'block');
        $('#NewName_txb').addClass('parsley-error');
        $('#New_Name_error').text('Only  numbers (0-9) and spaces are not allowed in name up to 200 characters.').show();
        return false;
    }
    else {
        $('#NewName_txb').removeClass('parsley-error');
        $('#New_Name_error').text('').hide();
        $('#NewName_txb').addClass('parsley-success');
        return true;
    }
}
let checkEmail = () => {
    //var EmailRegex = /^(([a-zA-Z0-9]*[_]*[^<>()[\]\\.`~!#$%^&*\-_=+|{}'/?,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailStatus;
    $('#New_Email_error').text('').hide();
    $('#New_Email_success').text('').hide();
    $('#NewEmail_txb').removeClass('parsley-error');
    $('#NewEmail_txb').removeClass('parsley-success');
    var errMessage = '';
    var Emaillength = $('#NewEmail_txb').val().length;
    if (!(Emaillength >= 1 && Emaillength <= 50)) {
        $('#NewEmail_txb').addClass('parsley-error');
        $("#New_Email_error").text("Sorry, your email address must be between 1 and 50 characters.").show();
        return emailStatus = false;
    }
    //else if (!$('#NewEmail_txb').val().match(EmailRegex) || $('#NewEmail_txb').val() == '') {
    else if (!ValidateEmailAddress($('#NewEmail_txb').val())) {
        $('#NewEmail_txb').addClass('parsley-error');
        $("#New_Email_error").text("Email should be valid.").show();
        return emailStatus = false;
    }
    //else if (Emaillength >= 1 && Emaillength <= 50 || $('#NewEmail_txb').val().match(EmailRegex)) {
    else{

        $.ajax({
            url: '/Account/IsEmailAddressTaken',
            type: 'POST',
            async: false,
            data: { "email": $('#NewEmail_txb').val() },
            datatype: 'json',
            success: function (data) {
                if (data.Result) {
                    emailStatus = true;
                    errMessage = data.Message;
                    $('#txt_email').addClass('parsley-success');
                }
                else {
                    emailStatus = false;
                    $("#New_Email_error").text(data.Message).show();
                    $('#NewEmail_txb').addClass('parsley-error');
                }
            },
            error: function (data) {
                emailStatus = false;
                $("#New_Email_error").text(data.responseJSON.Message).show();
                $('#NewEmail_txb').addClass('parsley-error');

            }
        });
    }
    return emailStatus;
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
let IsAllowedCharacter = (val) => {
    if (typeof val === 'undefined') return true;
    if (isCharacterNumeric(val) || IsCharacterString(val) || val == '_' || val == '-') return true;

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
    } else if (IsAllowedCharacter(chr)) {
        return true
    } else {
        return false
    }
}
let IsStringorNumEmailFirstCharacter = (chr) => {
    if (isCharacterNumeric(chr) || IsCharacterString(chr)) return true;

    return false;
}
let checkPhoneNumber = () => {
    let NewNumber = $('#Phonecode').val() + '-' + $('#NewPhone_txb').val();
    let Phonecode = $('#Phonecode').val(); 
    let phoneNumber = $('#NewPhone_txb').val();
    if (phoneNumber == '' || phoneNumber.length < 5) {
        $('#NewPhone_txb').removeClass('parsley-success');
        $('#NewPhone_txb').addClass('parsley-error');
        return false;
    } else if ($("#oldPhone_txb").val() == NewNumber) {
        $('#NewPhone_txb').removeClass('parsley-success');
        $('#NewPhone_txb').addClass('parsley-error');
        return false;
    } else if (!isNaN(NewNumber)) {
        $('#NewPhone_txb').removeClass('parsley-success');
        $('#NewPhone_txb').addClass('parsley-error');
        return false;
    } else {
        $('#NewPhone_txb').addClass('parsley-success');
        $('#NewPhone_txb').removeClass('parsley-error');
        return true;
    }
}
let getEmail = () => {
    let Email = '************';
    $.ajax({
        type: "GET",
        url: "/Account/GetEmail",
        async: false,
    }).done(function (response) {
        if (response.Result) {
            Email = response.Email;
        }
        else {
            console.log(response.Message)
        }
    });
    return Email;
}
let getPhone = () => {
    let Phone = '************';
    $.ajax({
        type: "GET",
        url: "/Account/GetPhone",
        async: false,
    }).done(function (response) {
        if (response.Result) {
            Phone = response.Phone;
        }
        else {
            console.log(response.Message)
        }
    });
    return Phone;
}
$('#btn_Update_password').click(function (e) {
    hideformErrorMessage();
    e.preventDefault();
    if (!$("#txt_oldPass").val().trim()) {
        $("#Old_pass_error").css('display', 'block');
    } else if (checkPasswordStrength($("#txt_pass").val().trim()) < 2) {
        $("#new_pass_error").css('display', 'block');
    } else if (!$("#txt_confirmPass").val().trim()) {
        $("#confirm_pass_error").css('display', 'block');
    } else if ($('#txt_pass').val().trim() !== $('#txt_confirmPass').val().trim()) {
        $("#missmatch_pass_error").css('display', 'block');
    } else {
        var data = {};
        data.OldPassword = $("#txt_oldPass").val();
        data.NewPassword = $("#txt_pass").val();
        data.ConfirmPassword = $("#txt_confirmPass").val();
        $.ajax({
            type: "POST",
            url: "/Account/ChangePassword",
            data: data
        }).done(function (response) {
            if (response.Result) {
                $("#lbl_errormsg").text("");
                $("#lbl_successmsg").text("");
                $("#ErrorMessage").text("");
                $("SuccessMessage").show();
                $("#SuccessMessage").text(response.Message);
            }
            else {
                $("#lbl_errormsg").text("");
                $("#lbl_successmsg").text("");
                $("#SuccessMessage").text("");
                $("#ErrorMessage").text(response.Message);
            }
        });
    }
});

$('#verify_email').click(function (e) {
    e.preventDefault();
    $("#lbl_errormsg").text("");
    $("#lbl_successmsg").text("");

    $("#lbl_successmsg").text("Sending verification email to your email address");
    $.ajax({
        type: "POST",
        url: "/Account/verifyEmail",
        error: function (result) { window.location.href = '../Account/Login?returnurl=' + window.location.href; },
    }).done(function (response) {
        if (response.Result) {
            $("#lbl_errormsg").text("");
            $("#lbl_successmsg").text("");
            $("#lbl_successmsg").text("An Email has been sent to your Email address. Read it for further instructions.");
        }
        else {
            $("#lbl_errormsg").text("");
            $("#lbl_successmsg").text("");
            $("#lbl_errormsg").text("An error occured while sending confirmation email");
        }
    });
});

let hideformErrorMessage = () => {
    $("#NametxbError").css('display', 'none');
    $("#AlternateEmailtxbError").css('display', 'none');
    $("#Old_pass_error").css('display', 'none');
    $("#new_pass_error").css('display', 'none');
    $("#confirm_pass_error").css('display', 'none');
    $("#missmatch_pass_error").css('display', 'none');
    $("#AlternatePhonetxbError").css('display', 'none')
    $("#lbl_errormsg").text("");
    $("#lbl_successmsg").text("");
    $("#SuccessMessage").text("");
}

let checkPasswordStrength = (Text) => {
    let strength = 0;
    if (Text.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        strength += 1;
    }
    if (Text.match(/[a-zA-Z]/)) {
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

let getNumbersOnly = (e) => {
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

$(() => {
    BindCountryDropDownFunctions();
});
$("#NewPhone_txb").on('keyup', function (e) {
    var ReturnValue = getNumbersOnly(e);
    return ReturnValue;
});

let SetDefaultRegion = () => {
    var DefaultRegion = $('#NewPhone_txb').attr('data-default-region').toLowerCase();
    if (DefaultRegion == 'us') {
        $('#CountryIsoCode').val('US');
        $('#Phonecode').val('+1');
        $('.country-code').text('+1');
    }
    else if (DefaultRegion == 'usr') {
        $('#CountryIsoCode').va('US');
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
var BindCountryDropDownFunctions = function () {
    $('#countryddl').change(function () {
        $('#CountryIsoCode').val($('option:selected', "#countryddl").data('iso'));
        $('#Phonecode').val('+' + $('option:selected', "#countryddl").val());
        $('.country-code').text('+' + $('option:selected', "#countryddl").val());

    });
}
