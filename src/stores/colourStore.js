import { ref, computed } from "vue";
import { defineStore } from "pinia";
import checkHexColourIsValid from "@/composables/checkHexColourIsValid";
import getColoursFromURL from "@/composables/getColoursFromURL";
import getTitleFromURL from "@/composables/getTitleFromURL";
import contrastRatio from "@/composables/calculateColourContrast";

export const useColourStore = defineStore("colourStore", () => {
  const colourSwatches = ref([]);

  // Getters/Setters (Computed)
  const colours = computed({
    get() {
      return colourSwatches.value;
    },
    set(value) {
      colourSwatches.value = value;
    },
  });

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
      window.console.log(firstColour);
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

    window.console.log(uniqueCombinations);

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
        } else {
          window.console.log("invalid colour: ", formattedHex);
        }
      });
    }

    paletteTitle.value = "";
    const titleInURL = getTitleFromURL();

    if (titleInURL) {
      window.console.log(titleInURL);
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

    window.console.log(paletteTitle);

    const currURL = new URL(document.URL);
    const paramsInURL = new URLSearchParams(currURL.search);
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
    loadColoursFromQueryString: loadPaletteFromQueryString,
    addColour,
    removeColour,
    updateURLData,
    clearPalette,
    updatePaletteTitle,
    isTitleUpdated,
    savedTitle,
  };
});

// export const useColourStore = defineStore({
//   id: "colourStore",

//   state: () => ({
//     colourSwatches: [],
//   }),

//   getters: {
//     colours: (state) => state.colourSwatches,
//     uniqueColourCombinations: (state) => {
//       const uniqueCombinations = [];
//       const colours = [...state.colourSwatches].sort();
//       let a;

//       colours.forEach((firstColour) => {
//         colours.forEach((secondColour) => {
//           if (firstColour !== secondColour) {
//             const colourPair = [];
//             colourPair.push(firstColour);
//             colourPair.push(secondColour);
//             colourPair.sort();

//             colourPair.push(
//               Math.round(contrastRatio(firstColour, secondColour) * 100) / 100
//             );

//             uniqueCombinations.push(colourPair);
//           }
//         });
//       });

//       return uniqueCombinations.filter(((a = {}), (b) => !(a[b] = b in a)));
//     },
//     passColourCombinations() {
//       const combos = [];
//       this.uniqueColourCombinations.forEach((item) => {
//         if (item[2] > 4.5) {
//           combos.push(item);
//         }
//       });

//       return combos;
//     },
//     largePassColourCombinations() {
//       const combos = [];
//       this.uniqueColourCombinations.forEach((item) => {
//         if (item[2] >= 3 && item[2] < 4.5) {
//           combos.push(item);
//         }
//       });

//       return combos;
//     },
//     failColourCombinations() {
//       const combos = [];
//       this.uniqueColourCombinations.forEach((item) => {
//         if (item[2] < 3) {
//           combos.push(item);
//         }
//       });

//       return combos;
//     },
//   },

//   actions: {
//     loadColoursFromQueryString() {
//       this.colourSwatches = [];

//       const coloursInURL = getColoursFromURL();

//       if (coloursInURL) {
//         // Separate values by comma
//         const coloursToAdd = coloursInURL.split("-");
//         // Format each value to a hex colour, check that it matches hex regex
//         // and push to state
//         coloursToAdd.forEach((element) => {
//           const formattedHex = "#" + element;

//           if (checkHexColourIsValid(formattedHex)) {
//             this.colourSwatches.push(formattedHex);
//           } else {
//             window.console.log("invalid colour: ", formattedHex);
//           }
//         });
//       }
//     },
//     addColour(colourHexToAdd) {
//       if (!this.colourSwatches[colourHexToAdd]) {
//         this.colourSwatches.push(colourHexToAdd);
//         this.updateURLData();
//       }
//     },
//     removeColour(colourHexToRemove) {
//       const colourArray = this.colourSwatches;

//       if (colourArray.indexOf(colourHexToRemove) > -1) {
//         const indexOfColour = colourArray.indexOf(colourHexToRemove);
//         colourArray.splice(indexOfColour, 1);
//         this.colourSwatches = colourArray;

//         this.updateURLData();
//       }
//     },
//     updateURLData() {
//       const colourArray = this.colourSwatches;
//       let colourStringForURL = "";

//       colourArray.forEach((element) => {
//         const formattedColour = element.replace("#", "");

//         colourStringForURL = colourStringForURL + "-" + formattedColour;
//       });

//       if (colourStringForURL.charAt(0) === "-") {
//         colourStringForURL = colourStringForURL.slice(1);
//       }

//       window.console.log(colourStringForURL);

//       const currURL = new URL(document.URL);
//       const paramsInURL = new URLSearchParams(currURL.search);
//       paramsInURL.set("colours", colourStringForURL);
//       window.location.search = paramsInURL.toString();
//     },
//   },
// });
