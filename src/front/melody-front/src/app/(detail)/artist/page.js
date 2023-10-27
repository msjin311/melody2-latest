"use client"

import styles from "./artist.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {GoKebabHorizontal} from 'react-icons/go';
import Link from "next/link";

function SongList() {
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {

        axios.get('/api/songs')
            .then((response) => {
                setSongs(response.data);
            })
            .catch((error) => {
                console.error(`Failed to fetch Songs: ${error}`);
            });
        axios.get('/api/albums')
            .then((response) => {
                setAlbums(response.data);
            })
            .catch((error) => {
                console.error(`Failed to fetch Albums: ${error}`);
            });
    }, []);

    return (
        <div>
            <ul className="main_container">
                {songs.map((song) => (
                    <li key={song.songId}>
                        <div className="container">
                            <div className="content">
                                <div className="artist_summary_section">
                                    <div className="summary_wrap">
                                        <div className="summary_thumb">
                                            <img
                                                src={song.artist ? song.artist.singerPhoto || song.artist.groupPhoto : "N/A"}
                                                alt="Artist Photo"
                                                className="artist_photo"/>
                                        </div>
                                        <div className="summary_text">
                                            <h2 className="artist_name">
                                                {song.artist ? song.artist.singerName || song.artist.groupName : "N/A"}
                                            </h2>
                                            <div className="artist_info">
                                                ArtistInfo: {song.artist ? song.artist.singerInfo || song.artist.groupInfo : "N/A"}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="end_section">
                                        <h3>
                                            <div className="section_title_more">
                                                <div className="section_title">노래</div>
                                                <div>
                                                    <a href="#" className="link_more">더보기</a>
                                                </div>
                                            </div>
                                        </h3>
                                        <div className="track_section">
                                            <div className="track_list">
                                                <table>
                                                    <tbody>
                                                    {songs
                                                        .filter((filteredSong) => filteredSong.artistId === song.artistId) // Filter by artistId
                                                        .map((filteredSong, index) => (
                                                            <tr key={index} className="track_list_more">
                                                                <td className="thumb">
                                                                    <div className="inner">
                                                                        <img
                                                                            src={albums.find((album) => album.albumId === filteredSong.albumId)?.coverPhoto}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="song">
                                                                    <div className="title_badge_wrap">
                                                                        <Link
                                                                            href={`/song/${filteredSong.songId}`}>{filteredSong.title}</Link>
                                                                    </div>
                                                                </td>
                                                                <td className="artist">
                                                                    <a href="#">
                                                                        {filteredSong.artist && (filteredSong.artist.singerName || filteredSong.artist.groupName)}
                                                                    </a>
                                                                </td>
                                                                <td className="album">
                                                                    <a href="#">
                                                                        {albums.find((album) => album.albumId === filteredSong.albumId)?.albumTitle}
                                                                    </a>
                                                                </td>
                                                                <td className="option">
                                                                    <div className="inner">
                                                                        <div className="downdrop_wrap">
                                                                            <a href="#" role="button"
                                                                               className="btn_option">
                                                                                <GoKebabHorizontal/>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="end_section">
                                        <h3 className="section_title_wrap">
                                            <div className="section_title_more">
                                                <div className="section_title">앨범</div>
                                                <a href="#" className="link_more">더보기</a>
                                            </div>
                                        </h3>
                                        <div className="list_wrap_album">
                                            <div>
                                                {Array.from(new Set(songs.map((song) => song.albumId))).map((albumId, index) => {
                                                    const album = albums.find((a) => a.albumId === albumId);
                                                    const artist = song.artist || {singerName: "N/A"};
                                                    return (
                                                        <ul className="scroll_list" key={index}>
                                                            <li className="list_item">
                                                                <div className="thumb_area">
                                                                    <a href="#" className="link">
                                                                        <img
                                                                            src={album.coverPhoto}
                                                                            style={{
                                                                                width: "100px",
                                                                                height: "100px",
                                                                                display: "block",
                                                                                lineHeight: 0,
                                                                            }}
                                                                        />
                                                                    </a>
                                                                </div>
                                                                <div className="info">
                                                                    <div className="text_wrap">
                                                                        <a href="#" className="title">
                                                                            {album.albumTitle}
                                                                        </a>
                                                                    </div>
                                                                    <div className="artist">
                                                                        <div className="artist_sub_inner">
                                                                            <a href="#" className="link_artist">
                                                                    <span className="text">
                                                                      {artist.singerName || artist.groupName}
                                                                    </span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SongList;

