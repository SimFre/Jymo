<script setup>
import { ref } from "vue";
import { useConfigStore } from "@/pinia/ConfigStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";
const config = useConfigStore();
const printer = usePrinterStore();

const items = ref([
  {
    label: 'Select All',
    icon: 'pi pi-check-circle',
    command: () => {
      printer.multilabel = printer.multilabel.slice(0, 0);
      config.searchResult?.objectEntries.map((o, index) => {
        printer.multilabel.push(o);
      });
    }
  },
  {
    label: 'Select None',
    icon: 'pi pi-circle',
    command: () => {
      printer.multilabel = printer.multilabel.slice(0, 0);
    }
  },
]);
</script>

<template>
  <div class="row">
    <div class="card">
      <!-- <Dropdown v-model="printer.chosenPrinter" :options="printer.labelPrinters" placeholder="Printer" class="p-inputtext-sm"
        :loading="printer.loading.printers" /> -->
      <SplitButton :model="items"><Button @click="printer.printAll()" icon="pi pi-print" class="p-button-lg"
          :label="'Print ' + (printer.multilabel?.length ? printer.multilabel.length : 0) + ' labels'"
          :loading="printer.loading.printing"></Button>
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

