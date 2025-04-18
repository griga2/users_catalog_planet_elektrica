<script setup>
import { defineProps, defineEmits, ref, onMounted, onUpdated } from 'vue';
import IconContact from './IconContact.vue'
const props = defineProps(['user'])
const emits = defineEmits(['click_open_dop', 'click'])

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
    return date?.getDate().toString().padStart(2,'0') + '.' + (date?.getMonth() + 1).toString().padStart(2,'0');
}

const openMailClient = (email) => {
    console.log('email')
    window.location.href = "mailto:" + email;
}

const main_contact = ['workPhone','email']

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
</script>

<template>
    <section class="prod_cadr" :class="{open:props.user.visible_dop}">
        <section style="display: flex; flex: 35% 65%">
            <section class="photo" style="z-index: 10; padding: 0px; margin: 0px; background-color: white;">
                <img v-if="vis_ing" ref="img_block" height="220px" style=" border-radius: 8px 0px 0px 8px; object-fit: contain;" :src="`https://136703eb-05e89941-0f10-4e65-b543-d67d43f62dea.s3.timeweb.cloud${props.user.Photo}?t=${new Date().getTime()}`">
                <img v-if="!vis_ing" src="../../../assets/userProfile.svg" height="220px" style="border-radius: 8px 0px 0px 8px;">
                <!-- <img v-if="!vis_ing" :src="`/img/bookicon.svg`" alt="" style="width: 100px; height: 70px;"> -->
            </section>
            <section class="main" style="z-index: 10; width: 100%;">
                <section class="head_block" style="z-index: 10;">
                    <section class="contact_block">
                        <article><h2>{{props.user?.full_name}}</h2></article>
                        <article class="work"><span>{{props.user?.role.name}}</span></article>
                        <section style="display: flex; flex-direction: column; flex-wrap: wrap; width: 100%; max-height: 120px; margin: 10px;" >
                            <article v-for="contact of props.user.Contacs"> 
                                <article v-if="main_contact.includes(contact[1]) && contact[0]" style="display: flex; flex-direction: row;">
                                    <IconContact :value="contact[1]" >   
                                    </IconContact>
                                    <span>{{ contact[2] }}</span>
                                </article>
                            </article>
                        </section>
                    </section>
                    <section>
                        <article style="display: flex; flex-direction: row; gap: 5px;padding: 20px; font-family: circe;">
                            <img src="../../../assets/cake.svg">
                            <span>{{ GetBirthdayday(props.user.Birthday) }}</span>
                        </article>
                    </section>
                </section>
                <section class="status_block" v-if="props.user.Status">
                    {{ props.user.Status }}
                </section>
                <section style="width: 100%;">
                        <article><h3>{{props.user.number}}</h3></article>
                </section>
            </section>
        </section>
    </section>

</template>

<style scoped>

.catalog {
    width: calc(30% - 40px);
    height: calc(100% - 40px);
    background-color: white;
    border-radius: 0px 0px 0px 0px;
}

.head_block{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

span {
}

.status_block {
    font-family: circe;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;

    white-space: pre-wrap;
}

.contact_block {
    font-family: circe;
    gap: 10px;
}

.wave_block{
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    /* padding: 10px; */
    gap: 5px;
    width: 100%;
    color: white;
    font-family: circe

}

.active{
    background-color: #4eed0f;
}

.artiv_ball{    
    position: absolute;
    height: 26px;
    width: 26px;
    background-color: #a3a3a3;
    border-radius: 100px;
    z-index: 30;
    left: -15px;
    top: -5px
}

.button_open_dop{
    position: relative;
    
}

.rotate_arrow{
    transform: rotate(180deg);
    transition: 600ms;
}

.birthday_row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.birthday_row span{
    padding-top: 4px;
    margin-top: 4px;
}

.arrow{
    position: absolute;
    top: -20px;
    border-radius: 100px;
    background-color: #a3a3a3;
    width: 30px;
    height: 30px;
    padding: 8px;
    transition: all 0.3s;
    left: calc(50%);
    z-index: 20;
}

.close{
    visibility: hidden;
    height: 200px;
    width: 100%;
}

.prod_cadr{
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    /* align-items: center */
    justify-content: space-between;
    transition: all 0.3s;
    width: 100%;
}

.dropdown{
    height: 100px;
    border: 1px sodlid black;
    border-radius: 0px 0px 0px 0px;
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
    border-radius: 0px 6px 6px 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding-left: 10px;
    display: flex;
    transition: all 0.3s;
    min-height: 200px;
    width: 100%;
    margin: 0px;
}   

.photo {
    border-radius: 8px 0px 0px 8px;
}

.contacts{
    margin-top: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

}

.contacts article{
    display: flex;
    height: 20px;
    margin-right: 30px;
    min-width: 150px;
    flex-direction: row;
    justify-content: start;
    gap: 5px;
    font-family: Cer;
    font-family: circe;
    
}

.contacts image{
    display: flex;
    margin-right: 10px;
}

.work{
    color: rgba(0, 0, 0, 0.3);
    font-family: circe-extrabold;
    font-size: 18px;
    text-transform: uppercase;
    margin-top: -10px;
}

.text {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    width: 45%;
}

.doing {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    min-height: 200px;
    height: 200px;
    
    align-items: end;
    justify-content: start;
    width: 40%;
    font-family: circe;
    padding-right: 20px;
}

h2 {
    font-family: circe-bold;
    font-size: 36px;
}

a{
    text-decoration: none;
    color: black;
}

</style>