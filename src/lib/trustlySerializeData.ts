export const trustlySerializeData = function(data) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        let keys = Object.keys(data)
        let serializedData = ''
        keys.sort()

        for (let i = 0; i < keys.length; i++) {
            let k = keys[i]
            if (data[k] === null || !data[k]) {
                serializedData = serializedData + k
            } else {
                serializedData =
                    serializedData + k + trustlySerializeData(data[k])
            }
        }
        return serializedData
    } else {
        return data.toString()
    }
}

export const serialize = function(method, uuid, data) {
    return method + uuid + trustlySerializeData(data)
}
