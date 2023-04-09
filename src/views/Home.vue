<template>
    <div id="home_container">
        <!-- REMOVED ATTR IN Header:  :tags="tags" :selected_tag="selected_tag" :fetchVideoByTags="fetchVideoByTags" -->
        <Header :display_tags="true"/>

        <div class="px-[10%] grid grid-cols-4 gap-4" v-if="$store.state.is_loading && $store.state.error_message === ''">
            <Skeleton :counter="12" :orientation="constants.VERTICAL"/>
        </div>
        <div class="px-[10%] grid grid-cols-4 gap-4" v-else>
            <div v-for="(video, i) in $store.state.videos" :key="i">
                <YouTubeChannel v-if="video.id.kind === 'youtube#channel'" :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title"/>
                <YouTubeVideo v-else :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title" :channel_title="video.snippet.channelTitle" :video_id="video.id.videoId"/>
            </div>

            <Skeleton :counter="4" :orientation="constants.VERTICAL"/>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import YouTubeVideo from "@/components/Cards/YouTubeVideo.vue";
import YouTubeChannel from "@/components/Cards/YouTubeChannel.vue";
import Skeleton from "@/components/Cards/Skeleton.vue";
import constants from "@/config/constants";

export default {
    name: "Home",
    components: { Header, YouTubeVideo, YouTubeChannel, Skeleton },
    data(){
        return {
            constants: constants
        }
    },
    mounted(){
        /* This will be used for detecting if the bottom of the page was reached */
        window.addEventListener("scroll", (e) => this.$store.dispatch("detectBottomPage", { event: e }));

        /* Get the cached video */
        this.$store.dispatch("getCachedVideos");
    }
};
</script>