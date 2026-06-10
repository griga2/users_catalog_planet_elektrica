<script setup>
import { ref, onMounted, watch } from 'vue';
import { debug } from '@/utils/debug';

const props = defineProps({
    user: { type: Object, required: true }
})
const emits = defineEmits(['click_open_dop', 'click_block'])

const vis_ing = ref(true);
const img_block = ref(null);

const S3_URL = 'https://s3.twcstorage.ru/136703eb-05e89941-0f10-4e65-b543-d67d43f62dea';

const chengevis = () => {
    vis_ing.value = false;
}

onMounted(() => {
    if (img_block.value) {
        img_block.value.onerror = chengevis;
    }
    vis_ing.value = true;
})

watch(() => props.user.Photo, (newVal, oldVal) => {
    if (newVal != oldVal) {
        vis_ing.value = true;
    }
})

const photo_url = S3_URL + props.user?.Photo + '?t=' + new Date().getTime();
</script>

<template>
    <article class="worker-card" @click="emits('click_block')">
        <div class="photo">
            <img v-if="vis_ing" ref="img_block" :src="S3_URL + $props.user?.Photo + '?t=' + new Date().getTime()" @error="chengevis">
            <div v-else class="placeholder">
                {{ props.user?.full_name?.charAt(0) }}
            </div>
        </div>
        <div class="info">
            <h4 class="name">{{ props.user?.full_name }}</h4>
            <span class="role">{{ props.user?.role_name }}</span>
        </div>
    </article>
</template>

<style scoped>
.worker-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s;
    background: var(--color-card-bg);
    border: 1px solid var(--color-border);
}

.worker-card:hover {
    border-color: var(--color-primary);
    background: var(--color-hover-bg);
}

.worker-card.active {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
}

.photo {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: var(--radius-md);
    overflow: hidden;
    background: var(--color-bg);
}

.photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary-light);
    color: var(--color-primary);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-lg);
}

.info {
    flex: 1;
    min-width: 0;
}

.name {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin: 0 0 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.role {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
}
</style>