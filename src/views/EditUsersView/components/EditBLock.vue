<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import { debug } from '@/utils/debug';
const props = defineProps({
    row: { type: Object, required: true },
    active_row: { type: Number, required: true }
})
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
    store.getRoles();
    img_block.value.onerror = chengevis;
    vis_ing.value = true;
})

const updateUser = () => {
    store.updateUser();
}

const timeAutID = ref('')

const updateContact = (contact) => {
    clearTimeout(timeAutID.value);
    timeAutID.value = setTimeout(async() => {
        debug('update branch')
        store.UpdateContact(contact)
    }, 500);
}

const changeFile = async (file) => {
    debug(file);
    await store.uploadFile(file);
    vis_ing.value = true;
}

const updateRole = async (role) => {
    current_user.value.Role = role;
    store.updateUserRole();
}

const chengevis = () => {
    vis_ing.value = false;
}

const img_block = ref(null)
const vis_ing = ref(true);

const firstDayStart = () => {
    store.firstDayStart();
}

const removeUser = () => {
    store.removeUserStart();
}

const hiringEmployer = () => {
    store.hiringEmployer()
}

</script>

<template>
    <main class="edit-block">
        <section class="actions-bar">
            <button class="action-btn action-btn--hire" @click="hiringEmployer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Принять на работу
            </button>
            <button class="action-btn action-btn--start" @click="firstDayStart">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8l4 4L14 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Первый рабочий день
            </button>
            <button class="action-btn action-btn--dismiss" @click="removeUser">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Уволить
            </button>
        </section>

        <section class="edit-content">
            <section class="edit-main">
                <section class="general-info">
                    <h3 class="section-title">Общая информация</h3>
                    <section class="info-grid">
                        <article class="input-group">
                            <label class="input-label">Фамилия</label>
                            <n-input
                                @input="() => {updateUser()}" 
                                size="small" 
                                type="text"
                                v-model:value="current_user.LastName" 
                                placeholder=" "/>
                        </article>
                        <article class="input-group">
                            <label class="input-label">Имя</label>
                            <n-input size="small" 
                                @input="() => {updateUser()}"
                                type="text" 
                                v-model:value="current_user.Name"
                                placeholder=" "/>
                        </article>
                        <article class="input-group">
                            <label class="input-label">Отчество</label>
                            <n-input 
                                @input="() => {updateUser()}"
                                size="small" 
                                type="text"
                                v-model:value="current_user.MidName" 
                                placeholder=" "/>
                        </article>
                        <article class="input-group">
                            <label class="input-label">Дата рождения</label>
                            <n-input 
                                @input="() => {updateUser()}" 
                                size="small" 
                                type="date"
                                v-model:value="current_user.Birthday" 
                                placeholder=" "/>
                        </article>
                        <article class="input-group">
                            <label class="input-label">Город проживания</label>
                            <n-input 
                                @input="() => {updateUser()}"
                                size="small" 
                                type="text"
                                v-model:value="current_user.City" 
                                placeholder=" "/>
                        </article>
                        <article class="input-group">
                            <label class="input-label">Пол</label>
                            <n-select
                                @input="(v) => {debug('awd')}"
                                v-model:value="current_user.Sex"
                                :options="[{label:'Женский',value:'Female'}
                                ,{label:'Мужской',value:'Male'}
                                ,{label:'Не указан',value:''}]" />
                        </article>
                    </section>
                </section>

                <section class="work-info">
                    <h3 class="section-title">Рабочая информация</h3>
                    <section class="info-grid">
                        <article class="input-group">
                            <label class="input-label">Роль</label>
                            <n-select 
                                @input="(v) => {updateRole(v)}" 
                                v-model:value="current_user.role.id"
                                :options="roles.map(el => {return {label:el.name,value:el.id}})" />
                        </article>
                        <article v-for="contact of current_user.Contacts" :key="contact[0]" class="input-group">
                            <InputContact 
                                @change_contact="updateContact(contact)"
                                :id="contact[0]" :type="contact[1]" v-model="contact[2]">
                            </InputContact>
                        </article>
                    </section>
                </section>

                <section class="leave-info">
                    <h3 class="section-title">
                        Отпуск
                        <n-checkbox v-model:checked="current_user.OnLeave"
                            @click="updateUser()"/>
                    </h3>
                    <section class="info-grid" v-if="current_user.OnLeave">
                        <article class="date-range">
                            <n-input
                                v-model:value="current_user.LeaveStart"
                                @change="updateUser()"
                                type="date"
                                placeholder="Начало"
                            />
                            <n-input
                                v-model:value="current_user.LeaveFinish"
                                @change="updateUser()"
                                type="date"
                                placeholder="Окончание"
                            />
                        </article>
                        <article class="input-group full-width">
                            <label class="input-label">Комментарий к отпуску</label>
                            <n-input
                                @input="() => {updateUser()}" 
                                v-model:value="current_user.LeaveText"
                                @change=""
                                type="textarea"
                                placeholder=" "
                            />
                        </article>
                    </section>
                </section>

                <section class="service-info">
                    <h3 class="section-title">Служебная информация</h3>
                    <section class="info-grid">
                        <article class="input-group">
                            <label class="input-label">Дата принятия на работу</label>
                            <n-input 
                                size="small" 
                                type="date"
                                @input="() => {updateUser()}" 
                                v-model:value="current_user.EmploymentDate" 
                                placeholder=" "/>
                        </article>
                        <article class="input-group full-width">
                            <label class="input-label">Примечания</label>
                            <n-input
                                @input="() => {updateUser()}" 
                                v-model:value="current_user.Bio"
                                @change=""
                                type="textarea"
                                placeholder=" "
                            />
                        </article>
                    </section>
                </section>
            </section>

            <aside class="edit-sidebar">
                <div class="photo-container">
                    <img v-if="vis_ing" ref="img_block" class="user-photo"
                        :src="'https://s3.twcstorage.ru/136703eb-05e89941-0f10-4e65-b543-d67d43f62dea' + current_user?.Photo + '?t=' + new Date().getTime()"
                        alt="Фото сотрудника">
                    <img v-if="!vis_ing" src="../../../assets/userProfile.svg" class="user-photo user-photo--placeholder"
                        alt="Фото не загружено">
                </div>
                <label class="file-upload">
                    <input class="file-upload__input" type="file"
                        @change="(event) => {
                            debug(event);
                            changeFile(event.target.files[0]);
                        }"  
                        accept="image/*">
                    <span class="file-upload__text">Загрузить фото</span>
                </label>
            </aside>
        </section>
    </main>
</template>

<style scoped>
.edit-block {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    background: var(--color-card-bg);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    padding: var(--spacing-lg);
    height: 100%;
    overflow-y: auto;
}

.actions-bar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
}

.action-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all 0.2s;
    font-family: var(--font-family);
}

.action-btn--hire {
    background: var(--color-success);
    color: white;
}

.action-btn--hire:hover {
    background: #059669;
}

.action-btn--start {
    background: var(--color-primary);
    color: white;
}

.action-btn--start:hover {
    background: var(--color-primary-hover);
}

.action-btn--dismiss {
    background: var(--color-error);
    color: white;
}

.action-btn--dismiss:hover {
    background: #DC2626;
}

.edit-content {
    display: flex;
    gap: var(--spacing-lg);
}

.edit-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    min-width: 0;
}

.edit-sidebar {
    width: 220px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
}

.section-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin: 0 0 var(--spacing-md) 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--spacing-md);
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.input-group.full-width {
    grid-column: 1 / -1;
}

.input-label {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

.photo-container {
    width: 100%;
    aspect-ratio: 3/4;
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--color-border);
    background: var(--color-surface-hover);
}

.user-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-photo--placeholder {
    object-fit: contain;
    padding: var(--spacing-md);
}

.file-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
    text-align: center;
}

.file-upload:hover {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
}

.file-upload__input {
    display: none;
}

.file-upload__text {
    font-size: var(--font-size-xs);
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
}

.date-range {
    display: flex;
    gap: var(--spacing-sm);
    align-items: center;
}

.date-range > * {
    flex: 1;
}
</style>