import * as api from "./serverApi.js";

import { googleLogout} from '@react-oauth/google';

import { getGUserInfo, getFilesMetaFromNameOnDrive, addObjectToDrive, createPassword, getObjectFromDrive, deleteFileFromDrive} from './googleServices.js';



const endpoint = {
    login: "/users/login",
    logout: "/users/logout",
    register: "/users/register"
}


async function login(email, password) {
    localStorage.removeItem('user');
    const user = await api.post(endpoint.login, { email, password });
    return user;
}


async function register(email, password) {
    localStorage.removeItem('user');
    const user = await api.post(endpoint.register, { email, password });
    return user;
}


async function logout() {
    await api.get(endpoint.logout);
    localStorage.removeItem("user");
}


export async  function onLogout() {
    await logout();
    googleLogout();
}

export async function loginOrRegisterWithGoogle(hasGrantedAll) {
    if (!hasGrantedAll) {
        alert("Must confirm all scopes!")
        return;
    }
    const guserInfo = await getGUserInfo();

    let filesMeta = await getFilesMetaFromNameOnDrive();

    if (filesMeta.length === 0 || filesMeta.length > 1) {
        if (filesMeta.length > 1) {
            for (const fileMeta of filesMeta) {
                await deleteFileFromDrive(fileMeta.id);
            }
        }

        const email = guserInfo.emailAddress;
        const password = createPassword();
        const responce = await addObjectToDrive({ email, password });
        console.log(`created credentials on drive: `, responce);
        filesMeta = await getFilesMetaFromNameOnDrive();
    }

    const credentials = await getObjectFromDrive(filesMeta[0].id)
    console.log(`obtained credentials from drive: `, credentials);

    try {
        const user = await login(credentials.email, credentials.password);
        console.log('loged in', user);

        return user;
    } catch (e) {
        console.log('error logging: ', e.message);
        const user = await register(credentials.email, credentials.password)

        console.log('registered', user);

        return user;
    }
}