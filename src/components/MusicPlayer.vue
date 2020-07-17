<template>
  <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
    <vs-card actionable class="cardx">
      <div slot="header">
        <h3>{{ title }}</h3>
      </div>
      <div slot="media">
        <img :src="require('@/assets/no_song.png')">
      </div>
      <div>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
      </div>
    </vs-card>
  </vs-col>
</template>

<script>

  import axios from "axios";

  export default {
    name: "MusicPlayer",
    data: function() {
      return { 
        title: "Hello World!"
      }
    },
    mounted: async function() {
      try {
        let response = await axios.get("http://localhost:3000/spotify");
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
</script>

<style scoped>
</style>