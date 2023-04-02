<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
      /**
       * References used for watcher:
       * https://stackoverflow.com/questions/46402809/vuejs-event-on-route-change
       * https://vuejs.org/guide/essentials/watchers.html#basic-example
       */
      $route(to, from){
            /** Removed cached videos since each page has it own videos to load */
            localStorage.removeItem("yt_videos");
      }
  }
}
</script>

<style>
body{
    background: #0f0f0f;
}
</style>
