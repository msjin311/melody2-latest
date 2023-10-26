"use client"
import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from "./../../../../contexts/UserContext"
import AdminLayout from "./../../../../components/adminComponent/AdminLayout"
import axios from "axios";
import Link from "next/link";

function AdminAnnouncement( ) {
    const { userState, userDispatch } = useContext(UserContext);
    const [adminId, setAdminId] = useState((userState.user && userState.user.accountId)||"로그인되어있지 않음");
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');
    const [creationDate, setCreationDate] = useState(new Date());

    console.log("bp1");
    console.log(userState);
    const newNotice = {
        adminId,
        noticeTitle,
        noticeContent,
        registrationDate: creationDate.toISOString().split('T')[0]
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (adminId === "로그인되어있지 않음") {
            alert('로그인하세요.');
            return;
        }
        if (noticeContent.length < 10) {
            alert('10글자 이상의 내용을 입력해주세요.');
            return;
        }
        try {
            console.log(newNotice);
            const response = await fetch('/api/user-notices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNotice),
            });
            if (response.ok) {
                alert('공지 등록이 완료되었습니다.');
            } else {
                alert('Notice creation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle any network or other errors here
        }
    };

    return (
        <AdminLayout>
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold ">공지글 등록</h2>
                <section className="board-form" id="board-form">
                    <div className="section-inner mb-40">
                        <form onSubmit={handleSubmit} className="w-full inline-flex flex-wrap justify-content-center">
                            <div className="w-full space-y-4">
                                <div>
                                    <input
                                        defaultValue={(userState.user && userState.user.accountId) || '로그인해주세요'}
                                        className="rounded border px-3 py-2"
                                        disabled={!userState.user}
                                        hidden={true}
                                    />
                                </div>
                                <div>
                                    <input
                                        value={noticeTitle}
                                        className="rounded border px-3 py-2"
                                        required
                                        onChange={(e) => setNoticeTitle(e.target.value)}
                                        style={{
                                            width: "100%"
                                        }}
                                        placeholder={"제목을 입력해주세요."}
                                    />
                                </div>
                                <div>
                                    <textarea
                                        rows="10"
                                        value={noticeContent}
                                        onChange={(e) => setNoticeContent(e.target.value)}
                                        required
                                        className="rounded border px-3 py-2 text-sm"
                                        placeholder={"내용을 입력해주세요."}
                                        style={{
                                            width: "100%"
                                        }}
                                    ></textarea>
                                </div>
                                <div className="flex justify-center">
                                    <input
                                        type="submit"
                                        value="등록하기"
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

export default AdminAnnouncement;