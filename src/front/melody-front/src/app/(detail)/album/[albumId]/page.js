"use client"

import styles from "./albumId.css";
import React, {useState, useEffect, useContext} from 'react';
import {useParams, usePathname, useSearchParams} from 'next/navigation';
import axios from 'axios';
import {UserContext} from "../../../../contexts/UserContext";
import LikeButton from "../../../../components/detail/LikeButton";
import Link from "next/link";
import {GoKebabHorizontal} from "react-icons/go";


function AlbumDetail() {
    const {albumId} = useParams();

    const {userState, userDispatch} = useContext(UserContext);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState({});

    const [localLikes, setLocalLikes] = useState(0);

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
        if (!albumId) {
            return;
        }

        axios
            .get(`/api/albums/${albumId}`)
            .then((response) => {
                setAlbums([response.data]);
                console.log('Albums:', response.data);
            })
            .catch((err) => {
                console.error('Failed to fetch albums:', err);
            });

        axios
            .get(`/api/songs`)
            .then((res) => {
                setSongs(res.data);
                console.log('Songs:', res.data);
            })
            .catch((err) => {
                console.error('Failed to fetch songs:', err);
            });
    }, [albumId]);

    return (
        <div>
            {albums.length > 0 && (
                <ul className="container">
                    {albums.map((albums) => (
                        <li key={albums.albumId} className="album-item">
                            <div className="summary_section">
                                <div className="summary_area">
                                    <div className="summary">
                                        <div className="thumb">
                                            <img
                                                src={albums.coverPhoto}
                                                width={240}
                                                height={240}
                                            />
                                        </div>
                                        <div className="text_area">
                                            <h2 className="title_area">
                                                <span className="title">{albums.albumTitle}</span>
                                                <span className="title_artist">
                                            {albums.artist && (
                                                <h3 className="artistName">
                                                    {albums.artist.singerName || albums.artist.groupName}
                                                </h3>
                                            )}
                                            </span>
                                            </h2>
                                        </div>
                                        <div className="sub">
                                            <span className="item">{albums.releaseDate}</span>
                                        </div>
                                        <div className="album_info">
                                            <div className="info">
                                                <span className="text_info">
                                                 {albums.albumInfo}
                                                </span>
                                                <a href="#" role="button" className="more">더보기</a>
                                            </div>
                                        </div>
                                        <div className="play_with_me">
                                            <div className="play_option">
                                                <button
                                                    className="play-button">
                                                    ▶ 재생
                                                </button>
                                            </div>
                                            <div className="more_option">
                                                <div className="btn_like">
                                                    <LikeButton
                                                        album={albums}
                                                        localLikes={albums.likes}
                                                        setLocalLikes={setLocalLikes}
                                                    />
                                                    {localLikes[albums.albumId] || albums.likes}
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
                            </div>
                            <div className="track_section">
                                <div className="select_all">
                                    <div className="check_area">
                                        <input
                                            type="checkbox"
                                            id="chk_all"
                                            className="input_check"
                                            checked={Object.keys(selectedSongs).length === songs.length}
                                            onChange={handleSelectAll}
                                        />
                                        <label htmlFor="chk_all"></label>
                                    </div>
                                    <div className="text_area">
                                        <div className="inner">
                                  <span>
                                    {songs.filter((song) => song.albumId === albums.albumId).length}곡
                                  </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tracklsit">
                                <table border="1">
                                    <caption></caption>
                                    <thead>
                                    <tr>
                                        <th scope="col" className="select"></th>
                                        <th scope="col" className="song"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {songs
                                        .filter((song) => song.albumId === albums.albumId)
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
                                                {/*<td className="inner_thumb">*/}
                                                {/*    <div className="inner">*/}
                                                {/*        <img*/}
                                                {/*            src={albums.length ? albums[0]?.coverPhoto : null}*/}
                                                {/*            width={100}*/}
                                                {/*            height={100}*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*</td>*/}
                                                <td className="song">
                                                    <Link href={`/song/${song.songId}`}>{song.title}</Link>
                                                </td>
                                                <td className="artist">
                                                  <span>
                                                     {song.artist && (song.artist.singerName || song.artist.groupName)}
                                                  </span>
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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AlbumDetail;