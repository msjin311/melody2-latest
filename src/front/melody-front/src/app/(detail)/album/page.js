"use client"

import styles from "./album.css";
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {UserContext} from "../../../contexts/UserContext";
import LikeButton from "../../../components/detail/LikeButton";
import Link from "next/link";
import {GoKebabHorizontal} from 'react-icons/go';

function AlbumDetail() {
    const {userState, userDispatch} = useContext(UserContext);

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState({});

    const [localLikes, setLocalLikes] = useState(0);

    const handleSearch = () => {
        axios
            .get(`/api/albums/search?title=${searchKeyword}`)
            .then((response) => {
                setSearchResults(response.data);

                const initialLocalLikes = {};
                response.data.forEach((album) => {
                    initialLocalLikes[album.albumId] = album.likes;
                });
                setLocalLikes(initialLocalLikes);
            })
            .catch((error) => {
                console.error("Failed to fetch albums:", error);
            });
    };

    const handleSelectChange = (songId) => {
        setSelectedSongs((prevSelectedSongs) => ({
            ...prevSelectedSongs,
            [songId]: !prevSelectedSongs[songId],
        }));
    };

    const handleSelectAll = () => {
        if (Object.keys(selectedSongs).length === songs.length) {
            // If all songs are selected, deselect all
            setSelectedSongs({});
        } else {
            // Otherwise, select all songs
            const allSongIds = songs.map((song) => song.songId);
            const newSelectedSongs = allSongIds.reduce(
                (acc, songId) => ({...acc, [songId]: true}),
                {}
            );
            setSelectedSongs(newSelectedSongs);
        }
    };


    useEffect(() => {
        axios
            .get(`/api/albums`)
            .then((res) => {
                setAlbums(res.data);

            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    console.log(err);
                } else {
                    console.log(err);
                }
            });
        axios.get(`/api/songs`)
            .then((res) => {
                setSongs(res.data);
                console.log("Songs:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch songs:", err);
            });

        // if (albumId === undefined || albumId === null) {
        //     return;
        // }


    }, []);


    // Check if albums array is empty before rendering
    if (albums.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div children="max-w-md mx-auto p-4">

            {/* search */}
            <div className="mb-4">
                <h3 className="text-x1 font-semibold mb-2">Search Album</h3>
                <input
                    type="text"
                    name="searchKeyword"
                    placeholder="Search by title"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="border rounded-md p-2 w-full mb-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            {/* search results */}
            {searchResults.map((album) => (
                <div className="container" key={album.albumId}>
                    <div className="summary_section">
                        <div className="summary_area">
                            <div className="summary">
                                <div className="thumb">
                                    <img
                                        src={albums.find(item => item.albumId === album.albumId)?.coverPhoto}
                                        alt={album.albumTitle}
                                        width={240}
                                        height={240}
                                    />
                                </div>
                                <div className="text_area">
                                    <h2 className="title_area">
                                        <span className="title"> {album.albumTitle} </span>
                                        <span className="title_artist">
                                           {/*{songs.artist && (songs.artist.singerName || songs.artist.groupName)}*/}
                                            {/* {songs.artist && (songs.artist.singerName || songs.artist.groupName)}*/}
                                            {/* {albums.artist &&*/}
                                            {/*     <h3 className="artistName">{albums.artist.singerName || albums.artist.groupName}</h3>}*/}
                                            {album.soloArtist ? album.soloArtist.singerName : album.groupArtist.groupName}
                                        </span>
                                    </h2>
                                    <div className="sub">
                                        <span className="item">{album.releaseDate}</span>
                                    </div>
                                    <div className="album_info">
                                        <div className="info">
                                            <span className="text_info">
                                                {album.albumInfo}
                                            </span>
                                            <a href="#" role="button" className="more">더보기</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="play_with_me">
                                    <div className="play_option">
                                        <button
                                            className="play-button"
                                        >
                                            ▶ 재생
                                        </button>
                                    </div>
                                    <div className="more_option">
                                        <div className="btn_like">
                                            <LikeButton album={album} localLikes={album.likes} setLocalLikes={setLocalLikes}/>
                                            {localLikes[album.albumId] || album.likes}
                                        </div>
                                        <div className="btn_more">
                                            <a href="#" role="button"
                                               className="btn_more">
                                                <GoKebabHorizontal/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="track_section">
                                <div className="section_title">노래</div>
                                <div className="select_all">
                                    <div className="check_area">
                                        <input
                                            type="checkbox"
                                            id="chk_all"
                                            className="input_check"
                                            checked={
                                                Object.keys(selectedSongs).length === songs.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                        <label htmlFor="chk_all"></label>
                                    </div>
                                    <div className="text_area">
                                        <div className="inner">
                                            <span className="text">{songs.filter((song) => song.albumId === album.albumId).length}곡</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="tracklist">
                                    <table border="1">
                                        <caption></caption>
                                        <thead>
                                        <tr>
                                            <th scope="col" className="select"></th>
                                            <th scope="col" className="song"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {songs
                                            .filter((song) => song.albumId === album.albumId)
                                            .map((song, index) => (
                                                <tr key={index}>
                                                    <td className="select">
                                                        <input
                                                            type="checkbox"
                                                            className="input_check"
                                                            checked={selectedSongs[song.songId] || false}
                                                            onChange={() => handleSelectChange(song.songId)}
                                                        />
                                                    </td>
                                                    <td className="inner_thumb">
                                                        <div className="inner">
                                                            <img
                                                                src={albums.find(item => item.albumId === album.albumId)?.coverPhoto}
                                                                width={100}
                                                                height={100}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="song">
                                                        <Link href={`/song/${song.songId}`}>{song.title}</Link>
                                                    </td>
                                                    <td className="artist">
                                                        {song.artist && (song.artist.singerName || song.artist.groupName)}
                                                    </td>
                                                    <td></td>
                                                    <td className="option">
                                                        <GoKebabHorizontal />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlbumDetail;