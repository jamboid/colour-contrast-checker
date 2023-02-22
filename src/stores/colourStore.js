import { ref, computed } from "vue";
import { defineStore } from "pinia";
import checkHexColourIsValid from "@/composables/checkHexColourIsValid";
import getColoursFromURL from "@/composables/getColoursFromURL";
import getTitleFromURL from "@/composables/getTitleFromURL";
import contrastRatio from "@/composables/calculateColourContrast";

export const useColourStore = defineStore("colourStore", () => {
  // List of Colour Swatches
  const colourSwatches = ref([]);

  const colours = computed({
    get() {
      return colourSwatches.value;
    },
    set(value) {
      colourSwatches.value = value;
    },
  });

  // Palette Title
  const paletteTitle = ref("");

  const listTitle = computed({
    get() {
      return paletteTitle.value;
    },
    set(value) {
      paletteTitle.value = value;
    },
  });

  const savedTitle = ref("");

  const isTitleUpdated = computed(() => {
    if (savedTitle.value === paletteTitle.value) {
      return true;
    }

    return false;
  });

  const uniqueColourCombinations = computed(() => {
    let uniqueCombinations = [];
    const colours = [...colourSwatches.value].sort();
    let a;

    colours.forEach((firstColour) => {
      colours.forEach((secondColour) => {
        if (firstColour !== secondColour) {
          const colourPair = [];
          colourPair.push(firstColour);
          colourPair.push(secondColour);
          colourPair.sort();

          colourPair.push(
            Math.round(contrastRatio(firstColour, secondColour) * 100) / 100
          );

          uniqueCombinations.push(colourPair);
        }
      });
    });

    uniqueCombinations = uniqueCombinations.filter(
      ((a = {}), (b) => !(a[b] = b in a))
    );

    return uniqueCombinations;
  });

  const passColourCombinations = computed(() => {
    const combos = [];
    uniqueColourCombinations.value.forEach((item) => {
      if (item[2] >= 4.5) {
        combos.push(item);
      }
    });

    return combos.sort(compare);
  });

  const largePassColourCombinations = computed(() => {
    const combos = [];
    uniqueColourCombinations.value.forEach((item) => {
      if (item[2] >= 3 && item[2] < 4.5) {
        combos.push(item);
      }
    });

    return combos.sort(compare);
  });

  const failColourCombinations = computed(() => {
    const combos = [];
    uniqueColourCombinations.value.forEach((item) => {
      if (item[2] < 3) {
        combos.push(item);
      }
    });

    return combos.sort(compare);
  });

  // Functions (Actions)

  function loadPaletteFromQueryString() {
    this.colourSwatches = [];

    const coloursInURL = getColoursFromURL();

    if (coloursInURL) {
      // Separate values by comma
      const coloursToAdd = coloursInURL.split("-");
      // Format each value to a hex colour, check that it matches hex regex
      // and push to state
      coloursToAdd.forEach((element) => {
        const formattedHex = "#" + element;

        if (checkHexColourIsValid(formattedHex)) {
          colourSwatches.value.push(formattedHex);
        }
      });
    }

    paletteTitle.value = "";
    const titleInURL = getTitleFromURL();

    if (titleInURL) {
      savedTitle.value = titleInURL;
      paletteTitle.value = titleInURL;
    }
  }

  function addColour(colourHexToAdd) {
    const formattedHex = "#" + colourHexToAdd;
    if (!colourSwatches.value[formattedHex]) {
      colourSwatches.value.push(formattedHex);
      this.updateURLData();
    }
  }

  function removeColour(colourHexToRemove) {
    const colourArray = colourSwatches;

    if (colourArray.value.indexOf(colourHexToRemove) > -1) {
      const indexOfColour = colourArray.value.indexOf(colourHexToRemove);
      colourArray.value.splice(indexOfColour, 1);
      this.colourSwatches = colourArray;

      this.updateURLData();
    }
  }

  function updatePaletteTitle() {
    this.savedTitle = paletteTitle.value;
    this.updateURLData();
  }

  function formatPaletteQueryString() {
    const colourArray = colourSwatches;
    let colourStringForURL = "";

    colourArray.value.forEach((element) => {
      const formattedColour = element.replace("#", "");

      colourStringForURL = colourStringForURL + "-" + formattedColour;
    });

    if (colourStringForURL.charAt(0) === "-") {
      colourStringForURL = colourStringForURL.slice(1);
    }

    return colourStringForURL;
  }

  function updateURLData() {
    const coloursForURL = formatPaletteQueryString();
    const paletteTitle = listTitle.value;
    const currState = history.state;

    const url = new URL(window.location);
    url.searchParams.set("colours", coloursForURL);
    url.searchParams.set("title", paletteTitle);
    window.history.pushState(currState, "", url);
  }

  function clearPalette() {
    this.colourSwatches = [];
    this.listTitle = "";
    this.updateURLData();
  }

  function compare(a, b) {
    if (a[2] > b[2]) {
      return -1;
    }
    if (a[2] < b[2]) {
      return 1;
    }
    return 0;
  }

  // Store API
  return {
    colourSwatches,
    colours,
    listTitle,
    paletteTitle,
    uniqueColourCombinations,
    passColourCombinations,
    largePassColourCombinations,
    failColourCombinations,
    loadPaletteFromQueryString,
    addColour,
    removeColour,
    updateURLData,
    clearPalette,
    updatePaletteTitle,
    isTitleUpdated,
    savedTitle,
  };
});
