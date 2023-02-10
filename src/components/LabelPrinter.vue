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
      config.searchResult.map((o, index) => {
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


const configSubscription = config.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    // this will trigger if the action succeeds and after it has fully run.
    // it waits for any returned promised
    after((result) => {
      if (name == "appendSearch" || name == "clearSearch") {
        //if (config.searchResult.length == 0) {
        //  printer.multilabel = printer.multilabel.slice(0, 0);
        //}
        //else if (config.searchResult.length == 1) {
        //  printer.multilabel[0] = config.searchResult[0];
        //}
      }
    })
  }
);


// for (let [k, v] of Object.entries(printer.multilabel)) {
//   console.log("Delete K:", k, "V:", v);
//   delete printer.multilabel[k];
// }
// printer.multilabel = ref([]);
// const selected = (printer.multilabel?.length ? printer.multilabel.length : 0);
// const found = (searchResult?.objectEntries?.length ? searchResult.objectEntries.length : 0);
// console.log("Selected:", typeof selected, selected);
// console.log("Found:", typeof found, found);
// console.log("Typ1:", typeof printer.multilabel);

// Select the entry if there's only one
// if (searchResult?.objectEntries.length === 1) {
//   printer.multilabel[0] = searchResult?.objectEntries[0];
// }

</script>

<template>
  <div class="card">
    <div class="flex justify-content-center flex-wrap card-container yellow-container">
      <div class="flex align-items-center justify-content-center w-6 m-3">
        <!-- <Dropdown v-model="printer.chosenPrinter" :options="printer.labelPrinters" placeholder="Printer" class="p-inputtext-sm"
            :loading="printer.loading.printers" /> -->
        <SplitButton :model="items" class="p-button-secondary">
          <Button @click="printer.printAll()" icon="pi pi-print" class="p-button-lg "
            :label="'Print ' + (printer.multilabel?.length ? printer.multilabel.length : 0) + ' labels'"
            :loading="printer.loading.printing"></Button>
        </SplitButton>
      </div>
    </div>
  </div>

  <!-- <samp>
    <samp style="max-height: 100px; overflow: scroll; border: solid 2px blue;" v-for="(o, i) of printer.multilabel"
      :key="i">IX:{{ i }},
      {{ o }}</samp>
  </samp>

  <samp>
    {{ config.searchResult }}
  </samp> -->

</template>
