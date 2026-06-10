<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWorkerStore } from '../../../stores/index.js'

const store = useWorkerStore();
const { current_role } = storeToRefs(store)

const timeAutID = ref('')

const updateRole = async () => {
    clearTimeout(timeAutID.value);
    timeAutID.value = setTimeout(async () => {
        await store.updateRole();
    }, 1000);
}
</script>

<template>
    <main class="edit-role-block">
        <div v-if="current_role != null" class="form-block">
            <div class="input-group">
                <label class="input-label">Название роли</label>
                <input 
                    type="text"
                    class="form-input"
                    @input="updateRole" 
                    v-model="current_role.name" 
                    placeholder="Введите название роли"
                />
            </div>
        </div>
        <div v-else class="empty-state">
            <span class="empty-icon">🛡️</span>
            <p>Выберите роль для редактирования</p>
        </div>
    </main>
</template>

<style scoped>
.edit-role-block {
    width: 100%;
    height: 100%;
    background: var(--color-card-bg);
    border-radius: var(--radius-lg);
    padding: 20px;
    min-height: 200px;
}

.form-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 400px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
}

.input-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.form-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    color: var(--color-text);
    background: var(--color-bg);
    font-family: var(--font-family);
    transition: border-color 0.2s, background 0.2s;
}

.form-input:focus {
    outline: none;
    border-color: var(--color-primary);
    background: var(--color-card-bg);
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    color: var(--color-text-muted);
    gap: 16px;
}

.empty-icon {
    font-size: 64px;
}
</style>