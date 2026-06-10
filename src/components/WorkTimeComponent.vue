<script setup>
import { defineProps } from 'vue'
import EditTimeComponent from './EditTimeComponent.vue';

const emits = defineEmits(['open'])
const props = defineProps(['branch'])

const time_convert = (time) => {
    if (typeof time === 'string') {
        const n_time = new Date(time)
        return n_time.getHours().toString().padStart(2, '0') 
            + ':' 
            + n_time.getMinutes().toString().padStart(2, '0')
    }
    return '—'
}

const has_schedule = (openning, closing) => {
    return openning != null && closing != null
}

const format_time_range = (openning, closing) => {
    if (!has_schedule(openning, closing)) return 'Выходной'
    return time_convert(openning) + ' – ' + time_convert(closing)
}
</script>

<template>
    <div class="work-time">
        <template v-if="!props.branch.edit_time">
            <div class="schedule-row">
                <span class="day-label">Пн — Пт</span>
                <span class="time-value">{{ format_time_range(branch?.monFridayOpenning, branch?.monFridayClosing) }}</span>
            </div>
            
            <div v-if="!props.branch.different" class="schedule-row" :class="{ holiday: branch.close_on_holiday }">
                <span class="day-label">Сб — Вс</span>
                <template v-if="!branch.close_on_holiday">
                    <span class="time-value">{{ format_time_range(branch?.saturdayOpenning, branch?.saturdayClosing) }}</span>
                </template>
                <span v-else class="holiday-label">Выходной</span>
            </div>
            
            <template v-else>
                <div class="schedule-row" :class="{ holiday: !branch.Saturday }">
                    <span class="day-label">Сб</span>
                    <template v-if="branch.Saturday">
                        <span class="time-value">{{ format_time_range(branch?.saturdayOpenning, branch?.saturdayClosing) }}</span>
                    </template>
                    <span v-else class="holiday-label">Выходной</span>
                </div>
                <div class="schedule-row" :class="{ holiday: !branch.Sunday }">
                    <span class="day-label">Вс</span>
                    <template v-if="branch.Sunday">
                        <span class="time-value">{{ format_time_range(branch?.sundayOpenning, branch?.sundayClosing) }}</span>
                    </template>
                    <span v-else class="holiday-label">Выходной</span>
                </div>
            </template>
        </template>
        
        <EditTimeComponent v-else :branch="branch" />
    </div>
</template>

<style scoped>
.work-time {
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.schedule-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: var(--radius-md);
    background: var(--color-bg);
    min-height: 40px;
}

.schedule-row.holiday {
    background: var(--color-error-light);
}

.day-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    min-width: 70px;
}

.time-value {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-variant-numeric: tabular-nums;
}

.holiday-label {
    font-size: var(--font-size-sm);
    color: var(--color-error);
    font-weight: var(--font-weight-semibold);
}
</style>