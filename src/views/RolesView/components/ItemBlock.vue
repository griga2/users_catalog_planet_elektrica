<script setup>
import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import {useWorkerStore} from '../../../stores/index.js'
const store = useWorkerStore();
const {
    users,
    show_branch_info,
    current_role,
} = storeToRefs(store)

const props = defineProps({
  role: {
    type: Object,
    required: true,
  },
})
</script>

<template>
    <section class="main_role_item" @click="current_role = role"
        :class="{active: current_role?.id == role.id}">
            <span style="margin-right: 5px;">{{ role.index }}</span><span class="role_name">{{ role.name }}</span>
    </section>
</template>

<style scoped>

.main_role_item{
    display: flex;
}

* {
    font-family: circe-bold;
    font-size: 16px;
}

.main_role_item :hover{
    background-color: #cbcbcb;
}

.active{
    background-color: #cbcbcb;
}

</style>
