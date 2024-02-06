let cancelOrderDialog = (orderID) => {
    $("#Cancel_OrderID").val(orderID);
    $("#txt_feedback").val('');
    $("#reason_error").css('display', 'none');
    $("#myModal").modal('show');
}

$(() => {
    oTable = $('#table-orders').DataTable({
        'paging': true,
        'lengthChange': false,
        'searching': true,
        'ordering': true,
        'info': false,
        'autoWidth': false,
        "aaSorting": [],
        "pageLength": 5,
        'language': {
            'emptyTable': 'No Record Found'
        }
    });

    $("#cancelOrder-form").submit(function (e) {
        e.preventDefault();
        if (!$("#txt_feedback").val().trim()) {
            $("#reason_error").css('display', 'block');
        } else {
            $("#reason_error").css('display', 'none');
            $("#cancelOrder-form")[0].submit();
        }
    });

    $('#searchOrder').click(function () {
        oTable.search($("#searchtext").val()).draw();
    })
    $(document).on('keyup', '#searchtext', function (e) {
      oTable.search($("#searchtext").val()).draw();
    });
    $("#rptSelectOrder_ctl01_lnk_ordercancel").click(function () {
        cancelOrderDialog($("#OrderIDtxb").val());
    });
});

////Copy Email ToolTip
//const copyMailId = document.querySelectorAll('.mail-text');
//copyMailId.forEach(copyText => {
//    copyText.addEventListener('click', () => {
//        const selection = window.getSelection();
//        const range = document.createRange();
//        range.selectNodeContents(copyText);
//        selection.removeAllRanges();
//        selection.addRange(range);
//        try {
//            document.execCommand('copy');
//            selection.removeAllRanges();

//        } catch (e) {
//            copyText.textContent = 'Couldn\'t copy, hit Ctrl+C!';
//            copyText.classList.add('error');

//            setTimeout(() => {
//                errorMsg.classList.remove('show');
//            }, 1200);
//        }
//    });
//});
////Copy Email to clipboard
//$(".mail-text").click(function () {
//    $(".mail-text").attr('data-tooltip', 'Copied to Clipboard');
//    setTimeout(() => {
//        $(".mail-text").attr('data-tooltip', 'Click to Copy');
//    }, 2000);
//});