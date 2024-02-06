$(function () {
var pageReloadIncaseOfBackButton = function () {
window.addEventListener(
"pageshow",
function (evt) {
if (evt.persisted) {
setTimeout(function () {
window.location.reload();
}, 10);
}
},
false
);
};

//generalHandler().countdownTimer();
pageReloadIncaseOfBackButton();

if ($("#addonRow").next().is("tr")) {
$("#addon_details").show();
} else {
$("#addon_details").hide();
}

$(".btn_proceed").on("click", function (e) {
$(".btn_proceed").attr("disabled", true);
$(".btn_proceed").text("Please wait...");

var orderID = $('input[name="orderId"]').val();
$.post("/Order/GetConfirmationURL", { orderID: orderID }, function () {
$("#loadingHeading").removeClass("hidden");
})
.done(function (response) {
$("#loadingHeading").addClass("hidden");
response = JSON.parse(response);
if (response.returnUrl != null && response.returnUrl != "") {
window.location.href = response.returnUrl;
} else {
$(".btn_proceed").attr("disabled", false);
$(".btn_proceed").text("Proceed to Payment");
}
})
.fail(function (XMLHttpRequest) {
$(".btn_proceed").attr("disabled", false);
$(".btn_proceed").text("Proceed to Payment");
});
});

$(".promoError").hide();
$("body .txtPromoCode").on("blur", function () {
$(".txtPromoCode").parsley().validate();
});

$("body .btnPromoCode").on("click", function (e) {
e.preventDefault();
ApplyPromoCode();
return false;
});
$("#txtPromoCode").keyup(function (event) {
if (event.keyCode === 13) {
ApplyPromoCode();
}
});
});

function ApplyPromoCode() {
$(".promoSuccess").hide();
if ($(".txtPromoCode").parsley().isValid()) {
$(".promoError").hide();
$(".promo-loader").show();
$.ajax({
type: "POST",
url: "/order/promocode",
data: {
__RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
promoCode: $(".txtPromoCode").val(),
orderId: $("#lbl_orderID").text().trim(),
},
error: function (err) {
$(".promoError").text("An error occured while sending request");
$(".promoError").show();
},
success: function (result) {
if (result["Result"]) {
$(".promo-loader").hide();
location.href = window.location.href + "#!";
location.reload(true);
} else {
$(".promo-loader").hide();
$(".promoError").text(result.Message);
$(".promoError").show();
}
},
dataType: "JSON",
});
}
}
