<template>
    <!-- <div class="w-full">
        <router-link :to="`/watch?v=${ video_id }`" @click="handleSelectedVideo(title)">
            <img class="w-full min-h-[245px] mb-2" :src="thumbnail" alt="">
            <h2 class="text-white font-bold" v-html="title"></h2>
            <p class="text-[#888] text-sm" v-html="channel_title"></p>
        </router-link>
    </div> -->

    <!--/ Reference for rendering HTML entities in Vue: https://stackoverflow.com/questions/46756802/vue-js-auto-convert-html-and-unicode-entities /-->
    <router-link :to="`/watch?v=${ video_id }`" @click="handleSelectedVideo(title)">
        <div class="w-full grid grid-container grid-cols-7 gap-4">
            <img class="w-full min-h-[170px] mb-2 col-span-3" :src="thumbnail" alt="">
            <div class="col-span-4">
                <h2 class="text-white font-bold" v-html="title"></h2>
                <p class="text-[#888] text-sm" v-html="channel_title"></p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "VideoResult",
    props: [ "thumbnail", "title", "channel_title", "video_id" ],
    methods: {
        handleSelectedVideo(video_title){
            /** Save the title of selected video in the store */
            this.$store.commit("setVideoTitle", video_title);
        }
    }
}
</script>