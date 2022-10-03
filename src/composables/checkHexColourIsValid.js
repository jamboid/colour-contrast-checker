export default function checkHexColourIsValid(hexColour) {
  const hexRegex = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");

  if (hexRegex.test(hexColour)) {
    return true;
  } else {
    return false;
  }
}
