<script setup>
const version = __APP_VERSION__;
const name = __APP_NAME__;

</script>

<template>
  <div class="card">
    <div class="flex flex-row-reverse flex-wrap card-container yellow-container">
      <div class="flex align-items-center justify-content-center text-gray-400 text-base font-italic">
        <p>{{ name }} v{{ version }}</p>
      </div>
    </div>
  </div>
</template>
