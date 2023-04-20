<template>
  <div class="box">
    <video class="video" ref="videoRef" autoplay/>
  </div>
</template>
<script setup lang="tsx">
import {Room} from "../WebRTC";

document.title = '接收端'
new Room(false);
</script>
<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.video {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
</style>
