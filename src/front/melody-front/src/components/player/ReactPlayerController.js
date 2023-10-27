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

            <div className="volume ml-4" onClick={handleToggleMute}>
                {isMuted ? (
                    <FontAwesomeIcon icon="volume-mute" />
                ) : (
                    <FontAwesomeIcon icon="volume-up" />
                )}
                {volume > 0 && (
                    <input
                        className="volumeRange"
                        type="range"
                        value={isMuted ? 0 : volume}
                        min="0"
                        max="100"
                        step="1"
                        onChange={(e) => setVolume(e.target.value)}
                    />
                )}
            </div>
        </div>
    );
}

export default ReactPlayerController;
