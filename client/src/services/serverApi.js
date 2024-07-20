
const domain = "http://localhost:3030";
//depends on user stringified  object in session storage and user.accessToken!!!

async function request(method, uri, data) {
    const user = JSON.parse(localStorage.getItem("user"));
    let requestObj = {
        method,
        headers: { "content-type": "application/json" }
    }


    if (method === "post" || method === "put" || method === "patch") {
        requestObj.body = JSON.stringify(data);
    }
    if (user) {
        requestObj.headers["X-Authorization"] = user.accessToken;
    }
    console.log('from server api before fetch: ', user);
    try {
        let response = await fetch(domain + uri, requestObj);

        if (response.status === 204) {
            return response;
        }

        if (!response.ok) {
            if(response.status === 403) {
                localStorage.removeItem("user");
            }
            const err = await response.json();
            throw new Error(err.message);
        }

        let result = await response.json();
        return result;

    } catch (error) {
        //alert(error.message);
        throw error;
    }

}

export let get = request.bind(null, "get");
export let post = request.bind(null, "post");
export let put = request.bind(null, "put");
export let del = request.bind(null, "delete");