"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "./../../../../components/adminComponent/AdminLayout"
const Page = () => {
    const [board, setBoard] = useState([]);
    const [comments, setComments] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        axios.get(`/api/user-boards`)
            .then((res) => {
                setBoard(res.data);
            })
            .catch((err) => {
                console.error("게시판 데이터를 불러오는 데 실패했습니다.", err);
            });

        axios.get(`/api/user-comments`)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.error("댓글 데이터를 불러오는 데 실패했습니다.", err);
            });
    }, []);


    // 병합된 데이터를 저장할 상태 변수
    const mergedData = [];

    // board 데이터와 comments 데이터를 병합
    board.forEach((boardItem) => {
        const correspondingComment = comments.find(comment => comment.postId === boardItem.boardId);
        mergedData.push({
            ...boardItem,
            replyStatus: correspondingComment ? correspondingComment.replyStatus : 0,
        });
    });

    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-center mb-40">
                <div className="container mx-auto">
                    <div className="text-gray-400 text-right mt-2">✏️(답변작성)</div>
                    <table className="w-full border-collapse mt-4">
                        <thead className="text-gray-400 mt-2">
                        <tr className="border-b mt-2">
                            <th className="py-2 px-0" style={{ width: "5%", borderTop: "1px solid #ddd" }}>번호</th>
                            <th className="py-2 px-0" style={{ width: "65%", borderTop: "1px solid #ddd" }}>제목</th>
                            <th className="py-2 px-0" style={{ borderTop: "1px solid #ddd" }}>등록일</th>
                            <th className="py-2 px-0" style={{ borderTop: "1px solid #ddd" }}>작성자</th>
                            <th className="py-2 px-0" style={{ borderTop: "1px solid #ddd" }}>처리상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mergedData.map((data) => (

                            <tr key={data.boardId} className="border-b">
                                {console.log(data)}
                                <td className="p-2">
                                    {data.boardId}
                                </td>
                                <td className="p-4">
                                    <a className="no-underline text-black">{data.content}</a>
                                    <Link
                                        href={{
                                            pathname: `write`,
                                            query: {
                                                boardId: data.boardId,
                                                content: data.content,
                                                title: data.title,
                                                creationDate: data.creationDate,
                                            },
                                        }}
                                        legacyBehavior
                                    >
                                        <a className="no-underline">&nbsp; ✏️</a>
                                    </Link>
                                </td>
                                <td className="py-4 px-0">{data.creationDate}</td>
                                <td className="py-4 px-0">{data.accountId}</td>
                                <td className={`py-4 px-0 font-bold ${data.replyStatus === 0 ? 'text-blue-600 font-bold' : ''}`}>
                                    {data.replyStatus === 0 ? "답변대기" : "답변완료"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
