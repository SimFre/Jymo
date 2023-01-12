<script setup>
import { usePiniaStore } from "@/pinia/PiniaStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";
const PiniaStore = usePiniaStore();
const Dymo = usePrinterStore();
</script>

<template>

  <DataTable v-if="PiniaStore.cmdb?.objectEntries" :value="PiniaStore.cmdb?.objectEntries" responsiveLayout="scroll"
    showGridlines stripedRows class="p-datatable-sm" dataKey="objectKey" removableSort
    v-model:selection="Dymo.multilabel" selectionMode="multiple" :metaKeySelection="false">
    <Column field="objectKey" header="Key" :sortable="true" />
    <Column field="label" header="Label" :sortable="true" />
    <Column field="serialNumber" header="S/N" :sortable="true" />
    <Column field="modelName" header="Model" :sortable="true" />
    <Column field="userFullname" header="User" :sortable="true" />
    <Column header="Action">
      <template #body="sp">
        <Button @click="Dymo.previewLabel(sp.data)" icon="pi pi-eye"
          class="p-button-sm p-button-rounded p-button-success p-button-text" />
        <Button @click="Dymo.printLabel(sp.data)" icon="pi pi-print" :loading="Dymo.loading['prn' + sp.data.id]"
          class="p-button-sm p-button-rounded p-button-success p-button-text" />
      </template>
    </Column>


  </DataTable>
</template>

