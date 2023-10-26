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

        <div className="px-4 py-8">
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

            {/* Main Content */}
            <div className="px-4 py-8">
                {/*/!* Header *!/*/}

                {/* Main Content */}
                <main className="bg-white p-4 shadow">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;