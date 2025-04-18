<script setup>
import Breadcrumbs from './components/Breadcrumbs.vue';


</script>

<template>
    <header class="header">
        <Breadcrumbs></Breadcrumbs>
    </header>
    <main class="main">
        <RouterView/>
    </main>
</template>

<style scoped>

.main{
    width: 100%; 
    height: 93%;
    background-color: #ebebeb;
}

.header {
    height: 7%;
    background-color: #ebebeb;
    padding: 20px 20px 0px 20px;
    margin: 0px;
}

</style>