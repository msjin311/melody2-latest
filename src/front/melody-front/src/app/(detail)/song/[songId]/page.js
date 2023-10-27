"use client"

import styles from "./songId.css";
import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'next/navigation';
import axios from 'axios';
import {UserContext} from "../../../../contexts/UserContext";
import LikeButton from "../../../../components/detail/SongLikeButton";
import {GoKebabHorizontal} from "react-icons/go";
import Link from "next/link";

function SongDetail() {
    const {userState, userDispatch} = useContext(UserContext);
    const [song, setSong] = useState({});
    const [album, setAlbum] = useState({}); // Add album state


    const [localLikes, setLocalLikes] = useState(0);
    const params = useParams();


    const fetchSongData = () => {
        axios
            .get(`/api/songs/${params.songId}`)
            .then((res) => {
                setSong(res.data);
                // Fetch album data here
                axios
                    .get(`/api/albums/${res.data.albumId}`)
                    .then((albumRes) => {
                        setAlbum(albumRes.data);
                    })
                    .catch((albumErr) => {
                        console.error('Failed to fetch album:', albumErr);
                    });
            })
            .catch((err) => {
                console.error('Failed to fetch song:', err);
            });
    };

    useEffect(() => {
        // Call fetchSongData when params.songId changes or when the component mounts
        fetchSongData();

    }, [params.songId]);

    // // Static code moved here
    // if (!song) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="main_container">
            <div className="container" key={song.songId}>
                <div className="summary_section">
                    <div className="summary_area">
                        <div className="summary_thumb mr-4">
                            <img
                                src={album.coverPhoto}
                                alt={song.albumTitle}
                                width={250}
                                height={200}
                            />
                        </div>
                        <div className="summary">
                            <div className="text_area_one">
                                <h1 className="title">
                                    <strong>{song.title}</strong>
                                </h1>
                            </div>
                            <div className="artistName">
                                {song.artist && (song.artist.singerName || song.artist.groupName)}
                            </div>
                            <div className="song_info">
                                <div className="item">
                                    {song.songInfo}
                                </div>
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
                    <div className="end_section">
                        <h3>
                            <span className="section_title">
                              <h1><strong>가사</strong></h1>
                            </span>
                        </h3>
                        <div className="lyrics">
                            <p>{song.lyrics}</p>
                        </div>
                    </div>
                    <div className="end_section">
                        <h3>
                            <span className="section_title">
                               수록 앨범
                            </span>
                        </h3>
                        <div className="album_info_area">
                            <div className="thumb_area">
                                <Link href={`/album/${album.albumId}`}>
                                    <img
                                        src={album.coverPhoto}
                                        alt={song.albumTitle}
                                        width={150}
                                        height={150}
                                    />
                                </Link>
                            </div>
                            <div className="text_area">
                                <div className="inner">
                                    <div className="title">
                                        {album.albumTitle}
                                    </div>
                                </div>
                                <div className="artist">
                                    {song.artist && (
                                        <p className="artistName text-2xl">
                                            {song.artist.singerName || song.artist.groupName}
                                        </p>
                                    )}
                                </div>
                                <div className="date">
                                    {album.releaseDate}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongDetail;
