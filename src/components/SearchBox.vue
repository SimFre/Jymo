<script setup>
import { ref } from "vue";
import { fetch } from "@tauri-apps/api/http";
import { useConfigStore } from "@/pinia/ConfigStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";

const config = useConfigStore();
const printer = usePrinterStore();
const searchKeyword = ref("");
const loading = ref(false);

const attributeMap = {
  3851: "userFullname", // Workstation, Monitor
  10858: "userFullname", // Mobile
  3849: "serialNumber", // Workstation
  10523: "serialNumber", // Monitor
  10857: "serialNumber", // Mobile
  1361: "modelName", // Workstation
  10402: "modelName", // Monitor
  10861: "modelName", // Mobile
};


async function searchCMDB() {
  loading.value = true;
  printer.multilabel = [];
  let kw = searchKeyword.value;
  kw = kw.trim();

  // Replace + with - if scanned from barcode
  kw = kw.replaceAll(/^AGC\+/ig, "AGC-");

  // Take QR-code contents and build up objectId
  const re = kw.match(/^(http|URL).+(´|=|\/|-)([1-9][0-9]+)$/i);
  console.log("RE:", re);

  // Take last 8 chars if scanned from barcode
  if (kw.length == 20) {
    kw = kw.substring(kw.length - 8)
  }
  else if (kw.length >= 5 && kw.length <= 7 && Number.isInteger(kw)) {
    kw = "AGC-" + kw;
  }
  else if (re !== null && re[3]) {
    kw = "AGC-" + re[3];
  }

  const brand = config.jiraBrand;
  let url = config.jiraAddress + "/iql/objects?iql=";
  url += `("${brand} User" like ${kw} or Key like ${kw} or Name like ${kw} or "${brand} Serial Number" LIKE ${kw} or "Serial number" LIKE ${kw})`;
  url += ` and objectType IN ("Workstation", "Sweden Workstation", "Sweden Workstation Archive", "Monitor", "Sweden Monitor", "Mobile Phone", "Sweden Mobile Phone", "Headset", "Sweden Headset")`;

  console.log("URL", url);
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + config.jiraToken,
      },
    });
    const searchResult = response.data;

    searchResult.objectEntries.map((o) => {
      o.attributes.map((attributeEntry) => {
        const id = attributeEntry.objectTypeAttributeId;
        const attrName = attributeMap[id];
        if (attrName !== undefined) {
          o[attrName] = attributeEntry.objectAttributeValues[0]?.displayValue ?? "n/a";
        }
      });
    });

    config.searchResult = searchResult;
    loading.value = false;
  } catch (err) {
    config.error(err);
    loading.value = false;
  }
}

</script>

<template>
  <form @submit.prevent="searchCMDB()" ref="searchForm">
    <div class="card">
      <div class="flex justify-content-center flex-wrap card-container yellow-container">
        <div class="flex align-items-center justify-content-center w-6 border-1 border-round surface-border">
          <div class="p-inputgroup">
            <InputText v-model.lazy="searchKeyword" placeholder="AGC-" @change="searchCMDB()" v-debounce="800"
              class="p-inputtext-lg" style="border: 0px" name="keyword" />
            <Button @click="searchKeyword = ''; $refs.searchForm.keyword.focus()" icon="pi pi-trash" :loading="loading"
              class="p-button-lg p-button-secondary p-button-text" />
            <Button @click="searchCMDB()" icon="pi pi-search" :loading="loading"
              class="p-button-lg p-button-success p-button-text" />
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="flex justify-content-start flex-wrap card-container ">
        <div class="flex align-items-center justify-content-center w-6">
        </div>
      </div>
    </div>
  </form>
</template>
