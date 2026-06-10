<script setup>
import WorkTimeComponent from '@/components/WorkTimeComponent.vue';
import { debug } from '@/utils/debug';

const props = defineProps({
  branch: { type: Object, required: true }
})

debug(props.branch)

const copy = (value) => {
    navigator.clipboard.writeText(value)
        .then(() => debug('Copied'))
        .catch(err => debug('Copy failed', err));
}
</script>

<template>
    <section class="branch-info">
        <h2 class="branch-name">{{ props.branch.name }}</h2>
        
        <div class="info-content">
            <div class="contact-info">
                <article class="info-row" @click="copy(props.branch.adress)">
                    <span class="info-icon">📍</span>
                    <span class="info-value">{{ props.branch.adress || 'Адрес не указан' }}</span>
                </article>

                <article class="info-row" v-if="props.branch.phone">
                    <span class="info-icon">📞</span>
                    <a :href="'tel:' + props.branch.phone" class="info-link">{{ props.branch.phone }}</a>
                </article>
            </div>
            
            <div class="work-time">
                <WorkTimeComponent :branch="props.branch"></WorkTimeComponent>
            </div>
        </div>
    </section>
</template>

<style scoped>
.branch-info {
    background: var(--color-card-bg);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    padding: 16px 20px;
}

.branch-name {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin: 0 0 16px 0;
}

.info-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
}

.info-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background 0.15s;
}

.info-row:hover {
    background: var(--color-hover-bg);
}

.info-icon {
    font-size: 18px;
    flex-shrink: 0;
}

.info-value {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: 1.4;
}

.info-link {
    font-size: var(--font-size-base);
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
}

.info-link:hover {
    text-decoration: underline;
}

.work-time {
    flex-shrink: 0;
    min-width: 180px;
}
</style>