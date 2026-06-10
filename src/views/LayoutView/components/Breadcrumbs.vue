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
    <main style="height: 30px;">
        <RouterLink  v-if="!names_editor.includes(route.name)"
        :to="'/catalog'">
            <button  class="header_button" style="">
                Справочник
            </button>
        </RouterLink>

        <RouterLink v-if="names_editor.includes(route.name)"
            :to="'/edit_struct'">
            <button class="header_button" >
                Структура 
            </button>
        </RouterLink>

        <RouterLink v-if="names_editor.includes(route.name)"
            :to="'/edit_workers'">
            <button class="header_button">
                Сотрудники
            </button>
        </RouterLink>

        <RouterLink v-if="names_editor.includes(route.name)"
            :to="'/edit_roles'">
            <button class="header_button">
                Роли
            </button>
        </RouterLink>
    </nav>
</template>

<style scoped>

.header_button{
    font-weight: 800; background-color: white; height: 30px;
}

main{
    width: 100%;
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