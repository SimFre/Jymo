<script setup>
import { useConfigStore } from "@/pinia/ConfigStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";
const config = useConfigStore();
const printer = usePrinterStore();
</script>

<template>
  <Dialog :dismissableMask="true" :showHeader="false" v-model:visible="printer.labelPreview" modal :closable="true"
    :closeOnEscape="true">
    <div style="margin: 20px; text-align: center; vertical-align: middle">
      <img style="padding: 20px;" :src="printer.labelImage" />
    </div>
    <div style="margin: 20px; text-align: center; vertical-align: middle">
      <Button label="Close" class="p-button-outlined p-button-plain" icon="pi pi-times"
        @click="printer.labelPreview = false" style="margin: 10px" />
    </div>
  </Dialog>
</template>

