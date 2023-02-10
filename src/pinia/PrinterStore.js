
import { ref } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import * as fs from "@tauri-apps/api/fs";
import * as path from "@tauri-apps/api/path";

export const usePrinterStore = defineStore("PrinterStore", {
  state: () => {
    return {
      webServiceUrl: "",
      multilabel: ref([]),
      labelPrinters: [],
      labelImage: "",
      labelPreview: false,
      labelTemplate: "",
      chosenPrinter: "",
      loading: {
        store: false,
        printers: true,
        label: true,
        preview: false,
        printing: false
      }
    }
  },
  actions: {
    async loadLabel() {
      this.loading.label = true;
      const filename = "Default.dymo";
      const resourcePath = await path.resolveResource("resources/" + filename);
      console.log("Reading File:", resourcePath);

      let input = await fs.readTextFile(resourcePath);
      input = input.replaceAll(/<(Color) ([^\/>]*?) *\/?> *(<\/\1>)?/ig, "<$1 $2> </$1>");
      input = input.replace(/^\uFEFF/gm, "").replace(/^\u00BB\u00BF/gm, "");
      this.labelTemplate = input;
      this.loading.label = false;
    },

    async loadPrinters() {
      this.loading.printers = true;
      this.labelPrinters = [];
      const url = this.webServiceUrl + "/DYMO/DLS/Printing/GetPrinters";
      console.log("loadPrinters, URL:", url);
      try {
        const res = await fetch(url);
        const data = await res.text();
        const dp = new DOMParser();
        const xml = dp.parseFromString(data, "text/xml");
        const printerList = xml.getElementsByTagName("Name");
        for (const l of printerList) {
          this.labelPrinters.push(l.childNodes[0].nodeValue);
          this.chosenPrinter = l.childNodes[0].nodeValue;
        }
        return true;
      } catch (err) {
        this.error(err);
      }
      this.loading.printers = false;
    },

    async previewLabel(dataEntry) {
      this.loading.preview = true;
      let labelData = this.labelTemplate;
      labelData = labelData.replaceAll(/%OBJECTID%/ig, dataEntry.id);
      labelData = labelData.replaceAll(/%OBJECTKEY%/ig, dataEntry.objectKey);
      labelData = labelData.replaceAll(/%SERIALNUMBER%/ig, dataEntry.serialNumber ?? "");
      labelData = labelData.replaceAll(/%OBJECTURL%/ig, dataEntry._links.self ?? "");
      labelData = labelData.replaceAll(/%OBJECTLABEL%/ig, dataEntry.label ?? "");
      const url = this.webServiceUrl + "/DYMO/DLS/Printing/RenderLabel";
      console.log("URL:", url);
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "labelXml=" + encodeURIComponent(labelData),
        });
        const data = await res.json();
        this.labelPreview = true;
        this.labelImage = "data:image/png;base64," + data;
        this.loading.preview = false;
        return this.labelImage;
      } catch (err) {
        this.error(err);
      }
      this.loading.preview = false;
    },

    async printLabel(dataEntry) {
      this.loading['prn' + dataEntry.id] = true;
      let labelData = this.labelTemplate;
      labelData = labelData.replaceAll(/%OBJECTID%/ig, dataEntry.id);
      labelData = labelData.replaceAll(/%OBJECTKEY%/ig, dataEntry.objectKey);
      labelData = labelData.replaceAll(/%SERIALNUMBER%/ig, dataEntry.serialNumber ?? "");
      labelData = labelData.replaceAll(/%OBJECTURL%/ig, dataEntry._links.self ?? "");
      labelData = labelData.replaceAll(/%OBJECTLABEL%/ig, dataEntry.label ?? "");
      try {
        const url = this.webServiceUrl + "/DYMO/DLS/Printing/PrintLabel";
        console.log("URL:", url);
        try {
          let body = "printerName=" + encodeURIComponent(this.chosenPrinter);
          body += "&labelXml=" + encodeURIComponent(labelData);
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body
          });
          const data = await res.json();
          this.loading['prn' + dataEntry.id] = false;
          return true;
        } catch (err) {
          this.error(err);
        }
      } catch (err) {
        this.error(err);
      }
    },

    async printAll() {
      this.loading.printing = true;
      for (const o of this.multilabel) {
        console.log("Printing", o.objectKey);
        const r = await this.printLabel(o);
        // console.log("Reloading after", o.objectKey);
        // const l = await this.loadPrinters();
      }
      this.loading.printing = false;
    },

    async init() {
      await this.loadPrinters();
      await this.loadLabel();
      return true;
    },

    error(e) {
      console.log("PRNERR!", e);
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePrinterStore, import.meta.hot));
}