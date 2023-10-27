import ReactPlayerController from "./ReactPlayerController";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
// import "./controller-add.css"

export default function Component({
                                      playlistEl,
                                      isPlaying,
                                      handlePlayPause,
                                      handleNextClick,
                                      handlePreviousClick,
                                      handleToggleRepeat,
                                      handleToggleShuffle,
                                      handleVolumeChange,
                                      handleSeek,
                                      volume,
                                      setVolume,
                                      played,
                                      isMuted,
                                      handleToggleMute,
                                      currentTime,
                                      duration,

                                  }) {
    // Like Button
    const [isLiked, setIsLiked] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    // console.log(playlistEl);

    const progress = (currentTime / duration) * 100;

    // Function to format time in MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const playIcon = (
        <svg
            className=" h-20 w-20 text-white"
            onClick={handlePlayPause}
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
    );

    const pauseIcon = (
        <svg
            className="h-20 w-20 text-white"
            onClick={handlePlayPause}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 18"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1.8c0-.442.32-.8.714-.8h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H1.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 1 16.2V1.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H8.857c-.394 0-.714-.358-.714-.8V1.8Z"
                clipRule="evenodd"
            />
        </svg>
    );

    const playPauseIcon = isPlaying ? pauseIcon : playIcon;

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-200 to-red-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden dark:bg-zinc-900">
                <div className="flex justify-between items-center px-6 py-4">
                    <div className="flex items-center">
                        <svg
                            className=" h-6 w-6 text-yellow-500"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                        </svg>
                        <div className="mx-3">
                            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{playlistEl && playlistEl.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{playlistEl && playlistEl.artist}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon
                            icon={isLiked ? solidHeart : regularHeart}
                            className={`h-6 w-6 ${isLiked ? 'text-red-500' : 'text-gray-500'} cursor-pointer`}
                            onClick={handleLike}
                        />
                    </div>

                </div>
                <div className="relative">
                    <img
                        alt="Starry Night"
                        className="object-cover w-full h-64"
                        height="400"
                        src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimage.bugsm.co.kr%2Falbum%2Fimages%2F500%2F40885%2F4088574.jpg&type=sc960_832"
                        style={{
                            aspectRatio: "800/400",
                            objectFit: "cover",
                        }}
                        width="800"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        {playPauseIcon}
                    </div>
                </div>
                <div className="px-6 pt-2">
                    <div className="flex items-center">
                        <div className="volume2">
                            {isMuted ? (
                                <FontAwesomeIcon icon="volume-mute" style={{ color: '#6b7280', height: '0.8em' }} onClick={handleToggleMute} />
                            ) : (
                                <FontAwesomeIcon icon="volume-up" style={{ color: '#6b7280', height: '0.8em' }} onClick={handleToggleMute} />
                            )}
                        </div>


                        <div className="w-full mx-3" onClick={handleSeek}>
                            <div className="relative mt-1 h-1 bg-gray-200 rounded overflow-hidden dark:bg-gray-800">
                                <div className="absolute left-0 top-0 h-full bg-yellow-500" style={{ width: `${played}%` }} />
                            </div>
                        </div>
                        {/* Time */}
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>
                                    {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}`}
                                </span>
                                /
                                <span style={{ marginLeft: '5px' }}>
                                    {`${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="controls text-xs flex cursor-pointer text-gray-500">
                    <div className="volume1 ml-6 h-24 mb-5" onChange={handleVolumeChange}>
                        {volume > 0 && (
                            <div className="volumeCtrl">
                                <div className="h-24 w-6 mt-2 flex flex-col justify-end">
                                    <div className="volumeBg h-full w-full bg-gray-300"></div>
                                    <input
                                        className="volumeRange appearance-none h-full bg-blue-500 mt-2"
                                        type="range"
                                        value={volume}
                                        onChange={(e) => {
                                            setVolume(e.target.value);
                                        }}
                                        min="0"
                                        max="100"
                                        step="1"
                                        style={{
                                            writingMode: 'bt-lr',
                                            WebkitAppearance: 'slider-vertical',
                                            width: '8px',
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`text-center flex items-center justify-center ${isMuted ? 'ml-20' : 'ml-16'}`}>
                        {/*<div className="text-center flex items-center justify-center volume2">*/}
                        <div className="repeat mx-4" onClick={handleToggleRepeat}>
                            <FontAwesomeIcon icon="repeat" style={{ color: '#3d619e' }} />
                        </div>

                        <div className="previous mx-4" onClick={handlePreviousClick}>
                            <FontAwesomeIcon icon="backward" />
                        </div>

                        <div className="play mx-4" onClick={handlePlayPause}>
                            {isPlaying ? <FontAwesomeIcon icon="pause" /> : <FontAwesomeIcon icon="play" />}
                        </div>

                        <div className="next mx-4" onClick={handleNextClick}>
                            <FontAwesomeIcon icon="forward" />
                        </div>

                        <div className="shuffle mx-4" onClick={handleToggleShuffle}>
                            <FontAwesomeIcon icon="shuffle" />
                        </div>
                    </div>
                    <style jsx>{`
                        .ml-16 {
                            margin-left: 3.5rem !important;
                        }
                    `}</style>

                </div>
            </div>
        </div>
    )
}