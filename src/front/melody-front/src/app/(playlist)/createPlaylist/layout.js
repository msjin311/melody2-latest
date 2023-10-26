// createPlaylist Layout.js

import React from 'react';

const CreatePlaylistLayout = ({ children }) => {
    return (
        <div className="px-4 py-8">
            {/* Sidebar */}
            {/*<div className="w-1/4 bg-gray-800 p-6 text-white">*/}
            {/*    /!* Sidebar content goes here *!/*/}
            {/*    Sidebar*/}
            {/*</div>*/}

            {/* Main Content */}
            <div className="px-4 py-8">
                {/* Header */}
                {/*<header className="bg-white p-4 mb-4 shadow">*/}
                {/*    /!* Header content goes here *!/*/}
                {/*    Header*/}
                {/*</header>*/}

                {/* Main Content */}
                <main className="px-4 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default CreatePlaylistLayout;