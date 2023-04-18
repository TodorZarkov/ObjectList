
export function isEmptyInput(data) {
    if (Object.values(data).find(f => f === "") === "") {
        return true;
    };
    return false;
}

export function isValidEmail(email) {
    return isValidPassword(email);
}

export function isValidPassword(pass) {
    const passMinLength = 3;
    if (pass.length < passMinLength) {
        return false;
    }
    return true;
}



export function write(message) {
    alert(message);
}

export function createPassword(
    length = 20,
    list = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) {
    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => list[x % list.length])
        .join('')
}

export function dataURItoBlob(dataURI, dataTYPE) {
    const binary = atob(dataURI.split(',')[1].replace(/\s/g, ''));
    const array = [];
    for(let i = 0; i < binary.length; i++) 
    array.push(binary.charCodeAt(i));
    return new Blob([new Uint8Array(array)], {type: dataTYPE});
    
};


export async function binaryToPng(binary) {
    return ('data:image/png;base64,' + btoa(binary))
  }