import {createContext} from "react"

export const ProfileContext = createContext({
    profile: null,
    setProfile: () => null,

});

export const ProfileProvider = ProfileContext.Provider;