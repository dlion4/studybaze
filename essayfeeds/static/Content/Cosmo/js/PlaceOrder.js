var generalHandler = function () {
    var numbersOnly = function (e) {
        if (e.currentTarget.value.indexOf(' ') >= 0) {
            e.currentTarget.value = e.currentTarget.value.replace(/\s/g, '');
            return true;
        } 
        number = parseInt(e.currentTarget.value);
        if (!isNaN(number)) {
            e.currentTarget.value = number;
            return true;
        }
        e.currentTarget.value = '';
        return false;
    };

    var getUrlParameters = function () {
        try {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        } catch (e) {
            return [];
        }
    }

    //var getParameterByName = function (name, url) {
    //    if (!url) url = window.location.href;
    //    name = name.replace(/[\[\]]/g, "\\$&");
    //    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    //    results = regex.exec(url);
    //    if (!results) return null;
    //    if (!results[2]) return '';
    //    return decodeURIComponent(results[2].replace(/\+/g, " "));
    //};

    var getOrderIdFromUrl = function () {
        var url = window.location.href;
        var regex = new RegExp("[?&]orderId(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results || !results[2]) {
            return null;
        }
        return results[2].toString();
    };

    var removeURLParameter = function (url, parameter) {
        //prefer to use l.search if you have a location/link object
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {
            var prefix = encodeURIComponent(parameter) + '=';
            var pars = urlparts[1].split(/[&;]/g);

            //reverse iteration as may be destructive
            for (var i = pars.length; i-- > 0;) {
                //idiom for string.startsWith
                if (pars[i].toLowerCase().lastIndexOf(prefix.toLocaleLowerCase(), 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
            return url;
        } else {
            return url;
        }
    };

    // Read a page's GET URL variables and return them as an associative array.
    var getUrlVars = getUrlParameters;

    //var countdownTimer = function () {
    //    second = 1e3;
    //    minute = 60 * second;
    //    hour = 60 * minute;
    //    countDown = (new Date).getTime() + 66e5;
    //    x = setInterval(function () {
    //        now = (new Date).getTime();
    //        distance = countDown - now;
    //        distance < 1e3 && (countDown += 66e5);
    //        document.getElementById("hours").innerText = Math.floor(distance / hour);
    //        document.getElementById("minutes").innerText = Math.floor(distance % hour / minute);
    //        document.getElementById("seconds").innerText = Math.floor(distance % minute / second);
    //    }, second);
    //};

    return {
        numbersOnly: numbersOnly,
        //getParameterByName: getParameterByName,
        getOrderIdFromUrl: getOrderIdFromUrl,
        removeURLParameter: removeURLParameter,
        getUrlVars: getUrlVars,
        //countdownTimer: countdownTimer,
    };
};

var priceCalculator = function () {
    var discountPercentage = JSON.parse($('#discountPercentage').val());
    var priceChart = JSON.parse($('#priceChart').val());
    var priceChartValue = $('#bulkpagediscount').val();
    if (priceChartValue != "") {
        var pageDiscountChart = JSON.parse($('#bulkpagediscount').val());
    }

    var bulkdiscount = function (pages) {
        if ($("#ddl_LineSpacing").val() == "1") {
            pages *= 2;
        }

        for (var i = 0; i < pageDiscountChart.length; i++) {
            for (var j = 0; j < pageDiscountChart[i].length; j++) {
                if (pages >= pageDiscountChart[i][j++] && pages <= pageDiscountChart[i][j++]) {
                    return pageDiscountChart[i][j];
                }
                else if (pages > pageDiscountChart[pageDiscountChart.length - 1][1]) {
                    return pageDiscountChart[pageDiscountChart.length - 1][2];
                }
            }
        }
    };
   
    var getPricePerPage = function (serviceCode, academicLevelCode, deadlineCode, isDiscounted) {
        isDiscounted = isDiscounted || false;
        return isDiscounted
            ? priceChart[serviceCode - 1][academicLevelCode - 1][deadlineCode - 1] * (1 - (discountPercentage / 100))
            : priceChart[serviceCode - 1][academicLevelCode - 1][deadlineCode - 1];
    };

    var getDiscountedPrice = function (ActualPrice, discountPercentage) {
        return ActualPrice * (1 - (discountPercentage / 100));
    };

    var calculatePrice = function () {
        if (Number($('#txt_nop').val()) <= 0) {
            var pages = 1;
            $('#txt_nop').val(pages);
        }

        var urgency = $('#ddl_date').val();
        var level = $('#ddl_lvl').val();
        var selectedService = $("select[name='ServiceCode']").val();
        var price = getPricePerPage(selectedService, level, urgency);
        var pages = 1;

        if ($('#txt_nop').val() != "" && $('#txt_nop').val() != "-")
            pages = $('#txt_nop').val();

        pages = parseInt(pages);


        var words = 0;
        var linespacing = $("#ddl_LineSpacing").val();
        if (linespacing == 1) {
            words = pages * 550;
        }
        else if (linespacing == 2) {
            words = pages * 275;
        }

        $('#txt_now').val(words + "  Words");

        if (linespacing == 1) {
            //var totals = Math.round(price * pages * 100) / 100;
            var totals = ((price * pages)).toFixed(2);
            totals = totals * 2;
        } else if (linespacing == 2) {
            //var totals = Math.round(price * pages * 100) / 100;
            var totals = ((price * pages)).toFixed(2);
        }

        $('#hdn_ppp').val(format_price(price.toFixed(2)));
        $('#lbl_atotal').text(" " + format_price(totals));

        var discount = getDiscountedPrice(totals, discountPercentage);
        var perpagediscountedprice = discount / pages;
        // Set Quality Double-check addon price
        $("#lbl_dblQtyChk").text((pages * perpagediscountedprice * 0.25).toFixed(2));

        var addon = 0.00;
        //if ($("#chk_plgrmRpt").prop("checked")) addon += parseFloat($('#lbl_PlgRpt').text());
        if ($("#chk_grmmrRpt").prop("checked")) addon += parseFloat($('#lbl_grmrRpt').text());
        if ($("#chk_writer").prop("checked")) addon += parseFloat($('#lbl_Writer').text());
        if ($("#chk_dblqltychk").prop("checked")) addon += parseFloat($('#lbl_dblQtyChk').text());

        // Bulk discount
        var bulkpageperscentage = 0
        if (priceChartValue != "") {
            bulkpageperscentage = bulkdiscount(pages);
            $('#BlukOrderDiscount').text(bulkpageperscentage)
        }

        var pagesdiscount = discount, tmpdiscount = discount;
        if (bulkpageperscentage != 0) {
            pagesdiscount = getDiscountedPrice(discount, bulkpageperscentage);
            $('#bulkDiscountID').show();
            $('#lbl_bototal').text(" " + format_price(pagesdiscount))
            tmpdiscount = pagesdiscount.toFixed(2);
        } else {
            $('#bulkDiscountID').hide();
        }

        tmpdiscount = tmpdiscount / pages;
        tmpdiscount = tmpdiscount.toFixed(2);

        if (tmpdiscount == "NaN") {
            tmpdiscount = 0;
        }

        // One page summary addon price
        $("#chk_smry").text(format_price(perpagediscountedprice));
        // Abstract addon price
        $("#chk_abstrt").text(format_price(perpagediscountedprice));

        if ($("#chk_summary").prop("checked")) {
            var sumrypricetext = $("#chk_smry").text();
            var sumryprice = parseFloat(format_price(sumrypricetext));
            addon += sumryprice;
        }

        if ($("#chk_abstrctpge").prop("checked")) {
            var abstrctpricetext = $("#chk_abstrt").text();
            var abstrctprice = parseFloat(format_price(abstrctpricetext));
            addon += abstrctprice;
        }
        // Limited time discount total price in summary block
        $('#lbl_dtotal').text(" " + format_price(discount));
        // Addons total price in summary block
        $('#lbl_ftotal').text(" " + format_price(addon));
        let paytotal = parseFloat(addon) + parseFloat(pagesdiscount);

        // TO PAY NOW block
        $('#lbl_gtotal').text(" " + format_price(paytotal));
        // For mobile devices
        $('#lbl_atotal_m').text(" " + format_price(paytotal));
        $('#lbl_gtotal_m').text(" " + format_price(totals));
    };

    var format_price = function (x) {
        let price = x.toString();
        if (price.indexOf('.') < 0) {
            price = price + '.00';
        } else {
            price = price.substr(0, price.indexOf('.')+3);
        }
        return parseFloat(price).toFixed(2);
    };
    return {
        calculatePrice: calculatePrice,
    };
};

$(function () {
    var placeOrder = function (e) {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };

        var hasErrors = false;
        $('#titleError').hide();
        $('#descriptionError').hide();
        $('#citationError').hide();

        if ($('#ddl_subject').val() == '0') {
            hasErrors = true;
            $('#ddl_subject').addClass('parsley-error');
            $('#ddlsError').show();
            $("#ddl_subject").focus();
        }

        if ($('#txt_topic').val() == '' || $('#txt_topic').val() == null) {
            hasErrors = true;
            $('#txt_topic').addClass('parsley-error');
            $('#titleError').show();
        }
        if ($('#txt_topic').val() == '' || $('#txt_topic').val() == null) {
            $("#txt_topic").focus();
        } else if ($('#txt_description').val() == '' || $('#txt_description').val() == null) {
            $("#txt_description").focus();
        }

        if ($('#txt_description').val() == '' || $('#txt_description').val() == null) {
            hasErrors = true;
            $('#txt_description').addClass('parsley-error');
            $('#descriptionError').show();
        }

        if ($('#ddl_style option:selected').val() == 9 && $('#txt_StyleOther').val().trim() == '') {
            hasErrors = true;
            $('#citationError').show();
        }

        if (hasErrors) {
            return;
        }

        var form = $('#placeOrderForm');
        if (form.parsley().validate()) {
            DisableButton();

            var ProjectName = $("input[name='ProjectName']").val();
            var ProjectDescription = $("textarea[name='ProjectDescription']").val();
            var ServiceCode = $("select[name='ServiceCode']").val();
            var DocumentTypeCode = $("select[name='DocumentTypeCode']").val();
            var AcademicLevelCode = $("select[name='AcademicLevelCode']").val();
            var SubjectFieldCode = $("select[name='SubjectFieldCode']").val();
            var DeadlineCode = $("select[name='DeadlineCode']").val();
            var Pages = $("input[name='Pages']").val();
            var BulkPagesDiscountAmount = $("#lbl_bototal").text();
            var BulkPagesDiscountPercentage = $("#BlukOrderDiscount").text();
            var LineSpacingCode = $("select[name='LineSpacingCode']").val();

            var CitationStyleDescription;
            var CitationStyleCode = $("select[name='CitationStyleCode']").val();
            if (CitationStyleCode == 9) CitationStyleDescription = $("input[name='txt_StyleOther']").val();
            else CitationStyleDescription = "nil";

            var References = $("input[name='References']").val();
            var FontStyleCode = $("select[name='FontStyleCode']").val();
            var LanguageCode = $("select[name='LanguageCode']").val();

            var Addons = [];
            //$("#chk_plgrmRpt").is(":checked") ? Addons.push({ "AddonCode": 1 }) : null;
            $("#chk_grmmrRpt").is(":checked") ? Addons.push({ "AddonCode": 2 }) : null;
            $("#chk_writer").is(":checked") ? Addons.push({ "AddonCode": 3 }) : null;
            $("#chk_summary").is(":checked") ? Addons.push({ "AddonCode": 4 }) : null;
            $("#chk_abstrctpge").is(":checked") ? Addons.push({ "AddonCode": 5 }) : null;
            $("#chk_dblqltychk").is(":checked") ? Addons.push({ "AddonCode": 6 }) : null;

            var orderId = generalHandler().getOrderIdFromUrl()
            var data = {
                "OrderID": orderId,
                "__RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val(),
                "ProjectName": ProjectName,
                "ProjectDescription": ProjectDescription,
                "ServiceCode": ServiceCode,
                "DocumentTypeCode": DocumentTypeCode,
                "AcademicLevelCode": AcademicLevelCode,
                "SubjectFieldCode": SubjectFieldCode,
                "DeadlineCode": DeadlineCode,
                "Pages": Pages,
                "BulkPagesDiscountAmount": BulkPagesDiscountAmount,
                "BulkPagesDiscountPercentage": BulkPagesDiscountPercentage,
                "LineSpacingCode": LineSpacingCode,
                "CitationStyleCode": CitationStyleCode,
                "CitationStyleDescription": CitationStyleDescription,
                "References": References == '' || References == undefined ? 0 : References,
                "FontStyleCode": FontStyleCode,
                "LanguageCode": LanguageCode,
                "AdditionalFeatures": { "Addons": Addons },
            };
          
            $.ajax({
                type: "POST",
                url: '/order/placeorder',
                data: data,
                error: function (err) {
                    EnableButton();
                },
                success: function (result) {
                    if (result.Result) {
                        $('#serverData').val(JSON.stringify(data));
                        if (window.location.search.toLowerCase().indexOf("data") >= 0)
                            location.href = "/Order/ConfirmOrderDetails" + window.location.search + "&rdata=" + result.Data;
                        else
                            location.href = "/Order/ConfirmOrderDetails?rdata=" + result.Data;
                    }
                    else {
                        (result.IsException) ? $("#error_server").show() : $("#error_details").show();
                        EnableButton();
                    }
                },
                dataType: 'JSON'
            });

        }
    };

    var EnableButton = function () {
        $('.btn_proceed').prop("disabled", false);
        $(".btn_proceed").text("Confirm Order");
        $("#orderErrorMessage").text("Something Went Wrong! Please Contact Support.");
    };

    var DisableButton = function () {
        var Pages = $('#txt_nop').val();
        if (Pages.length) {
            $('.btn_proceed').prop("disabled", true);
            $(".btn_proceed").text("Saving Data...");
            $("#orderErrorMessage").text("");
        }
        else {
            StopEmptyPages();
            EnableButton();
        }
    };

    var SetOrderDetailsFromUrlParameters = function () {
        var urlVariables = generalHandler().getUrlVars();
        if (urlVariables["Level"]) $("select[name='AcademicLevelCode']").val(urlVariables["Level"]);
        if (urlVariables["Service"]) $("select[name='DocumentTypeCode']").val(urlVariables["Service"]);
        if (urlVariables["Delivery"]) $("select[name='DeadlineCode']").val(urlVariables["Delivery"]);
        if (urlVariables["Pages"]) $("input[name='Pages']").val(urlVariables["Pages"]);
        if (urlVariables["Subject"]) $("select[name='SubjectFieldCode']").val(urlVariables["Subject"]);
        if (urlVariables["ServiceType"]) $("select[name='ServiceCode']").val(urlVariables["ServiceType"]);
        if (urlVariables["LineSpacingCode"]) $("select[name='LineSpacingCode']").val(urlVariables["LineSpacingCode"]);

        var writinglevel = urlVariables["Service"];
        var academiclevel = urlVariables["Level"];
        if (writinglevel != undefined && writinglevel != null) {
            writerLevel(writinglevel, academiclevel);
        }
    };

    var writerLevel = function (writinglevel, academiclevel) {
        if (writinglevel == 5 || writinglevel == 6 || writinglevel == 35) {
            $("#ddl_lvl").val(academiclevel);
        }
        else {
            $("#ddl_lvl").val(academiclevel);
        }
    }

    var getDeadlineDate = function (deadline) {
        var deadlineAry = deadline.split(' ');
        var num = deadlineAry[0];
        var factor = deadlineAry[1];
        //return `/ ${moment().add(num, factor).format('MMM DD, YYYY (hh:mm A)')}`;
        return `/ ${getFormatedDate(num, factor)}`
    };

    let getFormatedDate = (num, factor) => {
        if (factor == 'days') {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + parseInt(num));
            return currentDate.toLocaleString("en-us", { month: 'short', day: 'numeric', year: 'numeric' }) + ' (' + currentDate.toLocaleString("en-us", { hour: 'numeric', minute: 'numeric'}) +')';
        } else {
            let currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + parseInt(num));
            return currentDate.toLocaleString("en-us", { month: 'short', day: 'numeric', year: 'numeric' }) + ' (' + currentDate.toLocaleString("en-us", { hour: 'numeric', minute: 'numeric' }) + ')';
        }
        
    }

    // Timer on page
    //generalHandler().countdownTimer();

    // Call price calulate function every second
    //setTimeout(function () {
    //    priceCalculator().calculatePrice();
    //}, 1000);

    // Validator for citation style: Other
    Parsley.addValidator('styleOther', {
        validateString: function () {
            //console.log($("input[name='txt_StyleOther']").val());
            var CitationStyleCode = $("select[name='CitationStyleCode']").val();
            if (CitationStyleCode == 9) {
                return $("input[name='txt_StyleOther']").val().trim() != '';
            }
            else
                return true;
        },
        messages: { en: 'This field is required' }
    });

    // Citation Style dropdown ID...
    if ($("#ddl_style option:selected").val() != 9) {
        $(".othsty").hide();
        var opn = 0;
        // Citation Style text input ID...
        $("#txt_StyleOther").css("display", "none");
    }
    else {
        var opn = 1;
    }

    // Show/Hide citation style text input...
    $("#ddl_style").change(function () {
        if ($("#ddl_style option:selected").val() == 9) {
            $('#txt_StyleOther').val('');
            $("#txt_StyleOther").css("display", "");
            opn = 1;
            $(".othsty").slideDown();
        }
        else if (opn == 1) {
            $(".othsty").slideUp();
            $('#citationError').hide();
        }
    });

    // Numbers only validation on numberOfPages, and numberOfReferences input fields
    $("#txt_nop, #txt_nor").keyup(function (e) {
        var ReturnValue = generalHandler().numbersOnly(e);
        return ReturnValue;
    });

    $("#txt_nor").on('blur', function () {
        var num = Number($(this).val());
        $(this).val(Math.abs(num));
    });

    $('#txt_nop').on('blur', function () {
        priceCalculator().calculatePrice();
    });

    $('#txt_nop').on('focusout', function () {
        if (Number($('#txt_nop').val()) <= 0) {
            var pages = 1;
            $('#txt_nop').val(pages);
        }
    });

    // Recalculate price if any field changes
    $(".opr").bind('keydown change', function () {
        priceCalculator().calculatePrice();
    });

    // Place Your Order button
    $('.btn_proceed').click(function (e) {
        placeOrder(e);
    });

    // Project Title validation
    $('#txt_topic').on('input focusout', function () {
        if ($('#txt_topic').val().length > 0) {
            $('#titleError').hide();
            $('#txt_topic').removeClass('parsley-error');
        } else {
            $('#txt_topic').addClass('parsley-error');
            $('#titleError').show();
        }
    });

    $('#ddl_subject').on('input focusout', function () {
        if ($('#ddl_subject').val() > 0) {
            $('#ddlsError').hide();
            $('#ddl_subject').removeClass('parsley-error');
        } else {
            $('#ddl_subject').addClass('parsley-error');
            $('#ddlsError').show();
        }
    });

    // Project description validation
    $('#txt_description').on('input focusout', function () {
        if ($('#txt_description').val().length > 0) {
            $('#descriptionError').hide();
            $('#txt_description').removeClass('parsley-error');
        } else {
            $('#descriptionError').show();
            $('#txt_description').addClass('parsley-error');
        }
    });

    // Citation Style text input field validation
    $('#txt_StyleOther').on('input focusout', function () {
        if ($('#txt_StyleOther').val().length > 0) {
            $('#citationError').hide();
        } else {
            $('#citationError').show();
        }
    });

    // Value is NULL on site
    var data = JSON.parse($('#serverData').val());
    if (data != null) {
        $("input[name='ProjectName']").val(data.ProjectName);
        $("textarea[name='ProjectDescription']").val(data.ProjectDescription);
        $("select[name='ServiceCode']").val(data.ServiceCode);
        $("select[name='DocumentTypeCode']").val(data.DocumentTypeCode);
        $("select[name='AcademicLevelCode']").val(data.AcademicLevelCode);
        $("select[name='SubjectFieldCode']").val(data.SubjectFieldCode);
        $("select[name='DeadlineCode']").val(data.DeadlineCode);
        $("input[name='Pages']").val(data.Pages);
        $("select[name='LineSpacingCode']").val(data.LineSpacingCode);
        $("select[name='CitationStyleCode']").val(data.CitationStyleCode);
        $("#ddl_style option:selected").val(data.CitationStyleCode);
        $("#ddl_style option:selected").change();
        $("input[name='txt_StyleOther']").val(data.CitationStyleDescription);
        $("input[name='References']").val(data.References);
        $("select[name='FontStyleCode']").val(data.FontStyleCode);
        $("select[name='LanguageCode']").val(data.LanguageCode);
        if (data.AdditionalFeatures != null) {
            for (i = 0; i < data.AdditionalFeatures.length; i++) {
                switch (data.AdditionalFeatures[i]) {
                    //case 1: $("#chk_plgrmRpt").click(); break;
                    case 2: $("#chk_grmmrRpt").click(); break;
                    case 3: $("#chk_writer").click(); break;
                    case 4: $("#chk_summary").click(); break;
                    case 5: $("#chk_abstrctpge").click(); break;
                    case 6: $("#chk_dblqltychk").click(); break;
                    default: break;
                }
            }
        }

        var academiclevel = data.AcademicLevelCode;
        var writinglevel = data.DocumentTypeCode;
        writerLevel(writinglevel, academiclevel);
    }
    //else {
    //    history.replaceState(null, $(document).find("title").text(), generalHandler().removeURLParameter(window.location.href, "orderid"));
    //}

    // UI related JavaScript
    $(window).scroll(function () {
        if ($("#placeorder_sidebar").height() > 800) {
            var scrollPos = $(window).scrollTop();
            if (scrollPos > 80 && scrollPos <= 442) {
                $('#placeorder_sidebar').addClass('sidebar_sticky').removeClass('sidebar_sticky_abs_error');
            } else if (scrollPos > 442) {
                $('#placeorder_sidebar').removeClass('sidebar_sticky').addClass('sidebar_sticky_abs_error');
            } else {
                $('#placeorder_sidebar').removeClass('sidebar_sticky').removeClass('sidebar_sticky_abs_error');
            }
        } else {
            var scrollPos = $(window).scrollTop();
            if (scrollPos > 80 && scrollPos <= 515) {
                $('#placeorder_sidebar').addClass('sidebar_sticky').removeClass('sidebar_sticky_abs');
            } else if (scrollPos > 515) {
                $('#placeorder_sidebar').removeClass('sidebar_sticky').addClass('sidebar_sticky_abs');
            } else {
                $('#placeorder_sidebar').removeClass('sidebar_sticky').removeClass('sidebar_sticky_abs');
            }
        }
    });

    // Increase pages button
    $(document).on('click', '#form-data .input-group .q_plus', function (e) {
        var quantity = parseInt($('#txt_nop').val());
        if (quantity < 9999) {
            $('#txt_nop').val(quantity + 1);
            $('#txt_nop').trigger('blur');
        }
    });

    // Decrease pages button
    $(document).on('click', '#form-data .input-group .q_minus', function (e) {
        var quantity = parseInt($('#txt_nop').val());
        if (quantity > 1) {
            $('#txt_nop').val(quantity - 1);
            $('#txt_nop').trigger('blur');
        }
    });

    // Increase references button
    $(document).on('click', '#form-data .input-group .q_plus_ref', function (e) {
        var ref_q = parseInt($('#txt_nor').val());
        if (ref_q < 9999) {
            $('#txt_nor').val(ref_q + 1);
        }
    });

    // Decrease references button
    $(document).on('click', '#form-data .input-group .q_minus_ref', function (e) {
        var ref_q = parseInt($('#txt_nor').val());
        if (ref_q > 0) {
            $('#txt_nor').val(ref_q - 1);
        }
    });

    // Number of references text input field validation
    $(document).on('input', '#txt_nor', function () {
        var t = $("#txt_nor").val();
        1 > t && $("#txt_nor").val(0)
    });

    SetOrderDetailsFromUrlParameters();

    $('#ddl_date option').each(function (index, option) {
        let deadline = $(option).text();
        deadline += ` ${getDeadlineDate(deadline)}`;
        $(option).text(deadline);
    });
});