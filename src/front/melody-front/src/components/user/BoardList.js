"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"

const Page = ({ userAccountId }) => {
    const [board, setBoard] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]); // 선택한 행의 userAccountId를 저장하는 상태 변수

    useEffect(() => {
        axios.get(`/api/user-boards/${selectedRows}`)
            .then((res) => {
                setBoard(res.data);
            })
            .catch((err) => {
                console.error("게시판 데이터를 불러오는 데 실패했습니다.", err);
            });
    }, [userAccountId]);

    if (!board) {
        return <div>Loading...</div>;
    }

    // 개별 행의 선택을 토글하는 함수
    const toggleSelectRow = (userAccountId) => {
        if (selectedRows.includes(userAccountId)) {
            // 이미 선택된 경우, 선택 해제
            setSelectedRows([]);
        } else {
            // 그렇지 않은 경우, 선택
            setSelectedRows([userAccountId]);
        }
    };

    const deleteSelectedRows = () => {
        // 선택한 게시물의 userAccountId를 사용하여 서버에 삭제 요청을 보냅니다.
        const confirmDelete = window.confirm(
            "문의내역이 삭제되면 답변을 받을 수 없습니다. \n삭제하시겠습니까?"
        );
        axios.delete(`/api/user-boards/${selectedRows}`)
            .then((res) => {
                // 삭제 요청이 성공하면 선택한 게시물을 화면에서 제거합니다.
                setBoard(board.filter((a) => !selectedRows.includes(a.userAccountId)));
                setSelectedRows([]); // 선택 해제
                console.log("성공")
            })
            .catch((err) => {
                console.error("게시물 삭제에 실패했습니다.", err);
            });
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold ">문의내역</h2>
            <div className="flex justify-end ">
                <button onClick={deleteSelectedRows}>삭제</button>
            </div>
            <table className="w-full border-collapse mt-4" >
                <thead>
                <tr className="text-black border-b mt-2 ">
                    <th className="p-2" style={{ width: "5%", borderTop: "1px solid #ddd"}}></th>
                    <th className="p-2" style={{ width: "65%", borderTop: "1px solid #ddd" }}>제목</th>
                    <th className="p-2" style={{ borderTop: "1px solid #ddd" }}>등록일</th>
                    <th className="p-2" style={{ borderTop: "1px solid #ddd" }}>답변</th>
                </tr>
                </thead>
                <tbody>
                {board.map((a) => (
                    <tr key={a.userAccountId} className="border-b">
                        <td className="p-2">
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(a.userAccountId)}
                                onChange={() => toggleSelectRow(a.userAccountId)}
                            />
                        </td>
                        <td className="flex justify-between">
                            <Link
                                href={{
                                    pathname: `detail/${a.userAccountId}`,
                                    query: {
                                        userAccountId: a.userAccountId,
                                        title: a.title,
                                        content: a.content,
                                        creationDate: a.creationDate
                                    },
                                }}
                                legacyBehavior
                            >
                                <a className="no-underline"> {a.content} </a>
                            </Link>
                        </td>
                        <td className="p-2">{a.creationDate}</td>
                        <td className="p-2">답변대기</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Page;

