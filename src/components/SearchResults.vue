<script setup>
import { useConfigStore } from "@/pinia/ConfigStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";
const config = useConfigStore();
const printer = usePrinterStore();
</script>

<template>
  <DataTable v-if="config.searchResult?.objectEntries" :value="config.searchResult?.objectEntries"
    responsiveLayout="scroll" showGridlines stripedRows class="p-datatable-sm" dataKey="objectKey" removableSort
    v-model:selection="printer.multilabel" selectionMode="multiple" :metaKeySelection="false">
    <Column field="objectKey" header="Key" :sortable="true">
      <template #body="sp">
        <a :href="sp.data._links.self" target="_blank">{{ sp.data.objectKey }}</a>
      </template>
    </Column>
    <Column field="label" header="Label" :sortable="true" />
    <Column field="serialNumber" header="S/N" :sortable="true" />
    <Column field="modelName" header="Model" :sortable="true" />
    <Column field="userFullname" header="User" :sortable="true" />
    <Column header="Action">
      <template #body="sp">
        <Button @click="printer.previewLabel(sp.data)" icon="pi pi-eye"
          class="p-button-sm p-button-rounded p-button-success p-button-text" />
        <Button @click="printer.printLabel(sp.data)" icon="pi pi-print" :loading="printer.loading['prn' + sp.data.id]"
          class="p-button-sm p-button-rounded p-button-success p-button-text" />
      </template>
    </Column>


  </DataTable>
</template>

