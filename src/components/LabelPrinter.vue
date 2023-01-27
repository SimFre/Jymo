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
  <div class="card">
    <div class="flex justify-content-center flex-wrap card-container yellow-container">
      <div class="flex align-items-center justify-content-center w-6 m-3">
        <!-- <Dropdown v-model="printer.chosenPrinter" :options="printer.labelPrinters" placeholder="Printer" class="p-inputtext-sm"
              :loading="printer.loading.printers" /> -->
        <SplitButton :model="items" class="p-button-secondary"><Button @click="printer.printAll()" icon="pi pi-print"
            class="p-button-lg "
            :label="'Print ' + (printer.multilabel?.length ? printer.multilabel.length : 0) + ' labels'"
            :loading="printer.loading.printing"></Button>
        </SplitButton>
      </div>
    </div>
  </div>
</template>
