<template>

    <!--/ Reference for rendering HTML entities in Vue: https://stackoverflow.com/questions/46756802/vue-js-auto-convert-html-and-unicode-entities /-->
    <router-link :to="`/watch?v=${ video_id }`" @click="handleSelectedVideo(title)">
        <div class="w-full grid grid-container grid-cols-7 gap-4">
            <img :class="`w-full min-h-[${thumbnail_height}] mb-2 col-span-3`" :src="thumbnail" alt="">
            <div class="col-span-4">
                <h3 class="text-white font-bold text-sm" v-html="title"></h3>
                <p class="text-[#888] text-xs" v-html="channel_title"></p>
                <p class="text-[#888] text-sm mt-3" v-if="show_description" v-html="description"></p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "VideoResult",
    props: [ "thumbnail", "title", "channel_title", "video_id", "description", "show_description", "thumbnail_height", "changeSelectedVideo" ],
    methods: {
        handleSelectedVideo(video_title){
            //TODO: This same function was also used in Home component. Move this on the Vuex store later...
            /** Save the title of selected video in the store */
            this.$store.commit("setVideoTitle", video_title);

            this.changeSelectedVideo(this.video_id);
        }
    }
}
</script>