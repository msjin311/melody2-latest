"use client"
import React, {useContext, useEffect, useState} from 'react';
// import {UserAccountContext} from "../../../components/UserAccountContext"
import {UserContext} from "../../../contexts/UserContext";
import { useRouter } from 'next/navigation'

function PlaylistForm() {



    const { userState, userDispatch } = useContext(UserContext);
    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [playlistHashtags, setPlaylistHashtags] = useState('');

    const router = useRouter();


    // useEffect(() => {
    //     console.log("createPlaylist userAccount object", userAccount);
    //     console.log("userAccountId value",userAccountId)
    // }, [userAccount]); // userAccount가 업데이트될 때만 실행됩니다.

    useEffect(() => {
        const createdDate = new Date().toISOString().slice(0, 10);
        setCreatedDate(createdDate);
    }, [createdDate]);

    const handlePlaylist_name = (e) => {
        setPlaylistName(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handlePlaylist_hashtags = (e) => {
        setPlaylistHashtags(e.target.value)
    }

    // const handlePlaylist_useraccount_id = (e) => {
    //     const userAccountId = parseInt(e.target.value);
    //     setUserAccountId(userAccountId);
    // }

    const handleCreatePlaylist = async (e) => {
        e.preventDefault()

        const userAccountId = userState.user.userAccountId;


        const playlist = {
            userAccountId,
            playlistName,
            description,
            createdDate,
            playlistHashtags
        };

        try{
            const response = await fetch('/api/playlists',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playlist),
            });

            if(response.ok) {
                alert('create playlist successfully')
                router.push('/playlist')

            } else {
                alert('failed playlist Please try again')
            }


        } catch(error) {
            console.error('Error:', error);
        }


    }


    return (
        <>
            <form onSubmit={handleCreatePlaylist} className="max-w-sm mx-auto p-4 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Playlist Create Page</h1>

                <label className="block text-sm font-semibold">플레이리스트 이름</label>
                <input
                    type="text"
                    name="input_playlistName"
                    onChange={handlePlaylist_name}
                    className="w-full p-2 border rounded mb-2"
                />

                <label className="block text-sm font-semibold">설명</label>
                <input
                    type="text"
                    name="input_description"
                    onChange={handleDescription}
                    className="w-full p-2 border rounded mb-2"
                />

                <label className="block text-sm font-semibold">해쉬태그</label>
                <input
                    type="text"
                    name="input_playlist_hashtags"
                    onChange={handlePlaylist_hashtags}
                    className="w-full p-2 border rounded mb-4"
                />

                <button type="submit" className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600">
                    플레이리스트 생성
                </button>
            </form>


        </>
    );
}


export default PlaylistForm;
