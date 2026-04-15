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

const add_user = () => {
    store.addUser()   
}


</script>

<template>
    <main style="overflow-y: scroll;" class="margined_list_block">
        <article id="add_user_bt" @click="add_user" v-if="current_catalog">
        Добавить пользователя<img style="margin-left: 4px" height="24px" src="../../../assets/plus.svg">
        </article>

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

#add_user_bt{
    background-color: white;
    height: 32px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    border-radius: 4px;
    text-align: center;
    font-family: 'circe-bold'
}

.worker_card{
    background-color: white;
}

.margined_list_block{
    height: calc(100% - 15px);
    margin-bottom: 18px;
}

</style>