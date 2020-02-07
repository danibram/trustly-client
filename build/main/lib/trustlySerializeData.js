"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trustlySerializeData = function (data, method, uuid) {
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
                        exports.trustlySerializeData(data[k], method, uuid);
            }
        }
        return serializedData;
    }
    else {
        return data.toString();
    }
};
exports.serialize = function (method, uuid, data) {
    return method + uuid + exports.trustlySerializeData(data, method, uuid);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RseVNlcmlhbGl6ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RydXN0bHlTZXJpYWxpemVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxvQkFBb0IsR0FBRyxVQUFTLElBQUksRUFBRSxNQUFPLEVBQUUsSUFBSztJQUM3RCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDckQsTUFBTSxLQUFLLEdBQUcsUUFBUSxLQUFLLGlCQUFpQixDQUFBO0lBQzVDLE1BQU0sS0FBSyxHQUFHLFFBQVEsS0FBSyxnQkFBZ0IsQ0FBQTtJQUUzQyxJQUFJLEtBQUssSUFBSSxLQUFLLEVBQUU7UUFDaEIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUE7UUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBRVgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2YsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUN2QixNQUFNLHlCQUF5QixNQUFNLFNBQVMsSUFBSSx5REFBeUQsQ0FBQyxHQUFHLENBQUE7YUFDbEg7WUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLGNBQWMsR0FBRyxjQUFjLEdBQUcsQ0FBQyxDQUFBO2FBQ3RDO2lCQUFNO2dCQUNILGNBQWM7b0JBQ1YsY0FBYzt3QkFDZCxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDakIsNEJBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTthQUNsRDtTQUNKO1FBQ0QsT0FBTyxjQUFjLENBQUE7S0FDeEI7U0FBTTtRQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0tBQ3pCO0FBQ0wsQ0FBQyxDQUFBO0FBRVksUUFBQSxTQUFTLEdBQUcsVUFBUyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDaEQsT0FBTyxNQUFNLEdBQUcsSUFBSSxHQUFHLDRCQUFvQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbkUsQ0FBQyxDQUFBIn0=