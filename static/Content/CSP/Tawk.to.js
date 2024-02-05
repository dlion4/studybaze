var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/'+document.currentScript.getAttribute('LiveChatID');
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

window.Tawk_API.onLoad = function () {
    window.Tawk_API.addTags(["'" + document.getElementById('IPA') + "'", "'" + document.getElementById('WSN') + "'"], function (error) { });
};

$(".chaton").click(function () {
    Tawk_API.toggle();
});