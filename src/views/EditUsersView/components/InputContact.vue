<script setup>
    import { defineProps, defineModel, defineEmits } from 'vue';
    
    const props = defineProps({
        type: { type: String, required: true }
    });
    
    const model = defineModel();
    const emits = defineEmits(['change_contact']);
    
    const SwithTitle = () => {
        switch(props.type) {
            case 'mPhone': return 'Личный телефон';
            case 'email': return 'Email';
            case 'workPhone': return 'Рабочий телефон';
            default: return 'Контактная информация'
        }
    }
</script>

<template>
    <div class="input-contact">
        <label class="input-contact__label">{{ SwithTitle() }}</label>
        <n-input 
            placeholder=" "
            v-model:value="model"
            @input="() => {emits('change_contact')}" 
            size="small"
            class="input-contact__input">
        </n-input>
    </div>
</template>
    
<style scoped>
.input-contact {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
}

.input-contact__label {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

.input-contact__input {
    width: 100%;
}
</style>