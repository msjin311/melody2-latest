import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";

const LikeButton = ({ song, localLikes, setLocalLikes }) => {
    const {userState} = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(false); // isLiked 상태를 useState로 정의

    const handleLike = async () => {
        setIsLiked(!isLiked);
        const updatedLikes = isLiked ? localLikes - 1 : localLikes + 1;
        console.log('bp1')
        if (typeof song.songId === 'number') { // songId 숫자인 경우에만 요청 보내도록
            setIsLiked(!isLiked);

            // 서버에 앨범 좋아요 정보를 저장하기 위한 HTTP 요청을 보냅니다.
            const response = await fetch(`/api/songs/likes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    likes: isLiked ? localLikes : localLikes + 1, // 좋아요 토글
                    songId : song.songId,
                }),
            });

            if (response.ok) {
                // 좋아요 수를 로컬로 업데이트합니다.
                const data = await response.json(); // Parse the response as JSON
                setIsLiked(!isLiked);
                setLocalLikes((prevLocalLikes) => ({
                    ...prevLocalLikes,
                    [song.songId]: data.likes, // Update the likes for the specific song
                }));
            } else {
                console.error("앨범 좋아요 업데이트에 실패했습니다.");
            }
        }
    };

    return (
        <button
            disabled={!userState.isAuthenticated}
            onClick={handleLike}
        >
            {isLiked ? (
                <FontAwesomeIcon icon={faHeart} color="red"/>
            ) : (
                <FontAwesomeIcon icon={faHeart} color="black"/>
            )}
        </button>
    );
}

export default LikeButton;