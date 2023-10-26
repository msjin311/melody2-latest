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
const url1 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test2.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEBZFRALFJ%2F20231026%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231026T091704Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaDmFwLW5vcnRoZWFzdC0yIkgwRgIhAOdICHlwJuKSsxJ36NNuL1CACm1rPWVMWEc5mBMc088tAiEA%2F4wNgBKfhZ7Xls4Bahs%2FAdfSG2JxWGrguBF8T6bMq80q8wIIchAAGgw5Mjc4MDkyNTM4OTYiDLch%2FcNE8VJTjwzLOCrQAjrvAaqMJPZx%2BSEGwgQE6Gd8qna%2BRFhWWuWo1vRMv9%2BZtdRTMoYVxXjUdC3L3JGiwTeoj%2FOx1HKDis%2FeqNcPQyWxQANCSRHqNv0s5ETnxQGEU4GxF7p1f%2FHxR724rhY%2FU6N%2B%2BUdR%2Bv5kAGDV1fXtxgB2MOn5EVxjoaS48m%2FzAfGITpeC2AwUO3z36mJFwBeRAthsIv%2BoPTUQe15jl9x47%2BDgRYTcLEwphemTsntEz%2F2QwLJU0GtZxLD0jjVm6%2BsQryx%2F0MNcb0o4tnJyes8UnSDUvkgmShNOH19r9QEI2jYUHjJu5gdKG7p0rYE0mKS3FD019mHcVbeZON%2Fqg5oF9lj%2BEKPntiTAPY7Y2OAys5ofVv1saHAjOiocGB7SyH8behDSWkjoh2uNBkKjMFTtdgKhdQmPJDhyWRh5UoZDfLQCSzuGMP4vPOEQ%2FYBoSyQGBjCF3eipBjqdAUq33P%2BQg%2F8IpRxXRrHW%2BIIk2xKCmrH3cik5aRcn64Un1V%2Fu6B%2FqHwz%2B7iIJtTUM0ncz98dY%2FOJxNi%2B0KmMoNEqb9cG8C3G%2FtWk%2BQHormy1IiaexBWhqrtIaDELEDcwBiJ1GQ6WdtuJHKV%2Fmp9V1gvLoxJwwqJKFgAoIdW7BbTj7XNVf1x0ghrldYrsJGc87fYWJ%2B7BsPIUzNXUwNnU%3D&X-Amz-Signature=1d997ee227e0fab1495ab97b808f0df513fc8661b8c706b14c6b78ce76aee241"
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