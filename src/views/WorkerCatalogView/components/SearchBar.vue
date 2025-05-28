<script setup>
import { onMounted, ref } from 'vue';
import { useWorkerStore } from '../../../stores/index'
const store = useWorkerStore();

const date = ref();
const open = ref(false);
const inputText = ref('')

const serch_focus = ref(null)

const clickLupa = () => {
    console.log('click lupa', serch_focus.value)
    serch_focus.value.focus();
}

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    date.value = [startDate, endDate];
})

const input = (event) => {  
            console.log('search')
            store.SearchUser(event.target.value, !open.value, JSON.stringify(date.value));
       }

</script>


<template>
    <section class="search_bar">
       <img  src="../../../assets/lupa.svg" 
       @click="clickLupa()"
       placeholder="Поиск" :height="25"> 
       <input ref="serch_focus"
       @change="(event) => input(event)" 
       v-model="inputText"
       type="text"/>
       <VueDatePicker v-if="open" v-model="date" range 
       :enable-time-picker="false"
       :format="'dd.MM.yyyy'"
       style="width: 340px; margin-right: 10px;" 
       @update:model-value="() => {
        console.log('chenge');
        input({target:{value:inputText}});
       }"/>
       <img src="../../../assets/calender.svg" 
       @click="open = !open"
       placeholder="Выбор даты" :height="25"> 
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
    margin: 5px;
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