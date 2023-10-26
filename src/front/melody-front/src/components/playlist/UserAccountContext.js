'use client'

import React, {createContext, useContext, useState} from 'react';

export const UserAccountContext = createContext({});

export const UserAccountContextProvider = ({ children }) => {
    const [userAccount, setUserAccount] = useState({});
    // const userAccount = useContext(UserAccountContext);

    return (
        <UserAccountContext.Provider value={{ userAccount, setUserAccount }}>
            {children}
        </UserAccountContext.Provider>
    );
};

export const useUserContext = () => useContext(UserAccountContext);
