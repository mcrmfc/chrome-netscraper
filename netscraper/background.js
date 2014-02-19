var counter = 0;
function logNetRequest(details)  {
    var callingTab = details.tabId,
    arrayBufferString = '',
    callingTabUrl;

    var requestDetails = {};
    requestDetails.url = details.url;
    requestDetails.method = "GET";

    //Get request body if it exists - could do with some code love here
    if(details.requestBody) {
        if(details.requestBody.raw) {
            if(details.requestBody.raw[0]) {
                requestDetails.method = "POST";
                var arrayBuffer = details.requestBody.raw[0].bytes;
                arrayBufferString = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
                requestDetails.requestBody = arrayBufferString;
            }
        }
    }

    if(callingTab >= 0) {
        chrome.tabs.get(callingTab, function(tab) { callingTabUrl = tab.url; report(callingTabUrl, requestDetails);});
    }
}

function report(callingTabUrl, requestDetails, requestBody) {
    var obj = {}
    obj[callingTabUrl] = JSON.stringify(requestDetails);
    chrome.storage.local.set(obj);
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {logNetRequest(details);}, {urls: ["*://*/*"]}, ['requestBody']);
