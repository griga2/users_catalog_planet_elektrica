<script setup>
import { useWorkerStore } from '../../../stores/index'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import WorkerCard from './WorkerCardSmallHeight.vue'
import { debug } from '@/utils/debug'

const store = useWorkerStore();
const {
    users,
    current_catalog,
    current_user,
} = storeToRefs(store)

onMounted(() => {
    store.getBranches()
})

const add_user = () => {
    store.addUser()   
}

const select_user = (worker) => {
    debug(worker);
    current_user.value = worker;
}
</script>

<template>
    <main class="check-user-block">
        <button v-if="current_catalog" class="add-user-btn" @click="add_user">
            <span>Добавить пользователя</span>
            <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>

        <div v-if="users.length === 0" class="empty-list">
            <p>Нет сотрудников в выбранном подразделении</p>
        </div>

        <div class="users-list">
            <WorkerCard
                v-for="worker of users"
                :key="worker.id"
                :user="worker"
                :class="{ active: current_user?.id === worker.id }"
                @click="select_user(worker)"
                @click_open_dop="worker.visible_dop = !worker.visible_dop"
            />
        </div>
    </main>
</template>

<style scoped>
.check-user-block {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: var(--color-bg);
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.add-user-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-primary);
    color: white;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: background 0.2s;
    font-family: var(--font-family);
}

.add-user-btn:hover {
    background: var(--color-primary-dark);
}

.empty-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    color: var(--color-text-muted);
    text-align: center;
}

.users-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px;
    padding-bottom: 16px;
}
</style>