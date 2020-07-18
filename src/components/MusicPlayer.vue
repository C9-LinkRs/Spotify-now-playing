<template>
  <vs-row>
    <vs-col>
      <vs-card class="cardx" id="border" :style="{ 'background-image': 'url(' + image + ')' }">
        <div id="image_block">
          <a :href="spotify_url">
            <div id="spotify_icon">
              <font-awesome-icon :icon="['fab', 'spotify']" size="2x" />
            </div>
          </a>
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
      progress_percentage: 100,
      spotify_url: "#"
    };
  },
  mounted: async function() {
    try {
      let response = await axios.get("/api/spotify");

      let spotify_data = response.data;
      let duration_min_sec = this.millisToMinutesAndSeconds(
        spotify_data.duration_ms
      );
      let progress_min_sec = this.millisToMinutesAndSeconds(
        spotify_data.progress_ms
      );

      this.artist = this.getArtists(spotify_data.artists);
      this.title = spotify_data.name;
      this.image = spotify_data.album.images[1].url;
      this.duration = duration_min_sec;
      this.progress = progress_min_sec;
      this.progress_percentage = Math.floor(
        (spotify_data.progress_ms / spotify_data.duration_ms) * 100
      );
      this.spotify_url = spotify_data.external_urls.spotify;
      
      // If someone comes from Github, redirect them to Spotify
      let query_params = new URLSearchParams(window.location.search);
      let opened = query_params.has("opened");
      if (opened) window.location.replace(this.spotify_url);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    millisToMinutesAndSeconds: function(millis) {
      let minutes = Math.floor(millis / 60000);
      let seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
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
@import url("https://fonts.googleapis.com/css?family=Questrial");

#border {
  font-family: "Questrial", sans-serif;
  position: relative;
  margin: auto;
  width: 300px;
  height: 300px;
  overflow: hidden;
  background-size: 300px;
  box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.6);
}

#spotify_icon {
  color: rgba(255, 255, 255, 0.9);
  position: absolute;
  right: 10px;
  top: 10px;
}

#spotify_icon:hover {
  color: rgba(255, 255, 255, 1);
  transition: all .5s;
  transform: translateY(-2px);
}

#info {
  height: 90px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.87);
}

#progress_bar {
  height: 5px;
  width: 73%;
  margin: 6% auto;
  background-color: #c0cfb2;
  border-radius: 10px;
}

#fill {
  background-color: #8ba989;
  height: 0.3rem;
  border-radius: 2px;
}

#artist {
  text-align: center;
  margin-top: -3px;
}

#current_time,
#total_time {
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

#artist_name,
#song_name {
  text-transform: uppercase;
  margin: 0;
}

#song_name {
  font-size: 1em;
  letter-spacing: 3px;
  color: #49654d;
}

#artist_name {
  font-size: 0.85em;
  letter-spacing: 1.7px;
  margin-top: 5px;
  color: #8ba989;
}
</style>