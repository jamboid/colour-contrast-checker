/**
 * Searches an array of objects, looking to match the value of an object property, and returning
 * the first object with a matching property value
 *
 * @export
 * @param {*} nameKey - the unique value you are looking for
 * @param {*} property - the property the nameKey is set to
 * @param {*} arrayToSearch - the array, obvs
 * @returns
 */
export default function searchArrayByItemPropertyValue(
  nameKey,
  property,
  arrayToSearch
) {
  if (arrayToSearch) {
    for (var i = 0; i < arrayToSearch.length; i++) {
      if (arrayToSearch[i] !== null && arrayToSearch[i][property] === nameKey) {
        return arrayToSearch[i];
      }
    }
  }

  return false;
}
