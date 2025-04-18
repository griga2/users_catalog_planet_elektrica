<script setup>
import WorkTimeComponent from '@/components/WorkTimeComponent.vue';

const props = defineProps(["branch"])

console.log(props.branch)

const copy = (value) => {
    navigator.clipboard.writeText(value)
        .then(text => {
            
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
}

</script>

<template>
    <section class="main">
        <section class="contacts">
            <h2>{{ props.branch.name }}</h2>
            
            <article class="flex_row ">
                <img src="../../../assets/adres_grey.svg" class="order_0" height="18">
                <a class="adres order_1">{{ props.branch.adress || 'Адрес не указан' }}</a>
            </article>

            <article class="flex_row">
                <img src="../../../assets/phone_grey.svg" class="order_0" height="22">
                <a :href="'tel:' + props.branch.phone" class="phone order_1">{{ props.branch.phone || 'Номер не указан' }}</a>
            </article>
        </section>
        <section class="time_block">
            <WorkTimeComponent :branch="props.branch"></WorkTimeComponent>
        </section>
    </section>
</template>

<style scoped>

.time_block{
    width: 20%;
}
.main{
    display: flex;
    width: 100%;
    height: 100%;
}

.contacts{
    display: flex;
    width: 80%;
    height: 100%;
    flex-direction: column;
}

.order_0{
    order: 0;
}
.order_2{
    order: 3;
}
.order_1{
    order: 3;
}
* {
    color: black;
}

h2 {
    font-family: circe-bold;
    font-size: 28px;
}

.flex_row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    
    gap: 5px;
    width: 200px;
}

a{
    font-family: circe-bold;
    color: #a3a3a3;
    font-size: 18px;
    text-decoration: none;
}

</style>