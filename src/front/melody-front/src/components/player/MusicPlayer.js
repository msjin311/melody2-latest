"use client"
import React, { useState, useEffect, useRef } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faBackward, faPause, faPlay, faForward, faShuffle, faVolumeHigh, faVolumeXmark, faBars, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import MyCustomPlayer from "./MyCustomPlayer";

library.add(
    faHeart,
    farHeart,
    faBackward,
    faPause,
    faPlay,
    faForward,
    faShuffle,
    faVolumeHigh,
    faVolumeXmark,
    faBars,
    faRepeat
);

// const url = "";
const url1 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEFYK3X2V3%2F20231027%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231027T044858Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aDmFwLW5vcnRoZWFzdC0yIkgwRgIhANgrEmdjtLwEVbLK7QbGhNMnUIRTTgm1iErwb%2FRo%2F9BHAiEAxhKkUIHoJgwfjCYF1fmJkRAj2kf1XAiIDtmhYh6ApVQq%2FAIIhv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5Mjc4MDkyNTM4OTYiDFq6sEjy9txHex8h2CrQAmDPwFTggwAN3bouaJvUYTS6MvjgEEJsGJ3Ixdagq34S5zagja3njiompgieRZgKLBeTEf3B6pqV%2Fh3U9yUt3%2BSglx1w4TuDFlVdOlXD1%2BOqpKJtPoqjTwAxL4CmrCmS%2BTwbo4Drozl%2Bg2mUtQzd0Db%2FRFhmY%2BscZ7DHJ0cE5prIbH1%2FlNkfEj4a%2FZeBKHbTPpPYfAwuP93O%2FdmyTWfjHP7eKCKpVuulJepOT0exg8XKJvOe5KCuEXAGU2xOdJmD%2B5rNbxBNc0ph3kAB9B3allWRwpFfJ912ijXgAqTM1hC0cIYdDt3wbASSqOWW1xM2MAKKKRv6gpX2WZIj8Yppz%2BPO7HU8Ig%2F94c%2BPmSN0%2BInaRudv8%2BxbHUENh%2BfY78p28LXHz9DMXh7IeK2M5Fq7l0ud3dEyXOEH%2FDW8LxEroud6FhuXtoLchzQYY4%2Fun2zRwTCwgu2pBjqdAXigumMRdsDWMmo6OcdKbjgbSc5MGQf6FGipfUczXjWVmC8uaO5rL%2FVNcSqDbn%2BFCXl7YayKKJYmVlwnvi7eWo8ds12OQrxYu%2B0UTipGa1FYu80KANPhGfEEt1ZvZHoUWcghPGL2SxMqyaO1FofnINngIKBjk4emIo6odi737pRJpPNuEkG633LXrFYlNg5YtIgUYMe3n3YSe4xN5gY%3D&X-Amz-Signature=d3595bb93a823f5dfccff5954f9e9365f05faaa308fae56bd1d74af8a1046d7f"
const url2 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test2.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEFYK3X2V3%2F20231027%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231027T045058Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aDmFwLW5vcnRoZWFzdC0yIkgwRgIhANgrEmdjtLwEVbLK7QbGhNMnUIRTTgm1iErwb%2FRo%2F9BHAiEAxhKkUIHoJgwfjCYF1fmJkRAj2kf1XAiIDtmhYh6ApVQq%2FAIIhv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5Mjc4MDkyNTM4OTYiDFq6sEjy9txHex8h2CrQAmDPwFTggwAN3bouaJvUYTS6MvjgEEJsGJ3Ixdagq34S5zagja3njiompgieRZgKLBeTEf3B6pqV%2Fh3U9yUt3%2BSglx1w4TuDFlVdOlXD1%2BOqpKJtPoqjTwAxL4CmrCmS%2BTwbo4Drozl%2Bg2mUtQzd0Db%2FRFhmY%2BscZ7DHJ0cE5prIbH1%2FlNkfEj4a%2FZeBKHbTPpPYfAwuP93O%2FdmyTWfjHP7eKCKpVuulJepOT0exg8XKJvOe5KCuEXAGU2xOdJmD%2B5rNbxBNc0ph3kAB9B3allWRwpFfJ912ijXgAqTM1hC0cIYdDt3wbASSqOWW1xM2MAKKKRv6gpX2WZIj8Yppz%2BPO7HU8Ig%2F94c%2BPmSN0%2BInaRudv8%2BxbHUENh%2BfY78p28LXHz9DMXh7IeK2M5Fq7l0ud3dEyXOEH%2FDW8LxEroud6FhuXtoLchzQYY4%2Fun2zRwTCwgu2pBjqdAXigumMRdsDWMmo6OcdKbjgbSc5MGQf6FGipfUczXjWVmC8uaO5rL%2FVNcSqDbn%2BFCXl7YayKKJYmVlwnvi7eWo8ds12OQrxYu%2B0UTipGa1FYu80KANPhGfEEt1ZvZHoUWcghPGL2SxMqyaO1FofnINngIKBjk4emIo6odi737pRJpPNuEkG633LXrFYlNg5YtIgUYMe3n3YSe4xN5gY%3D&X-Amz-Signature=5e458438d2e9b5d9b438a690f557ab085700699dff4145b3cb125f2b30cb350c"
const playlist = [
    {
        title: "Attention",
        artist : "New Jeans",
        url: url1,
    },
    {
        title: "Hype boy",
        artist : "New Jeans",
        url: url2,
    },
];

function MusicPlayer({ song = { title: 'Song Title' }, album = { singerName: 'Artist Name' } }) {
    const [currentSongIndex, setCurrentSongIndex] = useState(0); // currentSongIndex를 정의하고 초기값 설정
    const [songs, setSongs] = useState(null);



    const loadSongs = async () => {
        try {
            const response = await axios.get('/api/songs');
            setSongs(response.data);
        } catch (error) {
            console.error('Error loading songs:', error);
        }
    };


    useEffect(() => {
        loadSongs();
    }, []);





    return (
        <>
            {songs ? (
                <div className="mt-16 musicPlayerContainer">
                    <MyCustomPlayer
                        song={songs[currentSongIndex]}
                        playlistEl={playlist[currentSongIndex]}
                        playlist={playlist}
                        currentSongIndex={currentSongIndex}
                        setCurrentSongIndex={setCurrentSongIndex}
                    />

                </div>
            ) : (
                <p>No songs available.</p>
            )}
        </>
    );
}

export default MusicPlayer;