<script setup>
import { useWorkerStore } from '../../stores/index'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia';
import BranchTree from '@/components/BranchTree.vue';
import ItemBlock from './components/ItemBlock.vue';
import EditItemBlock from './components/EditBLock.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useWorkerStore();
const {
    roles,
    current_role
} = storeToRefs(store)

onMounted(() => {
    store.getRoles();
})

const deleteRole = () => {
    store.deleteRoles();
}

const moveRole = (axis) => {
    store.moveRoles(current_role.value.id, axis);
}

const addRole = () => {
    store.addRole();
}
</script>

<template>
    <main class="main">
        <section class="sidebar">
            <BranchTree />
        </section>
        <section class="roles-section">
            <div v-if="route.name == 'edit_roles'" class="toolbar">
                <button class="toolbar-btn" @click="addRole" title="Добавить роль">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path d="M9 4v10M4 9h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                <button class="toolbar-btn" @click="deleteRole" :disabled="!current_role" title="Удалить роль">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path d="M4 5h10l-1.5 10h-7L4 5z M7 5V3h4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </button>
                <button class="toolbar-btn" @click="moveRole('up')" :disabled="!current_role" title="Вверх">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path d="M4 11l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </button>
                <button class="toolbar-btn" @click="moveRole('down')" :disabled="!current_role" title="Вниз">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path d="M4 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </button>
            </div>

            <div class="roles-list">
                <ItemBlock v-for="rl of roles" :key="rl.id" :role="rl" />
            </div>
        </section>
        <section class="content">
            <EditItemBlock />
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

.roles-section {
    flex-shrink: 0;
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 100%;
}

.toolbar {
    display: flex;
    gap: 8px;
    padding: 8px;
    background: var(--color-card-bg);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
}

.toolbar-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-bg);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s;
}

.toolbar-btn:hover:not(:disabled) {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: var(--color-primary-light);
}

.toolbar-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.roles-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px;
    padding-bottom: 16px;
}

.content {
    flex: 1;
    min-width: 0;
}
</style>