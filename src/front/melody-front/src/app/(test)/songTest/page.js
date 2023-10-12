"use client"
import React, { Component } from 'react';
import axios from 'axios';

class SongManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            newSong: {
                title: '',
                songInfo: '',
                // Add other song fields here
            },
            searchKeyword: '',
            searchResults: [], // Initialize searchResults state
        };
    }

    componentDidMount() {
        this.loadSongs();
    }

    loadSongs = () => {
        axios.get('/api/songs') // Replace with your API endpoint
            .then((response) => {
                this.setState({ songs: response.data });
            })
            .catch((error) => {
                console.error('Error loading songs:', error);
            });
    };

    // handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     this.setState((prevState) => ({
    //         newSong: {
    //             ...prevState.newSong,
    //             [name]: value,
    //         },
    //     }));
    // };

    handleInputChange = (e) => {
        this.setState({ searchKeyword: e.target.value });
    };

    handleAddSong = () => {
        axios.post('/api/songs', this.state.newSong) // Replace with your API endpoint
            .then(() => {
                this.loadSongs();
                this.setState({
                    newSong: {
                        title: '',
                        songInfo: '',
                        // Reset other song fields here
                    },
                });
            })
            .catch((error) => {
                console.error('Error adding song:', error);
            });
    };

    handleSearch = () => {
        const { searchKeyword } = this.state;
        axios.get(`/api/songs/search?title=${searchKeyword}`) // Replace with your API endpoint
            .then((response) => {
                console.log("search called");
                console.log(response.data);
                this.setState({ searchResults: response.data }); // Update searchResults instead of songs
            })
            .catch((error) => {
                console.error('Error searching songs:', error);
            });
    };

    render() {
        const { songs, newSong, searchKeyword } = this.state;
        console.log(songs);

        return (
            <div className="max-w-md mx-auto p-4">
                <h2 className="text-3xl font-semibold mb-4">Song Manager</h2>

                {/* Add Song Form */}
                {/*<div className="mb-4">*/}
                {/*    <h3 className="text-xl font-semibold mb-2">Add Song</h3>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        name="title"*/}
                {/*        placeholder="Title"*/}
                {/*        value={newSong.title}*/}
                {/*        onChange={this.handleInputChange}*/}
                {/*        className="border rounded-md p-2 w-full mb-2"*/}
                {/*    />*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        name="songInfo"*/}
                {/*        placeholder="Song Info"*/}
                {/*        value={newSong.songInfo}*/}
                {/*        onChange={this.handleInputChange}*/}
                {/*        className="border rounded-md p-2 w-full mb-2"*/}
                {/*    />*/}
                {/*    /!* Add other song fields here *!/*/}
                {/*    <button onClick={this.handleAddSong} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">*/}
                {/*        Add*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/* Search */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Search Songs</h3>
                    <input
                        type="text"
                        name="searchKeyword"
                        placeholder="Search by title"
                        value={searchKeyword}
                        onChange={this.handleInputChange}
                        className="border rounded-md p-2 w-full mb-2"
                    />
                    <button onClick={this.handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Search
                    </button>
                </div>

                {/* Search Results */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Search Results</h3>
                    <ul>
                        {this.state.searchResults.map((song) => ( // Update this line
                            <li key={song.songId} className="border-b py-2">
                                <p>{song.title}</p>
                                <p className="text-gray-600">{song.songInfo}</p>
                            </li>
                        ))}
                    </ul>
                </div>



                {/* Song List */}
                {/*<div>*/}
                {/*    <h3 className="text-xl font-semibold mb-2">Song List</h3>*/}
                {/*    <ul>*/}
                {/*        {songs.map((song) => (*/}
                {/*            <li key={song.songId} className="border-b py-2">*/}
                {/*                <p>{song.title}</p>*/}
                {/*                <p className="text-gray-600">{song.songInfo}</p>*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        );

    }
}

export default SongManager;
