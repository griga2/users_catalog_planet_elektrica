<script setup>
import { defineProps } from 'vue'

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
  <div class="catalog-row">
    <div class="row-content" :class="{ active: props.active_row?.id === props.row?.id }" @click="() => emit('click_row', props.row)">
      <button v-if="props.row?.have_children" class="arrow-btn" @click.stop="() => emit('click_arrow', props.row.id)">
        <svg class="arrow-icon" :class="{ rotated: props.row?.is_open }" viewBox="0 0 24 24" width="16" height="16">
          <path d="M8 5l6 7 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span v-else class="spacer"></span>
      <span class="row-name">{{ props.row.name }}</span>
    </div>
    
    <transition name="slide">
      <div v-if="props.row?.have_children && props.row?.is_open" class="children">
        <CatalogRow
          v-for="child in props.row.children"
          :key="child.id"
          :row="child"
          :active_row="props.active_row"
          @click_row="(value) => emit('click_row', value)"
          @click_arrow="(value) => emit('click_arrow', value)"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.catalog-row {
  width: 100%;
}

.row-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  min-height: 36px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.row-content:hover {
  background: var(--color-hover-bg);
}

.row-content.active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.row-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spacer {
  width: 16px;
  flex-shrink: 0;
}

.arrow-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  transition: background 0.2s;
}

.arrow-btn:hover {
  background: var(--color-hover-bg);
}

.arrow-icon {
  transition: transform 0.2s ease;
  color: var(--color-text-muted);
}

.arrow-icon.rotated {
  transform: rotate(90deg);
}

.children {
  padding-left: 16px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>