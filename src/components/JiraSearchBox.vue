<script setup>
import { ref } from "vue";
import { fetch } from "@tauri-apps/api/http";
import * as http from "@tauri-apps/api/http";
import * as fs from "@tauri-apps/api/fs";
import * as path from "@tauri-apps/api/path";
import { usePiniaStore } from "@/pinia/PiniaStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";
const PiniaStore = usePiniaStore();
const Dymo = usePrinterStore();

const jiraBase = import.meta.env.VITE_JIRAURL;
const authToken = import.meta.env.VITE_JIRATOKEN;
const brand = import.meta.env.VITE_JIRABRAND;
const baseURL = jiraBase + "/rest/insight/latest";
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
  Dymo.multilabel = [];
  searchKeyword.value = searchKeyword.value.trim();
  searchKeyword.value = searchKeyword.value.replaceAll(/^AGC\+/ig, "AGC-");
  const kw = searchKeyword.value;
  let url = baseURL + "/iql/objects?iql=";
  url += `("${brand} User" LIKE ${kw} or Key=${kw} or "${brand} Serial Number" LIKE ${kw} or "Serial number" LIKE ${kw})`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + authToken,
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

    PiniaStore.cmdb = searchResult;
    loading.value = false;
  } catch (err) {
    PiniaStore.error(err);
    loading.value = false;
  }
}

</script>

<template>
  <div class="card">
    <form @submit.prevent="searchCMDB()">
      <InputText v-model="searchKeyword" placeholder="AGC-" class="p-inputtext" />
      <Button @click="searchCMDB()" icon="pi pi-search" :loading="loading" class="p-button-lg" />
    </form>
  </div>
</template>
