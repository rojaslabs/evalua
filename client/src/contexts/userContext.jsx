import { createContext, useContext, useEffect, useState } from 'react';

const rawDefaultUser = window.localStorage.getItem('user');
const defaultUser = JSON.parse(rawDefaultUser);
const userContext = createContext(defaultUser);

export const UserProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);