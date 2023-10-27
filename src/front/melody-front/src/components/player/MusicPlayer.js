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
const url1 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEI5FDNXMJ%2F20231027%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231027T011356Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaDmFwLW5vcnRoZWFzdC0yIkYwRAIgOl5WPAqqI74AxcjxiTpB43a4HyGTi7ez9LS%2FqMBjFYoCIA%2FZPiFsRKpLdqgdU9qR4071qXepF4A59KdrgLFDvvqlKvwCCIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTI3ODA5MjUzODk2IgyiKyEq%2FAmHHuInXLUq0ALw0GlK%2FnaFkDFCRU9FpEyOu6XKw2BNLs%2BRhMl%2BbvsjyQ6Q496dQzOsXnj3KSTDdmMNz25mG8OaPVIUJ3Mq60xy%2B%2Bkbp6YNcaY0n0RHs70tedXsR2u2C0w4b1oKCUq0ZggmqS%2B7N6jPFkV3Z%2B7U2dnc8nbf4M%2FziJAyxhyWTixAH6PMA6em%2BOR%2FK7m1f5InW9HyGAwz12WsNhvLJ8V4gtjQYfT3T2tCZY%2FHPfQE1pdVkSy58nYEbTb%2FzoMHC7o6DDPDkpWJ97dpOyUxZ%2Bg%2BXxJO3cR8IScpZZje5Caofxsmo7xRmVHeXZ4MbqwiL7IelBG5XpKAbWtYP1rfr6suHGAXFJdwobptlrhUDRDRBT69DQT1h%2FMMoV1uBVZsghq%2FsDCjjkd1F%2BBeXg4cADSh4FgAx5jHd6BWSpqN%2BkeIDyGigGwBk0ocFYTFikvBRrBq%2FC4wx53sqQY6nwHSdsswQinH6Td2O%2Blel09dIs4x8d5ccgOAUwLJSHjMTA87O1dWbtwgvqb7%2B%2Bdvw92PBZHTk759EIJYldG6Igru000ZJvRDlSXZ0vU%2FVlp28hcTFql1C64EhbNZVqg13%2BmjxXioG40m0tTE0b2iHaIwXTazCdGrEii2rfjxGg1ZqUI3D8kmUg81JlhCwVP6DDd120NrLJguPZ24W2i01QQ%3D&X-Amz-Signature=6e5db8f19304e1849ed36e40577373edcf2e7baf22dab5b389f009dcb32c2b30"
const url2 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEI5FDNXMJ%2F20231027%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231027T011438Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaDmFwLW5vcnRoZWFzdC0yIkYwRAIgOl5WPAqqI74AxcjxiTpB43a4HyGTi7ez9LS%2FqMBjFYoCIA%2FZPiFsRKpLdqgdU9qR4071qXepF4A59KdrgLFDvvqlKvwCCIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTI3ODA5MjUzODk2IgyiKyEq%2FAmHHuInXLUq0ALw0GlK%2FnaFkDFCRU9FpEyOu6XKw2BNLs%2BRhMl%2BbvsjyQ6Q496dQzOsXnj3KSTDdmMNz25mG8OaPVIUJ3Mq60xy%2B%2Bkbp6YNcaY0n0RHs70tedXsR2u2C0w4b1oKCUq0ZggmqS%2B7N6jPFkV3Z%2B7U2dnc8nbf4M%2FziJAyxhyWTixAH6PMA6em%2BOR%2FK7m1f5InW9HyGAwz12WsNhvLJ8V4gtjQYfT3T2tCZY%2FHPfQE1pdVkSy58nYEbTb%2FzoMHC7o6DDPDkpWJ97dpOyUxZ%2Bg%2BXxJO3cR8IScpZZje5Caofxsmo7xRmVHeXZ4MbqwiL7IelBG5XpKAbWtYP1rfr6suHGAXFJdwobptlrhUDRDRBT69DQT1h%2FMMoV1uBVZsghq%2FsDCjjkd1F%2BBeXg4cADSh4FgAx5jHd6BWSpqN%2BkeIDyGigGwBk0ocFYTFikvBRrBq%2FC4wx53sqQY6nwHSdsswQinH6Td2O%2Blel09dIs4x8d5ccgOAUwLJSHjMTA87O1dWbtwgvqb7%2B%2Bdvw92PBZHTk759EIJYldG6Igru000ZJvRDlSXZ0vU%2FVlp28hcTFql1C64EhbNZVqg13%2BmjxXioG40m0tTE0b2iHaIwXTazCdGrEii2rfjxGg1ZqUI3D8kmUg81JlhCwVP6DDd120NrLJguPZ24W2i01QQ%3D&X-Amz-Signature=4429aeb83fd8b842c0510f17de4555e7ce11ec8083485d674b5d9d07ea014f0c";
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