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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RseVNlcmlhbGl6ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RydXN0bHlTZXJpYWxpemVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLFVBQVMsSUFBSSxFQUFFLE1BQU8sRUFBRSxJQUFLO0lBQzdELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyRCxNQUFNLEtBQUssR0FBRyxRQUFRLEtBQUssaUJBQWlCLENBQUE7SUFDNUMsTUFBTSxLQUFLLEdBQUcsUUFBUSxLQUFLLGdCQUFnQixDQUFBO0lBRTNDLElBQUksS0FBSyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDNUIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUVYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2YsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0seUJBQXlCLE1BQU0sU0FBUyxJQUFJLHlEQUF5RCxDQUFDLEdBQUcsQ0FBQTtZQUNuSCxDQUFDO1lBQ0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQ25CLGNBQWMsR0FBRyxjQUFjLEdBQUcsQ0FBQyxDQUFBO1lBQ3ZDLENBQUM7aUJBQU0sQ0FBQztnQkFDSixjQUFjO29CQUNWLGNBQWM7d0JBQ2QsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ2pCLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbkQsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLGNBQWMsQ0FBQTtJQUN6QixDQUFDO1NBQU0sQ0FBQztRQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQzFCLENBQUM7QUFDTCxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsVUFBUyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDaEQsT0FBTyxNQUFNLEdBQUcsSUFBSSxHQUFHLG9CQUFvQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbkUsQ0FBQyxDQUFBIn0=