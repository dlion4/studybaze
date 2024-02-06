//Copy Email ToolTip
const copyMailId = document.querySelectorAll('.mail-text');
copyMailId.forEach(copyText => {
    copyText.addEventListener('click', () => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(copyText);
        selection.removeAllRanges();
        selection.addRange(range);
        try {
            document.execCommand('copy');
            selection.removeAllRanges();

        } catch (e) {
            copyText.textContent = 'Couldn\'t copy, hit Ctrl+C!';
            copyText.classList.add('error');

            setTimeout(() => {
                errorMsg.classList.remove('show');
            }, 1200);
        }
    });
});
//Copy Email to clipboard
$(".mail-text").click(function () {
    $(".mail-text").attr('data-tooltip', 'Copied to Clipboard');
    setTimeout(() => {
        $(".mail-text").attr('data-tooltip', 'Click to Copy');
    }, 2000);
});