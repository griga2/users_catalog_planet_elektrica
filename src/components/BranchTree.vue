<script setup>
import {useWorkerStore} from '../stores/index'
import { computed, onMounted} from 'vue'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import CatalogRow from './CatalogRow.vue'
const store = useWorkerStore();
const route = useRoute();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
    branch_buffer
} = storeToRefs(store)
 
// const getPadding = () => {
//     console.log(current_catalog.value)
//     let a;
//     if (!current_catalog.value) a = 70 + 'px';
//     a = 210 + 'px';
//     console.log({'padding-top': a});
//     return {'padding-top': a}
// }

onMounted(() => {
    store.getBranches()
})

const addBranch = () => {

}

const deleteBranch = () => {

}


const moveBranch = (direction) => {
    store.moveBranch(direction);
}

const сutBranch = () => {
    console.log('cut')
    branch_buffer.value = current_catalog.value.id;
}

const insertBranch = () => {
    console.log('insert')
    store.insertBranch();
    current_catalog.value = null;
    branch_buffer.value = null;
}
</script>

<template>
     <section class="catalog_branch_tree">
            <section class="buttun_row" v-if="route.name == 'editor'"
            style="background-color: white; position: sticky; top: -10px; z-index: 20; padding: 5px;">
                <article @click="addBranch()">
                    <img height="25px" src="../assets/plus.svg">
                </article>
                <article @click="deleteBranch()">
                    <img height="25px" src="../assets/bucket.svg">
                </article>
                <article @click="moveBranch('down')">
                    <img height="25px" src="../assets/down.svg">
                </article>
                <article @click="moveBranch('up')">
                    <img height="25px" src="../assets/up.svg">
                </article>
                <article @click="сutBranch()">
                    <img height="25px" src="../assets/cut.svg">
                </article>
                <article @click="insertBranch()">
                    <img height="25px" v-if=" branch_buffer != null" src="../assets/past.svg">
                    <img height="25px" v-else src="../assets/dpast.svg">
                </article>
            </section>
            <article v-for="branch of catalog" v-bind:key="branch.id" >
                    <CatalogRow 
                        :row="branch"
                        :active_row="current_catalog" 
                        @click_arrow="(value) => {store.ClickArrow(value)}" 
                        @click_row="(value) => {console.log(value); current_catalog = value; store.getUsers()}">
                    </CatalogRow>
            </article>
    </section>
</template>

<style scoped>

*{
    font-size: 14px;
}

.buttun_row{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    justify-content: center;
}

.buttun_row article :hover{
    background-color: #888;
}

.buttun_row article {
    padding: 5px;
    height: 35px;
    width: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: 0.3s all;
}

.disabled{
    color: #888;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.catalog_branch_tree {
    width: 300px;
    height: calc(100% - 18px);
    background-color: white;
    overflow-y: scroll;
    align-items: start;
    justify-content: start;
    border-radius: 10px;
    margin-bottom: 14px;
    padding-top: 8px;
}

</style>