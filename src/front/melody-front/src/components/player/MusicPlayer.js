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
const url1 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEBWARSA6U%2F20231025%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231025T013506Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaDmFwLW5vcnRoZWFzdC0yIkYwRAIgbVzWrIN5CO0mDL1HGl0nNZOIcP05B%2BFOxuWPunSLBzkCIB70UtDeRtU3Cawwl%2BCbSA4lhebspxX5%2FmzX4gldy3d5KvMCCFMQABoMOTI3ODA5MjUzODk2Igx%2Bemo0Eiimo7l8eE8q0AKxs9nEwmfEnQvHI%2FbfnfngamSgOdruxgu0ciIcjYm87aRPZHWtYoO8Xj5dI3fGddg5XbMl3jcAPqdu%2FL%2BECFNfFqZaG5VI6WjOUXHsvRjp%2B37sju%2BwmvKT3tjP4zUyiNKGlXC178PRUZpRGa3v18QT9ZXksuVZ%2FNpK3mU3M3QZjuv1685gDBkSP78EVxS8OljpANpulJG26515cS6%2FG9CXpWsQCWiR7GW4%2FuSHvyOHeQKhweYD6d%2BomvYJxJVsOtExNfDYTL7MAJ%2BJH821jdz%2Fs08llW2v1G6qoHVVyfEa1d0IJ7Ht7zUMIvrybRsNF3X4lMozTFGzupSCrid1Zr3ZtqHl5K9NgU5klRqS2%2Fl9Y%2FEYG8LJCXiPVbgzsjc3rA0z1XZOsuf2t0uep8YU0HgAVjV58XaMNwb0Xg%2Bffp75M7vhR3SzsnXQDSq4qSEQh10wvuHhqQY6nwFDPRRH1iDr5080MTRacyzoNp4F5YotkKMIsX0Tv06tGlx%2BWx25yI69EKvtrFJSeIPbhVlC2%2BYJnrMIBMZLiiQ6udWqM0fKOigc86Ezzz2D5s%2BSIqre0OkBc2Q9pwH0yo7fnnIBa7OqeLCjirKLCfc15qyIPxXQcPOTTeq%2FXWi6bQ0Qow%2F%2BKTMRxqIbzL88ow%2FxmpvXgmKa%2FNmfFxhc0z0%3D&X-Amz-Signature=8275bbc7173b3a10f12ad58f0c767a52afb7bee3846aa89fbc5606fd359b7f5f"
const url2 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEIKDS6DEW%2F20231017%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231017T052717Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aDmFwLW5vcnRoZWFzdC0yIkcwRQIhAItOi%2B39av7QkgnLlSMqSP80MIut%2FYymxyoQ3bXAe4EDAiACqAUHj59gURrSix3w4N%2B%2BLQlngQSwgmuQ8J2d6YvkHSr8AgiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDkyNzgwOTI1Mzg5NiIMeVM9gnc0V9ZrZ4uuKtACg4793BXp8P0eFbVVmj8teUbwpfguwdyG31LaflRwRbePXMi7yMOFQSsgqQFVxAfjTNp5XYfMVqCccV4qi8XxONWO8PQwuDWcAFvtjwNHlphqK83899jB3oY7R846ihGuDks77SpBsetAbTyIcjbO8NqmXMwNbDnSgFSw%2FZ4TVDPTzRwyg7a5Oqz6v%2Bczkd7rYJhpjWiwobg7JO%2B3K0KJLmlxLjRPFiqRY%2BAA9%2FZMFZ%2FxzzDnd1531ozlFoUemmvbzF0rM%2FjZzNUJWceueq%2FafKW2F9%2FGS0OvN4cqgQEaUqso2xL4YUEsqp%2FHDHMHI0Jrtx3uSDKkp8o3JHwr1QvSE4X6QIK%2B%2FrFE69ZCu2IQdWqPGdYHYXYoBZ44N8T%2BvnKFAmo6BthPLi%2BZKj3IUxVI50UtfrU0ZqlpAqZZj85tkSJbYRCifuH7ne2L55YgE8bEMIq2uKkGOp4Bl%2ByuAjbhhtSuXLIfSMKipaTFhTZEGXTvKbR0IegcBDxnPji%2BHkk2S94vKxxRCeR8iyBCkUbOsaSWSoCBp5akwpBW3FFaB4bo7is2M0rt5XKl91CnjXur2NEhdjgKOeHT3c8vUW0yZIclgW2%2FL89ME0xMEdM5JnRPsVBfSzV5sZB3rExPa2%2FVt9piDdnMzzeFy7kJhDmVb6lE9V4aylQ%3D&X-Amz-Signature=8fdde399fedbe40799faeb8f9ca90d29af72706b4e3f7854325c691227c5cf70";
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