const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
let spotify = require("./spotify");

const app = express();

app.use(cors());
app.use(body_parser.json());

app.get("/", (request, response) => {
  return response.status(200).json({ message: "server's up!" });
});

app.get("/spotify", async (request, response) => {
  let current_song = await spotify.nowPlaying();
  let last_song = await spotify.recentlyPlayed();
  
  if (current_song) {
    return response.status(200).json(current_song);
  } else if(last_song) {
    return response.status(200).json(last_song);
  } else return response.status(404).json({ message: "song not found" });
});

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server's up and listening on port ${process.env.NODE_PORT}`);
});