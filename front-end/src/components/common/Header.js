/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo-no-background.svg'
import avatar from '../../assets/avttar.png'
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NormSelector, setOpenSearch, setSearchValue, } from '../../features/common/normSlice';

import { AiFillCaretDown, AiOutlineClose } from "react-icons/ai";
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TMDB_API } from '../../utils/api/index.js'
import { fetchMovieGenre } from '../../features/movie/movieSlice'
import { UserSelector, setUser } from '../../features/user/userSlice';
import axios from 'axios';
const { genres } = TMDB_API
let list = ["Home", "Movies", "My List"]
let to = ['/Home', "/Movies", "/List"]

function Header(props) {
    const { userName, loading } = useSelector(UserSelector);
    const [showMenu, setShowMenu] = useState(false);

    const idas = useLocation()
    const dispatch = useDispatch()
    const { currHeight, searchBar: { openSearch, searchValue } } = useSelector(NormSelector)

    const [currActive, setCurrActive] = useState(() => {
        if (idas.pathname === '/Home')
            return "Home"
        return idas.pathname.slice(1)

    })
    const [currGenres, SetcurrGenres] = useState(0)
    // const [openSearch, setOpenSearch] = useState(false)
    const [HideNav, setHideNav] = useState(60)
    const [stay, sethStay] = useState("top")

    const wrapperRef = useRef(null);
    const OuterWrapper = useRef(null)

    const navigate = useNavigate();
    useEffect(() => {

        setCurrActive(() => {
            if (idas.pathname === '/Home')
                return "Home"
            return idas.pathname.slice(1)
        })

    }, [idas])

    useEffect(() => {

        let timeId = setTimeout(() => {
            if (searchValue)
                navigate(`/search/${searchValue}`)
        }, 700)

        return () => clearTimeout(timeId)
    }, [searchValue])

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */

        if (openSearch) {
            function handleClickOutside(event) {
                if (!event.target.value && wrapperRef.current && !wrapperRef.current.contains(event.target)) {

                    dispatch(setOpenSearch(false))
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [dispatch, openSearch, wrapperRef]);
    const checkActive = (e) => {

        if (currActive === e)
            return "active navLink"

        return "not-active navLink"
    }
    useEffect(() => {
        const changeSize = () => {
            setHideNav(OuterWrapper.current.offsetHeight)

        }
        window.addEventListener("resize", changeSize);
        return () => window.removeEventListener("resize", changeSize)
    }, [])
    useLayoutEffect(() => {
        setHideNav(OuterWrapper.current.offsetHeight)

    }, [])

    useEffect(() => {
        var lastVal = 0
        window.onscroll = function () {
            let y = window.scrollY
            if (y > lastVal) { sethStay("down") }
            if (y < lastVal) { sethStay("up") }
            if (y === 0) { sethStay("top") }
            lastVal = y
        }
    }, [])

    return (
        <>


            <Wrapper ref={OuterWrapper} style={{ background: currActive === "Home" ? currHeight === 0 ? "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)" : "black" : "black", top: stay === "top" ? "0px" : stay === "down" ? "-" + 100 + "px" : 0 + "px" }}>




                <div style={{ display: "flex" }}>
                    <Link to={userName ? '/Home' : '/'}>
                        <img className='logoNetflix' src={logo} alt="" />
                    </Link>
                    <ul className='navigation-container'>

                        {list.map((i, index) => {
                            return <li key={"los" + i + index} className="navigation-tab ">
                                <Link to={to[index]} className={checkActive(i)} style={{ fontSize: "1rem" }} onClick={(e) => { setCurrActive(e.target.textContent) }}>
                                    {i}


                                </Link>


                            </li>
                        })}





                    </ul>
                    <DropDown >
                        <button className="dropbtn">
                            <a>{currActive}</a> <AiFillCaretDown></AiFillCaretDown>
                        </button>
                        <div className="dropdown-content">
                            {list.map((i, index) => {
                                if (i !== currActive)
                                    return <Link key={"link2" + index} style={{ fontSize: "0.5rem" }} to={to[index]} onClick={(e) => { setCurrActive(e.target.textContent) }}>{i}</Link>

                            })}

                        </div>

                    </DropDown>

                </div>

                <div className='user-search' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginRight: "1em", overflow: "hidden" }}>

                    <div ref={wrapperRef} className='box-search' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid white", marginRight: "1em", padding: "2px", left: openSearch ? "0px" : "999px" }}>
                        <FaSearch ></FaSearch>

                        <input className='Input' style={{ width: "auto", height: "1em", background: "transparent", border: "none", outline: "none", color: "white" }} placeholder="Titles, Peoples, Genres" onChange={(e) => {
                            // e.preventDefault()
                            dispatch(setSearchValue(e.target.value))


                        }} value={searchValue}></input>
                        <AiOutlineClose onClick={() => { dispatch(setOpenSearch(false)) }}></AiOutlineClose>
                    </div>


                    <FaSearch style={{ display: !openSearch ? "inline" : "contents", marginRight: "10px", transition: "visibility 0s, opacity 0.5s linear" }} onClick={() => { dispatch(setOpenSearch(true)) }}></FaSearch>


                    <div>
                        <DropDown style={{ display: "block", }} >
                            <img className='avatar' src={avatar} alt="" style={{ zIndex: "999" }} />

                            <div className="dropdown-content-grid" style={{ marginLeft: "-3rem", gridTemplateColumns: "repeat(1,1fr)", gridTemplateRows: "repeat(2,1fr)" }}>
                                <a onClick={async () => {
                                    try {
                                        await axios.delete('/api/v1/auth/logout');
                                        localStorage.removeItem("user")
                                        dispatch(setUser(null))
                                    } catch (error) {

                                        console.log(error);
                                    }

                                }}>
                                    Logout

                                </a>

                                <a onClick={() => {

                                }}>
                                    Profile

                                </a>


                            </div>

                        </DropDown>
                    </div>


                </div>



            </Wrapper>
            {currActive === "Movies" &&
                <GenresSlect style={{ top: stay === "top" ? (HideNav - 2) + "px" : stay === "down" ? 0 + "px" : HideNav - 2 + "px" }}>
                    <div style={{ display: "flex" }}>

                        <h3>Movies</h3>
                        <DropDown style={{ display: "block", border: " 1px solid  white" }} >
                            <button className="dropbtn" style={{ padding: "10px 12px" }}>
                                <a>{genres[currGenres].name
                                }</a> <AiFillCaretDown></AiFillCaretDown>
                            </button>
                            <div className="dropdown-content-grid" style={{ marginLeft: "1rem" }}>
                                {genres.map((i, index) => {
                                    if (index !== currGenres)
                                        return <a key={"gerrasd" + i.id} onClick={() => {
                                            SetcurrGenres(index)
                                            dispatch(fetchMovieGenre(i.id, 1))
                                        }}>
                                            {i.name}

                                        </a>

                                })}

                            </div>

                        </DropDown>

                    </div>
                </GenresSlect>}
        </>

    );
}
const Wrapper = styled.div`
width:100%;
position: fixed;

color:white;
z-index:9;
height:60px;
display: flex;
justify-content: space-between;
font-size:20px;
align-items: center;
transition: all 0.3s ;
.logoNetflix {
	margin-left: 50px;
	margin-right: 30px;

	width: 100px;
}

.navigation-container {
	align-items: center;
	display: flex;
	margin: 0;
	padding: 0;

}
.Input{
    ::placeholder {
    font-weight: bold;
    opacity: 0.5;
    color: white;
}
}
.navigation-tab {
	margin-left: 10px;

	.active {
		color: red;
	}

	.not-active {
		color: white;
	}

	.navLink:hover {
		color: #b3b3b3;

	}
}

.box-search {
	position: relative;
	${'' /* left: 602px; */} 
	transition: left 0.5s;
    /* width: 30%; */
    input{
        width: auto  !important;;
    }
    overflow:hidden ;
}


@media only screen and (max-width: 700px) {
	.logoNetflix {
		margin-left: 1rem;
		margin-right: 1rem;
        margin-top: 0.5rem;
		width: 30px;
        height:15px;
	}

	font-size:5px;
	height:30px;

	.navigation-container {
		display: none;
	}

	.avatar {
		height: 100%;
		width: 100%;
	}
}
`
const DropDown = styled.div`
float: left;
overflow: hidden;
display: none;

.dropbtn {
	font-size: 1em;
    white-space: nowrap;
	border: none;
	outline: none;
	color: white;
	padding: 14px 16px;
	background-color: inherit;
	font-family: inherit;
	margin: 0;
}

.dropdown-content {
	display: none;
	position: absolute;
	background-color: rgba(0, 0, 0, .9);
    width: 2em;
	min-width: 100px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 7;
}
.dropdown-content-grid{
    
	position: absolute;
    right: -99999px;

	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 7;

    display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(6, 1fr);
grid-column-gap: 10px;
grid-row-gap: 2px;
align-items: center;
align-self: center;
background-color:  rgba(0, 0, 0, .9);
@media only screen and (max-width: 600px) {
grid-template-columns: repeat(2, 1fr);
grid-template-rows: repeat(7, 1fr);
}
}

.dropdown-content a {
	float: none;
	color: red;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
	text-align: center;
	font-size: 7px;
	margin: 0;
	cursor: pointer;
}
.dropdown-content-grid a {
	float: none;
	color: red;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
	text-align: center;
	font-size: 15px;
	margin: 0;
	cursor: pointer;
}

.dropdown-content a:hover {
	background-color: rgba(255, 255, 255, .1);
}
.dropdown-content-grid a:hover {
	background-color: rgba(255, 255, 255, .1);
    text-decoration: underline;
}

&:hover .dropdown-content {
	display: block;
}
&:hover .dropdown-content-grid {
	right:auto;
}

@media only screen and (max-width: 600px) {
	display: block;
}
`
const GenresSlect = styled.div`
width:100%;
position: fixed;
color:white;
z-index:7;
height:60px;
display: flex;
justify-content: space-between;
background-color: black;
transition: all 0.25s ;
align-items: center;

div{


margin-left: 50px;
}

@media only screen and (max-width: 700px) {
    div{


margin-left: 1rem;
}

}
.dropmenu{
    margin-left: 0;
    padding: 0;
    position: absolute;
    right: 0;
    top: 52px;
    width: 220px; 
    display: flex;
    flex-direction: row;
}

`
export default Header;