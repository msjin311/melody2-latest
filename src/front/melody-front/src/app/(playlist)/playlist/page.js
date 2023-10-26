"use client"
import React, { useEffect, useState, useContext, useTransition } from 'react';
import Link from 'next/link';
import {data} from "autoprefixer";
import  { UserContext }  from "../../../contexts/UserContext";
import { usePathname, useSearchParams } from 'next/navigation'
import axios from "axios";
import Image from "next/image";
import EditModal from "../../../components/playlist/EditPlaylistModal";
import '../../../components/playlist/Playlistcss.css'
import meatballMenu from '../../../../public/images/meatballs-menu.svg'
import plusImg from "../../../../public/images/plus.png";
import CloseImg from "../../../../public/images/close_111152.png";
import SongPlaylist from "../../../components/playlist/SongPlaylist";

function Playlist   () {
    const { userState, userDispatch } = useContext(UserContext);
    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [playlistHashtags, setPlaylistHashtags] = useState({});

    const [playlists, setPlaylists] = useState([]);



    //popup menu sector
    const [popMenuOpen, setPopupMenuOpen] = useState(Array(playlists.length).fill(false));

    const toggleMenu = (index) => {
        const updatedMenuOpen = [...popMenuOpen];
        updatedMenuOpen[index] = !updatedMenuOpen[index];
        setPopupMenuOpen(updatedMenuOpen);
    };

    const closeMenu = (index) => {
        const updatedMenuOpen = [...popMenuOpen];
        updatedMenuOpen[index] = false;
        setPopupMenuOpen(updatedMenuOpen);
    };

    //Edit window modal
    const [editModalOpen, setEditModalOpen] = useState(false);

    const openEditModal = () => {
        setEditModalOpen(true);
    }

    const closeEditModal = () => {
        setEditModalOpen(false);
    }

    //set playlist Form
    useEffect(() => {
        const createdDate = new Date().toISOString().slice(0, 10);
        setCreatedDate(createdDate)
    }, [createdDate]);

    const handlePlaylist_name = (e) => {
        setPlaylistName(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handlePlaylist_hashtags = (e) => {
        setPlaylistHashtags(e.target.value)
    }

    //구종
    const [isComponentVisible, setComponentVisible] = useState(false);

    const toggleComponentVisibility = () => {
        setComponentVisible(!isComponentVisible);
    };


    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {

        getPlaylistsByUserAccountId()

    }, []);

    useEffect(() => {
        playlists.forEach(function(playlist) {
            console.log(playlist);
            if(playlists == null){
                setPlaylists([])
            }
        });
    }, [playlists]);

    const getPlaylistsByUserAccountId = (e) =>{
        const userAccountId = userState.user.userAccountId;
        axios.get(`/api/playlists/playlist/${userAccountId}`)
            .then(response =>{
                if(response.data){
                    setPlaylists(response.data);
                } else{
                    setPlaylists([]);
                }
                console.log('playlist 리스트 성공')
            })
            .catch (error =>{
                console.error('playlist 리스트 실패', error);
                setPlaylists([]);
            });
    }
    const deletePlaylist = (props) => {
        axios.delete(`/api/playlists/${props}`)
            .then(response =>{
                console.log('playlist delete success')

                const updatedPlaylists = playlists.filter(playlist => playlist.playlistId !== props);
                setPlaylists(updatedPlaylists)
        })
            .catch(error => {
                console.error('playlist delelte fail', error)
            })
    }

    const editPlaylist = (inputPlaylistId) => {
        const playlistId = inputPlaylistId;
        const userAccount = userState.user;
        const userAccountId = userState.user.userAccountId;
        console.log(playlistId)
        console.log('이거',inputPlaylistId, typeof inputPlaylistId);

        const playlist = {
            playlistId,
            userAccountId,
            playlistName,
            description,
            createdDate,
            playlistHashtags
        };

        const updatePlaylistRequest = {
            playlist,
            userAccount
        };

        try{
            axios.put(`/api/playlists`, updatePlaylistRequest)
                .then(response =>{
                    console.log('updateplaylistRequest',updatePlaylistRequest)
                    console.log('플레이리스트 업데이트 성공')
                    setPlaylists((playlists) => {
                        const updatedPlaylists = [...playlists];
                        const index = updatedPlaylists.findIndex((playlist) => playlist.playlistId === playlistId);
                        if (index !== -1) {
                            updatedPlaylists[index] = response.data; // 업데이트된 플레이리스트로 교체
                        }
                        return updatedPlaylists;
                    })
                }).catch(error => {
                console.error('플레이리스트 수정 Error:', error);
            })

        } catch (error) {
            console.error('플레이리스트 무슨 수정 Error:', error);
        }

    }

    return (
        <>
            {/* Header */}
            <header className="bg-white p-4 mb-4 shadow grid grid-cols-2">
                {/* Header content goes here */}
                <div className="col-span-1">
                    <h1><b>내 라이브러리</b></h1>
                </div>
                <div className="col-span-1 flex justify-end space-x-4">
                    <Link href="/createPlaylist"><Image alt="noimage" src={plusImg} width={50} height={50}></Image></Link>

                </div>
            </header> {/*<button onClick={closeModal}>Close Modal</button>*/}

            <div className="bg-white p-4 mb-4 shadow">
                <h1>Playlists Page</h1><p/>
                <div>
                    <ul>
                        <li>
                            <div className="button-wrapper index">
                                <div>#</div>
                                <div>Name</div>
                                <div>Description</div>
                                <div>Hashtag</div>
                                <div className="button-meatball"></div>
                            </div>
                        </li>
                        {playlists.map((playlist, index) => (
                            <li key={index} className="">
                                {/*{playlist.playlistName}*/}
                                <div className="button-wrapper">
                                    <div>{index}</div>
                                    <Link
                                        key={index}
                                        href={`/playlist/${playlist.playlistId}`}
                                    >
                                        <div>{playlist.playlistName}</div>
                                    </Link>
                                    <div>{playlist.description}</div>
                                    <div>{playlist.playlistHashtags}</div>
                                    <SongPlaylist playlistId={playlist.playlistId} />

                                    {/*popup*/}
                                    <div className="button-meatball">
                                        <button onClick={() => toggleMenu(index)}>
                                            <Image src={meatballMenu} alt="meatball" />
                                        </button>
                                        {popMenuOpen[index] && (
                                            <div className="popup-menu">
                                                <ul>
                                                    <li>
                                                        <div className="EditModal">
                                                            <button onClick={openEditModal}>Edit Playlist</button>
                                                            <EditModal isOpen={editModalOpen} onClose={closeEditModal} playlistId={playlist.playlistId}>
                                                                <form
                                                                    onSubmit={(e) => {
                                                                        e.preventDefault();
                                                                        editPlaylist(playlist.playlistId);
                                                                        closeEditModal();
                                                                    }}
                                                                    className="bg-white shadow-md rounded px-4 py-4 w-96"
                                                                >
                                                                    <div className="editmodal-header-grid">
                                                                        <h1 className="text-2xl font-bold">플레이리스트 수정</h1>
                                                                        <button onClick={closeEditModal} className="close-button">
                                                                            <Image alt="noimage" src={CloseImg} width={50} height={50} />
                                                                        </button>
                                                                    </div>
                                                                    <div className="mt-4">
                                                                        <label className="text-sm font-semibold">이름</label>
                                                                        <input
                                                                            type="text"
                                                                            name="input_playlistName"
                                                                            onChange={handlePlaylist_name}
                                                                            className="w-full p-2 border rounded mt-2"
                                                                        />
                                                                    </div>
                                                                    <div className="mt-4">
                                                                        <label className="text-sm font-semibold">설명</label>
                                                                        <input
                                                                            type="text"
                                                                            name="input_description"
                                                                            onChange={handleDescription}
                                                                            className="w-full p-2 border rounded mt-2"
                                                                        />
                                                                    </div>
                                                                    <div className="mt-4">
                                                                        <label className="text-sm font-semibold">해쉬태그</label>
                                                                        <input
                                                                            type="text"
                                                                            name="input_playlist_hashtags"
                                                                            onChange={handlePlaylist_hashtags}
                                                                            className="w-full p-2 border rounded mt-2"
                                                                        />
                                                                    </div>
                                                                    <div className="mt-4 editModalBottom">
                                                                        <input
                                                                            type="submit"
                                                                            value="저장하기"
                                                                            className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
                                                                        />
                                                                    </div>
                                                                </form>

                                                            </EditModal>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <span onClick={() => deletePlaylist(playlist.playlistId)}>Delete Playlist</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 이벤트를 사용하여 메뉴를 닫을 수 있도록 */}
                                <div onClick={() => closeMenu(index)} className={popMenuOpen[index] ? "overlay" : ""}></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    );
}

export default Playlist;
