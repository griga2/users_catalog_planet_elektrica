<script setup>
import {useWorkerStore} from '../../../stores/index'
import { computed, onMounted, watch} from 'vue'
import { storeToRefs } from 'pinia';
import WorkerCard from './WorkerCard.vue'

const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    current_user,
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
    <main style="overflow-y: scroll;" class="margined_list_block">
        <article v-for="worker of users" :key="worker.id"  >
            <WorkerCard 
                @click="() => {console.log(worker);current_user = worker}"
                class="worker_card"
                :user="worker" @click_open_dop="() => {
                worker.visible_dop = !worker.visible_dop}" 
                :class="{active: current_user?.id === worker.id}">
            </WorkerCard>
        </article>  
    </main>
</template>

<style scoped>

main{
    height: 100%;
    margin-top: 8px;
    overflow-y: hidden;
    padding: 10px;
}

.worker_card{
    background-color: white;
}

.margined_list_block{
    height: calc(100% - 15px);
    margin-bottom: 18px;
}

</style>