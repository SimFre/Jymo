<script setup>
import { ref } from "vue";
import { usePiniaStore } from "@/pinia/PiniaStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";
const PiniaStore = usePiniaStore();
const Dymo = usePrinterStore();
Dymo.init();

const items = ref([
  {
    label: 'Select All',
    icon: 'pi pi-check-circle',
    command: () => {
      Dymo.multilabel = Dymo.multilabel.slice(0, 0);
      PiniaStore.cmdb?.objectEntries.map((o, index) => {
        Dymo.multilabel.push(o);
      });
    }
  },
  {
    label: 'Select None',
    icon: 'pi pi-circle',
    command: () => {
      Dymo.multilabel = Dymo.multilabel.slice(0, 0);
    }
  },
]);
</script>

<template>
  <div class="row">
    <div class="card">
      <!-- <Dropdown v-model="Dymo.chosenPrinter" :options="Dymo.labelPrinters" placeholder="Printer" class="p-inputtext-sm"
        :loading="Dymo.loading.printers" /> -->
      <SplitButton :model="items"><Button @click="Dymo.printAll()" icon="pi pi-print" class="p-button-lg"
          :label="'Print ' + (Dymo.multilabel?.length ? Dymo.multilabel.length : 0) + ' labels'"
          :loading="Dymo.loading.printing"></Button>
      </SplitButton>
    </div>
  </div>
</template>

<style scoped>
.card {
  text-align: center;
  margin-top: 15px;
}
</style>

