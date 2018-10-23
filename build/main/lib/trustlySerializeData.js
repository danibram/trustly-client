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
            if (data[k] === null || !data[k]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RseVNlcmlhbGl6ZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RydXN0bHlTZXJpYWxpemVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxvQkFBb0IsR0FBRyxVQUFVLElBQUksRUFBRSxNQUFPLEVBQUUsSUFBSztJQUM5RCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxLQUFLLGlCQUFpQixDQUFDO0lBQzdDLE1BQU0sS0FBSyxHQUFHLFFBQVEsS0FBSyxnQkFBZ0IsQ0FBQztJQUU1QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFFWCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTSx5QkFBeUIsTUFBTSxTQUFTLElBQUkseURBQXlELENBQUMsR0FBRyxDQUFBO1lBQ25ILENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsY0FBYyxHQUFHLGNBQWMsR0FBRyxDQUFDLENBQUE7WUFDdkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGNBQWM7b0JBQ1YsY0FBYzt3QkFDZCxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDakIsNEJBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNuRCxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxjQUFjLENBQUE7SUFDekIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBRVksUUFBQSxTQUFTLEdBQUcsVUFBVSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDakQsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsNEJBQW9CLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNuRSxDQUFDLENBQUEifQ==