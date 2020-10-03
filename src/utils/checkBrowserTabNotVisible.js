export function checkBrowserTabNotVisible() {
    let hidden;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
    }
    return document?.[hidden];
}
