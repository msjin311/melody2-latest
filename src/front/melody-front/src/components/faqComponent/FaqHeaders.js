import Link from 'next/link';

const FaqHeaders = () => {
    return (
        <header>
            <div className="container mx-auto">
                <ul className="flex" style={{ paddingLeft: 10 }}>
                    <li>
                        <Link href="/help/faq" legacyBehavior>
                            <a className="text-black hover:text-blue-700 no-underline">전체</a>
                        </Link>
                    </li>
                    <li className="relative before:inline-block before:content-['|'] before:mx-2 before:text-gray-200">
                        <Link href="/help/suport" legacyBehavior>
                            <a className="text-black hover:text-blue-700 no-underline">결제/해지/환불</a>
                        </Link>
                    </li>
                    <li className="relative before:inline-block before:content-['|'] before:mx-2 before:text-gray-200">
                        <Link href="/help/suport" legacyBehavior>
                            <a className="text-black hover:text-blue-700 no-underline">오류신고</a>
                        </Link>
                    </li>
                    <li className="relative before:inline-block before:content-['|'] before:mx-2 before:text-gray-200">
                        <Link href="/help/suport" legacyBehavior>
                            <a className="text-black hover:text-blue-700 no-underline">서비스문의</a>
                        </Link>
                    </li>
                    <li className="relative before:inline-block before:content-['|'] before:mx-2 before:text-gray-200">
                        <Link href="/help/suport" legacyBehavior>
                            <a className="text-black hover:text-blue-700 no-underline">음원문의</a>
                        </Link>
                    </li>
                    <li className="relative before:inline-block before:content-['|'] before:mx-2 before:text-gray-200">
                        <Link href="/help/suport" legacyBehavior>
                            <a className="text-black hover:text-blue-700 no-underline">기타</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default FaqHeaders;
