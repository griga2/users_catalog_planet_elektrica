<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useUserStore();
const { user } = storeToRefs(store);
const route = useRoute()

const names_editor = ['editor', 'edit_workers', 'edit_roles']

const checkLogin = computed(() => user.value.token != '')

const edit_roles = ['hr'];
</script>

<template>
    <nav class="breadcrumbs">
        <RouterLink :to="'/catalog'" :class="{ active: route.name === 'catalog' }">
            Справочник
        </RouterLink>
        <div v-if="checkLogin" class="breadcrumbs-divider">/</div>
        <RouterLink v-if="checkLogin" :to="'/edit_struct'" :class="{ active: route.name === 'editor' }">
            Структура
        </RouterLink>
        <div v-if="checkLogin" class="breadcrumbs-divider">/</div>
        <RouterLink v-if="checkLogin" :to="'/edit_workers'" :class="{ active: route.name === 'edit_workers' }">
            Сотрудники
        </RouterLink>
        <div v-if="checkLogin" class="breadcrumbs-divider">/</div>
        <RouterLink v-if="checkLogin" :to="'/edit_roles'" :class="{ active: route.name === 'edit_roles' }">
            Роли
        </RouterLink>
    </nav>
</template>

<style scoped>
.breadcrumbs {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

.breadcrumbs > a {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    padding: 6px 12px;
    border-radius: var(--radius-md);
    transition: all 0.2s;
    white-space: nowrap;
}

.breadcrumbs > a:hover {
    color: var(--color-primary);
    background-color: var(--color-primary-light);
}

.breadcrumbs > a.active {
    color: var(--color-primary);
    background-color: var(--color-primary-light);
    font-weight: var(--font-weight-semibold);
}

.breadcrumbs-divider {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    user-select: none;
}
</style>