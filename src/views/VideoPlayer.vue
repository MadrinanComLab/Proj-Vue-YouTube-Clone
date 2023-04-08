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

                <div class="grid grid-cols-2">
                    <div id="channel_info" class="mb-3">
                        <img :src="channel_profile_url" :alt="`${channel_title} profile`" class="rounded-full w-10 h-10 inline">
                        <p v-html="channel_title" class="text-white inline ml-3 font-semibold"></p>
                    </div>

                    <div id="actions" class="text-end">
                        <p class="text-white bg-[#272727] inline py-3 px-4 rounded-full mr-2" @click="handleReaction(constants.LIKE)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>
                            {{ total_likes }}
                        </p>
                        
                        <p class="text-white bg-[#272727] inline py-3 px-4 rounded-full" @click="handleReaction(constants.DISLIKE)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                            </svg>
                            {{ total_dislikes }}
                        </p>
                    </div>
                </div>
                
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
import YouTubeAPI from "@/api/YouTubeAPI";
import constants from "@/config/constants";

export default {
    name: "VideoPlayer",
    components: { Header, Skeleton, VideoResult, YouTubeChannel },
    data() {
        return {
            /** This variable was declared for better readability */
            selected_video_id: this.$route.query.v,
            selected_video_object: {},
            channel_profile_url: "",
            channel_title: "",
            total_likes: 0,
            total_dislikes: 0,
            constants: constants
        }
    },

    mounted(){
        /* Getting the additional video information such as title and description */
        this.getSelectedVideoInfo();

        /* Go to the top of the page after submitting the search query */
        this.goToTop();

        /* Get the information of channel */
        this.fetchChannel(this.selected_video_object.snippet.channelId);

        /* Getting the number of likes and dislikes of the selected video */
        this.fetchVideoReactions();
    },
    methods:{
        /**
         * DOCU: Function to go to the top of the page
         * Triggered: When the page loads
         * Last Update: April 8, 2023
         * @function
         * @memberOf VideoPlayer
         * @author MadriñanComputerLab
         */
        goToTop(){
            window.scrollTo(0, 0);
        },

        fetchVideoReactions(){
            let video_reactions = JSON.parse(localStorage.getItem("video_reactions")) || {};

            this.total_likes = video_reactions[this.selected_video_id]?.likes || 0;
            this.total_dislikes = video_reactions[this.selected_video_id]?.dislikes || 0;
        },

        /**
         * DOCU: Function for handling the submitted reaction of user (either liking or disliking a video)
         * Triggered: When user clicks either the like or dislike button
         * Last Update: April 9, 2023
         * @function
         * @memberOf VideoPlayer
         * @param react - This identify what reaction the user does.
         * @author MadriñanComputerLab
         */
        handleReaction(react){
            /* Get the saved video_reactions object */
            let video_reactions = JSON.parse(localStorage.getItem("video_reactions")) || {};
            let new_reactions = {};
            
            if(react === this.constants.LIKE){
                /* Prepare the new_reactions object */
                new_reactions = { likes: this.total_likes + 1, dislikes: this.total_dislikes };

                /* Update the UI */
                this.total_likes += 1;
            }
            else{
                /* Prepare the new_reactions object */
                new_reactions = { likes: this.total_likes, dislikes: this.total_dislikes + 1 };

                /* Update the UI */
                this.total_dislikes += 1;
            }

            /* Save the new reaction */
            localStorage.setItem("video_reactions", JSON.stringify({ ...video_reactions, [this.selected_video_id]: new_reactions }));
        },

        /**
         * DOCU: Function to information of the selected video
         * Triggered: When the page loads
         * Last Update: April 8, 2023
         * @function
         * @memberOf VideoPlayer
         * @author MadriñanComputerLab
         */
        getSelectedVideoInfo(){
            for(let video of this.$store.state.videos){
                if(video.id.videoId === this.selected_video_id){
                    this.selected_video_object = video;
                }
            }
        },

        /**
         * DOCU: Function to information of the channel
         * Triggered: When the page loads
         * Last Update: April 7, 2023
         * @function
         * @memberOf VideoPlayer
         * @param {string} channel_id - This contain the channel id.
         * @author MadriñanComputerLab
         */
        fetchChannel(channel_id){
            /*
             * Source for getting the data of a channel:
             * https://stackoverflow.com/questions/12890828/how-to-get-channel-related-data-from-youtube-api
             */
            const API_KEY = process.env.VUE_APP_API_KEY;
            let url = `/channels?part=snippet&id=${channel_id}&key=${API_KEY}`;

            YouTubeAPI.get(url)
                .then(response => {
                    this.channel_profile_url = response.data.items[0].snippet.thumbnails.medium.url;
                    this.channel_title = response.data.items[0].snippet.localized.title;
                });
        }
    }
}
</script>