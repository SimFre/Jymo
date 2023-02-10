<script setup>
import { ref } from "vue";
import { useConfigStore } from "@/pinia/ConfigStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";

import SearchBox from "./components/SearchBox.vue";
import SearchResults from "./components/SearchResults.vue";
import LabelPrinter from "./components/LabelPrinter.vue";
import LabelPreview from "./components/LabelPreview.vue";
import Version from "./components/Version.vue";

const config = useConfigStore();
const printer = usePrinterStore();

const loaded = ref(0);
config.init().then((p1) => {
  console.log("Loaded Config:", p1);
  printer.webServiceUrl = config.dymoAddress;
  printer.init().then((p2) => {
    console.log("Loaded Printer:", p2);
    loaded.value = p2;
  });
});
</script>

<template>
  <div class="card">
    <div v-if="loaded" class="card-container">
      <div class="block p-2 border-round mb-1 align-items-center justify-content-center">
        <SearchBox />
      </div>

      <div class="block p-1 border-round mb-1 align-items-center justify-content-center">
        <SearchResults />
      </div>
      <div class="block p-1 border-round mb-1 align-items-center justify-content-center">
        <LabelPrinter />
      </div>
      <LabelPreview />
    </div>
    <div v-else class="card-container">
      <div class="block m-5 p-5 align-items-center text-center">
        <ProgressSpinner />
      </div>
    </div>
  </div>
  <Version></Version>
</template>
