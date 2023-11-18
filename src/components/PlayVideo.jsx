import React, { useEffect, useState } from "react";
import "../css/PlayVideo.css";
import { AiFillLike, AiTwotoneDislike, AiTwotoneSave } from "react-icons/ai";
import { useParams } from "react-router-dom";
import formatDateToRelative from "../services/formatdate";
import request from "../api";

const PlayVideo = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState({});

  const getVideoDetails = async () => {
    const response = await request("/videos", {
      params: {
        id,
        part: "snippet, statistics",
      },
    });
    setVideoDetail(response.data.items[0]);
  };
  useEffect(() => {
    getVideoDetails();
  }, [id]);

  const url = `https://www.youtube.com/embed/${id}?autoplay=1`;
  const snippet = videoDetail?.snippet;
  const title = snippet?.title;
  const publishedAt = snippet?.publishedAt;
  const channelId = snippet?.channelId;
  const channelTitle = snippet?.channelTitle;
  const description = snippet?.description;
  const viewCount = videoDetail?.statistics?.viewCount;
  const likeCount = videoDetail?.statistics?.likeCount;

  const [channelIcon, setChannelIcon] = useState();
  const [subCount, setSubCount] = useState(0);

  const getChannelIcon = async () => {
    const response = await request("/channels", {
      params: {
        part: "snippet,statistics",
        id: channelId,
      },
    });
    setSubCount(response.data.items[0].statistics?.subscriberCount);
    setChannelIcon(response.data.items[0].snippet.thumbnails.default.url);
  };

  useEffect(() => {
    getChannelIcon();
  }, [channelId]);

  return (
    <div className="play-video">
      <iframe
        src={url}
        height={460}
        className="video"
        allow="autoplay"
      ></iframe>
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="video-info">
        <p>
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
            compactDisplay: "short",
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
          }).format(viewCount)}{" "}
          View &bull; {formatDateToRelative(publishedAt)}
        </p>
        <div>
          <a href="">
            <AiFillLike />
            Like{" "}
            {new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
              minimumFractionDigits: 0,
              maximumFractionDigits: 1,
            }).format(likeCount)}
          </a>
          <a href="">
            <AiTwotoneDislike />
            Dislike{" "}
          </a>
          <a href="">
            <AiTwotoneSave />
            Save
          </a>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelIcon} alt="" />
        <div className="author_detail">
          <p>{channelTitle}</p>
          <span>
            {new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
              minimumFractionDigits: 0,
              maximumFractionDigits: 1,
            }).format(subCount)}
            Subscribers
          </span>
        </div>
        <button type="button" className="subscribe">
          Subscribe
        </button>
      </div>
      <div className="vid-desc">
        <p>{description}</p>
        <hr />
      </div>
    </div>
  );
};

export default PlayVideo;
