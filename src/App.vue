<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
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
