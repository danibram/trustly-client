export const trustlySerializeData = function (data, method, uuid) {
    const dataType = Object.prototype.toString.call(data);
    const isObj = dataType === '[object Object]';
    const isArr = dataType === '[object Array]';
    if (isObj || isArr) {
        let keys = Object.keys(data);
        let serializedData = '';
        keys.sort();
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            if (data[k] === undefined) {
                throw `TrustlyClient: Method=${method} uuid=${uuid} Error serializing data, this field are "undefined". "${k}"`;
            }
            if (data[k] === null) {
                serializedData = serializedData + k;
            }
            else {
                serializedData =
                    serializedData +
                        (!isArr ? k : '') +
                        trustlySerializeData(data[k], method, uuid);
            }
        }
        return serializedData;
    }
    else {
        return data.toString();
    }
};
export const serialize = function (method, uuid, data) {
    return method + uuid + trustlySerializeData(data, method, uuid);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RseVNlcmlhbGl6ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RydXN0bHlTZXJpYWxpemVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLFVBQVMsSUFBSSxFQUFFLE1BQU8sRUFBRSxJQUFLO0lBQzdELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyRCxNQUFNLEtBQUssR0FBRyxRQUFRLEtBQUssaUJBQWlCLENBQUE7SUFDNUMsTUFBTSxLQUFLLEdBQUcsUUFBUSxLQUFLLGdCQUFnQixDQUFBO0lBRTNDLElBQUksS0FBSyxJQUFJLEtBQUssRUFBRTtRQUNoQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFFWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDZixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZCLE1BQU0seUJBQXlCLE1BQU0sU0FBUyxJQUFJLHlEQUF5RCxDQUFDLEdBQUcsQ0FBQTthQUNsSDtZQUNELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDbEIsY0FBYyxHQUFHLGNBQWMsR0FBRyxDQUFDLENBQUE7YUFDdEM7aUJBQU07Z0JBQ0gsY0FBYztvQkFDVixjQUFjO3dCQUNkLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUNqQixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQ2xEO1NBQ0o7UUFDRCxPQUFPLGNBQWMsQ0FBQTtLQUN4QjtTQUFNO1FBQ0gsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7S0FDekI7QUFDTCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsVUFBUyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDaEQsT0FBTyxNQUFNLEdBQUcsSUFBSSxHQUFHLG9CQUFvQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbkUsQ0FBQyxDQUFBIn0=