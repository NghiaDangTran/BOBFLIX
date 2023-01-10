import React, { useEffect } from 'react';
import styled from 'styled-components';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';
import videoJS from "video.js";
const options = {
  fluid: true,
  responsive: true,
  playbackRates: [0.75, 1, 1.25, 1.5, 2],

  controlBar: {
    children: [
      "playToggle",
      "progressControl",
      "volumePanel",
      "currentTimeDisplay",
      "timeDivider",
      "durationDisplay",
      "liveDisplay",
      "playbackRateMenuButton",
      "chaptersButton",
      "fullscreenToggle"
    ]
  }
};
const Player = ({ src }) => {



  useEffect(() => {
    setupVideoPlayer();
  }, []); // this will only run the effect once

  const setupVideoPlayer = () => {
    const videoPlayer = videoJS("sandbox-example-video", options, () => {
      console.log("HELLO");
    });
    videoPlayer.httpSourceSelector();
    videoPlayer.playbackRates([0.75, 1, 1.25, 1.5, 2])
    videoPlayer.src({
      src: src,
      type: 'application/x-mpegURL'
      , withCredentials: true
      , crossOrigin: true
      , preload: 'auto',
      quality: {
        default: 'high',
        enabled: true
      }
      , selectedVideo: 1
    })
  };


  return (<Wrapper>

    <video
      alt={`${"sandbox"} - video`}
      className={`${"video-js"} ${"vjs-default-skin"} ${"vjs-big-play-centered"}`}
      controls
      preload={"auto"}
      id={"sandbox-example-video"}
      width={640}
      height={320}
      data-setup="{}"
      playsInline
      data-vjs-player
      muted

    >

    </video>
  </Wrapper>)
};

const Wrapper = styled.div`
.video-js{position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding:4.5%}
  
  `

export default Player;