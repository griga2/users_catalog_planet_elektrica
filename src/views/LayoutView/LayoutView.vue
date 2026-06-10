<script setup>
import Breadcrumbs from './components/Breadcrumbs.vue';
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '../../stores/user.js'
import { computed, onMounted, ref} from 'vue'
import { storeToRefs } from 'pinia';
import Button from 'naive-ui/es/button/src/Button';
// import LoginModal from '../'
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

onMounted(async () => {
    await store.getUser()
})

const login = ref('')
const pass = ref('')
const bio = ref('')
const open_login = ref(false)
const open_bio = ref(false)
const active_menu = ref(false)

const menu_items = computed(() => [
    { name: 'catalog', label: 'Справочник', icon: 'catalog', path: '/catalog' },
    { name: 'editor', label: 'Структура', icon: 'struct', path: '/edit_struct' },
    { name: 'edit_workers', label: 'Сотрудники', icon: 'employees', path: '/edit_workers' },
    { name: 'edit_roles', label: 'Роли', icon: 'roles', path: '/edit_roles' }
])

const is_active = (name) => route.name === name
const requires_auth = (name) => ['editor', 'edit_workers', 'edit_roles'].includes(name)
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
    height: 100vh;
    width: 100%;
}

/* Sidebar */
.sidebar {
    width: var(--sidebar-width);
    background: var(--color-sidebar-bg);
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s;
    flex-shrink: 0;
}

.sidebar-header {
    padding: 20px;
    border-bottom: 1px solid var(--color-border);
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

.logo-icon {
    font-size: 24px;
}

.logo-text {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
}

.sidebar-nav {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: var(--radius-lg);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    transition: all 0.15s;
}

.nav-item:hover {
    background: var(--color-hover-bg);
    color: var(--color-text);
}

.nav-item.active {
    background: var(--color-primary);
    color: white;
    font-weight: var(--font-weight-semibold);
}

.nav-icon {
    font-size: 18px;
}

/* Main wrapper */
.main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* Header */
.header {
    height: var(--header-height);
    background: var(--color-header-bg);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 16px;
    flex-shrink: 0;
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    border-radius: var(--radius-md);
}

.menu-toggle:hover {
    background: var(--color-hover-bg);
}

.header-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
}

.user-menu {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: var(--radius-lg);
    transition: background 0.15s;
}

.user-menu:hover {
    background: var(--color-hover-bg);
}

.user-name {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
}

/* Main content */
.main-content {
    flex: 1;
    background: var(--color-bg);
    overflow: auto;
    padding: 24px;
}

/* Auth form */
.auth-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 8px 0;
}

/* Responsive */
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        height: 100%;
        z-index: 100;
        transform: translateX(-100%);
    }
    
    .sidebar.open {
        transform: translateX(0);
    }
    
    .menu-toggle {
        display: block;
    }
    
    .user-name {
        display: none;
    }
}
</style>