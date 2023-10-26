import React, { useState } from 'react';

function DetailPage({ boardItem }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(boardItem.comments || []); // 댓글 목록 상태

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment) {
            alert('댓글을 입력하세요.');
            return;
        }

        try {
            const response = await fetch('/api/user-boards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment, boardItemId: boardItem.id }), // 게시물 ID와 댓글 내용을 서버로 보냅니다.
            });
            if (response.ok) {
                const newComment = { text: comment, date: new Date() };
                setComments([...comments, newComment]); // 새 댓글을 댓글 목록에 추가
                setComment(''); // 댓글 입력 칸 초기화
            } else {
                alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>상세 페이지</h2>
            {/* ... */}
            <p>댓글:</p>
            <ul>
                {comments.map((c, index) => (
                    <li key={index}>{c.text}</li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
        <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 추가하세요"
        />
                <button type="submit">댓글 제출</button>
            </form>
        </div>
    );
}

export default DetailPage;