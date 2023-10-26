// createPlaylist Layout.js

import React from 'react';

const CreatePlaylistLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 p-6 text-white">
                {/* Sidebar content goes here */}
                Sidebar
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6">
                {/* Header */}
                <header className="bg-white p-4 mb-4 shadow">
                    {/* Header content goes here */}
                    Header
                </header>

                {/* Main Content */}
                <main className="bg-white p-4 shadow">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default CreatePlaylistLayout;