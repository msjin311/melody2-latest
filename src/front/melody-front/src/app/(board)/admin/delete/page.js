 "use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./../../../../components/adminComponent/AdminLayout"

const Page = () => {
    const [comments, setComments] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // 댓글 데이터를 불러오는 요청
        axios.get(`/api/user-comments`)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.error("댓글 데이터를 불러오는 데 실패했습니다.", err);
            });
    }, [comments]);

    const toggleSelectRow = (commentId) => {
        if (selectedItems.includes(commentId)) {
            // 이미 선택된 경우, 선택 해제
            setSelectedItems([]);
        } else {
            // 그렇지 않은 경우, 선택
            setSelectedItems([commentId]);
        }
    };

    const deleteSelectedRows = () => {
        // 선택한 게시물의 commentId 사용하여 서버에 삭제 요청을 보냅니다.
        const confirmDelete = window.confirm(
            "답변내역을 \n삭제하시겠습니까?"
        );
        if (!confirmDelete) {
            return;
        }
        axios.delete(`/api/user-comments/${selectedItems}`)
            .then((res) => {
                // 삭제 요청이 성공하면 선택한 게시물을 화면에서 제거합니다.
                setComments(comments.filter((a) => !selectedItems.includes(a.commentId)));
                setComments([]); // 선택 해제
                console.log("성공")
            })
            .catch((err) => {
                console.error("답변 삭제에 실패했습니다.", err);
            });
    };


    return (
        <AdminLayout>
            <div className="container mx-auto mb-80">
                <h2 className="text-2xl font-bold mb-10 ">답변내역</h2>
                <div className="flex justify-end ">
                    <button onClick={deleteSelectedRows}>삭제</button>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="text-gray-400 border-b mt-2">
                        <th className="py-2" style={{ width: "5%", borderTop: "1px solid #ddd" }}>선택</th>
                        <th className="py-2" style={{ width: "5%", borderTop: "1px solid #ddd" }}>글번호</th>
                        <th className="py-2" style={{ width: "65%", borderTop: "1px solid #ddd" }}>답변내용</th>
                    </tr>
                    </thead>
                </table>
                {comments.map((a) => (
                    <div key={a.commentId}>
                        <table className="w-full border-collapse">
                            <tbody>
                            <tr className="cursor-pointer hover-bg-gray-100">
                                <td className="py-4" style={{ width: "5%", borderBottom: "1px solid #ddd" }}>
                                    <input
                                        type="checkbox"
                                        onChange={() => toggleSelectRow(a.commentId)}
                                        checked={selectedItems.includes(a.commentId)}
                                    />
                                </td>
                                <td className="py-4" style={{ width: "5%", borderBottom: "1px solid #ddd" }}>{a.postId}</td>
                                <td className="py-4" style={{ width: "65%", borderBottom: "1px solid #ddd" }}>{a.commentContent}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default Page;