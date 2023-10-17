"use client"

import Link from "next/link";
import ClientComponent from "../components/ClientComponent";
import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";

const Home = () => {

    const { userState, userDispatch } = useContext(UserContext);


    return (
        <div>
            <h1>Server Component</h1>
            <ClientComponent />
            <h1> <Link href="/login"> test </Link></h1>
            <h1> <Link href="/addPlaylistTest"> playlist creat test </Link></h1>
            <h1> <Link href="/addSongTest"> add song to playlist test </Link></h1>
            <h1> <Link href="/playlistPrintTest"> playlist print test </Link></h1>
            <h1> <Link href="/detailTest"> detail print test </Link></h1>


            {userState.isAuthenticated ? (
                <>
                    <p>Welcome, {userState.user.name}!</p>
                    <p>Welcome, {userState.user.email}!</p>
                </>
            ) : (
                <>
                    no login yet
                </>
            )}

        </div>
    );
};

export default Home;