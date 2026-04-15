<script setup>
import {useWorkerStore} from '../../stores/index.js'
import { computed, onMounted} from 'vue'
import WorkerCard from './components/WorkerCard.vue';
import { storeToRefs } from 'pinia';
import SearchBar from './components/SearchBar.vue';
import BranchTree from '@/components/BranchTree.vue';
import BranchInfo from './components/BranchInfo.vue';

const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
    finding
} = storeToRefs(store)

const click_dep = async (data) => {
    await store.getBranch(data.depID);
    await store.getUsers();
}

</script>

<template>
    <main>
        <BranchTree style="width: 350px;"></BranchTree>
        <section class="main_menu_block">
            <SearchBar 
                    class="margined_list_block search_bar">
            </SearchBar>
            <article class="branch_info margined_list_block" v-if="current_catalog" >
                <BranchInfo  :branch="current_catalog"></BranchInfo>
            </article>
            <section class="list" :style="{height: !current_catalog ? 'calc(100% - 87px)': ''}">
                <article v-for="worker of users" :key="worker.id" class="margined_list_block">
                    <WorkerCard  :user="worker"
                    @click_dep="(data) => {
                        click_dep(data)
                    }"
                    @click_open_dop="() => {
                        worker.visible_dop = !worker.visible_dop}">
                    </WorkerCard>
                </article>
            </section>
        </section>

    </main>
</template>

<style scoped>

.main_menu_block{
    width: 100%;
    height: 100%;
    padding: 0px 20px;
}

main {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: start;
    height: 100%;
    width: 100%;
    padding: 0px 20px;
}

.branch_info {
    height: 150px;
    background-color: white;
    border-radius: 6px;
    z-index: 20;
    width: 100%;
}

.search_bar{
    width: 100%;
    z-index: 20;
    margin-bottom: 20px;
}

.list{
    margin-top: 20px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    height: calc(100% - 255px);
    gap: 10px;
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

/* .catalog {
    width: calc(30% - 40px);
    height: calc(100% - 40px);
    background-color: white;
    border-radius: 0px 6px 6px 0px;
    padding: 10px;
    overflow-y: scroll;
} */

.list main{
    background-color: white;    
    display: flex;
    flex-direction: row;
    padding: 10px;
}



.margined_list_block{
    
}

</style>