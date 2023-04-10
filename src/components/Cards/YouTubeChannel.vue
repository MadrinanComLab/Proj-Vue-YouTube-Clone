<template>
    <div class="w-full text-center">
        <!--/ Reference for rendering HTML entities in Vue: https://stackoverflow.com/questions/46756802/vue-js-auto-convert-html-and-unicode-entities /-->
        <img :src="thumbnail" alt="" class="rounded-full max-h-[200px] m-auto">
        <h2 class="text-white font-bold m-3" v-html="title"></h2>
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