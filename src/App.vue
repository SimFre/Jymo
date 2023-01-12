<script setup>
import JiraSearchBox from "./components/JiraSearchBox.vue";
import JiraSearchResults from "./components/JiraSearchResults.vue";
import DymoPrinter from "./components/DymoPrinter.vue";
import DymoPreview from "./components/DymoPreview.vue";
</script>

<template>
  <div class="container">
    <div class="row">
      <JiraSearchBox />
    </div>
    <JiraSearchResults />
    <DymoPrinter />
  </div>
  <DymoPreview />
</template>
