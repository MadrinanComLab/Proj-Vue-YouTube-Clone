# Welcome to YouTube Clone using Vue JS!

![Banner (2)](https://user-images.githubusercontent.com/74145874/231018519-1a377066-dfb9-498d-a817-6f891d0daab0.jpg)

<b>Link to Video Demo:</b> https://youtu.be/OUh0-8NdVss <br/>
This project was initiated on January 21, 2023, and finished on April 11, 2023.

## Table of Contents:
<b>•</b> [Technologies used in this Project](#tech_used) <br/>
<b>•</b> [Commands for this Application](#app_commands) <br/>
<b>•</b> [Setting up the YouTube API to your Local Repo](#api_setup) <br/>
<b>•</b> [Vuex (Vue's State Management Library)](#vuex) <br/>
<b>•</b> [Vuex-Persistedstate Library](#vuex_persisted_state) <br/>
<b>•</b> [Vue Watcher](#vue_watch)

<section id="tech_used"></section>

## Technologies used in this Project:
<p>
    <img src="https://user-images.githubusercontent.com/74145874/203150691-6cdb51ef-bbb8-45a5-9ad9-be9cd7d379ce.png" width="100px" height="100px" alt="Vue JS" title="Vue JS"/>
    <img src="https://user-images.githubusercontent.com/74145874/203151252-c9855797-b043-4385-82c7-4986cfdd222e.png" width="100px" height="100px" alt="Tailwind CSS" title="Tailwind CSS"/>
</p>

<section id="app_commands"></section>

## Commands for this Application
Before you run this app, install the dependencies first, by running this command:
```
npm install
```

Command to run this app:
```
npm run serve
```

To watch changes in tailwind in case you are modifying it:
```
npx tailwindcss-cli build -i ./src/input.css -o ./dist/output.css --watch
```

***Note:*** If you tried to modify the Tailwind and it didn't work, please try to restart the Vue server.

<section id="api_setup"></section>

## Setting up the YouTube API to your Local Repo
I've placed the API key in dotenv for security purposes, so in this part of README.md, I will guide you on how to setup your own key and gain access to the YouTube API.

1. Go to this YouTube API Guide: https://developers.google.com/youtube/v3/getting-started
2. As mentioned in the guide, you need to create your own Google Account and then go to <a href="https://console.cloud.google.com/apis/dashboard">Google Developers Console</a>
3. Create your own project, just click the following button with red box below:<img src="https://user-images.githubusercontent.com/74145874/213764051-a49ad9c7-4fb3-4c5b-922b-a3bf3c795775.jpg"/><img src="https://user-images.githubusercontent.com/74145874/213764256-cdacc3f6-7b74-477d-b5d2-2f3223e6c613.jpg"/>
4. You can name it however you want, I named it "Vue YouTube Clone"<img src="https://user-images.githubusercontent.com/74145874/213764686-bff5d39f-eeba-409e-abfb-a608b0bd334f.jpg"/>
5. We need to enable the YouTube API so click the "Enable APIs and Services"<img src="https://user-images.githubusercontent.com/74145874/213765159-8b407343-4eb3-4709-89d7-6c54382f944f.jpg"/>
6. Then, look for "YouTube Data API v3"<img src="https://user-images.githubusercontent.com/74145874/213916813-0b1cf400-0640-496f-b74e-4790797cdb4f.jpg"/>
7. Make sure you selected the project you've created earlier <img src="https://user-images.githubusercontent.com/74145874/213916876-92b1f55b-3dcf-40af-9afd-501a35469f28.jpg"/>
8. Press the "enable" button of YouTube Data API v3<img src="https://user-images.githubusercontent.com/74145874/213916907-3af397c1-549f-46de-9ed2-0d2e92f0c22a.jpg"/>
9. Next, we need the credentials for our app to gain permission to make requests. <img src="https://user-images.githubusercontent.com/74145874/213916964-2130f3a1-9ce4-4dd4-b90f-16e33e89e00f.jpg"/>
10. Select the "Public data"<img src="https://user-images.githubusercontent.com/74145874/213917210-d10b6187-52a8-4219-82ad-377519fd9021.jpg"/>
11. Copy the given string in "API key" (I blurred my API key)<img src="https://user-images.githubusercontent.com/74145874/213917328-9ec415e0-f244-4add-a5fc-45e67d23b4fc.jpg"/>
12. Now, in your project's root directory, create a ".env" file and add the API key there:<img src="https://user-images.githubusercontent.com/74145874/218452431-f4267372-dda0-4d72-aacf-bd85b6321279.jpg"/>
13. Create the "api" folder inside the "src" folder, and then, inside the "api" folder, create "YouTubeAPI.js" and do the following:<img src="https://user-images.githubusercontent.com/74145874/218453453-69eeb25d-fc5d-4133-9f9b-4eabfb01b891.jpg"/>
14. You can do the following to test you YouTube API. Put this in mounted function of Vue:
```javascript
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
```

<section id="vuex"></section>

## Vuex (Vue's State Management Library)
This application uses `Vuex` to handle the data shared through all of the components. <b>Madriñan Computer Laboratory</b> conducted an experiment to better understand this before implementing it here. You can access the repository of the experiment, just click this [link](https://github.com/MadrinanComLab/Exp-Vuex).

<section id="vuex_persisted_state"></section>

## Vuex-Persistedstate Library
`vuex-persistedstate` library was used in this project, this is used to prevent the state object from resetting if the page reloads.

<b>Sources for this:</b> <br/>
<b>•</b> https://stackoverflow.com/questions/43027499/vuex-state-on-page-refresh  <br/>
<b>•</b> https://www.npmjs.com/package/vuex-persistedstate  <br/>

<section id="vue_watch"></section>

## Vue Watcher
This project implements a `watcher` and this project use this to removed the cached video data when the `URL` changes.

The following link are the reference for `watcher`:  <br/>
<b>•</b> https://stackoverflow.com/questions/46402809/vuejs-event-on-route-change  <br/>
<b>•</b> https://vuejs.org/guide/essentials/watchers.html#basic-example  <br/>

---

### Did You Like This Project?
Stay tuned for upcoming projects and experiments by following me on the following accounts:
<p float="left">
  <a href="https://twitter.com/MadrinanComLab">
  <img src="https://user-images.githubusercontent.com/74145874/219954290-0afa8626-f2b5-44a9-8130-1ccce187ac06.png" width="50px" title="Twitter"/>
  </a>
  <a href="https://www.linkedin.com/in/john-clifford-madri%C3%B1an-3b5ba222a/">
  <img src="https://user-images.githubusercontent.com/74145874/219954352-03919daf-97cf-4639-80a8-dab307ad1964.png" width="50px" title="Linkedin"/>
  </a>
</p>