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
} = storeToRefs(store)


</script>

<template>
    <main>
        <BranchTree style="width: 350px;"></BranchTree>
        <section class="list">
            <SearchBar 
                class="margined_list_block search_bar"
                style="margin-top: 0px; position: fixed;">
            </SearchBar>
            <article class="branch_info margined_list_block" v-if="current_catalog" >
                <BranchInfo  :branch="current_catalog"> </BranchInfo>
            </article>
            <article style="padding-top: 215px;" v-if="current_catalog != null"></article>
            <article style="padding-top: 50px;" v-if="current_catalog == null || current_catalog == ''"></article>

            <article v-for="worker of users" :key="worker.id" class="margined_list_block">
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
    padding: 0px 20px;
}

.branch_info {
    height: 150px;
    width: 84%;
    background-color: white;
    border-radius: 6px;
    position: fixed;
    z-index: 20;
    padding: 10px;
    top: 145px;
}

.search_bar{
    position: fixed;
    width: 84%;
    z-index: 20; 
    top: 89px;
}

.list{
    width: calc(100% - 200px);
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    height: calc(100% - 6px);
    margin-left: 25px;
    padding-right: 8px;
    margin-bottom: 28px;
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