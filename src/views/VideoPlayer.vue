<template>
    <div id="video_player_container">
        <Header :display_tags="false"/>

        <div class="px-[10%] grid grid-container grid-cols-7 gap-4">
            <div class="col-span-5">
                <!--/
                Reference for accessing the video:
                * https://stackoverflow.com/questions/26046567/youtube-api-get-a-video
                * https://developers.google.com/youtube/iframe_api_reference
                /-->
                <iframe className="w-full h-[500px]" :src="`http://www.youtube.com/embed/${ selected_video_id }?enablejsapi=1&origin=http://example.com`"></iframe>

                <!-- Comment section -->
            </div>

            <div class="col-span-2 grid grid-cols-1 gap-2">
                <div v-for="(video, i) in $store.state.videos" :key="i">
                    <!-- Used different component for this. The other suggested videos are displayed differently -->
                    <YouTubeChannel v-if="video.id.kind === 'youtube#channel'" :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title"/>
                    <VideoResult v-else :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title" :channel_title="video.snippet.channelTitle" :video_id="video.id.videoId" :show_description="false"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Skeleton from "@/components/Cards/Skeleton.vue";
import VideoResult from "@/components/Cards/VideoResult.vue";
import YouTubeChannel from "@/components/Cards/YouTubeChannel.vue";

export default {
    name: "VideoPlayer",
    components: { Header, Skeleton, VideoResult, YouTubeChannel },
    data() {
        return {
            /** This variable was declared for better readability */
            selected_video_id: this.$route.query.v
        }
    },
    mounted(){
        // this.selected_video_id = this.$route.query.v;
    }
}
</script>