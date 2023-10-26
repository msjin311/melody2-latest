"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import CsLayout from "../../../../components/csComponent/CsLayout";

const Page = () => {
    const [notice, setNotice] = useState(null);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [isDetailVisible, setIsDetailVisible] = useState({});

    useEffect(() => {
        axios.get(`/api/user-notices`)
            .then((res) => {
                setNotice(res.data);
            })
            .catch((err) => {
                console.error("게시판 데이터를 불러오는 데 실패했습니다.", err);
            });
    }, [notice]);

    if (!notice) {
        return <div>Loading...</div>;
    }

    return (
        <CsLayout>
            <div className="container mx-auto mb-80">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="text-gray-400 border-b mt-2">
                        <th className="py-2" style={{ width: "5%", borderTop: "1px solid #ddd" }}>번호</th>
                        <th className="py-2" style={{ width: "60%", borderTop: "1px solid #ddd" }}>제목</th>
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
                                <td className="p-4" style={{ width: "5%", borderBottom: "1px solid #ddd" }}>{a.noticeId}</td>
                                <td className="py-4 px-0" style={{ width: "65%", borderBottom: "1px solid #ddd" }}>{a.noticeTitle}</td>
                                <td className="py-4 px-0" style={{ width: "17%", borderBottom: "1px solid #ddd" }}>{a.registrationDate}</td>
                                <td className="py-4 px-0" style={{ width: "5%", borderBottom: "1px solid #ddd" }}>
                                    {isDetailVisible[index] ? '▲' : '▼'}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        {isDetailVisible[index] && selectedNotice && selectedNotice.noticeId === a.noticeId && (
                            <div className="bg-gray-100 p-4" key={`content-${selectedNotice.noticeId}`}>
                                <div className="ml-11 mr-80 text-blue-600">
                                    {selectedNotice?.noticeContent?.split('\n').map((sentence, index) => (
                                        <p key={index} style={{ lineHeight: '2.6'}}>
                                            {sentence}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </CsLayout>
    );
};

export default Page;