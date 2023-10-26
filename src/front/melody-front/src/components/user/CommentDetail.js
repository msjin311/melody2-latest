import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentDetail({ boardItem }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // 댓글 데이터를 불러오는 요청
        axios.get(`/api/user-comments`)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.error("댓글 데이터를 불러오는 데 실패했습니다.", err);
            });
    }, []);

    // boardItem.userAccountId와 일치하는 댓글만 필터링
    const filteredComments = comments.filter((comment) => comment.postId === boardItem.boardId);

    return (
        <div className="bg-gray-100 p-4">
            <h3 className="text-xl font-bold">
                {filteredComments.every(comment => comment.replyStatus === 0)
                    ? "답변대기"
                    : "답변완료"}
            </h3>
            <p className="text-gray-600">작성자: {boardItem.accountId}</p>
            <p className="text-gray-600">등록일: {boardItem.creationDate}</p>
            <div className="border-t border-gray-400 mt-2 pt-2">
                {filteredComments.map((comment) => (
                    <div key={comment.id}>
                        <p className="text-blue-600">답변내용: {comment.commentContent}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default CommentDetail;
