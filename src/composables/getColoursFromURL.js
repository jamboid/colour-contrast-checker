export default function getColoursFromURL() {
  const currURL = new URL(document.URL);
  const paramsInURL = new URLSearchParams(currURL.search);
  const coloursInURL = paramsInURL.get("colours");

  if (coloursInURL) {
    return coloursInURL;
  } else {
    return false;
  }
}
