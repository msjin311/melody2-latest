"use client"
import Link from 'next/link';

const CsHeader = () => {
    return (
        <header>
            <div className="flex flex-col items-center justify-center mt-20">
                <h2 className="text-4xl font-bold mb-8">고객센터</h2>
                <ul className="flex justify-center mb-8">
                    <li className=" mx-3 ">
                        <Link href="./faq" legacyBehavior><a className="no-underline hover:bg-gray-300 hover:text-white px-2 py-2 ">자주 묻는 질문</a></Link>
                    </li>

                    <li className=" mx-3">
                        <Link href="/help/user_inquiries" legacyBehavior><a className="no-underline hover:bg-gray-300 hover:text-white px-2  py-2" >1:1 문의</a></Link>
                    </li>
                    <li className=" mx-3">
                        <Link href="./announcements" legacyBehavior><a className="no-underline hover:bg-gray-300 hover:text-white px-2 py-2 ">공지사항</a></Link>
                    </li>
                </ul>
                {/* 나머지 내용들 */}
            </div>
        </header>
    );
};

export default CsHeader;