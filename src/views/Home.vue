<template>
    <div>
        <Header :tags="tags"/>

        <div class="px-[10%] grid grid-cols-4 gap-4" v-if="videos.length === 0 && error_message === ''">
            <div v-for="i in 15" :key="i">
                <div class="bg-[#252525] w-full h-[180px] rounded-lg mb-3"></div>
                <p class="bg-[#252525] w-11/12 h-[30px] rounded mb-3"></p>
                <p class="bg-[#252525] w-3/4 h-[30px] rounded"></p>
            </div>
        </div>
        <div class="px-[10%] grid grid-cols-4 gap-4" v-if="videos.length > 0 && error_message === ''">
            <!-- <h1 class="text-white">Hello!</h1> -->
            <div v-for="(video, i) in videos" :key="i">
                <YouTubeVideo :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title" :channel_title="video.snippet.channelTitle"/>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import YouTubeVideo from "@/components/Cards/YouTubeVideo.vue";
import YouTubeAPI from "@/api/YouTubeAPI";

export default {
    name: "Home",
    components: { Header, YouTubeVideo },
    metaInfo: {
        title: "YouTube"
    },
    methods:{
        fetchYouTubeVideos(query){
            const API_KEY = process.env.VUE_APP_API_KEY;
            let max_results_length = 16;
            let url = (query) ? `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${ max_results_length }&key=${ API_KEY }`
                : `/search?part=snippet&maxResults=${ max_results_length }&q=${ query }&key=${ API_KEY }`;

            YouTubeAPI.get(url)
                .then(response => {
                    console.log(response.data.items); // TODO TEMP...

                    /** CACHE THE DATA OF YOUTUBE VIDEOS IN THE LOCAL STORAGE */
                    localStorage.setItem("yt_videos", JSON.stringify(response.data.items));

                    /** THIS IS THE FIRST FETCH, SO SET THE VALUE ON videos */
                    this.videos = response.data.items;
                })
                .catch(err => {
                    /** DISPLAY THE ERROR MESSAGE AT THE CONSOLE */
                    console.log(err);

                    /** DISPLAY THE ERROR MESSAGE ON USER */
                    this.error_message = err;
                });
        }
    },
    data(){
        return {
            error_message: "",
            videos: [],
            tags: [
                "All",
                "Music",
                "Philippine Music",
                "Playlist",
                "Ed Sheeran",
                "Live",
                "Gaming",
                "Contemporary R&B",
                "News",
                "Country Music"
            ]
        }
    },
    mounted(){
        if(localStorage.getItem("yt_videos")){
            /** IF THE 'yt_videos' IN LOCAL STORAGE IS NOT EMPTY THEN USE THAT VALUE. WE'RE CACHING THE VALUE SINCE THE API CALL IS NOT UNLIMITED. */
            this.videos = JSON.parse(localStorage.getItem("yt_videos"));
            console.log(JSON.parse(localStorage.getItem("yt_videos")));
        }
        else{
            /** IF THE 'yt_videos' IN LOCAL STORAGE THEN FETCH THE VIDEOS */
           this.fetchYouTubeVideos(); 
        }
    }
};
</script>