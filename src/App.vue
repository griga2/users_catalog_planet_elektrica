<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  width: 100vw; 
  height: 100vh;
  background-color: var(--color-background);
}

</style>
