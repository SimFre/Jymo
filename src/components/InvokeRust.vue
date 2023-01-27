<script setup>
import { ref } from "vue";
import { fetch } from "@tauri-apps/api/http";
import { useConfigStore } from "@/pinia/ConfigStore.js";
import { usePrinterStore } from "@/pinia/PrinterStore.js";
import { invoke } from '@tauri-apps/api'

function callRust() {
  // now we can call our Command!
  // Right-click the application background and open the developer tools.
  // You will see "Hello, World!" printed in the console!
  //invoke('greet', { name: 'World' })
  //  // `invoke` returns a Promise
  //  .then((response) => console.log(response))
  return;
}

</script>

<template>
  <div class="card">
    <Button @click="callRust()" icon="pi pi-prime" class="p-button-lg" label="Rust" />
  </div>
</template>

<style scoped>
.card {
  text-align: center;
  margin-bottom: 15px;
}
</style>