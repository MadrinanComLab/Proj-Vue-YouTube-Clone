<template>
    <div id="home_container">
        <!-- REMOVED ATTR IN Header:  :tags="tags" :selected_tag="selected_tag" :fetchVideoByTags="fetchVideoByTags" -->
        <Header :display_tags="true"/>

        <div class="px-[10%] grid grid-cols-4 gap-4" v-if="$store.state.videos.length === 0 && $store.state.error_message === ''">
            <Skeleton :counter="12"/>
        </div>
        <div class="px-[10%] grid grid-cols-4 gap-4" v-else  @scroll="() => console.log('Test')">
            <div v-for="(video, i) in $store.state.videos" :key="i">
                <YouTubeChannel v-if="video.id.kind === 'youtube#channel'" :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title"/>
                <YouTubeVideo v-else :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title" :channel_title="video.snippet.channelTitle"/>
            </div>

            <Skeleton :counter="4"/>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import YouTubeVideo from "@/components/Cards/YouTubeVideo.vue";
import YouTubeChannel from "@/components/Cards/YouTubeChannel.vue";
import Skeleton from "@/components/Cards/Skeleton.vue";

export default {
    name: "Home",
    components: { Header, YouTubeVideo, YouTubeChannel, Skeleton },
    methods:{
    },
    mounted(){
        /** THIS WILL BE USED FOR DETECTING IF THE BOTTOM OF THE PAGE WAS REACHED */
        window.addEventListener("scroll", (e) => this.$store.dispatch("detectBottomPage", { event: e }));

        if(localStorage.getItem("yt_videos")){
            /** IF THE 'yt_videos' IN LOCAL STORAGE IS NOT EMPTY THEN USE THAT VALUE. WE'RE CACHING THE VALUE SINCE THE API CALL IS NOT UNLIMITED. */
            this.$store.commit("saveYouTubeVideos", { reset: true, youtube_videos: JSON.parse(localStorage.getItem("yt_videos")) });
        }
        else{
            /** IF THE 'yt_videos' IN LOCAL STORAGE THEN FETCH THE VIDEOS */
           this.$store.dispatch("fetchYouTubeVideos"); 
        }
    }
};
</script>