import { createStore } from "vuex";

export default createStore({
    state:{
        error_message: "",
        videos: [],
        query: "",
        next_page_token: "",
        selected_tag: "All",
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
    },
    mutations:{
    },
    actions:{
    },
    getters:{
    },
    modules:{
    }
});