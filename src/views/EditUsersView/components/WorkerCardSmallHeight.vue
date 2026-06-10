<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import { debug } from '@/utils/debug';

const props = defineProps({
    user: { type: Object, required: true }
})

const emits = defineEmits(['click_open_dop', 'click_block'])

const copy = (value) => {
    navigator.clipboard.writeText(value).catch(err => debug('Copy failed', err));
}

const GetBirthdayday = (_date) => {
    const date = new Date(_date)
    return date?.getDate() + '.' + (date?.getMonth() + 1);
}

const openMailClient = (email) => {
    window.location.href = "mailto:" + email;
}

const chengevis = () => {
    vis_ing.value = false;
}

const img_block = ref(null)
const vis_ing = ref(true);

onMounted(() => {
    img_block.value.onerror = chengevis;
    vis_ing.value = true;
})

watch(() => props.user.Photo, async (newVal, oldVal) => {
    if (newVal != oldVal) {
        vis_ing.value = true;
    }
})
</script>

<template>
    <section class="worker-card-small">
        <section class="worker-card-small__content">
            <section class="worker-card-small__photo">
                <img 
                    v-if="vis_ing" ref="img_block" class="worker-card-small__img"
                    :src="'https://s3.twcstorage.ru/136703eb-05e89941-0f10-4e65-b543-d67d43f62dea' + $props.user?.Photo + '?t=' + new Date().getTime()"
                    alt="Фото сотрудника">
                <img v-if="!vis_ing" src="../../../assets/userProfile.svg" class="worker-card-small__img worker-card-small__img--placeholder" alt="Фото не загружено">
            </section>
            <section class="worker-card-small__info">
                <h2 class="worker-card-small__name">{{props.user?.full_name}}</h2>
                <span class="worker-card-small__role">{{props.user?.role_name}}</span>
            </section>
        </section>
    </section>
</template>

<style scoped>
.worker-card-small {
    border-radius: var(--radius-lg);
    background: var(--color-card-bg);
    border: 1px solid var(--color-border);
    transition: all 0.2s;
    cursor: pointer;
    overflow: hidden;
}

.worker-card-small:hover {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-sm);
}

.worker-card-small.active {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-light);
}

.worker-card-small__content {
    display: flex;
    flex-direction: row;
    align-items: stretch;
}

.worker-card-small__photo {
    width: 80px;
    height: 100px;
    background: var(--color-secondary-light);
    flex-shrink: 0;
    overflow: hidden;
}

.worker-card-small__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.worker-card-small__img--placeholder {
    object-fit: contain;
    padding: var(--spacing-sm);
}

.worker-card-small__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--spacing-md);
    min-width: 0;
}

.worker-card-small__name {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-base);
    color: var(--color-text);
    margin: 0 0 4px 0;
    overflow-wrap: break-word;
}

.worker-card-small__role {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.025em;
}
</style>