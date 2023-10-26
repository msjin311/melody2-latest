"use client"
import { useRouter } from 'next/navigation';

export default function page(){
    let router = useRouter()

    return (
        <div className="container mx-auto p-8 mt-32">
            <section className="success-message mb-40">
                <div className="section-inner flex flex-col items-center justify-center text-center">
                    <h1 className="text-2xl font-bold mb-4">서비스 준비중입니다.</h1>
                    <p>보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다.</p>
                    <p>빠른 시일내에 준비하여 찾아뵙겠습니다.</p>
                    <div className="flex space-x-4 mt-4"> {/* space-x-4 클래스를 추가하여 버튼 사이에 4 픽셀 간격을 띄웁니다 */}
                        <button className="bg-gray-400 text-white py-2 px-4 hover:bg-gray-600 cursor-pointer" onClick={()=>{ router.push('/') }}>메인으로</button>
                        <button className="bg-gray-400 text-white py-2 px-4 hover:bg-gray-600 cursor-pointer" onClick={()=>{ router.push('/help/user_inquiries') }}>문의 내역</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
