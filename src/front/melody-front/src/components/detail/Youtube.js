import React from 'react';

function VideoPlayer({ videoUrl }) {
    const extractVideoID = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[7].length === 11) {
            return match[7];
        } else {
            return null;
        }
    }

    const videoId = extractVideoID(videoUrl);

    if (!videoId) {
        return <div>유효한 YouTube URL이 아닙니다.</div>;
    }

    return (
        <iframe
            width="300"
            height="200"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            allowFullScreen
        ></iframe>
    );
}

export default VideoPlayer;