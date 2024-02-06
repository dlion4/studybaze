/***************Form Handling***************************************************/
//var dbCode = { af: 1, al: 2, dz: 3, as: 4, ad: 5, ao: 6, ai: 7, ag: 8, ar: 9, am: 10, aw: 11, au: 13, at: 14, az: 15, bs: 16, bh: 17, bd: 18, bb: 19, by: 20, be: 21, bz: 22, bj: 23, bm: 24, bt: 25, bo: 26, ba: 27, bw: 28, br: 29, vg: 30, bn: 31, bg: 32, bf: 33, bi: 34, kh: 35, cm: 36, ca: 37, cv: 38, ky: 39, cf: 40, td: 41, cl: 42, cn: 43, co: 44, km: 45, cg: 46, ck: 47, cr: 48, hr: 49, cu: 50, cy: 51, cz: 52, cd: 53, dk: 54, dj: 56, dm: 57, do: 58, tl: 59, ec: 60, eg: 61, sv: 62, gq: 63, er: 64, ee: 65, et: 66, fk: 67, fo: 68, fj: 69, fi: 70, fr: 71, gf: 72, pf: 73, ga: 74, gm: 75, ge: 76, de: 77, gh: 78, gi: 79, gr: 80, gl: 81, gd: 82, gp: 83, gu: 84, gt: 85, gn: 86, gw: 87, gy: 88, ht: 89, hn: 90, hk: 91, hu: 92, is: 93, in: 94, id: 95, ir: 97, iq: 98, ie: 99, il: 101, it: 102, ci: 103, jm: 104, jp: 105, jo: 106, kz: 107, ke: 108, ki: 109, kw: 110, kg: 111, la: 112, lv: 113, lb: 114, ls: 115, lr: 116, ly: 117, li: 118, lt: 119, lu: 120, mo: 121, mk: 122, mg: 123, mw: 124, my: 125, mv: 126, ml: 127, mt: 128, mh: 129, mq: 130, mr: 131, mu: 132, yt: 133, mx: 134, fm: 135, md: 136, mc: 137, mn: 138, me: 139, ms: 140, ma: 141, mz: 142, mm: 143, na: 144, nr: 145, np: 146, nl: 147, an: 148, nc: 149, nz: 150, ni: 151, ne: 152, ng: 153, nu: 154, kp: 155, mp: 156, no: 157, om: 158, pk: 159, pw: 160, pa: 161, pg: 162, py: 163, pe: 164, ph: 165, pl: 166, pt: 167, pr: 168, qa: 169, re: 170, ro: 171, ru: 172, rw: 173, sh: 174, kn: 175, lc: 176, pm: 177, vc: 178, ws: 179, sm: 180, st: 181, sa: 182, sn: 183, rs: 184, sc: 185, sl: 186, sg: 187, sk: 188, si: 189, sb: 190, so: 191, za: 192, kr: 193, es: 194, lk: 195, sd: 196, sr: 197, sz: 198, se: 199, ch: 200, sy: 201, tw: 202, tj: 203, tz: 204, th: 205, tg: 207, tk: 208, to: 209, tt: 210, tn: 211, tr: 212, tm: 213, tc: 214, tv: 215, ug: 216, ua: 217, ae: 218, gb: 219, us: 220, vi: 221, uy: 222, uz: 223, vu: 224, va: 225, ve: 226, vn: 227, wf: 228, ye: 229, zm: 230, zw: 231 };
var DefaultRegion = $('#phone_popup').attr('data-default-region').toLowerCase();

if (DefaultRegion == 'us') {
    $('#CountryIsoCode_popup').val('US');
    //$('#CountryCode_popup').val(220);
    $('#Phonecode_popup').val('+1');
    // $('.country-code').text('+1');
    // $("#phone_popup").val('+1');
}
else if (DefaultRegion == 'usr') {
    $('#CountryIsoCode_popup').val('US');
    //$('#CountryCode_popup').val(220);
    $('#Phonecode_popup').val('+1');
    // $('.country-code').text('+1');
    // $("#phone_popup").val('+1');
}
else if (DefaultRegion == 'ca') {
    $('#CountryIsoCode_popup').val('CA');
    //$('#CountryCode_popup').val(37);
    $('#Phonecode_popup').val('+1');
    // $('.country-code').text('+1');
    // $("#phone_popup").val('+1');
}
else if (DefaultRegion == 'gb') {
    $('#CountryIsoCode_popup').val('GB');
    //$('#CountryCode_popup').val(219);
    $('#Phonecode_popup').val('+44');
    // $('.country-code').text('+44');
    // $("#phone_popup").val('+44');
}
else if (DefaultRegion == 'au') {
    $('#CountryIsoCode_popup').val('AU');
    //$('#CountryCode_popup').val(13);
    $('#Phonecode_popup').val('+61');
    // $('.country-code').text('+61');
    // $("#phone_popup").val('+61');
}

$("#countryddl_popup").on("change" , function (e) {
    var iso = $(this).find(':selected').attr('data-iso');
    var country_code = $(this).val();
    
    if (($("#login").data('bs.modal') || {})._isShown == true || ($("#login").data('bs.modal') || {})._isShown == undefined) 
    {
        $("#Phonecode_popup").val('+'+country_code);
        $("#CountryIsoCode_popup").val(iso);
    }
    
})

$('#f_email_popup').on('focusout', function () {
    $.ajaxSetup({ async: true });
    checkEmail1();
});

$('#f_email_popup').on('keypress', function (e) {
    // prevent spaces in emails
    if (/\s/g.test(e.key)) {
        return false;
    }
});
$('#f_name_popup').focusout(() => {
    checkName1();
})
$("#f_name_popup").keydown(function (e) {
    var ReturnValue = CharactersAndNumbers(e);
    return ReturnValue;
});

$('#phone_popup').focusout(() => {
    checkPhoneNumber1();
})

// Validation on Name Field.
let checkName1 = () => {
    let value = $('#f_name_popup').val();
    if (value == '') {
        $('#f_name_popup').addClass('parsley-error');
        return false;
    } else if (!value.match(/^[a-zA-Z0-9\s]+$/) || value.trim().length === 0 || value.length > 200) {
        $('#f_name_popup').addClass('parsley-error');
        $('#nameError_popup').text('Only letters (a-z), numbers (0-9) and spaces are allowed in name up to 200 characters.').show();
        return false;
    } else if (value.match(/^[0-9\s]+$/) || value.trim().length === 0 || value.length > 200) {
        $('#f_name_popup').addClass('parsley-error');
        $('#nameError_popup').text('Only  numbers (0-9) and spaces are not allowed in name up to 200 characters.').show();
        return false;
    }
    else {
        $('#f_name_popup').removeClass('parsley-error');
        $('#nameError_popup').text('').hide();
        $('#f_name_popup').addClass('parsley-success');
        return true;
    }
}
// Validation on Email Field.
let checkEmail1 = () => {
    var emailStatus = false;
    $('#spn_Emailerror').hide();
    $('#spn_Emailconfirm').hide();
    $("#emailError_popup").text("").hide();
    $('#f_email_popup').removeClass('parsley-error');
    $('#f_email_popup').removeClass('parsley-success');
    var errMessage = '';
    if (ValidateEmailAddress1($('#f_email_popup').val().trim() ))
    {
        $.ajax({
            url: 'check-email.php',
            type: 'POST',
            //async: true,
            data: { "email": $('#f_email_popup').val() },
            dataType: 'json',
            success: function (data) {
                if (data.Result) {
                    emailStatus = true;
                    errMessage = data.Message;
                    $('#spn_Emailconfirm').show();
                    $('#f_email_popup').addClass('parsley-success');
                }
                else {
                    emailStatus = false;
                    $("#emailError_popup").text(data.Message).show();
                    $('#f_email_popup').addClass('parsley-error');
                }
            },
            error: function (data) {
                try {
                    data = JSON.parse(data);
                    $("#emailError_popup").text(data.responseJSON.Message).show();
                    emailStatus = false;
                    $('#f_email_popup').addClass('parsley-error');
                } catch (e) {
                    //JSON parse error, this is not json (or JSON isn't in your browser)
                    $("#emailError_popup").text("Request token expired, refresh the page").show();
                    emailStatus = false;
                    $('#f_email_popup').addClass('parsley-error');
                }

            }
        });
    }
    return emailStatus;
}

//-------------------------------
// Email new validation
//----------------------------
let ValidateEmailAddress1 = (email) => {

    var emailStatus;
    $('#spn_Emailerror').hide();
    $('#spn_Emailconfirm').hide();
    $("#emailError_popup").text("").hide();
    $('#f_email_popup').removeClass('parsley-error');
    $('#f_email_popup').removeClass('parsley-success');

    var countAt = 0;
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '@')
            countAt++;
        if (!CheckAllowedString1(email[i])) {
            $('#f_email_popup').addClass('parsley-error');
            $("#emailError_popup").text("Email should be valid").show();
            return false;
        }
    }
    if (countAt > 1 || countAt == 0 || IsAllowedCharacter1(email.charAt(0)) == false)
    {
        $('#f_email_popup').addClass('parsley-error');
        $("#emailError_popup").text("Email should be valid").show();
        return false
    }

    var emailParts = email.split('@');
    if (emailParts[0].length < 1 || emailParts[1] < 4 || emailParts[1].lastIndexOf(".") == -1) {
        $('#f_email_popup').addClass('parsley-error');
        $("#emailError_popup").text("Email should be valid").show();
        return false
    }

    var length = emailParts[1].length;
    var lastIndex = emailParts[1].lastIndexOf(".");
    if (length - lastIndex <= 2) return false;
    //check for -,.,_ double accurance
    for (let i = 0; i < email.length; i++) {
        if (!IsAllowedCharacter1(email[i]) && !IsAllowedCharacter1(email[i + 1]))
        {
            $('#f_email_popup').addClass('parsley-error');
            $("#emailError_popup").text("Email should be valid").show();
            return false;
        }
    }
    for (let i = lastIndex + 1; i < length; i++) {
        if (!IsCharacterString1(emailParts[1][i])) 
        {
            $('#f_email_popup').addClass('parsley-error');
            $("#emailError_popup").text("Email should be valid").show();
            return false;
        }
    }
    return true
}
let IsAllowedCharacter1 = (val) => {
    if (typeof val === 'undefined') return true;
    if (isCharacterNumeric1(val) || IsCharacterString1(val)) return true;
    return false
}
let isCharacterNumeric1 = (character) => {
    return $.isNumeric(character);
}
let IsCharacterString1 = (character) => {
    var characterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    if (characterArray.indexOf(character.toLowerCase()) != -1) return true;
    return false
}
let CheckAllowedString1 = (chr) => {
    if (chr == '@') {
        return true
    } else if (chr == '-') {
        return true
    } else if (chr == '.') {
        return true
    } else if (chr == '_') {
        return true
    } else if (IsAllowedCharacter1(chr)) {
        return true
    } else {
        return false
    }
}
//-------------------------------
// Email new validation
//----------------------------

// Validation on Phone Field.
let checkPhoneNumber1 = () => {

    let phoneNumber = $('#phone_popup').val();
    let Phonecode = $("#Phonecode_popup").val();
    
    if (phoneNumber == '' || phoneNumber.length < 5) {
        $('#phone_popup').removeClass('parsley-success');
        $('#phone_popup').addClass('parsley-error');
        return false;
    } else if (isNaN(phoneNumber)) {
        $('#phone_popup').removeClass('parsley-success');
        $('#phone_popup').addClass('parsley-error');
        return false;
    }
    else {
        $('#phone_popup').addClass('parsley-success');
        $('#phone_popup').removeClass('parsley-error');
        return true;
    }
}

$("#phone_popup").on('keyup', function (e) {
    // console.log(iti);
    //phoneNumbertextChange();
    var ReturnValue = NumbersOnly1(e);
    // phoneNumbertextChange();
    return ReturnValue;
    //return true;
});

// Allow only numbers
var NumbersOnly1 = function (e) {
    const inputValue = event.target.value;
    const numericValue = getNumericValue1(inputValue);

    if (numericValue !== inputValue) {
        event.target.value = numericValue;
        return true;
    } else {
        return false;
    }
}

function getNumericValue1(value) {
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

$(function () {
    // Returns a random integer from 1 to 10
    var num = Math.floor(Math.random() * 10) + 1;
    $("[name='RefrenceNo']").val(num);
});
// Action after signUp button is clicked.
$('#f_submit1').on('click', function (e) {
    var cookie = getCookie('refferarURL');
    $("#lead_form_popup [name='ReferalURL']").val(cookie);
    var SignupButton = $('#f_submit1');
    var isValidName = checkName1();
    $.ajaxSetup({ async: false });
    var isValidEmail = checkEmail1();
    var isEnteredNumber = checkPhoneNumber1();
    var form = $('#lead_form_popup');
    if (isValidName == true && isValidEmail == true && isEnteredNumber == true) {
        $(SignupButton).text("Please wait..");
        $(SignupButton).prop("disabled", true);
        form.submit();
        isSignedUp = true; //to avoid email validation after succussfully register
    } else {
        $('#f_name_popup').focus();
        $(SignupButton).attr("value", "Register Now");
        $(SignupButton).prop("disabled", false);
        isSignedUp = false;
    }

});

/************************ lead form Procesing ************************/
$("form").submit(function () {
    $("#f_submit1").html("Processing ...");
});