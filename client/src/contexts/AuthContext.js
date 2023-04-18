import { createContext, useState } from "react";

import { onLogout, loginOrRegisterWithGoogle} from '../services/userService'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google';
import { SCOPE, SCOPES } from '../configurations/oauth.config';



export const AuthContext = createContext();

export const AuthProvider = ({
    children,

}) => {

    const [user, setUser] = useLocalStorage('user', null);


    const onLoginClick = useGoogleLogin({
        scope: SCOPE,
        onSuccess: tokenResponse => {
            const hasGrantedAll = hasGrantedAllScopesGoogle(
                tokenResponse,
                ...SCOPES
            )
            console.log('all scopes confirmed: ', hasGrantedAll);

            loginOrRegisterWithGoogle(hasGrantedAll)
            .then((u)=>setUser(u));
        },
    });

    async function onLogoutClick() {
        await onLogout();
        setUser(null);
    }

    const [listUpdate, setListUpdate] = useState(true);
    const toggleListUpdate = {listUpdate, setListUpdate};

    const contextValues = {
        onLoginClick,
        onLogoutClick,
        user,
        toggleListUpdate,
    }



    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};