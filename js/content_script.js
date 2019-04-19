var sources = [],
    i = 0,
    bgIm,
    protocol = location.protocol;
    origin = location.origin;

function getStyle(x, styleProp)
{
    if (x.currentStyle)
    {
        var y = x.currentStyle[styleProp];
    }
    else if (window.getComputedStyle)
    {
        var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
    }
    return y;
}

var elements = document.getElementsByTagName('*');

for (; elements[i]; i++)
{
    var source;
    if (elements[i].nodeName == "IMG")
    {
        source = elements[i].getAttribute('src');
    } 
    else 
    {
        bgIm = getStyle(elements[i], 'background-image');
        if (bgIm && bgIm !== 'none') 
        {
            bgIm = /url\(['"]?([^")]+)/.exec(bgIm) || [];
            source = bgIm[1]
        }
    }
    source = source && source.slice(0, 2) == "//" ? protocol + source : source
    source = source && source.slice(0, 1) == "/" ? origin + source : source
    if (source && sources.indexOf(source) == -1 && source.indexOf("chrome-extension://") == -1)
        sources.push(source);
}
chrome.extension.sendRequest(sources);