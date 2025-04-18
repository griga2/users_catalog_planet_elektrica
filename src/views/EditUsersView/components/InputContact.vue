<script setup>
    import { defineProps, defineModel, onMounted, ref,defineEmits } from 'vue';
    const props = defineProps(['id','type','target_value']);
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

    onMounted(() => {
        console.log(props.target_value);
    })
</script>

<template>
    <main class="input_block">
        <span>{{ SwithTitle() }}</span>
        <n-input 
            placeholder=" "
            v-model:value="model"
            @input="() => {emits('change_contact')}" 
            class="main">
        </n-input>
    </main>
</template>
    
<style scoped>

main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
}

.input_block{
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
}
.input_block span{
    color: #cbcbcb;
}

</style>