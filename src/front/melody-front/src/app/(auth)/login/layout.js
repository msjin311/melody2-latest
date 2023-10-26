"use client"
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../contexts/UserContext";

const AuthPage = () => {
    const { userState, userDispatch } = useContext(UserContext);
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');

    const loginRequest = {
        accountId,
        password,
    }


    useEffect(() => {
        console.log("isAuthenticated : " + userState.isAuthenticated);

    }, [userState.isAuthenticated]);

    useEffect(() => {
        console.log("user : " + userState.user);

    }, [userState.user]);

    const handleLogin = async () => {
        try {
            // Perform an HTTP POST request to your Spring Boot login endpoint
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginRequest), // Replace with actual user input
            });

            if (response.ok) {
                // Login successful
                const userData = await response.json();
                console.log(userData);
                userDispatch({ type: 'LOGIN', payload: userData });
                console.log(userState.isAuthenticated);
            } else {
                // Handle login error (e.g., show an error message)
                console.error('Login failed');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred', error);
        }
    };

    const handleLogout = () => {
        // Replace this with your logout logic
        userDispatch({ type: 'LOGOUT' });
    };


    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-4">Authentication Page</h1>
            {userState.isAuthenticated ? (
                <>

                    <p>Welcome, {userState.user.name}!</p>
                    <button onClick={handleLogout} className="px-4 py-2 bg-blue-500 text-white rounded">Logout</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Account ID"
                        className="px-4 py-2 border border-gray-300 rounded"
                        onChange={(e) => setAccountId(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="px-4 py-2 border border-gray-300 rounded"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Sign In
                    </button>
                </>
            )}
        </div>
    );
};

export default AuthPage;
