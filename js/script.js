function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;
    request.open('GET', url, true);
    request.onload = callback;
    request.send();
}

// Taken from the Jquery Validation plugin
function validateUrl(str) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(str);
}

function submit() {
    var urlField = document.getElementById("url");
    var passField = document.getElementById("pass");
    var txtArea = document.getElementById("plaintext");
    txtArea.value = "";

    var url = urlField.value;
    var pass = passField.value;

    urlField.className = url ? "" : "error";
    passField.className = pass ? "" : "error";
    if (!url || !pass)
        return;

    if (!validateUrl(url))
        url = "http://" + url;
    if (!validateUrl(url)) {
        txtArea.className = "error";
        txtArea.value = "Error: Invalid URL.";
        return;
    }

    txtArea.className = "";
    txtArea.value = ". . .";

    downloadUrl(url, function(e) {
        if (this.status == 200) {
            var decrypted = CryptoJS.AES.decrypt(this.responseText, pass);
            var str = decrypted.toString(CryptoJS.enc.Utf8);
            if (str) {
                txtArea.value = str;
            } else {
                txtArea.className = "error";
                txtArea.value = "Error: Wrong Password";
            }
        } else {
            txtArea.className = "error";
            txtArea.value = "Error: " + this.status + " " + this.statusText;
        }
    });
};

document.getElementById("form").onsubmit = function() {
    submit();
    return false;
};

