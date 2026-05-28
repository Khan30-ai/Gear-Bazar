//just a dummy code to check navbar only 

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    // dummy logged-in user
    const [user, setUser] = useState({
        name: ' ',
        role: 'buyer'
    });

    // remove this for authentication
    // const [user, setUser] = useState(null); //for no userlogedin 


    // logout function
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hook
export function useAuth() {
    return useContext(AuthContext);
}