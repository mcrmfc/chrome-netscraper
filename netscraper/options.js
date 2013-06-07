// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
    var obj = {}

    var filterElem = document.getElementById("filter");
    var filter = filterElem.value;
    obj['filter'] = filter;

    // Update status to let user know options were saved.
    chrome.storage.local.set(obj);
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    chrome.storage.local.get("filter", function(obj) {
        var filterElem = document.getElementById("filter");
        filterElem.value = obj['filter'];
    });

}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
