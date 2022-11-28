import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NormSelector } from '../../features/common/normSlice';
import { HeroSelector, setOpenHero, setHeroVideoPlaying, setHeroUrl } from '../../features/hero/heroSlice'
import { setTopBannerVideo_url, setTopBannerVideo_play, } from '../../features/movie/movieSlice'
import { AiFillCloseCircle } from "react-icons/ai";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { GoMute, GoUnmute } from "react-icons/go";
import { MdReplay } from "react-icons/md";
import ReactPlayer from 'react-player'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { fetchHeroDetail } from '../../features/hero/heroSlice'
import axios from 'axios';
import { TMDB_API } from '../../utils/api/index'
import {
    useQuery,
} from '@tanstack/react-query'
import { HiOutlineCollection } from "react-icons/hi";
import SameTypeCard from './SameTypeCard'
import SameType from './SameType';




const { get_logo, get_collection, get_cast, get_same_type } = TMDB_API
// https://image.tmdb.org/t/p/w300/yo0qfH2dQGGMxkfivdkz5zxVatD.jpg
// 50GgtdTIHJk

const fetchActor = async (id) => {

    let res;
    try {
        const data = await axios.get(get_cast(id))
        res = data.data
    }
    catch (err) {
        console.log(err)
        res = null

    }

    return res


}
const fetchColection = async (id, type) => {

    if (!id) { return null }
    let res = {};
    try {
        const temp = await axios.get(type(id))

        let ids = type == get_collection ? temp.data.parts : temp.data.results


        let dataf = await Promise.all(ids.map(async (i) => {

            const logo = await axios.get(get_logo(i.id))
            let temp2 = logo.data
            let { id, overview, vote_average, title, images: { backdrops: [backdrop_0, ...rest], logos: [logo_0, ...rest1] }, release_date } = temp2


            // backdrop_path
            //poster_path
            return { id, overview, vote_average, title, backdrop_0, logo_0, release_date }
        }))
        res = dataf
    }
    catch (err) {
        console.log(err)
        res = null

    }


    return res
}
function Hero() {


    const dispatch = useDispatch();
    const { currHeight } = useSelector(NormSelector)
    const { openHero, HeroData, HeroUrl, HeroVideoPlaying, HeroDetail } = useSelector(HeroSelector)
    const { image, data } = HeroData
    const [ShowHero, setShowHero] = useState("hideHero")
    const [isMuted, setMuted] = useState(true)
    
    const { isError, isSuccess, isLoading, data: FilmCrews, error } = useQuery(["mmovie"+data.id], () => fetchActor(data.id), { staleTime: 60000 })



    let { isSuccess: Colection_isSuccess, isLoading: Colection_isLoading, data: Colection_data, refetch } = useQuery(["colection", HeroDetail["belongs_to_collection"]], () => fetchColection(HeroDetail["belongs_to_collection"]["id"], get_collection),
        {
            enabled: !!HeroDetail["belongs_to_collection"],
        }
    )
    let { isSuccess: Sametype_isSuccess, data: Sametype_data } = useQuery(["sametype"], () => fetchColection(data.id, get_same_type)

    )

    // console.log(Sametype_isSuccess, Sametype_data)



    useEffect(() => {

        dispatch(fetchHeroDetail(data.id))

    }, [dispatch])

    if (openHero) {
        document.body.style.overflowY = "hidden";
    }
    useEffect(() => {
        dispatch(setTopBannerVideo_url(""))
        dispatch(setTopBannerVideo_play(false))
    }, [
        dispatch
    ])

    useEffect(() => {

        let timerId;
        // if (ShowHero && !openHero) {
        //     timerId = setTimeout(() => {
        //         setShowHero(
        //             false
        //         );
        //         document.body.style.overflowY = "scroll";
        //     }, 1200);

        // }
        // return () => clearTimeout(timerId);
        if (openHero && ShowHero === "hideHero") {
            timerId = setTimeout(() => {
                setShowHero(
                    "showHero"
                );
            }, 200);

        }
        else if (!openHero && ShowHero === "showHero") {
            timerId = setTimeout(() => {
                setShowHero(
                    "hideHero"
                );
            }, 200);
        }



        return () => clearTimeout(timerId);
    }, [openHero])

    return (


        <div>


            <Wapper id='outerWrapper' style={{
                overflowY: "scroll", top: `${currHeight}px`
                ,

            }} onClick={(e) => {
                if (e.target.id === "outerWrapper") {

                    // document.body.style.overflowY = "scroll";
                    dispatch(setHeroVideoPlaying(false))

                    dispatch(setOpenHero(false))
                }

            }}
                className={`${ShowHero}`}>


                <div className={`hero-container `}>


                    <div className='close-icon' onClick={() => {
                        dispatch(setHeroVideoPlaying(false))

                        dispatch(setOpenHero(false))
                    }}>
                        <AiFillCloseCircle size={45}></AiFillCloseCircle>
                    </div>



                    <div className='logo-container'>
                        <div className='fade-video'>
                            <div></div>
                        </div>
                        <div className='logoImg'>
                            <div className='logo'>
                                <img src={image.logos ? image.logos : undefined} className={"logocontain"} alt="" />
                                <div className='btnControl'>
                                    <button className='btn' style={{ display: "inherit" }}>
                                        <FaPlay className='playIcon' size={20}></FaPlay>
                                        <span style={{ fontSize: "70%" }}>Play</span> </button>


                                    <AiOutlinePlusCircle size={35} className='addbtn'></AiOutlinePlusCircle>

                                </div>

                            </div>
                            <div className='replay-mute' onClick={() => {
                                setMuted(!isMuted);
                                if (!HeroUrl)
                                    dispatch(setHeroUrl(image.trailers))

                            }}>
                                <span className='outerCirce' >
                                    {/* <MdReplay size={20}></MdReplay> */}
                                    {!HeroVideoPlaying ? HeroUrl !== "" ? <FaPlay size={20}></FaPlay> :

                                        <MdReplay size={20}></MdReplay>
                                        :

                                        <span >
                                            {isMuted ? <GoMute size={20} /> : <GoUnmute size={20} />}
                                        </span>}


                                </span>
                            </div>
                        </div>

                    </div>

                    <div className={`imgContainer `}>
                        <img className={`${HeroVideoPlaying ? "in" : "out"}`} src={image.backdrop_path_original} alt="" />
                    </div>
                    <div className='video-container'>
                        <div className="video-player">
                            <div>
                                {HeroUrl && <ReactPlayer url={HeroUrl}
                                    // onContextMenu={e => e.preventDefault()}
                                    width="100%"
                                    height="100%"

                                    playing={true}
                                    frameBorder="0"
                                    muted={isMuted}
                                    onPlay={() => {

                                        dispatch(setHeroVideoPlaying(true))

                                    }}
                                    onEnded={() => {
                                        dispatch(setHeroVideoPlaying(false))


                                        dispatch(setHeroUrl(""));
                                    }}
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                disablekb: 1,
                                                iv_load_policy: 3
                                            }
                                        }
                                    }}
                                ></ReactPlayer>}

                            </div>
                        </div>
                    </div>

                    {HeroDetail &&
                        <div className='info-container'>
                            <div className='detail-container'>

                                <div className='info'>
                                    <div>
                                        <div className='LR-info'>

                                            <div>
                                                <div >


                                                    <p>

                                                        <span style={{ color: "red", fontSize: "1rem" }}>
                                                            {(parseFloat(HeroDetail.vote_average) * 10).toFixed()}% Match
                                                        </span>
                                                        <span style={{ color: "white", fontSize: "1rem" }} >  {(new Date(HeroDetail.release_date)).getFullYear()}                                                              {HeroDetail.runtime} Minutes</span>

                                                    </p>
                                                </div>



                                                <div style={{ color: "white", fontSize: "0.8rem" }}>{HeroDetail.overview}</div>
                                            </div>
                                            <div>

                                                <p style={{ color: "white", fontSize: "1rem", margin: "0.5em 0.5em 0.5em 0" }}>

                                                    <span style={{ color: "#777" }}>Cast: </span>
                                                    {isSuccess && console.log(FilmCrews)}
                                                    {isSuccess && FilmCrews.cast.slice(0, 3).map((value, index) => {

                                                        return <span key={data.id + "cast" + index}>{value.name}{index < 3 - 1 ? ", " : ""}</span>

                                                    })}

                                                </p>
                                                <p style={{ color: "white", fontSize: "1rem", margin: "0.5em 0.5em 0.5em 0" }}>

                                                    <span style={{ color: "#777" }}>Genres: </span>
                                                    {HeroDetail["genres"] && HeroDetail["genres"].map((value, index) => {

                                                        return <span key={data.id + "genres" + index}>
                                                            {value.name}{index < HeroDetail["genres"].length - 1 ? ", " : ""}
                                                        </span>

                                                    })}

                                                </p>




                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {Colection_isSuccess &&
                                    <SameType name={HeroDetail["belongs_to_collection"].name} Contain_data={Colection_data}></SameType>
                                }
                                {Sametype_isSuccess &&
                                    <SameType name={"More Like This"} Contain_data={Sametype_data}></SameType>
                                }
                                <div className='about'>
                                    <h3 style={{ marginBottom: "20px", marginTop: "50px" }}>About This movie</h3>
                                    <p style={{ color: "white", marginBottom: "20px" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint officiis ratione, animi molestiae in corrupti placeat, consectetur repudiandae dicta enim doloribus tempora quo illo cumque facilis molestias, error totam veritatis dolore vero hic aperiam dignissimos laboriosam quos. Sint perspiciatis nemo ab, voluptas iste ea perferendis minus, consectetur voluptatem est magnam.</p>
                                </div>

                            </div>
                        </div>
                    }



                </div>

            </Wapper>
        </div>

    );
}

const Wapper = styled.div`
height:100vh;
width: 100%;
box-sizing: border-box;
display: flex;
justify-content: center;
left: 0;
position: absolute;
top: 0;


background-color: rgba(0, 0, 0, 70%);
z-index: 10;


.hero-container {

	width: 50%;
	height: max-content;
	left: auto;
	box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
	z-index: 2;

	margin-bottom: 5%;
	margin-top: 5%;
	min-width: 850px;
	background-color: black;
	position: absolute;

}

.logo-container {
	position: relative;

	.fade-video {

		position: absolute;
		width: 100%;
		padding-top: 56.25%;

		div {
			position: absolute;
			bottom: 0;
			${'' /* left: 2em; */} width: 100%;
			height: 50%;
			background: red;
			z-index: 11;
			background: linear-gradient(0deg, #181818, transparent 50%);
		}
	}

	.logoImg {

		position: absolute;
		width: 100%;
		padding-top: 56.25%;
		z-index: 11;

		.logo {
			position: absolute;
			bottom: 5%;
			left: 2em;
			width: 40%;


		}


	}

}

.video-container {
	position: relative;

	.video-player {
		width: 100%;

		height: 100%;
		aspect-ratio: 16/9;

		div {
			width: 100%;
			height: 100%;
			position: relative;
			overflow: hidden;

			iframe {

				position: absolute;
				top: 50%;
				left: 50%;
				height: 150%;
				width: 500%;
				pointer-events: none;
				${'' /* z-index: -1; */} transform: translate(-50%, -55%);
			}
		}

	}
}

.imgContainer {
	position: relative;
	background: white;


	.in {
		transition: all 2s ease-in-out;
		background-color: #f8f8f8;
		opacity: 0;
		visibility: hidden;

	}

	.out {
		transition: all 2s ease-in-out;

		opacity: 1;
		visibility: visible;

	}

	img {
		position: absolute;

		width: 100%;

		z-index: 10;

		.in {
			transition: all 2s ease-in-out;
			background-color: #f8f8f8;
			opacity: 0;
			visibility: hidden;

		}

		.out {
			transition: all 2s ease-in-out;

			opacity: 1;
			visibility: visible;

		}
	}
}

.close-icon {
	position: relative;

	svg {

		display: block;
		cursor: pointer;
		margin: 1em;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 15;
		color: white;

	}
}

.btnControl {
	align-items: center;
	display: flex;
	margin-bottom: 1em;
	margin-top: 2em;
	min-height: 2em;
	cursor: pointer;
}

.btn {
	background: white;

}

.addbtn {
	margin-left: 10px;
	color: white;
}

.logocontain {
	width:90%;
}

.replay-mute {
	align-items: center;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	position: absolute;
	right: 5%;
	bottom: 10%;

	.outerCirce {
		margin-right: 5px;
		background-color: transparent;
		border: 1px solid rgba(255, 255, 255, 0.7);
		color: #DCDCDC;
		border-radius: 50%;
		border: 2px solid grey;
		padding: 10px;
	}
}

.info-container {
	background-color: #181818;

	.detail-container {
		padding: 0 3em;

		.LR-info {
			background-color: #181818;
			display: grid;
			position: relative;
			width: 100%;
			column-gap: 2em;
			grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		}
	}
}

@media only screen and (max-width:1007px) {
	.hero-container {
		min-width: unset !important;
		width: 80%;
	}

	.logo {
		width: 20vw !important;
	}

	.outerCirce {
		border: none !important;
		margin-right: -15px !important;
	}

	.close-icon svg {
		width: 15px;
	}

	.playIcon {
		display: none;
	}
}


`
export default Hero;