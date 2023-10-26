"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "./../../../../components/adminComponent/AdminLayout"
const AdministratorPage = () => {
    const [notice, setNotice] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [isDetailVisible, setIsDetailVisible] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        axios.get(`/api/user-notices`)
            .then((res) => {
                setNotice(res.data);
            })
            .catch((err) => {
                console.error("게시판 데이터를 불러오는 데 실패했습니다.", err);
            });
    }, []);
    if (!notice) {
        return <div>Loading...</div>;
    }
    const handleCheckboxChange = (noticeId) => {
        if (selectedRows.includes(noticeId)) {
            setSelectedRows(selectedRows.filter((row) => row !== noticeId));
        } else {
            setSelectedRows([...selectedRows, noticeId]);
        }
    };

    const handleDeleteSelected = () => {
        axios.delete(`/api/user-notices/${selectedRows}`)
            .then((response) => {
                setNotice(notice.filter((a) => !selectedRows.includes(a.noticeId)));
                setSelectedRows([]); // 선택 해제
                const confirmDelete = window.confirm(
                    "삭제 완료 되었습니다."
                );
            })
            .catch((err) => {
                console.error("게시물 삭제에 실패했습니다.", err);
                const confirmDelete = window.confirm(
                    "삭제하시고 싶은 행의 체크박스를 클릭 해주세요."
                );
            });
    };

    return (
        <AdminLayout>
            <div className="container mx-auto mb-40">
                <div className="flex justify-end">
                    <Link href="/admin/admin_announcements" legacyBehavior>
                        <a className="no-underline text-black">✏️</a>
                    </Link>&nbsp;
                    <button onClick={handleDeleteSelected}>🗑️</button>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="text-gray-400 border-b mt-2">
                        <th className="py-2" style={{ width: "5%", borderTop: "1px solid #ddd" }}>선택</th>
                        <th className="py-2" style={{ width: "5%", borderTop: "1px solid #ddd" }}>번호</th>
                        <th className="py-2" style={{ width: "65%", borderTop: "1px solid #ddd" }}>제목</th>
                        <th className="py-2" style={{ width: "20%", borderTop: "1px solid #ddd" }}>등록일</th>
                    </tr>
                    </thead>
                </table>
                {notice.map((a, index) => (
                    <div key={a.noticeId}>
                        <table className="w-full border-collapse">
                            <tbody>
                            <tr
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    setIsDetailVisible({ ...isDetailVisible, [index]: !isDetailVisible[index] });
                                    if (selectedNotice && selectedNotice.noticeId === a.noticeId) {
                                        setSelectedNotice(null);
                                    } else {
                                        setSelectedNotice(a);
                                    }
                                }}
                            >
                                <td className="p-2" style={{ width: "5%", borderBottom: "1px solid #ddd" }}>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(a.noticeId)}
                                        checked={selectedRows.includes(a.noticeId)}
                                    />
                                </td>
                                <td className="py-4" style={{ width: "5%", borderBottom: "1px solid #ddd" }}>{a.noticeId}</td>
                                <td className="py-4" style={{ width: "65%", borderBottom: "1px solid #ddd" }}>{a.noticeTitle}</td>
                                <td className="py-4" style={{ width: "20%", borderBottom: "1px solid #ddd" }}>{a.registrationDate}</td>
                            </tr>
                            </tbody>
                        </table>
                        {isDetailVisible[index] && selectedNotice && selectedNotice.noticeId === a.noticeId && (
                            <div className="bg-gray-100 p-4" key={`content-${selectedNotice.noticeId}`}>
                                <div className="ml-11 mr-80 text-blue-600">
                                    {selectedNotice?.noticeContent?.split('\n').map((sentence, index) => (
                                        <p key={index} style={{ lineHeight: '2.6' }}>
                                            {sentence}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div className="text-gray-400 text-right mt-2 mb-40">✏️(공지글작성) & 🗑️(공지글삭제)</div>
            </div>
        </AdminLayout>
    );
}

export default AdministratorPage;
