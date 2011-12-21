/*
 * MyFonts Webfont Build ID 749820, 2011-04-07T12:09:56-0400
 *
 * The fonts listed in this notice are subject to the End User License
 * Agreement(s) entered into by the website owner. All other parties are 
 * explicitly restricted from using the Licensed Webfonts(s).
 *
 * You may obtain a valid license at the URLs below.
 *
 * Webfont: Monocle Regular
 * URL: http://new.myfonts.com/fonts/reserves/monocle/regular/
 * Foundry: Reserves
 * Copyright: Copyright 2010 Reserves. http://www.reservesca.com Administration Contact: info@reservesca.com
 * License: http://www.myfonts.com/viewlicense?1056
 * Licensed pageviews: 10,000/month
 * CSS font-family: Monocle-Regular
 * CSS font-weight: normal
 *
 * Webfont: Monocle Bold
 * URL: http://new.myfonts.com/fonts/reserves/monocle/bold/
 * Foundry: Reserves
 * Copyright: Copyright 2010 Reserves. http://www.reservesca.com Administration Contact: info@reservesca.com
 * License: http://www.myfonts.com/viewlicense?1056
 * Licensed pageviews: 10,000/month
 * CSS font-family: Monocle-Bold
 * CSS font-weight: normal
 *
 * Webfont: Monocle Light
 * URL: http://new.myfonts.com/fonts/reserves/monocle/light/
 * Foundry: Reserves
 * Copyright: Copyright 2010 Reserves. http://www.reservesca.com Administration Contact: info@reservesca.com
 * License: http://www.myfonts.com/viewlicense?1056
 * Licensed pageviews: 10,000/month
 * CSS font-family: Monocle-Light
 * CSS font-weight: normal
 *
 * (c) 2011 Bitstream, Inc
*/



// safari 3.1: data-css
// firefox 3.6+: woff
// firefox 3.5+: data-css
// chrome 4+: data-css
// chrome 6+: woff
// IE 5+: eot
// IE 9: woff
// opera 10.1+: data-css
// mobile safari: svg/data-css
// android: data-css

var browserName, browserVersion, webfontType,  webfontTypeOverride;
 
if (typeof(customPath) == 'undefined')
  var customPath = false;


if (typeof(woffEnabled) == 'undefined')
  var woffEnabled = true;


if (/myfonts_test=on/.test(window.location.search))
  var myfonts_webfont_test = true;

else if (typeof(myfonts_webfont_test) == 'undefined')
  var myfonts_webfont_test = false;


if (customPath)
  var path = customPath;

else {
  var scripts = document.getElementsByTagName("SCRIPT");
  var script = scripts[scripts.length-1].src;

  if (!script.match("://") && script.charAt(0) != '/')
    script = "./"+script;

  var path = script.replace(/\\/g,'/').replace(/\/[^\/]*\/?$/, '');
}


if (myfonts_webfont_test)
  document.write('<script type="text/javascript" src="' +path+ '/MyFontsWebfontsOrderM2847978_test.js"></script>');


if (/webfont=(woff|ttf|eot)/.test(window.location.search))
{
  webfontTypeOverride = RegExp.$1;

  if (webfontTypeOverride == 'ttf')
    webfontTypeOverride = 'data-css';
}


if (/MSIE (\d+\.\d+)/.test(navigator.userAgent))
{
  browserName = 'MSIE';
  browserVersion = new Number(RegExp.$1);
  if (browserVersion >= 9.0 && woffEnabled)
    webfontType = 'woff';
  else if (browserVersion >= 5.0)
    webfontType = 'eot';
}
else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
{
  browserName = 'Firefox';
  browserVersion = new Number(RegExp.$1);
  if (browserVersion >= 3.6 && woffEnabled)
    webfontType = 'woff';
  else if (browserVersion >= 3.5)
    webfontType = 'data-css';
}
else if (/Chrome\/(\d+\.\d+)/.test(navigator.userAgent)) // must check before safari
{
  browserName = 'Chrome';
  browserVersion = new Number(RegExp.$1);

  if (browserVersion >= 6.0 && woffEnabled)
    webfontType = 'woff';

  else if (browserVersion >= 4.0)
    webfontType = 'data-css';
}
else if (/Mozilla.*(iPhone|iPad).* OS (\d+)_(\d+).* AppleWebKit.*Safari/.test(navigator.userAgent))
{
    browserName = 'MobileSafari';
    browserVersion = new Number(RegExp.$2) + (new Number(RegExp.$3) / 10)

  if(browserVersion >= 4.2)
    webfontType = 'data-css';

  else
    webfontType = 'svg';
}
else if (/Mozilla.*(iPhone|iPad|BlackBerry).*AppleWebKit.*Safari/.test(navigator.userAgent))
{
  browserName = 'MobileSafari';
  webfontType = 'svg';
}
else if (/Safari\/(\d+\.\d+)/.test(navigator.userAgent))
{
  browserName = 'Safari';
  if (/Version\/(\d+\.\d+)/.test(navigator.userAgent))
  {
    browserVersion = new Number(RegExp.$1);
    if (browserVersion >= 3.1)
      webfontType = 'data-css';
  }
}
else if (/Opera\/(\d+\.\d+)/.test(navigator.userAgent))
{
  browserName = 'Opera';
  if (/Version\/(\d+\.\d+)/.test(navigator.userAgent))
  {
    browserVersion = new Number(RegExp.$1);
    if (browserVersion >= 10.1)
      webfontType = 'data-css';
  }
}


if (webfontTypeOverride)
  webfontType = webfontTypeOverride;

switch (webfontType)
{
    case 'eot':
    document.write("<style>\n");
        document.write("@font-face {font-family:\"Monocle-Regular\";src:url(\"" + path + "/webfonts/eot/style_194783.eot\");}\n");
        document.write("@font-face {font-family:\"Monocle-Bold\";src:url(\"" + path + "/webfonts/eot/style_194784.eot\");}\n");
        document.write("@font-face {font-family:\"Monocle-Light\";src:url(\"" + path + "/webfonts/eot/style_194785.eot\");}\n");
        document.write("</style>");
    break;

    case 'woff':
    document.write("<style>\n");
        document.write("@font-face {font-family:\"Monocle-Regular\";src:url(\"" + path + "/webfonts/woff/style_194783.woff\") format(\"woff\");}\n");
        document.write("@font-face {font-family:\"Monocle-Bold\";src:url(\"" + path + "/webfonts/woff/style_194784.woff\") format(\"woff\");}\n");
        document.write("@font-face {font-family:\"Monocle-Light\";src:url(\"" + path + "/webfonts/woff/style_194785.woff\") format(\"woff\");}\n");
        document.write("</style>");
    break;

    case 'data-css':
    document.write("<link rel='stylesheet' type='text/css' href='" + path + "/webfonts/datacss/MyFontsWebfontsOrderM2847978.css'>");
    break;

    case 'svg':
    document.write("<style>\n");
        document.write("@font-face {font-family:\"Monocle-Regular\";src:url(\"" + path + "/webfonts/svg/style_194783.svg#Monocle-Regular\") format(\"svg\");}\n");
        document.write("@font-face {font-family:\"Monocle-Bold\";src:url(\"" + path + "/webfonts/svg/style_194784.svg#Monocle-Bold\") format(\"svg\");}\n");
        document.write("@font-face {font-family:\"Monocle-Light\";src:url(\"" + path + "/webfonts/svg/style_194785.svg#Monocle-Light\") format(\"svg\");}\n");
        document.write("</style>");
    break;

  default:
    break;
}
