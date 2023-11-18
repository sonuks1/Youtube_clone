import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical, BsListCheck, BsStopwatch } from "react-icons/bs";
import formatDateToRelative from "../services/formatdate";
import {
  dummyThumb,
  dummyAvatar,
  dummyTitle,
  dummyChannelName,
  dummyVideoId,
} from "../constants";
import request from "../api";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWatchlist, saveWatchlist } from "../store/watchListReducer";

const MovieCard = ({ video }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [channelIcon, setChannelIcon] = useState();
  const dispatch = useDispatch();

  const videoId = video?.id?.videoId;
  const channelId = video?.snippet?.channelId;
  const channelTitle = video?.snippet?.channelTitle;
  const publishedAt = video?.snippet?.publishedAt;
  const title = video?.snippet?.title;
  const thumbnails = video?.snippet?.thumbnails?.medium?.url;
  const videoIds = useSelector((state) => state.watchlist.videoIds);

  const getChannelIcon = async () => {
    const response = await request("/channels", {
      params: {
        part: "snippet",
        id: channelId,
      },
    });
    setChannelIcon(response.data.items[0].snippet.thumbnails.default.url);
  };
  useEffect(() => {
    getChannelIcon();
  }, [channelId]);

  const [videoDetail, setVideoDetail] = useState({});
  const getVideoDetails = async () => {
    const response = await request("/videos", {
      params: {
        id: videoId,
        part: "snippet, statistics",
      },
    });
    setVideoDetail(response.data.items[0]);
  };
  useEffect(() => {
    getVideoDetails();
  }, [videoId]);
  const videoStats = videoDetail?.statistics;

  return (
    <>
      <div className="vid-list">
        <Link
          to={`/moviestream/${videoId}` || `/moviestream/${dummyVideoId}`}
          key={videoId}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="small-thumb">
            <img src={thumbnails || dummyThumb} className="thumbnail" />
          </div>
        </Link>
        <div className="vid_div">
          <img src={channelIcon || dummyAvatar} alt="" />
          <div className="vid_info">
            <div className="video-title">
              <a href="">{title.slice(0, 50) || dummyTitle}</a>
              <BsThreeDotsVertical
                className="savetowatchlist"
                onClick={() => setShowMenu(!showMenu)}
              />
            </div>
            <p>{channelTitle || dummyChannelName}</p>
            <p>{formatDateToRelative(publishedAt)}</p>
            <p style={{ transition: "all 1s" }}>
              {videoStats?.likeCount
                ? new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  }).format(videoStats?.viewCount) + " views"
                : "No views"}
              {" | "}
              {videoStats?.likeCount
                ? new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  }).format(videoStats?.likeCount) + " likes"
                : "No Likes"}
            </p>
          </div>
        </div>
        <div className={`${showMenu ? "video-menu show" : "video-menu"} `}>
          <div className="menu-icon">
            {videoIds.includes(videoId) ? (
              <div className="removeIcon">
                <BsStopwatch />
                <span
                  onClick={() => {
                    dispatch(removeFromWatchlist(videoId));
                    setShowMenu(false);
                  }}
                >
                  Remove from Watchlist
                </span>
              </div>
            ) : (
              <div className="saveIcon">
                <BsListCheck />
                <span
                  onClick={() => {
                    dispatch(saveWatchlist(video));
                    setShowMenu(false);
                  }}
                >
                  {" "}
                  Add to Watchlist
                </span>
              </div>
            )}
          </div>
          <div className="menu-icon"></div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
