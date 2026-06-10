<script setup>
import { useWorkerStore } from '../../stores/index.js'
import { onMounted } from 'vue'
import WorkerCard from './components/WorkerCard.vue'
import { storeToRefs } from 'pinia'
import SearchBar from './components/SearchBar.vue'
import BranchTree from '@/components/BranchTree.vue'
import BranchInfo from './components/BranchInfo.vue'

const store = useWorkerStore()
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
    finding
} = storeToRefs(store)

const click_dep = async (data) => {
    await store.getBranch(data.depID)
    await store.getUsers()
}
</script>

<template>
    <main>
        <BranchTree />
        <section class="main-menu">
            <SearchBar />
            <BranchInfo v-if="current_catalog" :branch="current_catalog" />
            <section class="workers-list">
                <article v-for="worker of users" :key="worker.id">
                    <WorkerCard
                        :user="worker"
                        @click_dep="click_dep"
                        @click_open_dop="worker.visible_dop = !worker.visible_dop"
                    />
                </article>
                <div v-if="users.length === 0" class="empty-state">
                    <span class="empty-icon">👥</span>
                    <p>Сотрудники не найдены</p>
                </div>
            </section>
        </section>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
    height: 100%;
    width: calc(100% - 48px);
    padding: 0 24px;
}

.main-menu {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
    gap: 16px;
    overflow: hidden;
}

.workers-list {
    flex: 1;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
    gap: 16px;
    align-content: start;
    padding-bottom: 24px;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    color: var(--color-text-muted);
    grid-column: 1 / -1;
}

.empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
}
</style>