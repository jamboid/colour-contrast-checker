export default function getFocusColourFromURL() {
  const currURL = new URL(document.URL);
  const paramsInURL = new URLSearchParams(currURL.search);
  const focusColourInURL = paramsInURL.get("focus");

  if (focusColourInURL) {
    return "#" + focusColourInURL;
  } else {
    return false;
  }
}
