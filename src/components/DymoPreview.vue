<script setup>
import { usePiniaStore } from "@/pinia/PiniaStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";
const PiniaStore = usePiniaStore();
const Dymo = usePrinterStore();
</script>

<template>
  <Dialog :dismissableMask="true" :showHeader="false" v-model:visible="Dymo.labelPreview" modal :closable="true"
    :closeOnEscape="true">
    <div style="margin: 20px; text-align: center; vertical-align: middle">
      <img style="padding: 20px;" :src="Dymo.labelImage" />
    </div>
    <div style="margin: 20px; text-align: center; vertical-align: middle">
      <Button label="Close" class="p-button-outlined p-button-plain" icon="pi pi-times"
        @click="Dymo.labelPreview = false" style="margin: 10px" />
    </div>
  </Dialog>
</template>

