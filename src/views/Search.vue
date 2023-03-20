<template>
    <div id="search_container">
        <Header :display_tags="false"/>

        <!-- px-[10%] -->
        <div class="px-[35%] grid grid-cols-1 gap-2" v-if="$store.state.is_loading && $store.state.error_message === ''">
            <Skeleton :counter="12"/>
        </div>

        <div class="px-[35%] grid grid-cols-1 gap-2" v-else>
            <div v-for="(video, i) in $store.state.videos" :key="i">
                <YouTubeChannel v-if="video.id.kind === 'youtube#channel'" :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title"/>
                <YouTubeVideo v-else :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title" :channel_title="video.snippet.channelTitle"/>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import YouTubeVideo from "@/components/Cards/YouTubeVideo.vue";
import YouTubeChannel from "@/components/Cards/YouTubeChannel.vue";
import Skeleton from "@/components/Cards/Skeleton.vue";

export default {
    name: "Search",
    components: { Header, Skeleton, YouTubeVideo, YouTubeChannel },
    mounted(){
    }
}
</script>
