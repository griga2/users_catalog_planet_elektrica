<script setup>
import { defineProps } from 'vue';
import CatalogRow from '@/components/CatalogRow.vue'

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  active_row: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['click_row', 'click_arrow'])
</script>

<template>
  <section class="item-block">
    <article
      class="item-block__row"
      :class="{
        'item-block__row--active': props.active_row?.id === props.row?.id,
        'item-block__row--has-children': props.row?.have_children
      }">
      <button
        v-if="props.row.have_children"
        class="item-block__arrow"
        :class="{ 'item-block__arrow--rotated': props.row?.is_open }"
        @click="() => emit('click_arrow', props.row.id)"></button>
      <span class="item-block__name" @click="() => emit('click_row', props.row)">
        {{ props.row.name }}
      </span>
    </article>
    <section
      v-if="props.row.have_children && props.row.is_open"
      class="item-block__children">
      <article v-for="child in props.row.children" :key="child.id" class="item-block__child">
        <CatalogRow
          :row="child"
          :active_row="active_row"
          :font-size="'20px'"
          @click_row="(value) => emit('click_row', value)"
          @click_arrow="(value) => emit('click_arrow', value)"
        />
      </article>
    </section>
  </section>
</template>

<style scoped>
.item-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
}

.item-block__row {
  width: 100%;
  border-radius: var(--radius-md);
  padding: 8px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: var(--font-family);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  color: var(--color-text);
}

.item-block__row:hover {
  background-color: var(--color-hover-bg);
}

.item-block__row--active {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.item-block__row--has-children {
  font-weight: var(--font-weight-bold);
}

.item-block__arrow {
  width: 20px;
  height: 20px;
  background: url('@/assets/arrow.svg') no-repeat center;
  background-size: contain;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  transition: transform 0.3s ease, opacity 0.2s;
  flex-shrink: 0;
}

.item-block__arrow:hover {
  opacity: 1;
}

.item-block__arrow--rotated {
  transform: rotate(180deg);
}

.item-block__name {
  cursor: pointer;
  user-select: none;
}

.item-block__children {
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-block__child {
  width: 100%;
}
</style>