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
const url1 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEHXBFJHXB%2F20231027%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231027T025645Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaDmFwLW5vcnRoZWFzdC0yIkcwRQIhAMPW%2Bo1ZL1iJEM7l1ynM%2BewWqY0%2BVpjDjg3Dkzrlf0OIAiA0U4EE9IQPPdIwjh92UW4on%2F%2BdSy4pMkiuDmvDpyI8aSr8AgiE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDkyNzgwOTI1Mzg5NiIM4f9Z6b4DPx%2F3l5msKtACLcOqOES4Mi9ihhQZH4hvmKHXvKQYgZJxEa7KIyWQpA1UlR25F6OeL2hNueKbUh91SjLEMfnE1l%2FgI90LAG7WMDCEG5zzR%2BtlyDDPU%2FA5qelDRDUCdYjWabnOeDEHoc%2BNz145ptKbXeB5fLWzeSoedG0n5CZIEHfsRsqS6omyDIf6LpnYgqI2KVCiqG19gnAhg2xPhkbCerNXn8Ou7I5pUj1GGC3yK9d3e3enDnsw5YAzwop%2BKGDqNhsYyi44Cdl7cJIK5rQHAgNAGjWE%2B7djYurVvjNa8rzi2s4Ekm0MmmRwA79B8sy36j%2Fa9Z6gISLFo1kDGSyrXooodmLrkBe451QmKuziIy7%2BfUA7H1wcWll8ir6WWyogBv5MY72snJ9S4iEOawdu2P%2FlkFeKsvvClIL%2Fs2sbpIh75SiRR4xHEYpjwkOU4nWJIeTuB6DPQ%2FiQMOHN7KkGOp4BTbTphkIADJ7xTw0cE5N52C%2BHTKd%2F5863qnmZppKMBYdwi%2FZw66WoW9KfjOnufcFH%2FJCaDpwdHeBKqNrQBA7JwoY550LbKhbwXvGgn%2BmgzQUuIX%2BVJgJKliokbikzATfYoBrq8chiTTXsQut0nlXiVN2s%2FnxZZhlwIStp1%2F924twkEzEl5LSJNTj%2B%2F59go2dAnoDwf3hnUCfAoREH7fM%3D&X-Amz-Signature=35f8b0c71f53ed5cf46919f5701341d63bfa19cd885dc8966dc5e53ad6419b20"
const url2 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIECRV6GW6P%2F20231026%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231026T092046Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaDmFwLW5vcnRoZWFzdC0yIkgwRgIhANB45CqUy7wNXABFAJNaT9MnUhnEOxlIig%2B80FXDt7rVAiEA4gqagDaFibqCwU0Fqk1zj2jrbyf6KqZNbMB%2BVPwbCz0q8wIIchAAGgw5Mjc4MDkyNTM4OTYiDMfKfmzXFkVLcDzTRSrQApzFlvirIUPqr6xvadlB9k4YAU7wYbB4SZFKDIzET%2BFmwuFpfnMt4%2B3fBFI8fOLGEvUNxnNePZyvc%2FHbV31pGU8QCs%2FDo%2FznQHClSH7vlUPrJJwv5yDC85ZKSYMs4%2BmHiBI50zsGK%2Bri0Xq4%2FrLqHeuPFupKHiC0MFFoyecY3REoiihB8FfCJU6lUOOhpMttYT3EcB0X1kZWx%2BXc9W9yqWjTADNnSmlO4iDM2JmBnB1yEF08UAOJxJQxdFkIPFL8lYTqMZ0mnYvt%2BrnuR2iXylj4Wpw7MyQXevxyDdZhXnJgbWjng3cGExEtwia5pe53AGRYVMjvSzKPsTPCjqw3IPJ85ei0zHAe2k0b6L2lVRvcNAPfitDgffC6Edb86qycWRwsOc%2BKoKxUlTQZj1dVTznmhIEq5Kh99Xk2CnS68RsdWhV6btnOqz%2FCV%2BMjieNA3DDj3uipBjqdATAPm7MnEvLOV%2FzVISoJD%2FlllrRR9e6zA%2BpsK6GwLMAPhdZR12Y4SsG2GtsTAk4grFeYcXrp0RR7GwB79Txpp%2FXavFy4O%2Bs5pxp52mK3Dfejbm4vRScYu639z6J290pCc9DI2pFcxYKLQ%2BkAnmHTASFuvkWPaOUiRPNQstqKSPfOJKV4QrX79Hwro5P3GJ9zUmVsN8sVYWqGkfoJWKs%3D&X-Amz-Signature=1966ad315e849059b02c14abc635b01b73b8c1176354ce3210657658f97aeae5"
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