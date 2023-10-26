"use client"
import Link from 'next/link';
import React from "react";

const AdminHeader = () => {
    return (
        <header>
            <div className="flex flex-col items-center justify-center mt-20">
                <h2 className="text-4xl font-bold mb-8">관리자모드</h2>
                <ul className="flex justify-center mb-8">
                    <li className=" mx-3">
                        <Link href="/admin/administrator" legacyBehavior><a className="no-underline hover:bg-gray-300 hover:text-white px-2 py-2 ">공지글 확인</a></Link>
                    </li>
                    <li className=" mx-3 ">
                        <Link href="/admin/admin_inquiries" legacyBehavior><a className="no-underline hover:bg-gray-300 hover:text-white px-2 py-2 ">1:1문의 확인</a></Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default AdminHeader;