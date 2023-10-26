"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Album() {
    return (
        <div className="album">
            <div className="albumImg">
                <img src="https://cdn.music-flo.com/image/v2/album/480/330/15/04/415330480_64a747db_s.jpg?1688684509268/dims/resize/140x140/quality/90" alt="Album Cover" />
            </div>
        </div>
    )
}
function Heart() {
    return (
        <>
            <div className="blankedHeart">
                <FontAwesomeIcon icon="fa-regular fa-heart fa-flip-x fa-xl" />
            </div>
            <div className="coloredHeart">
                <FontAwesomeIcon icon="fa-solid fa-heart fa-flip-x fa-xl" />
            </div>
        </>
    )
}
function Info({ song, album }) {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    return (
        <div className="info">
            <audio className="audio" preload="metadata">
                {song && <source src={song.url} type="audio/mp3" />}
            </audio>
            <div className="progressBar">
                <input type="range" value={currentTime} id="progress" />
                <span className="current">{currentTime.toFixed(2)}</span>
                <span className="duration">{duration.toFixed(2)}</span>
            </div>
            <div className="currentlyPlaying">
                {song && <h1 className="songName">{song.title}</h1>}
                {album && <h1 className="artistName">{album.singerName}</h1>}
            </div>
        </div>
    )
}
function Controls({ isPlaying }) {
    return (
        <div className="controls">
            <div className="repeat">
                <FontAwesomeIcon icon="fa-solid fa-repeat fa-xl" style={{color: "#3d619e",}} />
            </div>
            <div className="previous">
                <FontAwesomeIcon icon="fa-solid fa-backward fa-xl" />
            </div>
            {isPlaying ? (
                <div className="pause">
                    <FontAwesomeIcon icon="fa-solid fa-pause fa-xl" />
                </div>
            ) : (
                <div className="play">
                    <FontAwesomeIcon icon="fa-solid fa-play fa-xl" />
                </div>
            )}
            <div className="next">
                <FontAwesomeIcon icon="fa-solid fa-forward fa-xl" />
            </div>
            <div className="shuffle">
                <FontAwesomeIcon icon="fa-solid fa-shuffle fa-xl" />
            </div>
            <div className="volume">
                <FontAwesomeIcon icon="fa-solid fa-volume-high fa-xl" />
            </div>
            <div className="mute">
                <FontAwesomeIcon icon="fa-solid fa-volume-xmark fa-xl" />
            </div>
            <div className="option">
                <FontAwesomeIcon icon="fa-solid fa-bars fa-xl" />
            </div>
        </div>
    )
}
function VolumeControl({ volume, setVolume }) {
    return (
        <div className="volumeCtrl">
            <div className="volumeBg">
                <input className="volumeRange" type="range" min="0" max="100" step="1" value={volume} onChange={(e) => {
                    setVolume(e.target.value)
                }} />
            </div>
        </div>
    );
}
function MusicPlayer({ song={title: 'Song Title'}, album={singerName: 'Artist Name'} }) {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    return (
        <div id="player">
            <Album />
            <Heart />
            <Info song={song} album={album} />
            <Controls isPlaying={isPlaying} />
            <VolumeControl volume={volume} setVolume={setVolume} />
        </div>
    );
}
export default MusicPlayer;