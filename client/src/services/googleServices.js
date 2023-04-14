import {gapi} from 'gapi-script';


import {API_KEY, DISCOVERY_DOC} from '../configurations/oauth.config'

gapiLoaded();

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    //load API_KEY and DISCOVERY_DOC from config.js
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
}





// operationals
export async function getGUserInfo() {
    const responce = await gapi.client.drive.about.get({ 'fields': 'user' });
    const { user } = responce.result;

    const { displayName, photoLink, emailAddress } = user;
    return { displayName, photoLink, emailAddress };
}

export function createPassword(
    length = 20,
    list = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) {
    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => list[x % list.length])
        .join('')
}

export async function addObjectToDrive(obj, folder = 'appDataFolder', name = 'credentials') {

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
    return value;
}

export async function getObjectFromDrive(fileId) {
    try {
        const responce = await gapi.client.drive.files.get({
            fileId,
            alt: 'media',
        });
        const result = responce.result;
        return result;
    } catch (error) {
        console.log('Object not found')
        return null;
    }


}

async function createFolderOnDrive(name = 'ObjectList', parents = ['root']) {
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

export async function getFilesMetaFromNameOnDrive(name = 'credentials', spaces = 'appDataFolder') {
    const responce = await gapi.client.drive.files.list({
        'q': `name = "${name}"`,
        spaces //spaces :drive, appDataFolder, someId?
    });
    //handle responce error

    const result = responce.result;
    return result.files;
}

export async function deleteFileFromDrive(fileId) {
    const request = gapi.client.drive.files.delete({
        fileId
    });
    const responce = await request.execute();
    console.log(responce);
}

