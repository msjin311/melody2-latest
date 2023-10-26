// playlist layout.js
"use client"

import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import Image from 'next/image';
import plusImg from '../../../../public/images/plus.png';
import menuImg from '../../../../public/images/menu2.png';
import '../../../components/playlist/Menu.css';
import registrationForm from "./../../../components/user/RegistrationForm";

const Layout = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const closeMenu = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', closeMenu);
        } else {
            document.removeEventListener('mousedown', closeMenu);
        }

        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, [isMenuOpen]);

    return (

        <div className="flex h-screen bg-gray-100 justify-content-center">
            <div>
                <div className={`menu-button ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <Image src={menuImg} alt="menu image" width={50}  />
                </div>
                <div ref={menuRef} className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                    {/* 메뉴 항목들을 추가하세요. */}
                    <a href="#">메뉴 항목 1</a><br/>
                    <a href="#">메뉴 항목 2</a><br/>
                    <a href="#">메뉴 항목 3</a><br/>
                </div>
            </div>


            {/* Sidebar */}
            {/*<div className="w-1/4 bg-gray-800 p-6 text-white">*/}
            {/*    /!* Sidebar content goes here *!/*/}
            {/*    Sidebar*/}
            {/*</div>*/}

            {/* Main Content */}
            <div className="w-100 p-6">
                {/*/!* Header *!/*/}
                {/*<header className="bg-white p-4 mb-4 shadow grid grid-cols-2">*/}
                {/*    /!* Header content goes here *!/*/}
                {/*    <div className="col-span-1">*/}
                {/*        <h1><b>내 라이브러리</b></h1>*/}
                {/*    </div>*/}
                {/*    <div className="col-span-1 flex justify-end space-x-4">*/}
                {/*        /!*Playlist Header*!/*/}
                {/*        /!*<div>*!/*/}
                {/*        /!*    <button onClick={openModal}></button>*!/*/}
                {/*        /!*    {isModalOpen && (*!/*/}
                {/*        /!*        <div className="modal">*!/*/}
                {/*        /!*            <div className="modal-content">*!/*/}
                {/*        /!*                <Link href="/createPlaylist"><Image alt="add image" src={plusImg} width={50} height={50}></Image></Link>*!/*/}
                {/*        /!*            </div>*!/*/}
                {/*        /!*        </div>*!/*/}
                {/*        /!*    )}*!/*/}
                {/*        /!*</div>*!/*/}
                {/*        <Link href="/createPlaylist"><Image alt="noimage" src={plusImg} width={50} height={50}></Image></Link>*/}

                {/*    </div>*/}
                {/*</header>    /!*                <button onClick={closeModal}>Close Modal</button>*!/*/}
                {/*    */}

                {/* Main Content */}
                <main className="bg-white p-4 shadow">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;