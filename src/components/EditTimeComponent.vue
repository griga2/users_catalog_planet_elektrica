<script setup>

</script>

<template>
    <main>
        <section class="day_row">
            <span style="width: 150px;">пн - пт</span>
            <n-checkbox></n-checkbox>
            <n-input type="time" placeholder=" "></n-input>
            <n-input type="time" placeholder=" "></n-input>
        </section>
        <section class="day_row">
            <span style="margin-right: 41px;">вс</span>
            <n-checkbox></n-checkbox>
            <n-input type="time" placeholder=" "></n-input>
            <n-input type="time" placeholder=" "></n-input>
        </section>
        <section class="day_row">
            <span style="margin-right: 41px;">сб</span>
            <n-checkbox></n-checkbox>
            <n-input type="time" placeholder=" "></n-input>
            <n-input type="time" placeholder=" "></n-input>
        </section>
    </main>
</template>

<style scoped>

.day_row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    
    padding: 5px;
}

main{
    position: relative;
    width: 500px;
    z-index: 200;
    display: flex;
    gap: 10px;
    border: 1px solid grey;
    border-radius: 10px;
    background-color: white;
}
</style>