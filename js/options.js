var storage = chrome.storage.local;
var highlight = document.getElementById('highlight');
var threshold = document.getElementById('threshold');

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', saveOptions);

loadOptions();

function saveOptions() {
    var h = highlight.checked;
    var t = threshold.value;
    
    storage.set({
        highlight: h,
        threshold: t
    }, function() {
        var message = document.getElementById('message');
        message.innerHTML = 'Options saved!';
        setTimeout(function() {
            message.innerHTML = '';
        }, 2000);
    });
}

function loadOptions() {
    storage.get({
        highlight: true,
        threshold: "30"
    }, function(options) {
        highlight.checked = options.highlight;
        threshold.value = options.threshold;
    });
}