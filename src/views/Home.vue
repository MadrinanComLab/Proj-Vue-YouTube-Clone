<template>
    <div>
        <Header :tags="tags"/>

        <div class="px-[10%] grid grid-cols-4 gap-4">
            <div v-for="i in 20" :key="i">
                <div class="bg-[#252525] w-full h-[180px] rounded-lg mb-3"></div>
                <p class="bg-[#252525] w-11/12 h-[30px] rounded mb-3"></p>
                <p class="bg-[#252525] w-3/4 h-[30px] rounded"></p>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import YouTubeAPI from "@/api/YouTubeAPI";

export default {
    name: "Home",
    components: { Header },
    metaInfo: {
        title: "YouTube"
    },
    data(){
        return {
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
        const API_KEY = process.env.VUE_APP_API_KEY;
        let max_results_length = 16
        let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${ max_results_length }&key=${ API_KEY }`;
        YouTubeAPI.get(url)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }
};
</script>