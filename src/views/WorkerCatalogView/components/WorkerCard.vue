<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import IconContact from './IconContact.vue'
import { debug } from '@/utils/debug'
import { storeToRefs } from 'pinia'
import {useWorkerStore} from '../../../stores/index.js'

const store = useWorkerStore()
const { finding } = storeToRefs(store)

const props = defineProps({
  user: { type: Object, required: true }
})
const emits = defineEmits(['click_open_dop', 'click', 'click_dep'])

const vis_ing = ref(true)
const img_block = ref(null)

const S3_URL = 'https://s3.twcstorage.ru/136703eb-05e89941-0f10-4e65-b543-d67d43f62dea'

const copy = (value) => {
    navigator.clipboard.writeText(value)
        .then(() => debug('Copied'))
        .catch(err => debug('Copy failed', err))
}

const GetBirthdayday = (_date) => {
    if (!_date) return '—'
    const date = new Date(_date)
    return date?.getDate().toString().padStart(2,'0') + '.' + (date?.getMonth() + 1).toString().padStart(2,'0')
}

const openMailClient = (email) => {
    window.location.href = "mailto:" + email
}

const chechInleave = () => {
    const nowDate = new Date()
    if (props.user.LeaveStart && props.user.LeaveFinish) {
        return Date.parse(props.user.LeaveStart) < nowDate && Date.parse(props.user.LeaveFinish) > nowDate
    }
    return false
}

const isError = () => {
    vis_ing.value = false
}

onMounted(() => {
    if (img_block.value) {
        img_block.value.onerror = isError
    }
    vis_ing.value = true
})

const main_contact = ['workPhone','email']
</script>

<template>
    <article class="worker-card" :class="{ 'on-leave': chechInleave() }">
        <div class="card-left">
            <div class="photo-wrapper">
                <img v-if="vis_ing" ref="img_block" class="photo" :src="S3_URL + $props.user?.Photo + '?t=' + new Date().getTime()" @error="isError">
                <div v-else class="photo-placeholder">
                    <span class="initials">{{ $props.user?.full_name?.charAt(0) }}</span>
                </div>
                <span v-if="chechInleave()" class="status-badge on-vacation">В отпуске</span>
            </div>
        </div>
        
        <div class="card-content">
            <div class="card-header">
                <div>
                    <h3 class="name">{{ props.user?.full_name }}</h3>
                    <span class="role">{{ props.user?.role?.name }}</span>
                </div>
                <span v-if="props.user?.number" class="employee-number">#{{ props.user?.number }}</span>
            </div>
            
            <article v-if="finding && props.user?.DepartamentID" class="dept-row" @click="emits('click_dep', { depID: props.user?.DepartamentID, userID: props.user.ID })">
                <span class="contact-icon">🏢</span>
                <span class="dept-name">{{ props.user?.department_name }}</span>
            </article>
            
            <div class="contacts-row">
                <template v-for="contact of props.user.Contacs" :key="contact[1]">
                    <a v-if="main_contact.includes(contact[1]) && contact[0] && contact[2] != ''" class="contact-link" :href="contact[1] === 'email' ? 'mailto:' + contact[2] : 'tel:' + contact[2]">
                        <IconContact :value="contact[1]"></IconContact>
                        <span class="contact-value">{{ contact[2] }}</span>
                    </a>
                </template>
            </div>
            
            <a v-if="props.user?.Birthday" class="birthday-link">
                <span class="contact-icon">🎂</span>
                <span>{{ GetBirthdayday(props.user?.Birthday) }}</span>
            </a>
            
            <p v-if="props.user?.Bio" class="bio">{{ props.user?.Bio }}</p>
            
            <div v-if="chechInleave()" class="leave-info">
                <span class="leave-dates">
                    {{ $props.user.LeaveStart?.substring(5, 10) }} — {{ $props.user.LeaveFinish?.substring(5, 10) }}
                </span>
                <span v-if="$props.user.LeaveText" class="leave-text">{{ $props.user.LeaveText }}</span>
            </div>
        </div>
    </article>  
</template>

<style scoped>
.worker-card {
    display: flex;
    background: var(--color-card-bg);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    overflow: hidden;
    transition: all 0.2s;
    min-height: 140px;
}

.worker-card:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
}

.worker-card.on-leave {
    border-left: 3px solid var(--color-warning);
}

.card-left {
    flex-shrink: 0;
    width: 120px;
    background: var(--color-bg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.photo-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
}

.photo {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-lg);
    object-fit: cover;
}

.photo-placeholder {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-lg);
    background: var(--color-primary-light);
    display: flex;
    align-items: center;
    justify-content: center;
}

.initials {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
}

.status-badge {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    font-size: 10px;
    font-weight: var(--font-weight-semibold);
    white-space: nowrap;
}

.status-badge.on-vacation {
    background: var(--color-warning);
    color: white;
}

.card-content {
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
}

.card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
}

.name {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    line-height: 1.2;
    margin: 0;
}

.role {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
}

.employee-number {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    font-weight: var(--font-weight-semibold);
    white-space: nowrap;
}

.dept-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background 0.15s;
}

.dept-row:hover {
    background: var(--color-hover-bg);
}

.dept-name {
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
}

.contacts-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.contact-link {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.15s;
}

.contact-link:hover {
    color: var(--color-primary);
}

.birthday-link {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
}

.contact-icon {
    font-size: var(--font-size-base);
}

.contact-value {
    font-variant-numeric: tabular-nums;
}

.bio {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.leave-info {
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    background: var(--color-warning-light);
    border-radius: var(--radius-md);
    margin-top: auto;
}

.leave-dates {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-warning);
}

.leave-text {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin-top: 4px;
}
</style>