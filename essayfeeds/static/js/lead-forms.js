
/***************Counter for about section******************/
var path = window.location.pathname;
var page = path.split("/").pop();
if(page!=='service-policies.php' && page!=='privacy-policy.php' && page!=='reviews.php'){
if($("#counter").length > 0){
$(window).on('scroll', function () {
    var t = 0,
        e = $('#counter').offset().top - window.innerHeight;
    0 == t &&
        $(window).scrollTop() > e &&
        ($('.counter-value').each(function () {
            var t = $(this),
                e = t.attr('data-count');
            $({
                countNum: t.text(),
            }).animate(
                {
                    countNum: e,
                },
                {
                    duration: 1e3,
                    easing: 'swing',
                    step: function () {
                        t.text(Math.floor(this.countNum));
                    },
                    compvare: function () {
                        t.text(this.countNum);
                    },
                }
            );
        }),
            (t = 1));
});
} 
}

/***************Odometer parameters settings***************************************************/
if( page!=='service-policies.php' && page!=='privacy-policy.php'  && page!=='reviews.php'){


    if ($("#phone").length > 0) {
        /***************Form Handling***************************************************/
        //var dbCode = { af: 1, al: 2, dz: 3, as: 4, ad: 5, ao: 6, ai: 7, ag: 8, ar: 9, am: 10, aw: 11, au: 13, at: 14, az: 15, bs: 16, bh: 17, bd: 18, bb: 19, by: 20, be: 21, bz: 22, bj: 23, bm: 24, bt: 25, bo: 26, ba: 27, bw: 28, br: 29, vg: 30, bn: 31, bg: 32, bf: 33, bi: 34, kh: 35, cm: 36, ca: 37, cv: 38, ky: 39, cf: 40, td: 41, cl: 42, cn: 43, co: 44, km: 45, cg: 46, ck: 47, cr: 48, hr: 49, cu: 50, cy: 51, cz: 52, cd: 53, dk: 54, dj: 56, dm: 57, do: 58, tl: 59, ec: 60, eg: 61, sv: 62, gq: 63, er: 64, ee: 65, et: 66, fk: 67, fo: 68, fj: 69, fi: 70, fr: 71, gf: 72, pf: 73, ga: 74, gm: 75, ge: 76, de: 77, gh: 78, gi: 79, gr: 80, gl: 81, gd: 82, gp: 83, gu: 84, gt: 85, gn: 86, gw: 87, gy: 88, ht: 89, hn: 90, hk: 91, hu: 92, is: 93, in: 94, id: 95, ir: 97, iq: 98, ie: 99, il: 101, it: 102, ci: 103, jm: 104, jp: 105, jo: 106, kz: 107, ke: 108, ki: 109, kw: 110, kg: 111, la: 112, lv: 113, lb: 114, ls: 115, lr: 116, ly: 117, li: 118, lt: 119, lu: 120, mo: 121, mk: 122, mg: 123, mw: 124, my: 125, mv: 126, ml: 127, mt: 128, mh: 129, mq: 130, mr: 131, mu: 132, yt: 133, mx: 134, fm: 135, md: 136, mc: 137, mn: 138, me: 139, ms: 140, ma: 141, mz: 142, mm: 143, na: 144, nr: 145, np: 146, nl: 147, an: 148, nc: 149, nz: 150, ni: 151, ne: 152, ng: 153, nu: 154, kp: 155, mp: 156, no: 157, om: 158, pk: 159, pw: 160, pa: 161, pg: 162, py: 163, pe: 164, ph: 165, pl: 166, pt: 167, pr: 168, qa: 169, re: 170, ro: 171, ru: 172, rw: 173, sh: 174, kn: 175, lc: 176, pm: 177, vc: 178, ws: 179, sm: 180, st: 181, sa: 182, sn: 183, rs: 184, sc: 185, sl: 186, sg: 187, sk: 188, si: 189, sb: 190, so: 191, za: 192, kr: 193, es: 194, lk: 195, sd: 196, sr: 197, sz: 198, se: 199, ch: 200, sy: 201, tw: 202, tj: 203, tz: 204, th: 205, tg: 207, tk: 208, to: 209, tt: 210, tn: 211, tr: 212, tm: 213, tc: 214, tv: 215, ug: 216, ua: 217, ae: 218, gb: 219, us: 220, vi: 221, uy: 222, uz: 223, vu: 224, va: 225, ve: 226, vn: 227, wf: 228, ye: 229, zm: 230, zw: 231 };
        var DefaultRegion = $('#phone').attr('data-default-region').toLowerCase();

        if (DefaultRegion == 'us') {
            $('#CountryIsoCode').val('US');
            //$('#CountryCode').val(220);
            $('#Phonecode').val('+1');
            // $('.country-code').text('+1');
            // $("#phone").val('+1');

            // $("#countryddl").val();
        }
        else if (DefaultRegion == 'usr') {
            $('#CountryIsoCode').val('US');
            //$('#CountryCode').val(220);
            $('#Phonecode').val('+1');
            // $('.country-code').text('+1');
            // $("#phone").val('+1');
        }
        else if (DefaultRegion == 'ca') {
            $('#CountryIsoCode').val('CA');
            //$('#CountryCode').val(37);
            $('#Phonecode').val('+1');
            // $('.country-code').text('+1');
            // $("#phone").val('+1');
        }
        else if (DefaultRegion == 'gb') {
            $('#CountryIsoCode').val('GB');
            //$('#CountryCode').val(219);
            $('#Phonecode').val('+44');
            // $('.country-code').text('+44');
            // $("#phone").val('+44');
        }
        else if (DefaultRegion == 'au') {
            $('#CountryIsoCode').val('AU');
            //$('#CountryCode').val(13);
            $('#Phonecode').val('+61');
            // $('.country-code').text('+61');
            // $("#phone").val('+61');
        }

        $("#countryddl").on("change" , function (e) {
            var iso = $(this).find(':selected').attr('data-iso');
            var country_code = $(this).val();
            
            if (($("#login").data('bs.modal') || {})._isShown == false || ($("#login").data('bs.modal') || {})._isShown == undefined) 
            {
                $("#Phonecode").val('+'+country_code);
                $("#CountryIsoCode").val(iso);
            }
            
        })
        
    }
// $(document).on('keyup', '#phone', function (e) {
//     // console.log($(document).find('.iti__dial-code').text());
//     $('#Phonecode').val($(document).find('.iti__dial-code').text());
//     elem = $($(document).find('.iti__selected-flag').children(0).get(0)).clone();
//     country_code = $(elem).removeClass('iti__flag').attr('class');
//     country_code = country_code.replace("iti__", "");
//     var code = dbCode[country_code];
//     $('#CountryCode').val(code);

// });

$('#f_email').on('focusout', function () {
    $.ajaxSetup({ async: true });
    checkEmail();
});

$('#f_email').on('keypress', function (e) {
    // prevent spaces in emails
    if (/\s/g.test(e.key)) {
        return false;
    }
});
$('#f_name').focusout(() => {
    checkName();
})
$("#f_name").keydown(function (e) {
    var ReturnValue = CharactersAndNumbers(e);
    return ReturnValue;
});

$('#phone').focusout(() => {
    checkPhoneNumber();
})

}

// Validation on Name Field.
let checkName = () => {
    let value = $('#f_name').val();
    if (value == '') {
        $('#f_name').addClass('parsley-error');
        return false;
    } else if (!value.match(/^[a-zA-Z0-9\s]+$/) || value.trim().length === 0 || value.length > 200) {
        $('#f_name').addClass('parsley-error');
        $('#nameError').text('Only letters (a-z), numbers (0-9) and spaces are allowed in name up to 200 characters.').show();
        return false;
    } else if (value.match(/^[0-9\s]+$/) || value.trim().length === 0 || value.length > 200) {
        $('#f_name').addClass('parsley-error');
        $('#nameError').text('Only  numbers (0-9) and spaces are not allowed in name up to 200 characters.').show();
        return false;
    }
    else {
        $('#f_name').removeClass('parsley-error');
        $('#nameError').text('').hide();
        $('#f_name').addClass('parsley-success');
        return true;
    }
}
// Validation on Email Field.
let checkEmail = () => {
    var emailStatus = false;
    $('#spn_Emailerror').hide();
    $('#spn_Emailconfirm').hide();
    $("#emailError").text("").hide();
    $('#f_email').removeClass('parsley-error');
    $('#f_email').removeClass('parsley-success');
    var errMessage = '';
    // var Emaillength = $('#f_email').val().length;
    // if (!(Emaillength >= 1 && Emaillength <= 50)) {
    //     $('#f_email').addClass('parsley-error');
    //     $("#emailError").text("Sorry, your email address must be between 1 and 50 characters.").show();
    //     return emailStatus = false;
    // }
    // else 
    // if (!$('#f_email').val().match(/^(([a-zA-Z0-9]*[_]*[^<>()[\]\\.`~!#$%^&*\-_=+|{}'/?,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || $('#f_email').val() == '') {
    //     $('#f_email').addClass('parsley-error');
    //     $("#emailError").text("Email should be valid").show();
    //     return emailStatus = false;
    // }
    // else if (Emaillength >= 1 && Emaillength <= 50 || $('#f_email').val().match(/^(([a-zA-Z0-9]*[_]*[^<>()[\]\\.`~!#$%^&*\-_=+|{}'/?,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    if (ValidateEmailAddress($('#f_email').val().trim() ))
    {
        $.ajax({
            url: 'check-email.php',
            type: 'POST',
            //async: true,
            data: { "email": $('#f_email').val() },
            dataType: 'json',
            success: function (data) {
                if (data.Result) {
                    emailStatus = true;
                    errMessage = data.Message;
                    $('#spn_Emailconfirm').show();
                    $('#f_email').addClass('parsley-success');
                }
                else {
                    emailStatus = false;
                    $("#emailError").text(data.Message).show();
                    $('#f_email').addClass('parsley-error');
                }
            },
            error: function (data) {
                try {
                    data = JSON.parse(data);
                    $("#emailError").text(data.responseJSON.Message).show();
                    emailStatus = false;
                    $('#f_email').addClass('parsley-error');
                } catch (e) {
                    //JSON parse error, this is not json (or JSON isn't in your browser)
                    $("#emailError").text("Request token expired, refresh the page").show();
                    emailStatus = false;
                    $('#f_email').addClass('parsley-error');
                }

            }
        });
    }
    return emailStatus;
}

//-------------------------------
// Email new validation
//----------------------------
let ValidateEmailAddress = (email) => {

    var emailStatus;
    $('#spn_Emailerror').hide();
    $('#spn_Emailconfirm').hide();
    $("#emailError").text("").hide();
    $('#f_email').removeClass('parsley-error');
    $('#f_email').removeClass('parsley-success');

    var countAt = 0;
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '@')
            countAt++;
        if (!CheckAllowedString(email[i])) {
            $('#f_email').addClass('parsley-error');
            $("#emailError").text("Email should be valid").show();
            return false;
        }
    }
    if (countAt > 1 || countAt == 0 || IsAllowedCharacter(email.charAt(0)) == false)
    {
        $('#f_email').addClass('parsley-error');
        $("#emailError").text("Email should be valid").show();
        return false
    }

    var emailParts = email.split('@');
    if (emailParts[0].length < 1 || emailParts[1] < 4 || emailParts[1].lastIndexOf(".") == -1) {
        $('#f_email').addClass('parsley-error');
        $("#emailError").text("Email should be valid").show();
        return false
    }

    var length = emailParts[1].length;
    var lastIndex = emailParts[1].lastIndexOf(".");
    if (length - lastIndex <= 2) return false;
    //check for -,.,_ double accurance
    for (let i = 0; i < email.length; i++) {
        if (!IsAllowedCharacter(email[i]) && !IsAllowedCharacter(email[i + 1]))
        {
            $('#f_email').addClass('parsley-error');
            $("#emailError").text("Email should be valid").show();
            return false;
        }
    }
    for (let i = lastIndex + 1; i < length; i++) {
        if (!IsCharacterString(emailParts[1][i])) 
        {
            $('#f_email').addClass('parsley-error');
            $("#emailError").text("Email should be valid").show();
            return false;
        }
    }
    return true
}
let IsAllowedCharacter = (val) => {
    if (typeof val === 'undefined') return true;
    if (isCharacterNumeric(val) || IsCharacterString(val)) return true;
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
//-------------------------------
// Email new validation
//----------------------------

// Validation on Phone Field.
let checkPhoneNumber = () => {
    let phoneNumber = $('#phone').val();
    let Phonecode = $("#Phonecode").val();
    if (phoneNumber == '' || phoneNumber.length < 5) {
        $('#phone').removeClass('parsley-success');
        $('#phone').addClass('parsley-error');
        return false;
    } else if (isNaN(phoneNumber)) {
        $('#phone').removeClass('parsley-success');
        $('#phone').addClass('parsley-error');
        return false;
    }
    else {
        $('#phone').addClass('parsley-success');
        $('#phone').removeClass('parsley-error');
        return true;
    }
}

$("#phone").on('keyup', function (e) {
    // console.log(iti);
    //phoneNumbertextChange();
    var ReturnValue = NumbersOnly(e);
    // phoneNumbertextChange();
    return ReturnValue;
    //return true;
});

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

$(function () {
    // Returns a random integer from 1 to 10
    var num = Math.floor(Math.random() * 10) + 1;
    $("[name='RefrenceNo']").val(num);
});
// Action after signUp button is clicked.
$('#f_submit').on('click', function (e) {
    var cookie = getCookie('refferarURL');
    $("#lead_form [name='ReferalURL']").val(cookie);
    var SignupButton = $('#f_submit');
    var isValidName = checkName();
    $.ajaxSetup({ async: false });
    var isValidEmail = checkEmail();
    var isEnteredNumber = checkPhoneNumber();
    
    var form = $('#lead_form');
    if (isValidName == true && isValidEmail == true && isEnteredNumber == true) {
        $(SignupButton).text("Please wait..");
        $(SignupButton).prop("disabled", true);
        form.submit();
        isSignedUp = true; //to avoid email validation after succussfully register
    } else {
        $('#f_name').focus();
        $(SignupButton).attr("value", "Register Now");
        $(SignupButton).prop("disabled", false);
        isSignedUp = false;
    }

});

/***************Togle below 992 ***************************************************/
    $('.navigation-menu li a').click(function () {
        $(window).width() < 992 && $('.navbar-toggle').click();
    });

/************************Smoothh Scroll***********************/
$(document).on('click', 'a[href^="./#"]', function () {
    var __selector = this.getAttribute('href').split('#');
    $('html, body').animate(
        {
            scrollTop: $('#' + __selector[1]).offset().top - 40,
        },
        600
    );
});

$(document).on('click', 'a[href^="#"]', function () {
    $('html, body').animate(
        {
            scrollTop: $($.attr(this, 'href')).offset().top - 40,
        },
        600
    );
});
/************************ Cookie for Adv compaign************************/
function setCookie(name, value, days) {
    if (days > 0) {
        var seconds = new Date().getTime() + 1000 * 60 * 60 * 24 * days;
        var date = new Date(seconds).toUTCString();
        document.cookie = name + '=' + value + '; expires=' + date + '; domain=' + window.location.host.replace('www.', '');
    } else {
        document.cookie = name + '=' + value + '; domain=' + window.location.host.replace('www.', '');
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var url = window.location.href;
if (url.toLowerCase().indexOf('utm') !== -1 || url.toLowerCase().indexOf('campaign') !== -1) {
    $("#lead_form [name='ReferalURL']").val(url);
    setCookie('refferarURL', url);
}
/************************Faq collapse Script ************************/
$("#accordionExample .card .faq").click(function () {
    if ($(this).attr('aria-expanded') == 'false') {
        $(this).addClass("icon-active");
    }
    else {
        $("#accordionExample .card .faq").removeClass("icon-active");
    }
});
/************************ lead form Procesing ************************/
$("form").submit(function () {
    $("#f_submit").text("Processing ...");
});
/************************ services carousel ************************/


if(page=='tutoring-help.php' || page=='thanks.php'){

    $(".navbar_btns,.btn_user_mbile").hide();
}

// ReviewPage Form Auto Response
$("#review__form").submit(function (e) {
e.preventDefault(); //prevent default action 
var form_data = $(this).serialize(); //Encode form elements for submission
    $.ajax({
    method: 'post',
	url: 'reviews.php',
	data: form_data
}).done(function (response) {
	$('#auto-response-popup').show();
	$('#reviewer_name').val('');
	$('#reviewer_email').val('');
	$('#reviewer_comments').val('');
});
});
$("#submitreview").click(function () {
setTimeout(function () {
	$('#auto-response-popup').hide();
}, 4000);
});
//Mobile Menu close click event
  $('#topnav #nav_responsive.navbar-collapse.collapse a, #topnav #custom_navbar_xs #navbar_closer').click(function () {
    $('#topnav #nav_responsive').removeClass('show');
  });
  if ($('#topnav #nav_responsive').hasClass('show')) {
    $('body').addClass('body_overflow');
  }



