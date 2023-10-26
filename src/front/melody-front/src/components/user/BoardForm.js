"use client"
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "./../../contexts/UserContext";
import axios from "axios";
import CommentDetail from "./../../components/user/CommentDetail";
import Link from "next/link";

function BoardForm() {
    const { userState, userDispatch } = useContext(UserContext);
    const [accountId, setAccountId] = useState((userState.user && userState.user.accountId)||"로그인되어있지 않음");
    const [title, setTitle] = useState('결제/해지/환불');
    const [content, setContent] = useState('');
    const [userAccountId, setUserAccountId] = useState('');
    const [creationDate, setCreationDate] = useState(new Date());
    const [board, setBoard] = useState([]);
    const [selectedRows, setSelectedRows] = useState([null]);
    const [selectedBoardItem, setSelectedBoardItem] = useState(null);
    const [showInquiryHistory, setShowInquiryHistory] = useState(false);
    const [showInquiryButton, setShowInquiryButton] = useState(false);


    const handleSelectBoardItem = (boardItem) => {
        if (selectedBoardItem === boardItem) {
            setSelectedBoardItem(null); // 이미 선택된 항목을 다시 선택하면 닫힘
        } else {
            setSelectedBoardItem(boardItem); // 선택되지 않은 항목을 선택하면 열림
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // setUserAccountId(userState.user.userAccountId)

        const newBoard = {
            accountId,
            title,
            content,
            creationDate: creationDate.toISOString().split('T')[0]
        };
        if (accountId === "로그인되어있지 않음") {
            alert('로그인하셔야 문의하기가 가능합니다.');
            return;
        }
        if (content.length < 10) {
            alert('10글자 이상의 내용을 입력해주세요.');
            return;
        }
        try {
            const response = await fetch('/api/user-boards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBoard),
            });
            if (response.ok) {
                setBoard([...board, newBoard]);
                alert('문의 접수가 완료되었습니다.');
                setShowInquiryHistory(true);
            } else {
                alert('Board creation failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle any network or other errors here
        }
    };
    useEffect(() => {
        if (board.length > 0) {
            setShowInquiryHistory(true);
        }
        else {
            setShowInquiryButton(true);
        }
    }, [board]);

    useEffect(() => {
        // selectedRows가 변경될 때마다 데이터를 다시 불러옵니다.
        axios.get(`/api/user-boards/${selectedRows}`)
            .then((res) => {
                const filteredBoard = res.data.filter((post) => post.accountId === userState.user.accountId);
                setBoard(filteredBoard);
            })
            .catch((err) => {
                console.error("게시판 데이터를 불러오는 데 실패했습니다.", err);
            });
    }, [selectedRows]);

    if (!board) {
        return <div>Loading...</div>;
    }
    // 체크박스 변경을 처리하는 함수
    const handleCheckboxChange = (userAccountId) => {
        if (selectedRows.includes(userAccountId)) {
            // 이미 선택된 경우, 선택 해제
            setSelectedRows([]);
        } else {
            // 그렇지 않은 경우, 선택
            setSelectedRows([userAccountId]);
        }
    };
    const handleDeleteSelectedRows = () => {
        // 선택한 게시물의 userAccountId를 사용하여 서버에 삭제 요청을 보냅니다.
        const confirmDelete = window.confirm(
            "문의내역이 삭제되면 답변을 받을 수 없습니다. \n삭제하시겠습니까?"
        );
        if (!confirmDelete) {
            return;
        }
        // 서버로 삭제 요청을 보냅니다.
        axios.delete(`/api/user-boards/${selectedRows}`)
            .then((response) => {
                setBoard(board.filter((a) => !selectedRows.includes(a.userAccountId)));
                setSelectedRows([]); // 선택 해제
                const confirmDelete = window.confirm(
                    "삭제 완료 되었습니다."
                );
            })
            .catch((err) => {
                const confirmDelete = window.confirm(
                    "답변작성 완료된 게시글은 삭제 할 수 없습니다. "
                );
            });
    };

    return (
        <div className="container mx-auto mb-40">
            <section className="board-form" id="board-form">
                <div className="section-inner">
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
                                <select
                                    defaultValue="결제/해지/환불"
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className=" rounded border px-3 py-2"
                                    style={{ width: "26%" }}
                                >
                                    <option value="결제/해지/환불">결제/해지/환불</option>
                                    <option value="오류신고">오류신고</option>
                                    <option value="서비스문의">서비스문의</option>
                                    <option value="음원요청">음원요청</option>
                                    <option value="기타">기타</option>
                                </select>
                            </div>
                            <div>
                                <textarea
                                    rows="10"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    placeholder={`내용을 입력해주세요.\n(입력 시 개인정보가 포함되지 않도록 유의해 주세요. 문의 내역 내 포함된 개인정보가 있을 경우,\n 임의로 개인정보를 가림 처리(*마스킹) 할 수 있음을 안내 드립니다.)\n\n\n\n\n 0/2000`}
                                    className="rounded border px-3 py-2 text-sm"
                                    style={{
                                        width: "100%"
                                    }}
                                ></textarea>
                            </div>
                            <div className="p-4 bg-gray-50">
                                <div style={{ fontSize: "12px", lineHeight: "20px" }}>
                                    <p>◦ 문의하신 내용에 대한 원인파악 및 원활한 상담을 위해 이메일, 휴대폰 번호, 단말정보, 앱 버전을 수집합니다.</p>
                                    <p>◦ 수집된 개인정보는 회원탈퇴 시점 또는 관계 법령*에 근거한 기간동안 보관 후 삭제됩니다.</p>
                                    <p>◦ 개인정보 수집에 동의하실 경우 '문의하기' 버튼을 눌러주세요. (수집된 개인정보는 상담 외 다른 용도로 사용되지 않습니다.)</p>
                                    <p>◦ 이용자는 Melody에서 수집하는 개인정보에 대해 동의를 거부할 권리가 있으며 동의 거부 시에는 1:1 문의 및 답변 확인 등 서비스 일부가 제한됩니다.</p>
                                </div>
                                <div style={{ fontSize: "11px", lineHeight: "20px" }}>
                                    <p>* 관계 법령이라 함은 다음에 해당되는 경우를 말합니다.</p>
                                    <p>가. 웹사이트 방문기록: 3개월 (통신비밀보호법)</p>
                                    <p>나. 계약 또는 청악철회 등에 관한 기록:</p>
                                    <p>다. 대금결제 및 재화 등의 공급에 관한 기록: 5년(전자상거래법)</p>
                                    <p>라. 소비자의 불만 또는 분쟁처리에 관한 기록: 3년(전자상거래법)</p>
                                    <p>마. 신용정보의 수집 처리 및 이용 등에 관한 기록: 3년(신용정보의 이용 및 보호에 관한 법률)</p>
                                </div>
                            </div>
                            {showInquiryButton && (
                            <div className="flex justify-center">
                                <input
                                    type="submit"
                                    value="문의하기"
                                    className="bg-gray-400 text-white py-3 px-20 hover:bg-gray-600 cursor-pointer text-xl"
                                />
                            </div>
                            )}
                        </div>
                    </form>
                </div>
            </section>
            {showInquiryHistory && (
            <div className="container mx-auto mb-80">
                <h2 className="text-2xl font-bold ">나의 문의내역</h2>
                <div className="flex justify-end">
                    <button
                        onClick={handleDeleteSelectedRows}
                        className={`py-2 px-4 text-gray-300 hover:text-black ${selectedRows.length > 0 ? 'text-black' : ''}`}
                    >
                        삭제
                    </button>
                </div>
                <table className="w-full border-collapse " >
                    <thead>
                    <tr className="text-gray-400 mt-2">
                        <th className="p-2" style={{ width: "6%", borderTop: "1px solid #ddd"}}></th>
                        <th className="p-2" style={{ width: "66%", borderTop: "1px solid #ddd" }}>제목</th>
                        <th className="p-2" style={{ width: "15%", borderTop: "1px solid #ddd" }}>문의유형</th>
                        <th className="p-2" style={{ width: "15%", borderTop: "1px solid #ddd" }}>등록일</th>
                    </tr>
                    </thead>
                </table>
                {board.map((boardItem) => (
                    <div key={boardItem.id}>
                        <table className="w-full border-collapse">
                            <tbody>
                            <tr className="cursor-pointer hover:bg-gray-100" onClick={() => handleSelectBoardItem(boardItem)}>
                                {/* 게시물 내용 및 정보 표시 */}
                                <td className="p-4" style={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(boardItem.userAccountId)}
                                        checked={selectedRows.includes(boardItem.userAccountId)}
                                    />
                                </td>
                                <td className="p-4" style={{ width: "70%",  borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd" }}>{boardItem.content}</td>
                                <td className="p-4" style={{ width: "15%", borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd" }}>{boardItem.title}</td>
                                <td className="p-4" style={{ width: "15%", borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd" }}>{boardItem.creationDate}</td>
                            </tr>
                            </tbody>
                        </table>
                        {/* 댓글상세 페이지 표시 */}
                        {selectedBoardItem === boardItem && (
                            <CommentDetail boardItem={selectedBoardItem} />
                        )}
                    </div>
                    ))}
            </div>
                )}
        </div>
    );
}

export default BoardForm;