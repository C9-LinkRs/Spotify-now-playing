<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="2.1">
      <vs-card actionable class="cardx" id="border" :style="{ 'background-image': 'url(' + image + ')' }">
        <div id="image_block">
          <div>
            <h2>{{ title }}</h2>
            <h3>{{ artist }}</h3>
          </div>
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
      }
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
  }
</script>

<style scoped>
  #border {
    border-radius: 10px;
    background-size: 300px;
    background-repeat: no-repeat;
    width: 300px;
  }

  #image_block {
    height: 280px; 
  }
  
</style>