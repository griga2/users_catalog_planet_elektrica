<script setup>
import {useWorkerStore} from './store/index.js'
import { computed, onMounted} from 'vue'
import CatalogRow from './components/CatalogRow.vue';
import WorkerCard from './components/WorkerCard.vue';
import { storeToRefs } from 'pinia';
import SearchBar from './components/SearchBar.vue';
import BranchInfo from './components/BranchInfo.vue';

const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
} = storeToRefs(store)
 
const getPadding = () => {
    console.log(current_catalog.value)
    let a;
    if (!current_catalog.value) a = 70 + 'px';
    a = 210 + 'px';
    console.log({'padding-top': a});
    return {'padding-top': a}
}

onMounted(() => {
    store.getBranches()
})


</script>

<template>
    <main>
        <section class="catalog">
            <article v-for="branch of catalog" v-bind:key="branch.id" >
                <CatalogRow :row="branch" 
                @click_arrow="(value) => {catalog.map(el => {if (el.id == value) el.is_open = !el.is_open; return el})}" @click_row="(value) => {console.log(value); current_catalog = value; store.getUsers()}"></CatalogRow>
            </article>
        </section>
        <section class="list">
            <SearchBar 
                class="margined_list_block search_bar"
                style="margin-top: 0px; position: fixed;">
            </SearchBar>
            <article class="branch_info margined_list_block" v-if="current_catalog != null" >
                <BranchInfo  :branch="current_catalog"> </BranchInfo>
            </article>
            <article style="padding-top: 215px;" v-if="current_catalog != null"></article>
            <article style="padding-top: 50px;" v-if="current_catalog == null"></article>

            <article v-for="worker of users" :key="worker.id" class="margined_list_block" >
                <WorkerCard  :user="worker" @click_open_dop="() => {
                    worker.visible_dop = !worker.visible_dop}
                ">
                </WorkerCard>
            </article>
        </section>
    </main>
</template>

<style scoped>

main {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: start;
    height: 100%;
    width: 100%;
}

.branch_info {
    height: 150px;
    width: calc(73% - 55px);
    background-color: white;
    border-radius: 6px;
    position: fixed;
    z-index: 20;
    padding: 10px;
    top: 70px;
}

.search_bar{
    position: fixed;
    width: calc(73% - 55px);
    z-index: 20; 
    top: 20px;
}

.list{
    width: calc(75% - 40px);
    height: calc(100% - 40px);
    overflow-y: auto;
    overflow-x: hidden;
    
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.catalog {
    width: calc(30% - 40px);
    height: calc(100% - 40px);
    background-color: white;
    border-radius: 0px 6px 6px 0px;
    padding: 10px;
}

.list main{
    background-color: white;
    height: 200px;
    display: flex;
    flex-direction: row;
    padding: 10px;
}

.margined_list_block{
    margin: 15px;
}

</style>