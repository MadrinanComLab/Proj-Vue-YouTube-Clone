<template>
    <div v-for="i in counter" :key="i" class="animate-pulse">
        <div class="bg-[#252525] w-full h-[180px] rounded-lg mb-3"></div>
        <p class="bg-[#252525] w-11/12 h-[30px] rounded mb-3"></p>
        <p class="bg-[#252525] w-3/4 h-[30px] rounded"></p>
    </div>
</template>

<script>
export default {
    name: "Skeleton",
    props: [ "counter" ],
    mounted(){
        console.log(typeof this.counter);
    }
}
</script>

<style>

</style>