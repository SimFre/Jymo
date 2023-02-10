
import { defineStore, acceptHMRUpdate } from "pinia";
import * as path from "@tauri-apps/api/path";
import * as fs from "@tauri-apps/api/fs";

export const useConfigStore = defineStore("ConfigStore", {
  state: () => {
    return {
      loading: {},
      searchResult: [],
      exceptionObject: {},
      exceptionDisplay: false,
      dymoAddress: null,
      jiraAddress: null,
      jiraToken: null,
      jiraBrand: null,
      searchTimeout: null,
    }
  },
  actions: {
    async init() {
      try {
        const configFilename = import.meta.env.VITE_CONFIGFILE;
        const configFilepath = await path.resolveResource("resources/" + configFilename);
        const configDocument = await fs.readTextFile(configFilepath);
        const config = await JSON.parse(configDocument);
        console.log("Config", config);
        //const allowed = ["dymoAddress", "jiraAddress", "jiraToken", "jiraBrand"];
        //for (let [key, value] of Object.entries(config))
        this.dymoAddress = await config.dymoAddress;
        this.jiraAddress = await config.jiraAddress;
        this.jiraToken = await config.jiraToken;
        this.jiraBrand = await config.jiraBrand;
        this.searchTimeout = await config.searchTimeout ?? 5000;
        // if (allowed.includes(key)) {
        //     Does not work:
        //     this[key].value = value;
        // }
        return true;
      } catch (err) {
        console.log("Init Error", err);
        return false;
      }
    },

    appendSearch(entry) {
      this.searchResult.push(entry);
    },

    clearSearch() {
      this.searchResult = [];
    },

    error(e) {
      this.exceptionObject = e;
      this.exceptionDisplay = true;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot));
}