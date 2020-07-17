<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="2.1">
      <vs-card class="cardx" id="border" :style="{ 'background-image': 'url(' + image + ')' }">
        <div id="image_block"></div>
        <div id="info">
          <h2>{{ title }}</h2>
          <h3>{{ artist }}</h3>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import axios from "axios";

export default {
  name: "MusicPlayer",
  data: function() {
    return {
      title: "Fetching data...",
      artist: "Someone",
      image: require("@/assets/no_song.png")
    };
  },
  mounted: async function() {
    try {
      let response = await axios.get("http://localhost:3000/spotify");

      let spotify_data = response.data;
      this.artist = spotify_data.artists[0].name;
      this.title = spotify_data.album.name;
      this.image = spotify_data.album.images[1].url;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    prepareImage: function(img) {
      return require(img);
    }
  }
};
</script>

<style scoped>
  #border {
    position: relative;
    margin: auto;
    width: 300px;
    height: 300px;
    overflow: hidden;
    background-size: 300px;
    box-shadow: 6px 6px 15px rgba(0, 0, 0, .6);
  }

  #info {
    height: 115px;
    width: 100%;
    position: sticky;
    bottom: 0;
    background: rgba(255, 255, 255, .5);
  }
</style>