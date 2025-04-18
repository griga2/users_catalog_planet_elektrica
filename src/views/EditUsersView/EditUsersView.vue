<script setup>
import {useWorkerStore} from '../../stores/index'
import { computed, onMounted} from 'vue'
import CatalogRow from './components/ItemBlock.vue';
import EditItemBlock from './components/EditBLock.vue';
import CheckUserBlock from './components/CheckUserBlock.vue';
import { storeToRefs } from 'pinia';
import BranchTree from '@/components/BranchTree.vue';

const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
    current_user,
} = storeToRefs(store)
 
onMounted(() => {
    store.getBranches();
})




</script>

<template>
    <main class='main' style="display: flex; flex-direction: row;">
        <BranchTree style="width:350px;">
        </BranchTree>
        <CheckUserBlock>
        </CheckUserBlock>
        <EditItemBlock 
            :row="current_catalog" 
            v-if="current_user"/>
            <section v-else 
            class="user_edit_block">
        </section>
    </main>
</template>

<style scoped>
.main{
    padding: 0px 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: start;
    height: 100%;
    width: 100%;
    gap: 10px;
}

.user_edit_block{
    background-color: white;
}

</style>