import * as api from '../services/serverApi'

const endpoint = {
    lists: "/data/lists",
    objects: "/data/objects",
    list_values: "/data/list_values",
    object_values: "/data/object_values",
}

const defaultList = {
    name: "Nameless List",
    privacyLevel: "users",
    pictureId: "",
    proposals: {
        activ: true,
        rotateOn: "login",
        length: 4,
        method: "rand"
    },
    whereIs: {
        privacyLevel: "owner",
        location: ""
    },
    initialValue: {
        privacyLevel: "owner",
        initialPrice: 0
    },
    currentValue: {
        privacyLevel: "owner",
        active: "true"
    },
    sumValue: {
        privacyLevel: "owner"
    },
    objectIds: []
}

const defaultObject = {
    listId: "",
    pictureIds: [],
    documentIds: [],
    name: "",
    privacyLevel: "listSet",
    description: {
        privacyLevel: "users",
        text: ""
    },
    aquiredOn: 0,
    proposals: "listSet",
    whereIs: {
        privacyLevel: "owner",
        location: "listSet"
    },
    initialValue: {
        privacyLevel: "owner",
        initialPrice: 0
    },
    currentValue: {
        privacyLevel: "owner",
        active: true
    },
}



function generateListObj(data) {
    const obj = {...defaultList}
    if (!data) {
        return obj;
    }
    
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            //!torevise: asume can add custom property
            //otherwise check obj.hasOnnProperty(key)
            obj[key] = data[key];
        }
    }
    return obj;
}

function generateObjectObj(listId, data) {
    const obj = ({ ...defaultObject, listId });
    if (!data) {
        return obj;
    };
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            //!torevise: asume can add custom property
            //otherwise check obj.hasOnnProperty(key)
            obj[key] = data[key];
        }
    }
    return obj;
}

export async function createList(data) {
    const listObj = generateListObj(data);
    const result = await api.post(endpoint.lists,listObj)
    return result;
}

export async function createObject(listId, data) {
    const theObject = generateObjectObj(listId, data);
    const result = await api.post(endpoint.objects,theObject)
    return result._id;
}