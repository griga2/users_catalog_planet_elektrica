<script setup>
import { defineProps } from 'vue';
const props = defineProps(['row', "active_row"])  
const emit = defineEmits(['click_row', 'click_arrow'])
import CatalogRow from '../components/ItemBlock.vue'
import { storeToRefs } from 'pinia';
import {useWorkerStore} from '../../../stores/index.js'
const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
} = storeToRefs(store)

const sity_options = [
    { 
        label: 'Новосибрск',
        value: 'nsk',
    }
]


// const click_edit_time = () => {
//     show_branch_info.value.push(row.id)
// }

// const finish_edit_time = () => {
//     show_branch_info.value = show_branch_info.value.filter(el => el == row.id);
// }

const hors_options = [
    { 
        label: '+6',
        value: 'nsk',
    }
]
</script>

<template>
    <section class="main" >
        <article style="width: 100%;" class="main_text">
            <span class="branch_name" @click="$emit('click_row', props.row)">{{ props.row.name }}</span>
        </article>
       
        <!-- <img :class="{rotate_arrow: props.row?.is_open}"
                    style="transition: 600ms; height: 16px;" 
                    src="../../../assets/arrow.svg" 
                    @click="() => {
                            console.log('awd')
                            $emit('click_arrow', props.row.id)}"> -->
        <section class="child_block" style="width: 100%; transition: 600ms;" >
                <article 
                    v-for="child in props.row.children" style="width: 100%;" 
                    :class="{active:props.active_row?.id == props.row?.id}">
                    <CatalogRow :row="child" style="width: 100%;" @click_row="(value) => {$emit('click_row', value)}">
                        
                    </CatalogRow>
                </article>
        </section>
    </section>
</template>

<style scoped>

.open{
    height: 250px;
    visibility: visible;
}

.info_column_block{
    margin: 10px;
}

.child_block{
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.close{
    height: 20px;
    visibility: hidden;
}

.header{
    font-size: 16px;
    color: black
}

.branch_name{
    color: black
}

span{
    color: #cbcbcb;
}

.infoblock{
    padding: 10px;
    display: flex;
}

article {
    font-size: 16px;
}

.info_block{
    display: flex;
    gap: 20px;
    flex-direction: column; 
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    align-items: start;
    justify-content: start;
    width: 200px;
}

.input_block{
    width: 200px;
    display: flex;
}

.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.close_main{
    height: 60px;
}

.open_main{
    height: 250px;
}

.rotate_arrow{
    transform: rotate(180deg);
    transition: 600ms;
}

* {
    font-family: circe-bold;
    font-size: 20px;
}

.main_text:hover{
    background-color: #cbcbcb;
    transition: all 0.3s;
    color: black;
}

.active{
    background-color: #cbcbcb;
}

.main_text{
    width: 100%;
    border-radius: 6px;
    padding: 4px;
    display: flex; 
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap:10px;
}

input{
    border: 0px;
}


</style>