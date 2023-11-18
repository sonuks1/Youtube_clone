import axios from "axios";
import { youtube_base_url, yt_api_key } from "./constants";

const request = axios.create({
  baseURL: youtube_base_url,
  params: {
    key: yt_api_key,
  },
});

export default request;
