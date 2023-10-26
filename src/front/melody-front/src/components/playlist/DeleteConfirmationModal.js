'use client'

import React, { useState } from 'react';

function DeleteConfirmationModal({ isOpen, onConfirm, onCancel, playlistName }) {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-50 bg-black">
            <div className="bg-white p-4 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you wan
                    t to delete {playlistName} playlist?</p>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;