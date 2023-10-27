"use client"

import React, {useContext, useEffect, useState} from "react";
import  { UserContext }  from "../../contexts/UserContext";
import { useRouter } from 'next/navigation'
import axios from "axios";
import "./SongPlaylist.css"

function SongPlaylist() {
    const { userState, userDispatch } = useContext(UserContext);
    const [songId, setSongId] = useState(0);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

    const getSongsById = () => {
        axios.get(`/api/playlists/playlist/${userState.user.userAccountId}`)
            .then(r =>{
                if(r.data){
                    setPlaylists(r.data);
                    console.log('data',r.data);
                } else{
                    console.log('실패')
                }
                console.log('playlist 리스트업 성공')
            })
            .catch(err =>{
                console.error(err);
            })
    }

    useEffect(() => {
        getSongsById()
    }, []);

    useEffect(() => {
        // playlists가 변경될 때마다 로그를 출력합니다.
        console.log("playlists",playlists);
    }, [playlists]);  // playlists가 변경될 때마다 로그가 출력됩니다.

    return(
        <>
            <div className="songPlaylist">
                <div className="playlistName">
                    <h1>Playlist</h1>
                </div>
                {playlists.map((playlists, index) => (
                    <ul key={index}>
                        <div className="list">
                            <div className="listHover">
                                <span>{playlists.playlistId}</span>
                                <span>{playlists.playlistName}</span>
                            </div>
                        </div>
                    </ul>
                ))}
            </div>
        </>
    )
}

export default SongPlaylist;