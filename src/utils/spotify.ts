import axios from "axios";
import { stringify } from "querystring";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token
} = process.env;

const BASIC_CODE = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const AUTH_TOKEN = `Bearer ${BASIC_CODE}`;
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played";
const GET_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

async function getAccessToken() {
  try {
    let response = await axios.post(GET_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { Authorization: AUTH_TOKEN },
      data: stringify({
        grant_type: "refresh_token",
        refresh_token
      })
    });

    return (response.status === 200) ? `Bearer ${response.data.access_token}` : {};
  } catch (error) {
    console.log("Spotify error", "getting access token", error);
    return {};
  }
};

export async function nowPlaying() {
  try {
    let access_token = await getAccessToken();
    let response = await axios.post(NOW_PLAYING_ENDPOINT, {
      method: "GET",
      headers: { Authorization: access_token }
    });

    return (response.status === 200) ? response.data : {};
  } catch (error) {
    console.log("Spotify error", "retrieving now playing", error);
    return {};
  }
}

export async function recentlyPlayed() {
  try {
    let access_token = await getAccessToken();
    let response = await axios.post(RECENTLY_PLAYED_ENDPOINT, {
      method: "GET",
      headers: { Authorization: access_token }
    });

    return (response.status === 200) ? response.data : {};
  } catch (error) {
    console.log("Spotify error", "retrieving recently played", error);
    return {};
  }
}