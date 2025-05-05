<script setup>
import { defineProps } from 'vue'
import EditTimeComponent from './EditTimeComponent.vue';

const emits = defineEmits(['open'])
const props = defineProps(['branch']);
const time_convert = (time) => {
    if (typeof time == 'string') {
        const n_time = new Date(time);
         return ' ' 
         + n_time.getHours().toString().padStart(2,'0') 
         + ":" 
         + n_time.getMinutes().toString().padStart(2,'0');
    } else return '00:00';
}

</script>

<template>
    <main v-if="!props.branch.edit_time">
        <section>
            <article class="time_row">
                <span>пн - пт</span>
                <article>
                    <span> {{ time_convert(props.branch?.monFridayOpenning) + ' - ' }}</span>
                    <span> {{ time_convert(props.branch?.monFridayClosing) }}</span>
                </article>
                
            </article>
        </section>
        <section  v-if="props.branch.different">
            <article class="time_row">
                <span>сб - вс</span>
                <article>
                    <span v-if="!props.branch.close_on_holiday">{{ time_convert(props.branch?.saturdayOpenning) + ' - ' }}</span>
                    <span v-if="!props.branch.close_on_holiday">{{ time_convert(props.branch?.saturdayClosing) }}</span>
                    <span v-else style="color: red;">Выходной</span>
                </article>
            </article>
        </section>
        <section v-else>
            <article class="time_row">
                <span>сб</span>
                <span v-if="props.branch.Saturday"> {{ time_convert(props.branch?.saturdayOpenning) + ' - ' }}</span>
                <span v-if="props.branch.Saturday"> {{ time_convert(props.branch?.saturdayClosing) }}</span>
                <span v-else style="color: red;">Выходной</span>
            </article>
            <article class="time_row">
                <span>вс</span>
                <span v-if="props.branch.Sunday"> {{ time_convert(props.branch?.sundayOpenning) + ' - ' }}</span>
                <span v-if="props.branch.Sunday"> {{ time_convert(props.branch?.sundayClosing) }}</span>
                <span v-else style="color: red;">Выходной</span>
            </article>
        </section>
    </main>
    <section v-else >
        <EditTimeComponent>

        </EditTimeComponent>
    </section>
   
</template>

<style scoped>

.time_row{
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}

main{
    display: flex;
    flex-direction: column;
    width: 200px;
}

* {
    font-family: circe-bold;
    font-size: 20px;
}

</style>

