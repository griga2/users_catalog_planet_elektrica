<script setup>
import { onMounted, ref } from 'vue';
import { useWorkerStore } from '../../../stores/index'
import { debug } from '@/utils/debug'
const store = useWorkerStore();

const date = ref();
const open = ref(false);
const inputText = ref('')

const serch_focus = ref(null)

const clickLupa = () => {
    if (inputText.value != "") {
        store.SearchUser(inputText.value, !open.value, JSON.stringify(date.value));
    } else {
        debug('click lupa', serch_focus.value)
        serch_focus.value.focus();
    }
    
}

onMounted(() => {
    // const startDate = new Date();
    // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    // date.value = [startDate, endDate];
})

const input = (event) => {
             debug('search')
             store.SearchUser(event.target.value, !open.value, JSON.stringify(date.value));
        }

</script>

<template>
    <section class="search-bar">
       <button class="search-icon-btn" @click="clickLupa()">
           <img src="../../../assets/lupa.svg" alt="Поиск" :height="20"> 
       </button>
       <input ref="serch_focus"
       @change="(event) => input(event)" 
       v-model="inputText"
       type="text"
       placeholder="Поиск сотрудников..." />
       <VueDatePicker v-if="open" v-model="date" range 
       :enable-time-picker="false"
       :format="'dd.MM.yyyy'"
       class="date-picker"
       @update:model-value="() => {
        debug('chenge');
        input({target:{value:inputText}});
       }"/>
       <button class="calendar-icon-btn" @click="open = !open">
           <img src="../../../assets/calender.svg" alt="Календарь" :height="20"> 
       </button>
    </section>
</template>

<style scoped>
.search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 16px;
    background: var(--color-card-bg);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    height: 48px;
}

.search-bar:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

.search-icon-btn,
.calendar-icon-btn {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    transition: background 0.2s;
}

.search-icon-btn:hover,
.calendar-icon-btn:hover {
    background: var(--color-hover-bg);
}

.search-icon-btn img,
.calendar-icon-btn img {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

input {
    border: none;
    flex: 1;
    font-size: var(--font-size-base);
    font-family: 'Circe', sans-serif;
    color: var(--color-text);
    background: transparent;
    padding: 0;
    margin: 0;
}

input::placeholder {
    color: var(--color-text-muted);
}

input:focus {
    outline: none;
}

.date-picker {
    margin-left: 8px;
}

.date-picker :deep(.dp__input) {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 4px 8px;
    font-size: var(--font-size-sm);
    height: 32px;
}
</style>