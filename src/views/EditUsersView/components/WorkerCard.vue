<script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
const props = defineProps(['user'])
const emits = defineEmits(['click_open_dop', 'click_block'])

const copy = (value) => {
    navigator.clipboard.writeText(value)
        .then(text => {
            // `text` содержит текст, прочитанный из буфера обмена
        })
        .catch(err => {
            // возможно, пользователь не дал разрешение на чтение данных из буфера обмена
            console.log('Something went wrong', err);
        });
}

const GetBirthdayday = (_date) => {
    console.log(typeof (_date))
    const date = new Date(_date)
    return date?.getDate() + '.' + (date?.getMonth() + 1);
}

const openMailClient = (email) => {
    console.log('email')
    window.location.href = "mailto:" + email;
}

const chengevis = () => {
    console.log('ua')
    vis_ing.value = false;
}

const img_block = ref(null)

onMounted(() => {
    console.log(img_block.value);
    img_block.value.onerror = chengevis;
    vis_ing.value = true;
})

const vis_ing = ref(true);

watch(props.user.Photo, async (newQuestion, oldQuestion) => {
    console.log('update')
    if (newQuestion != oldQuestion) {
        vis_ing.value = true;
    }
})

</script>

<template>
    <section class="prod_cadr" >
        <section class="main" style="">
            <section class="photo" style=" padding: 0px; margin: 0px;">
                <img v-if="vis_ing" ref="img_block" height="200px" 
                style=" border-radius: 8px 0px 0px 8px; object-fit: contain;" 
                :src="`https://s3.twcstorage.ru/136703eb-05e89941-0f10-4e65-b543-d67d43f62dea${props.user?.Photo}?t=${new Date().getTime()}`">
                <img v-if="!vis_ing" src="../../../assets/userProfile.svg" 
                height="200px" style="border-radius: 6px 0px 0px 6px;">
            </section>
            <section class="text" style="z-index: 10;">
                <section>
                    <article><h2>{{props.user?.full_name}}</h2></article>
                    <article class="work"><span>{{props.user?.role_name}}</span></article>
                </section>
            </section>
           
        </section>
        
    </section>
   
</template>

<style scoped>

.photo {
    border-radius: 8px 0px 0px 8px;
    background-color: #a3a3a3;
}

.prod_cadr{
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    /* align-items: center */
    justify-content: space-between;
    transition: all 0.3s;
    height: 200px;
    width: 100%;
    margin: 4px;
}

.open {
    transition: all 0.3s;
    height: 300px;
}

.dropdown{
    height: 100px;
    background-color: #a3a3a3;
    border: 1px sodlid black;
    border-radius: 0px 0px 6px 6px;
    z-index: 1;
    position: relative;
    top: 180px;
}

.do_row{
    display: flex;
    gap:4px;
    align-items: center;
    justify-content: center;
}

.main {
    border-radius: 6px;
    padding: 0px;
    display: flex;
    flex-direction: row;
    display: flex;
    flex-direction: row;
    transition: all 0.3s;
}   

.photo {
    height: 200px;
    border-radius: 6px 0px 0px 6px;
    background-color: #a3a3a3;
}


.work{
    color: rgba(0, 0, 0, 0.3);
    font-family: circe-extrabold;
    font-size: 20px;
    text-transform: uppercase;
    margin-top: -10px;
}

.text {
    display: flex;
    flex-direction: column;
    padding: 20px;
}

h2 {
    font-family: circe-bold;
    font-size: 32px;
}

a{
    text-decoration: none;
    color: black;
}

</style>