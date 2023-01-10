import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { fetchTopBanner, MovieSelector, setTopBannerVideo_play, setTopBannerVideo_url } from '../../features/movie/movieSlice'
import { useState } from 'react';
import { useCallback } from 'react';
// FaPlay FaInfoCircle
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import { GoMute, GoUnmute } from "react-icons/go";
import { useRef } from 'react';
import ReactPlayer from 'react-player'
import { setOpenHero, setHeroData } from '../../features/hero/heroSlice'
import { NormSelector } from '../../features/common/normSlice';

function TopBanner(props) {

	const { currHeight } = useSelector(NormSelector)

	const { TopBannerData, TopBanner, error, TopBanner_url, TopBanner_video_play } = useSelector(MovieSelector)
	const temp = TopBanner_url
	const ref = useRef(null)
	const ref2 = useRef(null)
	const [isMuted, setMuted] = useState(true)
	const [videoPlayed, setVideoPlayed] = useState(false)


	const [divHeight, setDivHeight] = useState(0);

	const [CurrMovie, setCurrMovie] = useState({})


	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchTopBanner());
	}, [dispatch]);



	useEffect(() => {
		if (!TopBannerData) {

			const at = Math.floor(Math.random() * (TopBanner.items).length)
			setCurrMovie({
				image: TopBanner.images[at],
				data: TopBanner.items[at]



			})
			dispatch(setTopBannerVideo_url(TopBanner.images[at].trailers))

		}
	}, [TopBannerData])


	useEffect(() => {

		if (ref2) {
			if (currHeight > ref2.current?.offsetHeight / 2) {
				dispatch(setTopBannerVideo_play(false))
				dispatch(setTopBannerVideo_url(""))
			}

		}
	},
		[currHeight])
	useEffect(() => {

		if (ref.current)

			setDivHeight(ref.current.clientHeight);


	}, [CurrMovie]);
	return (
		<Wrapper ref={ref2}>
			{CurrMovie.image

				&&

				<div className='MovieContainer' >
					<img className={`fillImg ${TopBanner_video_play ? "video-in" : "video-out"}`} src={CurrMovie.image.backdrop_path} alt="" />

					<div className='bottomHide'>
						<div className='inner'></div>
					</div>
					<div className='fillInformation' >
						<div className='inforContain'>
							<div className='text-and-desc' >
								<div className={`logosContain  ${TopBanner_video_play ? "transForm-in" : "transForm-out"}`}

									style={{ transform: TopBanner_video_play ? `scale(0.5) translate3d(0px,${divHeight + 35 + "px"}, 0px) ` : "scale(1) translate3d(0px, 0, 0px)" }}

								>
									<img className='Small-scail' src={CurrMovie.image.logos ? CurrMovie.image.logos : undefined} alt="" />
								</div>



								<div ref={ref} heighttomove={divHeight} className={`textinfo textContain HideText ${TopBanner_video_play ? "HideText-in" : "HideText-out"}`}>
									{CurrMovie.data.overview}
								</div>




								<div className='btnContain' style={{ display: "flex" }}>
									<button className='btn play-btn' style={{ marginRight: "10px", verticalAlign: "middle" }}>

										<span style={{ whiteSpace: "nowrap" }}>

											<span><FaPlay style={{ width: "1em" }}></FaPlay></span> Play
										</span>


									</button>
									<button className='btn info-btn'

										onClick={(e) => {
											e.preventDefault()
											dispatch(setOpenHero(true))
											// console.log({data:{...CurrMovie},temp})
											dispatch(setHeroData(

												{ ...CurrMovie }



											))
										}}
									>
										<span style={{ whiteSpace: "nowrap" }}>
											<span style={{ position: "relative", top: "-1px", marginRight: "3px" }}><FaInfoCircle></FaInfoCircle></span>
											<span >
												<a href="" style={{ fontSize: "100%" }}>
													More Info

												</a>

											</span>
										</span>
									</button>
								</div>

							</div>
						</div>
					</div>
					<div className='replay-mute'>
						<span className='ActionBtn' onClick={() => {

							setMuted(!isMuted);
							if (!TopBanner_url)
								dispatch(setTopBannerVideo_url(CurrMovie.image.trailers))

						}}


						> <span className='outerCirce'>

								{!TopBanner_video_play ? !videoPlayed ? <FaPlay></FaPlay> :

									<MdReplay></MdReplay>
									:

									< >
										{isMuted ? <GoMute /> : <GoUnmute />}
									</>}


							</span>


						</span>
						<span className='TypeOfData'> {CurrMovie.data.media_type}</span>



					</div>
					<div className='video'


						style={{ pointerEvents: 'none' }}
					>
						<div>

							{TopBanner_url && <ReactPlayer className="size " url={TopBanner_url}
								// onContextMenu={e => e.preventDefault()}
								width="100%"
								height="100%"

								playing={true}
								frameBorder="0"
								muted={isMuted}
								onPlay={() => {
									// setVideoPlay(true);
									dispatch(setTopBannerVideo_play(true))

								}}
								onEnded={() => {
									dispatch(setTopBannerVideo_play(false))

									// setVideoPlay(false); 
									setVideoPlayed(true);
									dispatch(setTopBannerVideo_url(""));
								}}
								config={{
									youtube: {
										playerVars: {
											disablekb: 1,
											iv_load_policy: 3
										}
									}
								}}

							/>}

						</div>

					</div>
				</div>
			}

		</Wrapper>
	);
}

const Wrapper = styled.div` 
background-color: #000;
height: 50vw;
position: absolute;
width: 100%;
z-index: 0;

.MovieContainer {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	position: absolute;

	.fillImg {
		max-height: 100%;
		width: 100%;
		${'' /* opacity:0; */}
	}

	.video-in {
		background-color: #f8f8f8;
		opacity: 0;
		visibility: hidden;

		transition: all 2s ease-in-out;
	}

	.video-out {
		${'' /* background-color:#f8f8f8; */} opacity: 1;
		visibility: visible;

		transition: all 2s ease-in-out;
	}

	.bottomHide {
		position: absolute;
		width: 100%;
		height: 30%;

		.inner {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: linear-gradient(to bottom, transparent 0%, black 84%);
		}

	}
}

.replay-mute {
	align-items: center;
	bottom: 35%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	position: absolute;
	right: 0;

	.TypeOfData {
		align-items: center;
		background-color: rgba(51, 51, 51, .6);
		border: 3px #dcdcdc;
		border-left-style: solid;
		box-sizing: border-box;
		display: flex;
		font-size: 1.1vw;
		height: 2.4vw;
		padding: 0.5vw 3.5vw 0.5vw 0.8vw;

	}

	.ActionBtn {

		.outerCirce {
			display: inline-block;
			margin-right: 5px;
			background-color: transparent;
			/* border: 1px solid rgba(255, 255, 255, 0.7); */
			color: #DCDCDC;
			border-radius: 50%;
  			box-shadow: 0 0 2px #888;
			  /* line-height: 18px; */
  			padding: 0.4em 0.6em;
		}
	}

}

.fillInformation {
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	height: 100%;

	.inforContain {

		bottom: 35%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		left: 4%;
		position: absolute;
		top: 30%;
		width: 36%;
		z-index: 10;

		.text-and-desc {


			transition: transform 1.5s cubic-bezier(.165, .84, .44, 1);
			width: 100%;
		}

		.logosContain {
			width: 100%;

			img {
				width: 23vw;

				${'' /* mix-blend-mode: lighten; */}
			}
		}

		.transForm-in {
			transform-origin: left bottom;


			transition-duration: 4000ms;
			transition-delay: 5000ms;
			mix-blend-mode: lighten;
		}


		.transForm-out {
			transform-origin: left bottom;

			transition-duration: 4000ms;
			transition-delay: 30ms;
		}

		.HideText-in {

			transition: all 4000ms ease-in-out;
			opacity: 0;
			visibility: hidden;


		}

		.HideText-out {

			transition: all 2000ms ease-in-out;
			opacity: 1;
			visibility: visible;


		}

		.textContain {
			margin: 10px 0 10px;
			text-align: justify;
			text-justify: inter-word;
			font-size: 13px;
			backdrop-filter: blur(10px) saturate(50%);
			max-height: 20vh;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			/* number of lines to show */
			line-clamp: 3;
			-webkit-box-orient: vertical;
		}


	}

	.play-btn {
        background: white;
		color: black;
		

		&:hover {
			background: rgba(255, 255, 255, 0.50);
		}
	}

	.info-btn {
		background: rgba(109, 109, 110, 0.7);
		color: white;
        a{
            color: white;
        }

		&:hover {
			background: rgba(109, 109, 110, 0.3);
		}
	}
}


${'' /* video */} .video {
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	overflow: hidden;
	width: 100%;
	height: 100%;
	aspect-ratio: 16/9;
	pointer-events: none;
	visibility: visible;

	div {

		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		z-index: -1;

		iframe {

			position: absolute;
			top: 50%;
			left: 50%;
			height: 120%;
			width: 500%;
			pointer-events: none;
			${'' /* z-index: -1; */} transform: translate(-50%, -55%);
		}
	}
}

@media only screen and (max-width: 640px) {

	.play-btn,
	.info-btn {
		font-size: 0.3rem;
		max-height: 20px;
	}

	.textContain {

		display: none !important;
	}

	.logosContain {
		width: 100%;

		img {
			width: 30vw !important;
			margin-bottom: 3rem;
			${'' /* mix-blend-mode: lighten; */}
		}
	}

	.fillInformation {
		top: 50px;
	}

	.outerCirce {
		padding: 10% !important;
	}

}


`

export default TopBanner;