

import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SongPlaylist from "../../components/playlist/SongPlaylist";
import PlayerPlaylist from "../../components/playlist/PlayerPlaylist";
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
    // console.log(playlistEl);

    const progress = (currentTime / duration) * 100;

    // Function to format time in MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-200 to-red-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center">
            <div className="flex mx-auto bg-white shadow-md rounded-lg overflow-hidden dark:bg-zinc-900">
                {/*                 */}
                <div className="flex-1">
                    <div className="flex justify-between items-center px-6 py-4 w-3/4">
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
                                <path d="M9 18V5l12-2v13"/>
                                <circle cx="6" cy="18" r="3"/>
                                <circle cx="18" cy="16" r="3"/>
                            </svg>
                            <div className="mx-3">
                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{playlistEl.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{playlistEl.artist}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <svg
                                className=" h-6 w-6 text-red-500"
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
                                <path
                                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                            </svg>
                            <svg
                                className=" h-6 w-6 text-gray-500 dark:text-gray-400 ml-4"
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
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
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
                            <svg
                                className=" h-20 w-20 text-white"
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
                                <polygon points="5 3 19 12 5 21 5 3"/>
                            </svg>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <div className="flex items-center">
                            <svg
                                className=" h-5 w-5 text-gray-500 dark:text-gray-400"
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
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                            </svg>
                            <div className="w-full mx-3" onClick={handleSeek}>
                                <div className="relative mt-1 h-1 bg-gray-200 rounded overflow-hidden dark:bg-gray-800">
                                    <div className="absolute left-0 top-0 h-full bg-yellow-500"
                                         style={{width: `${played}%`}}/>
                                </div>
                            </div>
                            {/* Time */}
                            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <span>
                                        {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}`}
                                    </span>
                                    <span style={{marginLeft: '5px'}}>
                                        / {`${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}
                                    </span>
                                </div>
                            </div>

                            {/*<p className="text-sm text-gray-500 dark:text-gray-400">50%</p>*/}
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div
                            className="controls text-xs text-center flex relative items-center justify-center mt-6 cursor-pointer text-gray-500">
                            <div className="repeat mr-8" onClick={handleToggleRepeat}>
                                <FontAwesomeIcon icon="repeat" style={{color: "#3d619e"}}/>
                            </div>

                            <div className="previous ml-4">
                                <FontAwesomeIcon icon="backward"/>
                            </div>

                            {isPlaying ? (
                                <div className="pause ml-4" onClick={handlePlayPause}>
                                    <FontAwesomeIcon icon="pause"/>
                                </div>
                            ) : (
                                <div className="play ml-4" onClick={handlePlayPause}>
                                    <FontAwesomeIcon icon="play"/>
                                </div>
                            )}

                            <div className="next ml-4" onClick={handleNextClick}>
                                <FontAwesomeIcon icon="forward"/>
                            </div>

                            <div className="shuffle ml-4" onClick={handleToggleShuffle}>
                                <FontAwesomeIcon icon="shuffle"/>
                            </div>

                            <div className="volume" onChange={handleVolumeChange}>
                                {isMuted ? (
                                    <FontAwesomeIcon icon="volume-mute"/>
                                ) : (
                                    <FontAwesomeIcon icon="volume-up"/>
                                )}
                                {volume > 0 && (
                                    <div className="volumeCtrl ">
                                        <div className="volumeBg "></div>
                                        <input
                                            className="volumeRange"
                                            type="range"
                                            value={volume}
                                            onChange={(e) => {
                                                setVolume(e.target.value)
                                            }}
                                            min="0"
                                            max="100"
                                            step="1"

                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/*    */}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="">
                        <PlayerPlaylist/>
                        {/*<SongPlaylist playlistId={4}/>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}