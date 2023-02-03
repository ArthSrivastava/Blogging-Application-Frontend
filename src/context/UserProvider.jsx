import { useState } from "react"
import userContext from "./userContext"

export default function UserProvider({children}) {
    const [user, setUser] = useState({
        data: {},
        login: false
    })


    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}