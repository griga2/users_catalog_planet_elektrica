<script setup>
import Breadcrumbs from './components/Breadcrumbs.vue';
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '../../stores/user.js'
import { computed, onMounted, ref} from 'vue'
import { storeToRefs } from 'pinia';
import Button from 'naive-ui/es/button/src/Button';
import LoginModal from '../../components/LoginModel.vue'
const store = useUserStore();
const {
  user,
} = storeToRefs(store); 

    onMounted(async () => {
        await store.getUser();
        //   if (user.value) 
    })
    const pass = ref('')
    const login = ref('')
    const bio = ref('')
    const open_model = ref(false)
    const open_bio_modal = ref(false)

</script>

<template>
    <section >
        <n-modal class="modal_layout" v-model:show="open_model" >
            <n-card
                style="width: 600px; gap: 20px; justify-content: center; align-items: center;"
                title="Авторизация"
                :bordered="false"
                size="huge"
                role="dialog"
                aria-modal="true"
            >

                <n-input 
                    v-model:value="login"
                    type="text"
                    style  = "margin: 10px;"
                    placeholder="Логин">
                </n-input>

                <n-input
                    v-model:value="pass"
                    type="text"
                    style  = "margin: 10px;"
                    placeholder="Пароль">
                </n-input>
                <n-button @click="() => {store.Login(login,pass); open_model= !open_model}" style="width: 200px; margin-left: 30%; margin-right: auto;">
                    Войти
                </n-button >
        
            </n-card>
        </n-modal>
    </section>
    <section>
        <n-modal class="modal_layout" v-model:show="open_bio_modal">
        <n-card
            style="width: 600px"
            title="Измениене личного описания"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >

        <n-input 
            v-model:value="bio"
            type="textarea" style="width: 600px; font-size: 22px;"
            placeholder="Описание">
        </n-input>
        
        <n-button @click="store.UpdateBio(bio, bio)">
            Сохранить
        </n-button >
    
        </n-card>
        </n-modal>
    </section>
    <section class="back_color">
        <header class="header">
            <Breadcrumbs></Breadcrumbs>
            
            <span v-if="user?.name" @click="open_bio_modal = true" style="width: 250px; background-color:">{{ user?.name }}</span>
            <Button class="exit_inter_bt" v-if="!user?.name" @click="open_model = true" > Войти</Button>
            <Button class="exit_inter_bt" v-if="user?.name" @click="store.userExit()" > Выйти</Button> 
        </header>
    </section>  
    <main class="main">
        <RouterView/>
    </main>
</template>

<style scoped>

.exit_inter_bt{
    font-style: 22px;
    font-weight: 500;
}

.main{
    width: 100%; 
    height: calc(100% - 50px);
    background-color: #ebebeb;
    padding-top: 10px;
    padding-left: 10%;
    padding-right: 10%;
}

.header {
    height: 50px;
    background-color: white;
    padding: 20px 14% 20px 13%;
    margin: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
     align-items: center;
}

.back_color{
    background-color: #ebebeb;
}

.modal_layout{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    padding: 10px;
} 

</style>