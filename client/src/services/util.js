
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

