<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
const props = defineProps(['row', "active_row"])  
const emit = defineEmits(['click_row', 'click_arrow'])
import CatalogRow from '../components/ItemBlock.vue'
import { storeToRefs } from 'pinia';
import {useWorkerStore} from '../../../stores/index.js'
import WorkTimeComponent from '@/components/WorkTimeComponent.vue';
import InputContact from './InputContact.vue';
const store = useWorkerStore();
const {
    users,
    catalog,
    current_catalog,
    show_branch_info,
    current_user,
    roles
} = storeToRefs(store)

const hors_options = [
    { 
        label: '+6',
        value: 'nsk',
    }
]

onMounted(() => {
    // store.getRoles();
})

const updateUser = () => {
    store.updateUser();
}

const timeAutID = ref('')

const updateContact = (contact) => {
    clearTimeout(timeAutID.value);
    timeAutID.value = setTimeout(async() => {
        console.log('update branch')
        store.UpdateContact(contact)

    }, 500);
}

const changeFile = async (file) => {
    console.log(file);
    await store.uploadFile(file);
    vis_ing.value = true;
}

const updateRole = async (role) => {
    current_user.value.Role = role;
    store.updateRole();
}

const chengevis = () => {
    // console.log('ua')
    vis_ing.value = false;
}

const img_block = ref(null)

onMounted(() => {
    store.getRoles();
    console.log(img_block.value);
    // if (current_user.value?.Photo) {
        img_block.value.onerror = chengevis;
        vis_ing.value = true;
    // }

  
})

const vis_ing = ref(true);

const firstDayStart = () => {
    store.firstDayStart();
}

const removeUser = () => {
    store.removeUserStart();
}

</script>

<template>
    <main class="main_edit">
        <section class="activite_block">
            <button @click="firstDayStart">
                Вышел на первый день
            </button>
            <button @click="removeUser">
                Уволить
            </button>
        </section>
        <section style="display : flex; flex-direction:  column; width: 100%;" >
                <section style="display: flex; flex-direction: row; flex-wrap: nowrap; width: 100%;">
                    <section style="width: 100%; flex-direction: column;">
                        <span class="header">Общая информация</span>
                        <section class="info_block" style="flex-direction: column; flex-wrap: wrap; width: 100%;">
                            <article class="input_block">
                                <span>Фамилия</span>
                                <n-input
                                    @input="() => {updateUser()}" 
                                    size="small" 
                                    type="text"
                                    v-model:value="current_user.MidName" 
                                    placeholder=" "/>
                            </article>
                            <article class="input_block">
                                <span>Имя</span>
                                <n-input size="small" 
                                    @input="() => {updateUser()}"
                                    type="text" 
                                    v-model:value="current_user.Name"
                                    placeholder=" "/>
                            </article>
                            <article class="input_block">
                                <span>Отчество</span>
                                <n-input 
                                    @input="() => {updateUser()}"
                                    size="small" 
                                    type="text"
                                    v-model:value="current_user.LastName" 
                                    placeholder=" "/>
                            </article>               
                        </section>
                    </section>
                    <section class="photo" style="z-index: 10; padding: 0px; margin: 0px; background-color: white;">
                        <img v-if="vis_ing" ref="img_block" height="200px" 
                            style=" border-radius: 8px 0px 0px 8px; object-fit: contain;" 
                            :src="'https://s3.twcstorage.ru/136703eb-05e89941-0f10-4e65-b543-d67d43f62dea' + current_user?.Photo + '?t=' + new Date().getTime()">
                        <img v-if="!vis_ing" src="../../../assets/userProfile.svg" 
                            height="200px" style="border-radius: 6px 0px 0px 6px;">
                        <input  @change="(event) => {
                            console.log(event);
                            changeFile(event.target.files[0]);
                        }"  
                        type="file"
                        placeholder=" "></input>
                    </section>
                </section>
            <span class="header">Рабочая информация</span>        
            <section 
                class="info_column_block" 
                style="width: 100%; flex-direction: column; flex: 1 2 3; flex-wrap: wrap; display: flex; height: 300px; width: 900px; align-items: start;">
                <article class="input_block">
                    <span>Роль</span>
                    <n-select 
                        @input="(v) => {updateRole(v)}" 
                        :options="roles.map(el => {return {label:el.name,value:el.id}})" />
                </article>
                <article class="input_block">
                    <span>Пол</span>
                    <n-select 
                        @input="(v) => {console.log('awd')}" 
                        v-model:value="current_user.Sex" 
                        :options="[{label:'Женский',value:'Female'}
                        ,{label:'Мужской',value:'Male'}
                        ,{label:'Не указан',value:''}]" />
                </article>
                <article class="input_block">
                    <span>Дата Рождения</span>
                    <n-input 
                        @input="() => {updateUser()}" 
                        size="small" 
                        type="date"
                        v-model:value="current_user.Birthday" 
                        placeholder=" "/>
                </article>
                <article class="input_block">
                    <span>Город проживания</span>
                    <n-input 
                            @input="() => {updateUser()}"
                            size="small" 
                            type="text"
                            v-model:value="current_user.City" 
                            placeholder=" "/>
                </article>
                <article v-for="contact of current_user.Contacs">
                    <InputContact 
                        @change_contact="updateContact(contact)"
                        :id="contact[0]" :type="contact[1]" v-model="contact[2]">
                    </InputContact>
                </article>
            </section>
            <section class="info_column_block" style="width: 100%;">
                <span class="header">Отпуск</span>
                <section class="info_block" style="width: 100%;">
                    <article style="display: flex; flex-direction: row;" >
                        <article style="display: flex; flex-direction: row; gap: 10px;">
                            <n-input
                            @input="() => {updateUser()}" 
                            v-model:value="current_user.OtpuscStart"
                            @change=""
                            type="date"
                            placeholder=" "
                        /><n-input
                            @input="() => {updateUser()}" 
                            v-model:value="current_user.OtpuscFinish"
                            @change=""
                            type="date"
                            placeholder=" "
                        />
                        </article>
                    </article>
                    <article class="free_input_block" style=''>
                        <span>Комментарий к отпуску</span>
                        <n-input
                            @input="() => {updateUser()}" 
                            v-model:value="current_user.OtpusctText"
                            @change=""
                            type="textarea"
                            placeholder=" "
                        />
                    </article>
                </section>
                <span class="header">Служебная информация</span>
                <section class="info_block" style="width: 100%;">
                    <article class="input_block">
                        <span>Дата принятия на работу</span>
                        <n-input 
                                size="small" 
                                type="date"
                                @input="() => {updateUser()}" 
                                v-model:value="current_user.EmploymentDate" 
                                placeholder=" "/>
                    </article>
                    <!-- <article class="free_input_block">
                        <span>Обязаности</span>
                        <n-select 
                        v-model:value="current_user.roles" 
                        multiple 
                        placeholder=" "
                        :options="roles.map(el => {return {label:el.name,value: el.id}})" />
                    </article> -->
                    <article class="free_input_block" style=''>
                        <span>Примечания</span>
                        <n-input
                            @input="() => {updateUser()}" 
                            v-model:value="current_user.Status"
                            @change=""
                            type="textarea"
                            placeholder=" "
                        />
                    </article>
                </section>
            </section>
        </section>
    </main>
</template>

<style scoped>


.open{
    height: 250px;
    visibility: visible;
}

.activite_block{

}

.info_column_block{
}

.child_block{
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.close{
    height: 20px;
    visibility: hidden;
}

.header{
    font-size: 26px;
    color: black
}

.branch_name{
    color: black
}

span{
    color: #cbcbcb;
}

.infoblock{
    padding: 10px;
    display: flex;
}

article {
    font-size: 16px;
}

.info_block{
    display: flex;
    gap: 20px;
    flex-direction: row; 
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    align-items: start;
    justify-content: start;
    width: 200px;
}

.input_block{
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
}

.free_input_block{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
}

.info_block span{

}

.close_main{
    height: 60px;
}

.open_main{
    height: 250px;
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

input{
    border: 0px;
}

.main_edit{
    background-color: white;
    height: calc(100% - 15px);
    margin-bottom: 10px;
    padding: 20px;
    width: 50%;
}
</style>
