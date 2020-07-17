<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="2.1">
      <vs-card class="cardx" id="border" :style="{ 'background-image': 'url(' + image + ')' }">
        <div id="image_block">
          <div id="spotify_icon">
            <font-awesome-icon :icon="['fab', 'spotify']" size="2x"/>
          </div>
        </div>
        <div id="info">
          <div id="progress_bar">
            <div id="current_time">{{ progress }}</div>
            <div id="total_time">{{ duration }}</div>
            <div id="fill" :style="{'width': progress_percentage + '%'}"></div>
          </div>
          <div id="artist">
            <h2 id="song_name">{{ title }}</h2>
            <h3 id="artist_name">{{ artist }}</h3>
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
      image: require("@/assets/no_song.png"),
      progress: "3:00",
      duration: "3:00",
      progress_percentage: 100
    };
  },
  mounted: async function() {
    try {
      let response = await axios.get("http://localhost:3000/spotify");

      let spotify_data = response.data;
      let duration_min_sec = this.millisToMinutesAndSeconds(spotify_data.duration_ms);
      let progress_min_sec = this.millisToMinutesAndSeconds(spotify_data.progress_ms);

      this.artist = this.getArtists(spotify_data.artists);
      this.title = spotify_data.album.name;
      this.image = spotify_data.album.images[1].url;
      this.duration = duration_min_sec;
      this.progress = progress_min_sec;
      this.progress_percentage = Math.floor((spotify_data.progress_ms / spotify_data.duration_ms) * 100);
      console.log(this.progress_percentage)
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    millisToMinutesAndSeconds: function(millis) {
      let minutes = Math.floor(millis / 60000);
      let seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    getArtists: function(array) {
      let artists = "";
      
      for (let artist of array) {
        artists += artist.name + ", ";
      }
      if (artists.length) return artists.slice(0, -2);
      else return "Some artist";
    }
  }
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Questrial');

  #border {
    font-family: 'Questrial', sans-serif;
    position: relative;
    margin: auto;
    width: 300px;
    height: 300px;
    overflow: hidden;
    background-size: 300px;
    box-shadow: 6px 6px 15px rgba(0, 0, 0, .6);
  }

  #spotify_icon {
    color: rgba(255, 255, 255, .90);
    position: absolute;
    right: 10px;
    top: 10px;
  }

  #info {
    height: 90px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, .87);
  }

  #progress_bar {
    height: 5px;
    width: 73%;
    margin: 6% auto;
    background-color: #C0CFB2;
    border-radius: 10px;
  }

  #fill {
    background-color: #8BA989;
    height: 0.3rem;
    border-radius: 2px;
  }

  #artist {
    text-align: center;
    margin-top: -3px;
  }

  #current_time, #total_time {
    font-size: 10px;
    position: absolute;
    margin-top: -2px;
  }

  #current_time {
    left: 15px;
  }

  #total_time {
    right: 15px;
  }

  #artist_name, #song_name {
    text-transform: uppercase;
    margin: 0;
  }

  #song_name {
    font-size: 1em;
    letter-spacing: 3px;
    color: #49654D;
  }

  #artist_name {
    font-size: .85em;
    letter-spacing: 1.7px;
    margin-top: 5px;
    color: #8BA989;
  }
</style>