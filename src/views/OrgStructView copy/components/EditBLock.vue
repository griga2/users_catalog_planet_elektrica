<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps(['row', "active_row"])  
const emit = defineEmits(['click_row', 'click_arrow'])
import CatalogRow from '../components/ItemBlock.vue'
import { storeToRefs } from 'pinia';
import {useWorkerStore} from '../../../stores/index.js'
import WorkTimeComponent from '@/components/WorkTimeComponent.vue';
const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
    current_role
} = storeToRefs(store)

const timeAutID = ref('')

const  updateBranch = async () => {
    clearTimeout(timeAutID.value);
    timeAutID.value = setTimeout(async() => {
        console.log('update branch')
        await store.updateBranch();
    }, 1000);
    
}
</script>

<template>
    <main class="main_edit_role">
        <section style="display: flex; flex-direction: row;" v-if="current_role != null">
            {{ props.row.name }}
            <section style="width: 100%;">
                    <article class="input_block" style="align-items: center; gap: 10px; width: 400px;">
                        <n-checkbox 
                            size="large"
                            @input="current_role.can_edit"  
                            placeholder=" "/>    
                        <span>Можер редактировать справочник</span>
                       
                    </article>
            </section>
        </section>
    </main>

</template>

<style scoped>

.input_block{
    width: 250px;
    display: flex;
    flex-direction: row;
    align-items: c;
    justify-content: start;
}

.main_edit_role{
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 20px;
    margin-left: 10px;
}


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
    flex-direction: row; 
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    align-items: start;
    justify-content: start;
    width: 200px;
}


.info_block span{

}

.main {
    width: 100%;
    height: calc(100% - 19px);
    margin-bottom: 13px;
    background-color: white;
    display: flex;
    flex-direction: column;
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