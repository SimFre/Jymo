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

  // Take last 8 chars if scanned from barcode
  if (kw.length == 20) {
    kw = kw.substring(kw.length - 8)
  }

  // Take QR-code contents and build up objectId
  const re = kw.match(/^URL.+´(\d+)/);
  if (re !== null && re[1]) {
    kw = "AGC-" + re[1];
  }

  const brand = config.jiraBrand;
  let url = config.jiraAddress + "/iql/objects?iql=";
  url += `("${brand} User" LIKE ${kw} or Key=${kw} or Name like ${kw} or "${brand} Serial Number" LIKE ${kw} or "Serial number" LIKE ${kw})`;
  url += ` and objectType IN ("Workstation", "Sweden Workstation", "Monitor", "Sweden Monitor", "Mobile Phone", "Sweden Mobile Phone", "Headset", "Sweden Headset")`;

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
  <div class="card">
    <form @submit.prevent="searchCMDB()">
      <InputText v-model="searchKeyword" placeholder="AGC-" class="p-inputtext-lg" />
      <Button @click="searchCMDB()" icon="pi pi-search" :loading="loading" class="p-button-lg" />
    </form>
  </div>
</template>

<style scoped>
.card {
  text-align: center;
  margin-bottom: 15px;
}
</style>