<script setup>
import { defineProps } from 'vue';
const props = defineProps(['row', "active_row"])  
const emit = defineEmits(['click_row', 'click_arrow'])
import CatalogRow from '@/views/WorkerCatalogView/components/CatalogRow.vue'
</script>

<template>
    <section class="main">
        <article style="width: 100%;" class="main_text">
                <img  :class="{rotate_arrow: props.row?.is_open}"
                    style="transition: 600ms;"
                    v-if="props.row.have_children" 
                    src="../../../assets/arrow.svg" 
                    @click="() => {
                            console.log('awd')
                            $emit('click_arrow', props.row.id)}
                        ">

            <span class="" @click="$emit('click_row', props.row)">{{ props.row.name }}</span>
        </article>
        <section v-if="props.row.have_children && props.row.is_open" class="child_block" style="width: 100%; transition: 600ms;" >
            <article 
                v-for="child in props.row.children" style="width: 100%;" 
                :key="child.id"
                :class="{active:props.active_row?.id == props.row?.id}">
                <CatalogRow :row="child" style="width: 100%;" @click_row="(value) => {$emit('click_row', value)}"
                 @click_arrow="(value) => {$emit('click_arrow', value); console.log(value)}"></CatalogRow>
            </article>
        </section>
    </section> 
</template>

<style scoped>

.child_block{
    padding-left: 20px;
    display: flex;
    flex-direction: column;
}

.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: auto;
}

.rotate_arrow{
    transform: rotate(180deg);
    transition: 600ms;
}

* {
    font-family: circe-bold;
    font-size: 20px;
}

.main_text:hover{
    background-color: #cbcbcb;
    transition: all 0.3s;
    
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