<template>
    <div id="search_container">
        <Header :display_tags="false"/>

        <!-- px-[10%] -->
        <div class="px-[25%] grid grid-cols-1 gap-2" v-if="$store.state.is_loading && $store.state.error_message === ''">
            <Skeleton :counter="12" :orientation="constants.HORIZONTAL" :show_description="true"/>
        </div>

        <div class="px-[25%] grid grid-cols-1 gap-2" v-else>
            <div v-for="(video, i) in $store.state.videos" :key="i">
                <YouTubeChannel v-if="video.id.kind === 'youtube#channel'" :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title"/>
                <VideoResult v-else :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title" :channel_title="video.snippet.channelTitle" :video_id="video.id.videoId" :description="video.snippet.description" :show_description="true" :thumbnail_height="'160px'"/>
            </div>

            <Skeleton :counter="1" :show_description="true"/>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import VideoResult from "@/components/Cards/VideoResult.vue";
import YouTubeChannel from "@/components/Cards/YouTubeChannel.vue";
import Skeleton from "@/components/Cards/Skeleton.vue";
import constants from "@/config/constants";

export default {
    name: "Search",
    components: { Header, Skeleton, VideoResult, YouTubeChannel },
    data(){
        return {
            constants: constants
        }
    },
    mounted(){
        /** This will be used for detecting if the bottom of the page was reached */
        window.addEventListener("scroll", (e) => this.$store.dispatch("detectBottomPage", { event: e }));
        
        /* Get the cached video */
        this.$store.dispatch("getCachedVideos");
    }
}
</script>
