
import { defineStore } from "pinia";

export const usePiniaStore = defineStore("PiniaStore", {
    state: () => {
        return {
            loading: {},
            cmdb: [],
            exceptionObject: {},
            exceptionDisplay: false,
        }
    },
    actions: {
        error(e) {
            this.exceptionObject = e;
            this.exceptionDisplay = true;
        },
    },
});
