var storage = chrome.storage.local;
var MILLI_CONV = 86400000; // 1000*60*60*24


loop();
function loop() {
    reload();
    setTimeout(loop, 500);
}

// chrome.storage.onChanged.addListener(function() {
//     reload();
// });

function reload() {
    storage.get({
        highlight: true,
        threshold: "30"
        }, function(options) {
        render(options);
    });
}

function render(options) {
    $(".activity").remove();

    var threshold = (options === undefined) ? 30 : options.threshold;
    var highlight = (options === undefined) ? true : options.highlight;
    
    var col = "<td class=number activity>test</td>";

    $("th.achievements").after('<th class="number activity">Days since<br />last activity</th>');

    $("td.achievements").each(function() {
        var text = $(this).find("span.additional").text();
        var m = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{2}) (\d{1,2}):(\d{2}) ([a-zA-Z]{2})/i);
        if(m[6] == "PM")
            m[4] = +m[4] + 12 + "";
        d = new Date(20+m[3], m[1]-1, m[2], m[4], m[5]);
        n = new Date();
        diff = n - d;
        diff = Math.round(diff/(MILLI_CONV));
        
        var c = "number activity";
        if(highlight) {
            if(diff <= threshold) {
                c = c+" active";
            } else if(diff > threshold) {
                c = c+" inactive";
            }
        }
        
        $(this).after("<td class=\""+c+"\">"+diff+"</th>");
    });
}