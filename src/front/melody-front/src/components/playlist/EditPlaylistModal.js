'use client'

import React, {useContext, useEffect, useState} from 'react';
import "./EditPlaylistModal.css"



function EditModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
            <div className="modal-container bg-white w-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content p-4">
                    {/*<button onClick={onClose} className="absolute top-0 right-0 m-4">*/}
                    {/*    <Image alt="Close" src={CloseImg} width={50} height={50} />*/}
                    {/*</button>*/}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default EditModal;
