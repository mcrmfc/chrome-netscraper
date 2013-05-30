function logNetRequest(details)  {
    var urlRequested = details.url;
    var callingTab = details.tabId;
    var callingTabUrl;
    chrome.tabs.get(callingTab, function(tab) { callingTabUrl = tab.url; report(callingTabUrl, urlRequested);});
}

function report(callingTabUrl, urlRequested) {
    var obj = {}
    obj[callingTabUrl] = urlRequested;
    chrome.storage.local.set(obj);
}

chrome.webRequest.onCompleted.addListener(
    function(details) {logNetRequest(details);}, {urls: ["*://*/*"]}, ['responseHeaders']);
