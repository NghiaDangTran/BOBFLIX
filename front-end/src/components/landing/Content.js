import React from 'react';
import styled from 'styled-components'

function Content({ imgData, videoData, direction, title, subTitle, alt }) {
 
  return (


    <div style={{ background: "black", borderBottom: '8px solid #222' }}>


      <Wrapper className="animation-card-container" direction={direction}>
        <Text className="our-story-card-text">
          <h1 id="" className="our-story-card-title" data-uia="animation-card-title">
            {title}
          </h1>
          <h2
            id=""
            className="our-story-card-subtitle"

          >
            {subTitle}
          </h2>
        </Text>
        <div className="our-story-card-img-container">
          <div className="our-story-card-animation-container">
            <img
              alt={alt}
              className="our-story-card-img"
              src={imgData}

            />
            {videoData && <div
              className="our-story-card-animation"

            >
              <video
                className="our-story-card-video"
                controls=""
                muted
                autoPlay={"autoplay"}
                preload="auto"
                loop
              >
                <source
                  src={videoData}
                  type="video/mp4"
                />
              </video>
              <div className="our-story-card-animation-text" />
              <div
                className="our-story-card-animation-custom"

                aria-hidden="true"
              />
            </div>}
          </div>
        </div>
        <div className="center-pixel" style={{ position: "absolute" }} />
      </Wrapper>
    </div>



  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction:${props => props.direction};
  margin: auto;
  padding:50px;
  height:25%;
  width:100%;
  background-color:black;

  @media (max-width: 1000px) {
   
    flex-direction: column;
  }
h1,h2{
  color:white
}
img {
  /* border-top-left-radius: 25px;
    border-top-right-radius: 25px; */
    border-radius: 10px;

    margin: 0 0 20px;
    display: block;
    width: 100%;
    height: auto;
}
 

`
const Text = styled.div`
@media (max-width:1000px)
{
  padding:50px;

    text-align: center;
    width: 100%;

  .animation-card.watchOnTv, .our-story-card-text {
    margin: 0;
}
}

`
export default Content;