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
        <RouterLink v-if="!names_editor.includes(route.name)"
            :to="'/catalog'"
            class="breadcrumb-link"
            :class="{ active: route.name === 'catalog' }">
            Справочник
        </RouterLink>

        <template v-if="names_editor.includes(route.name)">
            <RouterLink
                :to="'/edit_struct'"
                class="breadcrumb-link"
                :class="{ active: route.name === 'editor' }">
                Структура
            </RouterLink>

            <RouterLink
                :to="'/edit_workers'"
                class="breadcrumb-link"
                :class="{ active: route.name === 'edit_workers' }">
                Сотрудники
            </RouterLink>

            <RouterLink v-if="edit_roles.includes(user?.role?.name)"
                :to="'/edit_roles'"
                class="breadcrumb-link"
                :class="{ active: route.name === 'edit_roles' }">
                Роли
            </RouterLink>
        </template>
    </nav>
</template>

<style scoped>
.breadcrumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 30px;
}

.breadcrumb-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    padding: 6px 12px;
    border-radius: var(--radius-md);
    transition: all 0.2s;
    white-space: nowrap;
}

.breadcrumb-link:hover {
    color: var(--color-primary);
    background-color: var(--color-primary-light);
}

.breadcrumb-link.active {
    color: var(--color-primary);
    background-color: var(--color-primary-light);
    font-weight: var(--font-weight-semibold);
}
</style>