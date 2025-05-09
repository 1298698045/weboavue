var userAgent = navigator.userAgent, 
				rMsie = /(msie\s|trident.*rv:)([\w.]+)/, 
				rFirefox = /(firefox)\/([\w.]+)/, 
				rOpera = /(opera).+version\/([\w.]+)/, 
				rChrome = /(chrome)\/([\w.]+)/, 
				rSafari = /version\/([\w.]+).*(safari)/;
				var browser;
				var version;
				var ua = userAgent.toLowerCase();
				function uaMatch(ua) {
					var match = rMsie.exec(ua);
					if (match != null) {
						return { browser : "IE", version : match[2] || "0" };
					}
					var match = rFirefox.exec(ua);
					if (match != null) {
						return { browser : match[1] || "", version : match[2] || "0" };
					}
					var match = rOpera.exec(ua);
					if (match != null) {
						return { browser : match[1] || "", version : match[2] || "0" };
					}
					var match = rChrome.exec(ua);
					if (match != null) {
						return { browser : match[1] || "", version : match[2] || "0" };
					}
					var match = rSafari.exec(ua);
					if (match != null) {
						return { browser : match[2] || "", version : match[1] || "0" };
					}
					if (match != null) {
						return { browser : "", version : "0" };
					}
				}
				var browserMatch = uaMatch(userAgent.toLowerCase());
				if (browserMatch.browser) {
					browser = browserMatch.browser;
					version = browserMatch.version;
				}

				
				
				var str = '';

//var copyright='金格科技iWebOffice2015智能文档中间件[演示版];V5.0S0xGAAEAAAAAAAAAEAAAAJ0BAACgAQAALAAAANzjZvtiXLkHJdDk1yYwCJbuXO8SB0AwJLEXm/qj1zPTm5HagGB++cI3C7ixX4DqyEbfP0SRwEuaL9eltQWrbsbZNxYb+NfsDQ6X5WMw2zXvWLdLVcKyFB2/tWtXIQzqCLrbwRxacu/0hdV8YWXLojktERkGXsRbBtmsnHsZ8q6TG4BZnxOchn341MP0dxSvqJAn+OblhAoDKdfioTm9tnsYmhBC2bNdMA1Mhn4yVW8ZaURHZZtoKgzXWDfpFch+CS8xbUwGpcbBIrCiIC2mQ2/Ae1qlfFvrN72AqMtQfd9oGBE1UJNe67VXM24d22SesKAu96bDdknWzMPMOjDjLb1Z/r+qgxCbZClfMRx9pfKTWNDwS6vKP2njTUwBcwD7t5teCzgAbduDyi/2b0p7te795/td9U9V3BueylJMA2BmbtfwXJtB1LDwK3FNO5+osTrKcj3S9b5qgvonYOf8F8TxcPeWESOmQ8CvAQbhCoZdiwdxKvX2nr1B5Dqkni+pSLDmvGqpnBxdpJ6jXruDjry2dO2QHDjvrtlJxIL65OoiDlqHZeCFC+D4gtVgOaOQ/A==';
//var copyright ='广东省信息技术应用研究所[专用];V5.0S0xGAAEAAAAAAAAAEAAAAHEBAACAAQAALAAAAJW3vKSvaWHoJUlknOyWzI4kM0n9NR3nCC9YRnfIacmCPNNX5KBF9YXDijeDrDKwmZGnhzYGse4ZwdYhhvaigT8glXIDpWU/J5Z1DO3M5xHFZFHdTtamZi3nb4l4FpzsoSyAH/PvsjQ+f78L6gesR0+RzgpNVPxaV5ggEvipD+6dUmJt/+nNlau2YiRga2bxHHl6fwkb4hqCqy0HWP+2Z4QbRmypS7Sw//HhPw+do3lDnK60ZjVZWD8JSNNQ79VYjg3HWNE0RdSwQ7pP0z/fRKPXyAVWNlZn0gyqIUWBGTXdrTeYYXr3UpCGLt43kNQchstsvPcPnQfMN+MdzHrd1z/3SAeD42X6wSKdPtC8hODdluOYi7iVTn3/bO5qOassjfxUFyPXEu+90qLZpyPk6g5n4/5wMMeJUXkB6iQZXIT2fR18uYZUc9W6EXaNwiKuAztLalogqLhTANM7rmYVyTl8BJML9C7LR3VObrDtMhx7QZpJ78ETyOX4Be6XzSwIVyf+2b9KzAX1m60yX/z4T7M=';
var copyright='江西金格有限公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAFgBAABgAQAALAAAAMrnEv8P+wpC2Yr6nrlPB8spKExwSJ5r2BrtqgC//6GW8AzCc0wmAC22SOkXjSy9A3uayj5/km/q1BuWrOO4ApOSzd+TsXUJGhIM8+ROt4H6S3padxa9WPpqHb0GGlvn0GJbvZtjRWcHCCoRarrFMpnY+5h4gd/f+hN2rqe9nzM35TBPm1utQ4dZnwEOfpGrl2GJCVnNv6LPpOLnOv3np582JmyMygd8+VsPxkxRMn5luLMKxrnWtkn1rDVdan7+1skWk4TBUMr2oMQfp9204dbRPwEZN2nR8CTTtB5hcRFhqYxjhT3swx/LYhHUUrDJ+G8ZO9zVhaG5ol2dJqNl7gMlRbdwjCUaTW6jiu2CBiDihNV8en2yhfIsIvEjgUcjdZT14I1DqbKtNBvU9jt9+OTDHbr7ZV9UtyFIOYNQIIgeG71tH98TymP0OwoyT2D2y5mhW+ySpMobdBe+0IzZXXpXm6Sw6UBAeydt2AuMAzG6';

if ((window.ActiveXObject!=undefined) || (window.ActiveXObject!=null) ||"ActiveXObject" in window)
{
	str += '<object id="WebOffice2015" ';
	
	str += ' width="100%"';
	str += ' height="100%"';
	
	//32位控件
	if(window.navigator.platform == "Win32") 
		str += ' CLASSID="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"  codebase="iWebOffice2015.cab#version=12,7,0,826"';
	//64位控件
	if (window.navigator.platform == "Win64")
		str += ' CLASSID="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D024"  codebase="iWebOffice2015.cab#version=12,7,0,826"';
	str += '>';
	str += '<param name="Copyright" value="' + copyright + '">';
}
else if (browser == "chrome") 
{
	str += '<object id="WebOffice2015" ';


	str += ' width="100%"';
	str += ' height="100%"';
	str += ' clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"';        
	str += ' type="application/kg-plugin"';                              //KGChromePlugin插件type
	//str += ' type="application/kg-activex"';                           //iWebPlugin插件type
	//str += ' type="application/iwebplugin"';
	str += ' OnCommand="OnCommand"';
	str += ' OnOLECommand="OnOLECommand"';
	str += ' OnReady="OnReady"';
	str += ' OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate"';
	str += ' OnSending="OnSending"';
	str += ' OnSendEnd="OnSendEnd"';
	str += ' OnRecvStart="OnRecvStart"';
	str += ' OnRecving="OnRecving"';
	str += ' OnRecvEnd="OnRecvEnd"';
	str += ' OnFullSizeBefore="OnFullSizeBefore"';
	str += ' OnFullSizeAfter="OnFullSizeAfter"';
	str += ' OnExitPrintPreview="OnExitPrintPreview"';        //退出打印预览事件
	str += ' Copyright="' + copyright + '"';
	str += '>';
}
else if (browser == "firefox") 
{
	str += '<object id="WebOffice2015" ';
	str += ' width="100%"';
	str += ' height="100%"';
	str += ' clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"';
	str += ' type="application/kg-activex"';
	//str += ' type="application/iwebplugin"';
	str += ' OnCommand="OnCommand"';
	str += ' OnReady="OnReady"';
	str += ' onUnload="onUnload"';
	str += ' OnOLECommand="OnOLECommand"';
	str += ' OnExecuteScripted="OnExecuteScripted"';
	str += ' OnQuit="OnQuit"';
	str += ' OnSendStart="OnSendStart"';
	str += ' OnSending="OnSending"';
	str += ' OnSendEnd="OnSendEnd"';
	str += ' OnRecvStart="OnRecvStart"';
	str += ' OnRecving="OnRecving"';
	str += ' OnRecvEnd="OnRecvEnd"';
	str += ' OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate"';
	str += ' OnFullSizeBefore="OnFullSizeBefore"';
	str += ' OnFullSizeAfter="OnFullSizeAfter"';	
	str += ' Copyright="' + copyright + '"';
	str += '>';
}

str += '</object>';
document.write(str); 
//alert(str);


