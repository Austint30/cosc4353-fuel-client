import {createContext} from "react"

export const ProfileContext = createContext({
    profile: null,
    setProfile: () => null,
    // user: null,
    // setUser: () => null,
});

export const UserContext = createContext({
    // profile: null,
    // setProfile: () => null,
    user: null,
    setUser: () => null,
});

export const ProfileProvider = ProfileContext.Provider;

export const UserProvider = UserContext.Provider;