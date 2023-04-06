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
                <iframe className="w-full h-[500px] mb-3" :src="`http://www.youtube.com/embed/${ selected_video_id }?enablejsapi=1&origin=http://example.com`"></iframe>
                <h2 class="text-white text-xl font-bold mb-3" v-html="selected_video_object.snippet?.title"></h2>
                <p v-html="selected_video_object.snippet?.description" class="bg-[#272727] text-white p-2 rounded-md"></p>
                <!-- Comment section -->
            </div>

            <div class="col-span-2 grid grid-cols-1 gap-2">
                <div v-for="(video, i) in $store.state.videos" :key="i">
                    <!-- Used different component for this. The other suggested videos are displayed differently -->
                    <YouTubeChannel v-if="video.id.kind === 'youtube#channel'" :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title"/>
                    <VideoResult v-else-if="video.id.videoId !== selected_video_id" :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title" :channel_title="video.snippet.channelTitle" :video_id="video.id.videoId" :show_description="false"/>
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
            selected_video_id: this.$route.query.v,
            selected_video_object: {}
        }
    },
    mounted(){
        // console.log(JSON.stringify(this.$store.state.videos[0].id.videoId));

        for(let video of this.$store.state.videos){
            if(video.id.videoId === this.selected_video_id){
                this.selected_video_object = video;
            }
        }

        console.log("TEST", this.selected_video_object.snippet);
    }
}
</script>