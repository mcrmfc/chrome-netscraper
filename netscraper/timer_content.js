chrome.storage.onChanged.addListener(function(changes) {
    chrome.storage.local.get("filter", function(obj) {
        var filter = obj['filter'];
        var requestURL = changes[window.location.href]['newValue'];
        var parser = document.createElement('a');
        parser.href = requestURL;
        var host = parser.host;
        var event = new CustomEvent(
            "netRequest",
            {
                detail: {
                    message: requestURL,
                    time: new Date(),
                },
                bubbles: true,
                cancelable: true
            }
        );
        console.log(filter);
        if (!filter || (host == filter)) {
            document.getElementsByTagName("body")[0].dispatchEvent(event);
        }
    });
});
