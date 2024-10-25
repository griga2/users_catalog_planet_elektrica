<script setup>
import { useWorkerStore } from '../store/index'
const store = useWorkerStore();
</script>


<template>
    <section class="search_bar">
       <img src="../../../assets/lupa.svg" placeholder="Поиск" :height="25"> <input 
       @change="(event) => {  
            console.log('search')
            store.SearchUser(event.target.value);
       }" 
       type="text"/>
    </section>
</template>

<style scoped>

section{
    width: calc(100% - 20px);
    height: 50px;
    background-color: white;
    border-radius: 6px;
    width: 100%;
}

.search_bar{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
}

input{
    border: 0px;
    width: 100%;
    font-size: 20px;
    padding-left: 10px;
}

input:hover{
    outline: none;
    inline-size: none;
}

input:active{
    outline: none;
    inline-size: none;
}

</style>