<script setup>
import { useWorkerStore } from '../stores/index'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import CatalogRow from './CatalogRow.vue'
import { debug } from '@/utils/debug'

const store = useWorkerStore();
const route = useRoute();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
    branch_buffer
} = storeToRefs(store)

onMounted(() => {
    store.getBranches()
})

const addBranch = () => {
    // TODO: add branch
}

const deleteBranch = () => {
    // TODO: delete branch
}

const moveBranch = (direction) => {
    store.moveBranch(direction)
}

const сutBranch = () => {
    debug('cut')
    branch_buffer.value = current_catalog.value?.id
}

const insertBranch = () => {
    debug('insert')
    store.insertBranch()
    current_catalog.value = null
    branch_buffer.value = null
}

const is_editor = route.name === 'editor'
</script>

<template>
    <section class="branch-tree">
        <div v-if="is_editor" class="tree-actions">
            <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                    <button class="action-btn" @click="addBranch()">
                        <img src="../assets/plus.svg" alt="Добавить">
                    </button>
                </template>
                Добавить
            </n-tooltip>
            <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                    <button class="action-btn" @click="deleteBranch()">
                        <img src="../assets/bucket.svg" alt="Удалить">
                    </button>
                </template>
                Удалить
            </n-tooltip>
            <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                    <button class="action-btn" @click="moveBranch('down')">
                        <img src="../assets/down.svg" alt="Вниз">
                    </button>
                </template>
                Вниз
            </n-tooltip>
            <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                    <button class="action-btn" @click="moveBranch('up')">
                        <img src="../assets/up.svg" alt="Вверх">
                    </button>
                </template>
                Вверх
            </n-tooltip>
            <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                    <button class="action-btn" @click="сutBranch()">
                        <img src="../assets/cut.svg" alt="Вырезать">
                    </button>
                </template>
                Вырезать
            </n-tooltip>
            <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                    <button class="action-btn" :disabled="branch_buffer === null" @click="insertBranch()">
                        <img v-if="branch_buffer !== null" src="../assets/past.svg" alt="Вставить">
                        <img v-else src="../assets/dpast.svg" alt="Вставить (disabled)">
                    </button>
                </template>
                Вставить
            </n-tooltip>
        </div>

        <div class="tree-content">
            <article v-for="branch of catalog.filter(el => {
                if (route.name == 'catalog' && el.id == '64E1B3E8-0EC2-4C89-A3CE-F68F4DE515A1') return false;
                return true;
            })" v-bind:key="branch.id" >
                    <CatalogRow 
                    
                        :row="branch"
                        :active_row="current_catalog" 
                        @click_arrow="(value) => {store?.clickArrow(value)}" 
                        @click_row="(value) => {debug(value); current_catalog = value; store.getUsers()}">
                    </CatalogRow>
            </article>
        </div>
    </section>
</template>

<style scoped>
.branch-tree {
    width: var(--sidebar-width);
    height: 100%;
    background: var(--color-card-bg);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.tree-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding: 12px;
    background: var(--color-card-bg);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 10;
}

.action-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background 0.2s;
    padding: 4px;
}

.action-btn:hover {
    background: var(--color-hover-bg);
}

.action-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.action-btn img {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

.tree-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
}

.tree-content::-webkit-scrollbar {
    width: 6px;
}

.catalog_branch_tree {
    width: 300px;
    height: calc(100% - 18px);
    background-color: white;
    overflow-y: scroll;
    align-items: start;
    justify-content: start;
    border-radius: 10px;
    margin-bottom: 14px;
    padding-top: 8px;
    padding-left: 5px;
}

.tree-content::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: var(--radius-full);
}

.tree-content::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-muted);
}
</style>