import React from 'react';
import styled from 'styled-components';
import { VscMute, VscUnmute } from "react-icons/vsc";
import {
	BiCheck,
	BiCaretDown,
	BiPlay
} from "react-icons/bi";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ReactPlayer from 'react-player'
import { useState } from 'react';
import { setTopBannerVideo_play, setTopBannerVideo_url } from '../../features/movie/movieSlice'
import { useDispatch } from 'react-redux';
import onBad from '../../assets/no-img.jpg';
import { setOpenHero, setHeroData } from '../../features/hero/heroSlice'

function Card({ direction, detail, images }) {
	const { backdrop_path,

		trailers, logos } = images
	const dispatch = useDispatch()

	const [isMuted, setMuted] = useState(true)
	const [urlWatch, setUrl] = useState("")
	const [imgHide, setImgHide] = useState(false)
	const [logoHide, setLogoHide] = useState(false)
	const [muteHide, setMuteHide] = useState(true)
	const [VideoShow, setVideoShow] = useState(false)
	const [imgError, setImgError] = useState(backdrop_path)
	const onTrailerReady = () => {
		setImgHide(true)
		setLogoHide(true)
		setMuteHide(false)
	}
	const resetTrailer = () => {
		setImgHide(false)
		setLogoHide(false)
		setMuteHide(true)
	}
	return (



		<Square direction={direction} onMouseLeave={() => {
			setUrl(""); setImgHide(false); setLogoHide(false); setMuteHide(true);
			setMuted(true);
			setVideoShow(false);
		}} onMouseEnter={() => { setUrl(trailers); setVideoShow(true); }}

		>
			<div className="cover">
				{VideoShow && <div className='video'>
					<div>



						{urlWatch &&

							<ReactPlayer className="size " url={urlWatch} style={{ borderRadius: "10px 10px 0 0" }}
								// onContextMenu={e => e.preventDefault()}
								width="100%"
								height="100%"

								playing={true}
								muted={isMuted}
								frameBorder="0"
								onPlay={() => {
									onTrailerReady();
									dispatch(setTopBannerVideo_play(false))
									dispatch(setTopBannerVideo_url(""))
								}}
								onEnded={() => resetTrailer()}
								config={{
									youtube: {
										playerVars: {
											disablekb: 1,
											iv_load_policy: 3
										}
									}
								}}
							/>
						}
					</div>

				</div>}



				{logos && <div className={`logo ${logoHide && "logoHide"}`}>
					<LazyLoadImage alt='container logo' src={logos} onError={(curr) => {

						curr.onerror = null;
						curr.src = "../../assets/no-img.jpg"


					}}></LazyLoadImage>

				</div>}


				<div className={`mute ${muteHide ? "muteHide" : "muteShow"}`} onClick={() => {
					setMuted(!isMuted)
				}}>
					<span>
						{!isMuted ? <VscUnmute></VscUnmute> : <VscMute></VscMute>}

					</span>
				</div>
				<div className={`imgContainer ${imgHide && "hide"}`} >

					<LazyLoadImage alt='container image' style={{ borderRadius: "10px" }}
						className="LazyLoadimage"

						onLoadedData={() => { console.log("Load") }}
						src={imgError} onError={(curr) => {
							setImgError(onBad)


						}
						}
					></LazyLoadImage>

				</div>



			</div>
			<div className="text" style={{ borderRadius: " 0 0 10px 10px" }}>
				<div className="icons">
					<span><BiPlay></BiPlay></span>
					<span><BiCheck></BiCheck></span>
					<span onClick={() => {
						dispatch(setOpenHero(true))
						dispatch(setHeroData(

							{ image: images, data: detail }



						))
					}} ><BiCaretDown></BiCaretDown></span>
				</div>
				<div className="info">

					<span className="match">98% Match</span>
					<span className="seasons">111 Minutes</span>
				</div>
			</div>

		</Square>

	);

}
const Square = styled.div` 
width:100%;
height: 100%;
transition-delay: 500ms;
transition: transform 500ms ease-out,
border-radius 500ms ease-out;
position:relative;
z-index:5;
overflow:visible;
border-top-left-radius: 10px;
border-top-right-radius: 10px;

.cover {
	overflow: visible;

	width: 100%;
	height: 100%;
	position: relative;
	border-radius: 10px;
	

	.logoHide {

		transition-delay: 4s;

		visibility: hidden;
		opacity: 0;
	}

	.muteShow {

		transition-delay: 1.5s;

		visibility: visible;
		opacity: 1;


	}

	.muteHide {
		transition-delay: 700ms;

		visibility: hidden;
		opacity: 0;
	}

	.mute {
		position: absolute;
		bottom: 0.9em;
		right: -4px;
		z-index: 1;
		width: 30px;
		height: 25px;
	}

	.logo {
		position: absolute;
		bottom: 0.5rem;
		left: 10px;
		z-index: 1;
		width: 4.5rem;
		height: auto;

		object-fit: cover;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center center;
		}

	
	}
}


.imgContainer {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	visibility: visible;
	opacity: 1;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	
	img{
		width: 100%;
		height: 100%;
		display: block;

	object-fit: cover;
	}

	&.hide {

		transition-delay: 1.5s;

		visibility: hidden;
		opacity: 0;


	}

}


.text {
	visibility: hidden;
	opacity: 0;
	display: block;
	;
	background: #181818;
	color: #fff;
	width: 100%;
	height: fit-content;
	padding: 5px;
	box-sizing: border-box;
	transition-delay: 500ms;
	transition: opacity 500ms ease-out, border-radius 500ms ease-out;

}

.video {
	width: 0;
	height: 0;
	visibility: hidden;
	overflow: hidden;
}
.LazyLoadimage:hover{
	border-bottom-right-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
}
&:hover {
	z-index: 10;
	box-shadow: 0 0 2px #000a;
	transition-delay: 500ms;
	transform-origin: center center;


	transform: ${props => props.direction === "toLeft" ? "translateX(35%) translateY(0px) scaleX(1.5) scaleY(1.5) translateZ(0px);" :
		props.direction === "toRight" ? "translateX(-35%) translateY(0px) scaleX(1.5) scaleY(1.5) translateZ(0px);" : "translateX(0px) translateY(0px) scaleX(1.5) scaleY(1.5) translateZ(0px);"
	}

;

.text {

	visibility: visible;
	opacity: 1;
	transition: visibility 0s linear 0s, opacity 300ms;
	transition-delay: 0.5s;

	display: block;
	;

}

.video {
	overflow: hidden;
	width: 100%;
	height: 100%;
	aspect-ratio: 16/9;
	pointer-events: none;
	visibility: visible;


	.lost {
		transition-delay: 500ms;

		display: hidden;

	}


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
			height: 145%;
			width: 500%;
			pointer-events: none;
			z-index: -1;
			transform: translate(-50%, -55%);
		}
	}


}
}

.info {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.text .info {
	font-size: 8px;
}

.icons {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.icons :nth-child(3) {
	margin-left: auto;
}

.icons svg {
	display: inline-block;
	border-radius: 50%;
	border: 1px solid #777;
	width: 18px;
	height: 18px;
	margin-right: 2px;

	font-size: 12px;
	text-align: center;
	line-height: 18px;
	font-weight: 1000;
	overflow: hidden;
}

.muteIcon {
	border-radius: 100%;
	border: 1px solid #777;

}

.rating {
	border: 0.1px solid white;
	padding: 1px 2px;

}

.match {
	color: green;
	font-weight: bold;
}

`

export default Card;