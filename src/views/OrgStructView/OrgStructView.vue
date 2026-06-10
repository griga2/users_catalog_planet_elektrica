<script setup>
import { useWorkerStore } from '../../stores/index'
import { onMounted } from 'vue'
import EditItemBlock from './components/EditBLock.vue';
import { storeToRefs } from 'pinia';
import BranchTree from '@/components/BranchTree.vue';

const store = useWorkerStore();
const {
    current_catalog,
} = storeToRefs(store)
 
onMounted(() => {
    store.getBranches();
})
</script>

<template>
    <main>
        <section class="sidebar">
            <BranchTree />
        </section>
        <section class="content">
            <EditItemBlock :row="current_catalog"/>
        </section>
    </main>
</template>

<style scoped>
main {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    height: 100%;
    width: calc(100% - 48px);
    padding: 0 24px;
}

.sidebar {
    flex-shrink: 0;
    width: 320px;
}

.content {
    flex: 1;
    min-width: 0;
}
</style>