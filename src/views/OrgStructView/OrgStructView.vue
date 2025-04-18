<script setup>
import {useWorkerStore} from '../../stores/index'
import { computed, onMounted} from 'vue'
import CatalogRow from './components/ItemBlock.vue';
import EditItemBlock from './components/EditBLock.vue';
import { storeToRefs } from 'pinia';
import BranchTree from '@/components/BranchTree.vue';

const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
} = storeToRefs(store)
 
onMounted(() => {
    store.getBranches();
})




</script>

<template>
    <main>
        <BranchTree style="width:350px;"></BranchTree>
        <EditItemBlock style="width: calc(100% - 350px);" :row="current_catalog"/>
    </main>
</template>

<style scoped>
main{
    padding: 0px 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: start;
    height: 100%;
    width: 100%;
}

</style>