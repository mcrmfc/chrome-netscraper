chrome.storage.onChanged.addListener(function(changes) {
    chrome.storage.local.get("filter", function(obj) {
        var filter = obj['filter'];
        var extensionId = chrome.i18n.getMessage("@@extension_id");
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
                    extensionId: extensionId
                },
                bubbles: true,
                cancelable: true
            }
        );
        if (!filter || (host == filter)) {
            document.getElementsByTagName("body")[0].dispatchEvent(event);
        }
    });
});
