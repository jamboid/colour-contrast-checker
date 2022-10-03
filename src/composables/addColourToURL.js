import getColoursFromURL from "@/composables/getColoursFromURL";

export default function addColourToURL(hexColour) {
  const currentColours = getColoursFromURL();

  const newGroup = currentColours + "," + hexColour.replace("#", "");

  window.console.log(newGroup);

  const currURL = new URL(document.URL);
  const paramsInURL = new URLSearchParams(currURL.search);
  paramsInURL.set("colours", newGroup);
  window.location.search = paramsInURL.toString();
}
