<script setup>
import { defineProps, defineEmits } from 'vue';
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
    return date?.getDate() + '.' + (date?.getMonth() + 1);
}

const openMailClient = (email) => {
    console.log('email')
    window.location.href = "mailto:" + email;
}

</script>

<template>
    <section class="prod_cadr" :class="{open:props.user.visible_dop}">
        <section class="main" style="z-index: 10;">
            <section style="position: relative;">
                <article class="artiv_ball" :class="{active:props.user.status}">
                </article>
            </section>
            
            <section class="photo" style="z-index: 10;">

            </section>
            <section class="text" style="z-index: 10;">
                <section>
                    <article><h2>{{props.user?.name}}</h2></article>
                    <article class="work"><span>{{props.user?.work}}</span></article>
                </section>
                <section>
                    <article><h3>{{props.user.number}}</h3></article>
                    <article class="contacts">
                        <article v-if="props.user.phone">
                            <img src="../../../assets/phone.svg">
                            <a  :href="'tel:' + props.user.phone">{{props.user?.phone}}</a>
                            <!-- <img src="../../../assets/copy.svg" @click="copy(props.user?.phone)"> -->
                        </article>
                        <article 
                        v-if="props.user.mail"
                        @click="openMailClient(props.user.mail)"><img src="../../../assets/mail.svg">
                            <a :href="'mailto:' + props.user.emai">{{props.user?.mail}}</a>
                            <!-- <img src="../../../assets/copy.svg"  @click="copy(props.user?.adres)"> -->
                        </article>
                    </article>
                </section>
            </section>
            <section class="doing" style="z-index: 10; margin-top: 20px;">
                <article class="birthday_row">
                    <span >{{ GetBirthdayday(props.user.birthday) }}</span><img height="22" src="../../../assets/cake.svg">
                </article>
                <article v-for="doi in props.user.doing" class="do_row">
                    <span>
                        {{ doi }}
                    </span>
                    <img src="../../../assets/point.svg" height="8px">
                </article>
            </section>
            
        </section>
        <section class="wave_block">
            <article v-for="contact of props.user.other_contacts" :key="contact.text" style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 10px">
                <span  @click="">
                    {{contact.text}}
                </span>
                <img src="../../../assets/copy_white.svg">
            </article>
        </section>
        
    </section>
    <article style="position: relative;">
                <img 
                class="arrow" 
                :class="{rotate_arrow: props.user.visible_dop}" 
                src="../../../assets/arrow.svg" 
                @click="$emit('click_open_dop')">
            </article>
</template>

<style scoped>

.wave_block{
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;

    padding: 10px;
    gap: 5px;

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
    background-color: #a3a3a3;
    border-radius: 6px;
    /* align-items: center */
    justify-content: space-between;
    transition: all 0.3s;
    height: 200px;
    width: 100%;
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
    background-color: white;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    transition: all 0.3s;
    height: 200px;
}   

.photo {
    width: 15%;
    height: 200px;
    position: relative;
    top: 0px;
    left: -10px;
    border-radius: 6px 0px 0px 6px;
    background-color: #a3a3a3;
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
    font-size: 20px;
    text-transform: uppercase;
    margin-top: -10px;
}

.text {
    height: 200px;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    width: 45%;
}

.doing {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    height: 200px;
    align-items: end;
    justify-content: start;
    width: 40%;
    font-family: circe;
    padding-right: 20px;
}

h2 {
    font-family: circe-bold;
    font-size: 26px;
}

a{
    text-decoration: none;
    color: black;
}

</style>