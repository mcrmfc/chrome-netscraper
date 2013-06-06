chrome.storage.onChanged.addListener(function(changes) {
    chrome.storage.local.get("selector", function(obj) {
        var selector = obj['selector'];
        if (!selector) {
            selector = '#requestlog';
        }
        chrome.storage.local.get("filter", function(obj) {
            var filter = obj['filter'];
            var requestURL = changes[window.location.href]['newValue'];
            var parser = document.createElement('a');
            parser.href = requestURL;
            var host = parser.host;
            console.log(requestURL);
            if ((!filter || (host == filter)) && document.querySelector(selector)) {
                document.querySelector(selector).innerHTML = '<p>' + changes[window.location.href]['newValue'] + '</p>' + document.querySelector(selector).innerHTML;
            }
        });
    });
});
