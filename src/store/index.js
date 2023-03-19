import { createStore } from "vuex";
import YouTubeAPI from "@/api/YouTubeAPI";

export default createStore({
    state:{
        is_loading: true,
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
        setQuery(state, new_value){
            state.query = new_value;
        },

        /**
         * DOCU: Function that will change the value of is_loading
         * Triggered: This function will be triggered before and after getting the YouTube videos
         * Last Update: March 20, 2023
         * @function
         * @memberOf Store
         * @param {object} state - This is the object used to access the state object above
         * @param {boolean} new_value - This will be either true or false and this way was used for better readability of the code.
         * @author MadriñanComputerLab
         */
        changeIsLoading(state, new_value){
            /** state.is_loading = !state.is_loading was abandoned due to poor readability of the code */
            state.is_loading = new_value;
        },

        /**
         * DOCU: Function to save next_page_token in the next_page_token state above
         * Triggered: This function will be triggered when fetchYouTubeVideos was dispatched
         * Last Update: March 15, 2023
         * @function
         * @memberOf Store
         * @param {object} state - This is the object used to access the state object above
         * @param {string} next_page_token - This will be used for pagination. The value of this will be use to update the next_page_token in state object
         * @author MadriñanComputerLab
         */
        saveNextPageToken(state, next_page_token){
            state.next_page_token = next_page_token;
        },

        /**
         * DOCU: Function to save error_message in the error_message state above
         * Triggered: This function will be triggered if something wrong happen when fetchYouTubeVideos was dispatched
         * Last Update: March 15, 2023
         * @function
         * @memberOf Store
         * @param {object} state - This is the object used to access the state object above
         * @param {string} error_message - This will be used to display the error to user. The value of this will be use to update the error_message in state object
         * @author MadriñanComputerLab
         */
        saveErrorMessage(state, error_message){
            state.error_message = error_message;
        },

        /**
         * DOCU: Function to save YouTube videos in the state above
         * Triggered: This function will be triggered when fetchYouTubeVideos was dispatched
         * Last Update: March 11, 2023
         * @function
         * @memberOf Store
         * @param {object} state - This is the object used to access the state object above
         * @param {boolean} reset - This will be used to identify if the fetched video should be append in the existing record or to overwrite
         * @param {object} youtube_videos - This is the value will be save in the youtube_videos state
         * @author MadriñanComputerLab
         */
        saveYouTubeVideos(state, { reset, youtube_videos }){
            if(reset){
                /** IF THE reset IS TRUE THEN SET THE NEW FETCH DATA AS NEW ARRAY */
                state.videos = youtube_videos;
            }
            else{
                /** IF THE reset IS FALSE THEN APPEND THE NEW FETCH DATA */
                state.videos.push(...youtube_videos);
            }
        }
    },
    actions:{
        /**
         * DOCU: Function to detect the bottom page
         * Triggered: When user reached the bottom page.
         * Last Update: March 11, 2023
         * @function
         * @memberOf Store
         * @param {object} dispatch - This will be provided by vuex. It was used to dispatch actions in this action (detectBottomPage) 
         * @param {object} event - Require input event.
         * @author MadriñanComputerLab
         */
        detectBottomPage({ dispatch, state }, { event }){
            /** IF YOU REMOVE THE 'documentElement' AND YOU TRIED TO ACCESS e.target.offsetHeight, IT WILL BE UNDEFINED. ADDING THE documentElement RESOLVE THE PROBLEM:
             * https://stackoverflow.com/questions/51908241/when-trying-access-event-target-something-always-return-undefined
             */
            let element = event.target.documentElement;
            
            /** SOURCE FOR VUE DETECTING IF BOTTOM PAGE IS REACHED:
             * https://stackoverflow.com/questions/59603315/how-to-detect-when-a-user-scrolls-to-the-bottom-of-a-div-vue
             */
            if(Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight){
                /** this.query WILL BE GIVEN VALUE WHEN USER CLICKS TAG IN THE HEADER */
                dispatch("fetchYouTubeVideos", { query: state.query });
            }
        },

        /**
         * DOCU: Function to fetch YouTube videos
         * Triggered: When user reached the bottom page, click tags at the header, or when the Home component was mounted.
         * Last Update: March 19, 2023
         * @function
         * @memberOf Store
         * @param {object} commit - This will be provided by store 
         * @param {string} query = "" - Optional value, this will be used when user search for specific video or if the user select a tag in the header.
         * @param {boolean} reset = false - This will define if the array would be reset. If the value is false then the new fetch value will be appended to the existing array
         * @author MadriñanComputerLab
         */
        fetchYouTubeVideos({ commit, state }, {query, reset}){
            /** set is_loading to true to mark it was loading */
            commit("changeIsLoading", true);

            const API_KEY = process.env.VUE_APP_API_KEY;
            let max_results_length = 16;

            let url = (query) ? `/search?part=snippet&maxResults=${ max_results_length }&q=${ query }&key=${ API_KEY }`
                : `/search?part=snippet&maxResults=${ max_results_length }&key=${ API_KEY }`;

            /** IF next_page_token IS NOT NULL THEN INCLUDE THE NEXT PAGE TOKEN IN API CALL.
             * REFERENCES FOR IMPLEMENTING PAGINATION IN YOUTUBE API:
             * https://developers.google.com/youtube/v3/docs/videos/list#response
             * https://developers.google.com/youtube/v3/guides/implementation/pagination
             */
            url += (state.next_page_token) ? `&pageToken=${ state.next_page_token }` : "";

            YouTubeAPI.get(url)
                .then(response => {
                    /** Set the is_loading to false to mark that it was done loading */
                    commit("changeIsLoading", false);

                    /** Save the fetch YouTube video */
                    commit("saveYouTubeVideos", { reset: reset, youtube_videos: response.data.items });

                    /** SAVE THE nextPageToken ATTRIBUTE FOR PAGINATION */
                    commit("saveNextPageToken", response.data.nextPageToken);
                    
                    /** CACHE THE DATA OF YOUTUBE VIDEOS IN THE LOCAL STORAGE */
                    localStorage.setItem("yt_videos", JSON.stringify(response.data.items));
                })
                .catch(err => {
                    /** DISPLAY THE ERROR MESSAGE AT THE CONSOLE */
                    console.log(err);

                    /** DISPLAY THE ERROR MESSAGE ON USER */
                    commit("saveErrorMessage", err);
                });
        }
    },
    getters:{
    },
    modules:{
    }
});