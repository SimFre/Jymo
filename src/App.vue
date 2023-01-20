<script setup>
import { ref } from "vue";
import { useConfigStore } from "@/pinia/ConfigStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";

import SearchBox from "./components/SearchBox.vue";
import SearchResults from "./components/SearchResults.vue";
import LabelPrinter from "./components/LabelPrinter.vue";
import LabelPreview from "./components/LabelPreview.vue";

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
  <div v-if="loaded" class="container">
    <div class="row">
      <SearchBox />
    </div>
    <SearchResults />
    <LabelPrinter />
    <LabelPreview />
  </div>
  <div v-else class="container">
    <div class="row">
      <i class="pi pi-spin pi-cog" style="font-size: 12rem"></i>
    </div>
  </div>

  <!-- <samp>{{ printer }}</samp>-->
  <!-- <samp>{{ config }}</samp> -->

</template>
