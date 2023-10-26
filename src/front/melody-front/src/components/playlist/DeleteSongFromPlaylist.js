'use client'

import React from 'react';
import CloseImg from "../../../public/images/close_111152.png"
import Image from "next/image";

function DeleteSongFromPlaylist({ playlistId, songId, onDeleteSuccess }) {

    const deleteSong = async (e) => {
        e.preventDefault();
        const songPlaylist = {
            playlistId,
            songId,
        };
        console.log(songPlaylist);
        try {
            const response = await fetch('/api/playlists/deleteSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(songPlaylist),
            });
            if (response.ok) {
                alert('노래를 플레이리스트에서 삭제했습니다.');
                onDeleteSuccess();
            } else {
                console.error('노래 삭제 실패');
            }
        } catch (error) {
            console.error('에러:', error);
        }

    }

    return (
        <>
            <div className="">
                <Image onClick={deleteSong} src={CloseImg} alt="noImage"></Image>
            </div>
        </>
    );
}

export default DeleteSongFromPlaylist;