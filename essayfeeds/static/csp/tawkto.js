var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
 
	(function () {
//        console.log(document.currentScript);
       var id = document.currentScript.getAttribute("chatId");
 var ip = document.currentScript.getAttribute("ip");
 var websiteName = document.currentScript.getAttribute("websiteName");

		var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
		s1.async = true;
		s1.src = `https://embed.tawk.to/`+id;
		s1.charset = 'UTF-8';
		s1.setAttribute('crossorigin', '*');
		s0.parentNode.insertBefore(s1, s0);
	})();

	window.Tawk_API.onLoad = function () {
		window.Tawk_API.addTags([ip,websiteName], function (error) { console.log('error: ' + error); });
	};

	$(".chaton").click(function (event) {
        event.preventDefault();
        $(this).attr('href', 'javascript:void(0);');
		Tawk_API.toggle();
	});