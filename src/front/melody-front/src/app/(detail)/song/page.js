"use client"

import styles from "./song.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import LikeButton from "../../../components/detail/SongLikeButton";
import Lyrics from "../../../components/detail/MoreButton";
import Youtube from "../../..//components/detail/Youtube";
import {GoKebabHorizontal} from 'react-icons/go';

function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const SongDetail = () => {
    const [songs, setSongs] = useState([]);
    const [genres, setGenres] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [localLikes, setLocalLikes] = useState(0);


    const handleSearch = () => {
        axios
            .get(`/api/songs/search?title=${searchKeyword}`)
            .then((res) => {
                setSearchResults(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch songs:", err);
            });
    };


    useEffect(() => {
        axios
            .get(`/api/songs`)
            .then((res) => {
                setSongs(res.data);
                console.log("Songs:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch songs:", err);
            });
        axios
            .get("/api/genres")
            .then((res) => {
                setGenres(res.data);
                console.log("Genres:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch Genres:", err);
            });
        axios
            .get("/api/albums")
            .then((res) => {
                setAlbums(res.data);
                console.log("Albums:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch Albums:", err);
            });

    }, []);

    if (songs.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main_container">

            {/* search */}
            <div className="search">
                <h3 className="text-xl font-semibold mb-2">Search Songs</h3>
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
            {searchResults.map((song, idx) => (
                <div className="container" key={idx}>
                    <div className="summary_section">
                        <div className="summary_area">
                            <div className="summary_thumb">
                                <img
                                    src={albums.find(album => album.albumId === song.albumId)?.coverPhoto}
                                    alt={song.albumTitle}
                                    width={200}
                                    height={200}
                                    className="thumb_img"
                                />
                            </div>
                            <div className="summary">
                                <div className="text_area_one">
                                    <h2 className="title">
                                        <strong>{song.title}</strong>
                                    </h2>
                                </div>
                                <div className="artistName">
                                    {song.artist && (song.artist.singerName || song.artist.groupName)}
                                </div>
                                <div className="song_info">
                                    <div className="item">{song.songInfo}</div>
                                    <div className="item">장르
                                        : {genres.find((genre) => genre.genreId === song.genreId)?.genreName}</div>
                                </div>
                                <div className="play_with_me">
                                    <div className="play_option">
                                        <button className="play-button">
                                            ▶ 재생
                                        </button>
                                    </div>
                                    <div className="more_option">
                                        <div className="btn_like">
                                            <LikeButton song={song} localLikes={song.likes}
                                                        setLocalLikes={setLocalLikes}/>
                                            {localLikes[song.songId] || song.likes}
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
                        </div>
                        <div className="section_lyrics">
                            <Lyrics song={song}/>
                        </div>
                        <div className="end_section">
                            <h3>
                                <span className="section_title">
                                   수록 앨범
                                </span>
                            </h3>
                            <div className="album_info_area ">
                                <div className="thumb_area">
                                    <Link href={`/album/${albums.find(album => album.albumId === song.albumId)?.albumId}`}>
                                        <img
                                            src={albums.find(album => album.albumId === song.albumId)?.coverPhoto}
                                            width={100}
                                            height={100}
                                        />
                                    </Link>
                                </div>
                                <div className="text_area">
                                    <div className="inner">
                                        <div className="title">
                                            <Link href="/album">
                                                {albums.find(album => album.albumId === song.albumId)?.albumTitle}
                                            </Link>
                                        </div>
                                        <div className="artist">
                                            <Link href='#' className="artist">
                                                {song.artist && (song.artist.singerName || song.artist.groupName)}
                                            </Link>
                                        </div>
                                        <div className="date">
                                            <p>
                                                {new Date(albums.find(album => album.albumId === song.albumId)?.releaseDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="end_section">
                            <h3 className="section_title_wrap">
                                <span className="section_title"><strong>이 곡의 뮤비</strong></span>
                            </h3>
                            <div className="list_wrap_video">
                                <Youtube videoUrl={song.url} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default SongDetail;