<template>
    <div class="w-full text-center">
        <img :src="thumbnail" alt="" class="rounded-full max-h-[200px] m-auto">
        <h2 class="text-white font-bold m-3">{{ title }}</h2>
    </div>
</template>

<script>
export default {
    name: "YouTubeChannel",
    props: [ "thumbnail", "title" ],
    mounted(){
        console.log(this.title);
    }
}
</script>

<style>

</style>