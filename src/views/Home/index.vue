<template>
  <div class="screen-list" v-if="screenList?.length>1" v-for="item in screenList" :key="item.id" @click="room.switchScreen(item.id)">
    <img :src="item.thumbnail" alt="">
    <span>{{ item.name }}</span>
  </div>
  <video autoplay/>
</template>
<script setup lang="tsx">
import {ref} from "vue";
import {Room} from "../WebRTC";

const screenList = ref([]);
import('electron').then(electron => {
  electron.ipcRenderer.invoke('get-screen-list').then((sources) => {
    console.log(sources)
    screenList.value = sources.map(item => {
      return {
        display_id: item.display_id,
        name: item.name,
        id: item.id,
        thumbnail: item.thumbnail.toDataURL()
      }
    });
    if (sources.length == 1) {
      room.switchScreen(sources[0].id)
    }
  }).catch((err) => {
    alert("Error:" + err);
  })
})

const room = new Room(true);

</script>
<style lang="scss" scoped>
.screen-list {
  display: flex;
}

.video {
  width: 100%;
  height: 100%;
}
</style>
