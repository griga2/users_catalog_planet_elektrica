<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView/>
  </main>
    
</template>

<style scoped>

@font-face {
    font-family: 'circe-bold';
    src: url('./assets/circe-bold.ttf');
}


@font-face {
    font-family: 'circe-extrabold';
    src: url('./assets/circe-extrabold.ttf');
}

@font-face {
    font-family: 'circe';
    src: url('./assets/circe.ttf');
}

@font-face {
    font-family: 'circe_light';
    src: url('./assets/circe_light.ttf');
}

@font-face {
    font-family: 'circe_thin';
    src: url('./assets/circe_thin.ttf');
}

main{
  width: 100vw; 
  height: 100vh;
  background-color: #d3d3d3;
}



</style>
