"use client"
import React from "react";
import MusicPlayer from "../../../components/music/musicplayer";

const SongPlayer = () => {
    return (
        <div>
            <h1>player Component</h1>
            {<MusicPlayer></MusicPlayer>}
        </div>
    );
};
export default SongPlayer;