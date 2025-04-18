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
    <main class="main   ">
    <section style="display: flex; flex-direction: row;" v-if="current_catalog != null">
        <section style="width: 50%;">
                <span class="header">Общая информация</span>
                <section class="info_block" style="flex-direction: current_catalog; flex-wrap: wrap; width: 100%;">
                    <article class="input_block">
                        <span>Город</span>
                        <!-- <n-select size="small" v-model:value="current_catalog.sity" :options="sity_options" placeholder=" "/> -->
                        <n-input 
                        size="small" 
                        type="text"
                        @input="() => {updateBranch()}" 
                        v-model:value="current_catalog.city" 
                        placeholder=" "/>
                    </article>
                    <article class="input_block">
                        <span>Адрес</span>
                        <n-input size="small" type="text" 
                        @input="() => {updateBranch()}" 
                        v-model:value="current_catalog.adress"
                        placeholder=""/>
                    </article>
                    <article 
                        class="input_block">
                        <span>Email</span>
                        <n-input size="small" 
                            type="text"
                            @input="() => {updateBranch()}" 
                            v-model:value="current_catalog.email"
                            placeholder=" "/>
                    </article>
                    <article class="input_block">
                        <span>Часовой пояc</span>
                        <n-select 
                            size="small" 
                            v-model:value="current_catalog.hors_ping"
                            :options="hors_options" 
                            placeholder=" "/>
                    </article>
                    <article class="input_block">
                        <span @click="() => {
                            current_catalog.edit_time = !current_catalog.edit_time}"
                        >Время работы</span>
                        <WorkTimeComponent 
                        :branch="current_catalog"
                        >
                        </WorkTimeComponent>
                    </article>
                    <article class="input_block">
                        <span>Контактный телефон</span>
                        <n-input size="small" 
                        @input="() => {updateBranch()}" 
                        v-model:value="current_catalog.orderNum"
                        type="phone"
                        placeholder=" "/>
                    </article>
                </section>
            </section>
            <section class="info_column_block" style="width: 25%;">
                <span class="header">Информация снабжения</span>
                <article class="input_block">
                    <span>OID</span>
                    <n-input 
                    size="small"
                    type="phone"
                    v-model:value="current_catalog.oid"
                    @input="() => {updateBranch()}"  
                    placeholder=" "/>
                </article>
                <article class="input_block" style="flex-direction: row;">
                    <span>Офис управления</span>
                    <n-checkbox v-model:checked="current_catalog.isOficeDepartement" style="margin: 8px;"/>
                </article>
                 <article class="input_block" style="flex-direction: row;">
                    <span>Офис продаж</span>
                    <n-checkbox v-model:checked="current_catalog.isOficePurchese" style="margin: 8px;"/>
                </article>
                <article class="input_block" style="flex-direction: row;">
                    <span>Склад</span>
                    <n-checkbox v-model:checked="current_catalog.isStorage" style="margin: 8px;"/>
                </article>
            </section>
            <section class="info_column_block" style="width: 25%;">
                <span class="header">Информация ВЕСТА</span>
                <section class="info_block" style="">
                    <article class="input_block">
                        <span>ID</span>
                        <n-input 
                        size="small" 
                        type="phone"
                        v-model:value="current_catalog.id_vesta"
                        @input="() => {updateBranch()}"  
                        placeholder=" "/>
                    </article>
                    <article class="input_block">
                        <span>SQL Сервер</span>
                        <n-input 
                        size="small" 
                        v-model:value="current_catalog.sql_server_vesta"
                        type="phone"
                        @input="() => {updateBranch()}"  
                        placeholder=" "/>
                    </article>
                    <article class="input_block">
                        <span>База данных</span>
                        <n-input 
                        size="small"
                        type="phone"
                        v-model:value="current_catalog.database_vesta"
                        @input="() => {updateBranch()}"  
                        placeholder=" "/>
                    </article>
                    <article class="input_block">
                        <span>ЦФО</span>
                        <n-input 
                        size="small" 
                        type="phone"
                        v-model:value="current_catalog.cfo"
                        @input="() => {updateBranch()}"  
                        placeholder=" "/>
                    </article>
                </section>
            </section>
        </section>
    </main>
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
    flex-direction: row; 
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    align-items: start;
    justify-content: start;
    width: 200px;
}

.input_block{
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
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