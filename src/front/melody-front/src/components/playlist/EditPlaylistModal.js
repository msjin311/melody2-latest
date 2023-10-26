'use client'

import React, {useContext, useEffect, useState} from 'react';
import {useUserContext} from "./UserAccountContext";
import axios from "axios";
import "./EditPlaylistModal.css"
import CloseImg from "../../../public/images/close_111152.png"
import Image from "next/image";


function EditModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <div className="modal-content">
                    {/*<button onClick={onClose} className="close-button">*/}
                    {/*    <Image alt="noimage" src={CloseImg} width={50} height={50} />*/}
                    {/*</button>*/}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default EditModal;