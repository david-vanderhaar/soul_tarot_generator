function createAndCopyURL() {
    const url = createURL();
    copyTextToClipboard(url);
}

function createURL() {
    const nodeData = getOverrideKeyValuesObject();
    const urlParams = new URLSearchParams(nodeData).toString();
    const url = window.location.href
    const result = `${url}?${urlParams}`
    return result
}

function sendAlert(message) {
    var snackbarContainer = document.querySelector('#snackbar');
    var data = {
        message,
        timeout: 2000,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) return fallbackCopyTextToClipboard(text);
    navigator.clipboard.writeText(text).then(function () {
        sendAlert('share link was copied to clipboard.');
    }, function () {
        sendAlert('unable to copy share link to clipboard.');
    });
}


function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successfully' : 'unsuccessfully';
        sendAlert(`share link was ${msg} to clipboard.`);
    } catch (err) {
        sendAlert('Oops, unable to copy the share link', err);
    }

    document.body.removeChild(textArea);
}