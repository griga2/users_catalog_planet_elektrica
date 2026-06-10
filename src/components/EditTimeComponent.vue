<script setup>
import { defineProps } from 'vue'

const props = defineProps(['branch'])
</script>

<template>
    <div class="edit-time">
        <div class="time-row">
            <span class="day-label">Пн — Пт</span>
            <div class="time-inputs">
                <input type="time" v-model="branch.monFridayOpenning" class="time-input" />
                <span class="separator">—</span>
                <input type="time" v-model="branch.monFridayClosing" class="time-input" />
            </div>
        </div>
        
        <template v-if="props.branch.different">
            <div class="time-row">
                <span class="day-label">Сб</span>
                <div class="time-inputs">
                    <input type="time" v-model="branch.saturdayOpenning" class="time-input" />
                    <span class="separator">—</span>
                    <input type="time" v-model="branch.saturdayClosing" class="time-input" />
                    <label class="checkbox-label">
                        <input type="checkbox" v-model="branch.Saturday" />
                        <span>Рабочий</span>
                    </label>
                </div>
            </div>
            <div class="time-row">
                <span class="day-label">Вс</span>
                <div class="time-inputs">
                    <input type="time" v-model="branch.sundayOpenning" class="time-input" />
                    <span class="separator">—</span>
                    <input type="time" v-model="branch.sundayClosing" class="time-input" />
                    <label class="checkbox-label">
                        <input type="checkbox" v-model="branch.Sunday" />
                        <span>Рабочий</span>
                    </label>
                </div>
            </div>
        </template>
        
        <template v-else>
            <div class="time-row">
                <span class="day-label">Сб — Вс</span>
                <div class="time-inputs">
                    <input type="time" v-model="branch.saturdayOpenning" class="time-input" />
                    <span class="separator">—</span>
                    <input type="time" v-model="branch.saturdayClosing" class="time-input" />
                    <label class="checkbox-label">
                        <input type="checkbox" v-model="branch.close_on_holiday" />
                        <span>Выходной</span>
                    </label>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.edit-time {
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: var(--color-card-bg);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-primary-light);
}

.time-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 0;
}

.day-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    min-width: 70px;
}

.time-inputs {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
}

.time-input {
    padding: 6px 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-family: var(--font-family);
    color: var(--color-text);
    background: var(--color-bg);
    transition: border-color 0.2s, box-shadow 0.2s;
}

.time-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

.separator {
    color: var(--color-text-muted);
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--color-primary);
    cursor: pointer;
}
</style>