import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReactPlayerController({
                                   isPlaying,
                                   handlePlayPause,
                                   handleNextClick,
                                   handlePreviousClick,
                                   handleToggleRepeat,
                                   handleToggleShuffle,
                                   volume,
                                   setVolume,
                                   isMuted,
                                   handleToggleMute,
                                   handleVolumeChange,
                               }) {
    return (
        <div className="controls">
            <div className="flex items-center">
                <div className="volume1 ml-4" onChange={handleVolumeChange}>
                    {volume > 0 && (
                        <div className="volumeCtrl">
                            <div className="h-32 w-6 mt-2 flex flex-col justify-end">
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
                                        // writingMode: 'bt-lr',
                                        // WebkitAppearance: 'slider-vertical',
                                        writingMode: 'vertical-lr',
                                        width: '8px',
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="repeat" onClick={handleToggleRepeat}>
                <FontAwesomeIcon icon="repeat" style={{ color: "#3d619e" }} />
            </div>

            <div className="previous ml-4" onClick={handlePreviousClick}>
                <FontAwesomeIcon icon="backward" />
            </div>

            {isPlaying ? (
                <div className="pause" onClick={handlePlayPause}>
                    <FontAwesomeIcon icon="pause" />
                </div>
            ) : (
                <div className="play" onClick={handlePlayPause}>
                    <FontAwesomeIcon icon="play" />
                </div>
            )}

            <div className="next ml-4" onClick={handleNextClick}>
                <FontAwesomeIcon icon="forward" />
            </div>

            <div className="shuffle ml-4" onClick={handleToggleShuffle}>
                <FontAwesomeIcon icon="shuffle" />
            </div>

            <div className="flex items-center">
                <div className="volume2 ml-4" onClick={handleToggleMute}>
                    {isMuted ? <FontAwesomeIcon icon="volume-mute" /> : <FontAwesomeIcon icon="volume-up" />}
                </div>
            </div>
        </div>
    );
}

export default ReactPlayerController;