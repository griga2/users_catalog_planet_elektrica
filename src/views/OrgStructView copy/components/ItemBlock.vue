<script setup>
import { defineProps, onMounted } from 'vue';
const props = defineProps(['role',])  
const emit = defineEmits(['click_row', 'click_arrow'])
import CatalogRow from '../components/ItemBlock.vue'
import { storeToRefs } from 'pinia';
import {useWorkerStore} from '../../../stores/index.js'
const store = useWorkerStore();
const {
    users,
    show_branch_info,
    current_role,
} = storeToRefs(store)

const sity_options = [
    { 
        label: 'Новосибрск',
        value: 'nsk',
    }
]


const hors_options = [
    { 
        label: '+6',
        value: 'nsk',
    }
]



</script>

<template>
    <section class="main_role_item" @click="current_role = role" :class="{active: current_role.id == role.id}">
            <span>{{ role.index }}</span><span class="role_name">{{ role.name }}</span>
    </section>
</template>

<style scoped>

.main_role_item{
    display: flex;
    
}

* {
    font-family: circe-bold;
    font-size: 16px;
}

.main_text:hover{
    background-color: #cbcbcb;
    transition: all 0.3s;
    color: black;
}

.active{
    background-color: #cbcbcb;
}

.main_role_item :hover{
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



</style>