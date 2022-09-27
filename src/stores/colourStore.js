import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useColourStore = defineStore({
  id: "colourStore",

  state: () => ({
    colourSwatches: [],
  }),

  getters: {
    colours: (state) => state.colourSwatches,
  },

  actions: {
    addColour(colourHexToAdd) {
      if (!this.colourSwatches[colourHexToAdd]) {
        this.colourSwatches.push(colourHexToAdd);
      }
    },
    removeColour(colourHexToRemove) {
      if (this.colourSwatches[colourHexToRemove]) {
        const indexOfColour = this.colourSwatches.indexOf(colourHexToRemove);
        this.colourSwatches.splice(indexOfColour, 1);
      }
    },
  },
});
