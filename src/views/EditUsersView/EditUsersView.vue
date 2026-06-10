<script setup>
import { useWorkerStore } from '../../stores/index'
import { onMounted } from 'vue'
import EditItemBlock from './components/EditBLock.vue';
import CheckUserBlock from './components/CheckUserBlock.vue';
import { storeToRefs } from 'pinia';
import BranchTree from '@/components/BranchTree.vue';

const store = useWorkerStore();
const {
    current_catalog,
    current_user,
} = storeToRefs(store)
 
onMounted(() => {
    store.getBranches();
})
</script>

<template>
    <main class="main">
        <section class="sidebar">
            <BranchTree />
        </section>
        <section class="users-list">
            <CheckUserBlock />
        </section>
        <section class="content">
            <EditItemBlock 
                v-if="current_user"
                :row="current_catalog" />
            <div v-else class="empty-state">
                <span class="empty-icon">👤</span>
                <p>Выберите сотрудника для редактирования</p>
            </div>
        </section>
    </main>
</template>

<style scoped>
.main {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    height: 100%;
    width: calc(100% - 48px);
    padding: 0 24px;
}

.sidebar {
    flex-shrink: 0;
    width: 320px;
}

.users-list {
    flex-shrink: 0;
    width: 380px;
    height: 100%;
    overflow: hidden;
}

.content {
    flex: 1;
    min-width: 0;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    color: var(--color-text-muted);
    background: var(--color-card-bg);
    border-radius: var(--radius-lg);
    gap: 16px;
}

.empty-icon {
    font-size: 64px;
}
</style>