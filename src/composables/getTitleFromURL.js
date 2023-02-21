export default function getColoursFromURL() {
  const currURL = new URL(document.URL);
  const paramsInURL = new URLSearchParams(currURL.search);
  const titleInURL = paramsInURL.get("title");

  if (titleInURL) {
    return titleInURL;
  } else {
    return false;
  }
}
