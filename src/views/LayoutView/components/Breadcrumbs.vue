<script setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';


const store = useUserStore();
const {
    user
} = storeToRefs(store);
const route = useRoute()

const names_editor = [
    'editor',
    'edit_workers',
    'edit_roles'
]

const checkLogin = computed(() => {
    return user.token != '';
})

const chectEditBlockIsWisible = computed((block) => {
    return block
})

const edit_roles = ['hr'];

</script>

<template>
    <main>
        <RouterLink  v-if="!names_editor.includes(route.name)"
        :to="'/catalog'">
            <button>
                Справочник
            </button>
        </RouterLink>

        <RouterLink v-if="names_editor.includes(route.name)"
            :to="'/edit_struct'">
            <button>
                Структура компании
            </button>
        </RouterLink>

        <RouterLink v-if="names_editor.includes(route.name)"
            :to="'/edit_workers'">
            <button>
                Сотрудники
            </button>
        </RouterLink>

        <RouterLink v-if="names_editor.includes(route.name)"
            :to="'/edit_roles'">
            <button>
                Роли
            </button>
        </RouterLink>
    </main>

</template>

<style scoped>

main{
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    background-color: white;
    padding:8px;
    border-radius: 10px;
    justify-content: start;
    align-items: center;
}

button{
    border-radius: 8px;
    background-color: white;
    border: 0px;
    font-size: 28px;
}

.inter_text{
    border-radius: 8px;
    background-color: white;
    border: 0px;
    font-size: 28px;
    padding: 5px;
    font-family: circe;
    text-align: center;
}

</style>