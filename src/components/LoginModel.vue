<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user.js'

const store = useUserStore()

const login = ref('')
const pass = ref('')
const open_model = ref(false)

const handleLogin = () => {
  if (login.value && pass.value) {
    store.Login(login.value, pass.value)
    open_model.value = false
  }
}
</script>

<template>
  <n-modal class="modal_layout" v-model:show="open_model">
    <n-card
      style="width: 600px"
      title="Авторизация"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-input 
        v-model:value="login"
        type="text"
        placeholder="Логин"
      />

      <n-input
        v-model:value="pass"
        type="password"
        placeholder="Пароль"
      />
      <n-button @click="handleLogin">
        Войти
      </n-button >
    </n-card>
  </n-modal>
</template>

<style scoped>
.modal_layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}
</style>