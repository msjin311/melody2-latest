import React, {useState, useEffect, useRef} from 'react';
import ReactPlayer from 'react-player';
import PlayerUI from './PlayerUI';

const MyCustomPlayer = ({ song, playlistEl,  playlist, currentSongIndex, setCurrentSongIndex }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [volume, setVolume] = useState(50); // State for volume
    const [isMuted, setIsMuted] = useState(false); // State for muting
    const [isRepeatClicked, setIsRepeatClicked] = useState(false); // State for repeat
    const [isShuffleClicked, setIsShuffleClicked] = useState(false); // State for shuffle
    const [seeking, setSeeking] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [prevVolume, setPrevVolume] = useState(50); // default previous volume

    const audioPlayerRef = useRef(null);

    const handleSeek = (e) => {
        if (!seeking) {
            const seekTo = (e.nativeEvent.offsetX / e.target.clientWidth) * 100;
            console.log(seekTo);
            // Ensure that seekTo is within valid bounds (0 to 100)
            if (!isNaN(seekTo) && seekTo >= 0 && seekTo <= 100) {
                setPlayed(seekTo);
                const seekToTime = (seekTo / 100) * duration;
                console.log(`tt`);
                console.log(seekToTime);
               setCurrentTime(seekToTime);
                if (audioPlayerRef.current) {
                    audioPlayerRef.current.seekTo(seekToTime);
                }
            }
        }
    };

    useEffect(() => {
        if (isPlaying) {
            const timer = setInterval(() => {
                if (!seeking) {
                    console.log(`this called`)
                    setCurrentTime((prevTime) => prevTime + 1);
                    setPlayed((prevPlayed) => (currentTime / duration) * 100);
                }
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [isPlaying, currentTime, seeking, duration]);

    // Existing logic for play, pause, and more goes here

    const handleNextClick = () => {
        const nextSongIndex = (currentSongIndex + 1) % playlist.length;
        setCurrentSongIndex(nextSongIndex);
    };

    const handlePreviousClick = () => {
        const previousSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        setCurrentSongIndex(previousSongIndex);
    };

    const onPlayPauseToggle = () => {
        setIsPlaying(!isPlaying);
    };

    const handlePlayPause = () => {
        onPlayPauseToggle();
    };

    const handleToggleRepeat = () => {
        setIsRepeatClicked(!isRepeatClicked);
    };

    const handleToggleShuffle = () => {
        setIsShuffleClicked(!isShuffleClicked);
    };

    const handleToggleMute = () => {
        setIsMuted(!isMuted);
    };

    // const handleToggleMute = () => {
    //     if (isMuted) {
    //         setIsMuted(false);
    //         setVolume(prevVolume);
    //     } else {
    //         setIsMuted(true);
    //         setPrevVolume(volume); // store the current volume before muting
    //         setVolume(0); // Mute the volume by setting it to 0
    //     }
    // };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;

        console.log(newVolume)
        if (newVolume === '0') {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
        setVolume(newVolume);
    };

    const handleProgress = (progressState) => {
        const { playedSeconds, loaded, played } = progressState;
        // playedSeconds: Current time in seconds
        // loaded: Fraction of media loaded (0 to 1)
        // played: Fraction of media played (0 to 1)

        // Update the current time (playedSeconds) here
        setCurrentTime(playedSeconds);

        // You can also use the loaded and played values to update a custom progress bar
    };

    const handleDuration = (duration) => {
        // The duration event provides the total duration of the media
        // Update the duration state here
        setDuration(duration);
    };

    useEffect(() => {
        // You can add any custom logic here, such as a timer or progress tracking.
    }, [isPlaying, currentSongIndex, playlistEl, playlist]);

    return (
        <div>
            <PlayerUI
                playlistEl = {playlistEl}
                isPlaying={isPlaying}
                handlePlayPause={handlePlayPause}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}
                handleToggleRepeat={handleToggleRepeat}
                handleToggleShuffle={handleToggleShuffle}
                handleVolumeChange={handleVolumeChange}
                handleSeek={handleSeek}
                played={played}
                volume={volume}
                setVolume={setVolume}
                isMuted={isMuted}
                handleToggleMute={handleToggleMute}
                currentTime={currentTime}
                duration={duration}

            />

            <ReactPlayer
                ref={audioPlayerRef}
                url={playlistEl.url}
                playing={isPlaying}
                controls={false} // Disable ReactPlayer's built-in controls
                width={0} // Set width and height to 0 to hide ReactPlayer's UI
                height={0}
                volume={volume / 100}
                onEnded={handleNextClick}
                onPlay={() => setIsPlaying(true)} // Update isPlaying when playing
                onPause={() => setIsPlaying(false)} // Update isPlaying when paused
                onProgress={handleProgress} // Listen to the progress event
                onDuration={handleDuration} // Listen to the duration event
                // handleVolumeChange={handleVolumeChange}

            />


        </div>


    );
};

export default MyCustomPlayer;
