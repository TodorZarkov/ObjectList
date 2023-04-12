

import {gapi} from 'gapi-script';
import {CLIENT_ID, SCOPES, API_KEY, DISCOVERY_DOC} from '../configurations/oauth.config'

let tokenClient;
let gapiInited = false;
let gisInited = false;


/**
 * Callback after api.js is loaded.
 */
export function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
* Callback after Google Identity Services are loaded.
*/
export function gisLoaded() {
    //LOAD CLIENT_ID FROM config.js
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnable();
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    //LOAD API_KEY FROM config.js
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnable();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnable() {
    if (gapiInited && gisInited) {
        //something upon success app credentials
    }
}






export function authG() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        //something uopn auth
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

export function signoutG() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
    }
}


// operationals
export async function getGUserInfo() {
    const responce = await gapi.client.drive.about.get({ 'fields': 'user' });
    const { user } = responce.result;

    const { displayName, photoLink, emailAddress } = user;
    return { displayName, photoLink, emailAddress };
}

function createPassword(
    length = 20,
    list = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) {
    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => list[x % list.length])
        .join('')
}

async function addObjectToDrive(obj, folder = 'appDataFolder', name = 'credentials.txt') {

    const file = new Blob([JSON.stringify(obj)], { type: "text/plain" });

    // set file metadata
    const metadata = {
        name,
        mimeType: 'text/plain',
        parents: [folder] //folderId or special name like root, appDataFolder ...
    };
    const formData = new FormData();
    formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: 'application/json' }));


    // set file
    formData.append("file", file);


    const responce = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true",
        {
            method: 'POST',
            headers: new Headers({ "Authorization": "Bearer " + gapi.auth.getToken().access_token }),
            body: formData
        }
    );

    const value = await responce.json();
    console.log(value);
    return value;
}

async function getObjectFromDrive(fileId) {
    try {
        const responce = await gapi.client.drive.files.get({
            fileId,
            alt: 'media',
        });
        const result = responce.result;
        console.log(result)
        return result;
    } catch (error) {
        console.log('Object not found')
        return null;
    }


}

async function createFolder(name = 'ObjectList', parents = ['root']) {
    const access_token = gapi.auth.getToken().access_token;
    const request = gapi.client.request({
        'path': 'drive/v3/files',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        'body': {
            name,
            'mimeType': 'application/vnd.google-apps.folder',
            parents
        }
    });
    const responce = await request.execute();
}

async function getFilesMetaFromName(name = 'credentials', spaces = 'appDataFolder') {
    const responce = await gapi.client.drive.files.list({
        'q': `name = "${name}"`,
        spaces //spaces :drive, appDataFolder, someId?
    });
    //handle responce error

    const result = responce.result;
    const files = responce.result.files;
    if (files && files.length > 0) {
        console.log(files)
    } else {
        // if folder not available
        console.log(`File/Folder not found`);
    }
    return files;
}

async function deleteFile(fileId) {
    const request = gapi.client.drive.files.delete({
        fileId
    });
    const responce = await request.execute();
    console.log(responce);
}

