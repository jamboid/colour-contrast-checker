import { defineStore } from "pinia";
import checkHexColourIsValid from "@/composables/checkHexColourIsValid";
import getColoursFromURL from "@/composables/getColoursFromURL";
import contrastRatio from "@/composables/calculateColourContrast";

export const useColourStore = defineStore({
  id: "colourStore",

  state: () => ({
    colourSwatches: [],
  }),

  getters: {
    colours: (state) => state.colourSwatches,
    uniqueColourCombinations: (state) => {
      const uniqueCombinations = [];
      const colours = [...state.colourSwatches].sort();
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

      return uniqueCombinations.filter(((a = {}), (b) => !(a[b] = b in a)));
    },
  },

  actions: {
    loadColoursFromQueryString() {
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
            this.colourSwatches.push(formattedHex);
          } else {
            window.console.log("invalid colour: ", formattedHex);
          }
        });
      }
    },
    addColour(colourHexToAdd) {
      if (!this.colourSwatches[colourHexToAdd]) {
        this.colourSwatches.push(colourHexToAdd);
        this.updateURLData();
      }
    },
    removeColour(colourHexToRemove) {
      const colourArray = this.colourSwatches;

      if (colourArray.indexOf(colourHexToRemove) > -1) {
        const indexOfColour = colourArray.indexOf(colourHexToRemove);
        colourArray.splice(indexOfColour, 1);
        this.colourSwatches = colourArray;

        this.updateURLData();
      }
    },
    updateURLData() {
      const colourArray = this.colourSwatches;
      let colourStringForURL = "";

      colourArray.forEach((element) => {
        const formattedColour = element.replace("#", "");

        colourStringForURL = colourStringForURL + "-" + formattedColour;
      });

      if (colourStringForURL.charAt(0) === "-") {
        colourStringForURL = colourStringForURL.slice(1);
      }

      window.console.log(colourStringForURL);

      const currURL = new URL(document.URL);
      const paramsInURL = new URLSearchParams(currURL.search);
      paramsInURL.set("colours", colourStringForURL);
      window.location.search = paramsInURL.toString();
    },
  },
});
