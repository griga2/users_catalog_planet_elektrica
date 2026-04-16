<script setup>
import { defineProps } from 'vue';
import CatalogRow from '@/components/CatalogRow.vue'
import { storeToRefs } from 'pinia';
import {useWorkerStore} from '../../../stores/index.js'
const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
} = storeToRefs(store)

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  active_row: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['click_row', 'click_arrow'])
</script>

<template>
    <section class="main" >
        <article style="width: 100%;" class="main_text">
            <span class="branch_name" @click="$emit('click_row', props.row)">{{ props.row.name }}</span>
        </article>

        <section class="child_block" style="width: 100%; transition: 600ms;" >
                <article
                    v-for="child in props.row.children" style="width: 100%;"
                    :class="{active:props.active_row?.id == props.row?.id}">
                    <CatalogRow :row="child" :font-size="'20px'" style="width: 100%;" @click_row="(value) => {$emit('click_row', value)}">
                    </CatalogRow>
                </article>
        </section>
    </section>
</template>

<style scoped>

.child_block{
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.branch_name{
    color: black
}

* {
    font-family: circe-bold;
    font-size: 20px;
}

.main_text:hover{
    background-color: #cbcbcb;
    transition: all 0.3s;
    color: black;
}

.active{
    background-color: #cbcbcb;
}

.main_text{
    width: 100%;
    border-radius: 6px;
    padding: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap:10px;
}

</style>
