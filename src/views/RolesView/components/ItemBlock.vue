<script setup>
import { storeToRefs } from 'pinia';
import { useWorkerStore } from '../../../stores/index.js'

const store = useWorkerStore();
const { current_role } = storeToRefs(store)

const props = defineProps({
  role: {
    type: Object,
    required: true,
  },
})
</script>

<template>
    <article class="role-item" @click="current_role = role" :class="{ active: current_role?.id == role.id }">
        <span class="role-index">{{ role.index }}</span>
        <span class="role-name">{{ role.name }}</span>
    </article>
</template>

<style scoped>
.role-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s;
    background: var(--color-bg);
    border: 1px solid transparent;
}

.role-item:hover {
    background: var(--color-hover-bg);
}

.role-item.active {
    background: var(--color-primary-light);
    border-color: var(--color-primary);
}

.role-index {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: var(--radius-sm);
    background: var(--color-card-bg);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-muted);
    flex-shrink: 0;
}

.role-item.active .role-index {
    background: var(--color-primary);
    color: white;
}

.role-name {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    flex: 1;
}
</style>