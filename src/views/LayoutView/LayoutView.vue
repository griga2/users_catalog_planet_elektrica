<script setup>
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Breadcrumbs from './components/Breadcrumbs.vue'
import { RouterView, useRoute } from 'vue-router'

const store = useUserStore()
const route = useRoute()
const { user } = storeToRefs(store)

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
</script>

<template>
    <!-- Login Modal -->
    <n-modal v-model:show="open_login" preset="dialog" title="Авторизация">
        <div class="auth-form">
            <n-input v-model:value="login" placeholder="Логин" />
            <n-input v-model:value="pass" type="password" placeholder="Пароль" @keyup.enter="store.Login(login, pass)" />
            <n-button type="primary" block @click="store.Login(login, pass)">Войти</n-button>
        </div>
    </n-modal>

    <!-- Bio Modal -->
    <n-modal v-model:show="open_bio" preset="dialog" title="Изменить описание">
        <n-input v-model:value="bio" type="textarea" placeholder="Описание" :autosize="{ minRows: 3, maxRows: 6 }" />
        <template #action>
            <n-button type="primary" @click="store.UpdateBio(bio, bio)">Сохранить</n-button>
        </template>
    </n-modal>

    <div class="layout">
        <!-- Sidebar -->
        <aside class="sidebar" :class="{ open: active_menu }">
            <div class="sidebar-header">
                <RouterLink to="/catalog" class="logo">
                    <span class="logo-icon">⚡</span>
                    <span class="logo-text">Planet Electrica</span>
                </RouterLink>
            </div>
            
            <nav class="sidebar-nav">
                <template v-for="item in menu_items" :key="item.name">
                    <RouterLink
                        :to="item.path"
                        class="nav-item"
                        :class="{ active: is_active(item.name) }"
                    >
                        <span class="nav-icon">
                            <template v-if="item.icon === 'catalog'">📋</template>
                            <template v-else-if="item.icon === 'struct'">🏗️</template>
                            <template v-else-if="item.icon === 'employees'">👥</template>
                            <template v-else>🔑</template>
                        </span>
                        <span class="nav-label">{{ item.label }}</span>
                    </RouterLink>
                </template>
            </nav>
        </aside>

        <div class="main-wrapper">
            <!-- Header -->
            <header class="header">
                <button class="menu-toggle" @click="active_menu = !active_menu">☰</button>
                <Breadcrumbs />
                <div class="header-actions">
                    <n-button v-if="!user?.name" quaternary @click="open_login = true">
                        <template #icon>🔐</template>
                        Войти
                    </n-button>
                    <div v-else class="user-menu" @click="open_bio = true">
                        <n-avatar round :size="32">{{ user?.name?.charAt(0) }}</n-avatar>
                        <span class="user-name">{{ user?.name }}</span>
                    </div>
                    <n-button v-if="user?.name" quaternary @click="store.userExit()">
                        <template #icon>🚪</template>
                    </n-button>
                </div>
            </header>

            <!-- Main Content -->
            <main class="main-content">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    height: 100vh;
    width: 100%;
}

/* Sidebar */
.sidebar {
    width: var(--sidebar-width);
    background: var(--color-card-bg);
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
    gap: 10px;
    text-decoration: none;
    color: var(--color-text);
}

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
    background: var(--color-card-bg);
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