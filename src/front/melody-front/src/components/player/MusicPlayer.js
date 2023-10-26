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
const url1 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEARN243UW%2F20231026%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231026T065906Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaDmFwLW5vcnRoZWFzdC0yIkcwRQIgcX6QVoxsh0dVwtgy3PMhqxtbE0QUXyM%2B2BemLgdGk7ACIQC0kvUxg8l8oMxMmoYFTO86PNpotowpEOfMx0wX3SaAyyrzAghwEAAaDDkyNzgwOTI1Mzg5NiIMJSgCU2ECBtUEYdiiKtACJ1WFudsgX4BzdTXdCOop1XC%2BoAaneT8A7jRotR4jLw53Nhdvv2Rlj8Sw1VmiWDu0zxWsWFTtOt1uMQvGbhjEkqJpgJU1RMqVml%2Bo1KDFifqwkrUnmOvmapRWgEmhJT3Fx2rLWsbB51H01xiGi1o6oU2deiaZzLh7b4CvQrHa6ywpJd%2FHjwemwnW%2FWyP52%2BoSw6lDjrqE%2FvnfwrwV2O5tsaUM1Ew0VTpidqHbUvKWT4OSnGu1NO%2FVrJVttwgh0jP7%2F9jEJljpZdAlZKwXWx%2FWsE7ocmskAf8DmYWtGPMQcrZOJyVkNL3Q8GziYsQ08e5zLpU0M9CVtYGWtL0wwi3XU5t0Va7qZ3zQS%2BaxQiBWJwioXx5J0emj97GhTLMQmefmmsjcqbOluzlUHW0E7Ykxt9aZzT5Gm8oZ8HD8f3wwKYtSiSLn9COt04dm6HsooGKEMK6c6KkGOp4BaiZspK%2Fe2VOIUdD8W3KcVDgBaU7OIEsshTfNG%2F8Ruv90zD5x951tkdYbbrAeXyRBuYKb6k7GY0W1WIxINEFwS7JFG%2BgODyOeKj4Kgly8UiZPoF7r1rWXqkKzTwXrc3iU%2BN8hgH3h3%2BsoWMaLaEey%2FxADUd%2BZODfEMQqPVS1s4%2Bca7vVKOMfpe1McATRQ4TogOiR1G8FonmPuBok4ovg%3D&X-Amz-Signature=472bc8a642c32d07d423278fb2e60e601ed261f0ce3f111c8dd26078f68ae790"
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