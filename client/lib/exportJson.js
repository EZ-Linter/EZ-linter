/**
 * Generates and triggers download of a plain text file.
 * @param  {string} content File content.
 * @param  {string} filename Filename, including extension
 */
export function exportPlainTextFile(content, filename) {
  let blob = new Blob([content]);
  let url = window.URL.createObjectURL(blob);
  downloadFileURL(url, filename);
}

/**
 * Initiates download from javascript
 * @param  {string} url Url of file to be downloaded
 * @param  {string} filename Filename to save file as. Includes extension.
 */
function downloadFileURL(url, filename) {
  // create new link element that points to file url and programmatically click it
  var e = document.createEvent('MouseEvents');
  var linkEl = document.createElement('a');

  linkEl.download = filename;
  linkEl.href = url;
  e.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  linkEl.dispatchEvent(e);
}
