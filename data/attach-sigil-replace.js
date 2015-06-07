// Attaches a script to the Duolingo response text entry box,
// performing automatic replacement for Esperanto using the X-system.
//
// The accepted digraphs (capital or lowercase) are:
//  cx, sx, jx, gx, hx, and ux.
//
// This allows for question entry without using the mouse or configuring
// the system keyboard specially for Esperanto.

function getTextWidget() {
    var widget = document.getElementById('text-input');
    if (widget)
        return widget;

    widget = document.getElementById('word-input');
    return widget; // May be null.
}

function maybeReplaceLastTwoChars(event) {
    var textarea = getTextWidget();
    var chars = textarea.value.slice(-2);

    // Early exit: only check for a replacement if the last character is an 'x'.
    if (chars.charAt(1).toLowerCase() !== 'x') {
        return;
    }

    var char = chars.charAt(0);

    var searchAlphabet  = 'cCsSjJgGhHuU';
    var replaceAlphabet = 'ĉĈŝŜĵĴĝĜĥĤŭŬ';

    var index = searchAlphabet.indexOf(char);
    if (index === -1) {
        return;
    }

    // Replace the characters.
    textarea.value = textarea.value.slice(0, -2) + replaceAlphabet[index];
}

// Duolingo keeps loading and unloading the text-input widget.
// Until we know how to run only on one of those events,
// we can just poll continuously.
function tryAttachEventListener() {
    var textarea = getTextWidget();
    if (textarea) {
        textarea.addEventListener('keyup', maybeReplaceLastTwoChars);
        textarea.addEventListener('keydown', maybeReplaceLastTwoChars);
    }
}

setInterval(tryAttachEventListener, 500);
