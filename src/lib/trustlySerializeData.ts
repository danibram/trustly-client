export const trustlySerializeData = function(data, method?, uuid?) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        let keys = Object.keys(data)
        let serializedData = ''
        keys.sort()

        for (let i = 0; i < keys.length; i++) {
            let k = keys[i]
            if (data[k] === undefined) {
                throw `TrustlyClient: Method=${method} uuid=${uuid} Error serializing data, this field are "undefined". "${k}"`
            }
            if (data[k] === null || !data[k]) {
                serializedData = serializedData + k
            } else {
                serializedData =
                    serializedData +
                    k +
                    trustlySerializeData(data[k], method, uuid)
            }
        }
        return serializedData
    } else {
        return data.toString()
    }
}

export const serialize = function(method, uuid, data) {
    return method + uuid + trustlySerializeData(data, method, uuid)
}
