"use client"
import { createContext, useContext, useReducer } from "react";

// Define the initial state for the user account
const initialState = {
    isAuthenticated: false,
    user: null,
};

// Create the user context
export const UserContext = createContext();

// Define the user reducer to handle user-related actions
const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: null };
        default:
            return state;
    }
};

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
