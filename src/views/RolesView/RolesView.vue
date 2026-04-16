<script setup>
import {useWorkerStore} from '../../stores/index'
import { computed, onMounted} from 'vue'
import CatalogRow from './components/ItemBlock.vue';
import EditItemBlock from './components/EditBLock.vue';
import { storeToRefs } from 'pinia';
import BranchTree from '@/components/BranchTree.vue';
import ItemBlock from './components/ItemBlock.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
    roles,
    current_role
} = storeToRefs(store)



onMounted(() => {
    store.getRoles();
})

const deleteRole = () => {
    store.deleteRoles();
}

const moveRole = (axis) => {
    store.moveRoles(current_role.value.id,axis);
}


</script>

<template>
    <main class="main_roles_list">

            <section class="roles_list">
                <section class="buttun_row" v-if="route.name == 'edit_roles'"
                        style="background-color: white; position: sticky; top: -20px; z-index: 20; padding: 5px; width: 100%;">
                    <article @click="store.addRole()">
                        <img height="25px" src="../../assets/plus.svg">
                    </article>
                    <article @click="deleteRole()">
                        <img height="25px" src="../../assets/bucket.svg">
                    </article>
                    <article @click="moveRole('down')">
                        <img height="25px" src="../../assets/down.svg">
                    </article>
                    <article @click="moveRole('up')">
                        <img height="25px" src="../../assets/up.svg">
                    </article>
                </section >
                <section v-for="rl of roles">
                    <ItemBlock :role="rl">

                    </ItemBlock>    
                </section>
            </section>
            <EditItemBlock>

            </EditItemBlock>

    </main>
</template>

<style scoped>

.main_roles_list{
    display: flex;
    align-items: start;
    flex-direction: row;

    width: 90%;
    height: 100%;
    margin: 0px 20px;
    
}

.roles_list{
    display: flex;
    flex-direction: column;
    width: calc(18%);
    padding: 20px;
    overflow-y: scroll;
    height: 100%;
    background-color: white;
}

.buttun_row{
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: space-around;
}

</style>