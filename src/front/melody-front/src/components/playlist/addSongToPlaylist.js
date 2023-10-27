"use client"
import React, { useEffect, useState } from 'react';
import Plus from "../../../public/images/plus.png"
import Image from "next/image";

function AddSongToPlaylist({playlistId, songId}) {
    //Usage example
    // import AddSongToPlaylist from "@/components/playlist/DeleteSongFromPlaylist";
    // <AddSongToPlaylist playlistId={playlistId} songId={song.songId}></AddSongToPlaylist>
    console.log("노래추가 컴포넌트 playlistId",playlistId)
    console.log("노래추가 컴포넌트 sondId",songId)

    const handleAddSongToPlaylist = async (e) => {
        e.preventDefault();
        const songPlaylist = {
            playlistId,
            songId,
        };
        console.log(songPlaylist);
        try {
            const response = await fetch('/api/playlists/addSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(songPlaylist),
            });
            if (response.ok) {
                alert('노래를 플레이리스트에 추가했습니다.');
            } else {
                console.error('노래 추가 실패');
            }
        } catch (error) {
            console.error('에러:', error);
        }
    }


    return (
        <>
            <div>
                <Image src={Plus} alt="noImage" onClick={handleAddSongToPlaylist}></Image>
            </div>
        </>
    );
}
export default AddSongToPlaylist;