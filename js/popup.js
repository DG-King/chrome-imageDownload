chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
{
    chrome.tabs.executeScript(tabs[0].id, {file: 'js/content_script.js', allFrames: true}, _=>
    {
        let e = chrome.runtime.lastError;
        if(e !== undefined){
            console.log(tabs[0].id, _, e);
        }
    });
});

chrome.extension.onRequest.addListener(function(sources) 
{
    var fragment = document.createDocumentFragment();
    sources.map(url =>
    {
        var li = document.createElement("li");
        li.className = "img-item";
        var img = document.createElement("img");
        img.src = url;
        img.onload = function()
        {
            img.title = `${img.width}*${img.height}`;
        }
        li.appendChild(img);
        var span = document.createElement("span");
        span.innerText = "下载";
        span.onclick = function()
        {
            chrome.downloads.download({ 
                url: url,
                conflictAction: 'uniquify',
                saveAs: false
            }, function(id){});
        }
        li.appendChild(span);
        fragment.append(li);
    })
    document.getElementById("content").append(fragment);
    document.getElementById("total").innerText = document.getElementsByTagName("li").length;
});

